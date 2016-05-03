import "eurekaJS/display/DisplayObjectContainer.js";
import "eurekaJS/display/LoaderInfo.js";
import "eurekaJS/events/Event.js";

var ns = namespace("eurekaJS.display");

this.Loader = ns.Loader = class Loader extends ns.DisplayObjectContainer {
  constructor () {
    super();
    this._contentLoaderInfo = new LoaderInfo(this);
  }

  get contentLoaderInfo () {
    return this._contentLoaderInfo;
  }

  get content () {
    return this.contentLoaderInfo.content;
  }

  load (request) {
    this.contentLoaderInfo._load(request);
    this.contentLoaderInfo.addEventListener(Event.COMPLETE, this._loadComplete.bind(this));
  }

  loadBytes (bytes) {
    this.contentLoaderInfo._loadBytes(bytes);
    this.contentLoaderInfo.addEventListener(Event.COMPLETE, this._loadComplete.bind(this));
  }

  _loadComplete (event) {
    this.addChild(this.content);
  }
}