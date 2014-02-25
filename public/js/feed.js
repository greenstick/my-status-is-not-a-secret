/** 
 *	Feed Viewmodel
 **/

var Feed = function () {
	var feed = this;
		feed.page = ko.observable();

		feed.init = function () {
			$('#feed').isotope({
				masonry: {
					columnWidth: 237
				}
			})
		};
		//Retrieve Submissions
		feed.retrieve = function (data) {
			$('.loading').show();
			console.log("XHR Status: Requesting...");
			$.ajax({
				type: "GET", 
				url: "/retrieve",
				data: data
			}).done(function (response) {
				console.log("XHR Status: Success");
				return response;
			}).fail(function () {
				console.log("XHR Status: Failed");
			}).always(function () {
				$('.loading').hide();
				console.log("XHR Status: Resolved");
			})
		};

		//Output Submissions
		feed.data = ko.computed(function () {
			var data = ko.observableArray(feed.retrieve());
			console.log(data)
		});
};

var feed = new Feed();
	ko.applyBindings(feed);
	feed.init();