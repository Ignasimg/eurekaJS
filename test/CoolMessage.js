import "eurekaJS/text/TextField.js";
import "eurekaJS/display/Sprite.js";

this.CoolMessage = class CoolMessage extends Sprite {
  constructor () {
    super();

    this.msg = new TextField();
    this.msg.size = 16;
    this.msg.x = 3;
    this.msg.y = 1;

    this.addChild(this.msg);
  }

  set text (v) {
    this.msg.text = v;
    this.long = Math.round(this.msg.textWidth);
  }

  set long (v) {
    v = (v > 10) ? v : 10;

    this.graphics.lineStyle(3, '#FF0000');
    this.graphics.beginFill('#FFF');
    this.graphics.moveTo(0, 0);
    this.graphics.lineTo(0, 16+3+3);
    this.graphics.lineTo(v+3+3, 16+3+3);
    this.graphics.lineTo(v+3+3, 0);
    this.graphics.lineTo(0, 0);
    this.graphics.endFill();
  }

}