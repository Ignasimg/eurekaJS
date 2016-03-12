import "eurekaJS/text/TextField.js";
import "eurekaJS/text/TextAlign.js";
import "eurekaJS/text/TextBaseline.js";

var t = new TextField();

t.text = "Hello world!";
t.textColor = '#FF0000'
t.textAlign = TextAlign.CENTER;
t.textBaseline = TextBaseline.MIDDLE;

Stage.color = '#000000';

Stage.addChild(t);

t.x = Stage.width/2;
t.y = Stage.height/2;