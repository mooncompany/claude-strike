import { Events, EVT } from '../core/events.js';

export default class CombatSystem {
  constructor(scene, bulletPool) {
    this.scene = scene;
    this.bulletPool = bulletPool;
    this.fireRate = 200;
    this.lastFire = 0;
  }

  fire(x, y, time) {
    if (time - this.lastFire < this.fireRate) return;
    this.lastFire = time;

    const bullet = this.bulletPool.get();
    if (bullet) {
      bullet.setActive(true).setVisible(true);
      bullet.body.reset(x, y - 16);
      bullet.setVelocity(0, -600);
    }
  }

  checkBulletBounds() {
    this.bulletPool.getChildren().forEach(b => {
      if (b.active && (b.y < -20 || b.y > 880)) {
        b.setActive(false).setVisible(false);
        b.body.stop();
      }
    });
  }
}
