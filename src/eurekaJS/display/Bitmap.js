import "eurekaJS/display/DisplayObject.js";
import "eurekaJS/display/BitmapData.js";
import "eurekaJS/display/Shape.js";

var ns = namespace("eurekaJS.display");

this.Bitmap = ns.Bitmap = class Bitmap extends ns.DisplayObject {
  constructor (bitmapData) {
    super();
    this.bitmapData = bitmapData || new BitmapData(0, 0);
  }
  
  _updateSizes() {
    var graphicsBB = this._graphics._bb.clone();
    graphicsBB.offset(this.x, this.y);
    this._bb.width = this.bitmapData.width;
    this._bb.height = this.bitmapData.height;
  }

  _render (ctx, colors) {
    if (this.bitmapData) {
      if (colors) {
        var color = colors.colorToString(colors.getUniqColor(this));
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, this.bitmapData.width, this.bitmapData.height);
        ctx.fill();
      }
      else {
        ctx.drawImage(this.bitmapData._canvas, 0, 0);
      }
    }
  }

}