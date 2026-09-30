---
layout: libdoc_page.liquid
permalink: /godot-setup/
title: Setup - Install Godot & Open the Starter
description: Install Godot 4.6, download the pre-configured starter project, import it, and press F5 — a five-minute setup so nobody loses workshop time to downloads.
eleventyNavigation:
    key: Setup
    parent: Godot Platformer Workshop
    order: 2
---

# Setup: Install Godot & open the starter

Do this **before the workshop starts**, ideally on your own wifi. It's five minutes, and it means nobody in the room is waiting on a download while everyone else starts.

## Step 1 — Install Godot 4.6

Go to [godotengine.org/download](https://godotengine.org/download) and get the standard build for your operating system.

- **Windows** — download the `.zip`, extract it anywhere, double-click `Godot_v4.6-stable_win64.exe`.
- **macOS** — download the `.zip`, extract it, and drag `Godot.app` into your **Applications** folder, then open it. macOS may ask you to confirm it's from a developer — click **Open** → **Open** in the dialog that appears.
- **Linux** — download and make it executable, then run it from a terminal.

> **Note:** pick the **standard** build, not the .NET (C#) build. You want plain GDScript, which is the default.

Open it. The first launch shows the **Project Manager** — a window with a big **Import** button in the top right. This is Godot's home screen; you'll see it every time you open the app.

## Step 2 — Download the starter project

The starter project is a single zip. It already contains the sprites, the sounds, the fonts, a working tileset with collision, and your project settings. **There is nothing to configure.**

<div class="d-flex fw-wrap gap-3" rgap-3="xs">
  <a href="/assets/godot-platformer/godot-platformer-starter.zip" download class="btn btn-primary">⬇ Download the starter project</a>
</div>

**Windows** — right-click the zip → **Extract All** → pick a folder → **Extract**. You'll get a folder called `starter-project`.

**macOS** — double-click the zip. It expands into a folder called `starter-project`.

Then **rename** that folder to something you'll recognise later, like `my-platformer`. This is optional but saves confusion when you have three Godot projects in your Project Manager.

> **Key insight:** rename the *folder* `starter-project`, but do **not** rename or move things *inside* it. Godot stores paths inside its project files, and moving files around inside a project is a good way to break it for no reason. If Godot ever complains that a file is missing, it's almost always because you moved something.

## Step 3 — Import it into Godot

1. In the **Project Manager**, click **Import** (top right).
2. Click **Browse**, find `project.godot` inside your `starter-project` folder, and select it.
3. Click **Import & Edit**.

Godot starts importing your images and sounds. You'll see a progress bar in the bottom-right corner. **Wait for it to finish** — usually under ten seconds. Skipping this is what causes the "pink squares instead of a knight" problem.

## Step 4 — Press F5

You should see a game window: a black screen, nothing in it.

That black screen is **correct**. Your `game.tscn` has one empty node called `Level` in it, and nothing painted on it yet. If you see a window at all, you're set.

If Godot asks *"Select a main scene to run"* — pick `game.tscn` and tick **Set as Main Scene**.

## Quick sanity check

Before you walk in, make sure these three things are true:

- [ ] `project.godot` opens without a red error bar
- [ ] The bottom-right import progress bar finished
- [ ] Pressing `F5` opens a game window (even if it's black)

That's it. You're ready.

> **Note:** Godot autosaves your scene, but `Ctrl+S` / `Cmd+S` is still worth pressing after every meaningful change. A crash in the editor with unsaved work is the one genuinely unrecoverable thing that can happen in this workshop. If the editor crashes, reopen it and the autosave usually has you covered.

## If something goes wrong

```text
"project.godot: The following feature tags are present in the project: 4.6..."
```

> **Note:** harmless. Your Godot is a slightly different 4.x patch version than the one the starter was saved with. Click **Yes** / **Fix** and carry on.

```text
The file "res://assets/sprites/knight.png" does not exist.
```

> **Note:** you almost certainly renamed or moved files *inside* the project. Delete the folder and unzip the starter again.

```text
A window titled "Godot Engine" appears and closes instantly.
```

> **Note:** something in your script has an error. Look at the **Output** panel at the bottom of the editor — press `F5` again and read the red text. If it's not obvious, ask a helper.

Start with **[Phase 1](/godot-phase-1-level/)** — the level.
