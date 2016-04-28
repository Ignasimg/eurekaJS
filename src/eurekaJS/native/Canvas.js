var ns = namespace("eurekaJS.native");

ns.Canvas = class Canvas {
  constructor (width, height) {
    var c = document.createElement("canvas");
    c.width = width;
    c.height = height; 

    Object.defineProperties(c, {
      'left': {
        get: function () {
          Math.floor(c.getBoundingClientRect().left);
        }
      },
      'top': {
        get: function () {
          return Math.floor(c.getBoundingClientRect().top);
        }
      },
      'context': {
        get: function () {
          return c.getContext("2d");
        }
      }
    });
    return c;
  }
}