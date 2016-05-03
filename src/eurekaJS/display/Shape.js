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

  _render (ctx, colors) {
    if (colors)
      var color = colors.colorToString(colors.getUniqColor(this));
    
    this.graphics._render(ctx, color);
  }
}