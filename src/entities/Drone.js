import { GAME_WIDTH, GAME_HEIGHT } from '../core/constants.js';

export default class Drone extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    // Use generated texture (no sprite sheet yet)
    super(scene, x, y, '__drone');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.body.setSize(24, 24);
    this.setDepth(100);
    this.scanRange = 200;
    this.strikeMode = false;
    this.scanning = false;
    this.scanTimer = 0;
  }

  static generateTexture(scene) {
    const g = scene.add.graphics();
    // Drone triangle shape
    g.fillStyle(0x3a3a4a, 1);
    g.fillTriangle(16, 2, 30, 28, 2, 28);
    // Red center dot
    g.fillStyle(0xd4644a, 1);
    g.fillCircle(16, 18, 4);
    g.generateTexture('__drone', 32, 32);
    g.destroy();
  }

  handleInput(cursors, wasd, pointer, touchData) {
    const speed = this.scene.registry.get('droneSpeed') || 300;
    let vx = 0, vy = 0;

    if (cursors.left.isDown || wasd.A.isDown) vx = -speed;
    else if (cursors.right.isDown || wasd.D.isDown) vx = speed;
    if (cursors.up.isDown || wasd.W.isDown) vy = -speed;
    else if (cursors.down.isDown || wasd.S.isDown) vy = speed;

    // Touch
    if (touchData && touchData.active) {
      vx = touchData.dx * speed * 0.02;
      vy = touchData.dy * speed * 0.02;
    }

    this.setVelocity(vx, vy);
  }
}
