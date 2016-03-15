var ns = namespace("eurekaJS.geom");

this.Point = ns.Point = class Point {
  constructor (x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  get length () {
    return Math.sqrt(x*x + y*y);
  }

  add (point) {
    return new Point (this.x + point.x, this.y + point.y);
  }

  clone () {
    return new Point (this.x, this.y);
  }

  copyFrom (sourcePoint) {
    this.x = sourcePoint.x;
    this.y = sourcePoint.y;
  }

  static distance (pt1, pt2) {
    return pt1.subtract(pt2).length;
  }

  equals (toCompare) {
    return (this.x == toCompare.x && this.y == toCompare.y);
  }

  static interpolate (pt1, pt2, f) {
    var d = pt1.subtract(pt2);
    d.x *= f;
    d.y *= f;
    return d.add(pt2);
  }

  normalize (thickness) {
    var l = this.length;
    this.x = (this.x * thickness)/l;
    this.y = (this.y * thickness)/l;
  }

  offset (dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  // Expects the angle in radians.
  static polar (len, angle) {
    return new Point (Math.cos(angle)*len, Math.sin(angle)*len);
  }

  setTo (xa, ya) {
    this.x = xa;
    this.y = ya;
  }

  subtract (v) {
    return new Point (this.x - point.x, this.y - point.y);
  }

  toString () {
    return '(x='+this.x+', y='+this.y+')';
  }
}