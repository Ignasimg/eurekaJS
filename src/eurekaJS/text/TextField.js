import "eurekaJS/display/DisplayObject.js";
import "eurekaJS/native/NativeCanvas.js";
import "eurekaJS/text/TextBaseline.js";
import "eurekaJS/text/TextAlign.js";

var ns = namespace("eurekaJS.text");

this.TextField = ns.TextField = class TextField extends DisplayObject {
  constructor () {
    super();
    
    this._text = "";
    this._color = '#000000';
    this._baseline = eurekaJS.text.TextBaseline.TOP;
    this._align = eurekaJS.text.TextAlign.LEFT;

    this._size = 60;

    this._width = 0;

    this._helperCanvas = new eurekaJS.native.NativeCanvas();
    this._helperCanvasCtx = this._helperCanvas.context;
  }

  _render (ctx, colors) {
    if (colors) {
      // TextField is a nightmare for the colours (because of aliasing)
      // what we will do is draw a rectangle, wherever the text is
      // TODO :: needs refinement to deal with baselines and aligns
      var color = colors.colorToString(colors.getUniqColor(this));

      ctx.fillStyle = color;

      var rec = {x: 0, y: 0, xx: this._width, yy: this._size};
      switch (this._align) {
        case eurekaJS.text.TextAlign.CENTER : 
          rec.x = -this._width/2;
          break;
        case eurekaJS.text.TextAlign.RIGHT : 
          rec.x = -this._width;
          break;
        case eurekaJS.text.TextAlign.LEFT :
        default:
          rec.x = 0;
          break;
      }
      switch (this._baseline) {
        case eurekaJS.text.TextBaseline.ALPHABETIC :
        case eurekaJS.text.TextBaseline.IDEOGRAPHIC :
        case eurekaJS.text.TextBaseline.BOTTOM :
          rec.y = -this._size;
          break;
        case eurekaJS.text.TextBaseline.MIDDLE :
          rec.y = -this._size/2;
          break;
        case eurekaJS.text.TextBaseline.HANGING :
        case eurekaJS.text.TextBaseline.TOP :
        default:
          rec.y = 0;
          break;
      }

      ctx.fillRect(Math.round(rec.x), Math.round(rec.y), Math.round(rec.xx), Math.round(rec.yy));
      ctx.fill();
    }
    else {
      ctx.font = this._size+"px Comic Sans MS";
      ctx.fillStyle = color || this._color;
      ctx.textAlign = this._align;
      ctx.textBaseline = this._baseline;
      ctx.fillText(this._text, 0, 0);
    }
  }

  get size () {
    return this._size;
  }

  set size (size) {
    this._size = size;
    this._measureWidth();
  }

  get text () {
    return this._text;
  }

  set text (text) {
    this._text = text;
    this._measureWidth();
  }

  get textWidth () {
    return this._width;
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

  get textAlign () {
    return this._align;
  }

  set textAlign (v) {
    this._align = v;
  }

  get textBaseline () {
    return this._baseline;
  }

  set textBaseline (v) {
    this._baseline = v;
  }

  appendText (newText) {
    this.text = this.text + newText;
  }

  _measureWidth () {
    this._render(this._helperCanvasCtx)
    this._width = this._helperCanvasCtx.measureText(this._text).width;
  }

}