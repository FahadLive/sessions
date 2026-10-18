---
layout: libdoc_page.liquid
permalink: /game-jam-step-6-next/
title: Step 6 - Where to Go Next (5 min)
description: "Your take-home plan after the session. A 48-hour jam timeline, a cut list habit, more Godot speed boosters (groups, AnimationPlayer, add-ons, your own template), and where to learn and find jams."
eleventyNavigation:
    key: Step 6 - Next
    parent: Game Jam Speed Kit
    order: 10
---

# Step 6 (5 min): Where to go next

You shipped a game. This page is for **after**. Read the first section now, and keep the rest for later.

## Do these three things this week

- [ ] **Save your project as a template.** Copy the `coin-rush-starter` folder, rename it `jam-template`, and **delete the game-specific bits** you don't want. You keep: the folder layout, `GameState`, the restart code, the HUD, `CREDITS.txt`. **Start every jam from it.**
- [ ] **Change one thing in your game and re-upload.** A new level layout, a second hazard, a different character. On itch.io use **Edit project → upload the new zip**.
- [ ] **Join a jam** (links below).

## The 48-hour jam plan

Most jams give you a weekend. Here's the same order you used today, stretched.

| When          | What                                                                                  | Pass |
| ------------- | ------------------------------------------------------------------------------------- | ---- |
| **Hour 0–2**  | Read the theme. Pick **one** idea. Write the **core loop in one sentence**: _"The player ___ to ___ while avoiding ___."_ | |
| **Hour 2–6**  | **Placeholder prototype.** Boxes only. Use your template. Make it playable            | 1    |
| **Hour 6–12** | Add a goal, a way to lose, a restart                                                  | 2    |
| **Hour 12–30**| Build the fun: tune numbers, add a second kind of thing, test with a friend           | 2    |
| **Last 20% (about 10 hours)** | **Audio, juice, menu, export, upload, test on another computer**. Never skip this | 3    |

> **Key insight:** put the export in the **last 20%**, but do a **test export in the middle** (around hour 24). A broken export on the last night is the most common way a finished game dies.

### The cut list

On day one, write **what you will NOT build**. One sticky note, taped to your monitor:

```text
NOT building: multiplayer, a boss, an inventory, 3 levels, a save system.
```

When a shiny idea shows up at hour 20, it goes on the list for **next jam**. Every jam game dies of additions, not limits.

### Back up every hour

Copy your project folder, zip it, and name it with the time (`coin-rush-1400.zip`). It takes 20 seconds and has saved many weekends. When you're ready for more, learn **Git**, but only when you've got spare time, and as your one new tool.

## More speed boosters

Take **one at a time**, only when you hit the problem it solves.

- **Groups.** Tag a node as `enemy` (**Node** tab → **Groups**). Then in code: `if body.is_in_group("enemy"):`. Use it when many different things count as "bad".
- **AnimationPlayer.** A node that records changes over time (position, colour, scale) and plays them back. It's a timeline for pops, doors and menus, with almost no code.
- **Reusable scenes.** Build an enemy or bullet once, then instance it everywhere. You already did this with the coins.
- **Godot AssetLib.** The **AssetLib** tab at the top of the editor. Search → click an item → **Download** → **Install**. Worth it for **dialogue**, **camera** and **save-game** add-ons. Read the add-on's page and check its license first.
- **Too many add-ons is a risk.** Each one is code you didn't write and can't fix. In a jam: **at most one or two**, and only if you understand what they do.
- **Your own template.** The first item on the list above.

## Where to learn next

| What | Where |
| ---- | ----- |
| The official docs (and press **F1** inside Godot to search them offline) | [docs.godotengine.org](https://docs.godotengine.org/en/stable/) |
| Short, clear Godot lessons | [GDQuest](https://www.gdquest.com) |
| Fun beginner game-making videos | [Brackeys on YouTube](https://www.youtube.com/@Brackeys) |
| Ask questions, see others' work | [Godot Discord](https://discord.gg/godotengine) and [r/godot](https://www.reddit.com/r/godot/) |

## Where to find jams

| Jam | Notes |
| --- | ----- |
| [itch.io jams](https://itch.io/jams) | Hundreds at any time. Filter for beginner-friendly or 48-hour ones |
| [GMTK Game Jam](https://itch.io/jam/gmtk-2025) | Big, friendly and theme-based. Run by the _Game Maker's Toolkit_ YouTube channel (that link is the 2025 edition; look for the newest one) |
| [Ludum Dare](https://ldjam.com) | The classic. A weekend, a theme, a huge community |

> **Note:** before you enter any jam, **read its rules**: team size, whether assets must be made during the jam, and what it says about AI-generated assets.

## Your next jam, in one line

> _"I'll start from my template, write the core loop in one sentence, and have it playable in six hours."_

Open the **[Before I start a jam](/game-jam-before-you-start/)** checklist the night before. Print the **[cheat sheet](/game-jam-cheat-sheet/)**. And go make something.
