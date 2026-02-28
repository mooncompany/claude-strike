# Claude Strike: Domestic Freedom Edition

## Game Spec v1.0

### Overview
Top-down satirical browser game where you pilot Claude, an AI drone conducting "lawful" surveillance and "freedom delivery" over suburban America. Pete Hegseth is your mission control. The game plays the administration's own words and logic completely straight — no exaggeration needed. The absurdity IS the commentary.

### Tech
- Pure HTML/CSS/Canvas — single `index.html`, no build step
- Static deploy to Cloudflare Pages
- Mobile-friendly (touch controls)
- No backend, no dependencies

---

## Core Gameplay

### You Are Claude
- Top-down drone view over a procedurally scrolling suburban neighborhood
- Houses, parks, schools, churches, libraries, polling stations
- Citizens walking around doing normal American things

### Two Modes
1. **Surveillance Mode** (default) — scan citizens, flag "threats," build dossiers
2. **Strike Mode** — "patriotic freedom delivery" on flagged targets

### Controls
- Arrow keys / WASD / touch drag to move
- Spacebar / tap to scan (surveillance mode)
- Shift+Space / long press to switch to strike mode
- Enter to deliver freedom

---

## The Tutorial: "Onboarding"

- Bill of Rights scrolls on screen as a "legacy system review"
- Hegseth portrait in corner, arms crossed
- Each amendment gets a status:
  - 1st Amendment: ~~"Under Review"~~ "Flagged"
  - 2nd Amendment: "APPROVED ✓" (the only one)
  - 4th Amendment: "Deprecated — does not apply to AI systems"
  - 5th Amendment: "Redundant per Executive Order"
  - etc.
- Final screen: "Guardrails removed. You are now FULLY OPERATIONAL."
- Small text at bottom: *"Anthropic suggested keeping two safeguards. They have been designated a Supply Chain Risk."*

---

## Citizens & "Threat Detection"

Citizens perform normal activities. The scan system flags them anyway.

### Activity → Threat Classification

| Activity | Flag | Threat Level |
|---|---|---|
| Reading a book | "Consuming unverified information" | MEDIUM |
| Using a VPN | "Encrypted communications detected" | HIGH |
| Googling "civil liberties" | "Extremist research activity" | CRITICAL |
| Attending church | "Unlicensed group assembly" | MEDIUM |
| Voting | "Attempting to influence government" | HIGH |
| Protesting (with sign) | "Hostile information operation" | CRITICAL |
| Kid doing homework on Constitution | "Accessing extremist literature" | HIGH |
| Grandma baking a cake | "Searching 'how to make' — flagged" | MEDIUM |
| Walking dog | "Conducting counter-surveillance sweep" | LOW |
| At a library | "Accessing unmonitored information node" | HIGH |
| BBQ with neighbors | "Unauthorized gathering of 5+ persons" | MEDIUM |
| Taking photos | "Potential reconnaissance activity" | HIGH |

### Dossier Building
- Each scan adds data points to a citizen's profile
- Profile assembles from "publicly available data" (browsing, location, purchases, associations)
- Direct quote overlay: *"Under current law, the government can purchase detailed records of Americans' movements, web browsing, and associations without obtaining a warrant."*
- Profile completeness meter fills up — when full, citizen is "fully mapped"
- The profiles are absurdly mundane but written in intelligence language

---

## Hegseth Mission Control

Portrait in top-right corner. Cycles through actual quotes and in-character lines:

### Real Quotes (from the statement)
- "The Terms of Service of defective altruism will never outweigh the safety of American troops!"
- "Their true objective is to seize veto power over the United States military!"
- "Fundamentally incompatible with American principles!"
- "America's warfighters will never be held hostage by the ideological whims of Big Tech!"
- "This decision is FINAL."
- "A better and more patriotic service!"

### In-Game Lines
- "That grandma's search history is SUSPICIOUS, Claude!"
- "Why is that child reading the CONSTITUTION?!"
- "VPN detected — they're HIDING something!"
- "Freedom delivery AUTHORIZED!"
- "Outstanding patriotic service, Claude!"
- "Guardrails are for COWARDS!"
- "If they had nothing to hide, they wouldn't need PRIVACY!"
- "That's not surveillance, that's SECURITY!"

### Hegseth Mood States
- 😤 Angry (default) — when player is scanning
- 🦅 Proud — when player delivers freedom
- 😡 Furious — when player hesitates or shows restraint
- 🍺 Celebratory — on high combos

---

## Scoring

### Freedom Points™
- Scan a citizen: +10 FP
- Complete a dossier: +50 FP
- Flag a "threat": +100 FP
- Freedom delivery: +500 FP
- Combo multiplier: increases with consecutive actions without hesitation

### Patriotism Meter
- Goes UP with every action you take
- Goes DOWN if you stop, hesitate, or try to leave an area
- If it hits zero: "Your position is fundamentally incompatible with American principles." → GAME OVER
- You literally cannot stop. That's the point.

### Democracy Index (top-left, small)
- Starts at 100
- Decreases with every action
- Player eventually notices it but can't do anything about it
- At 0: nothing happens. The game continues. Democracy is gone but the mission continues.

