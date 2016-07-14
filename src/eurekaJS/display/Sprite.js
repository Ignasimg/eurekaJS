import "eurekaJS/display/DisplayObjectContainer.js";
import "eurekaJS/display/Graphics.js";

var ns = namespace("eurekaJS.display");

this.Sprite = ns.Sprite = class Sprite extends ns.DisplayObjectContainer {
  constructor () {
    super();
    this._graphics = new ns.Graphics();
  }

  get graphics () {
    return this._graphics;
  }
  
  _updateSizes() {
    super._updateSizes();
    var graphicsBB = this._graphics._bb.clone();
    graphicsBB.offset(this.x, this.y);
    this._bb = this._bb.union(graphicsBB);
    
    //if (this._bb.width < this._graphics._bb.width) this._bb.width = this._graphics._bb.width;
    //if (this._bb.height < this._graphics._bb.height) this._bb.height = this._graphics._bb.height;
  }

  _render (ctx, colors) {
    if (colors)
      var color = colors.colorToString(colors.getUniqColor(this));

    // First have to render the own content then the children.
    this.graphics._render(ctx, color);

    super._render(ctx, colors);
  }
}