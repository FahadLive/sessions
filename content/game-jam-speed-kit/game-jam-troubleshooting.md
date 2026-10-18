---
layout: libdoc_page.liquid
permalink: /game-jam-troubleshooting/
title: Troubleshooting - Top 10 Problems
description: The 10 most common Godot import, runtime and web-export problems during a game jam — what each one means and the exact one-line fix, from magenta squares to blank pages on itch.io.
eleventyNavigation:
    key: Troubleshooting
    parent: Game Jam Speed Kit
    order: 12
---

# Troubleshooting: the 10 that actually happen

Find your symptom, apply the fix, get back to building. (In-editor errors first, export horrors last.)

| # | You see | It means | Fix |
| - | ------- | -------- | --- |
| 1 | **Magenta/pink square** instead of art | The texture failed to import — usually you ran the game before the import bar finished | Wait for the bottom-right import bar → click the file → **Import dock → Reimport**. If still pink: open in Photopea, re-save as PNG, re-drag |
| 2 | **Blurry pixel art** | Godot is smoothly scaling your pixels | Project → Project Settings → Rendering → Textures → **Default Texture Filter → Nearest** |
| 3 | **Whole sprite strip showing** (12 coins in a row) | `Sprite2D` is displaying the entire sheet | Tick **Region → Enabled** → Rect `0, 0, W, H` for one frame — or set **H frames** to the frame count to animate them |
| 4 | **Music plays once, then silence** | Looping wasn't set on import | Select the audio file → **Import dock** → **Loop → On** → **Reimport** |
| 5 | **Nothing scores when I touch the coin** | The signal isn't connected, or the mask/layer pair is wrong | Inspector → Node → **Signals → body_entered** must show connected; coin **Mask** = 2, player **Layer** = 2 |
| 6 | **Parse Error / Unexpected identifier** | A typo, or tabs vs spaces | GDScript is indentation-sensitive: re-paste the code block from the guide, replacing everything, and keep **Tab** indents |
| 7 | **3D model invisible or fills the whole screen** | Scale mismatch between the model's units and your world | Select the model → **Scale** → `0.01` / `0.1` / `1` until it fits; confirm a `Camera3D` exists and is pointed at it |
| 8 | **Export button missing/greyed, "templates not found"** | Export templates were never installed | **Editor → Manage Export Templates → Download and Install** (or Install from File from a USB copy) |
| 9 | **itch.io page is blank / console screams SharedArrayBuffer** | Your export used threads; itch.io doesn't send the headers threads need | **Project → Export → Web → uncheck "Thread Support Available"** → Export Project again → re-zip → re-upload. (Game slightly slower; works everywhere) |
| 10 | **No sound until I click on the page** | Browser autoplay policy — not a bug | Nothing to fix. Clicking inside the game frame unlocks audio. Say "click the game first" in your description |

## Two more that earn their keep

- **"F5 says no main scene"** — right-click your main scene → **Run Scene**, or set it: Project → Project Settings → **Run → Main Scene**.
- **The game runs but looks empty** — check the obvious trio: is the node actually in the scene tree? Is its position on-screen? Is there a camera?

## The debugging ritual (for everything not in the table)

1. **Read the red text** — Output panel, the full message, out loud. It names the file, the line, and usually the crime.
2. **Print the suspect value** — `print(score)` beats staring at the screen every time.
3. **Change one thing, press F5.** One. Not three.
4. **Still stuck after two tries?** `F1` docs for the node involved — then a human (facilitator, Discord, r/godot) with the error message attached.

> **Key insight:** nobody — not one person in this room or on the internet — writes jam code that works first time. The skill isn't avoiding errors; it's **turning an error into a line number** in under a minute. That's 90% of what "being good at this" means.
