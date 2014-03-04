/**
 *	Submit Modal Event Bindings
 **/

	//Submit Story Binding
	$(".submitModal").on('click', function () {
		submitStory();
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

 	//Select Image
	var selectImage = function (element) {
		var longPath, path;
		$('.image').removeClass('selected');
		$(element).addClass('selected');
		longPath = $('.selected').attr('src');
		path = longPath.slice(7, longPath.length);
		$('#selectedImage').val(path);
	};

	//Upload Image
	var uploadImage = function () {
		$('#uploadImage').click();
	};

	//Submit Story to DB
	var submitStory = function () {
		$('#modalMask, #processing').stop().fadeIn(200);
	};

/**
 *	Init First Selected Image
 **/

selectImage('.image:first-child');