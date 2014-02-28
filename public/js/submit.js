/**
 *	Submit Modal Event Bindings
 **/

	//Submit Story Binding
	$(".submitModal").on('submit', function (event) {
		submitStory(this);
	});

	//Image Highlighting Binding
	$('.image').on("click", function () {
		selectImage(this);
	})
	//Upload Image Binding
	$('.image:nth-child(6)').on("click", function () {
		uploadImage();
	})

/**
 *	Modal Interaction Methods
 **/

 	//Select Image
	var selectImage = function (element) {
		$('.image').removeClass('selected')
		$(element).addClass('selected');
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
		// $('#shareForm').iframePostForm({
		// 	json: true,
		// 	post: function () {
		// 		if ($('input[type=file').val().length) {
		// 			$('#modalMask, #processing').stop().show();
		// 			console.log("processing");
		// 		} else {
		// 			$('#modalMask, #noImage').stop().fadeIn(600, function () {
		// 				$('#modalMask, #noImage').stop().fadeOut(600);
		// 			});
		// 			console.log("no image");
		// 			return false;
		// 		}
		// 	},
		// 	complete: function (response) {
		// 		if (!response.success) {
		// 			$('#modalFail').stop().fadeIn(600);
		// 			console.log("image upload failed");
		// 		} else {
		// 			if (response.postedValues) {
		// 				console.log(response.imageSize);
		// 				console.log("^^^^^^^^ image size ^^^^^^^^");
		// 				console.log(response.imageSource);
		// 				console.log("^^^^^^^^ image source ^^^^^^^^");
		// 			}
		// 		}
		// 	}
		// });
	};