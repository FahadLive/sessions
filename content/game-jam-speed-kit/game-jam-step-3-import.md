---
layout: libdoc_page.liquid
permalink: /game-jam-step-3-import/
title: Step 3 - Import Assets into Godot (30 min)
description: "Drag art, sound, music and a font into Godot 4, fix blurry pixel art, slice a sprite sheet, paint a level with TileMapLayer, and make music loop, in three hands-on exercises that turn your boxes into a game."
eleventyNavigation:
    key: Step 3 - Import Assets
    parent: Game Jam Speed Kit
    order: 6
---

# Step 3 (30 min): Import assets into Godot

Your game works with boxes. Now it gets its real face. This is **pass 3 (pretty)** starting.

**Before you start:** unzip <a href="/assets/game-jam-speed-kit/coin-rush-assets.zip" download>coin-rush-assets.zip</a> (the asset pack from [Step 2](/game-jam-step-2-assets/)). You get a folder `coin-rush-assets` containing `art`, `audio`, `ui`, a `CREDITS-lines.txt` and a `licenses` folder.

> **Note:** **importing** means Godot reads your file and converts it into something it can use fast. It happens automatically when a file lands in the project folder. You'll see a short progress bar.

## 3.1 Organize first (2 min)

**Do this:** in the FileSystem panel, right-click `res://` (the very top item) → **New Folder…** → name it `art` → OK. Repeat for `audio` and `ui`.

**You should see** five folders: `art`, `audio`, `scenes`, `scripts`, `ui`. (`scenes` and `scripts` were already there.)

```text
coin-rush-starter/
├── art/       ← pictures
├── audio/     ← sounds and music
├── scenes/    ← the saved building blocks of the game
├── scripts/   ← the code
└── ui/        ← fonts, buttons, menus
```

> **Key insight:** a messy project costs you minutes every hour. Five folders, made on day one, is the whole system.

## 3.2 Drag files in (3 min)

**Do this:** open the unzipped `coin-rush-assets` folder in your file manager. Drag the files from its `art` folder into Godot's `art` folder, the files from `audio` into `audio`, and the font from `ui` into `ui`. Drop them **onto the folder** in the FileSystem panel.

**You should see** a progress bar in the corner, then your files listed inside each folder, each with a small thumbnail or waveform icon.

Now paste the credits.

**Do this:** open `CREDITS-lines.txt` from the pack, copy everything, paste it under your Tiny Dungeon block in `CREDITS.txt` (delete the duplicate Tiny Dungeon block), and save.

## 3.3 Fix blurry pixel art (2 min)

By default Godot smooths pictures when it scales them, which is perfect for photos and terrible for pixel art. The fix is one setting.

