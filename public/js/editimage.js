/**
 *	Image Editor Class
 **/

var ImageEditor = function (args) {
	var editor 					= this;
		editor.ui 				= $(args.ui),
		editor.filter 			= $(args.filter),
		editor.image 			= $(args.image),
		editor.tar 				= args.image,
		editor.file 			= $(args.file),
		editor.viewport 		= $(args.viewport),
		editor.container 		= $(args.container),
		editor.slider 			= $(args.slider),
		editor.selectedFilter 	= [],
		editor.imageDimensions 	= {};
};

/**
 *	Image Editor Methods
 **/

//Initialize
ImageEditor.prototype.init = function () {
	var editor = this;

	this.renderImage({element: this, filter: ""});
	editor.ui.fadeIn(600);
};

//Render Image
ImageEditor.prototype.renderImage = function (filter, resize) {
	var editor = this, input = editor.file[0]; editor.image = $(editor.tar);

	//Set Filter & Resize to Default Values if Undefined
	typeof filter === "undefined" ? filter = "" : filter = filter;
	typeof resize === "undefined" ? resize = 1  : resize = resize;

	//Dimensions to Resize To
	var rWidth 	= editor.imageDimensions.width * resize,
		rHeight = editor.imageDimensions.height * resize;

	//Render to User Generated Specs
	if (typeof reader === 'object' && filter !== "" && resize !== 1) {
		Caman(editor.tar, function () {
			this.revert();
			this.resize({
				width:  rWidth,
				height: rHeight
			})
			this[filter]();
			this.render();
		})
		reader.readAsDataURL(input.files[0])
	}
	else if (typeof reader === 'object' && filter === "" && resize !== 1) {
		Caman(editor.tar, function () {
			this.revert();
			this.resize({
				width:  rWidth,
				height: rHeight
			})
			this.render();
		})
		reader.readAsDataURL(input.files[0])
	}
	else if (typeof reader === 'object' && filter !== "" && resize === 1) {
		Caman(editor.tar, function () {
			this.revert();
			this[filter]();
			this.render();
		})
		reader.readAsDataURL(input.files[0])
	}
	else {
		if (input.files && input.files[0]) {
			reader = new FileReader();
			reader.onload = function (e) {
				editor.image.attr('src', e.target.result);
				Caman(editor.tar, function () {
					this.render();
					editor.imageDimensions.width = this.imageWidth();
					editor.imageDimensions.height = this.imageHeight();
				})
			}
			reader.readAsDataURL(input.files[0]);
		}

	}
};

//Select Filter
ImageEditor.prototype.selectFilter = function (element) {
	var editor = this, e = $(element);

	editor.filter.removeClass('selected');
	e.addClass('selected');
	editor.selectedFilter.splice(0, 1);
	editor.renderImage(e.data('filter'));
	editor.selectedFilter.push(e.data('filter'));
};

//Resize Image
ImageEditor.prototype.resizeImage = function (filter, resize) {
	var editor = this, percent = resize/100;

	editor.renderImage(filter, percent);
};

//Drag to Crop
ImageEditor.prototype.dragImage = function () {
	var editor = this, img;
		editor.image = $(editor.tar);

	if (editor.image.width() > 200 || editor.image.height > 200) {
		img 	= 	editor.image.draggable({containment: editor.container}),
		h 		= 	img.height(),
		w 		= 	img.width(), 
		outer	= 	editor.viewport,
		oH 		= 	outer.height(),
		oW		= 	outer.width(),
		iH		= 	h + (h - oH),
		iW		= 	w + (w - oW),
		iT 		= 	'-' + ((iH - oH)/2) + 'px',
		iL 		= 	'-' + ((iW - oW)/2) + 'px';

		if (editor.image.width() > 200 && editor.image.height > 200) {
			editor.container.css({width: iW, height: iH, top: iT, left: iL});
			editor.image.css({top: editor.image.height() - 200, left: editor.image.width() - 200});
		}
		else if (editor.image.width() > 200 && editor.image.height() < 200) {
			editor.container.css({width: iW, height: 200, top: iT, left: iL});
			editor.image.css({top: editor.image.height() - 200, left: editor.image.width() - 200});
		}
		else {
			editor.container.css({width: 200, height: iH, top: iT, left: iL});
			editor.image.css({top: editor.image.height() - 200, left: editor.image.width() - 200});
		}
	}
	else {
		editor.container.css({width: 200, height: 200, top: 0, left: 0});
	}
};
//Submit Edit
ImageEditor.prototype.submitImage = function () {
	var editor = this, x = 0, y = 0;

		editor.image = $(editor.tar);

	if (editor.image.width() > 200 && editor.image.height() > 200) {
		x 	= 	editor.image.width() - editor.image.position().left - 200;
		y 	= 	editor.image.height() - editor.image.position().top - 200;
	}
	else if (editor.image.width() > 200 && editor.image.height() < 200) {
		x 	= 	editor.image.width() - editor.image.position().left - 200;
		y	=	editor.image.height()/2 - 100;
	} 
	else if (editor.image.height() > 200) {
		y 	= 	editor.image.height() - editor.image.position().top - 200;
		x 	= 	editor.image.width()/2 - 100;
	}
	else {
		x 	= 	editor.image.width()/2 - 100;
		y 	= 	editor.image.height()/2 - 100;
	}

	//Cropping Image, Encoding to Base64, & Saving to Local Storage
	Caman(editor.tar, function () {
		this.crop(200, 200, x, y);
		this.render(function () {
			image = this.toBase64();
			window.localStorage.setItem("image-edited", image);
		})
	});

	editor.ui.fadeOut(400);
};

/**
 *	Instantiation
 **/

//New Image Editor
var imgEditor = new ImageEditor({ui: '#imageEditor', filter: '.filter', image: '#uploadedImage', file: '#uploadImage', viewport: '.mainImage', container: '.containment', slider: '.resizeSlider'});

//Init Resize Slider
$('.resizeSlider').slider({
	min: 1,
	max: 100,
	value: 100,
	range: false,
	orientation: "vertical",
	slide: function (event, ui) {
		$('.resizeSlider').val(ui.value);
	}
})
/**
 *	Event Bindings
 **/

$('#uploadImage').change(function () {
	imgEditor.init();
})

$('.filter').on("touchend, click", function () {
	imgEditor.selectFilter(this)
})

$('.resizeSlider').on("touchend, mouseup", function () {
	imgEditor.resizeImage(imgEditor.selectedFilter[0], $(this).val());
})

$('.doneEditing').on("touchend, click", function (event) {
	imgEditor.submitImage();
});

$('.mainImage').on("touchend, click", function () {
	imgEditor.dragImage();
})