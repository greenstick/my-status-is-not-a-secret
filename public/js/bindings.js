/**
 *	DOM Event Bindings
 **/

/**
 *	Modal Bindings
 **/
 	//Open Modal
	$('.openModal').on("click", function () {
		$('#modal, #mask').stop().fadeIn(600);
	});
	//Close Modal
	$('.exitModal').on("click", function () {
		$(this).parent().stop().fadeOut(400);
		$('#mask').stop().fadeOut(400);
	});
	//Submit Story
	$("#shareForm").on('submit', function (event) {
		event.preventDefault();
		var data = $(this).serialize();
		$.ajax({
			type: "POST",
			url: 'submit',
			data: data
		}).done(function () {
			
		}).fail(function () {

		}).always(function () {
			console.log(arguments);
		});
	});
	//Image Highlighting
	$('.image').on("click", function () {
		$('.image').removeClass('selected')
		$(this).addClass('selected');
	})