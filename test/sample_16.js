import "eurekaJS/media/SoundMixer.js";
import "eurekaJS/net/URLRequest.js";
import "eurekaJS/media/Sound.js";
import "eurekaJS/events/Event.js";

// In this example we will load and play a music file,
// this example serves to demostrate how to play external music.


var req = new URLRequest('test/la santa espina.mp3');
var sound = new Sound(req);
sound.addEventListener(Event.COMPLETE, function () {
  sound.play();
});