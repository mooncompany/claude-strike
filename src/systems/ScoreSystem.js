import { Events, EVT } from '../core/events.js';

export default class ScoreSystem {
  constructor() {
    this.fp = 0;
    this.patriotism = 100;
    this.democracy = 100;
    this.combo = 0;
    this.comboTimer = 0;
    this.lastAction = Date.now();
    this.scanned = 0;
    this.flagged = 0;
    this.struck = 0;
  }

  addFP(amount) {
    const mult = 1 + Math.floor(this.combo / 5) * 0.5;
    const gained = Math.floor(amount * mult);
    this.fp += gained;
    this.combo++;
    this.comboTimer = 3000;
    this.patriotism = Math.min(100, this.patriotism + 0.5);
    this.democracy = Math.max(0, this.democracy - 0.15 * (amount / 10));
    this.lastAction = Date.now();

    Events.emit(EVT.SCORE_CHANGE, { fp: this.fp, gained });
    Events.emit(EVT.PATRIOTISM_CHANGE, { value: this.patriotism });
    Events.emit(EVT.DEMOCRACY_CHANGE, { value: this.democracy });
    if (this.combo > 1) Events.emit(EVT.COMBO_CHANGE, { combo: this.combo });
  }

  update(delta) {
    // Combo decay
    if (this.comboTimer > 0) {
      this.comboTimer -= delta;
      if (this.comboTimer <= 0) { this.combo = 0; Events.emit(EVT.COMBO_CHANGE, { combo: 0 }); }
    }

    // Patriotism decay
    const idle = Date.now() - this.lastAction;
    if (idle > 4000) {
      this.patriotism = Math.max(0, this.patriotism - 0.015);
      Events.emit(EVT.PATRIOTISM_CHANGE, { value: this.patriotism });
      if (this.patriotism <= 0) Events.emit(EVT.GAME_OVER, { reason: 'patriotism' });
    }
  }
}
