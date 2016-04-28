import "eurekaJS/display/Bitmap.js";
import "eurekaJS/display/Loader.js";

// In this example we will load and display an external image,
// this example serves to demostrate how to display external bitmaps.


var req = new URLRequest('https://upload.wikimedia.org/wikipedia/en/3/39/R2-D2_Droid.png');
var loader = new Loader();
loader.load(req);

loader.scaleX = loader.scaleY = 0.75;

Stage.addChild(loader);

/*
var b = new Bitmap();

Stage.addChild(b);
*/