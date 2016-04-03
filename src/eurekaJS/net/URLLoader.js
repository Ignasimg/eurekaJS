import "eurekaJS/events/EventDispatcher.js";
import "eurekaJS/net/URLRequest.js";
import "eurekaJS/net/URLRequestMethod.js";

var ns = namespace("eurekaJS.net");

this.URLLoader = ns.URLLoader = class URLLoader extends eurekaJS.events.EventDispatcher {
  constructor (request) {
    super();

    this._xhttp = new XMLHttpRequest();

    if (request)
      this.load(request);
  }

  load (request) {
    if (!(request instanceof eurekaJS.net.URLRequest) || (request.url === null)) {
      throw new TypeError('The value of the request parameter or the URLRequest.url property of the URLRequest object passed are null.')
    }

    this._xhttp.open(request.method, request.url, true);
    this._xhttp.send(request.data);
  }
}