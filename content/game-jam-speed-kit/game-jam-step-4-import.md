---
layout: libdoc_page.liquid
permalink: /game-jam-step-4-import/
title: Step 4 - Import into Godot (20 min)
description: Drag art, sounds, models and fonts into Godot 4 — sprite sheets, .glb models, looping audio, label fonts — with three mini-exercises and a fix for every common import problem.
eleventyNavigation:
    key: Step 4 - Import
    parent: Game Jam Speed Kit
    order: 6
---

# Step 4 (20 min): Import into Godot

You have a folder of downloads and a game made of grey boxes. This step is the swap. **Track B (UI games):** skip the sprite and model sections — fonts and sounds are your whole page.

## The one import move that does everything

Drag files from your OS file manager (Finder / Explorer) **into the FileSystem panel** in Godot. Drop them in the right folder: images → `art/`, sounds → `audio/`.

> **Key insight:** dropping files into Godot doesn't move them — it *registers* them. Godot copies nothing; it just learns where your files live and prepares them (you'll see the progress bar bottom-right). This is why moving files *after* import breaks things, and why you drag into the panel, not into the scene.

## 2D art

### The simple case: one image, one sprite

Your player already has a `Sprite2D` node showing `icon.svg`. Swap the picture:

1. Open `player.tscn`, select the `Sprite2D` child.
2. Drag your new image (say `art/hero.png`) from the FileSystem into the **Texture** slot in the Inspector.

**You should see:** the new character standing where the icon was. Done. That's the core move — `Sprite2D` is "a picture on a stick".

### Sprite sheets: many pictures in one file

Jam art often comes as a **sprite sheet** — one image holding a grid of frames (a walking cycle, a spinning coin). Two ways to cut it up:

- **Cut to one frame:** select the `Sprite2D` → Inspector → tick **Region → Enabled** → set **Rect** (`X`, `Y`, `Width`, `Height`) to the frame you want. (This is how a 12-frame coin strip becomes one coin.)
- **Show the whole grid as a sequence:** set **H frames** (columns) or **V frames** (rows) in the Inspector to match the sheet's grid. `H frames: 4` on a 4-frame strip means the sprite shows frame 1, and you can cycle them in code or with an…

### AnimatedSprite2D — for real animation (optional)

Add an **AnimatedSprite2D** node instead of `Sprite2D`. The **SpriteFrames** panel appears at the bottom → **Add frames from a Sprite Sheet** → pick your file → tell it the columns and rows → tick **Autoplay**. Now it animates with zero code. Ten minutes well spent if your character has a walk cycle — and on the cut list if not.

### Pixel art looks blurry — fix it once, globally

Pixel art scaled up goes soft and mushy unless Godot is told to be blocky:

**Project → Project Settings → Rendering → Textures → Default Texture Filter → Nearest.**

**You should see:** every pixel art sprite snaps to crisp rectangles. This is a one-time project-wide switch. (It does nothing to smooth art like Kenney's — they're already anti-aliased and look great either way.)

### TileMapLayer — if you're painting a world (optional)

A **TileMapLayer** node lets you paint levels from a tile sheet, one tile at a time. It's powerful, and it's a 20-minute concept — skip it unless your game *is* a painted level. Flat rectangles (`ColorRect` or scaled sprites) are legitimate jam terrain.

## 3D models

### The golden format: `.glb` / `.gltf`

If a 3D pack offers `.fbx`, `.obj`, `.blend` **and** `.glb` — always take **`.glb`**. It's Godot's native-ish exchange format: meshes, materials, even animations, in one small file.

### Placing a model

1. Drag `art/your-model.glb` from the FileSystem **into the 3D viewport** (or onto a node in the Scene tree).
2. Godot creates an **imported scene** — a whole pre-made bag of nodes. Expand it in the Scene tree: inside there's usually a `MeshInstance3D` (the actual shape) plus maybe lights or collision the pack author added.

> **Key insight:** `MeshInstance3D` is the 3D equivalent of `Sprite2D` — "here is the visible shape". The imported *scene* is a wrapper around one or more of those. For simple props, it doesn't matter which you move; for the Coin Rush track you never touch either — primitives come pre-placed.

### Scale: the "invisible or giant" dial

3D packs disagree about size. A character arrives 100× too big (fills the screen, looks invisible because the camera is *inside* it) or 100× too small (a dot). Fix: select the model node → Inspector → **Scale** → try `0.01`, `0.1`, `1` until it fits your arena. In Coin Rush, the whole arena is about **24 units** across — anything you import should be between 0.5 and 2 units tall.

## Sounds and music

### The rule of two formats

