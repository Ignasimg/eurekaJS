import "eurekaJS/media/SoundMixer.js";
import "eurekaJS/net/URLRequest.js";
import "eurekaJS/media/Sound.js";
import "eurekaJS/events/Event.js";

import "eurekaJS/events/MouseEvent.js";
import "eurekaJS/display/Sprite.js";

// In this example we will load and play a music file,
// this example serves to demostrate how to play external music.


var req = new URLRequest('test/la santa espina.mp3');
var sound = new Sound(req);
sound.play();

var a = new Sprite();
a.graphics.lineStyle(3, '#FF0000');
a.graphics.beginFill('#FF0000');
a.graphics.moveTo(0, 0);
a.graphics.lineTo(100, 0);
a.graphics.lineTo(100, 20);
a.graphics.lineTo(0, 20);
a.graphics.lineTo(0, 0);
a.graphics.endFill();

a.x = a.y = 30;

Stage.addChild(a);

var start = true;

a.addEventListener(MouseEvent.CLICK, function () {
  if (start) {
    SoundMixer.stopAll();
    //SoundMixer._instance._audioContext.close();
  }
  else {
    //sound.play();
    SoundMixer._instance._audioContext.resume();
  }
  start = !start;
})

//sound.load(req);
/*
sound.addEventListener(Event.COMPLETE, function () {
  sound.play();
});
*/