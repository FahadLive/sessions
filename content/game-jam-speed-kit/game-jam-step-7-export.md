---
layout: libdoc_page.liquid
permalink: /game-jam-step-7-export/
title: Step 7 - Export and Deploy (20 min)
description: Export your Godot 4 game for the web, zip it, and upload it to itch.io in 20 minutes — including the threads/SharedArrayBuffer fix for blank pages and the size settings that stop squashed games.
eleventyNavigation:
    key: Step 7 - Export
    parent: Game Jam Speed Kit
    order: 9
---

# Step 7 (20 min): Export and deploy

The last technical step, and the one that turns a project into a **link**. Do it in this order; every step has one job.

## 0. Two settings before anything (2 min)

**Window size.** Project → Project Settings → **Window** → set **Viewport Width** `960`, **Viewport Height** `540`. (That's also the size you'll tell itch.io in a minute. Any size is legal — just make them match.)

**Renderer.** Step 0 had you pick **Compatibility** — that's the web-friendly one, nothing to do. If your project somehow runs the fancier renderer (3D folks: check Project → Project Settings → Rendering → **Renderer → Rendering Method** says `gl_compatibility`), switch it now and accept the reload. Compatibility is what runs smoothly in browsers, on old laptops, everywhere.

## 1. Add the Web export preset (3 min)

1. **Project → Export…**
2. Click **Add… → Web**.
3. If it complains about missing export templates — that's the Step 0 download; run **Editor → Manage Export Templates** and come back.
4. Leave every setting at its default **except** the viewport suggestion above. The preset remembers everything from now on.

## 2. Export the files (2 min)

1. In the Export dialog, with **Web** selected, click **Export Project**.
2. Make a **new empty folder** — `my-jam-game-web` — and pick it. Tick "Create folder if it doesn't exist" if asked.
3. Don't tick "Export in debug mode" for the final version.

**You should see** that folder fill up: `index.html` plus a handful of `.wasm`, `.js`, `.pck`, `.png` files. `index.html` is the front door; the rest are the engine, sliced for browsers.

> **Key insight:** the export is your whole game, compiled, in one folder. The browser will never see your Godot project — only these files. That's why the next step is a **zip of the folder itself**.

## 3. Zip the folder (1 min)

Right-click the `my-jam-game-web` folder → **Compress** (macOS) / **Send to → Compressed folder** (Windows). You get `my-jam-game-web.zip`. Upload *that*.

## 4. Put it on itch.io (8 min)

1. Go to [itch.io](https://itch.io) → **Publish** (top right) → **Upload new project**.
2. **Title:** the game's name. **Classification:** Game.
3. **Kind of project:** choose **HTML**. New fields appear.
4. **Upload** your zip into the HTML section.
5. **Tick: "This file will be played in the browser"** — this is the switch that makes itch embed your game instead of offering a download. Miss it and you get a download link, not a game.
6. **Viewport width / height:** `960` / `540` — the same numbers you set at the top of this page.
7. **Save** — not "Publish" yet. Drafts are private links; publishing is public. Either is fine today; draft is fine if you're shy.
8. Open the project page (the **View** button or your dashboard). **The game should be embedded and playable right there.**

> **Note:** first load takes a few seconds — the engine downloads. itch.io shows a blank frame during this, then your game appears. Patience is part of the test.

## 5. The two-minute finishing kit

Your page is what strangers see. Minimum viable page:

- **Thumbnail:** screenshot of the game running (macOS: `Cmd+Shift+4`; Windows: Win+Shift+S). Drag it into the cover slot.
- **Controls line** in the description: `Arrows/WASD to move. Collect coins. Don't touch the red.`
- **One sentence** of what it is: "A 3-hour game jam game about collecting your quota before the clock wins."

## 6. Test the link somewhere else (3 min)

Open your itch.io URL **on your phone** (or a second machine). Play a round.

- Page loads and the game runs → you're done. **Send the link to one human.**
- Phone can't run it? Fine — note it in the description ("desktop only, needs a keyboard") and test on any other computer you can find.

## Checkpoint

- [ ] A URL — public or draft — that plays your game in a browser
- [ ] Controls and a screenshot on the page
- [ ] Touched once on a second device

**Congratulations — you shipped.** That's the whole loop: idea → assets → build → polish → deploy, in one sitting. The rest of today is optional and fun.

## When it goes wrong — the usual five

```text
Blank white page, or the browser console (F12) screams about SharedArrayBuffer.
```

> **Note:** the almost-certain fix: your export used **threads**, and itch.io doesn't send the special headers threads require. **Project → Export → Web → uncheck "Thread Support Available"** → **Export Project again** → re-zip → re-upload. Single-threaded exports run everywhere, slightly slower — perfect for jam games.

```text
No sound until I click on the page.
```

> **Note:** not a bug — it's every browser's **autoplay policy**. Browsers refuse to play audio the user didn't ask for, so your game stays silent until the player clicks inside the frame once. Nothing to fix; mention "click the game first" in your description if it confuses people.

```text
Game is squashed, stretched, or tiny on the page.
```

> **Note:** itch viewport ≠ Godot viewport. Make them identical: Project Settings → Window (`960×540`) and the itch HTML embed settings (`960×540`). Re-upload after changing the itch side — it's instant.

```text
"Export templates are missing" when adding the Web preset.
```

> **Note:** the Step 0 download. **Editor → Manage Export Templates → Download and Install** (or **Install from File** if you have the package on a USB stick).

```text
Upload worked but the frame stays blank forever.
```

> **Note:** in order of guilt: the threads setting above; you zipped the *contents* instead of the folder (itch needs the zip to contain `index.html` at or near the top level); stale cache — open the page in a private window.

Fuller list: the [troubleshooting table](/game-jam-troubleshooting/).

Next: **[Step 8](/game-jam-step-8-next/)** — the comedown, and what's next.
