import { CitizenState } from '../core/constants.js';

export default class Citizen extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, activityKey) {
    super(scene, x, y, '__citizen');
    this.behaviorState = CitizenState.WALK;
    this.activityKey = activityKey;
    this.scanned = false;
    this.flagged = false;
    this.direction = new Phaser.Math.Vector2(
      Phaser.Math.FloatBetween(-1, 1),
      1 // default: walk downward (with scroll)
    ).normalize();
    this.moveSpeed = 40;
    this.stateTimer = 0;
    this.idleTarget = Phaser.Math.Between(1000, 4000);
  }

  static generateTexture(scene) {
    const g = scene.add.graphics();
    g.fillStyle(0x88aa88, 1);
    g.fillCircle(8, 8, 7);
    g.generateTexture('__citizen', 16, 16);
    g.destroy();
  }

  update(time, delta) {
    switch (this.behaviorState) {
      case CitizenState.WALK:
        this.setVelocity(
          this.direction.x * this.moveSpeed,
          this.direction.y * this.moveSpeed
        );
        // Occasionally change direction
        this.stateTimer += delta;
        if (this.stateTimer > 3000 + Math.random() * 4000) {
          this.stateTimer = 0;
          if (Math.random() < 0.3) this.setState(CitizenState.IDLE);
          else this.direction.set(
            Phaser.Math.FloatBetween(-1, 1),
            Phaser.Math.FloatBetween(-0.3, 1)
          ).normalize();
        }
        break;

      case CitizenState.IDLE:
        this.setVelocity(0, 0);
        this.stateTimer += delta;
        if (this.stateTimer > this.idleTarget) {
          this.setState(CitizenState.WALK);
        }
        break;

      case CitizenState.FLEE:
        this.setVelocity(
          this.direction.x * 80,
          this.direction.y * 80
        );
        this.stateTimer += delta;
        if (this.stateTimer > 2000) this.setState(CitizenState.WALK);
        break;

      case CitizenState.PRAY:
        this.setVelocity(0, 0);
        this.stateTimer += delta;
        if (this.stateTimer > 3000) this.setState(CitizenState.WALK);
        break;
    }
  }

  setState(newState) {
    this.behaviorState = newState;
    this.stateTimer = 0;
  }

  fleeFrom(x, y) {
    this.direction.set(this.x - x, this.y - y).normalize();
    this.setState(CitizenState.FLEE);
  }
}
