import "eurekaJS/display/DisplayObjectContainer.js";
import "eurekaJS/native/NativeCanvas.js";

var ns = namespace("eurekaJS.display");

this.Stage = ns.Stage = class Stage extends ns.DisplayObjectContainer {
  constructor (canvas, color, fps) {
    super();

    if (!(canvas instanceof eurekaJS.native.NativeCanvas))
      throw new Error ("Canvas is not a NativeCanvas instance");

    this._canvas = canvas;
    this._ctx = this._canvas.context;

    this._ctx.translate(0.5, 0.5);

    this.color = color || '#FFFFFF';
    this.frameRate = fps || 30;

    var mouseEvents = ['click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup'];
    mouseEvents.forEach(event => this._canvas.addEventListener(event, this._mouseHandler.bind(this)));

    this._mouseCanvas = new eurekaJS.native.NativeCanvas();
    this._mouseCanvas.width = this._canvas.width;
    this._mouseCanvas.height = this._canvas.height;
    this._mouseCanvasCtx = this._mouseCanvas.context;
    this._mouseCanvasCtx.translate(0.5, 0.5);

    console.info("Stage running at", this.frameRate, "fps");
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
    event.mouseX = Math.floor(event.clientX - this._canvas.left);
    event.mouseY = Math.floor(event.clientY - this._canvas.top);

    this.dispatchEvent(event);

    this._mouseCanvasCtx.clearRect(0, 0, this._mouseCanvas.width, this._mouseCanvas.height);
    
    var colors = {index: 1, 0: this};
    super._render(this._mouseCanvasCtx, colors);
    
    var cc = this._mouseCanvasCtx.getImageData(event.mouseX, event.mouseY, 1, 1).data;
    var choosen_color = (cc[0] << 16) + (cc[1] << 8) + (cc[2]);

    if (choosen_color !== 0) {
      colors[choosen_color].dispatchEvent(event);
    }
  }
}