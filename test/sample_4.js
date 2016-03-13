import "eurekaJS/display/Sprite.js";
import "eurekaJS/events/EventPhase.js";

class Circle extends Sprite {
  constructor (size, color) {
    super();
    this.graphics.beginFill(color);
    this.graphics.drawCircle(0, 0, size);
    this.graphics.endFill();
  }
}

var a = new Circle(100, '#FF0000'); a.name = 'a';
var b = new Circle(90, '#00FF00');  b.name = 'b';
var c = new Circle(80, '#0000FF');  c.name = 'c';
var d = new Circle(70, '#FFFF00');  d.name = 'd';
var e = new Circle(60, '#00FFFF');  e.name = 'e';
var f = new Circle(50, '#FF00FF');  f.name = 'f';
var g = new Circle(40, '#FFFFFF');  g.name = 'g';
Stage.name = "Stage";

a.addChild(b);
b.addChild(c);
c.addChild(d);
d.addChild(e);
e.addChild(f);
f.addChild(g);
Stage.addChild(a);

a.x = 200;
a.y = 300;

function whoAmI (e) {
  console.info('clicked ::', e.target.name);
  console.info('I\'m    ::', e.currentTarget.name);
  console.info('phase   ::', e.eventPhase);
  console.warn('---------------------------');
}

[a, b, c, d, e, f, g, Stage].forEach(function (o) {
  o.addEventListener('click', whoAmI, EventPhase.CAPTURING_PHASE | EventPhase.AT_TARGET | EventPhase.BUBBLING_PHASE);
})