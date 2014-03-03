/**
 *	Submit Modal Event Bindings
 **/

	//Submit Story Binding
	$(".submitModal").on('submit', function (event) {
		submitStory(this);
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
		var longPath, path, l;
		console.log(element);
		$('.image').removeClass('selected');
		$(element).addClass('selected');
		console.log($('.selected').attr('src'));
		longPath = $('.selected').attr('src');
		path = longPath.slice(7, longPath.length);
		$('#selectedImage').val(path);
	};

	//Upload Image
	var uploadImage = function () {
		$('#uploadImage').click();
	};

	//Submit Story to DB
	var submitStory = function (element) {
		$('#modalMask, #processing').stop().show();
		var data = $(element).serialize();
		$.ajax({
			type: "POST",
			url: '/submit',
			data: data
		}).done(function () {
			$('#modalMask').hide();
			$('#processing, #submissionModal').stop().fadeOut(400);
			$('#modalSuccess').stop().fadeIn(600);
			document.getElementById('shareForm').reset();
		}).fail(function () {
			$('#modalFail').stop().fadeIn(600);
		}).always(function () {
			console.log(data);
		});
	};

/**
 *	Init First Selected Image
 **/

selectImage('.image:first-child');