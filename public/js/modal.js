/**
 *	DOM Event Bindings
 **/

 	//Open Modal
	$('.openModal').on("click", function () {
		openModal();
	})

	//Exit Modal Binding
	$('#exitModal').on("click", function () {
		exitModal();
	})

/** 
 *	Methods
 **/

	var openModal = function () {
		$('#iframe, #mask, #exitModal').stop().fadeIn(600);
	};

	var exitModal = function () {
		$('#mask, #exitModal, #iframe').stop().fadeOut(400);
	};