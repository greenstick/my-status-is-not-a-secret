
/**
 *	Submit Modal Event Bindings
 **/

	//Image Highlighting Binding
	$('.filter').on("click", function () {
		selectFilter(this)
	})

	$('.doneEditing').on("click", function (event) {
		$('#imageEditor').fadeOut(400);
	})
	$('.mainImage').on("click", function () {
		dragImage('.mainImage', '#uploadedImage', '.containment');
	})
	$('.doneEditing').on("click", function () {
		var image, x = 0, y = 0;
		if ($('#uploadedImage').width() > 200 && $('#uploadedImage').height() > 200) {
			x = $('#uploadedImage').width() - $('#uploadedImage').position().left - 200;
			y = $('#uploadedImage').height() - $('#uploadedImage').position().top - 200;
		} else if ($('#uploadedImage').width() > 200) {
			x = $('#uploadedImage').width() - $('#uploadedImage').position().left - 200;
			y = $('#uploadedImage').height()/2 - 100;
		} else if ($('#uploadedImage').height() > 200) {
			x = $('#uploadedImage').width()/2 - 100;
			y = $('#uploadedImage').height() - $('#uploadedImage').position().top - 200;
		} else {
			x = $('#uploadedImage').width()/2 - 100;
			y = $('#uploadedImage').height()/2 - 100;
		}
		//Cropping Image, Encoding to Base64, & Saving to Local Storage
		Caman('#uploadedImage', function () {
			this.crop(200, 200, x, y);
			this.render(function () {
				image = this.toBase64();
				window.localStorage.setItem("image-edited", image);
			})
		});
	});

/**
 *	Modal Interaction Methods
 **/

 	//Select Filter
	var selectFilter = function (element) {
		$('.filter').removeClass('selected');
		$(element).addClass('selected');
		renderImage({element: $('#uploadImage')[0], filter: $(element).data('filter')})
	};

	//Drag to Crop Image
	var dragImage = function (parent, child, container) {
		var img;
		if ($(child).width() > 200 || $(child).height() > 200) {
			img 	= $(child).draggable({containment: container}),
			h 		= img.height(),
			w 		= img.width(),
			outer 	= $(parent),
			oH 		= outer.height(),
			oW 		= outer.width(),
			iH 		= h + (h - oH),
			iW 		= w + (w - oW),
			iT 		= '-' + ((iH - oH)/2) + 'px',
			iL 		= '-' + ((iW - oW)/2) + 'px';
			$(container).css({width: iW, height: iH, top: iT, left: iL});
		} else {
			$(container).css({width: 200, height: 200, top: 0, left: 0});
		}
	};	

/**
 *	Render Image
 **/

 function renderImage (params) {
 	var input 	= params.element,
 		filter 	= params.filter;
		if (typeof reader === 'object' && filter !== "noFilter") {
			Caman('#uploadedImage', function () {
				this.revert();
				this[filter]();
				this.render();
			})
			reader.readAsDataURL(input.files[0]);
 		}
 		if (typeof reader === 'object' && filter === "noFilter") {
			Caman('#uploadedImage', function () {
				this.revert();
				this.render();
			})
			reader.readAsDataURL(input.files[0]);
 		} else {
			if (input.files && input.files[0]) {
	 			reader = new FileReader();
				reader.onload = function (e) {
					$('#uploadedImage').attr('src', e.target.result);
					Caman('#uploadedImage', function () {
						this.render();
					})
				}
				reader.readAsDataURL(input.files[0]);
			}
 		}
 }

 $('#uploadImage').change(function () {
 	renderImage({element: this, filter: ""});
 	$('#imageEditor').fadeIn(600);
 })

/**
 *	Init First Selected Filter
 **/

selectFilter('.filter:first-child');


// })();