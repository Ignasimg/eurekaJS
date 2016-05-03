import "eurekaJS/events/EventDispatcher.js";
import "eurekaJS/net/URLRequest.js";
import "eurekaJS/net/URLLoader.js";
import "eurekaJS/media/SoundMixer.js";

var ns = namespace("eurekaJS.media");

this.Sound = ns.Sound = class Sound extends eurekaJS.events.EventDispatcher {
  constructor (stream) {
    super();

    this._bytesLoaded = 0;
    this._bytesTotal = 0;
    //this._id3 = new ID3Info();
    this._isBuffering = false;
    this._isURLInaccessible = false;
    this._length = 0;
    this._url = null;

    this._buffer = null;

    if (stream instanceof eurekaJS.net.URLRequest) {
      this.load(stream);
    }
  }

  get bytesLoaded () {
    return this._bytesLoaded;
  }

  get bytesTotal () {
    return this._bytesTotal;
  }

  get isBuffering () {
    return this._isBuffering;
  }

  get isURLInaccessible () {
    return this._isURLInaccessible;
  }

  get length () {
    return this._length;
  }

  get url () {
    return this._url;
  }

  _eventHandler (event) {
    // Missing events ID3 and SampleData
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
        this.loadCompressedDataFromByteArray(event.target.data, this._bytesLoaded);
        break;
    }
    if (newEvent !== null) {
      newEvent._target = this;
      newEvent._nextPhase();
      this.dispatchEvent(newEvent);
    }
  }

  close () {}

  extract (target, length, startPosition) {}

  load (stream) {
    this._url = stream.url;

    var urlLoader = new URLLoader();
    urlLoader.dataFormat = URLLoaderDataFormat.BINARY;

    var events = [
      Event.OPEN,
      ProgressEvent.PROGRESS, 
      IOErrorEvent.IO_ERROR, 
      Event.COMPLETE];
    events.forEach(event => urlLoader.addEventListener(event, this._eventHandler.bind(this)));

    urlLoader.load(stream);
  }

  loadCompressedDataFromByteArray (bytes, bytesLength) {
    // TODO :: use bytesLength
    var self = this;
    SoundMixer._decodeAudioData(bytes, function (buffer) {
      self._buffer = buffer;
      var e = new Event(Event.COMPLETE, false, false);
      e._nextPhase();
      self.dispatchEvent(e);
    });
  }

  /*
  loadPCMFromByteArray (bytes, samples, format, stereo, sampleRate) {}
  */

  play (startTime, loops, soundTransform) {

    console.log(this._buffer);

    var source = SoundMixer._createBufferSource();
    source.buffer = this._buffer;
    source.connect(SoundMixer._destination);
    source.start(0);
  }
}