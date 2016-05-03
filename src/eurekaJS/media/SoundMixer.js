var ns = namespace("eurekaJS.media");

var instance = null;

this.SoundMixer = ns.SoundMixer = class SoundMixer {
  /*
  constructor () {
    if (!instance) {
      this._audioContext = new AudioContext();
      instance = this;
    }

    return instance;
  }
  */

  static get _instance () {
    if (!instance) {
      instance = {}; new SoundMixer();
      instance._audioContext = new AudioContext();
    }

    return instance;
  }

  static get _audioBuffer () {
    return SoundMixer._instance._audioContext
  }

  static _decodeAudioData (bytes, fun) {
    return SoundMixer._instance._audioContext.decodeAudioData(bytes, fun);
  }

  static _createBufferSource () {
    return SoundMixer._instance._audioContext.createBufferSource();
  }

  static get _destination () {
    return SoundMixer._instance._audioContext.destination;
  }

}