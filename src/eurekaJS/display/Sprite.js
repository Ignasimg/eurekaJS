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

  _render (ctx, colors) {
    if (colors)
      var color = colors.colorToString(colors.getUniqColor(this));

    // First have to render the own content then the children.
    this.graphics._render(ctx, color);

    super._render(ctx, colors);
  }
}