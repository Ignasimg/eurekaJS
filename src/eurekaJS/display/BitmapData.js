import "eurekaJS/native/Canvas.js"

var ns = namespace("eurekaJS.display");

this.BitmapData = ns.BitmapData = class BitmapData {
  constructor (width, height) {
    this._canvas = new eurekaJS.native.Canvas(null, width, height);
    this._ctx = this._canvas.context;
    this._imageData = this._ctx.createImageData(width, height);
  }

  static _fromArrayBuffer(bytes) {
    var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(bytes)));
    var image = new Image();
    // TODO :: discover the image subtype based on the very first bytes.
    // type - File header ::
    // JPG - FF D8
    // PNG - 89 50 4E 47 0D 0A 1A 0A
    // GIF - 47 49 46 38 37 61
    // GIF - 47 49 46 38 39 61
    image.src = "data:image;base64,"+base64String;
    var height = image.height;
    var width = image.width;



    var canvas = new eurekaJS.native.Canvas(null, width, height);
    var ctx = canvas.context;
    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, width, height);
    var buffer = imageData.data.buffer;

    var bitmapData = new BitmapData(width, height);
    bitmapData.setPixels(null, buffer);
    return bitmapData;
  }

  get height () {
    return this._canvas.height;
  }

  get width () {
    return this._canvas.width;
  }

  _update () {
    // TODO :: Clear ?
    this._ctx.putImageData(this._imageData, 0, 0);
  }

  setPixels (rect, inputArrayBuffer) {
    // TODO :: don't ignore rect
    this._imageData.data.set(new Uint8ClampedArray(inputArrayBuffer));
    this._update();
  }

}