/** 
 *	Feed Viewmodel Class
 **/

var Feed = function () {
	var feed = this;
		feed.pages = ko.observableArray([]),
		feed.chunk = 1,
		feed.end = false,
		feed.idList = [],
		feed.firstLoad = true,
		feed.uiOpen = false;

		//Initialize Feed
		feed.init = function () {
			$('.loading').show();
			// console.log("XHR Status: Requesting...");
			$.ajax({
				type: "GET", 
				url: "/newposts"
			}).done(function (response) {
				// console.log("XHR Status: Success");
				var data = response;
					for(var i = 0; i < data.length; i++) {
						if (data[i].updatedAt == null) {
							feed.pages.push(data[i]);
						}
					}
					if (feed.firstLoad === false) {
						$('#feed').isotope('reLayout');
					}
					feed.firstLoad = false;
					$('.storyTile').css('display', 'inline-block');
			}).fail(function () {
				// console.log("XHR Status: Failed");
			}).always(function () {
				// console.log("XHR Status: Resolved");
				$('.loading').hide();
			})
		};

		feed.removeID = function (arr) {
			var what, a = arguments, L = a.length, ax;
		    while (L > 1 && arr.length) {
		        what = a[--L];
		        while ((ax = arr.indexOf(what)) !== -1) {
		            arr.splice(ax, 1);
		        }
		    }
		    return arr;
		}

		//Select Tile
		feed.select = function (tile) {
			 if ($(tile).hasClass('selected')) {
			 	feed.removeID(feed.idList, $(tile).attr('id'))
			 	$(tile).removeClass('selected');
			 	if (!feed.idList.length && $(window).scrollTop() <= 118) {
			 		$('.ui').fadeOut(200);
			 		feed.uiOpen = false;
			 	}
			 } else {
			 	$(tile).addClass('selected');
			 	feed.idList.push($(tile).attr('id'));
			 	$('.ui').fadeIn(600);
			 	feed.uiOpen = true;
			 }
		};

		//Open UI on Mouseover
		feed.openUI = function (e) {
			var y = e.clientY;
			if (feed.uiOpen !== true) {
				if (y < 16) {
					$('.ui').stop().fadeIn(600);
					feed.uiOpen = true;
				}
			}
		}

		//Close UI on Mouseover
		feed.closeUI = function (e) {
			var y = e.clientY;
			var x = e.clientX;
			setTimeout(function () {
				if (!$('.ui').is(":hover") && $(window).scrollTop() <= 118) {
					$('.ui').stop().fadeOut(300);
				}
				feed.uiOpen = false;
			}, 400)
		}

		//Select All Tiles
		feed.selectAll = function () {
			feed.idList = [];
			$('.storyTile').addClass('selected');
			$('.selected').each(function (item, element) {
				feed.idList.push($(element).attr('id'));
			})
			return feed.isList;
		};

		//Deselect All Tiles
		feed.deselectAll = function () {
			$('.storyTile').removeClass('selected');
			feed.idList = [];
		};

		//Delete Posts
		feed.deletePosts = function (idList) {
			$('#mask').fadeIn(600);
			$('.storyTile.selected').each(function () {
				feed.idList.push($(this).attr('id'));
			})
			$.ajax({
				type: "GET",
				url: "/deletePosts",
				dataType: "json",
				data: {"idList": idList}
			}).done(function (response) {
				// console.log("XHR Status: Success");
				var data = response;
					feed.pages([]);
					for(var i = 0; i < data.length; i++) {
						if (data[i].approved !== true) {
							feed.pages.push(data[i]);
						}
					}
					$('.storyTile').css('display', 'inline-block');
					feed.idList = [];
			}).fail(function () {
				// console.log("XHR Status: Failed");
			}).always(function () {
				$('#mask').fadeOut(400);
			})
		}

		//Approve Selected Tiles
		feed.approvePosts = function (idList) {
			$('#mask').fadeIn(600);
			$('.storyTile.selected').each(function () {
				feed.idList.push($(this).attr('id'));
			})
			$.ajax({
				type: "GET",
				url: "/approvePosts",
				dataType: "json",
				data: {"idList": idList}
			}).done(function (response) {
				// console.log("XHR Status: Success");
				var data = response;
					feed.pages([]);
					for(var i = 0; i < data.length; i++) {
						if (data[i].approved !== true) {
							feed.pages.push(data[i]);
						}
					}
					$('.storyTile').css('display', 'inline-block');
					feed.idList = [];
			}).fail(function () {
				// console.log("XHR Status: Failed");
			}).always(function () {
				$('#mask').fadeOut(400);
			})
		};

		//Hide Selected Tiles
		feed.hidePosts = function (idList) {
			$('#mask').fadeIn(600);
			$.ajax({
				type: "GET",
				url: "/hidePosts",
				dataType: "json",
				data: {"idList": idList}
			}).done(function (response) {
				// console.log("XHR Status: Success");
				var data = response;
				feed.pages([]);
					for(var i = 0; i < data.length; i++) {
						if (data[i].approved !== true) {
							feed.pages.push(data[i]);
						}
					}
					$('.storyTile').css('display', 'inline-block');
					feed.idList = [];
			}).fail(function () {
				// console.log("XHR Status: Failed");
			}).always(function () {
				$('#mask').fadeOut(400);
			})
		};

		//Show Approved Posts
		feed.showApproved = function () {
			$('#mask').fadeIn(600)
			// console.log("XHR Status: Requesting...");
			$.ajax({
				type: "GET", 
				url: "/showApproved"
			}).done(function (response) {
				// console.log("XHR Status: Success");
				var data = response;
				feed.pages([]);
					for(var i = 0; i < data.length; i++) {
						if (data[i].approved == true) {
							feed.pages.push(data[i]);
						}
					}
					$('.storyTile').css('display', 'inline-block');
					feed.idList = [];
			}).fail(function () {
				// console.log("XHR Status: Failed");
			}).always(function () {
				// console.log("XHR Status: Resolved");
				$('#mask').fadeOut(400);
			})
		};

		//Show Hidden Posts
		feed.showHidden = function () {
			$('#mask').fadeIn(600)
			// console.log("XHR Status: Requesting...");
			$.ajax({
				type: "GET", 
				url: "/showHidden"
			}).done(function (response) {
				// console.log("XHR Status: Success");
				var data = response;
				feed.pages([]);
					for(var i = 0; i < data.length; i++) {
						if (data[i].approved !== true) {
							feed.pages.push(data[i]);
						}
					}
					$('.storyTile').css('display', 'inline-block');
					feed.idList = [];
			}).fail(function () {
				// console.log("XHR Status: Failed");
			}).always(function () {
				// console.log("XHR Status: Resolved");
				$('#mask').fadeOut(400);
			})
		};

		//Show New POsts
		feed.showNew = function () {
			$('.loading').show();
			// console.log("XHR Status: Requesting...");
			$.ajax({
				type: "GET", 
				url: "/newposts"
			}).done(function (response) {
				// console.log("XHR Status: Success");
				var data = response;
					feed.pages([]);
					for(var i = 0; i < data.length; i++) {
						if (data[i].updatedAt == null) {
							feed.pages.push(data[i]);
						}
					}
					$('.storyTile').css('display', 'inline-block');
					feed.idList = [];
			}).fail(function () {
				// console.log("XHR Status: Failed");
			}).always(function () {
				// console.log("XHR Status: Resolved");
				$('.loading').hide();
			})
		};
};

