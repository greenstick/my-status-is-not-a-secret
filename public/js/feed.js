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
	feed.init = function (page) {
		$('.loading').show();
		// console.log("XHR Status: Requesting...");
		$.ajax({
			type: "GET", 
			url: "/retrieve",
			dataType: "json",
			data: {"page": page}
		}).done(function (response) {
			// console.log("XHR Status: Success");
			var data = response;
				for(var i = 0; i < data.length; i++) {
					if (data[i].approved === true) {
						feed.pages.push(data[i]);
					}
				}
				// console.log(data);
		}).fail(function () {
			// console.log("XHR Status: Failed");
		}).always(function () {
			$('.loading').hide();
			// console.log("XHR Status: Resolved");
		})
	};

	//Update Feed
	feed.update = function (load) {
		$('.failed').hide();
		$('.loading').show();
		// console.log("XHR Status: Requesting...");
		$.ajax({
			type: "GET", 
			url: "/retrieve",
			dataType: "json",
			data: {"page": load}
		}).done(function (response) {
			// console.log("XHR Status: Success");
			var data = response;
				if (data.length < 16) {
					feed.end = true;
				}
				for(var i = 0; i < data.length; i++) {
					if (data[i].approved === true) {
						feed.pages.push(data[i]);
					};
				}
				// console.log(feed.pages());
		}).fail(function () {
			$('.failed').show();
			// console.log("XHR Status: Failed");
		}).always(function () {
			$('.loading').hide();
			// console.log("XHR Status: Resolved");
		})
	};
};

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
 *	Feed Event Bindings
 **/

	// Detect When User Reaches Bottom
	$(window).scroll(function () {   
		if ($(window).scrollTop() + $(window).height() == $(document).height()) {
			feed.chunk++;
			feed.end == false ? feed.update(feed.chunk) : $('.done').show();
		}
	});

/**
 *	Init Feed
 **/

	var feed = new Feed();
		ko.applyBindings(feed);
		feed.init(feed.chunk);

