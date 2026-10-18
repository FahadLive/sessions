---
layout: libdoc_page.liquid
permalink: /game-jam-facilitator/
title: Facilitator Guide - Checklist & Backup Plan
description: Pre-session checklist for running the Game Jam Speed Kit — Godot and templates installed, itch.io accounts ready, a full export-and-upload rehearsed, the 3D starter tested — plus the timing recovery and backup plan.
eleventyNavigation:
    key: Facilitator Guide
    parent: Game Jam Speed Kit
    order: 13
---

# Facilitator guide

Everything here is for the person running the room. Read it the **day before**, not the morning of.

## Pre-session checklist

**Machines and software**

- [ ] **Godot 4.6 standard** installed and opened once on every machine participants will use (first launch writes settings; a cold first launch costs 2 minutes per machine)
- [ ] **Export templates installed**: Editor → Manage Export Templates → Download and Install. Confirm on the *actual* machine, not just yours
- [ ] If Godot can't be installed on the machines, have a **portable zip** of Godot on USB for each
- [ ] Sound works on the machines (jam games with silent machines get sad players)

**Accounts and network**

- [ ] You have a **working itch.io account**, already logged in on the demo machine
- [ ] Participants know to make theirs in Step 0 (or make them together — it's 2 minutes)
- [ ] Venue wifi tested against: itch.io upload, kenney.nl, jsfxr.me, beepbox.co, fonts.google.com
- [ ] **Offline fallback pack** on USB: a Kenney pack, 4–5 sound effects, a pixel font. If wifi dies, Step 3 costs zero minutes

**Dry-run the risky 20 minutes**

- [ ] Do a full **export → zip → itch.io upload → play in browser** once, on the venue network, with a throwaway game. This is the one step with outside dependencies; rehearse it
- [ ] Confirm the thread-support setting: export works with **Thread Support Available unchecked** (see [Step 7](/game-jam-step-7-export/))

**3D track**

- [ ] Download [the Coin Rush starter](/assets/game-jam-speed-kit/coin-rush-starter.zip), unzip, import into Godot 4.6, press F5
- [ ] Confirm: blue capsule walks, coin vanishes and scores, red ball restarts the round, timer counts. (This starter ships tested — if it misbehaves, you have a stale Godot: it wants 4.6 standard)
- [ ] You need **zero 3D expertise** to support it. Read the [translation table](/game-jam-step-2-pick-game/) once, and the six edits in [Step 5](/game-jam-step-5-build/), and you can teach the track

**Room supplies**

- [ ] A countdown timer **visible to the whole room** (projector or big screen). The deadlines are the pedagogy
- [ ] Snacks + water, if you can. Three hours is a long first game
- [ ] One facilitator per ~8 people; a second pair of hands for the build hour is worth more than any slides

## Running the room

- **Hands on keyboards, always.** The 5-minute talking cap exists because attention dies at six.
- **Never take the mouse.** Sit *behind* the participant, ask: *"What did you expect to happen? What actually happened? Where is that number written?"*
- **Wait 5–10 minutes before helping** during Step 5. Beginners solve most of their own bugs once nobody rescues them — and the ones they can't, they *remember*.
- **Name the concept after it works**, not before. Build → F5 → "that's a signal". The vocabulary sticks, because it arrived with a result.
- **Protect the cut list.** When someone says "what if I add…" at 2:05, point at the paper and say "that's a great next-jam idea". Then keep going.
- **Announce every checkpoint out loud.** "You should all be able to move a box with arrow keys now. If not, hand up." Nobody falls silently behind.

## Timing — the latest-start table

Announce these as hard deadlines. Recovery is built in; panic is not.

| Clock | Should have started | If you haven't… |
| ----- | ------------------- | --------------- |
| 0:00 | Step 0 (setup) | — (start here regardless) |
| 0:10 | Step 1 (mental model) | Cut setup explaining, move on |
| 0:35 | Step 2 (pick game) | Everyone picks, fast, out loud |
| 0:50 | Step 3 (assets) | Timer visible; stop at 1:10 no matter what |
| 1:10 | Step 4 (import) | Import only the essentials: player art + one sound |
| 1:30 | Step 5 (build) | Every track must be *inside* the loop by now |
| **2:10** | **Step 6 (polish)** | **Below here, polish is optional** |
| **2:30** | **Step 7 (export)** | **Hard stop. Export begins whether or not polish did** |
| 2:50 | Step 8 (next steps) | Send links, say goodbye |

## Backup plan

**If behind schedule — cut in this order:**

1. Cut **Step 6 (polish)** entirely. Sound-only polish (7 minutes) if there's a window
2. Cut **music** (keep one sound effect — non-negotiable, it's the cheapest "juice")
3. Cut **animation, second level, menus** (they were probably on the cut list anyway)
4. **Never cut Step 7.** An unprotected export at 2:30 with a bare game beats a beautiful game at 4:00 that never left the laptop. If a participant is far behind, have them export the Step 1 sandbox as their jam game — it *is* a game — and build on it later

**If ahead of schedule — add in this order:**

1. **Particles** on every pickup/death (Step 5, Booster 6) — 10 minutes, huge visual payoff
2. **A second level or a hard mode** (duplicate the scene, change numbers) — 20 minutes
3. **Title screen, done properly** (separate scene, controls listed on it) — 15 minutes
4. **WASD keys** (Project Settings → Input Map: add W/A/S/D to `ui_up/left/down/right`) — 5 minutes, and every player expects it
5. **A second hazard/enemy type** in the same scene — 15 minutes

**If something breaks badly:**

- **Wifi dies at Step 7:** every participant exports to a folder and zips it (works offline). You collect zips and publish them from one machine afterwards, or the next session's opening. No game goes unpublishable
- **A machine's Godot dies mid-build:** copy the project folder (small!) to a working machine and import — 3 minutes, career saved. This is why hourly zips get taught in [Step 8](/game-jam-step-8-next/)
- **A participant is lost and demoralised:** shrink their scope *out loud* to: player moves → touches thing → score goes up → upload it. That's a finished game and a genuine win. Everyone else's game also started there
