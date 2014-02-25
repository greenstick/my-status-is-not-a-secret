/**
 *	Submit Modal Event Bindings
 **/

	//Submit Story Binding
	$("#shareForm").on('submit', function (event) {
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
		event.preventDefault();
		var data = $(element).serialize();
		$('#modalMask, #processing').stop().show();
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