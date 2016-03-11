import "eurekaJS/display/Sprite.js";

"use strict";

class Tile extends Sprite {
  constructor() {
    super();
    this.graphics.lineStyle(1, '#000');
    this.graphics.beginFill('#BBB');
    this.graphics.moveTo(0, 16);
    this.graphics.lineTo(32, 0);
    this.graphics.lineTo(64, 16);
    this.graphics.lineTo(32, 32);
    this.graphics.lineTo(0, 16);
    this.graphics.endFill();

    this.graphics.beginFill('#333');
    this.graphics.moveTo(0, 16);
    this.graphics.lineTo(0, 20);
    this.graphics.lineTo(32, 36);
    this.graphics.lineTo(64, 20);
    this.graphics.lineTo(64, 16);
    this.graphics.lineTo(32, 32);
    this.graphics.lineTo(0, 16);
    this.graphics.endFill();
  }
}

class Cursor extends Sprite {
  constructor() {
    super();
    this.graphics.lineStyle(3, '#FF0');
    this.graphics.moveTo(0, 16);
    this.graphics.lineTo(32, 0);
    this.graphics.lineTo(64, 16);
    this.graphics.lineTo(32, 32);
    this.graphics.lineTo(0, 16);
  }

  set casella(c) {
    this.x = (c.x - c.y)*32;
    this.y = (c.x + c.y)*16;

    this.visible = (c.x >= 0 && c.x < 5 
                 && c.y >= 0 && c.y < 5);
  }
}

var TileMap = [[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]];

var map = new Sprite();
map.x = 200;
map.y = 200;

for (let i = 0; i < TileMap.length; ++i) {
  for (let j = 0; j < TileMap[i].length; ++j) {
    var k = new Tile();
    k.addEventListener('click', function (e) {
      console.log('You clicked tile', i, ',', j);
    })
    k.x = (i - j)*32;
    k.y = (i + j)*16;
    map.addChild(k);
  }
}

Stage.addChild(map);

var c = new Cursor();

c.x = 0;
c.y = 0;

map.addChild(c);

Stage.color = "#000000";

Stage.addEventListener('mousemove', function (e) {
  var x = e.mouseX - 200 - 32;
  var y = e.mouseY - 200 - 16;

  var x2 = (x / 64) + (y / 32);
  var y2 = (y / 32) - (x / 64);

  c.casella = {x: Math.round(x2), y: Math.round(y2)};
});