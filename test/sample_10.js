import "eurekaJS/display/Shape.js";
import "eurekaJS/events/MouseEvent.js"

class Star extends Shape {
  constructor () {
    super();
    var angle = 0;
    var toRad = Math.PI / 180;
    var d = 10;
    var k = 4;

    this.graphics.beginFill('#FFD700');
    this.graphics.lineStyle(1);
      this.graphics.moveTo(0, -1*d);

    angle = 306;
    this.graphics.lineTo(k*Math.cos(angle*toRad), k*Math.sin(angle*toRad));

      angle = 18;
      this.graphics.lineTo(d*Math.cos(angle*toRad), -d*Math.sin(angle*toRad));

    angle = 18;
    this.graphics.lineTo(k*Math.cos(angle*toRad), k*Math.sin(angle*toRad));

      angle = 306;
      this.graphics.lineTo(d*Math.cos(angle*toRad), -d*Math.sin(angle*toRad));

    this.graphics.lineTo(0, 1*k);

      angle = 234;
      this.graphics.lineTo(d*Math.cos(angle*toRad), -d*Math.sin(angle*toRad));

    angle = 162;
    this.graphics.lineTo(k*Math.cos(angle*toRad), k*Math.sin(angle*toRad));

      angle = 162;
      this.graphics.lineTo(d*Math.cos(angle*toRad), -d*Math.sin(angle*toRad));

    angle = 234;
    this.graphics.lineTo(k*Math.cos(angle*toRad), k*Math.sin(angle*toRad));

      angle = 90;
      this.graphics.lineTo(d*Math.cos(angle*toRad), -d*Math.sin(angle*toRad));

    this.graphics.endFill();
  }


}

for (var i = 0; i < 30; ++i) {
  let s = new Star();
  s.scaleX = s.scaleY = 1 + Math.random() * 3;
  s.x = Math.random() * Stage.width;
  s.y = Math.random() * Stage.height;

  s.rotation = Math.random() * 360;

  Stage.addChild(s);

  s.addEventListener(MouseEvent.MOUSEDOWN, function (e) {
    // Bring to front
    Stage.setChildIndex(e.target, Stage.numChild); 

    var dragging = e.target;   

    var drag = function (e) {
      dragging.x = e.mouseX;
      dragging.y = e.mouseY;
    }

    Stage.addEventListener(MouseEvent.MOUSEMOVE, drag);
    Stage.addEventListener(MouseEvent.MOUSEUP, function (e) {
      Stage.removeEventListener(MouseEvent.MOUSEMOVE, drag);
    });
  });
}

Stage.color = '#111111';