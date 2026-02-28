// Runtime config — loads tuning.json and exposes it
import tuning from '../content/tuning.json' with { type: 'json' };

export const Config = { ...tuning };
