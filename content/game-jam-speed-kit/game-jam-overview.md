---
layout: libdoc_page.liquid
permalink: /game-jam-overview/
title: Game Jam Speed Kit
description: "A 3-hour handbook for complete beginners — go from an empty Godot 4 project to a game that's exported, uploaded to itch.io, and playable by link. Pick any style: 2D, UI-only puzzle, or low-poly 3D."
eleventyNavigation:
    key: Game Jam Speed Kit
    order: 2
---

# Your game, uploaded, in 3 hours

In three hours you go from **an empty project** to **a link you can send someone** — a real game, playing in their browser, that you made.

No coding background needed. No art skills needed. You will write about **30 lines of code**, and you'll understand every one of them.

## What "done" looks like

- A game with **a goal**, **a way to lose**, and **a restart button**
- Running in a browser at an **itch.io link** you can text to a friend
- Built in **Godot 4**, the free game engine that studios ship commercial games with

## The honest truth about 3 hours

Three hours is not enough to make the game in your head. It is exactly enough to make a **small, complete game** — the kind that wins "best tiny game" at a jam, not the kind that lives on a hard drive forever.

So there are two rules:

1. **One core loop, repeated.** Move, collect, avoid, win or lose. That's the whole game. Different art, different speed, same loop.
2. **The cut list is sacred.** Every jam game dies from additions, not from limits. You'll write down what you will *not* build in [Step 2](/game-jam-step-2-pick-game/), and when a shiny idea appears at minute 90, it goes on a list for *next* time.

## The plan

| Time         | Step                                                       | You walk out with                          |
| ------------ | ---------------------------------------------------------- | ------------------------------------------ |
| 0:00 – 0:10  | [Step 0: Setup](/game-jam-step-0-setup/)                   | Godot running, project ready               |
| 0:10 – 0:35  | [Step 1: The mental model](/game-jam-step-1-mental-model/)  | A moving player and a working score        |
| 0:35 – 0:50  | [Step 2: Pick your game](/game-jam-step-2-pick-game/)       | One-sentence core loop + cut list          |
| 0:50 – 1:10  | [Step 3: Get assets fast](/game-jam-step-3-assets/)         | 5–10 files, downloaded                     |
| 1:10 – 1:30  | [Step 4: Import into Godot](/game-jam-step-4-import/)       | Your game, wearing real art and sound      |
| 1:30 – 2:10  | [Step 5: Build your game](/game-jam-step-5-build/)          | A complete core loop                       |
| 2:10 – 2:30  | [Step 6: Polish pass](/game-jam-step-6-polish/)             | Sound, shake, a title — friend-ready       |
| 2:30 – 2:50  | [Step 7: Export and deploy](/game-jam-step-7-export/)       | A public itch.io URL                       |
| 2:50 – 3:00  | [Step 8: Where to go next](/game-jam-step-8-next/)          | Your next jam, booked                      |

## Three tracks — same toolkit

You pick a track in Step 2. All three use the same engine, the same ideas, and the same export process:

| Track | What you build | Best if you… |
| ----- | -------------- | ------------ |
| **A: 2D mover** | Top-down collector or platformer, with sprites | Want the classic "game feel" and love pixel art |
| **B: UI puzzle / clicker** | Buttons, timers and text — no character at all | Hate movement code, love numbers and reactions |
| **C: 3D collect-and-avoid** | "Coin Rush" — walk an arena, grab coins, dodge a swinging hazard | Want to prove 3D is not scary (it isn't) |

> **Key insight:** tracks change the *paint*, not the *engine*. A coin in track A is an `Area2D`; in track C it's an `Area3D`. The signal is the same, the script is four lines, and the export is identical. That's the whole secret of this handbook.

## What you need

- **Godot 4.6** — free, one download, no installer. Get it in [Step 0](/game-jam-step-0-setup/).
- **A browser** — for assets and for itch.io.
- **Nothing else.** No code editor, no terminal, no accounts except the free itch.io one you'll make in Step 0.

## What you'll actually learn

Five ideas carry the entire session, and they carry every future game you make too:

| Idea | In plain words |
| ---- | -------------- |
| **Nodes & scenes** | Games are built from small parts stacked in a tree |
| **Signals** | "When something happens, run this function" |
| **Variables** | Named boxes that remember numbers |
| **Functions** | Named chunks of code you can call anytime |
| **`if`** | Making the game react differently to different situations |

Everything else today is variation on these five.

> **One structural extra:** covers not one of the five, but you'll meet it in [Step 1](/game-jam-step-1-mental-model/) because a game needs it — the **singleton** (Godot calls it an **autoload**). A script that always exists while the game runs, which is how the score can be seen by every scene. It's not a new kind of code; it's *where* a global number lives.

## Two extras

- **Running out of time?** The [cheat sheet](/game-jam-cheat-sheet/) is one page: all 8 steps, every website, every export click.
- **Something broke?** The [troubleshooting table](/game-jam-troubleshooting/) has the 10 most common problems and their one-line fixes.

Facilitators: read the [pre-session checklist](/game-jam-facilitator/) the day before, not the morning of.

Start with **[Step 0](/game-jam-step-0-setup/)** — ten minutes, and it makes sure nobody loses the session to a download bar.
