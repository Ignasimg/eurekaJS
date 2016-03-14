import "eurekaJS/display/Sprite.js";
import "eurekaJS/events/MouseEvent.js";
import "eurekaJS/ui/Mouse.js";

class roundCursor extends Sprite {
  constructor () {
    super();
    this.graphics.beginFill('#FF0000');
    this.graphics.drawCircle(0, 0, 5);
    this.graphics.endFill();
    this.graphics.beginFill('#FFFFFF');
    this.graphics.drawCircle(0, 0, 3);
    this.graphics.endFill();
  }
}

var cursor = new roundCursor();
Stage.addChild(cursor);

Mouse.hide();

Stage.addEventListener(MouseEvent.MOUSEMOVE, function (ev) {
  cursor.x = ev.mouseX;
  cursor.y = ev.mouseY;
});