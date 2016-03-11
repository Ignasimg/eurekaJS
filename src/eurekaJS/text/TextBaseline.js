var ns = namespace("eurekaJS.text");

this.TextBaseline = ns.TextBaseline = class TextBaseline {
  constructor () {}

  static get TOP () {
    return 'top';
  }
  static get BOTTOM () {
    return 'bottom';
  }
  static get MIDDLE () {
    return 'middle';
  }
  static get ALPHABETIC () {
    return 'alphabetic';
  }
  static get IDEOGRAPHIC () {
    return 'ideographic';
  }
  static get HANGING () {
    return 'hanging';
  }
}