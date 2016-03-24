import "eurekaJS/display/DisplayObjectContainer.js";
import "eurekaJS/native/NativeCanvas.js";
import "eurekaJS/events/Event.js";
import "eurekaJS/events/MouseEvent.js";
import "eurekaJS/events/KeyboardEvent.js";
import "eurekaJS/events/EventPhase.js";

var ns = namespace("eurekaJS.display");

this.Stage = ns.Stage = class Stage extends ns.DisplayObjectContainer {
  constructor (canvas, color, fps) {
    super();

    if (!(canvas instanceof eurekaJS.native.NativeCanvas))
      throw new Error ("Canvas is not a NativeCanvas instance");

    this._canvas = canvas;
    this._ctx = this._canvas.context;

    this.width = this._canvas.width;
    this.height = this._canvas.height;

    this._ctx.translate(0.5, 0.5);

    this.color = color || '#FFFFFF';
    this.frameRate = fps || 30;

    var mouseEvents = [
      'click', 
      'contextmenu', 
      'dblclick', 
      'mousedown', 
      'mouseenter', 
      'mouseleave', 
      'mousemove', 
      'mouseup'];
    // 'mouseover', 'mouseout',
    mouseEvents.forEach(event => this._canvas.addEventListener(event, this._mouseHandler.bind(this)));

    var keyboardEvents = ['keydown', 'keypress', 'keyup'];
    keyboardEvents.forEach(event => this._canvas.addEventListener(event, this._keyboardHandler.bind(this)));

    this._canvas.setAttribute('tabindex','0');
    this._canvas.style.outline = 'none';
    this._canvas.focus();

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
    var e = new Event('beforeRender', false, false);
    e._nextPhase();
    this.dispatchEvent(e);
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

  _mouseHandler (e) {
    var event = new MouseEvent (e);

    event.mouseX = Math.floor(e.clientX - this._canvas.left);
    event.mouseY = Math.floor(e.clientY - this._canvas.top);

    this._mouseCanvasCtx.clearRect(0, 0, this._mouseCanvas.width, this._mouseCanvas.height);
    
    // We'll paint every item with a different colour and keep a 
    // reference to which item has which colour, so later on we 
    // can discover which item was clicked by the colour.

    // :: NOTE :: This solution is experimental, since it has problem with anti-aliasing.
    var colors = {
      '000000': this,
      getColor: function () {
        var color = Math.ceil(Math.random() * 0xFFFFFF);
        color = color.toString(16).toUpperCase();
        for (i = color.length; i < 6; ++i) color = '0'+color;
        return color;
      },
      getUniqColor: function (elem) {
        do {
          var color = this.getColor();
        } while (this[color]);
        this[color] = elem;
        return color;
      },
      colorToString: function (color) {
        return '#'+color;
      }
    }

    super._render(this._mouseCanvasCtx, colors);
    
    var cc = this._mouseCanvasCtx.getImageData(event.mouseX, event.mouseY, 1, 1).data;

    // when the click goes into an aliased place we'll get the alpha value under 255
    if (cc[3] > 0 && cc[3] < 255) {
      // we'll try to find a pixel nearby which is not aliased.
      var d = this._mouseCanvasCtx.getImageData(event.mouseX-1, event.mouseY-1, 3, 3).data;
      for (var i = 0; i < 9; ++i) {
        if (d[i*4 + 3] == 0 || d[i*4 + 3] == 255) {
          cc = d.slice(i*4, i*4 + 3);
          break ;
        }
      }
    }

    var choosenColor = ((cc[0] << 16) + (cc[1] << 8) + (cc[2]))
    choosenColor = choosenColor.toString(16).toUpperCase();
    for (i = choosenColor.length; i < 6; ++i) choosenColor = '0'+choosenColor;

    event._target = colors[choosenColor];

    if (!event._target) return ;

    (function recursiveCaptureTargetBubble (currentTarget, event) {
      // INV :: currentTarget is THE target (event.target)
      //        or an ancestor of it.

      // If the current target is THE target
      if (currentTarget === event._target) {
        // We switch to target phase
        event._nextPhase();
        currentTarget.dispatchEvent(event);
        event._nextPhase();
        return ;
      }
      // If the current target is not THE target
      else {
        // Send the event in capture phase.
        currentTarget.dispatchEvent(event);
        // For each child of the target and while the event has not been stopped
        for (var i = 0; i < currentTarget._displayList.length && !event._stopped; ++i) {
          var child = currentTarget._displayList[i];
          // If child is the target or contains the target.
          if (child === event.target ||
             (child.contains && child.contains(event.target))) {
            // advance recursively.
            recursiveCaptureTargetBubble(child, event);
            // it comes back!
            // 2 things can happen
            // * Event is in capture phase (because it was stopped before reaching target)
            // * Event is in bubble phase (either stopped or unstopped)
            if (!event._stopped && event.bubbles)
              currentTarget.dispatchEvent(event);

            return ;
          }
        }
      }
    })(this, event);
  }

  _keyboardHandler(e) {
    var event = new KeyboardEvent (e);
    event._nextPhase();
    this.dispatchEvent(event);
  }
}