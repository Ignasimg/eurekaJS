import "eurekaJS/display/Shape.js";
import "eurekaJS/display/Sprite.js";
import "eurekaJS/text/TextField.js";
import "eurekaJS/events/MouseEvent.js";

class button extends Sprite {
  constructor (text, fun) {
    super();
    var label = new TextField();
    label.size = 20;
    label.text = text;
    var w = label.textWidth;
    var h = label.size;
    this.graphics.beginFill('#CCCCCC');
    this.graphics.moveTo(0, 0);
    this.graphics.lineTo(w, 0);
    this.graphics.lineTo(w, h);
    this.graphics.lineTo(0, h);
    this.graphics.lineTo(0, 0);
    this.graphics.endFill();
    this.addChild(label);
    this.addEventListener(MouseEvent.CLICK, fun);
  }
}

var t = new Shape();
t.graphics.beginFill('#00FF00');
t.graphics.moveTo(0, 0);
t.graphics.lineTo(0, 40);
t.graphics.lineTo(40, 40);
t.graphics.lineTo(40, 0);
t.graphics.lineTo(0, 0);
t.graphics.endFill();

Stage.addChild(t);



var xp = new button(' x++ ', function () { t.x++; });
var xl = new button(' x-- ', function () { t.x--; });

var yp = new button(' y++ ', function () { t.y++; });
var yl = new button(' y-- ', function () { t.y--; });

var rp = new button(' R++ ', function () { t.rotation++; });
var rl = new button(' R-- ', function () { t.rotation--; });

var sxp = new button(' sX++ ', function () { t.scaleX++; });
var sxl = new button(' sX-- ', function () { t.scaleX--; });

var syp = new button(' sY++ ', function () { t.scaleY++; });
var syl = new button(' sY-- ', function () { t.scaleY--; });

xp.x = 0;   xp.y = 0;     xl.x = 60;  xl.y = 0;
yp.x = 0;   yp.y = 30;    yl.x = 60;  yl.y = 30;
rp.x = 0;   rp.y = 60;    rl.x = 60;  rl.y = 60;
sxp.x = 0;  sxp.y = 90;   sxl.x = 60; sxl.y = 90;
syp.x = 0;  syp.y = 120;  syl.x = 60; syl.y = 120;


var cmd = new Sprite();
cmd.addChild(xp);
cmd.addChild(xl);
cmd.addChild(yp);
cmd.addChild(yl);
cmd.addChild(rp);
cmd.addChild(rl);
cmd.addChild(sxp);
cmd.addChild(sxl);
cmd.addChild(syp);
cmd.addChild(syl);

cmd.x = 200;
cmd.y = 0;

Stage.addChild(cmd);

