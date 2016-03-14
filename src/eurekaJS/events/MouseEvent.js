import "eurekaJS/events/Event.js";

var ns = namespace("eurekaJS.events");

this.MouseEvent = ns.MouseEvent = class MouseEvent extends Event {
  constructor (nativeMouseEvent) {
    super(nativeMouseEvent.type, true, false);
    this._altKey = nativeMouseEvent.altKey;
    this._ctrlKey = nativeMouseEvent.ctrlKey;
    this._shiftKey = nativeMouseEvent.shiftKey;
    // TODO :: There are many other available properties... 
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
  }

  get altKey () {
    return this._altKey;
  }

  get ctrlKey () {
    return this._ctrlKey;
  }

  get shiftKey () {
    return this._shiftKey;
  }

  static get CLICK () {
    return 'click';
  }

  static get MOUSEMOVE () {
    return 'mousemove';
  }

  static get MOUSEUP () {
    return 'mouseup';
  }

  static get MOUSEDOWN () {
    return 'mousedown';
  }
}