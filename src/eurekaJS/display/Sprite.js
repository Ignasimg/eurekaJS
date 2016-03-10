import "eurekaJS/display/DisplayObjectContainer.js";
import "eurekaJS/display/Graphics.js";

var ns = namespace("eurekaJS.display");

this.Sprite = ns.Sprite = class Sprite extends ns.DisplayObjectContainer {
  constructor () {
    super();
    this.graphics = new ns.Graphics();
  }

  _render (ctx) {
    super._render(ctx);
    this.graphics._render(ctx);
  }
}