---
layout: libdoc_page.liquid
permalink: /game-jam-troubleshooting/
title: Troubleshooting - the 10 Asset and Import Problems
description: "A symptom-to-fix table for the ten asset and import problems that actually happen in Godot 4, including blurry pixel art, wrong size, music that won't loop, invisible sprites, silent sounds and blank itch.io pages."
eleventyNavigation:
    key: Troubleshooting
    parent: Game Jam Speed Kit
    order: 14
---

# Troubleshooting: the 10 that actually happen

Find your symptom, apply the fix, get back to building.

| # | You see | It means | Fix |
| - | ------- | -------- | --- |
| 1 | **A pink or missing image**, or a question-mark icon | The import hadn't finished, or the file path changed | Wait for the import bar (bottom-right). Click the file → **Import** tab → **Reimport**. If you moved the file outside Godot, move it back |
| 2 | **Blurry pixel art** | Godot smooths pictures when it scales them | Project Settings → Rendering → Textures → Canvas Textures → **Default Texture Filter = Nearest** |
| 3 | **The whole sprite sheet shows** (130 tiles at once) | The Sprite2D is displaying the full image | Sprite2D → **Animation**: set **Hframes** and **Vframes**, then pick a **Frame** |
| 4 | **Wrong size**: tiny, huge or off-screen | The picture's pixel size doesn't match your world | Select the node → set **Scale** (`2, 2`, `0.5, 0.5`…). For pixel art, keep whole numbers. In 3D, models come in any size: try `0.01`, `0.1`, `10` |
| 5 | **File shows in FileSystem, but nothing appears** | A file isn't a node. Or the node is hidden behind another, or outside the screen | Drag it into the scene or a **Texture** field. Check the draw order (**TileMapLayer first** in the list). Check **Position** and that **Visible** is on. In 3D, check there's a **Camera3D** |
| 6 | **Wrong node type**: image won't go into the slot, or an audio file won't play | A Sprite2D needs a **Texture**, an AudioStreamPlayer needs a **Stream**, an AnimatedSprite2D needs **SpriteFrames** | Match the file to the right field: pictures → `Texture`, sounds → `Stream` |
| 7 | **Music plays once, then silence** | Looping is set in the file's import, and it's off | Click the audio file → **Import** tab → tick **Loop** → **Reimport** |
| 8 | **No sound at all** | The **Stream** box is empty, **Autoplay** is off (for music), the volume is too low, or you never call `.play()` | Check **Stream** is filled, tick **Autoplay** for music, check **Volume dB**, and your laptop volume. Check `.play()` is in the code. A sound on a node you `queue_free()` is cut off, so keep it on `Main` |
| 9 | **Export button greyed out, "templates not found"** | Export templates were never installed | **Editor → Manage Export Templates → Download and Install** (or **Install from File**) |
| 10 | **itch.io page blank**, or the console mentions SharedArrayBuffer | The export used threads, or the zip has a folder around `index.html` | **Project → Export → Web → untick Thread Support** → re-export → zip the **contents** → re-upload |

## Two more that earn their keep

```text
Parse Error: Unexpected "Indent" / Expected end of statement
```

> **Note:** GDScript cares about indentation. Replace the whole script with the code block from the guide, and keep each line's indent.

```text
Touching the coin does nothing.
```

> **Note:** the node needs a **CollisionShape2D** child with a shape, and **Node → Signals → `body_entered`** must show a connection to a function that exists, spelled exactly right.

## The debugging ritual (for everything else)

1. **Read the red text.** The **Output** panel names the file and the line number.
2. **Print the suspect value.** `print(score)` beats staring at the screen.
3. **Change one thing, press F5.** One. Not three.
4. **Still stuck after two tries?** Press **F1** for the docs on the node involved, then ask a human, with the error message attached.

> **Key insight:** nobody writes jam code that works first time. The skill isn't avoiding errors. It's turning an error into a line number in under a minute.
