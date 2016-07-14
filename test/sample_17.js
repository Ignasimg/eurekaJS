import "eurekaJS/display/Sprite.js";

/*
var a = new Sprite();
a.graphics.lineStyle();
a.graphics.beginFill('#FF0000');
a.graphics.moveTo(0, 0);
a.graphics.lineTo(10, 0);
a.graphics.lineTo(10, 10);
a.graphics.lineTo(0, 10);
a.graphics.lineTo(0, 0);
a.graphics.endFill();

Stage.addChild(a);

a.x = 50;

console.log(a.x, a.y, a.width, a.height);

var b = new Sprite();

Stage.addChild(b);

console.log(b.x, b.y, b.width, b.height);

b.addChild(a);

b.x = 1;

console.log(b.x, b.y, b.width, b.height);
*/

var square = new Sprite();

square.graphics.lineStyle();
square.graphics.beginFill('#FF0000');
square.graphics.moveTo(0, 0);
square.graphics.lineTo(100, 0);
square.graphics.lineTo(100, 100);
square.graphics.lineTo(0, 100);
square.graphics.lineTo(0, 0);
square.graphics.endFill();

Stage.addChild(square);

var x, y, w, h;

console.log('Dades del quadrat: (x:', square.x, ', y:', square.y, ', width:', square.width, ', height:', square.height, ')');
console.log('Dades esperades:   (x:', x = 0, ', y:', y = 0, ', width:', w = 100, ', height:', h = 100, ')');
console.log('------');




var shape = new Sprite();

shape.graphics.lineStyle();
shape.graphics.beginFill('#00FF00');
shape.graphics.moveTo(10, 10);
shape.graphics.lineTo(10, 40);
shape.graphics.lineTo(40, 45);
shape.graphics.lineTo(40, 10);
shape.graphics.lineTo(10, 10);
shape.graphics.endFill();

console.log('Dades del shape: (x:', shape.x, ', y:', shape.y, ', width:', shape.width, ', height:', shape.height, ')');
console.log('Dades esperades: (x:', x = 0, ', y:', y = 0, ', width:', w = 40, ', height:', h = 45, ')');
console.log('------');

var total = new Sprite();
Stage.addChild(total);

console.log('Dades del total: (x:', total.x, ', y:', total.y, ', width:', total.width, ', height:', total.height, ')');
console.log('Dades esperades: (x:', x = 0, ', y:', y = 0, ', width:', w = 0, ', height:', h = 0, ')');
console.log('------');

total.addChild(square);
console.log('Dades del total: (x:', total.x, ', y:', total.y, ', width:', total.width, ', height:', total.height, ')');
console.log('Dades esperades: (x:', x = 0, ', y:', y = 0, ', width:', w = 100, ', height:', h = 100, ')');
console.log('------');

total.addChild(shape);
console.log('Dades del total: (x:', total.x, ', y:', total.y, ', width:', total.width, ', height:', total.height, ')');
console.log('Dades esperades: (x:', x = 0, ', y:', y = 0, ', width:', w = 100, ', height:', h = 100, ')');
console.log('------');

shape.x = 100;
console.log('Dades del total: (x:', total.x, ', y:', total.y, ', width:', total.width, ', height:', total.height, ')');
console.log('Dades esperades: (x:', x = 0, ', y:', y = 0, ', width:', w = 140, ', height:', h = 100, ')');
console.log('------');

total.y = 30;
console.log('Dades del total: (x:', total.x, ', y:', total.y, ', width:', total.width, ', height:', total.height, ')');
console.log('Dades esperades: (x:', x = 0, ', y:', y = 30, ', width:', w = 140, ', height:', h = 100, ')');
console.log('------');

square.y = 10;
console.log('Dades del total: (x:', total.x, ', y:', total.y, ', width:', total.width, ', height:', total.height, ')');
console.log('Dades esperades: (x:', x = 0, ', y:', y = 30, ', width:', w = 140, ', height:', h = 110, ')');
console.log('------');

square.x += 40;
console.log('Dades del total: (x:', total.x, ', y:', total.y, ', width:', total.width, ', height:', total.height, ')');
console.log('Dades esperades: (x:', x = 0, ', y:', y = 30, ', width:', w = 140, ', height:', h = 110, ')');
console.log('------');

square.x += 10;
console.log('Dades del total: (x:', total.x, ', y:', total.y, ', width:', total.width, ', height:', total.height, ')');
console.log('Dades esperades: (x:', x = 0, ', y:', y = 30, ', width:', w = 150, ', height:', h = 110, ')');
console.log('------');

shape.y -= 10;
console.log('Dades del shape: (x:', shape.x, ', y:', shape.y, ', width:', shape.width, ', height:', shape.height, ')');
console.log('Dades del quadrat: (x:', square.x, ', y:', square.y, ', width:', square.width, ', height:', square.height, ')');
console.log('Dades del total: (x:', total.x, ', y:', total.y, ', width:', total.width, ', height:', total.height, ')');
console.log('Dades esperades: (x:', x = 0, ', y:', y = 30, ', width:', w = 150, ', height:', h = 120, ')');
console.log('------');