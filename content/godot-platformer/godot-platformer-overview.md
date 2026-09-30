---
layout: libdoc_page.liquid
permalink: /godot-platformer-overview/
title: Godot Platformer Workshop
description: A 4-hour hands-on workshop where absolute beginners build a complete 2D platformer in Godot 4.6 — a level, a jumping character, coins, a score counter and a death pit — with no prior coding required.
eleventyNavigation:
    key: Godot Platformer Workshop
    order: 1
---

# Build your first game in Godot — a 2D platformer

In four hours you go from **an empty Godot project** to a **playable platformer** — one you can hand to a friend and say "I made this."

No coding experience needed. You will not write a game's worth of code. You will write about **30 lines**, and you will paste them from this guide.

## What you'll build

```text
    ┌──────────────────────────────────────────────┐
    │  You collected 3 coins.                      │
    │                                              │
    │   ☀                                        ⬤ │
    │  ▓▓▓▓▓▓            ▓▓▓▓▓▓▓                   │
    │  ▓▓▓▓▓▓     ☀      ▓▓▓▓▓▓▓      ☀           │
    │  ▓▓▓▓▓▓▓▓▓▓▓▓      ▓▓▓▓▓▓▓▓▓▓▓                 │
    │  ▓▓▓▓▓▓▓▓▓▓▓▓      ▓▓▓▓▓▓▓▓▓▓▓      ╲         │
    │  🗡️→  ▓▓▓▓▓▓▓      ▓▓▓▓▓▓▓▓▓▓▓       ╲___     │
    └──────────────────────────────────────────────┘
        walk →  jump →  grab coins →  don't fall
```

- **A level** you paint tile by tile
- **A character** that runs left/right and jumps
- **Coins** that vanish and bump a score
- **A death pit** that sends you back to the start
- **Sound effects** and a **score counter** on screen

That's the whole game. It is a *real* game — it's the same shape as Flappy Bird, VVVVVV, or Celeste, minus the hard parts.

## The honest truth about 4 hours

The famous Brackeys Godot tutorial is a ~2 hour video covering a lot: animations, double jumps, enemy AI, moving platforms, particle effects, pause menus. Trying to cram all of that into 4 hours with absolute beginners produces broken collisions and frustrated rooms.

So this workshop is deliberately smaller. Here's exactly what's in and what's out:

| ✅ In the workshop | ❌ Cut (try them at home) |
| ------------------- | ------------------------ |
| Walk left/right, jump | Running & jump animations |
| One TileMapLayer level | Slopes, multiple levels |
| Coins that add score | Spinning coin animation |
| A death pit that resets | Enemy AI / patrolling slimes |
| A score label + sound | Moving platforms, double jump |
| | Main menu, pause menu |

> **Note:** the starter project you download already has the tiles, the sounds, the pixel-art settings and the collision shapes all set up. So there's **zero** setup to fail. You start by drawing, not by configuring.

## The plan

| Time | Phase | You build |
| ---- | ----- | --------- |
| 0:00 – 0:30 | [Phase 1](/godot-phase-1-level/) | The level — paint tiles |
| 0:30 – 1:25 | [Phase 2](/godot-phase-2-player/) | The character — move & jump |
| 1:25 – 1:40 | ☕ **Break** | |
| 1:40 – 2:25 | [Phase 3](/godot-phase-3-coins/) | Coins |
| 2:25 – 3:00 | [Phase 4](/godot-phase-4-hazards/) | The death pit |
| 3:00 – 3:15 | ☕ **Break** | |
| 3:15 – 4:00 | [Phase 5](/godot-phase-5-score-audio/) | Score counter & sound |

Each phase is its own page, so if you fall behind you can open just the phase you're on. **If you get lost, raise your hand** — that's what the helpers are for.

## What you need

- **Godot 4.6** — the free game engine. Get it on the [download page](https://godotengine.org/download) before you arrive.
- **The starter project** — a small zip, ~1 MB. Grab it on [Setup](/godot-setup/).
- **That's it.** No code editor, no terminal, no version control, no accounts.

> **Key insight:** Godot is not like a normal code editor. You build a game by **dragging nodes together in a visual scene tree**, then writing tiny scripts that say what should happen. Most of the work is clicking. The code is the small part.

## The controls you'll use

| Action | Keys |
| ------ | ---- |
| Move left | `←` or `A` |
| Move right | `→` or `D` |
| Jump | `Space` |
| Run your game | `F5` |
| Stop your game | `F8` |

Both key sets are already wired up for you. Nothing to configure.

## The project you'll end up with

```text
starter-project/
├── project.godot            ← already configured
├── tilesets/
│   └── world_tileset.tres   ← already has collision
├── scenes/
│   ├── game.tscn            ← your level lives here
│   ├── player.tscn          ← you build this
│   ├── coin.tscn            ← you build this
│   └── killzone.tscn        ← you build this
├── scripts/
│   ├── player.gd            ← you write this
│   ├── coin.gd              ← you write this
│   ├── killzone.gd          ← you write this
│   └── game_manager.gd      ← you write this
└── assets/                  ← sprites, sounds, music, fonts
```

Four small scripts. That's the whole codebase.

## Two things that will trip you up (so you can ignore them)

1. **A `.godot/` folder appears.** Godot creates it automatically. Never open it, never edit it, never delete it while the editor is open.
2. **You'll see red text at the bottom.** That's Godot's Output panel. **Red text in there is normal while you edit scripts** — it clears when you save and run. Only worry if the game refuses to start.

> **Key insight:** the fastest way to get unstuck in Godot is to **press `F5` and look at the screen**. If something doesn't work, something you expected to be visible isn't. If it works, move on — don't admire it.

Start with **[Setup](/godot-setup/)** — five minutes, and it makes sure nobody burns workshop time on downloads.
