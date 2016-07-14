import "eurekaJS/display/Graphics.js";

var ns = namespace("eurekaJS.display");

this.Shape = ns.Shape = class Shape extends DisplayObject {
  constructor () {
    super();
    this._graphics = new ns.Graphics();
  }

  get graphics () {
    return this._graphics;
  }
  
  _updateSizes() {
    var graphicsBB = this._graphics._bb.clone();
    graphicsBB.offset(this.x, this.y);
    this._bb = this._bb.union(graphicsBB);
  }

  _render (ctx, colors) {
    if (colors)
      var color = colors.colorToString(colors.getUniqColor(this));
    
    this.graphics._render(ctx, color);
  }
}