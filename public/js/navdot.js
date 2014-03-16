/**
 *	Basic Navigation Dot Class
 **/

var Dot = function (element) {
	var dot = this;
		dot.element = $(element);
}

//Gets Link Position
Dot.prototype.linkPosition = function (link) {
	var link = link.data();
		return link.position;
}
//Gets Default Dot Position
Dot.prototype.defaultPosition = function () {
	var home = $('.homePosition').data();
		return home.position;
}
//Animates Dot To Hovered Link
Dot.prototype.linkHover = function (link) {
	var to = this.linkPosition(link);
		this.element.stop().animate({"left": to}, 400);
		return to;
}
//Animates Dot to Home Position
Dot.prototype.linkOut = function () {
	var to = this.defaultPosition();
		this.element.stop().animate({"left": to}, 200);
		return to;
}
//Initializes Default Dot Position
Dot.prototype.init = function () {
	var def = this.defaultPosition();
		this.element.css("left", def);
}

//Instatiate New Dot
var dot = new Dot('#dot');
	dot.init();

/**
 *	Events
 **/

$('.nav a, .goHome').on("mouseover", function (e) {
	dot.linkHover($(this));
	e.preventDefault();
})

$('.nav a, .goHome').on("mouseout", function (e) {
	dot.linkOut();
	e.preventDefault();
})