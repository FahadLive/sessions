---
layout: libdoc_page.liquid
permalink: /game-jam-cheat-sheet/
title: One-Page Cheat Sheet
description: "A printable one-page reference for the Game Jam Speed Kit, with asset sites and licenses, the import steps for Godot 4, the speed tools, and the shortcuts to remember. Print it or keep it open in a tab."
eleventyNavigation:
    key: Cheat Sheet
    parent: Game Jam Speed Kit
    order: 12
---

# Cheat sheet (print me)

## The order

**Playable → finishable → pretty.** Boxes first. One new tool per jam. `CREDITS.txt` from day one.

## Asset sites

| Need | Go to | License |
| ---- | ----- | ------- |
| Art, UI, audio, fonts, 2D and 3D | [kenney.nl/assets](https://kenney.nl/assets) | CC0 |
| Art packs, tilesets | [itch.io/game-assets/free](https://itch.io/game-assets/free) | Per pack |
| Art, music, effects | [opengameart.org](https://opengameart.org) | Per file |
| Sound effects | [freesound.org](https://freesound.org) | Per sound (avoid NC) |
| Music and effects | [pixabay.com/music](https://pixabay.com/music/) | Pixabay license |
| Fonts | [fonts.google.com](https://fonts.google.com) | Mostly OFL |
| Add-ons | Godot editor → **AssetLib** tab | Per add-on |

**Licenses:** CC0 = free · CC-BY = free, credit the creator · NC / ND = avoid · no license = don't use. **Read the asset's own page.**

## Import steps (Godot 4)

1. **Folders:** `art`, `audio`, `scenes`, `scripts`, `ui` (right-click `res://` → New Folder)
2. **Drag files** into the FileSystem panel
3. **Pixel art:** Project Settings → Rendering → Textures → Canvas Textures → Default Texture Filter = **Nearest**
4. **Picture:** add a **Sprite2D** → drag the file into **Texture**
5. **Sprite sheet:** Sprite2D → **Animation**: Hframes, Vframes, Frame (= row × columns + column)
6. **Flip-book:** **AnimatedSprite2D** → New SpriteFrames → Add Frames from Sprite Sheet
7. **Level:** **TileMapLayer** → New TileSet → drag the tile picture into the TileSet panel → paint. _Keep it first in the list_
8. **Sound effect:** WAV → **AudioStreamPlayer** → Stream → `.play()`. Keep it on a node that isn't deleted
9. **Music:** OGG → AudioStreamPlayer → **Autoplay**. Click the file → **Import** tab → **Loop** → Reimport
10. **Font:** Label → Theme Overrides → Fonts → Font

**Then:** add the credit lines to `CREDITS.txt` at once.

## Speed tools (all free; start with the web ones)

| Job | Tool | Where |
| --- | ---- | ----- |
| Sound effects, 30 seconds | **jsfxr** (web) | [sfxr.me](https://sfxr.me) |
| Sound effects (alt) | **ChipTone** (web or download) | [sfbgames.itch.io/chiptone](https://sfbgames.itch.io/chiptone) |
| Pixel art | **Piskel** (web) | [piskelapp.com](https://www.piskelapp.com) |
| Pixel art | **Pixelorama** (Godot-made) | [orama-interactive.itch.io/pixelorama](https://orama-interactive.itch.io/pixelorama) |
| Simple music | **BeepBox** (web) | [beepbox.co](https://www.beepbox.co) |
| Planning | **Excalidraw** (web) | [excalidraw.com](https://excalidraw.com) |
| Trim audio | **Audacity** | [audacityteam.org](https://www.audacityteam.org) |
| Drawing | **Krita** | [krita.org](https://krita.org) |

More, with "skip it if…": the [Toolbox](/game-jam-toolbox/).

## Keys

| Key | Does |
| --- | ---- |
| **F5** / **F8** | Run / stop the game |
| **Ctrl+S** (**Cmd+S**) | Save |
| **F1** | Search the built-in docs |
| **F2** | Rename the selected node |
| **Ctrl+D** (**Cmd+D**) | Duplicate a node |

## Export checklist

- [ ] Export templates installed (**Editor → Manage Export Templates**)
- [ ] **Project → Export → Add → Web**, **Thread Support off**, file named **`index.html`**
- [ ] Zip the **contents**, so `index.html` is at the top
- [ ] itch.io: **HTML** · **played in the browser** · viewport **960 × 540**
- [ ] Controls and credits in the description
- [ ] Test on a second device

## Stuck?

Read the red text → change one thing → **F5**. Failed twice? **F1**, then ask a human.
