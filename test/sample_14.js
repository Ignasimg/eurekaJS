import "eurekaJS/net/URLRequest.js";
import "eurekaJS/net/URLLoader.js";
import "eurekaJS/events/Event.js";

var req = new URLRequest('https://upload.wikimedia.org/wikipedia/en/3/39/R2-D2_Droid.png');

var loader = new URLLoader();
loader.addEventListener(Event.COMPLETE, function (e) {
    console.log("Yes! I made it");
    console.log(loader.data);
})
loader.load(req);
