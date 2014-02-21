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
	$('.submitModal').on("click", function () {

	});
	//Image Highlighting
	$('.image').on("click", function () {
		$('.image').removeClass('selected')
		$(this).addClass('selected');
	})