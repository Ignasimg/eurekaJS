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

  _mouseHandler (e) {
    var event = {type: e.type}; //new CustomEvent()

    event.mouseX = Math.floor(e.clientX - this._canvas.left);
    event.mouseY = Math.floor(e.clientY - this._canvas.top);

    //this.dispatchEvent(event);

    this._mouseCanvasCtx.clearRect(0, 0, this._mouseCanvas.width, this._mouseCanvas.height);
    
    var colors = {index: 1, 0: this};
    super._render(this._mouseCanvasCtx, colors);
    
    var cc = this._mouseCanvasCtx.getImageData(event.mouseX, event.mouseY, 1, 1).data;
    var choosenColor = (cc[0] << 16) + (cc[1] << 8) + (cc[2]);

    /*
    if (choosen_color !== 0) {
      colors[choosenColor].dispatchEvent(event);
    }
    */
    event.target = colors[choosenColor];

    event.phase = 0;

    (function recursiveCaptureTargetBubble (currentTarget, event) {
      // INV :: currentTarget is THE target (event.target)
      //        or an ancestor of it.

      event.currentTarget = currentTarget;
      // If the current target is THE target
      if (currentTarget === event.target) {
        // We switch to target phase
        event.phase = 1;
        currentTarget.dispatchEvent(event);
        return ;
      }
      // If the current target is not THE target
      else {
        // Send the event in capture phase.
        currentTarget.dispatchEvent(event);
        // For each child of the target
        for (var i = 0; i < currentTarget._displayList.length; ++i) {
          var child = currentTarget._displayList[i];
          // If child is the target or contains the target.
          if (child === event.target ||
             (child.contains && child.contains(event.target))) {
            // advance recursively.
            recursiveCaptureTargetBubble(child, event);
            // when we come back the target phase already took place.
            event.phase = 2;
            // reset the right event.currentTarget.
            event.currentTarget = currentTarget;
            // dispatch the event in the bubble phase
            currentTarget.dispatchEvent(event);
            return ;
          }
        }
      }
    })(this, event);


    /*
    (function recursiveCaptureTargetBubble (currentTarget, event) {
      // INV :: currentTarget is THE target (event.target)
      //        or an ancestor of it.

      event.currentTarget = currentTarget;
      // If we are in the capture phase
      if (event.phase === 0) {
        // If the current target is THE target
        if (currentTarget === event.target) {
          // We switch to target phase
          event.phase = 1;
          recursiveCaptureTargetBubble(currentTarget, event);
        }
        // If the current target is not THE target
        else {
          // Send the event in capture phase.
          currentTarget.dispatchEvent(event);
          // For each child of the target
          for (var i = 0; i < currentTarget._displayList.length; ++i) {
            var child = currentTarget._displayList[i];
            // If child is displayObjectContainer
            if (child instanceof eurekaJS.display.DisplayObjectContainer) {
              // If child contains THE target
              if (child.contains(event.target)) {
                // recursively check it's children
                recursiveCaptureTargetBubble(child, event);
                break;
              }
            }
            // If the child is not displayObjectContainer
            else {
              // check whether it's THE target
              if (child === event.target) {
                // addvance
                recursiveCaptureTargetBubble(child, event);
                break;
              }
            }
          }
        }
      }



      if (event.phase === 0) {
        if (displayObject === event.target) {
          event.phase = 1;
          return recursiveCaptureTargetBubble(displayObject, event);
        }
        for (var i = 0; i < displayObject._displayList.length; ++i) {
          var isContainer = (displayObject._displayList[i] instanceof eurekaJS.display.DisplayObjectContainer)
          if (isContainer) {
            if (displayObject._displayList.contains(event.target)) {
              
              parent.dispatchEvent(event);
              break;
            }
          }
          else {

          }

          
        }
      }
      else if (event.phase === 1) {

      }
      else {

      }
    })(this, event);
*/
    /*
    // Capturing phase
    event.phase = 0;

    var parent = this;
    do {
      for (var i = 0; i < parent._displayList.length; ++i) {
        if (parent.contains(event.target)) {
          parent = parent._displayList[i];
          parent.dispatchEvent(event);
          break;
        }
      }
    }
    while ((parent != event.target) && 
          (parent instanceof eurekaJS.display.DisplayObjectContainer));

    // At target phase
    event.phase = 1;
    
    parent.dispatchEvent(event);

    // Bubbling phase
    event.phase = 2;

    do {
      parent.parent = 
    } while (parent != this);

    */
  }
}