import "eurekaJS/display/Sprite.js";

class Holder extends Sprite {
  constructor () { super(); this.name = "Holder"; }
}

class Holded extends Sprite {
  constructor () { super(); this.name = "Holded"; }
}

Stage.name = "Stage!";

var H = new Holder();

var h = new Holded();

console.log('1 result', (h.parent) ? h.parent.name : '', (h.stage) ? h.stage.name : '');
console.log('1 expect', '', '');

Stage.addChild(h);

console.log('2 result', (h.parent) ? h.parent.name : '', (h.stage) ? h.stage.name : '');
console.log('2 expect', 'Stage!', 'Stage!');

Stage.removeChild(h);

console.log('3 result', (h.parent) ? h.parent.name : '', (h.stage) ? h.stage.name : '');
console.log('3 expect', '', '');

H.addChild(h);

console.log('4 result', (h.parent) ? h.parent.name : '', (h.stage) ? h.stage.name : '');
console.log('4 expect', 'Holder', '');

Stage.addChild(H);

console.log('5 result', (h.parent) ? h.parent.name : '', (h.stage) ? h.stage.name : '');
console.log('5 expect', 'Holder', 'Stage!');

H.removeChild(h);

console.log('6 result', (h.parent) ? h.parent.name : '', (h.stage) ? h.stage.name : '');
console.log('6 expect', '', '');

H.addChild(h);

console.log('7 result', (h.parent) ? h.parent.name : '', (h.stage) ? h.stage.name : '');
console.log('7 expect', 'Holder', 'Stage!');