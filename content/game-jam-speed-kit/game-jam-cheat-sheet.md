---
layout: libdoc_page.liquid
permalink: /game-jam-cheat-sheet/
title: Cheat Sheet - Game Jam Speed Kit
description: One page for the whole session — the 8 steps with times, every asset site, the import moves, the export clicks, and the Godot nodes and shortcuts that matter.
eleventyNavigation:
    key: Cheat Sheet
    parent: Game Jam Speed Kit
    order: 11
---

# The one-page cheat sheet

Print it, pin it, or put it on the second screen. Everything you need, nothing you don't.

## The 8 steps

| # | Step | Minutes | The one thing you leave with |
| - | ---- | ------- | ---------------------------- |
| 0 | Setup | 10 | Godot open, templates + itch.io done, project folders made |
| 1 | Mental model | 25 | Player moves, coin scores — the five ideas |
| 2 | Pick your game | 15 | One-sentence loop + "NOT TODAY" list |
| 3 | Get assets | 20 | 5–10 unzipped files (timer says stop) |
| 4 | Import | 20 | Real art, sounds, fonts in the game |
| 5 | Build | 40 | Goal + way to lose + restart |
| 6 | Polish | 20 | Sound, flash/shake, title, worst bug |
| 7 | Export & deploy | 20 | A playable itch.io URL |
| 8 | Next | 10 | A jam in the calendar |

**Behind at 2:10?** Skip Step 6, go straight to export. **Ahead?** Particles, a second level, title animation.

## The five ideas

**Nodes & scenes** = LEGO bricks and sealed bags. **Signals** = doorbells ("when this happens, run that"). **Variables** = named boxes. **Functions** = named chunks. **`if`** = react differently to different situations.

## Asset sites

| Need | Use | Minutes |
| ---- | --- | ------- |
| 2D + 3D art packs | [Kenney.nl](https://kenney.nl) | 5–8 |
| More art / niche themes | itch.io assets (free filter), [OpenGameArt.org](https://opengameart.org) | 5–10 |
| Sound effects | [jsfxr.me](https://sfxr.me) (or ChipTone) | 2 |
| Music | [BeepBox.co](https://beepbox.co), Pixabay | 3–5 |
| Fonts | [Google Fonts](https://fonts.google.com) | 2 |
| Pixel art | Piskel (browser), Pixelorama | 5 |
| Image edits | [Photopea.com](https://www.photopea.com) | 2 |
| Low-poly 3D models | [Blockbench](https://www.blockbench.net) | stretch |

Search like: `kenney platformer pack`, `free low poly forest itch.io`.

## Import in six moves

1. Drag files into the **FileSystem** panel → right folders (`art/`, `audio/`).
2. Picture on a stick → **Sprite2D**, file into **Texture**.
3. One frame of a sheet → **Region → Enabled** → Rect; whole sheet animated → **H frames / V frames**.
4. Pixel art mushy → Project Settings → **Default Texture Filter → Nearest**.
5. Music stops early → select file → **Import dock → Loop → On → Reimport**.
6. Font → Label → **Theme Overrides → Fonts** → drag `.ttf`.

3D model: take the **`.glb`**, drag into the scene, fix size with **Scale** (0.01 / 0.1 / 1).

## Export in six moves

1. Window = **960×540** (Project Settings → Window); renderer = **gl_compatibility**.
2. **Project → Export → Add → Web** (templates missing? Editor → Manage Export Templates).
3. **Export Project** into a new **empty folder**.
4. **Zip the folder**.
5. itch.io → Publish → **Kind: HTML** → upload zip → **tick "played in the browser"** → viewport **960×540** → Save.
6. Open the URL, test on another device, add screenshot + controls text.

**Blank page?** Export → Web → **uncheck Thread Support Available** → re-export → re-upload.

## Nodes worth knowing

| Job | 2D | 3D |
| --- | -- | -- |
| Steer-able body | `CharacterBody2D` | `CharacterBody3D` |
| "Notices overlap" | `Area2D` | `Area3D` |
| Static world | `StaticBody2D` | `StaticBody3D` |
| Picture / shape | `Sprite2D` | `MeshInstance3D` |
| Physics shape | `CollisionShape2D` | `CollisionShape3D` |
| The view | `Camera2D` | `Camera3D` |
| Sound | `AudioStreamPlayer` | same |
| UI text / buttons | `Label` / `Button` | same (CanvasLayer) |

## Shortcuts

| Key | Does |
| --- | ---- |
| `F5` | Run the game |
| `F8` | Stop the game |
| `F1` | Built-in docs for the selected thing |
| `Ctrl+S` / `Cmd+S` | Save (do it constantly) |
| `Ctrl+D` | Duplicate the selected node |
| `Ctrl+F5` | Run just this scene |
| `Esc` | (in scripts) leave the script editor |

## The rules that save jams

1. **20-minute asset cap.** Timer rings, you stop.
2. **One-sentence loop.** If it has "and also", cut the second half.
3. **Test after every single addition.** Never three changes, then test.
4. **Hourly zip backup** of the whole project folder.
5. **Ship at 2:30.** A rough uploaded game beats a perfect unshared one.
