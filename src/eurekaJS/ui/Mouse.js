var ns = namespace("eurekaJS.ui");

this.Mouse = ns.Mouse = class Mouse {
  static hide () {
    eurekaJS.playground.Stage.canvas.style.cursor = 'none';
  }

  static show () {
    eurekaJS.playground.Stage.canvas.style.cursor = 'initial';
  }
} 