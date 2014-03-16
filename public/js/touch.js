var TouchHandler = function (event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
            touchstart: "mousedown",
            touchmove: "mousemove",
            touchend: "mouseup"
        }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

var touchInit = function () {
    document.addEventListener("touchstart", TouchHandler, true);
    document.addEventListener("touchmove", TouchHandler, true);
    document.addEventListener("touchend", TouchHandler, true);
    document.addEventListener("touchcancel", TouchHandler, true);
}

touchInit();