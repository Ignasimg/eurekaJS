var ns = namespace("eurekaJS.events");

this.EventPhase = ns.EventPhase = class EventPhase {
  static get CAPTURING_PHASE () {
    return 1;
  }

  static get AT_TARGET () {
    return 2;
  }

  static get BUBBLING_PHASE () {
    return 4;
  }
}