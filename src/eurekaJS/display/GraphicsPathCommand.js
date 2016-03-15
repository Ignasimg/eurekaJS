var ns = namespace("eurekaJS.display");

this.GraphicsPathCommand = ns.GraphicsPathCommand = class GraphicsPathCommand {
  static get CUBIC_CURVE_TO () {
    return 6;
  }

  static get CURVE_TO () {
    return 3;
  }

  static get LINE_TO () {
    return 2;
  }

  static get MOVE_TO () {
    return 1;
  }

  static get NO_OP () {
    return 0;
  }

  static get WIDE_LINE_TO () {
    return 5;
  }

  static get WIDE_MOVE_TO () {
    return 4;
  }
}