/**
 *	Event Bindings
 **/

 	// Story Tile Select
	$('#feed').on('click', '.storyTile', function (tile) {
		feed.select(this);
	});
	// UI - Mouseover Open
	$('.head').on('mousemove', function (e) {
		feed.openUI(e);
	});
	// UI - Mouseout Close
	$('.ui').on('mouseout', function (e) {
		if (!$('.storyTile').hasClass('selected')) {
			feed.closeUI(e);
		}
	});
	// UI - Approve Selected Posts
	$('.approvePosts').on('click', function () {
		feed.approvePosts(feed.idList);
	});
	// UI - Hide Selected Posts
	$('.hidePosts').on('click', function () {
		feed.hidePosts(feed.idList);
	});
	// UI - Show Approved posts
	$('.showApproved').on('click', function () {
		feed.showApproved();
	});
	// UI - Show Hidden Posts
	$('.showHidden').on('click', function () {
		feed.showHidden();
	});
	// UI - Select All Posts
	$('.selectAll').on('click', function () {
		feed.selectAll();
	})
	// UI - Deselect All Posts
	$('.deselectAll').on('click', function () {
		feed.deselectAll();
	})
	// UI - Show New Posts
	$('.showNew').on('click', function () {
		feed.showNew();
	})
	// UI - Delete Selected Posts
	$('.deleteSelected').on('click', function () {
		feed.deletePosts(feed.idList);
	})

	$(window).scroll(function () {   
		if ($(window).scrollTop() <= 118 && !feed.idList.length) {
			$('.ui').fadeOut(200);
			feed.uiOpen = false;
		} else {
			$('.ui').fadeIn(600);
			feed.uiOpen = true;
		}
	});


/**
 *	Isotope Custom Binding
 **/

ko.bindingHandlers.isotope = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    	var $el = $(element);
        var value = ko.utils.unwrapObservable(valueAccessor());
        var $container = $(value.container);
        var updateLayout = function () {
        	$container.isotope({
	        	containerStyle: {
	        		overflow: "visible"
	        	},
	            itemSelector: value.itemSelector
	        });
	        $container.isotope({
	        	masonry: {
	        		columnWidth: 240
	        	},
	        	itemSelector: $el
	    	});
	    	$container.isotope('appended', $el);
	        $container.isotope('reLayout');
        };
        if (!$container.hasClass('isotope')) {
	    	updateLayout();
	    } else {
	    	$container.isotope('destroy');
	    	updateLayout();
	    }
    }
};

/**
 *	Init Feed
 **/

	var feed = new Feed();
		ko.applyBindings(feed);
		feed.init();

