import "eurekaJS/display/Sprite.js";
import "eurekaJS/text/TextField.js";

var a = new Sprite();
a.graphics.lineStyle(10, 'Gold');
a.graphics.beginFill(0x9CFF9C);
a.graphics.drawRect(0,0,100,100);
a.graphics.endFill();

Stage.addChild(a);

a.x = 10;
a.y = 10;

console.log(a.x, a.y, a.width, a.height);


var b = new TextField();
b.text = "Això és una prova - pepsicola."
b.textColor = 'Red';
b.bold = true;

Stage.addChild(b);

b.x = b.y = 30;

b.scaleX = 2;

console.log(b.x, b.y, b.width, b.height);
