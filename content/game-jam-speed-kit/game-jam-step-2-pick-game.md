---
layout: libdoc_page.liquid
permalink: /game-jam-step-2-pick-game/
title: Step 2 - Pick Your Game (15 min)
description: Choose a genre and a style in 15 minutes — see how one core loop (move, collect/avoid, win or lose) powers every jam game, pick one of three tracks, and write your cut list.
eleventyNavigation:
    key: Step 2 - Pick Your Game
    parent: Game Jam Speed Kit
    order: 4
---

# Step 2 (15 min): Pick your game and style

You have machinery that moves, collects and scores. Now: what is it *about*? You have 15 minutes to decide, because at jam speed **a decided-on mediocre idea beats a perfect idea you never start**.

## One loop runs every genre

Look at any jam game — any genre, any art style — and underneath it's the same three-beat loop:

```text
move  ->  collect / avoid  ->  win or lose
```

| Genre you've played | "Move" is… | "Collect / avoid" is… | Win or lose is… |
| ------------------- | ---------- | --------------------- |--------------- |
| Flappy Bird | tapping | avoiding pipes | hitting one |
| Celeste | running & jumping | collecting strawberries, avoiding spikes | falling or finishing |
| Cookie Clicker | clicking | collecting cookies, buying upgrades | never (it's endless) |
| Coin Rush (3D) | walking | collecting coins, dodging the hazard | timer hits zero |

The loop never changes. **Speed, camera, art and sound** change. That's where all your remaining hours go, and that's why "pick a style" matters more than "pick a genre".

> **Key insight:** you are not choosing a game. You're choosing a **coat** for a loop you already built in Step 1. This is the biggest mental shortcut of the day: the hard part is done; now it's dressing.

## Your three starter directions

Pick **one**. Right now. Say it out loud.

### Track A — 2D mover (top-down or platformer)

Extend your Step 1 sandbox into a full game. Swap `icon.svg` for real sprites, add enemies that also notice layer 2, add a way to die, add a restart.

- **Best if:** you love classic game feel and pixel art
- **Time to "feels like a game":** ~15 minutes
- **Art style freedom:** total — pixel art, flat shapes, hand-drawn, photos of your shoe

### Track B — UI puzzle / clicker (no movement at all)

No player body, no camera moves. Buttons, labels, numbers going up, a timer. Everything is `Control` nodes — Godot's bricks for interfaces. The loop becomes *click → reaction → bigger number*.

- **Best if:** movement code is not your thing and numbers are
- **Time to "feels like a game":** ~20 minutes
- **Try:** a reaction timer ("click when the label turns green"), a recipe-clicker, a "how fast can you empty this grid" puzzle

### Track C — 3D collect-and-avoid ("Coin Rush")

A low-poly arena. You walk a capsule-person around, grab spinning coins, dodge a red ball swinging through the middle, and beat a 30-second timer. It looks like a real 3D game. It uses **exactly** the nodes and signals you already know — with `3` in their names.

1. Download the tested starter (about 15 KB): <a href="/assets/game-jam-speed-kit/coin-rush-starter.zip" download class="btn btn-primary">⬇ Coin Rush starter</a>
2. Unzip it somewhere you'll find again.
3. In the Godot Project Manager: **Import** → pick the unzipped folder's `project.godot` → **Import & Edit** → wait for the import bar → **F5**.

**You should see:** a small green arena from a fixed angle, a blue capsule that walks with arrows/WASD, five gold coins, and a red ball sweeping side to side. Touch a coin: the counter goes up. Touch the ball or hit 0 seconds: the round restarts.

| The 3D thing you see | The 2D thing you know | Same job? |
| -------------------- | --------------------- | --------- |
| `CharacterBody3D` (blue capsule) | `CharacterBody2D` (your player) | Yes — "the thing I steer" |
| `Area3D` (coins, red ball) | `Area2D` (your coin) | Yes — "the thing that notices touch" |
| `Camera3D` | `Camera2D` | Yes — "the window into the world" |
| `Vector3` (`x, y, z`) | `Vector2` (`x, y`) | Almost — one extra number: depth |
| `_on_body_entered` signal | identical | **Exactly** the same |

> **Key insight:** 3D in Godot is 2D with a depth coordinate. Not "advanced 2D" — *the same game*, one axis wider. Everything in Steps 3–8 works on all three tracks unchanged. That's the point of today.

Full Coin Rush tour (the six edits that make it *yours*): [Step 5](/game-jam-step-5-build/).

## Write two things down (5 min)

Open a notes app, a napkin, whatever. Two artifacts, written now:

### 1. Your core loop — ONE sentence

Template:

> The player **[moves]** to **[collect/achieve X]** while avoiding **[Y]**, and the round ends when **[win or lose condition]**.

Examples:

- "The player **runs and jumps** to **collect coins** while avoiding **spikes**, and the round ends when **you fall in a pit or collect 20**."
- "The player **clicks** to **buy cookies** while avoiding **running out of time**, and the round ends when **the 60-second timer hits zero**."
- "The player **walks** to **collect 8 coins** while avoiding **the swinging axe**, and the round ends when **time runs out**."

If your sentence has "and also" in it — cut the second half.

### 2. Your cut list — what you will NOT build

Write this heading: **NOT TODAY**. Under it, list every shiny idea you had while reading this page, plus these four defaults everyone cuts:

- ❌ Character animation (walking frames)
- ❌ A second level
- ❌ A main menu / settings screen
- ❌ Power-ups, double-jump, dash

> **Key insight:** the cut list is not a failure report — it's a **promise to your future self**. When the idea "what if there were a shop" appears at minute 80 (it will), you point at the list, feel the satisfaction of *not* starting it, and keep building the loop.

## Checkpoint

- [ ] A track chosen (A, B, or C) and said out loud
- [ ] One-sentence core loop written
- [ ] "NOT TODAY" list written, with at least 4 cuts

Next: **[Step 3](/game-jam-step-3-assets/)** — 20 minutes of downloads, then we never think about assets again.
