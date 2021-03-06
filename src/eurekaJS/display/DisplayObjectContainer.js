import "eurekaJS/display/DisplayObject.js";
import "eurekaJS/geom/Rectangle.js";

var ns = namespace("eurekaJS.display");

this.DisplayObjectContainer = ns.DisplayObjectContainer = class DisplayObjectContainer extends ns.DisplayObject {
  constructor () {
    super();

    if (this.constructor === DisplayObjectContainer)
      throw new Error("DisplayObjectContainer can't be instantiated");

    this._displayList = [];
  }
  
  _updateSizes() {
    this._bb = new eurekaJS.geom.Rectangle(this.x, this.y);
    for (var i = 0; i < this._displayList.length; ++i) {
      var isContainer = this._displayList[i] instanceof eurekaJS.display.DisplayObjectContainer;
      if (isContainer) {
        this._displayList[i]._updateSizes();
      }
      var childBB = this._displayList[i]._bb.clone();
      childBB.offset(this.x, this.y);
      this._bb = this._bb.union(childBB);
    }
  }
  /*
  get x () {
    this._updateSizes();
    return super.x;
  }
  
  set x (v) {
    return super.x = v;
  }
  
  get y () {
    this._updateSizes();
    return super.y;
  }
  
  set y (v) {
    return super.y = v;
  }
  */
  get width () {
    this._updateSizes();
    return super.width;
  }
  
  set width (v) {
    return super.width = v;
  }
  
  get height () {
    this._updateSizes();
    return super.height;
  }
  
  set height (v) {
    return super.height = v;
  }
  
  addChild (displayObject) {
    this.addChildAt(displayObject, this.numChild);
  }

  addChildAt (displayObject, index) {
    if (displayObject instanceof ns.DisplayObjectContainer
      && displayObject.contains(this)) {
      throw new Error("Invalid argument");
    }
    if (!(displayObject instanceof ns.DisplayObject))
      throw new TypeError("Expecting displayObject");
    if (index < 0 || index > this.numChild) 
      throw new RangeError("Index out of range");
    this._displayList.splice(index, 0, displayObject);
    displayObject._addedToContainer(this);
    if (this.stage) {
      displayObject._addedToStage(this.stage);
    }
  }

  contains (displayObject) {
    if (displayObject === this) return true;
    for (var i = 0; i < this._displayList.length; ++i) {
      var isContainer = this._displayList[i] instanceof eurekaJS.display.DisplayObjectContainer;
      var contains = false;
      if (isContainer) {
        contains = this._displayList[i].contains(displayObject);
      }
      else {
        contains = (this._displayList[i] === displayObject);
      }
      if (contains) return true;
    }
    return false;
    //return (this._displayList.indexOf(displayObject) != -1);
  }

  getChildAt (index) {
    if (index < 0 || index >= this.numChild) 
      throw new RangeError("Index out of range");
    return this._displayList[index];
  }

  getChildByName (name) {
    for (var i = 0; i < this.numChild; ++i) {
      if (this._displayList[i].name === name)
        return this._displayList[i];
    }
    return null;
  }

  getChildIndex (child) {
    var index = this._displayList.indexOf(child);
    if (index == -1) throw new ReferenceError("child is not a child");
    return index;
  }

  removeChild (child) {
    return this.removeChildAt(this.getChildIndex(child));
  }

  removeChildAt (index) {
    if (index < 0 || index >= this.numChild) 
      throw new RangeError("Index out of range");
    var displayObject = this._displayList.splice(index, 1)[0];
    displayObject._addedToContainer(null);
    return displayObject;
  }

  removeAllChildren () {
    for (var i = 0; i < this.numChild; ++i) {
      this._displayList[i]._addedToContainer(null);
    }
    this._displayList = [];
    // this._displayList.length = 0;
  }

  setChildIndex (child, index) {
    var index_old = this.getChildIndex(child);
    if (index_old < index) index--;
    this.addChildAt(this.removeChildAt(index_old), index);
  }

  swapChildren (child1, child2) {
    var index1 = this.getChildIndex(child1);
    var index2 = this.getChildIndex(child2);
    this.swapChildrenAt(index1, index2);
  }

  swapChildrenAt (index1, index2) {
    if (index1 < 0 || index1 >= this.numChild) 
      throw new RangeError("Index out of range");
    if (index2 < 0 || index2 >= this.numChild) 
      throw new RangeError("Index out of range");
    var tmp = this._displayList[index1];
    this._displayList[index1] = this._displayList[index2];
    this._displayList[index2] = tmp;
  }

  get numChild () {
    return this._displayList.length;
  }

  _render (ctx, colors) {
    for (var i = 0; i < this._displayList.length; ++i) {
      var displayObject = this._displayList[i];
      if (displayObject.visible) {
        ctx.save();
        this._displayList[i]._position(ctx);
        this._displayList[i]._render(ctx, colors);
        ctx.restore();
      }
    }
  }

  _addedToStage (stage) {
    super._addedToStage(stage);
    for (var i = 0; i < this._displayList.length; ++i) {
      this._displayList[i]._addedToStage(stage);
    }
  }
}