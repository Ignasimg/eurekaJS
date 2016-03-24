import "eurekaJS/events/Event.js";

var ns = namespace("eurekaJS.events");

this.KeyboardEvent = ns.KeyboardEvent = class KeyboardEvent extends Event {
  constructor (nativeKeyboardEvent) {
    super(nativeKeyboardEvent.type, false, false);
    this._altKey = nativeKeyboardEvent.altKey;
    this._ctrlKey = nativeKeyboardEvent.ctrlKey;
    this._shiftKey = nativeKeyboardEvent.shiftKey;
    this._commandKey = nativeKeyboardEvent.metaKey;
    this._keyLocation = nativeKeyboardEvent.location;

    if (!('keyCode' in nativeKeyboardEvent) || !('charCode' in nativeKeyboardEvent)) {
      // keyCode and charCode have both been deprecated
      console.error('keyCode or charCode not available on KeyboardEvent');
    }

    this._keyCode = nativeKeyboardEvent.which || nativeKeyboardEvent.keyCode;
    this._charCode = nativeKeyboardEvent.charCode;
  }

  get altKey () {
    return this._altKey;
  }

  get charCode () {
    return this._charCode;
  }

  get commandKey () {
    return this._commandKey;
  }

  get ctrlKey () {
    return this._ctrlKey;
  }

  get shiftKey () {
    return this._shiftKey;
  }

  get keyCode () {
    return this._keyCode;
  }

  get keyLocation () {
    return this._keyLocation;
  }

  static get KEY_UP () {
    return 'keyup';
  }

  static get KEY_DOWN () {
    return 'keydown';
  }

  static get KEY_PRESS () {
    return 'keypress';
  }
}