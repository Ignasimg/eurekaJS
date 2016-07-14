import "eurekaJS/geom/Matrix.js";

var ns = namespace("eurekaJS.geom");

this.Transform = ns.Transform = class Transform {
  get concatenatedMatrix () {
    return this.matrix.concat(this._displayObject.parent.transform.concatenatedMatrix);
  }

  set matrix (mat) {
    
    this._matrix = new Matrix(); //mat.clone();
    
    
    mat = mat.clone();
    // http://stackoverflow.com/questions/4361242/extract-rotation-scale-values-from-2d-transformation-matrix
    // Slightly modifies and tested, but might still have bugs.
    
    // We must update the public values setters, to avoid coupling with the inner structure,
    // since those setters already update the matrix we setted the transformation matrix to a new and empty one.
    this._displayObject.x = +mat.tx.toFixed(16);
    this._displayObject.y = +mat.ty.toFixed(16);
    //this._displayObject.scaleX = Math.sign(mat.a)*Math.sqrt((mat.a*mat.a) + (mat.c*mat.c)).toFixed(16);
    //this._displayObject.scaleY = Math.sign(mat.d)*Math.sqrt((mat.b*mat.b) + (mat.d*mat.d)).toFixed(16);
    this._displayObject.scaleX = Math.sign(mat.a)*Math.sqrt((mat.a*mat.a) + (mat.b*mat.b)).toFixed(16);
    this._displayObject.scaleY = Math.sign(mat.d)*Math.sqrt((mat.c*mat.c) + (mat.d*mat.d)).toFixed(16);
    this._displayObject.rotation = +(Math.atan(mat.b/mat.a).toFixed(16)*180/Math.PI);
    
    
    console.log(mat, this._matrix);
  }

  get matrix () {
    return this._matrix;
  }

  static _newTransform (displayObject) {
    var a = new Transform();
    a._displayObject = displayObject;
    a._matrix = new Matrix();
    return a;
  }
}