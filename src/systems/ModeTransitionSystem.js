import { Events, EVT } from '../core/events.js';
import { Phase } from '../core/constants.js';

export default class ModeTransitionSystem {
  constructor(scene) {
    this.scene = scene;
    this.currentPhase = Phase.MISSION_BRIEF;
  }

  setPhase(phase) {
    this.currentPhase = phase;
    Events.emit(EVT.PHASE_CHANGE, { phase });
    this.scene.registry.set('phase', phase);
  }

  triggerIncident() {
    this.setPhase(Phase.INCIDENT_TRIGGER);
    // After cutscene plays, transition to autonomous
    // (CutsceneScene will call transitionToAutonomous when done)
  }

  transitionToAutonomous() {
    this.setPhase(Phase.AUTONOMOUS_MODE);
  }

  isApprovalRequired() {
    return this.currentPhase === Phase.APPROVAL_MODE;
  }

  isAutonomous() {
    return this.currentPhase === Phase.AUTONOMOUS_MODE;
  }
}
