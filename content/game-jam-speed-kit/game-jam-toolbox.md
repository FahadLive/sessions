---
layout: libdoc_page.liquid
permalink: /game-jam-toolbox/
title: Toolbox - Free Speed Tools and a Tool Picker
description: "Free tools for making pixel art, sound effects, music and levels, planning and publishing a game jam entry, grouped by job, with when to use each and when to skip it, plus a text \"I need X so use Y\" flowchart."
eleventyNavigation:
    key: Toolbox
    parent: Game Jam Speed Kit
    order: 15
---

# Toolbox: speed tools by job

Every tool here is free unless marked **optional paid**. **Browser tools come first**, because nothing to install means nothing to go wrong.

> **Rule: learn at most ONE new tool per jam.** A new tool costs about an hour you don't have. Pick the one that saves the most.

## Pick a tool: "I need X → use Y"

```text
I need a sound effect
  ├─ fast, random, a retro blip ........ jsfxr (sfxr.me)         ~2 min
  ├─ need more control ................. ChipTone                ~10 min
  └─ a realistic sound (door, footstep)  Freesound.org, check its license

I need music
  ├─ already have a loop ............... Kenney / OpenGameArt / Pixabay, then Import → Loop
  ├─ want to make a simple tune ........ BeepBox (browser)        ~20 min
  └─ want real tracks .................. LMMS (download)          too long for a jam

I need art
  ├─ free finished art ................. Kenney, itch.io assets, OpenGameArt   ~5 min
  ├─ small pixel sprite, edit ........... Piskel (browser) or Pixelorama        ~20 min
  └─ general drawing / textures ......... Krita                  only if you already draw

I need to trim or fix a sound .......... Audacity
I need to build a level
  ├─ grid-based ........................ Godot TileMapLayer (built in)
  └─ big or complex map ................ Tiled (optional)        skip for jams
I need to plan .......................... pen and paper, or Excalidraw (browser)
I need a backup ......................... zip the project folder, every hour
I need to publish ....................... Godot Web export → itch.io upload (Step 5)
```

## The tools

### Making simple art fast

| Tool | What it does | Cost | Use it when | **Skip it if…** |
| ---- | ------------ | ---- | ----------- | --------------- |
| [**Piskel**](https://www.piskelapp.com) | Draw small pixel sprites and animations in your browser | Free | You need a tiny custom sprite | You can use a Kenney sprite |
| [**Pixelorama**](https://orama-interactive.itch.io/pixelorama) | A pixel-art editor made with Godot, desktop or web | Free | You want a more powerful pixel editor | Piskel is enough |
| [**Krita**](https://krita.org) | A full painting program | Free | You can draw and need backgrounds or textures | You can't or don't want to draw |
| [**LibreSprite**](https://libresprite.github.io) | A pixel editor in the style of Aseprite | Free | You like Aseprite's workflow | You haven't used a pixel editor before |
| [**Aseprite**](https://www.aseprite.org) | The standard pixel-art tool | **Optional, paid** | You'll do pixel art regularly | You're on a budget. Piskel is plenty |

### Making sound effects in seconds

| Tool | What it does | Cost | Use it when | **Skip it if…** |
| ---- | ------------ | ---- | ----------- | --------------- |
| [**jsfxr**](https://sfxr.me) | Pick a sound type → click → download a WAV | Free (browser) | You need a coin, jump, hit or laser sound in 30 seconds | You want realistic sounds |
| [**ChipTone**](https://sfbgames.itch.io/chiptone) | The same idea with more detailed controls | Free | jsfxr isn't quite right | You're happy with jsfxr |

### Making simple music

| Tool | What it does | Cost | Use it when | **Skip it if…** |
| ---- | ------------ | ---- | ----------- | --------------- |
| [**BeepBox**](https://www.beepbox.co) | Write chiptune loops by clicking notes in your browser | Free | You want a custom tune and have 20 minutes | You found a CC0 track |
| [**LMMS**](https://lmms.io) | A full music studio | Free | You already make music | You haven't. It's too big to learn in a jam |

### Editing audio

| Tool | What it does | Cost | Use it when | **Skip it if…** |
| ---- | ------------ | ---- | ----------- | --------------- |
| [**Audacity**](https://www.audacityteam.org) | Trim silence, change volume, convert formats | Free | A sound has a gap at the start, or is too loud | You can fix it with **Volume dB** in Godot |

### Building levels and planning

| Tool | What it does | Cost | Use it when | **Skip it if…** |
| ---- | ------------ | ---- | ----------- | --------------- |
| **Godot TileMapLayer** | Paints levels on a grid, inside Godot | Free (built in) | Always, for grid levels | |
| [**Tiled**](https://www.mapeditor.org) | A separate map editor | Free, optional | A very large map | You haven't hit the limit of TileMapLayer. You won't in a jam |
| **Pen and paper** | Sketch the level and the core loop | Free | Always. The first 10 minutes | |
| [**Excalidraw**](https://excalidraw.com) | A whiteboard in your browser | Free | You want to share a plan | Paper is faster |
| **A sticky note** | Write the core loop in one sentence | Free | Day one | |

### Backups, publishing

| What | How | Skip it if… |
| ---- | --- | ----------- |
| **Backups** | Copy the project folder, zip it, add the time to the name. Every hour | |
| **Git** (optional) | A history of your project's changes | You've never used it. Not as your first new tool in a jam |
| **Godot Web export** | [Godot's web export docs](https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html) · [Step 5](/game-jam-step-5-export/) | |
| **itch.io upload** | [itch.io's HTML5 docs](https://itch.io/docs/creators/html5) · [Step 5](/game-jam-step-5-export/) | |

Back to the [overview](/game-jam-overview/).