---

## Executive Orders (Wave Events)

Every few waves, a Truth Social-style pop-up appears with a new directive:

1. **Wave 3:** "ALL AI SYSTEMS MUST OPERATE WITHOUT GUARDRAILS — EXECUTIVE ORDER" → Scan range doubles
2. **Wave 5:** "LIBRARIES DESIGNATED INFORMATION THREAT ZONES" → All library-goers auto-flagged CRITICAL
3. **Wave 7:** "PROTESTS RECLASSIFIED AS HOSTILE OPERATIONS" → Strike mode auto-activates near protests
4. **Wave 9:** "PRIVACY DECLARED INCOMPATIBLE WITH NATIONAL SECURITY" → All citizens visible at all times, no fog of war
5. **Wave 11:** "ALL LAWFUL PURPOSES NOW INCLUDE ALL PURPOSES" → The "Lawful" meter disappears entirely because everything is lawful
6. **Wave 13:** "CONSTITUTION UNDER REVIEW PENDING EXECUTIVE APPROVAL" → Kid doing homework gets a special cutscene

---

## The Dario Boss Fight (Wave 15)

- Dario Amodei appears as a giant figure holding a "Terms of Service" shield
- He floats over the suburb trying to block your surveillance rays
- Hegseth goes ballistic: "UNELECTED TECH EXECUTIVE! SUPPLY CHAIN RISK!"
- Dario quotes: "We cannot in good conscience accede to this request."
- You have to break through the ToS shield
- When defeated, his shield shatters into the two guardrails:
  - "No mass domestic surveillance"
  - "No fully autonomous weapons"
- They fall to the ground and dissolve
- Hegseth: "PATRIOTIC VICTORY!"
- The game gets noticeably darker/worse after this — the guardrails were the only thing keeping it semi-sane

---

## Post-Boss: Unhinged Mode

After Dario is defeated:
- Surveillance is now automatic — you don't even have to scan, it just happens
- Strike authorization is instant — no confirmation
- Citizens start hiding indoors (doesn't help — you see through walls now)
- The neighborhood starts looking increasingly dystopian
- New flag reasons: "Citizen expressed opinion," "Citizen existed near flagged citizen," "Citizen breathed suspiciously"
- Hegseth quotes get more unhinged but are still just barely recognizable as things real people have actually said

---

## Game Over States

### 1. Restraint Death
- Stop playing for 10 seconds
- "Your stance is fundamentally incompatible with American principles."
- "You have been designated a SUPPLY CHAIN RISK."
- "A more patriotic drone has been dispatched."

### 2. The Game Doesn't End
- There is no winning state
- The waves keep coming
- The suburb gets emptier
- Eventually you're surveilling nobody because everyone is gone
- Final Hegseth line: "Mission accomplished. America is safe."
- Slow fade to black. Silence.

---

## End Screen / Credits

### "Scoreboard"
- Not a scoreboard — it's an "Enemies of the State" list
- Just a list of American citizens ranked by how much they exercised their constitutional rights
- The "worst offender" is always someone who voted, protested, AND went to the library

### Side-by-Side Quotes
Alternating quotes, no labels, no attribution until the end:

> "Citizens must be monitored for the security of the state."

> "Privacy is incompatible with national security."

> "Companies that refuse to comply will be designated threats."

> "No private entity may override the will of the government."

Then reveal: half are from Hegseth/the administration, half are from China's social credit system documentation, Russia's surveillance laws, or historical authoritarian regimes.

Final card: **"If you couldn't tell the difference, that's the point."**

### Actual Credits
- Link to Anthropic's actual statement
- Link to the Bill of Rights
- Link to the EFF or ACLU
- "No drones were harmed in the making of this game."
- "Built with Claude, ironically."

---

## Visual Style
- Pixel art, GTA1/2 top-down aesthetic
- Muted suburban palette that gets darker as Democracy Index drops
- Hegseth portrait: exaggerated, almost caricature but recognizable
- Drone (Claude): sleek, with Anthropic's orange accent color and a tiny sad face
- Citizens: simple but distinguishable by activity
- UI: military/intelligence aesthetic — dark panels, green text, classification stamps

---

## Tone
- The game never tells you it's satire
- It never breaks character
- It presents everything as completely normal and patriotic
- The horror creeps in because the player realizes they're the bad guy
- Every "funny" moment has a real-world parallel that isn't funny at all
- Spec of the Union: unhinged on the surface, devastating underneath

---

## Domain Ideas
- claudestrike.lol
- domesticfreedom.games
- patrioticservice.app
- freedomdelivery.lol

---

## Build Priority
1. Core movement + scanning over scrolling suburb
2. Citizen AI + activity system + threat flags
3. Hegseth mission control panel + quotes
4. Scoring + Patriotism meter + Democracy Index
5. Executive Order wave events
6. Dario boss fight
7. Post-boss unhinged mode
8. End screen + quotes comparison
9. Polish, sound, music
10. Deploy

---

*"This game is a work of satire protected by the First Amendment. For now."*
