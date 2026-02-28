export default class CutsceneScene extends Phaser.Scene {
  constructor() { super('Cutscene'); }
  create() {
    // TODO: Anthropic incident cutscene
    // For now, just a placeholder
    this.cameras.main.setBackgroundColor(0x000000);
    this.add.text(240, 427, 'THE ANTHROPIC INCIDENT', {
      fontFamily: 'Courier New', fontSize: '18px', color: '#ff3333',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.time.delayedCall(3000, () => this.scene.start('Mission'));
  }
}
