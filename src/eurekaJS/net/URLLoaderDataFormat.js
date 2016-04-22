var ns = namespace("eurekaJS.net");

this.URLLoaderDataFormat = ns.URLLoaderDataFormat = class URLLoaderDataFormat {
  static get TEXT () {
    return 'text';
  }

  static get BINARY () {
    return 'arraybuffer';
  }

  static get JSON () {
    return 'json';
  }
}