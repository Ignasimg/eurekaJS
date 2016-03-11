import "eurekaJS/display/Sprite.js"

var s = new Sprite();

s.graphics.beginFill("#FF0000");
s.graphics.lineStyle(3, '#000');
s.graphics.moveTo(100, 100);
s.graphics.lineTo(100, 200);
s.graphics.lineTo(200, 200);
s.graphics.lineTo(200, 100);
s.graphics.lineTo(100, 100);
s.graphics.endFill();

s.graphics.moveTo(300, 300);
s.graphics.lineTo(400, 300);
s.graphics.lineTo(400, 400);
s.graphics.lineTo(300, 400);
s.graphics.lineTo(300, 300);
s.graphics.endFill();

s.graphics.beginFill('#0000FF');
s.graphics.drawCircle(350, 150, 50);
s.graphics.endFill();


var s2 = new Sprite();

s2.graphics.beginFill('#0F0');
s2.graphics.drawCircle(150, 350, 50);
s2.graphics.endFill();

Stage.addChild(s);

Stage.addChild(s2);


Stage.addEventListener('click', function (e) {
  var s = new Sprite();

  s.graphics.beginFill('#00F');
  s.graphics.lineStyle(3);
  s.graphics.drawCircle(e.mouseX, e.mouseY, 10);
  s.graphics.endFill(); 

  Stage.addChild(s);

  if (Stage.numChild > 5)
    Stage.removeChildAt(2);
});