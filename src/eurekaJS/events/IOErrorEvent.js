import "eurekaJS/events/Event.js";

var ns = namespace("eurekaJS.events");

this.IOErrorEvent = ns.IOErrorEvent = class IOErrorEvent extends Event {
  constructor (type, bubbles, cancelable, text) {
    super(type, bubbles, cancelable);
    this.text = text;
  }

  static get IO_ERROR () {
    return 'ioError';
  }
}