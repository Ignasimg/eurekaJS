import "eurekaJS/events/EventPhase.js";

var ns = namespace("eurekaJS.events");

this.EventDispatcher = ns.EventDispatcher = class EventDispatcher {
  constructor () {

    if (this.constructor === EventDispatcher)
      throw new Error("DisplayObject can't be instantiated");

    this._listeners = {};
  }

  addEventListener (type, listener, phase) {
    var CAPTURING_PHASE = eurekaJS.events.EventPhase.CAPTURING_PHASE;
    var AT_TARGET       = eurekaJS.events.EventPhase.AT_TARGET;
    var BUBBLING_PHASE  = eurekaJS.events.EventPhase.BUBBLING_PHASE;

    // If phase is not defined, we capture in the target and bubbling phase
    phase = phase || (AT_TARGET | BUBBLING_PHASE);

    this._listeners[type] = this._listeners[type] || {};

    this._listeners[type][CAPTURING_PHASE] =
      this._listeners[type][CAPTURING_PHASE] || [];

    this._listeners[type][AT_TARGET]       =
      this._listeners[type][AT_TARGET] || [];

    this._listeners[type][BUBBLING_PHASE]  =
      this._listeners[type][BUBBLING_PHASE] || [];


    if (phase & CAPTURING_PHASE)
      if (this._listeners[type][CAPTURING_PHASE].indexOf(listener) == -1)
        this._listeners[type][CAPTURING_PHASE].push(listener);

    if (phase & AT_TARGET)
      if (this._listeners[type][AT_TARGET].indexOf(listener) == -1)
        this._listeners[type][AT_TARGET].push(listener);

    if (phase & BUBBLING_PHASE)
      if (this._listeners[type][BUBBLING_PHASE].indexOf(listener) == -1)
        this._listeners[type][BUBBLING_PHASE].push(listener);
  }

  removeEventListener (type, listener, phase) {
    var CAPTURING_PHASE = eurekaJS.events.EventPhase.CAPTURING_PHASE;
    var AT_TARGET       = eurekaJS.events.EventPhase.AT_TARGET;
    var BUBBLING_PHASE  = eurekaJS.events.EventPhase.BUBBLING_PHASE;

    if (!this._listeners[type]) return;
    
    if (phase & CAPTURING_PHASE)
      var index = this._listeners[type][CAPTURING_PHASE].indexOf(listener);
        if (index !== -1)
          this._listeners[type][CAPTURING_PHASE].splice(index, 1);

    if (phase & AT_TARGET)
      var index = this._listeners[type][AT_TARGET].indexOf(listener);
        if (index !== -1)
          this._listeners[type][AT_TARGET].splice(index, 1);

    if (phase & BUBBLING_PHASE)
      var index = this._listeners[type][BUBBLING_PHASE].indexOf(listener);
        if (index !== -1)
          this._listeners[type][BUBBLING_PHASE].splice(index, 1);
  }

  dispatchEvent (event) {
    if (!this._listeners[event.type])
      return;

    if (this._listeners[event.type][event.eventPhase].length === 0)
      return;

    event._currentTarget = this;

    // Copy the array to avoid problems in cases where 
    // the listener might remove itself.
    var listeners = this._listeners[event.type][event.eventPhase].slice(0);

    var stopped = false;
    for (var i = 0; i < listeners.length; ++i) {
      //var ne = event.clone();
      // Instead of cloning the object we just create a new one with the prototype of the original.
      var ne = Object.create(event);
      listeners[i].call(null, ne);
      stopped = stopped || ne._stopped;
    }
    event._stopped = stopped;
  }
}