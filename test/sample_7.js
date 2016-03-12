import "eurekaJS/text/TextField.js";
import "eurekaJS/text/TextAlign.js";
import "eurekaJS/text/TextBaseline.js";
import "eurekaJS/display/Sprite.js";
import "test/CoolMessage.js"

class CoolText extends Sprite {
  constructor(text) {
    super();

    this.t1 = new TextField();
    
    this.t1.text = text;
    this.t1.textColor = '#FF0000';

    this.t2 = new TextField();

    this.t2.text = text;
    this.t2.textColor = '#660000';

    this.t2.x = 2;
    this.t2.y = 2;

    this.addChild(this.t2);
    this.addChild(this.t1);
  }

  set textAlign (v) {
    this.t1.textAlign = v;
    this.t2.textAlign = v;
  }

  set textBaseline (v) {
    this.t1.textBaseline = v;
    this.t2.textBaseline = v;
  }

  set text (v) {
    this.t1.text = v;
    this.t2.text = v;
  }
}

Stage.color = '#000000';

var title = new CoolText('Waka-Waka');

title.textAlign = TextAlign.CENTER;

Stage.addChild(title);

title.x = Stage.width/2;
title.y = 0;

var messages = ['wololo!', 'eurekaJS rulz', 'jsaksjaksajskajsk 1337', '(\\__/)', '(=\';\'=)', '(")_(")', 'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦㄧㄨㄩ'];
for (var i = 0; i < messages.length; ++i) {
  let msg = new CoolMessage();
  msg.text = messages[i];
  msg.x = 20;
  msg.y = 100 + i*30;
  msg.name = i;
  Stage.addChild(msg);

  msg.addEventListener('click', function (e) {
    msg.toggle = !msg.toggle;
    if (msg.toggle) {
      msg.x += 10;
    }
    else {
      msg.x -= 10;
    }
  });
}