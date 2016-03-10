var ns = namespace("eurekaJS.events");

this.EventDispatcher = ns.EventDispatcher = class EventDispatcher {
  constructor () {

    if (this.constructor === EventDispatcher)
      throw new Error("DisplayObject can't be instantiated");

    this._listeners = {};
  }

  addEventListener (type, listener) {
    this._listeners[type] = this._listeners[type] || [];

    if (this._listeners[type].indexOf(listener) == -1)
      this._listeners[type].push(listener);
  }

  removeEventListener (type, listener) {
    if (!this._listeners[type]) return;
    
    var index = this._listeners[type].indexOf(listener);
    if (index == -1) return;

    this._listeners[type].splice(index, 1);
  }

  dispatchEvent (event) {
    if (!this._listeners[event.type]) return;

    // Copy the array to avoid problems in cases where 
    // the listener might remove itself.
    var listeners = this._listeners[event.type].slice(0);

    for (var i = 0; i < listeners.length; ++i) {
      listeners[i].call(null, event);
    }
  }
}