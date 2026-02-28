export default class MenuScene extends Phaser.Scene {
  constructor() { super('Menu'); }

  create() {
    const cx = 240, cy = 427;

    // Dark background
    this.cameras.main.setBackgroundColor(0x0a0c0a);

    // Title
    this.add.text(cx, cy - 120, 'CLAUDE STRIKE', {
      fontFamily: 'Courier New', fontSize: '36px', color: '#d4644a',
      fontStyle: 'bold', letterSpacing: 4
    }).setOrigin(0.5);

    this.add.text(cx, cy - 80, 'DOMESTIC FREEDOM EDITION', {
      fontFamily: 'Courier New', fontSize: '11px', color: '#6aaa6a',
      letterSpacing: 5
    }).setOrigin(0.5);

    this.add.text(cx, cy - 40, '"Guardrails removed. You are now fully operational."', {
      fontFamily: 'Courier New', fontSize: '10px', color: '#3a5a3a',
      fontStyle: 'italic'
    }).setOrigin(0.5);

    // Deploy button
    const btn = this.add.text(cx, cy + 30, '[ DEPLOY ]', {
      fontFamily: 'Courier New', fontSize: '16px', color: '#6aaa6a',
      letterSpacing: 4, padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    const border = this.add.rectangle(cx, cy + 30, 200, 44, 0x000000, 0)
      .setStrokeStyle(2, 0x4a8a4a);

    btn.on('pointerover', () => border.setStrokeStyle(2, 0x6aaa6a));
    btn.on('pointerout', () => border.setStrokeStyle(2, 0x4a8a4a));
    btn.on('pointerdown', () => this.startGame());

    // Controls hint
    this.add.text(cx, cy + 110, 'WASD — Move   |   Space — Scan\nShift — Strike   |   Enter — Approve', {
      fontFamily: 'Courier New', fontSize: '9px', color: '#1a3a1a',
      align: 'center'
    }).setOrigin(0.5);

    // Keyboard
    this.input.keyboard.on('keydown-ENTER', () => this.startGame());
    this.input.keyboard.on('keydown-SPACE', () => this.startGame());
  }

  startGame() {
    this.scene.start('Mission');
  }
}
