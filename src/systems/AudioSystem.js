// Audio system stub — will manage BGM and SFX
export default class AudioSystem {
  constructor(scene) {
    this.scene = scene;
    this.muted = false;
  }
  play(key) { /* TODO: implement when audio assets exist */ }
  playBGM(key) {}
  stopBGM() {}
  mute() { this.muted = true; }
  unmute() { this.muted = false; }
}
