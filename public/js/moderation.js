/** 
 *	Feed Viewmodel Class
 **/

var Feed = function () {
	var feed = this;
		feed.pages = ko.observableArray([]),
		feed.chunk = 1,
		feed.end = false,
		feed.idList = [];

		//Initialize Feed
		feed.init = function () {
			$('.loading').show();
			console.log("XHR Status: Requesting...");
			$.ajax({
				type: "GET", 
				url: "/newposts"
			}).done(function (response) {
				console.log("XHR Status: Success");
				var data = response;
					for(var i = 0; i < data.length; i++) {
						if (data[i].approved !== true) {
							feed.pages.push(data[i]);
						}
					}
					$('#feed').isotope('reLayout');
			}).fail(function () {
				console.log("XHR Status: Failed");
			}).always(function () {
				console.log("XHR Status: Resolved");
				$('.loading').hide();
			})
		};

		feed.removeID = function (arr) {
			var what, a = arguments, L = a.length, ax;
		    while (L > 1 && arr.length) {
		        what = a[--L];
		        while ((ax= arr.indexOf(what)) !== -1) {
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
			 	}
			 } else {
			 	$(tile).addClass('selected');
			 	feed.idList.push($(tile).attr('id'));
			 	$('.ui').fadeIn(600);
			 }
			 console.log(feed.idList);
		};

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
				console.log("XHR Status: Success");
				var data = response;
					feed.pages([]);
					for(var i = 0; i < data.length; i++) {
						if (data[i].approved !== true) {
							feed.pages.push(data[i]);
						}
					}
			}).fail(function () {
				console.log("XHR Status: Failed");
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
				console.log("XHR Status: Success");
				var data = response;
				feed.pages([]);
					for(var i = 0; i < data.length; i++) {
						if (data[i].approved !== true) {
							feed.pages.push(data[i]);
						}
					}
			}).fail(function () {
				console.log("XHR Status: Failed");
			}).always(function () {
				$('#mask').fadeOut(400);
			})
		};

		//Show Approved Posts
		feed.showApproved = function () {
			$('#mask').fadeIn(600)
			console.log("XHR Status: Requesting...");
			$.ajax({
				type: "GET", 
				url: "/showApproved"
			}).done(function (response) {
				console.log("XHR Status: Success");
				var data = response;
				feed.pages([]);
					for(var i = 0; i < data.length; i++) {
						if (data[i].approved === true) {
							feed.pages.push(data[i]);
						}
					}
			}).fail(function () {
				console.log("XHR Status: Failed");
			}).always(function () {
				console.log("XHR Status: Resolved");
				$('#mask').fadeOut(400);
			})
		};

		//Show Hidden Posts
		feed.showHidden = function () {
			$('#mask').fadeIn(600)
			console.log("XHR Status: Requesting...");
			$.ajax({
				type: "GET", 
				url: "/showHidden"
			}).done(function (response) {
				console.log("XHR Status: Success");
				var data = response;
				feed.pages([]);
					for(var i = 0; i < data.length; i++) {
						if (data[i].approved !== true) {
							feed.pages.push(data[i]);
						}
					}
			}).fail(function () {
				console.log("XHR Status: Failed");
			}).always(function () {
				console.log("XHR Status: Resolved");
				$('#mask').fadeOut(400);
			})
		};
};

/**
 *	Event Bindings
 **/

	$('#feed').on('click', '.storyTile', function (tile) {
		feed.select(this);
	});
	$('.approvePosts').on('click', function () {
		feed.approvePosts(feed.idList);
	});
	$('.hidePosts').on('click', function () {
		feed.hidePosts(feed.idList);
	});
	$('.showApproved').on('click', function () {
		feed.showApproved();
	});
	$('.showHidden').on('click', function () {
		feed.showHidden();
	});

	$(window).scroll(function () {   
		if ($(window).scrollTop() <= 118 && !feed.idList.length) {
			$('.ui').fadeOut(200);
		} else {
			$('.ui').fadeIn(600);
		}
	});


/**
 *	Isotope Custom Binding
 **/

ko.bindingHandlers.isotope = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    	var $el = $(element);
        var value = ko.utils.unwrapObservable(valueAccessor());
        var $container = $(value.container);
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
        	containerStyle: {
        		overflow: "visible"
        	},
        	itemSelector: $el
    	});
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var $el = $(element);
        var value = ko.utils.unwrapObservable(valueAccessor());
        var $container = $(value.container);
        $container.isotope({
            itemSelector: value.itemSelector
        });
        $container.isotope('appended', $el);
        $container.isotope('reLayout');
    }
};

/**
 *	Init Feed
 **/

	var feed = new Feed();
		ko.applyBindings(feed);
		feed.init();

