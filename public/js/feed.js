/** 
 *	Feed Viewmodel Class
 **/

var Feed = function () {
	var feed = this;
		feed.pages = ko.observableArray([]),
		feed.pageToLoad = 1;

		//Initialize Feed
		feed.init = function () {
			feed.update({}, feed.pageToLoad);
			$('#feed').isotope({
				masonry: {
					columnWidth: 237
				}
			})
		};

		//Update Feed
		feed.update = function (data, load) {
			console.log("page to load: " + load);
			$('.loading').show();
			console.log("XHR Status: Requesting...");
			$.ajax({
				type: "GET", 
				url: "/retrieve" + load,
				data: data
			}).done(function (response) {
				console.log("XHR Status: Success");
				var data = response;
				console.log(data);
					feed.pages.push({page: data});
			}).fail(function () {
				console.log("XHR Status: Failed");
			}).always(function () {
				$('.loading').hide();
				console.log("XHR Status: Resolved");
			})
		};
};

/**
 *	Isotope Custom Binding
 **/

ko.bindingHandlers.isotope = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    	var $el = $(element);
        var value = ko.utils.unwrapObservable(valueAccessor());
        var $container = $(value.container);
        $container.isotope({
            itemSelector: value.itemSelector
        });
        $container.isotope('appended', $el);
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
 *	Feed Event Bindings
 **/

	// Detect When User Reaches Bottom
	$(window).scroll(function() {   
		if ($(window).scrollTop() + $(window).height() == $(document).height()) {
			feed.pageToLoad++;
			feed.update({}, feed.pageToLoad);
		}
	});

/**
 *	Init Feed
 **/

	var feed = new Feed();
		ko.applyBindings(feed);
		feed.init();

