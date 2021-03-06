/*
"use strict";

var ns = namespace("eurekaJS.native");

ns.NativeCanvas = class NativeCanvas {
  constructor (element) {
    this.element = element || document.createElement("canvas");

    NativeCanvas.prototype.addEventListener = this.element.addEventListener.bind(this.element);
    NativeCanvas.prototype.removeEventListener = this.element.removeEventListener.bind(this.element);
    NativeCanvas.prototype.dispatchEvent = this.element.dispatchEvent.bind(this.element);
  }

  get width () {
    return this.element.width;
  }

  set width (w) {
    this.element.width = w;
  }

  get height () {
    return this.element.height;
  }

  set height (h) {
    this.element.height = h;
  }

  get left () {
    return Math.floor(this.element.getBoundingClientRect().left);
  }

  get top () {
    return Math.floor(this.element.getBoundingClientRect().top);
  }

  get context () {
    return this.element.getContext("2d");
  }

  get style () {
    return this.element.style;
  }

  setAttribute (name, value) {
    return this.element.setAttribute(name, value);
  }

  focus () {
    return this.element.focus();
  }
}
*/