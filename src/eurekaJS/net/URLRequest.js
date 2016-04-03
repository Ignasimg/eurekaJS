import "eurekaJS/events/URLRequestMethod.js";

var ns = namespace("eurekaJS.net");

this.URLRequest = ns.URLRequest = class URLRequest {
  constructor (url) {
    this.url = url || null;
    this.data = {}
    this._method = URLRequestMethod.GET;
  }

  get method () {
    return this._method;
  }

  set method (value) {
    if (value !== URLRequestMethod.GET && value !== URLRequestMethod.POST) {
      throw new Error("Invalid argument - value parameter is not URLRequestMethod.GET or URLRequestMethod.POST");
    }
    this._method = value;
  }
}