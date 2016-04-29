import "eurekaJS/events/EventDispatcher.js"
import "eurekaJS/events/Event.js";
import "eurekaJS/events/IOErrorEvent.js";
import "eurekaJS/events/ProgressEvent.js";
import "eurekaJS/net/URLRequest.js";
import "eurekaJS/net/URLLoader.js";
import "eurekaJS/net/URLLoaderDataFormat.js";
import "eurekaJS/display/Bitmap.js";
import "eurekaJS/display/BitmapData.js";

var ns = namespace("eurekaJS.display");

this.LoaderInfo = ns.LoaderInfo = class LoaderInfo extends eurekaJS.events.EventDispatcher {
  constructor (loader) {
    super();

    this._loader = loader;

    this._bytes = null;
    this._bytesLoaded = null;
    this._bytesTotal = null;
    this._content = null;
    //this._contentType = null;
    this._height = null;
    this._width = null;
    this._url = null;
  }

  get loader () {
    return this._loader;
  }

  get bytes () {
    return this._bytes;
  }

  get bytesLoaded () {
    return this._bytesLoaded;
  }

  get bytesTotal () {
    return this._bytesTotal;
  }
  
  get content () {
    return this._content;
  }

  get contentType () {
    return this._contentType;
  }

  get height () {
    return this._height;
  }

  get width () {
    return this._width;
  }

  get url () {
    return this._url;
  }

  _eventHandler (event) {
    var newEvent = null;
    switch (event.type) {
      case Event.OPEN :
        newEvent = new Event(Event.OPEN);
        break;
      case ProgressEvent.PROGRESS :
        newEvent = new ProgressEvent(ProgressEvent.PROGRESS, false, false, event.loaded, event.total);
        this._bytesTotal = event.total;
        this._bytesLoaded += event.loaded;
        break;
      case IOErrorEvent.IO_ERROR :
        newEvent = new IOErrorEvent(IOErrorEvent.IO_ERROR, false, false, this._xhttp.responseText);
        break;
      case Event.COMPLETE :
        this._loadBytes(event.target.data)
        break;
    }
    if (newEvent !== null) {
      newEvent._target = this;
      newEvent._nextPhase();
      this.dispatchEvent(newEvent);
    }
  }

  _load (request) {
    this._url = request.url;

    var urlLoader = new URLLoader();
    urlLoader.dataFormat = URLLoaderDataFormat.BINARY;


    var events = [
      Event.OPEN,
      ProgressEvent.PROGRESS, 
      IOErrorEvent.IO_ERROR, 
      Event.COMPLETE];
    events.forEach(event => urlLoader.addEventListener(event, this._eventHandler.bind(this)));

    urlLoader.load(request);
  }

  _loadBytes (bytes) {
    this._bytes = bytes;
    this._bytesLoaded = bytes.length;
    this._bytesTotal = bytes.length;

    var bd = BitmapData._fromArrayBuffer(bytes);
    this._content = new Bitmap(bd);
    this._width = bd.width;
    this._height = bd.height;

    var e = new Event(Event.COMPLETE, false, false);
    e._nextPhase();
    this.dispatchEvent(e);
  }
}