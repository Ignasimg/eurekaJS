import "eurekaJS/display/Sprite.js";

class square extends Sprite {
  constructor (s, c) {
    super();
    
    s = s || 10;
    c = c || '#FF0000';
    this.graphics.lineStyle();
    this.graphics.beginFill(c);
    this.graphics.moveTo(0, 0);
    this.graphics.lineTo(s, 0);
    this.graphics.lineTo(s, s);
    this.graphics.lineTo(0, s);
    this.graphics.lineTo(0, 0);
    this.graphics.endFill();
  }
}

var a = new square(100, '#FF0000');
var b = new square(100, '#00FF00');

a.x = 100;
a.y = 100;

a.scaleX = 0.7;
a.scaleY = 0.5;

a.rotation = 45;

// We won't see the square a because b will be just on top of it.
Stage.addChild(a);
Stage.addChild(b);

b.transform.matrix = a.transform.matrix;
