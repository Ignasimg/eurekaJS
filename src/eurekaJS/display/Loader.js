import "eurekaJS/display/DisplayObjectContainer.js";
import "eurekaJS/display/LoaderInfo.js";
import "eurekaJS/events/Event.js";

var ns = namespace("eurekaJS.display");

this.Loader = ns.Loader = class Loader extends ns.DisplayObjectContainer {
  constructor () {
    super();
    this._contentLoaderInfo = new LoaderInfo(this);
  }

  load (request) {
    this._contentLoaderInfo._load(request);
    this._contentLoaderInfo.addEventListener(Event.COMPLETE, this._loadComplete.bind(this));
  }

  loadBytes (bytes) {
    this._contentLoaderInfo._loadBytes(bytes);
    this._contentLoaderInfo.addEventListener(Event.COMPLETE, this._loadComplete.bind(this));
  }

  _loadComplete (event) {
    this.addChild(this.content);
  }

  get content () {
    return this._contentLoaderInfo.content;
  }
}