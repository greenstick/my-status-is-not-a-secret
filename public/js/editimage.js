/**
 *	Image Editor Class
 **/

var ImageEditor = function (args) {
	var editor = this;
		editor.ui = $(args.ui),
		editor.filter = $(args.filter),
		editor.image = $(args.image),
		editor.tar = args.image,
		editor.file = $(args.file),
		editor.viewport = $(args.viewport),
		editor.container = $(args.container);
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
	var editor = this, input = editor.file[0];
		editor.image = $(editor.tar);

	typeof resize === undefined ? resize = 1 : resize = resize;
	if (typeof reader === 'object' && filter !== "") {
		Caman(editor.tar, function () {
			this.revert();
			// this.resize({
			// 	width:  editor.image.height() * resize,
			// 	height: editor.image.width() * resize
			// })
			this[filter]();
			this.render();
		})
		reader.readAsDataURL(input.files[0])
	}
	else if (typeof reader === 'object' && filter === "") {
		Caman(editor.tar, function () {
			this.revert();
			// this.resize({
			// 	width: editor.image.width() * resize,
			// 	height: editor.image.height() * resize
			// })
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
	editor.renderImage(e.data('filter'));
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
		editor.container.css({width: iW, height: iH, top: iT, left: iL});
		editor.image.css({top: editor.image.height() - 200, left: editor.image.width() - 200});
	}
	else {
		editor.container.css({width: 200, height: 200, top: 0, left: 0});
	}
}
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
}

/**
 *	Instantiation
 **/

var imgEditor = new ImageEditor({ui: '#imageEditor', filter: '.filter', image: '#uploadedImage', file: '#uploadImage', viewport: '.mainImage', container: '.containment'});

/**
 *	Event Bindings
 **/

$('#uploadImage').change(function () {
	imgEditor.init();
})

$('.filter').on("click", function () {
	imgEditor.selectFilter(this)
})

$('.doneEditing').on("click", function (event) {
	imgEditor.submitImage();
});

$('.mainImage').on("click", function () {
	imgEditor.dragImage();
})