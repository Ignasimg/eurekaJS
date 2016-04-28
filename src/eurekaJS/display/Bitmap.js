import "eurekaJS/display/DisplayObject.js";
import "eurekaJS/display/BitmapData.js";

var ns = namespace("eurekaJS.display");

this.Bitmap = ns.Bitmap = class Bitmap extends ns.DisplayObject {
  constructor (bitmapData) {
    super();

    this.bitmapData = bitmapData; // || new BitmapData();
  }

  _render (ctx, colors) {
    if (colors) {

    }
    else {
      ctx.drawImage(this.bitmapData._canvas, 0, 0);
    }
  }

}