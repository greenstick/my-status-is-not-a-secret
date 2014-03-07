

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
	$('.mainImage').on("mouseenter", function () {
		dragImage('.mainImage', '#uploadedImage', '.containment');
	})
	$('.doneEditing').on("click", function () {
		Caman('#uploadedImage', function () {
			this.crop(200, 200);
			var image = this.toBase64();
			console.log(image);
			$('uploadImage').val(image);
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
			w		= img.width(),
			outer 	= $(parent),
			oH		= outer.height(),
			oW		= outer.width(),
			iH		= h + (h - oH),
			iW 		= w + (w - oW),
			iT 		= '-' + ((iH - oH)/2) + 'px',
			iL		= '-' + ((iW - oW)/2) + 'px';
			$(container).css({width: iW, height: iH, top: iT, left: iL});
		} else {
			img 	= $(child).draggable({containment: container});
			$(container).css({width: 200, height: 200, top: 0, left: 0});
		}
	};	

/**
 *	Render Image
 **/

 function renderImage (params) {
 	var input = params.element,
 		filter = params.filter;
 		if (typeof reader === 'object') {
			Caman('#uploadedImage', function () {
				this.revert();
				this[filter]();
				this.render();
			})
			reader.readAsDataURL(input.files[0]);
 		} else {
 			console.log("no reader");
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
 	dragImage($('.mainImage'), $('#uploadedImage'));
 	$('#imageEditor').fadeIn(600);
 })

/**
 *	Init First Selected Filter
 **/

selectFilter('.filter:first-child');


// })();