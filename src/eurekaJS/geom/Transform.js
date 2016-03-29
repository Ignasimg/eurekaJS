import "eurekaJS/geom/Matrix.js";

var ns = namespace("eurekaJS.geom");

this.Transform = ns.Transform = class Transform {
  get concatenatedMatrix () {
    return this.matrix.concat(this._displayObject.parent.transform.concatenatedMatrix);
  }

  set matrix (value) {
    this._matrix = value;
    // http://stackoverflow.com/questions/4361242/extract-rotation-scale-values-from-2d-transformation-matrix
    // Not tested and very likely to have bugs! :o
    this._displayObject._x = +value.tx.toFixed(16);
    this._displayObject._y = +value.ty.toFixed(16);
    this._displayObject._scaleX = +Math.sqrt((value.a*value.a) + (value.c*value.c)).toFixed(16);
    this._displayObject._scaleY = +Math.sqrt((value.b*value.b) + (value.d*value.d)).toFixed(16);
    this._displayObject._rotation = +Math.atan(value.b/value.a).toFixed(16);
  }

  get matrix () {
    return this._matrix;
  }

  static _newTransform (displayObject) {
    var a = new Transform();
    a._displayObject = displayObject;
    a.matrix = new Matrix();
    return a;
  }
}