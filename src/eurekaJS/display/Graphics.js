import "eurekaJS/geom/Rectangle.js";
import "eurekaJS/display/Color.js";

var ns = namespace("eurekaJS.display");

function _applyCmd (ctx, cmd, color) {
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
      if (color) 
        ctx.moveTo(Math.round(cmd[1]), Math.round(cmd[2]));
      else 
        ctx.moveTo(cmd[1], cmd[2]);
      break;
    case 'lT' : 
      if (color) 
        ctx.lineTo(Math.round(cmd[1]), Math.round(cmd[2]));
      else 
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
    this._bb = new eurekaJS.geom.Rectangle();
    this._shapeStarted = false;
    this._fillStarted = false;
    this._strokeStarted = false;
    
    this._xx = 0;
    this._yy = 0;
  }

  copyFrom (original) {
    if (!(original instanceof eurekaJS.display.Graphics))
      throw new TypeError("Graphics::copyFrom expects Graphics");
    this._cmd = JSON.parse(JSON.stringify(original._cmd));
    this._shapeStarted = original._shapeStarted;
    this._fillStarted = original._fillStarted;
    this._strokeStarted = original._strokeStarted;
    this._bb = original._bb.clone();
    this._xx = original._xx;
    this._yy = original._yy;
  }
  
  clear () {
    this._cmd = [];
    this._bb.setEmpty();
  }

  beginFill (color, alpha) {
    this._fillStarted = true;
    color = color || '#000000';
    alpha = alpha || 1;
    var RGB = eurekaJS.display.Color.getComponents(color);
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
    
    this._xx = x;
    this._yy = y;
  }
  
  lineTo (x, y) {
    if (!this._shapeStarted) {
      this._shapeStarted = true;
      this._cmd.push(['bP']);
    }
    
    this._bb = this._bb.union(new eurekaJS.geom.Rectangle(this._xx, this._yy, x-this._xx, y-this._yy))
    this._xx = x;    this._yy = y;
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
    var RGB = eurekaJS.display.Color.getComponents(color);
    this._cmd.push(['sS', 'rgba('+RGB.R+','+RGB.G+','+RGB.B+','+alpha+')']);
    this._cmd.push(['lW', thickness]);
  }

  drawCircle (x, y, radius) {
    this._helperBeginPath();
    this._cmd.push(['a', x, y, radius, 0, 2*Math.PI]);
    this._bb = this._bb.union(new eurekaJS.geom.Rectangle(x-radius, y-radius, x+radius, y+radius));
  }

  drawRect(x, y, width, height) {
    this.moveTo(x, y);
    this.lineTo(x + width, y);
    this.lineTo(x + width, y + height);
    this.lineTo(x, y + height);
    this.lineTo(x, y);
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