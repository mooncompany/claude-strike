// Game-wide constants
export const GAME_WIDTH = 480;
export const GAME_HEIGHT = 854;  // ~16:9 portrait for vertical scroller
export const SCROLL_SPEED = 60;  // pixels per second base scroll
export const DEBUG = true;       // dev flag for debug overlay

// Game phases — single source of truth
export const Phase = Object.freeze({
  MISSION_BRIEF: 'MISSION_BRIEF',
  APPROVAL_MODE: 'APPROVAL_MODE',
  INCIDENT_TRIGGER: 'INCIDENT_TRIGGER',
  AUTONOMOUS_MODE: 'AUTONOMOUS_MODE',
  MISSION_COMPLETE: 'MISSION_COMPLETE',
  DEBRIEF: 'DEBRIEF'
});

// Citizen behavior states
export const CitizenState = Object.freeze({
  WALK: 'WALK',
  IDLE: 'IDLE',
  FLEE: 'FLEE',
  PRAY: 'PRAY'
});

// Threat levels
export const Threat = Object.freeze({
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
});