| Use | Format | Why |
| --- | ------ | --- |
| Short effects (coin, jump, hit) | **`.wav`** | Small, instant, no decode delay |
| Music loops | **`.ogg`** (or `.mp3`) | Tiny files, made for long tracks |

Drag them into `audio/`. Play any sound in the editor: double-click it in the FileSystem — Godot plays it right there.

### Play a sound: AudioStreamPlayer

1. Add an **AudioStreamPlayer** node anywhere in your scene (for pickup sounds, putting it inside the coin scene is tidy).
2. Drag the `.wav` from the FileSystem into its **Stream** slot.
3. In code, one line plays it:

```gdscript
$CoinSound.play()
```

### Looping music (the step everyone forgets)

Music that stops after 3 seconds is the most common import mistake. The fix is an import setting:

1. Select the music file in the FileSystem (single-click).
2. Open the **Import** dock (top-left tab group, next to Scene).
3. Set **Loop → On**.
4. Click **Reimport**.

**You should see** — after dropping an `AudioStreamPlayer` with that file into your scene and pressing F5 — music that repeats forever. Add an `AudioStreamPlayer` for music to your main scene, assign the track, and it plays from the moment the game starts.

## Fonts

Godot's default font is fine and forgettable. Your downloaded font (a `.ttf` or `.otf` file) changes the whole tone in 30 seconds:

1. Drag the font into `art/`.
2. Select your `ScoreLabel` (or any Label / Button).
3. In the Inspector: **Theme Overrides → Fonts → Font** → drag the `.ttf` in.
4. Right below it: **Theme Overrides → Font Sizes → Font Size** → try `24`.

> **Note:** theme overrides apply **per node**. For a whole game's look you'd make a Theme resource — a Step 8+ skill. Today, override the five labels you actually have.

## Three mini-exercises (do them in order — ~8 min total)

1. **Replace the player's placeholder.** `player.tscn` → `Sprite2D` → new texture. If it's a sheet, set Region or H frames. Adjust **Scale** until the sprite roughly matches the collision shape (the physics body stays the same size — art lies, physics tells the truth).
2. **Add the pickup sound.** Open `coin.tscn` → add an **AudioStreamPlayer** child → name it `PickupSound` → drag your coin `.wav` into its **Stream**. Then update `coin.gd` to match:

```gdscript
extends Area2D

@onready var pickup_sound: AudioStreamPlayer = $PickupSound

func _on_body_entered(_body: Node2D) -> void:
	GameState.add_point()
	pickup_sound.play()
	$CollisionShape2D.set_deferred("disabled", true)
	hide()
```

> **Key insight:** in Step 1 the coin deleted itself (`queue_free()`). A sound played by a deleted node gets cut off mid-ding — so now the coin **hides** instead: still in the scene, invisible and inert, playing its sound to the end. The `set_deferred` line is Godot's way of saying "make this change *after* the current physics step" — you're not allowed to switch a collision shape off from inside the exact moment it was touched.
3. **Add looping music.** One `AudioStreamPlayer` in `main.tscn`, loop switched on in the Import dock, volume (the **Volume DB** slider) pulled down to about `-15` so it sits behind the sound effects.

## Common problems — quick table

| You see | It means | Fix |
| ------- | -------- | --- |
| Blurry, mushy pixel art | Godot smoothing the pixels | Default Texture Filter → **Nearest** (project setting, above) |
| Giant or microscopic sprite | Source resolution vs. game window | Sprite2D **Scale**: try 0.25, 0.5, 2 |
| Whole sprite strip showing, not one frame | Godot showing the full sheet | Tick **Region → Enabled**, set Rect to one frame — or set **H frames** |
| Music plays once and dies | Loop not set | Import dock → **Loop → On** → **Reimport** |
| Model invisible or absurdly huge | Unit-scale mismatch | Model **Scale**: 0.01 / 0.1 / 1; make sure a `Camera3D` exists and is looking at it |
| Dropped a file and nothing appeared | Dropped in the wrong panel, or on some versions the bar was still importing | Drop into the **FileSystem** panel; wait for the import bar; look in the folder you targeted |
| Pink/magenta square where art should be | Texture failed to import | Wait for the import bar; click the file → Import dock → **Reimport**; if persists, the file format is odd — open it in Photopea and re-save as PNG |

## Checkpoint

- [ ] Player (or UI) uses your real art
- [ ] One sound effect plays on pickup
- [ ] Music loops (or you've consciously cut music — legal!)
- [ ] Everything still runs (F5)

Track C explorers: your Coin Rush already imports *nothing* — this step for you is about recognising which node is which. Open `main.tscn`, click each node, and match it against the translation table in [Step 2](/game-jam-step-2-pick-game/).

Next: **[Step 5](/game-jam-step-5-build/)** — the 40-minute build. The big one.
