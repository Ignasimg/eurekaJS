import "eurekaJS/display/DisplayObject.js";
import "eurekaJS/display/Color.js";
import "eurekaJS/native/Canvas.js";
import "eurekaJS/text/TextBaseline.js";
import "eurekaJS/text/TextAlign.js";

var ns = namespace("eurekaJS.text");

this.TextField = ns.TextField = class TextField extends DisplayObject {
  constructor () {
    super();
    
    this._text = "";
    this._font = 'Comic Sans MS'
    this.textColor = 'Black';
    this._baseline = eurekaJS.text.TextBaseline.TOP;
    this._align = eurekaJS.text.TextAlign.LEFT;
    this._bold = false;
    this._italic = false;

    this._size = 16;

    this._width = 0;

    this._helperCanvas = new eurekaJS.native.Canvas();
    this._helperCanvasCtx = this._helperCanvas.context;
  }

  _boundingBox () {
    var box = {x: 0, y: 0, width: this._width, height: this._size};
    switch (this._align) {
      case eurekaJS.text.TextAlign.CENTER : 
        box.x = -this._width/2;
        break;
      case eurekaJS.text.TextAlign.RIGHT : 
        box.x = -this._width;
        break;
      case eurekaJS.text.TextAlign.LEFT :
      default:
        box.x = 0;
        break;
    }
    switch (this._baseline) {
      case eurekaJS.text.TextBaseline.ALPHABETIC :
      case eurekaJS.text.TextBaseline.IDEOGRAPHIC :
      case eurekaJS.text.TextBaseline.BOTTOM :
        box.y = -this._size;
        break;
      case eurekaJS.text.TextBaseline.MIDDLE :
        box.y = -this._size/2;
        break;
      case eurekaJS.text.TextBaseline.HANGING :
      case eurekaJS.text.TextBaseline.TOP :
      default:
        box.y = 0;
        break;
    }
    return box;
  }

  _render (ctx, colors) {
    if (colors) {
      // TextField is a nightmare for the colours (because of aliasing)
      // what we will do is draw a rectangle, wherever the text is
      // TODO :: needs refinement to deal with baselines and aligns
      var color = colors.colorToString(colors.getUniqColor(this));

      ctx.fillStyle = color;

      var rec = this._boundingBox();

      ctx.fillRect(Math.round(rec.x), Math.round(rec.y), Math.round(rec.width), Math.round(rec.height));
      ctx.fill();
    }
    else {
      ctx.font = ((this._bold) ? 'bold ' : '') +
                 ((this._italic) ? 'italic ' : '') +
                 this._size+'px ' +
                 this._font;
      var RGB = eurekaJS.display.Color.getComponents(this._color);
      ctx.fillStyle = 'rgba('+RGB.R+','+RGB.G+','+RGB.B+',1)';
      ctx.textAlign = this._align;
      ctx.textBaseline = this._baseline;
      ctx.fillText(this._text, 0, 0);
    }
  }

  get bold () {
    return this._bold;
  }

  set bold (bold) {
    this._bold = bold;
    this._measureWidth();
  }

  get italic () {
    return this._italic;
  }

  set italic (italic) {
    this._italic = italic;
    this._measureWidth();
  }


  get size () {
    return this._size;
  }

  set size (size) {
    this._size = size;
    this._measureWidth();
  }

  get font () {
    return this._font;
  }

  set font (font) {
    this._font = font;
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