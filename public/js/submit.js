/**
 *	Submit Modal Event Bindings
 **/

	//Submit Story Binding
	$(".submitModal").on('click', function () {
		$('.storyInput').is(':invalid') ? false : $('.state-input').is(':invalid') ? false : submitStory();
	});
	//Image Highlighting Binding
	$('.image').on("click", function (event) {
		selectImage(this);
	})
	//User Uploaded Image Binding
	$('.image:nth-child(6)').on("click", function (events) {
		uploadImage();
	})

/**
 *	Modal Interaction Methods
 **/

 //Initialize Feed
	var submitStory = function (page) {
		$('#modalMask, #processing').stop().fadeIn(200);
		var story = $('.storyInput').val(),
			first = $('.first-input').val(),
			last = $('.last-input').val(),
			country = $('.country-input').val(),
			state = $('.state-input').val(),
			selected = $('.selectedImage').val(),
			edited = localStorage.getItem("image-edited") || '';
		// console.log("XHR Status: Requesting...");
		$.ajax({
			type: "POST", 
			url: "../submit",
			dataType: "json",
			data: {
				"data": {
					"story": story,
					"name": {
						"first": first,
						"last": last
					},
					"location": {
						"country": country,
						"state": state
					},
					"images": {
						"edited": edited,
						"selected": selected
					}
				}
			}
		}).done(function (response) {
			$('#modalSuccess').fadeIn(600);
			// console.log("XHR Status: Success");
		}).fail(function () {
			// console.log("XHR Status: Failed");
		}).always(function () {
			// console.log("XHR Status: Resolved");
			window.localStorage.removeItem('image-edited');
			$('#modalMask, #processing').stop().fadeOut(400);
		})
	};

 	//Select Image
	var selectImage = function (element) {
		var longPath, path;
		$('.image').removeClass('selected');
		$(element).addClass('selected');
		longPath = $('.selected').attr('src');
		path = longPath.slice(7, longPath.length);
		$('.selectedImage').val(path);
	};

	//Upload Image
	var uploadImage = function () {
		$('#uploadImage').click();
	};

/**
 *	Init First Selected Image
 **/

selectImage('.image:first-child');