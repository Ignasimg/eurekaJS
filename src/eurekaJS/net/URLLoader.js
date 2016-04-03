import "eurekaJS/events/EventDispatcher.js";
import "eurekaJS/events/Event.js";
import "eurekaJS/events/ProgressEvent.js";
import "eurekaJS/events/IOErrorEvent.js";
import "eurekaJS/net/URLRequest.js";
import "eurekaJS/net/URLRequestMethod.js";

var ns = namespace("eurekaJS.net");

this.URLLoader = ns.URLLoader = class URLLoader extends eurekaJS.events.EventDispatcher {
  constructor (request) {
    super();

    this._xhttp = new XMLHttpRequest();

    this.bytesLoaded = 0;
    this.bytesTotal = 0;
    this.data = null;

    var events = [
      'loadstart',
      'progress', 
      'error', 
      'abort',
      'timeout',
      'load'];
    events.forEach(event => this._xhttp.addEventListener(event, this._eventHandler.bind(this)));

    this._xhttp.addEventListener

    if (request)
      this.load(request);
  }

  _eventHandler (event) {
    var event;
    switch (event.type) {
      case 'loadstart' :
        event = new Event(Event.OPEN);
        break;
      case 'progress' :
        event = new ProgressEvent(ProgressEvent.PROGRESS, false, false, event.loaded, event.total);
        this.bytesTotal = event.total;
        this.bytesLoaded += event.loaded;
        break;
      case 'abort' :
      case 'timeout' :
      case 'error' :
        event = new IOErrorEvent(IOErrorEvent.IO_ERROR, false, false, this._xhttp.responseText);
        break;
      case 'load' :
        event = new Event(Event.COMPLETE);
        this.data = this._xhttp.response;
        break;
    }
    event._target = this._xhttp;
    event._nextPhase();
    this.dispatchEvent(event);
  }

  load (request) {
    if (!(request instanceof eurekaJS.net.URLRequest) || (request.url === null)) {
      throw new TypeError('The value of the request parameter or the URLRequest.url property of the URLRequest object passed are null.')
    }

    this._xhttp.open(request.method, request.url, true);
    this._xhttp.send(request.data);
  }
}