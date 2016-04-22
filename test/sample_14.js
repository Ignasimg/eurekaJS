import "eurekaJS/net/URLRequest.js";
import "eurekaJS/net/URLLoader.js";
import "eurekaJS/net/URLLoaderDataFormat.js";
import "eurekaJS/events/Event.js";

// In this example we will decipher a secret message, 
// using a codetable from an external file, 
// this example serves to demostrate how to use external files.

decipher(31,21,18,5,11,1,36,45,53,44,38,52,54);

function decipher () {
  var secretCode = arguments;
  // Load the external codetable
  var req = new URLRequest('test/vars.json');
  var loader = new URLLoader();
  loader.dataFormat = URLLoaderDataFormat.JSON;
  loader.addEventListener(Event.COMPLETE, function (e) {
    console.log("Secret code obtained, proceding to decipher!");
    var secretCodeTable = loader.data;
    var secretMessage = "";
    for (var i = 0; i < secretCode.length; ++i) {
      secretMessage += secretCodeTable.find(function (charCode) {
        return charCode.code == secretCode[i];
      }).char;
    }
    console.log("The secret message is:", secretMessage);
  });
  loader.load(req);
}
