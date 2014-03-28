var Featured = function () {
	var featured = this;
		featured.post = ko.observable();

	//Initialize Feed
	featured.init = function () {
		// console.log("XHR Status: Requesting...");
		$.ajax({
			type: "GET", 
			url: "/showFeatured",
			dataType: "json"
		}).done(function (response) {
			// console.log("XHR Status: Success");
			var data = response;
				featured.post(data);
		}).fail(function () {
			$('.failed').show();
			// console.log("XHR Status: Failed");
		}).always(function () {
			$('.loading').hide();
			// console.log("XHR Status: Resolved");
		});
	};
};

//Initialize Featured Post
var featured = new Featured();
	ko.applyBindings(featured);
	featured.init();
