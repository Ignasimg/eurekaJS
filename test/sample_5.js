import "eurekaJS/display/Sprite.js";

class Star extends Sprite {
  constructor () {
    super();
    this.graphics.lineStyle(1, '#000000');
    this.graphics.beginFill('#FFFF00');
    this.graphics.moveTo(50, 0);
    this.graphics.lineTo(60, 40);
    this.graphics.lineTo(100, 40)
    this.graphics.lineTo(70, 60);
    this.graphics.lineTo(90, 90);
    this.graphics.lineTo(50, 70);
    this.graphics.lineTo(10, 90);
    this.graphics.lineTo(30, 60);
    this.graphics.lineTo(0, 40);
    this.graphics.lineTo(40, 40);
    this.graphics.lineTo(50, 0);
    this.graphics.endFill();
  }
}

var s = new Star();

Stage.addChild(s);

s.x = 300;
s.y = 300;

Stage.addEventListener('beforeRender', function () {
  s.rotation++;
})

s.addEventListener('click', function () {
    s.scaleX = 1.2;
    s.scaleY = 1.2;
})

s.addEventListener('dblclick', function () {
    s.scaleX = 1;
    s.scaleY = 1;
})