import { Events, EVT } from '../core/events.js';

export default class SpawnerSystem {
  constructor(scene, citizenPool) {
    this.scene = scene;
    this.citizenPool = citizenPool;
    this.spawnTimer = 0;
    this.spawnInterval = 2500;
    this.waveData = null;
    this.maxActive = 30;
  }

  setWave(waveData) {
    this.waveData = waveData;
    this.spawnInterval = waveData.spawnRate || 2500;
    this.maxActive = waveData.maxCitizens || 12;
  }

  update(time, delta) {
    if (!this.waveData) return;
    this.spawnTimer += delta;
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnTimer = 0;
      this.spawnCitizen();
    }
  }

  spawnCitizen() {
    const active = this.citizenPool.getLength() - this.citizenPool.getTotalFree();
    if (active >= this.maxActive) return;

    const types = this.waveData.citizenTypes;
    const type = types[Math.floor(Math.random() * types.length)];
    const x = Phaser.Math.Between(40, 440);
    const y = -20;

    const citizen = this.citizenPool.get(x, y, '__citizen');
    if (citizen) {
      citizen.setActive(true).setVisible(true);
      citizen.body.reset(x, y);
      citizen.activityKey = type;
      citizen.scanned = false;
      citizen.flagged = false;
      citizen.behaviorState = 'WALK';
      citizen.direction = new Phaser.Math.Vector2(
        Phaser.Math.FloatBetween(-0.5, 0.5), 1
      ).normalize();
      citizen.moveSpeed = 40;
      citizen.stateTimer = 0;
    }
  }

  getActiveCount() {
    return this.citizenPool.getLength() - this.citizenPool.getTotalFree();
  }
}
