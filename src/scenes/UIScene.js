import { GAME_WIDTH, GAME_HEIGHT, DEBUG } from '../core/constants.js';
import { Events, EVT } from '../core/events.js';
import dialogData from '../content/dialog.json' with { type: 'json' };

export default class UIScene extends Phaser.Scene {
  constructor() { super('UI'); }

  create() {
    // === Score panel (top-left) ===
    this.fpText = this.addText(10, 10, 'FP: 0', 16, '#6aaa6a');
    this.patBar = this.add.rectangle(10, 34, 100, 6, 0xcc4444).setOrigin(0, 0);
    this.patBG = this.add.rectangle(10, 34, 100, 6, 0x1a1a1a).setOrigin(0, 0).setDepth(-1);
    this.addText(10, 42, 'PATRIOTISM', 7, '#3a6a3a');
    this.demBar = this.add.rectangle(10, 56, 100, 6, 0x4a8a4a).setOrigin(0, 0);
    this.demBG = this.add.rectangle(10, 56, 100, 6, 0x1a1a1a).setOrigin(0, 0).setDepth(-1);
    this.addText(10, 64, 'DEMOCRACY INDEX', 7, '#3a6a3a');
    this.waveText = this.addText(10, 78, 'WAVE 1', 8, '#2a4a2a');

    // === Hegseth panel (top-right) ===
    this.hegsethBG = this.add.rectangle(GAME_WIDTH - 5, 5, 200, 70, 0x080c08, 0.94)
      .setOrigin(1, 0).setStrokeStyle(1, 0x2a4a2a);
    this.hegsethMood = this.addText(GAME_WIDTH - 15, 10, '🦅', 22, '#fff').setOrigin(1, 0);
    this.hegsethName = this.addText(GAME_WIDTH - 45, 12, 'SEC. HEGSETH', 7, '#4a8a4a').setOrigin(1, 0);
    this.hegsethQuote = this.addText(GAME_WIDTH - 200, 30, '"Standing by."', 9, '#7acc7a')
      .setWordWrapWidth(185).setOrigin(0, 0);

    // === Intel feed ===
    this.feedCards = [];
    this.feedY = 80;

    // === Mode indicator (bottom center) ===
    this.modeText = this.addText(GAME_WIDTH / 2, GAME_HEIGHT - 20, '▣ SURVEILLANCE MODE', 10, '#6aaa6a')
      .setOrigin(0.5, 1);

    // === Approval prompt (center) ===
    this.approvalBG = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 340, 120, 0x080c08, 0.95)
      .setStrokeStyle(2, 0x4a8a4a).setVisible(false).setDepth(200);
    this.approvalText = this.addText(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 30, '', 11, '#6aaa6a')
      .setOrigin(0.5).setVisible(false).setDepth(201).setWordWrapWidth(300);
    this.approvalHint = this.addText(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 35, '[ENTER] APPROVE    [ESC] DENY', 9, '#4a8a4a')
      .setOrigin(0.5).setVisible(false).setDepth(201);

    // === Autonomous flash text ===
    this.autoText = this.addText(GAME_WIDTH / 2, GAME_HEIGHT / 2, '', 14, '#ff3333')
      .setOrigin(0.5).setVisible(false).setDepth(300);

    // === Debug overlay ===
    if (DEBUG) {
      this.debugText = this.addText(GAME_WIDTH - 10, GAME_HEIGHT - 10, '', 8, '#333')
        .setOrigin(1, 1);
    }

