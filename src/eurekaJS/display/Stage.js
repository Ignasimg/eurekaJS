import "eurekaJS/display/DisplayObjectContainer.js";

var ns = namespace("eurekaJS.display");

this.Stage = ns.Stage = class Stage extends ns.DisplayObjectContainer {
  constructor (canvas, color, fps) {
    super();

    this._canvas = canvas;
    this._ctx = this._canvas.getContext("2d");

    this._ctx.translate(0.5, 0.5);

    this.color = color || '#FFFFFF';
    this.frameRate = fps || 30;

    console.info("Stage running at", this.frameRate, "fps");

    var mouseEvents = ['click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup'];
    mouseEvents.forEach(event => this._canvas.addEventListener(event, this._mouseHandler.bind(this)));

  }

  _clear () {
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
  }

  _render () {
    this.dispatchEvent(new CustomEvent('beforeRender'));
    this._clear();
    super._render(this._ctx);
  }

  addChildAt (displayObject, index) {
    super.addChildAt(displayObject, index);
    displayObject._addedToStage(this);
  }

  removeChildAt (index) {
    var displayObject = super.removeChildAt(index);
    displayObject._addedToStage(null);
    return displayObject;
  }

  get color () {
    return this._color;
  }

  set color (v) {
    this._color = v;
    this._ctx.fillStyle = this.color;
  }

  get frameRate () {
    return this._fps;
  }

  set frameRate (v) {
    this._fps = v;
    this._mspf = (1000/this._fps) | 0;
    this._interval && clearInterval(this._interval);
    this._interval = setInterval(() => this._render(), this._mspf);
  }

  get canvas () {
    return this._canvas;
  }

  _mouseHandler (event) {
    var boundingClientRect = event.target.getBoundingClientRect();
    event.mouseX = Math.floor(event.clientX - boundingClientRect.left);
    event.mouseY = Math.floor(event.clientY - boundingClientRect.top);

    this.dispatchEvent(event);
  }
}