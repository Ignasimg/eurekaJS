var ns = namespace("eurekaJS.native");

ns.Canvas = class Canvas {
  constructor (canvas, width, height) {
    var c = canvas || document.createElement("canvas");
    c.width = width || c.width;
    c.height = height || c.height; 

    Object.defineProperties(c, {
      'left': {
        get: function () {
          return Math.floor(c.getBoundingClientRect().left);
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