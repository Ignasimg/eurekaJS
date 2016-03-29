import "eurekaJS/display/Shape.js";
import "eurekaJS/display/Sprite.js";
import "eurekaJS/events/Event.js";
import "eurekaJS/events/KeyboardEvent.js";
import "eurekaJS/ui/Keyboard.js";

/*
* Inspired on :: https://www.kirupa.com/developer/actionscript/rotation_center.htm
*/

class Point3d {
  constructor (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class Point2d {
  constructor (x, y, depth, scaleFactor) {
    this.x = x;
    this.y = y;
    this.depth = depth;
    this.scaleFactor = scaleFactor;
  }
}

class RedBall extends Shape {
  constructor () {
    super();
    this.graphics.beginFill('#FF0000');
    this.graphics.drawCircle(0, 0, 10);
    this.graphics.endFill();
  }
}

var transform3DPointsTo2DPoints = function(points, axisRotations){
  var TransformedPointsArray = [];
  var sx = Math.sin(axisRotations.x);
  var cx = Math.cos(axisRotations.x);
  var sy = Math.sin(axisRotations.y);
  var cy = Math.cos(axisRotations.y);
  var sz = Math.sin(axisRotations.z);
  var cz = Math.cos(axisRotations.z);
  var x,y,z, xy,xz, yx,yz, zx,zy, scaleFactor;

  var i = points.length;
  while (i--){
    x = points[i].x;
    y = points[i].y;
    z = points[i].z;

    // rotation around x
    xy = cx*y - sx*z;
    xz = sx*y + cx*z;
    // rotation around y
    yz = cy*xz - sy*x;
    yx = sy*xz + cy*x;
    // rotation around z
    zx = cz*yx - sz*xy;
    zy = sz*yx + cz*xy;
    
    scaleFactor = focalLength/(focalLength + yz);
    x = zx*scaleFactor;
    y = zy*scaleFactor;
    z = yz;

    TransformedPointsArray[i] = new Point2d(x, y, -z, scaleFactor);
  }
  return TransformedPointsArray;
};

var pointsArray = [
  new Point3d(-50,-50,-50),
  new Point3d(50,-50,-50),
  new Point3d(50,-50,50),
  new Point3d(-50,-50,50),
  new Point3d(-50,50,-50),
  new Point3d(50,50,-50),
  new Point3d(50,50,50),
  new Point3d(-50,50,50)
];


var focalLength = 300;

var scene = new Sprite();
scene.x = 150;
scene.y = 150;

for (var i=0; i < pointsArray.length; i++){
  let ballon = new RedBall();
  ballon.name = "redballoon"+i;
  scene.addChild(ballon);
}

var cubeAxisRotations = new Point3d(0,0,0);

var mouseX = 0;
var mouseY = 0;

var rotateCube = function(e) {
  switch (e.keyCode) {
    case Keyboard.UP : 
      mouseY -= 10;
    break;
    case Keyboard.DOWN : 
      mouseY += 10;
    break;
    case Keyboard.LEFT : 
      mouseX -= 10;
    break;
    case Keyboard.RIGHT : 
      mouseX += 10;
    break;
  }
};

var maxDepth = Math.sqrt(50*50 * 3);

var project = function () {
  cubeAxisRotations.y -= mouseX/3000;
  cubeAxisRotations.x += mouseY/3000;
  var screenPoints = transform3DPointsTo2DPoints(pointsArray, cubeAxisRotations);
  for (var i=0; i < pointsArray.length; i++){
    let currBalloon = scene.getChildByName("redballoon"+i);
    currBalloon.x = screenPoints[i].x;
    currBalloon.y = screenPoints[i].y;
    currBalloon.scaleX = currBalloon.scaleY = 1 * screenPoints[i].scaleFactor;
    currBalloon.alpha = (screenPoints[i].depth + maxDepth)/(2*maxDepth);
  }
}

Stage.addEventListener(KeyboardEvent.KEY_DOWN, rotateCube);
Stage.addEventListener(Event.RENDER, project);

Stage.addChild(scene);

Stage.frameRate = 120;

Stage.color = '#000000';