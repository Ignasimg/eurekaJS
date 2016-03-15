import "eurekaJS/display/GraphicsPathCommand.js"

var ns = namespace("eurekaJS.display");

this.GraphicsPath = ns.GraphicsPath = class GraphicsPath {
  constructor (commands, data) {
    this._cmd = [];
    this._data = [];
  }

  cubicCurveTo (controlX1, controlY1, controlX2, controlY2, anchorX, anchorY) {
    this._cmd.push(GraphicsPathCommand.CUBIC_CURVE_TO);
    this._data.push(controlX1, controlY1, controlX2, controlY2, anchorX, anchorY);
  }

  curveTo (controlX, controlY, anchorX, anchorY) {
    this._cmd.push(GraphicsPathCommand.CURVE_TO);
    this._data.push(controlX, controlY, anchorX, anchorY);
  }

  lineTo (x, y) {
    this._cmd.push(GraphicsPathCommand.LINE_TO);
    this._data.push(x, y);
  }

  moveTo (x, y) {
    this._cmd.push(GraphicsPathCommand.MOVE_TO);
    this._data.push(x, y);
  }
}