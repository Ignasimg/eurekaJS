import "eurekaJS/events/Event.js";

var ns = namespace("eurekaJS.events");

this.ProgressEvent = ns.ProgressEvent = class ProgressEvent extends Event {
  constructor (type, bubbles, cancelable, loaded, total) {
    super(type, bubbles, cancelable);
    this.bytesLoaded = loaded;
    this.bytesTotal = total;
  }

  static get PROGRESS () {
    return 'progress';
  }
}