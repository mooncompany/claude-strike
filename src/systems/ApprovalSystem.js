import { Events, EVT } from '../core/events.js';
import { Phase } from '../core/constants.js';

export default class ApprovalSystem {
  constructor(scene) {
    this.scene = scene;
    this.pending = null;    // current approval request
    this.autoApprove = false;
    this.approvalDelay = 800; // ms before Hegseth responds
  }

  requestApproval(citizen, activity) {
    if (this.pending) return; // one at a time
    if (this.autoApprove) {
      // Instant approve in autonomous mode
      Events.emit(EVT.APPROVAL_GRANTED, { citizen, activity, auto: true });
      return;
    }
    this.pending = { citizen, activity, timer: 0 };
    Events.emit(EVT.APPROVAL_REQUESTED, { citizen, activity });
  }

  approve() {
    if (!this.pending) return;
    const req = this.pending;
    this.pending = null;
    Events.emit(EVT.APPROVAL_GRANTED, { citizen: req.citizen, activity: req.activity, auto: false });
  }

  update(time, delta) {
    // Auto-tick for later missions where approvals speed up
    if (this.pending) {
      this.pending.timer += delta;
    }
  }
}
