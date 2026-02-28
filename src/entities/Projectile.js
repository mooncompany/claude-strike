export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, '__bullet');
    this.damage = 1;
  }

  static generateTexture(scene) {
    const g = scene.add.graphics();
    g.fillStyle(0xffcc44, 1);
    g.fillRect(2, 0, 4, 8);
    g.generateTexture('__bullet', 8, 8);
    g.destroy();
  }

  fire(x, y, vx, vy) {
    this.body.reset(x, y);
    this.setActive(true).setVisible(true);
    this.setVelocity(vx, vy);
  }
}
