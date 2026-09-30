---
layout: libdoc_page.liquid
permalink: /godot-phase-1-level/
title: Phase 1 - Build the Level
description: Paint a 2D platformer level tile by tile in Godot — draw a ground line, carve a jumpable gap, add floating platforms and a raised step, with collision already handled.
eleventyNavigation:
    key: Phase 1 - Build the Level
    parent: Godot Platformer Workshop
    order: 3
---

# Phase 1 (30 min): Build the level

**You should be at 0:00.** By the end of this phase you have a level — solid ground, a gap to jump, and some platforms. Still no character; that's [Phase 2](/godot-phase-2-player/).

## What you're aiming for

```text
 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                    ▓▓▓                    ▓▓▓▓▓▓
 ░░░░░░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓░░░░░░░
 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   ▓▓▓▓▓▓▓▓▓▓▓▓
 ═══════════════════   ═══════════════════   ═══════════════════
      3 tiles wide         3 tiles wide         3 tiles wide
```

## Open the level scene

In the top of the editor, next to the **▶ Play** and **⏸ Pause** buttons, there's a **2D** button. Click it — this flips the editor from the 3D view to the 2D view. Everything we do from here is in 2D.

Then, in the **FileSystem** panel on the left, double-click `scenes/game.tscn`.

You should see a **Scene** dock on the left with a tree that currently looks like this:

```text
Game        (Node2D)
└── Level   (TileMapLayer)
```

And `Level` is selected in both the Scene tree and the viewport.

> **Key insight:** in Godot, the **left panel is the tree of things in your level**, and the **big middle area is what it looks like**. Nearly every action is: select something on the left, change it on the right, drag it in the middle.

## Pick a tile

Just above the viewport on the left there's a small square grid — that's the **TileSet palette**. The tileset is already loaded, so there should be tiles to choose from.

If the palette is empty or says *"No TileSet selected"*:

- Click `Level` in the Scene tree
- Scroll down in the **Inspector** (right panel) to **Tile Set**
- Click the empty box and choose **New TileSet**… wait, no. It should already say `world_tileset.tres`. If it doesn't, drag `tilesets/world_tileset.tres` from the FileSystem panel onto the **Tile Set** field.

## Paint the ground

1. In the TileSet palette, click the **plain brown/dirt block tile** — a full square, not a grass edge, not a slope. Hovering shows the tile name at the top of the viewport.
2. Select the **Paint** tool. Press `1` on your keyboard — that's the shortcut, and it saves you hunting through the toolbar.
3. Now **left-click and drag across the viewport** to draw a line of ground. Aim for a row about two-thirds of the way down the screen.

> **Note:** every tile in this tileset is **solid**. Whatever you paint, the player will stand on. You don't add collision anywhere in this phase — that's the whole point of shipping a pre-configured tileset.

To erase, right-click and drag.

## Make it a level, not a line

Now the fun part. A flat line isn't a level.

1. **Make a gap.** Pick the **Erase** tool (`Ctrl+Z` will undo, don't worry) — or hold `Alt` to erase while staying in paint mode. Erase a **3-tile-wide** hole in your ground. This is a jumpable gap; see the numbers below.
2. **Add a second gap** further along, the same width.
3. **Add platforms.** Switch back to paint, pick a different tile, and draw a few floating platforms **3 tiles above the ground** — high enough to jump onto, low enough to jump off.
4. **Add a raised step** — a block 1–2 tiles tall somewhere along the ground, so you have to jump over it.

## The numbers that matter

Your character's jump is fixed, so your level has to fit it. These are measured, not guessed:

| Thing | Value |
| ----- | ----- |
| How high the character jumps | **3 tiles** |
| How far they can jump across | **5 tiles** |
| Comfortable gap to design for | **3 tiles** |
| Platform height above the ground | **3 tiles** |

> **Key insight:** these three numbers are why game design is hard. You can't make a 10-tile gap fun if the character only jumps 5. Every platformer is built backwards from the jump.

## You should see

- A continuous ground line with two or three **3-tile holes** in it
- Two or three **floating platforms** roughly 3 tiles up
- At least one **raised block** on the ground
- A little grid pattern in the background (that's the tile grid, not part of your game — it won't show when you press `F5`)

Press `F5`. You'll see your level as a game — a still image with no character. That's Phase 1 done.

> **Note:** if you see a **giant blurry version** of your level filling the screen, you've zoomed the editor way in. Press `F5` — the game view uses the camera settings, and this doesn't affect the real game.

## If you get stuck

```text
The TileSet palette is empty.
```

> **Note:** `Level` isn't selected in the Scene tree, or its **Tile Set** field is blank. Click `Level`, find **Tile Set** in the Inspector, and drag `tilesets/world_tileset.tres` into it.

```text
I painted, but the character will fall straight through later.
```

> **Note:** you probably picked a decoration tile (grass, flower, ladder) instead of the plain dirt block. Decoration tiles in this set are **not** full solid blocks. Repaint that area with the plain block tile.

```text
I painted a huge area by accident.
```

> **Note:** `Ctrl+Z` / `Cmd+Z` repeatedly. Godot's undo history goes back a long way. If you truly cannot recover, delete `game.tscn`, delete `Level`, add a new `TileMapLayer`, name it `Level`, assign the tileset, and repaint — 2 minutes.

## Stretch goal

Give the level a **name** by making three distinct areas: a starting flat area, a jump section, and a finish area with the ground getting higher. Look at other platformers — they always get harder as you go.

Next: **[Phase 2](/godot-phase-2-player/)** — the character. This is where it starts feeling like a game.
