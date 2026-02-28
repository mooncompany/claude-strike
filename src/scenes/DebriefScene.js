export default class DebriefScene extends Phaser.Scene {
  constructor() { super('Debrief'); }
  create() {
    this.cameras.main.setBackgroundColor(0x0a0a0a);
    this.add.text(240, 200, 'MISSION DEBRIEF', {
      fontFamily: 'Courier New', fontSize: '20px', color: '#6aaa6a'
    }).setOrigin(0.5);
    // TODO: Score breakdown, stats, quote reveal
  }
}
