import "eurekaJS/display/Sprite.js";

var square = new Sprite();
Stage.addChild(square);

square.graphics.lineStyle();
square.graphics.beginFill('#FF0000');
square.graphics.moveTo(0, 0);
square.graphics.lineTo(100, 0);
square.graphics.lineTo(100, 100);
square.graphics.lineTo(0, 100);
square.graphics.lineTo(0, 0);
square.graphics.endFill();

var circle = new Sprite();
circle.graphics.lineStyle();
circle.graphics.beginFill('#FFFF00');
circle.graphics.drawCircle(50, 50, 50)
circle.graphics.endFill();

Stage.addChild(circle);

var circle_and_square = new Sprite();
circle_and_square.addChild(square);
circle_and_square.addChild(circle);

Stage.addChild(circle_and_square);
circle_and_square.x = 100;

var triangle = new Sprite();
Stage. addChild(triangle);


triangle.graphics.lineStyle();
triangle.graphics.beginFill('FFFF00');
triangle.graphics.moveTo(200,50);
triangle.graphics.lineTo(200,50);
triangle.graphics.lineTo(300,0);
triangle.graphics.lineTo(300,100);
triangle.graphics.endFill();