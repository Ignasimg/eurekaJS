import "eurekaJS/display/Sprite.js";

var a = new Sprite();
a.graphics.lineStyle(10, 'Gold');
a.graphics.beginFill(0x9CFF9C);
a.graphics.drawRect(0,0,100,100);
a.graphics.endFill();

Stage.addChild(a);

a.x = 10;
a.y = 10;

console.log(a.x, a.y, a.width, a.height);