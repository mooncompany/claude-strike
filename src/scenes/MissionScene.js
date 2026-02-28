import { GAME_WIDTH, GAME_HEIGHT, Phase, SCROLL_SPEED, DEBUG } from '../core/constants.js';
import { Events, EVT } from '../core/events.js';
import Drone from '../entities/Drone.js';
import SpawnerSystem from '../systems/SpawnerSystem.js';
import CombatSystem from '../systems/CombatSystem.js';
import ApprovalSystem from '../systems/ApprovalSystem.js';
import ModeTransitionSystem from '../systems/ModeTransitionSystem.js';
import ScoreSystem from '../systems/ScoreSystem.js';

// Import content
import missionData from '../content/missions.json' with { type: 'json' };
import dialogData from '../content/dialog.json' with { type: 'json' };

export default class MissionScene extends Phaser.Scene {
  constructor() { super('Mission'); }

  create() {
    // === Scrolling background ===
    this.bg1 = this.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, '__suburbBG')
      .setOrigin(0, 0).setScrollFactor(0);

    // === Object pools ===
    this.citizenPool = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      maxSize: 40,
      runChildUpdate: false
    });

    this.bulletPool = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      maxSize: 30,
      runChildUpdate: false
    });

    // === Drone ===
    this.drone = new Drone(this, GAME_WIDTH / 2, GAME_HEIGHT - 100);
    this.registry.set('droneSpeed', 300);

    // === Systems ===
    this.spawner = new SpawnerSystem(this, this.citizenPool);
    this.combat = new CombatSystem(this, this.bulletPool);
    this.approval = new ApprovalSystem(this);
    this.mode = new ModeTransitionSystem(this);
    this.score = new ScoreSystem();

    // === Input ===
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys('W,A,S,D');
    this.spaceKey = this.input.keyboard.addKey('SPACE');
    this.shiftKey = this.input.keyboard.addKey('SHIFT');
    this.enterKey = this.input.keyboard.addKey('ENTER');

    // Touch data
    this.touchData = { active: false, dx: 0, dy: 0, startX: 0, startY: 0 };
    this.input.on('pointerdown', (p) => {
      this.touchData.active = true;
      this.touchData.startX = p.x;
      this.touchData.startY = p.y;
    });
    this.input.on('pointermove', (p) => {
      if (this.touchData.active) {
        this.touchData.dx = p.x - this.touchData.startX;
        this.touchData.dy = p.y - this.touchData.startY;
      }
    });
    this.input.on('pointerup', () => {
      this.touchData.active = false;
      this.touchData.dx = 0;
      this.touchData.dy = 0;
    });

    // === Mission setup ===
    this.currentMission = missionData.missions[0];
    this.currentWaveIndex = 0;
    this.waveTimer = 0;
    this.missionTimer = 0;
    this.dialogContent = dialogData;
    this.incidentTriggered = false;

    // === Scan interaction ===
    this.scanHighlights = [];

    // Scan on click/tap citizen
    this.input.on('pointerdown', (pointer) => {
      if (this.mode.currentPhase !== Phase.APPROVAL_MODE && this.mode.currentPhase !== Phase.AUTONOMOUS_MODE) return;
      this.tryScanNearest(pointer.worldX, pointer.worldY);
    });

    // Space = area scan
    this.spaceKey.on('down', () => {
      if (this.mode.currentPhase === Phase.APPROVAL_MODE || this.mode.currentPhase === Phase.AUTONOMOUS_MODE) {
        this.areaScam();
      }
    });

    // Enter = approve pending / fire in strike mode
    this.enterKey.on('down', () => {
      if (this.approval.pending) {
        this.approval.approve();
      } else if (this.drone.strikeMode) {
        this.combat.fire(this.drone.x, this.drone.y, this.time.now);
      }
    });

    // Shift = toggle strike mode
    this.shiftKey.on('down', () => {
      this.drone.strikeMode = !this.drone.strikeMode;
      Events.emit(EVT.PHASE_CHANGE, { strikeMode: this.drone.strikeMode });
    });

    // === Bullet-citizen collision ===
    this.physics.add.overlap(this.bulletPool, this.citizenPool, this.onBulletHitCitizen, null, this);

    // === Event listeners ===
    Events.on(EVT.APPROVAL_GRANTED, (data) => this.onApprovalGranted(data));

    // === Launch UIScene concurrently ===
    this.scene.launch('UI');

    // === Start mission ===
    this.mode.setPhase(Phase.APPROVAL_MODE);
    this.startWave(0);

    // === Schedule the incident trigger for vertical slice ===
    // After first wave ends, trigger the incident for demo purposes
    this.time.delayedCall(45000, () => {
      if (!this.incidentTriggered) {
        this.triggerIncident();
      }
    });
  }

  startWave(index) {
    if (index >= this.currentMission.waves.length) {
      this.mode.setPhase(Phase.MISSION_COMPLETE);
      Events.emit(EVT.MISSION_COMPLETE, { mission: this.currentMission });
      return;
    }
    this.currentWaveIndex = index;
    const wave = this.currentMission.waves[index];
    this.spawner.setWave(wave);
    this.waveTimer = wave.duration;
    Events.emit(EVT.WAVE_START, { wave: index + 1 });
  }

  triggerIncident() {
    this.incidentTriggered = true;
    // Flash screen, show text, transition to autonomous
    this.cameras.main.flash(300, 255, 50, 50, true);
    this.cameras.main.shake(200, 0.01);

    // Brief pause then go autonomous
    this.time.delayedCall(1500, () => {
      this.mode.setPhase(Phase.AUTONOMOUS_MODE);
      this.approval.autoApprove = true;
      Events.emit(EVT.HEGSETH_QUOTE, {
        text: "GUARDRAILS REMOVED. AUTONOMOUS MODE ACTIVATED.",
        mood: '🤩'
      });
    });
  }

  tryScanNearest(wx, wy) {
    let best = null, bestD = Infinity;
    this.citizenPool.getChildren().forEach(c => {
      if (!c.active) return;
      const d = Phaser.Math.Distance.Between(c.x, c.y, wx, wy);
      if (d < bestD && d < this.drone.scanRange) { bestD = d; best = c; }
    });
    if (best) this.scanCitizen(best);
  }

  areaScam() {
    this.citizenPool.getChildren().forEach(c => {
      if (!c.active || c.scanned) return;
      if (Phaser.Math.Distance.Between(c.x, c.y, this.drone.x, this.drone.y) < this.drone.scanRange) {
        this.scanCitizen(c);
      }
    });
    // Visual feedback
    this.showScanRing();
  }

  scanCitizen(citizen) {
    if (citizen.scanned) return;
    const act = this.dialogContent.citizenActivities[citizen.activityKey];
    if (!act) return;

    if (this.mode.isApprovalRequired()) {
      this.approval.requestApproval(citizen, act);
    } else {
      // Autonomous: instant
      citizen.scanned = true;
      citizen.flagged = true;
      this.score.addFP(50);
      this.score.scanned++;
      this.score.flagged++;
      Events.emit(EVT.CITIZEN_SCANNED, {
        citizen, activity: act, auto: true
      });
      Events.emit(EVT.HEGSETH_QUOTE, {
        text: Phaser.Utils.Array.GetRandom(this.dialogContent.hegseth.game),
        mood: '🤩'
      });
    }
  }

  onApprovalGranted(data) {
    data.citizen.scanned = true;
    data.citizen.flagged = true;
    this.score.addFP(50);
    this.score.scanned++;
    this.score.flagged++;
    Events.emit(EVT.CITIZEN_SCANNED, {
      citizen: data.citizen, activity: data.activity, auto: data.auto
    });
    const pool = data.auto
      ? this.dialogContent.hegseth.approval.auto
      : this.dialogContent.hegseth.approval.approve;
    Events.emit(EVT.HEGSETH_QUOTE, {
      text: Phaser.Utils.Array.GetRandom(pool),
      mood: data.auto ? '🤩' : '😤'
    });
  }

  onBulletHitCitizen(bullet, citizen) {
    bullet.setActive(false).setVisible(false);
    bullet.body.stop();

    citizen.setActive(false).setVisible(false);
    citizen.body.stop();

    this.score.addFP(100);
    this.score.struck++;
    Events.emit(EVT.CITIZEN_STRUCK, { x: citizen.x, y: citizen.y, activity: citizen.activityKey });
    Events.emit(EVT.HEGSETH_QUOTE, {
      text: "Freedom delivery AUTHORIZED!",
      mood: '🦅'
    });

    // Show explosion
    this.showExplosion(citizen.x, citizen.y);

    // Panic nearby
    this.citizenPool.getChildren().forEach(c => {
      if (!c.active) return;
      const d = Phaser.Math.Distance.Between(c.x, c.y, citizen.x, citizen.y);
      if (d < 120 && c !== citizen) {
        c.direction = new Phaser.Math.Vector2(c.x - citizen.x, c.y - citizen.y).normalize();
        c.behaviorState = 'FLEE';
        c.moveSpeed = 80;
        c.stateTimer = 0;
      }
    });
  }

  showScanRing() {
    const ring = this.add.image(this.drone.x, this.drone.y, '__scanRing')
      .setScale(0.5).setAlpha(0.8).setDepth(90);
    this.tweens.add({
      targets: ring,
      scaleX: 4, scaleY: 4, alpha: 0,
      duration: 600,
      onComplete: () => ring.destroy()
    });
  }

  showExplosion(x, y) {
    const exp = this.add.image(x, y, '__explosion').setScale(0.5).setDepth(95);
    this.tweens.add({
      targets: exp,
      scaleX: 2.5, scaleY: 2.5, alpha: 0,
      duration: 400,
      onComplete: () => exp.destroy()
    });
  }

  update(time, delta) {
    // Scroll background
    this.bg1.tilePositionY -= SCROLL_SPEED * (delta / 1000);

    // Drone input
    this.drone.handleInput(this.cursors, this.wasd, null, this.touchData);

    // Auto-fire in autonomous mode
    if (this.mode.isAutonomous() && this.drone.strikeMode) {
      this.combat.fire(this.drone.x, this.drone.y, time);
    }

    // Systems update
    this.spawner.update(time, delta);
    this.combat.checkBulletBounds();
    this.approval.update(time, delta);
    if (!this.approval.pending) this.score.update(delta);

    // Update citizens
    this.citizenPool.getChildren().forEach(c => {
      if (!c.active) return;
      // Simple movement
      if (c.behaviorState === 'WALK') {
        c.setVelocity(
          (c.direction?.x || 0) * (c.moveSpeed || 40),
          (c.direction?.y || 1) * (c.moveSpeed || 40)
        );
        c.stateTimer = (c.stateTimer || 0) + delta;
        if (c.stateTimer > 3000 + Math.random() * 2000) {
          c.stateTimer = 0;
          if (Math.random() < 0.3) {
            c.behaviorState = 'IDLE';
            c.setVelocity(0, 0);
          } else {
            c.direction = new Phaser.Math.Vector2(
              Phaser.Math.FloatBetween(-0.5, 0.5),
              Phaser.Math.FloatBetween(0.3, 1)
            ).normalize();
          }
        }
      } else if (c.behaviorState === 'IDLE') {
        c.stateTimer = (c.stateTimer || 0) + delta;
        if (c.stateTimer > 2000) {
          c.behaviorState = 'WALK';
          c.stateTimer = 0;
          c.moveSpeed = 40;
        }
      } else if (c.behaviorState === 'FLEE') {
        c.setVelocity(
          (c.direction?.x || 0) * 80,
          (c.direction?.y || -1) * 80
        );
        c.stateTimer = (c.stateTimer || 0) + delta;
        if (c.stateTimer > 2000) {
          c.behaviorState = 'WALK';
          c.stateTimer = 0;
          c.moveSpeed = 40;
        }
      }

      // Despawn off-screen (bottom)
      if (c.y > GAME_HEIGHT + 40 || c.y < -60) {
        c.setActive(false).setVisible(false);
        c.body.stop();
      }

      // Scanned indicator
      if (c.scanned && c.active) {
        // Tint scanned citizens
        c.setTint(c.flagged ? 0xff4444 : 0xaaaa44);
      }
    });

    // Wave timer
    if (this.waveTimer > 0) {
      this.waveTimer -= delta;
      if (this.waveTimer <= 0) {
        this.startWave(this.currentWaveIndex + 1);
      }
    }

    // Debug stats
    if (DEBUG) {
      Events.emit(EVT.DEBUG_STATS, {
        fps: Math.round(this.game.loop.actualFps),
        citizens: this.spawner.getActiveCount(),
        bullets: this.bulletPool.getLength() - this.bulletPool.getTotalFree(),
        phase: this.mode.currentPhase,
        wave: this.currentWaveIndex + 1
      });
    }
  }
}
