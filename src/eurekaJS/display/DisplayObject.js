import "eurekaJS/events/EventDispatcher.js"

var ns = namespace("eurekaJS.display");

this.DisplayObject = ns.DisplayObject = class DisplayObject extends eurekaJS.events.EventDispatcher {
  constructor (x, y, width, height, visible) {
    super();

    if (this.constructor === DisplayObject)
      throw new Error("DisplayObject can't be instantiated");

    this.name = "";

    this.x = x || 0;
    this.y = y || 0;

    this.width = width || 0;
    this.height = height || 0;
    this.visible = visible || true;

    this.scaleX = 1;
    this.scaleY = 1;

    this.alpha = 1;

    this.rotation = 0;

    this._stage = null;
    this._parent = null;
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
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation*(Math.PI/180));
    ctx.scale(this.scaleX, this.scaleY);

    ctx.globalAlpha = this.alpha;
  }
}
