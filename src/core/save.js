// Save/load — localStorage based
const SAVE_KEY = 'claude-strike-save';

export const Save = {
  get() {
    try {
      return JSON.parse(localStorage.getItem(SAVE_KEY)) || defaultSave();
    } catch { return defaultSave(); }
  },
  set(data) {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  },
  clear() {
    localStorage.removeItem(SAVE_KEY);
  }
};

function defaultSave() {
  return {
    highScore: 0,
    missionsCompleted: [],
    totalEliminations: 0,
    version: 1
  };
}
