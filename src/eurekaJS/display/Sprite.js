import "eurekaJS/display/DisplayObjectContainer.js";
import "eurekaJS/display/Graphics.js";

var ns = namespace("eurekaJS.display");

this.Sprite = ns.Sprite = class Sprite extends ns.DisplayObjectContainer {
  constructor () {
    super();
    this.graphics = new ns.Graphics();
  }

  _render (ctx, colors) {
    // First have to render the own content then the children.
    this.graphics._render(ctx, (colors) ? colors.index : undefined);
    if (colors) {
      colors[colors.index] = this;
      colors.next();
    }

    super._render(ctx, colors);
  }
}