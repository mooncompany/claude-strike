# Claude Strike: Domestic Freedom Edition

A 1942-style vertical scrolling shooter. Satire about AI guardrails, surveillance, and what happens when oversight is removed.

## Play

```bash
npx serve .
```

Open http://localhost:3000

## Controls

| Key | Action |
|-----|--------|
| WASD / Arrows | Move drone |
| Space | Area scan |
| Click/Tap | Scan citizen |
| Shift | Toggle strike mode |
| Enter | Approve / Fire |

## Architecture

```
src/
  core/      — constants, event bus, config, save
  scenes/    — Boot, Menu, Mission, UI, Cutscene, Debrief
  systems/   — Spawner, Combat, Approval, ModeTransition, Score, Audio
  entities/  — Drone, Citizen, Projectile, FX
  content/   — mission data, dialog, tuning (all JSON)
```

MissionScene + UIScene run concurrently, communicating via event bus. Never directly.

## Status

**Vertical slice** — Mission 1 fragment with approval → incident → autonomous transition.

---

*"This game is a work of satire protected by the First Amendment. For now."*
