import "eurekaJS/display/DisplayObject.js";
import "eurekaJS/display/BitmapData.js";
import "eurekaJS/display/Shape.js";

var ns = namespace("eurekaJS.display");

this.Bitmap = ns.Bitmap = class Bitmap extends ns.DisplayObject {
  constructor (bitmapData) {
    super();

    this.bitmapData = bitmapData; // || new BitmapData();

    this._area = new Shape();
  }

  _render (ctx, colors) {
    if (colors) {
      this._area.graphics.clear();
      this._area.graphics.drawRect(0, 0, this.bitmapData.width, this.bitmapData.height);
      this._area._render(ctx, colors);
    }
    else {
      ctx.drawImage(this.bitmapData._canvas, 0, 0);
    }
  }

}