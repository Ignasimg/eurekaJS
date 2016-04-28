import "eurekaJS/display/DisplayObjectContainer.js";
import "eurekaJS/net/URLRequest.js";
import "eurekaJS/net/URLLoader.js";
import "eurekaJS/net/URLLoaderDataFormat.js";

import "eurekaJS/display/BitmapData.js";
import "eurekaJS/display/Bitmap.js";

var ns = namespace("eurekaJS.display");

this.Loader = ns.Loader = class Loader extends ns.DisplayObjectContainer {
  constructor () {
    super();

    this._content = null;
    //this._contentLoaderInfo = null;
    //this._uncaughtErrorEvents = null;
  }

  load (request) {
    var urlLoader = new URLLoader();
    urlLoader.dataFormat = URLLoaderDataFormat.BINARY;
    urlLoader.addEventListener(Event.COMPLETE, e => this.loadBytes(urlLoader.data));
    urlLoader.load(request);
  }

  loadBytes (bytes) {
    var bd = BitmapData._fromArrayBuffer(bytes);
    this._content = new Bitmap(bd);
    this.addChild(this._content);
  }

  get content () {
    return this._content;
  }
}