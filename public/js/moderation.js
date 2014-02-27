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

		//Update Feed
		feed.update = function (data, load) {
			$('.failed').hide();
			$('.loading').show();
			console.log("XHR Status: Requesting...");
			$.ajax({
				type: "GET", 
				url: "/newposts",
				dataType: "json",
				data: {"page": load}
			}).done(function (response) {
				console.log("XHR Status: Success");
				var data = response;
					for(var i = 0; i < data.length; i++) {
						if (data[i].approved !== true) {
							feed.pages.push(data[i]);
						}
					}
			}).fail(function () {
				$('.loading').hide();
				$('.failed').show();
				console.log("XHR Status: Failed");
			}).always(function () {
				console.log("XHR Status: Resolved");
				$('.loading').hide();
			})
		};

		//Select Tile
		feed.select = function (tile) {
			$(tile).addClass('selected');
			$('.storyTile.selected').each(function (element) {
				feed.idList.push($(element).attr('id'));
			})
		};

		//Approve Selected Tiles
		feed.approvePosts = function (idList) {
			$('#mask, #loader').fadeIn(600);
			$('.storyTile.selected').each(function () {
				feed.idList.push($(this).attr('id'));
			})
			$.ajax({
				type: "GET",
				url: "/approvePosts",
				dataType: "json",
				data: {"idList": idList}
			}).done(function (response) {

			}).fail(function () {

			}).always(function () {
				$('#mask, #loader').fadeOut(400);
			})
		};

		//Hide Selected Tiles
		feed.hidePosts = function (idList) {
			$('#mask, #loader').fadeIn(600);
			$.ajax({
				type: "GET",
				url: "/hidePosts",
				dataType: "json",
				data: {"idList": idList}
			}).done(function (response) {

			}).fail(function () {

			}).always(function () {
				$('#mask, #loader').fadeOut(400);
			})
		};

		//Hide Selected Tiles
		feed.showApproved = function (idList) {
			$('#mask, #loader').fadeIn(600)
			$.ajax({
				type: "GET",
				url: "/showApproved",
				dataType: "json",
				data: {"idList": idList}
			}).done(function (response) {

			}).fail(function () {

			}).always(function () {
				$('#mask, #loader').fadeOut(400);
			})
		};

				//Hide Selected Tiles
		feed.showHidden = function (idList) {
			$('#mask, #loader').fadeIn(600)
			$.ajax({
				type: "GET",
				url: "/showHidden",
				dataType: "json",
				data: {"idList": idList}
			}).done(function (response) {

			}).fail(function () {

			}).always(function () {
				$('#mask, #loader').fadeOut(400);
			})
		};

};

/**
 *	Event Bindings
 **/

	// Fade UI into View
	$(window).scroll(function () {   
		if ($(window).scrollTop() >= 118) {
			$('.ui').fadeIn(600);
		} else {
			$('.ui').fadeOut(400);
		}
	});

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
		feed.showApproved(feed.idList);
	});
	$('.showHidden').on('click', function () {
		feed.showHidden(feed.idList);
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
    }
};

/**
 *	Init Feed
 **/

	var feed = new Feed();
		ko.applyBindings(feed);
		feed.init();

