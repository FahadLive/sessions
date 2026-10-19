---
layout: libdoc_page.liquid
permalink: /game-jam-overview/
title: Game Jam Speed Kit
description: "A 3-hour guided handbook for complete beginners: build Coin Rush in Godot 4, give it real art and sound from free libraries, export it for the web, and upload it to itch.io, so you finish with a link you can send to a friend."
eleventyNavigation:
    key: Game Jam Speed Kit
    order: 7
---

# Your game, uploaded, in 3 hours

In three hours you go from **a ready-made starter project** to **a link you can send someone**: a real game, playing in their browser, that you finished.

No coding background needed. No art skills needed. You will paste about **40 lines of code** from this guide, and you'll understand what each one does.

## What "done" looks like

- A game with **a goal** (collect 5 coins), **a way to lose** (touch the hazard) and **a restart** (press Space)
- Real pixel art, real sound effects and music, all free to use, with a `CREDITS.txt` to prove it
- Running in a browser at an **itch.io link**
- Built in **Godot 4.6**, the free game engine

![A mock-up of the finished game: a sandy arena with brick walls, a knight at the bottom, silver coins and a bat.](/assets/game-jam-speed-kit/previews/style-2d-pixel.png)

_The game you'll build (mock-up). Your real screenshot replaces this on the itch.io page._

{% comment %}
EMBED PLACEHOLDER: once the finished game is hosted, replace this comment with:
{% gameEmbed "https://YOUR-GAME-URL", "", "Play the finished Coin Rush" %}
and delete the image below.
{% endcomment %}

![Placeholder: the finished game embedded and playable on this page.](/assets/game-jam-speed-kit/previews/finished-game.webp)

## This is one guided path, not a blank page

Everyone builds the **same game, in the same order**. That is on purpose. A blank page is where beginners get stuck; a guided path is where they finish. After you finish, the _look_ of the game is yours to change, and the [Step 6](/game-jam-step-6-next/) page lists what to try.

The same loop works in any style. Here's what the same "collect and avoid" idea looks like in three styles:

| Pixel 2D (**you build this**)                                                               | UI-only                                                                                                          | Low-poly 3D ([showcase](/game-jam-3d-showcase/))                                                |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| ![A mock-up of the pixel 2D style.](/assets/game-jam-speed-kit/previews/style-2d-pixel.png) | ![Placeholder: a UI-only game made of buttons and text.](/assets/game-jam-speed-kit/previews/finished-game.webp) | ![Placeholder: a low-poly 3D arena.](/assets/game-jam-speed-kit/previews/shot-3d-showcase.webp) |

> **Key insight:** the style changes the _paint_, not the engine. A coin is an `Area2D` in 2D and an `Area3D` in 3D. The signal, the score script and the export are identical. In the [3D showcase](/game-jam-3d-showcase/) you'll see that for yourself.

## The Jam Mindset

Three rules. They run through every step.

1. **Placeholder first, polish last.** Your game starts as coloured boxes. You swap in art only when the game works. If a box game isn't fun, a pretty one won't be either.
2. **Reuse, don't reinvent.** About 90% of a jam game is art, sound and parts that other people made and shared. Your job is to **assemble and tune**, not to draw everything.
3. **Three passes, in this order:** **playable** (you can move and collect) → **finishable** (you can win, lose and restart) → **pretty** (art, sound, juice). Never start pass 3 before pass 2 works.

> **Note:** "Juice" is the little extras that make a game feel good: a sound when you grab a coin, a screen shake when you get hit, a number that pops. You add it in pass 3.

## The plan

| Time        | Step                                                   | You walk out with                          |
| ----------- | ------------------------------------------------------ | ------------------------------------------ |
| 0:00 – 0:10 | [Step 0: Setup](/game-jam-step-0-setup/)               | Godot running, starter project open        |
| 0:10 – 0:45 | [Step 1: Build the core](/game-jam-step-1-build-core/) | **Pass 1 and 2:** playable and finishable  |
| 0:45 – 1:10 | [Step 2: Find assets](/game-jam-step-2-assets/)        | An asset pack and a `CREDITS.txt`          |
| 1:10 – 1:25 | ☕ **Break**                                           |                                            |
| 1:25 – 1:55 | [Step 3: Import assets](/game-jam-step-3-import/)      | **Pass 3 begins:** real art, sound, music  |
| 1:55 – 2:20 | [Step 4: Polish](/game-jam-step-4-polish/)             | Your own sound effect and 4 bits of juice  |
| 2:20 – 2:40 | [Step 5: Export and deploy](/game-jam-step-5-export/)  | A public itch.io link                      |
| 2:40 – 2:55 | [3D showcase](/game-jam-3d-showcase/)                  | The same game in 3D, so you know it's open |
| 2:55 – 3:00 | [Step 6: Next](/game-jam-step-6-next/)                 | Your next jam, planned                     |

Each step is its own page. If you fall behind, open the step you're on. **If you get lost, raise your hand.**

## What you need

- A laptop (Windows, macOS or Linux), a mouse, and a **free itch.io account**
- **Godot 4.6**, free, no installer. Get it in [Step 0](/game-jam-step-0-setup/)
- The **starter project** and **asset pack** (two small downloads, in Step 0 and Step 2)
- Nothing else. No code editor, no terminal, no Git.

> **Key insight:** the fastest way to get unstuck in Godot is to press **F5** and look at the screen. If something isn't working, something you expected to see isn't there.

## Reference pages (open any time)

- [One-page cheat sheet](/game-jam-cheat-sheet/): asset sites, import steps and tools, printable
- [Toolbox](/game-jam-toolbox/): free tools for art, sound, music and planning, plus "I need X → use Y"
- [Troubleshooting](/game-jam-troubleshooting/): the 10 asset and import problems that actually happen
- [AI tutor rules](/game-jam-ai-tutor-rules/): how to use an AI chat without it writing your game for you
- [Before I start a jam](/game-jam-before-you-start/): the checklist for your _next_ jam

Start with **[Step 0: Setup](/game-jam-step-0-setup/)**.