**Do this:** **Project → Project Settings** → in the left list open **Rendering → Textures** → find **Canvas Textures → Default Texture Filter** → set it to **Nearest**. (Can't see it? Turn on **Advanced Settings** at the top right of the window.) Close.

**You should see** nothing yet. That's fine. You'll notice the difference in the next step.

> **Key insight:** **Nearest** means "when you enlarge a pixel, keep it a sharp square". **Linear** (the default) blends neighbours, so pixel art turns to mush. Do this once per project.

## Exercise 1: replace the player box with a real sprite (8 min)

A **sprite** is a picture that's a game object. The node for it is **Sprite2D**.

**Do this:**

1. Open `scenes/player.tscn` (double-click it).
2. Click `Visual` (the blue box) → press **Delete** (**Backspace** on a Mac).
3. Right-click `Player` (the root) → **Add Child Node** → search `Sprite2D` → **Create**.
4. Rename it `Visual` (select it, press **F2**).
5. In the Inspector, drag `art/tiny_dungeon_tilemap.png` from the FileSystem into the **Texture** box.

**You should see** the **whole sheet** (all 130 tiles) in the viewport, where your player should be. That's right: the file is a **sprite sheet**, many pictures in one file.

**Now slice it.** In the Inspector, open **Animation** and set:

| Setting     | Value | Why                                              |
| ----------- | ----- | ------------------------------------------------ |
| **Hframes** | `12`  | The sheet is 12 tiles wide                       |
| **Vframes** | `11`  | …and 11 tiles tall                               |
| **Frame**   | `85`  | Which tile to show: row 7, column 1 (7 × 12 + 1) |

**You should see** one tiny knight, with crisp edges.

![The player scene with a Sprite2D showing a single knight sprite with sharp pixels.](/assets/game-jam-speed-kit/previews/shot-sprite-imported.webp)

Press **F5** and walk around. **You should see** your knight moving through the arena.

> **Note:** to pick a different character, change **Frame**. The formula is `row × 12 + column`, counting from 0. Try `84`, `86`, `87`. The enlarged sheet in [Step 2](/game-jam-step-2-assets/) helps you find tiles.

**Do the same for the other two:**

| Scene                | Delete the `Visual` polygon and add a `Sprite2D` named `Visual` with the same texture, Hframes 12, Vframes 11, and… |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `scenes/hazard.tscn` | **Frame** `120` (a bat)                                                                                             |
| `scenes/coin.tscn`   | **Frame** `102` (a silver token). _The optional bonus below animates it_                                            |

Press **F5**. **You should see** a knight, a bat swinging across the arena and five silver tokens.

### Bonus: a spinning coin with AnimatedSprite2D (5 min, if you have time)

`AnimatedSprite2D` plays a list of frames like a flip book.

**Do this:** in `scenes/coin.tscn`, delete `Visual`, then add a child **AnimatedSprite2D** named `Visual`. In the Inspector set **Sprite Frames → New SpriteFrames**, then click it to open the **Sprite Frames** panel at the bottom. Click the **grid icon** ("Add Frames from Sprite Sheet"), pick `art/coin_spin.png`, set **Horizontal** `4`, **Vertical** `1`, select all four frames, and click **Add Frame(s)**. Set the speed to `8` FPS and turn on **Autoplay on Load** (the icon with the arrow).

**You should see** the coin squash and flip as it spins.

## Exercise 2: paint the level with TileMapLayer (7 min)

A **tileset** is a picture split into reusable squares. A **TileMapLayer** node lets you paint those squares onto a grid, like colouring squared paper.

**Do this:**

1. Open `scenes/main.tscn`. In the Scene panel, **delete** `Walls` and `Floor` (the grey rectangles).
2. Right-click `Main` → **Add Child Node** → **TileMapLayer** → **Create**.
3. **Drag the `TileMapLayer` to the top of the child list**, above the coins. Nodes draw in list order, and anything added last would hide your player and coins.
4. In the Inspector: **Tile Set → New TileSet**. Click it to open the settings, and check **Tile Size** is `16, 16`.
5. Open the **TileSet** panel at the bottom. Drag `art/tiny_dungeon_tilemap.png` into it. When it asks about **automatically creating tiles**, click **Yes**.
6. Switch to the **TileMap** tab next to it. **You should see** the whole sheet as a palette.

Now paint.

1. Click the floor tile (the plain orange one: row 4, column 5).
2. Pick the **Rectangle** tool (the toolbar above the viewport) and drag it over the whole screen area. **You should see** the arena fill with sand.
3. Click the brick wall tile (row 4, column 9) and use the **Line** tool along the edges to draw a border.

Press **F5**.

**You should see** a sandy dungeon room with brick walls, a knight, bat and tokens.

> **Key insight:** the painted walls are only _pictures_. The real invisible walls are the `WallBodies` collision shapes you didn't delete. Pictures and physics are separate, which is why a game can look like anything and still play the same.

## Exercise 3: add a pickup sound (5 min)

**Audio formats in one line:** use **WAV** for short sound effects (plays instantly), **OGG** for music (small file for long audio). MP3 also works.

**Do this:**

1. In `scenes/main.tscn`, right-click `Main` → **Add Child Node** → **AudioStreamPlayer** → name it `CoinSound`.
2. Drag `audio/sfx_coin.wav` into its **Stream** box in the Inspector.
3. Open `scripts/main.gd` and add these to the file:

```gdscript
@onready var coin_sound: AudioStreamPlayer = $CoinSound
```

(near the top, under `extends Node2D`) and this line **inside** `_ready()`:

```gdscript
	GameState.score_changed.connect(func(_score): coin_sound.play())
```

Press **F5** and grab a coin.

**You should see** (and **hear**) a blip every time the score goes up. Turn your volume up.

> **Note:** why isn't the sound on the coin itself? Because `queue_free()` deletes the coin, and its sound with it, mid-beep. A sound that has to outlive a thing lives somewhere that isn't deleted. Here it's on `Main`.

## Exercise 4: add looping music (3 min)

**Do this:**

1. Add another **AudioStreamPlayer** to `Main`, named `Music`.
2. Drag `audio/music_level1.ogg` into **Stream**. Set **Volume dB** to `-12` so it sits below the sound effects, and turn on **Autoplay**.
3. Make it loop. In the FileSystem click `audio/music_level1.ogg` once, open the **Import** tab (next to the Scene tab, top-left), tick **Loop**, and click **Reimport**.

**You should see** music start by itself when you press **F5**, and keep playing when it ends.

> **Note:** looping is a property of the **file's import**, not of the player. If music plays once then goes quiet, it's almost always the Import tab.

## Exercise 5: a font for the HUD (3 min, if you have time)

**Do this:** open `scenes/main.tscn`, click `HUD/ScoreLabel`. In the Inspector open **Theme Overrides → Fonts**, drop `ui/KenneyPixel.ttf` into **Font**. Under **Font Sizes** set **Font Size** `16`. Under **Constants** set **Outline Size** `3`. Under **Colors** set **Font Outline Color** to black. Repeat on `HUD/Message`.

**You should see** a crisp pixel font with a black outline that's readable over any background.

> **Key insight:** an outline is the cheapest way to make text readable on a busy background. Games do it everywhere.

## Checkpoint

- [ ] The knight, bat and tokens are real sprites, crisp, not blurry
- [ ] The room is painted with a TileMapLayer
- [ ] A blip plays on every coin, and music loops
- [ ] The HUD uses a pixel font (if you got to it)
- [ ] `CREDITS.txt` lists the art, sound, music and font

> **Note:** **Reminder:** every time you add an asset from now on, add a credits block in the same minute.

## When it goes wrong

```text
My pixel art is blurry.
```

> **Note:** Project Settings → Rendering → Textures → Canvas Textures → **Default Texture Filter → Nearest**. Then restart the game.

```text
I see the whole sprite sheet, not one character.
```

> **Note:** set **Hframes** `12`, **Vframes** `11`, and pick a **Frame** under **Animation**.

```text
The file shows in FileSystem, but nothing appears in the game.
```

> **Note:** a file in FileSystem isn't in your scene. Drag it into the scene or into a node's **Texture** field. Also check the node isn't hidden behind your `TileMapLayer`. It must be **above** the actors in the list, i.e. first.

```text
The music plays once and stops.
```

> **Note:** click the file → **Import** tab → tick **Loop** → **Reimport**.

More in the [troubleshooting table](/game-jam-troubleshooting/).

Next: **[Step 4: Polish](/game-jam-step-4-polish/)**.
