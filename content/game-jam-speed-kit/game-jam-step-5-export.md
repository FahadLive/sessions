---
layout: libdoc_page.liquid
permalink: /game-jam-step-5-export/
title: Step 5 - Export and Deploy (20 min)
description: "Export your Godot 4 game for the web, zip it correctly, upload it to itch.io, and test the link on another device in 20 minutes, with the fixes for blank pages, squashed games and missing sound."
eleventyNavigation:
    key: Step 5 - Export and Deploy
    parent: Game Jam Speed Kit
    order: 8
---

# Step 5 (20 min): Export and deploy

This turns your project into a **link**. Do it in this order, and every step has one job.

> **Key insight:** the browser never sees your Godot project. It only gets the **exported files**, your game compiled with a small engine. That's why we export first and upload second.

## 5.1 Check two settings (2 min)

**Window size.** The starter is already set to **960 × 540** (Project → Project Settings → Display → Window). Remember this number. You'll type it into itch.io.

**Renderer.** Look at the top-right corner of the editor. It should say **Compatibility**. (It's also in **Project Settings → Rendering → Renderer → Rendering Method**, as `gl_compatibility`.) That's the renderer that runs smoothly in browsers.

**You should see** `960` and `540`, and the word **Compatibility**.

## 5.2 Add the Web export preset (3 min)

**Do this:**

1. **Project → Export…**
2. Click **Add…** → choose **Web**.
3. In the options on the right, make sure **Thread Support** is **unticked**.

**You should see** a **Web** entry in the preset list. If a red warning mentions missing export templates, go to **Editor → Manage Export Templates → Download and Install** (that was Step 0).

![The Export dialog with a Web preset selected and an Export Project button at the bottom.](/assets/game-jam-speed-kit/previews/shot-export-dialog.webp)

> **Note:** **Thread Support** off means the game runs on every site and device, a little slower in theory, not noticeable for a game like this.

## 5.3 Export the files (3 min)

**Do this:**

1. Make a **new empty folder** on your Desktop called `coin-rush-web`.
2. In the Export dialog click **Export Project…**
3. **Untick** "Export With Debug". Pick your `coin-rush-web` folder and name the file **`index.html`** exactly.
4. Click **Save**.

**You should see** the folder fill with `index.html` plus several `.js`, `.wasm`, `.pck` and `.png` files.

> **Key insight:** the file **must** be called `index.html`. itch.io looks for that name to start your game.

## 5.4 Zip it (1 min)

**Do this:**

- **Windows:** open the folder, **Ctrl+A** to select everything, right-click → **Send to → Compressed (zipped) folder**.
- **macOS:** open the folder, **Cmd+A**, right-click → **Compress N Items**.

**You should see** a `.zip` file. Open it. **`index.html` must be right there at the top**, not inside another folder.

> **Note:** zip the **contents**, not the folder around them. itch.io needs `index.html` at the top level of the zip.

## 5.5 Upload to itch.io (8 min)

**Do this:**

1. Go to [itch.io](https://itch.io), sign in, and open your **dashboard** → **Create new project**.
2. **Title:** `Coin Rush` (or your own name). **Kind of project:** **HTML**.
3. **Uploads:** click **Upload files** → pick your zip. When it finishes, tick **"This file will be played in the browser"**.
4. **Embed options:** viewport width `960`, height `540`. Tick the fullscreen button if you like.
5. **Description:** write one sentence, a controls line, and **paste in your `CREDITS.txt`**.
6. **Cover image:** use a screenshot of your game (**Win+Shift+S** on Windows, **Cmd+Shift+4** on macOS).
7. At the bottom, set **Visibility** to **Public** (or **Restricted** if you only want to share the link), then click **Save**.
8. Click **View page**.

**You should see** your game, embedded and playable, right on your itch.io page.

![The itch.io project form with Kind of project set to HTML and the played-in-the-browser box ticked.](/assets/game-jam-speed-kit/previews/shot-itch-upload.webp)

> **Note:** the first load takes a few seconds while the engine downloads. A blank frame for a moment is normal.

> **Note:** itch.io's form changes sometimes. If a label looks different, look for the closest words and ask the facilitator.

## 5.6 Test it somewhere else (3 min)

**Do this:** open your itch.io link on a **second device**: your phone or another laptop. Click inside the game, then play a round.

**You should see** the same game, at the same size. Win once, lose once, and restart with Space.

> **Note:** a phone has no keyboard, so Coin Rush is **desktop only**. Say so in your description: "Arrow keys or WASD to move. Space to restart." That's normal for jam games.

**Now send the link to one real person.**

## When it goes wrong

```text
Blank white page, or the console (F12) mentions SharedArrayBuffer.
```

> **Note:** your export used **threads**. In **Project → Export → Web**, untick **Thread Support**, export again, re-zip, and upload the new zip.

```text
The page stays blank forever.
```

> **Note:** in order: Thread Support (above) → you zipped the _folder_ instead of its contents → open the page in a private window in case of a cached copy.

```text
The game is squashed, stretched or tiny.
```

> **Note:** the itch.io viewport must match your game's: `960` × `540`. Change it in the project's **Edit** page and save.

```text
No sound until I click on the page.
```

> **Note:** not a bug. Browsers block audio until the player clicks. Add "click the game first" to your description.

```text
"Export templates are missing".
```

> **Note:** **Editor → Manage Export Templates → Download and Install** (or **Install from File**).

## Checkpoint

- [ ] A link that plays your game in a browser
- [ ] A controls line, a screenshot and your credits on the page
- [ ] You tested it on a second device
- [ ] You sent it to one human

**Congratulations. You shipped.**

Next: the **[3D showcase](/game-jam-3d-showcase/)**, with the same game in 3D.
