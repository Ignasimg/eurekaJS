import "eurekaJS/geom/Point.js";

var ns = namespace("eurekaJS.geom");

this.Rectangle = ns.Rectangle = class Rectangle {
  constructor (x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
  }

  get bottom () {
    return this.y + this.height;
  }

  set bottom (v) {
    this.height = v - this.y;
  }

  get bottomRight () {
    return new Point (this.right, this.bottom);
  }

  set bottomRight (v) {
    this.right = v.x;
    this.bottom = v.y;
  }

  get left () {
    return this.x;
  }

  set left (v) {
    this.x = v;
  }

  get right () {
    return this.x + this.width;
  }

  set right (v) {
    this.width = v - this.x;
  }

  get size () {
    return new Point (this.width, this.height);
  }

  set size(v) {
    this.width = v.x;
    this.height = v.y;
  }

  get top () {
    return this.y;
  }

  set top (v) {
    this.y = v;
  }

  get topLeft () {
    return new Point (this.x, this.y);
  }

  set topLeft (v) {
    this.x = v.x;
    this.y = v.y;
  }

  clone () {
    return new Rectangle (this.x, this.y, this.width, this.height);
  }

  contains (x, y) {
    return (x >= this.x && x <= this.right) && (y >= this.y && y <= this.bottom);
  }

  containsPoint (point) {
    return this.contains(point.x, point.y);
  }

  containsRect (rect) {
    return this.containsPoint(rect.topLeft) && this.containsPoint(rect.bottomRight);
  }

  copyFrom (sourceRect) {
    this.x = sourceRect.x;
    this.y = sourceRect.y;
    this.width = sourceRect.width;
    this.height = sourceRect.height;
  }

  equals (toCompare) {
    return this.topLeft.equals(toCompare.topLeft) && 
           this.bottomRight.equals(toCompare.bottomRight);
  }

  inflate (dx, dy) {
    this.width += dx;
    this.height += dy;
  }

  inflatePoint (point) {
    this.inflate (point.x, point.y);
  }

  intersection (toIntersect) {
    // TODO :: need to test
    var r = new Rectangle ();
    if (this.intersects(toIntersect)) { 
      r.top = Math.min(this.top, toIntersect.top);
      r.left = Math.min(this.left, toIntersect.left);
      r.width = Math.min(this.right, toIntersect.right) - r.left;
      r.height = Math.min(this.bottom, toIntersect.bottom) - r.top;
    }
    return r;
  }

  intersects (toIntersect) {
    // TODO :: need to test
    if (this.left > toIntersect.right || toIntersect.left > this.right)
      return false;

    if (this.top > toIntersect.bottom || toIntersect.top > this.bottom)
      return false;

    return true;
  }

  isEmpty () {
    return (this.width <= 0) && (this.height <= 0);
    //return (this.width == 0) && (this.height == 0);
  }

  offset (dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  offsetPoint (point) {
    this.offset(point.x, point.y);
  }

  setEmpty () {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
  }

  setTo (xa, ya, widtha, heighta) {
    this.x = xa;
    this.y = ya;
    this.width = widtha;
    this.height = heighta;
  }

  toString () {
    return '(x='+this.x+', y='+this.y+', width='+this.width+', height='+this.height+')';
  }

  union (toUnion) {
    // TODO :: need to test
    /*
    if (this.isEmpty()) 
      return toUnion.clone();

    if (toUnion.isEmpty())
      return this.clone();
    */
    var r = new Rectangle();
    r.x = Math.min(this.x, toUnion.x);
    r.y = Math.min(this.y, toUnion.y);
    r.width = Math.max(this.x + this.width, toUnion.x + toUnion.width) - r.x;
    r.height = Math.max(this.y + this.height, toUnion.y + toUnion.height) - r.y;
    return r;
  }
}