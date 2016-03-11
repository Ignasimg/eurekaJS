var ns = namespace("eurekaJS.display");

// Private functions which don't depend on the state of the object.
function _hexToRGB (hex) {
  
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? {
      R: parseInt(result[1], 16),
      G: parseInt(result[2], 16),
      B: parseInt(result[3], 16)
  } : null;
}

function _intToRGB (int) {
  return int ? {
    R: (int >> 16) & 0xFF,
    G: (int >> 8) & 0xFF,
    B: int & 0xFF,
  } : undefined;
}

function _applyCmd (ctx, cmd, color) {
  color = _intToRGB(color);

  if (color) 
    color = 'rgb('+color.R+','+color.G+','+color.B+')';

  switch (cmd[0]) {
    case 'lW' :
      ctx.lineWidth = cmd[1];
      break;
    case 'sS' :
      ctx.strokeStyle = color || cmd[1];
      break;
    case 'fS' :
      ctx.fillStyle = color || cmd[1];
      break;
    case 'bP' :
      ctx.beginPath();
      break;
    case 'mT' : 
      ctx.moveTo(cmd[1], cmd[2]);
      break;
    case 'lT' : 
      ctx.lineTo(cmd[1], cmd[2]);
      break;
    case 'a' :
      ctx.arc(cmd[1], cmd[2], cmd[3], cmd[4], cmd[5], cmd[6] || false);
      break;
    case 'r' :
      ctx.rect(cmd[1], cmd[2], cmd[3], cmd[4]);
      break;
    case 'fR' :
      ctx.fillRect(cmd[1], cmd[2], cmd[3], cmd[4]);
      break;
    case 's' :
      ctx.stroke();
      break; 
    case 'f' :
      ctx.fill();
      break;
    case 'cP' :
      ctx.closePath();
      break;
  }
}

this.Graphics = ns.Graphics = class Graphics {
  constructor () {
    this._cmd = [];
    this._shapeStarted = false;
    this._fillStarted = false;
    this._strokeStarted = false;
  }

  copyFrom (original) {
    if (!(original instanceof eurekaJS.display.Graphics))
      throw new TypeError("Graphics::copyFrom expects Graphics");
    this._cmd = JSON.parse(JSON.stringify(original._cmd));
  }
  
  clear () {
    this._cmd = [];
  }

  beginFill (color, alpha) {
    this._fillStarted = true;
    color = color || '#000000';
    alpha = alpha || 1;
    var RGB = _hexToRGB(color);
    this._cmd.push(['fS', 'rgba('+RGB.R+','+RGB.G+','+RGB.B+','+alpha+')']);
  }

  endFill () {
    if (this._shapeStarted) {
      this._cmd.push(['cP']);
    }
    this._cmd.push(['f']);
  }
  
  moveTo (x, y) {
    this._helperBeginPath();
    this._cmd.push(['mT', x, y]);
  }
  
  lineTo (x, y) {
    if (!this._shapeStarted) {
      this._shapeStarted = true;
      this._cmd.push(['bP']);
    }

    this._cmd.push(['lT', x, y]);
  }

  lineStyle (thickness, color, alpha) {
    if (this._strokeStarted) {
      this._cmd.push(['s']);
    }
    else {
     this._strokeStarted = true;
    }
    thickness = thickness || 1;
    color = color || '#000000';
    alpha = alpha || 1;
    var RGB = _hexToRGB(color);
    this._cmd.push(['sS', 'rgba('+RGB.R+','+RGB.G+','+RGB.B+','+alpha+')']);
    this._cmd.push(['lW', thickness]);
  }

  drawCircle (x, y, radius) {
    this._helperBeginPath();
    this._cmd.push(['a', x, y, radius, 0, 2*Math.PI]);
  }

  _render (ctx, color) {
    for (var i = 0; i < this._cmd.length; ++i) {
      _applyCmd(ctx, this._cmd[i], color);
    }
    if (this._shapeStarted) {
      _applyCmd(ctx, ['cP']);
      if (this._strokeStarted)
        _applyCmd(ctx, ['s']);
    }
  }

  _helperBeginPath () {
    if (this._shapeStarted) {
      // Enter here implies we are already building a path,
      // and we want to start a new one.
      // First thing to do is close the current path.
      this._cmd.push(['cP']);
      // Next we stroke the path if needed.
      if (this._strokeStarted) {
        this._cmd.push(['s']);
      }
    }
    // We start a new path
    this._shapeStarted = true;
    this._cmd.push(['bP']);
  }
}
