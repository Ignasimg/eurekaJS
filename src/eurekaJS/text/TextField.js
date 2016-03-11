import "eurekaJS/display/DisplayObject.js";
import "eurekaJS/text/TextBaseline.js";

var ns = namespace("eurekaJS.text");

this.TextField = ns.TextField = class TextField extends DisplayObject {
  constructor () {
    super();
    
    this.text = "";
    this._color = 0x000000;
    this._baseline = eurekaJS.text.TextBaseline.TOP;
    this._align = 'left';
  }

  /*
  _position (ctx) {
  //  ctx.translate(this.x, this.y);
  }
  */


  _render (ctx, color) {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "left";
    ctx.textBaseline = this._baseline;
    ctx.fillText(this.text, this.x, this.y); 

    //    ctx.measureText();
  }

  set baseline (v) {
    this._baseline = v;
  }

  get textColor () {
    return this._color;
  }

  set textColor (v) {
    this._color = v;
  }

  appendText (newText) {
    this.text = this.text + newText;
  }


}