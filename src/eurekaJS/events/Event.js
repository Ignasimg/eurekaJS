import "eurekaJS/events/EventPhase.js";

var ns = namespace("eurekaJS/events/Event.js");

this.Event = ns.Event = class Event {
  constructor (type, bubbles, cancelable) {
    this._type = type;
    this._bubbles = bubbles || false;

    // TODO :: add cancelable behaviour
    this._cancelable = cancelable || false;
    this._cancelled = false;

    this._currentTarget = null;
    this._target = null;
    this._phase = eurekaJS.events.EventPhase.CAPTURING_PHASE;

    this._stopped = false;
  }

  get type () {
    return this._type;
  }

  get bubbles () {
    return this._bubbles;
  }

  get cancelable () {
    return this._cancelable;
  }

  get currentTarget () {
    return this._currentTarget;
  }

  get target () {
    return this._target;
  }

  get eventPhase () {
    return this._phase;
  }

  _nextPhase () {
    if (this._phase === eurekaJS.events.EventPhase.CAPTURING_PHASE)
      this._phase = eurekaJS.events.EventPhase.AT_TARGET;
    else if (this._phase === eurekaJS.events.EventPhase.AT_TARGET)
      this._phase = eurekaJS.events.EventPhase.BUBBLING_PHASE;
  }

  clone (event) {
    var newEvent = new Event(this.type, this.bubbles, this.cancelable);
    newEvent._cancelled = this._cancelled;
    newEvent._currentTarget = this._currentTarget;
    newEvent._target = this._target;
    newEvent._phase = this._phase;
    newEvent._stopped = this._stopped;
    return newEvent;
  }

  isDefaultPrevented () {
    return this._cancelled;
  }

  preventDefault () {
    if (this._cancelable) 
      this._cancelled = true;
  }

  stopPropagation () {
    this._stopped = true;
  }
}