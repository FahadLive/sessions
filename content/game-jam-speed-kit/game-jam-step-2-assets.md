---
layout: libdoc_page.liquid
permalink: /game-jam-step-2-assets/
title: Step 2 - Find Assets and Check Licenses (25 min)
description: "Where to find free art, sound, music and fonts for a game jam, how to read a license in five minutes, and how to keep a CREDITS.txt. You download one real pack from Kenney and log it."
eleventyNavigation:
    key: Step 2 - Find Assets
    parent: Game Jam Speed Kit
    order: 5
---

# Step 2 (25 min): Find assets and check licenses

An **asset** is any file your game uses that isn't code: pictures, sounds, music, fonts. Making them from scratch is slow. Using free ones from the sites below is how jam entries look and sound good in a weekend.

This step has two parts: **where to look** (10 min) and **what the license lets you do** (5 min). Then you download a real pack and start your `CREDITS.txt` (10 min).

## Where to find assets

| Site | Good for | License type | Link |
| ---- | -------- | ------------ | ---- |
| **Kenney** | Art, UI, audio, fonts, 2D **and 3D**. Consistent style across packs | **CC0** on all of it | [kenney.nl/assets](https://kenney.nl/assets) |
| **itch.io assets** | Huge range of art packs, tilesets, sounds | **Varies per pack**. Read each page | [itch.io/game-assets/free](https://itch.io/game-assets/free) |
| **OpenGameArt** | Art, music, sound effects, searchable by license | **Varies per file** (CC0, CC-BY, others) | [opengameart.org](https://opengameart.org) |
| **Freesound** | Sound effects: footsteps, impacts, ambience | **Varies per sound**. Some are non-commercial, so check | [freesound.org](https://freesound.org) |
| **Pixabay** | Music and sound effects | Pixabay's own license. Read it once | [pixabay.com/music](https://pixabay.com/music/) |
| **Google Fonts** | Fonts of every style | Mostly the SIL Open Font License | [fonts.google.com](https://fonts.google.com) |
| **Godot AssetLib** | Plugins and add-ons, **inside the Godot editor** (the **AssetLib** tab at the top) | Per add-on, mostly MIT | _Open Godot → AssetLib tab_ |

> **Key insight:** if you're short on time, **start with Kenney**. Everything is CC0, so there is nothing to worry about, and the packs match each other. Your game won't look like a collage.

### Where to look for what

| You need…                     | Look here first                                            | Search words to try                  |
| ----------------------------- | ---------------------------------------------------------- | ------------------------------------ |
| **Player sprites** (characters) | Kenney 2D packs, itch.io assets                           | "tiny dungeon", "characters", "pixel hero" |
| **Tilesets** (a grid of floor and wall pictures) | Kenney, itch.io assets                  | "tileset", "tiny town", "dungeon"    |
| **UI buttons and panels**     | Kenney UI packs                                            | "UI pack", "buttons"                 |
| **Backgrounds**               | OpenGameArt, itch.io assets                                | "parallax", "background", "sky"      |
| **Jump, hit, pickup sounds**  | Kenney audio packs; make your own in [Step 4](/game-jam-step-4-polish/) | "digital audio", "interface sounds" |
| **Background music**          | OpenGameArt (filter by CC0), Pixabay                       | "chiptune loop", "8-bit", "loop"     |
| **Fonts**                     | Kenney Fonts, Google Fonts                                 | "pixel font"                         |
| **Particle effects**          | Skip downloading. Godot makes them ([Step 4](/game-jam-step-4-polish/)) | n/a                       |

## Licenses in 5 minutes

A **license** is the creator's rule for what you may do with their work. Free to download does **not** mean free to do anything with.

| You see                     | It means                                              | In a jam            |
| --------------------------- | ----------------------------------------------------- | ------------------- |
| **CC0** (public domain)     | Use freely. No credit needed                          | ✅ Always fine      |
| **CC-BY**                   | Use freely, but **credit the creator**                | ✅ Fine. Credit them |
| **Non-commercial** ("NC")   | Not for anything that earns money                     | ⚠️ Avoid unless the jam allows it |
| **No derivatives** ("ND")   | You may not change the asset (even recolour it)       | ⚠️ Avoid. You'll want to tweak |
| **No license shown**        | You have no permission                                | ❌ Don't use it     |

> **Note:** credit is polite even when it's not required. Kenney asks for it but doesn't force it, and creators remember who credited them.

### Three habits that protect you

1. **Write it down the moment you add an asset.** That's `CREDITS.txt`, below. Doing it later means doing it never.
2. **Read the license on the asset's own page.** Never trust a memory, a forum comment, or an AI chat for it. The page is the source of truth.
3. **Check the jam's own rules about AI-generated assets before you use any.** Some jams ban them, some require you to say so. When in doubt, don't.

## Hands-on: download a real pack and start CREDITS.txt (10 min)

**Do this:**

1. Open [Kenney's Tiny Dungeon page](https://kenney.nl/assets/tiny-dungeon).
2. Read the license line on the page. **You should see** "Creative Commons CC0".
3. Click **Download** (if a donation prompt appears, you can continue without donating).
4. Unzip the file.

**You should see** a folder with `Tilemap/tilemap_packed.png` inside, a picture holding about 130 small 16×16 pixel tiles: heroes, monsters, walls, items.

![The Tiny Dungeon tilemap: a grid of 16-pixel pixel-art tiles including knights, a bat, chests and brick walls.](/assets/game-jam-speed-kit/previews/tiny-dungeon-tilesheet.png)

_The Tiny Dungeon tilesheet, enlarged 4× (CC0, by Kenney)._

> **Note:** no wifi, or the download is slow? Use the backup: <a href="/assets/game-jam-speed-kit/coin-rush-assets.zip" download>coin-rush-assets.zip</a> (2.5 MB). It has the same tilesheet, plus sound effects, a music track and a pixel font, all CC0. You'll need it for Step 3 anyway.

Now start your credits.

**Do this:**

1. Open the Godot project's FileSystem panel. Double-click `CREDITS.txt`.
2. Add one block for the pack you just downloaded:

```text
Asset:    Tiny Dungeon
Author:   Kenney
Link:     https://kenney.nl/assets/tiny-dungeon
License:  CC0 1.0
```

3. Save (**Ctrl+S** / **Cmd+S**).

**You should see** your first credit in a plain text file that lives inside the project. In Step 3, the asset pack also comes with ready-made lines (`CREDITS-lines.txt`) to paste for the sound, music and font.

> **Key insight:** four fields, every time: **asset, author, link, license**. When you upload to itch.io you paste this file into the description, and the legal side of your game is done.

## Checkpoint

- [ ] You can name three sites to look for art, and one for sound
- [ ] You can say what CC0, CC-BY and "non-commercial" mean
- [ ] Tiny Dungeon (or the backup asset pack) is on your computer
- [ ] `CREDITS.txt` has a Tiny Dungeon block in it

Next: **[Step 3: Import assets](/game-jam-step-3-import/)**, after the break.
