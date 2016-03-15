import "eurekaJS/text/TextField.js";
import "eurekaJS/text/Font.js";

Font.embed('icomoon', 'test/icomoon.woff');

var kinds = ['Arial', 'Tahoma', 'Sans', 'Comic Sans MS', 'icomoon'];

for (var i = 0; i < kinds.length; ++i) {
  let a = new TextField();
  a.text = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  a.font = kinds[i];
  a.size = 14;
  a.x = 0;
  a.y = 20*i;
  a.bold = true;
  a.italic = true;

  Stage.addChild(a);
}