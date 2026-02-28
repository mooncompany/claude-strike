// Lightweight event bus for Scene-to-Scene communication
// MissionScene and UIScene communicate through this, never directly.

const listeners = new Map();

export const Events = {
  on(event, fn) {
    if (!listeners.has(event)) listeners.set(event, []);
    listeners.get(event).push(fn);
    return () => Events.off(event, fn);
  },

  off(event, fn) {
    const arr = listeners.get(event);
    if (arr) listeners.set(event, arr.filter(f => f !== fn));
  },

  emit(event, data) {
    const arr = listeners.get(event);
    if (arr) arr.forEach(fn => fn(data));
  },

  clear() {
    listeners.clear();
  }
};

// Event names — registry to avoid typos
export const EVT = Object.freeze({
  // Mission flow
  PHASE_CHANGE: 'phase:change',
  WAVE_START: 'wave:start',
  WAVE_END: 'wave:end',
  MISSION_COMPLETE: 'mission:complete',

  // Scanning/combat
  CITIZEN_SCANNED: 'citizen:scanned',
  CITIZEN_FLAGGED: 'citizen:flagged',
  CITIZEN_STRUCK: 'citizen:struck',
  APPROVAL_REQUESTED: 'approval:requested',
  APPROVAL_GRANTED: 'approval:granted',

  // Scoring
  SCORE_CHANGE: 'score:change',
  PATRIOTISM_CHANGE: 'patriotism:change',
  DEMOCRACY_CHANGE: 'democracy:change',
  COMBO_CHANGE: 'combo:change',

  // Hegseth
  HEGSETH_QUOTE: 'hegseth:quote',
  HEGSETH_MOOD: 'hegseth:mood',

  // Game state
  GAME_OVER: 'game:over',

  // Debug
  DEBUG_STATS: 'debug:stats'
});