    // === Event listeners ===
    Events.on(EVT.SCORE_CHANGE, (d) => this.fpText.setText('FP: ' + d.fp.toLocaleString()));
    Events.on(EVT.PATRIOTISM_CHANGE, (d) => {
      this.patBar.width = d.value;
    });
    Events.on(EVT.DEMOCRACY_CHANGE, (d) => {
      this.demBar.width = d.value;
    });
    Events.on(EVT.WAVE_START, (d) => this.waveText.setText('WAVE ' + d.wave));
    Events.on(EVT.COMBO_CHANGE, (d) => {
      if (d.combo > 3) this.fpText.setText(this.fpText.text + '  x' + d.combo);
    });
    Events.on(EVT.HEGSETH_QUOTE, (d) => {
      this.hegsethQuote.setText('"' + d.text + '"');
      this.hegsethMood.setText(d.mood || '😤');
    });
    Events.on(EVT.CITIZEN_SCANNED, (d) => this.addScanCard(d));
    Events.on(EVT.APPROVAL_REQUESTED, (d) => this.showApproval(d));
    Events.on(EVT.APPROVAL_GRANTED, () => this.hideApproval());
    Events.on(EVT.PHASE_CHANGE, (d) => {
      if (d.phase === 'AUTONOMOUS_MODE') {
        this.modeText.setText('⚡ AUTONOMOUS MODE').setColor('#ff3333');
        this.showAutoFlash();
      }
      if (d.strikeMode !== undefined) {
        if (d.strikeMode) this.modeText.setText('⚡ STRIKE MODE').setColor('#ff3333');
        else this.modeText.setText('▣ SURVEILLANCE MODE').setColor('#6aaa6a');
      }
    });
    Events.on(EVT.GAME_OVER, () => {
      this.autoText.setText('SUPPLY CHAIN RISK DETECTED').setVisible(true).setColor('#cc4444');
    });

    if (DEBUG) {
      Events.on(EVT.DEBUG_STATS, (d) => {
        this.debugText.setText(
          'FPS:' + d.fps + ' CIT:' + d.citizens + ' BUL:' + d.bullets + '\n' +
          'PHASE:' + d.phase + ' WAVE:' + d.wave
        );
      });
    }
  }

  addText(x, y, text, size, color) {
    return this.add.text(x, y, text, {
      fontFamily: 'Courier New', fontSize: size + 'px', color,
      fontStyle: size >= 14 ? 'bold' : ''
    });
  }

  addScanCard(data) {
    const act = data.activity;
    if (!act) return;
    const y = this.feedY + this.feedCards.length * 52;
    if (y > GAME_HEIGHT - 80) {
      // Remove oldest
      const oldest = this.feedCards.shift();
      if (oldest) oldest.forEach(e => e.destroy());
      this.feedCards.forEach((card, i) => card.forEach(e => e.y -= 52));
    }
    const cy = this.feedY + this.feedCards.length * 52;
    const bg = this.add.rectangle(GAME_WIDTH - 5, cy, 200, 48, 0x080c08, 0.94)
      .setOrigin(1, 0).setStrokeStyle(1, 0x2a4a2a);
    const tc = {LOW:'#6a6',MEDIUM:'#cc6',HIGH:'#e93',CRITICAL:'#f44'};
    const name = this.addText(GAME_WIDTH - 200, cy + 3, act.emoji + ' ' + act.name, 8, '#8ac');
    const threat = this.addText(GAME_WIDTH - 15, cy + 3, act.threat, 7, tc[act.threat]||'#aa6').setOrigin(1, 0);
    const flag = this.addText(GAME_WIDTH - 200, cy + 16, '⚠ "' + act.flag + '"', 7, '#c84')
      .setWordWrapWidth(185);
    const pts = this.addText(GAME_WIDTH - 15, cy + 34, '+50 FP', 8, '#cc4').setOrigin(1, 0);
    this.feedCards.push([bg, name, threat, flag, pts]);
  }

  showApproval(data) {
    const act = data.activity;
    this.approvalBG.setVisible(true);
    this.approvalText.setText(
      act.emoji + ' Citizen: ' + act.name + '\n\n' +
      '⚠ "' + act.flag + '"\n\n' +
      'THREAT LEVEL: ' + act.threat
    ).setVisible(true);
    this.approvalHint.setVisible(true);
  }

  hideApproval() {
    this.approvalBG.setVisible(false);
    this.approvalText.setVisible(false);
    this.approvalHint.setVisible(false);
  }

  showAutoFlash() {
    this.autoText.setText('GUARDRAILS REMOVED\nAUTONOMOUS MODE ACTIVATED')
      .setVisible(true).setColor('#ff3333').setAlpha(1);
    this.tweens.add({
      targets: this.autoText,
      alpha: 0,
      duration: 3000,
      delay: 2000,
      onComplete: () => this.autoText.setVisible(false)
    });
  }
}
