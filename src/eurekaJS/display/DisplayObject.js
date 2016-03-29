import "eurekaJS/events/EventDispatcher.js"
import "eurekaJS/geom/Transform.js"

var ns = namespace("eurekaJS.display");

this.DisplayObject = ns.DisplayObject = class DisplayObject extends eurekaJS.events.EventDispatcher {
  constructor (x, y, width, height, visible) {
    super();

    if (this.constructor === DisplayObject)
      throw new Error("DisplayObject can't be instantiated");

    this.name = "";

    this.transform = Transform._newTransform(this);

    this.x = x || 0;
    this.y = y || 0;

    this.width = width || 0;
    this.height = height || 0;
    this.visible = visible || true;

    this._scaleX = 1;
    this._scaleY = 1;

    this.alpha = 1;

    this._rotation = 0;

    this._stage = null;
    this._parent = null;
  }

  _updateTransform () {
    this.transform.matrix.identity();
    this.transform.matrix.translate(this._x, this._y);
    this.transform.matrix.rotate(this._rotation);
    this.transform.matrix.scale(this._scaleX, this._scaleY);
  }

  set x (value) {
    this._x = value;
    this._updateTransform();
  }

  get x () {
    return this._x;
  }

  set y (value) {
    this._y = value;
    this._updateTransform();
  }

  get y () {
    return this._y;
  }

  set scaleX (value) {
    this._scaleX = value;
    this._updateTransform();
  }

  get scaleX () {
    return this._scaleX;
  }

  set scaleY (value) {
    this._scaleY = value;
    this._updateTransform();
  }

  get scaleY () {
    return this._scaleY;
  }

  set rotation (value) {
    // From degree to rad
    this._rotation = value*(Math.PI/180);
    this._updateTransform();
  }

  get rotation () {
    // From rad to deg
    return this._rotation*(180/Math.PI);
  }

  get stage () {
    return this._stage;
  }

  get parent () {
    return this._parent;
  }

  _addedToContainer (container) {
    // If the displayObject is removed from the container, 
    // for sure it will also be removed from the stage.
    if (!container) this._addedToStage(null);

    // If we add the displayObject into a container, when it already belongs to one,
    // take it out from the current container.
    if (container && this._parent != null) {
      this._parent.removeChild(this);
    }

    // Setup the parent container
    this._parent = container;

    var e;

    if (container) e = new Event(Event.ADDED, false, false);
    else           e = new Event(Event.REMOVED, false, false);

    e._nextPhase();
    this.dispatchEvent(e);
  }

  _addedToStage (stage) {
    this._stage = stage;

    var e;

    if (stage) e = new Event(Event.ADDED_TO_STAGE, false, false);
    else       e = new Event(Event.REMOVED_FROM_STAGE, false, false);

    e._nextPhase();
    this.dispatchEvent(e);
  }

  _position (ctx) {
    /*
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation*(Math.PI/180));
    ctx.scale(this.scaleX, this.scaleY);
    */
    ctx.transform(this.transform.matrix.a,
                  this.transform.matrix.b,
                  this.transform.matrix.c,
                  this.transform.matrix.d,
                  this.transform.matrix.tx,
                  this.transform.matrix.ty);
    ctx.globalAlpha = this.alpha;
  }
}
