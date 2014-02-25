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
 *	Modal CSS Methods
 **/

	var openModal = function () {
		$('#iframeModal, #mask, #exitModal').stop().fadeIn(600);
	};

	var exitModal = function () {
		$('#mask, #exitModal, #iframeModal').stop().fadeOut(400);
	};