var ns = namespace("eurekaJS.utils");

this.ByteArray = ns.ByteArray = class ByteArray {
  constructor (request) {
    super();

    this._arrayBuffer = new ArrayBuffer();
    this._dataView = new DateView(this._arrayBuffer);
    this._littleEndian = false;
    this._position = 0;
  }

  readBoolean () {
    return (this._dataView.getUint8(this._position++) != 0);
  }

  readByte () {
    return this._dataView.getInt8(this._position++);
  }



}