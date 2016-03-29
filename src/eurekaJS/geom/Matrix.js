import "eurekaJS/geom/Point.js";

var ns = namespace("eurekaJS.geom");

this.Matrix = ns.Matrix = class Matrix {
  constructor (a, b, c, d, tx, ty) {
    this.a = a || 1;
    this.b = b || 0;
    this.c = c || 0;
    this.d = d || 1;
    this.tx = tx || 0;
    this.ty = ty || 0;
  }

  clone () {
    return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
  }

  concat (m) {
    var a = this.a;
    var b = this.b;
    var c = this.c;
    var d = this.d;
    var tx = this.tx;
    var ty = this.ty;

    this.a = (a * m.a) + (c * m.b);
    this.b = (b * m.a) + (d * m.b);
    this.c = (a * m.c) + (c * m.d);
    this.d = (b * m.c) + (d * m.d);
    this.tx = (a * m.tx) + (c * m.ty) + tx;
    this.ty = (b * m.tx) + (d * m.ty) + ty;
  }

  copyFrom (sourceMatrix) {
    this.a = sourceMatrix.a;
    this.b = sourceMatrix.b;
    this.c = sourceMatrix.c;
    this.d = sourceMatrix.d;
    this.tx = sourceMatrix.tx;
    this.ty = sourceMatrix.ty;
  }

  identity () {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.tx = 0;
    this.ty = 0;
  }

  rotate (angle) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    this.concat(new Matrix(cos, sin, -sin, cos));
  }

  scale (sx, sy) {
    this.concat(new Matrix(sx, 0, 0, sy));
  }

  setTo (aa, ba, ca, da, txa, tya) {
    this.a = aa;
    this.b = ba;
    this.c = ca;
    this.d = da;
    this.tx = txa;
    this.ty = tya;
  }

  toString () {
    return '(a='+this.a+', b='+this.b+', c='+this.c+', d='+this.d+', tx='+this.tx+', ty='+this.ty+')';
  }

  transformPoint (point) {
    var x = (this.a * point.x) + (this.c * point.y) + this.tx;
    var y = (this.b * point.x) + (this.d * point.y) + this.ty;
    return new Point (x, y);
  }

  translate (dx, dy) {
    //this.tx += dx;
    //this.ty += dy;
    this.concat(new Matrix(1, 0, 0, 1, dx, dy));
  }
}