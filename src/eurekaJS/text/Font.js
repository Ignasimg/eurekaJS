var ns = namespace("eurekaJS.text");

this.Font = ns.Font = class Font {
  static embed (fontName, fontURL) {
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(
     "@font-face {\
        font-family: '" + fontName + "';\
        src: url('" +fontURL + "');\
      }"
    ));
    document.head.appendChild(style);
  }
}