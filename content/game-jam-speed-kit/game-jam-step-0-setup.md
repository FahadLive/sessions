---
layout: libdoc_page.liquid
permalink: /game-jam-step-0-setup/
title: Step 0 - Setup (10 min)
description: "Install Godot 4.6, download the export templates and the Coin Rush starter project, make an itch.io account, and press F5, in ten minutes, before anyone has to wait on a download."
eleventyNavigation:
    key: Step 0 - Setup
    parent: Game Jam Speed Kit
    order: 3
---

# Step 0 (10 min): Setup

Do this **before the session if you can**, on a good connection. Everything here protects the other 170 minutes.

> **Note:** no install possible on your machine? You can try Godot in a browser tab at the [Godot web editor](https://editor.godotengine.org/releases/latest/). It's fine for poking around, but use the desktop app for the session: it's what this guide and the facilitator expect, and it's the one that can export your game.

## 1. Get Godot 4.6

**Do this:** open the [Godot 4.6 download page](https://godotengine.org/download/archive/4.6.3-stable/) and download the **standard** build for your computer (not the .NET one).

| Your computer | Do this                                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| **Windows**   | Download the `.zip`, right-click → **Extract All**, double-click `Godot_v4.6-stable_win64.exe`                 |
| **macOS**     | Download the `.zip`, double-click it, drag `Godot.app` into **Applications**, open it (**Open** if macOS asks) |
| **Linux**     | Download the `.zip`, extract it, make the file executable, run it                                              |

**You should see:** a window called the **Project Manager**, Godot's home screen, with an **Import** button at the top right.

![The Godot Project Manager: an empty project list with Create, Import and other buttons on the right.](/assets/game-jam-speed-kit/previews/shot-project-manager.webp)

> **Note:** there is no installer. Godot is one program you can run from anywhere, even a USB stick. That's why it's such a good jam engine.

## 2. Get the export templates

Export templates are the pre-built engine pieces Godot needs to turn your project into a web game. Downloading them in Step 5 is a sad way to spend minute 140, so do it now.

**Do this:** in the Project Manager, open the **Editor** menu → **Manage Export Templates…** → **Download and Install**.

**You should see:** a progress bar, then a message that the templates are installed. (It's a few hundred MB, which is why we do it now.)

> **Note:** no internet at the venue? Ask the facilitator. There should be a copy to install with **Install from File**.

## 3. Make a free itch.io account

**Do this:** go to [itch.io](https://itch.io) → **Register**, and pick a username. Check your email if it asks you to confirm.

**You should see:** your itch.io dashboard. This is where your game will live in Step 5.

## 4. Get the starter project

<div class="d-flex fw-wrap gap-3" rgap-3="xs">
  <a href="/assets/game-jam-speed-kit/coin-rush-starter.zip" download class="btn btn-primary">⬇ Download the Coin Rush starter (8 KB)</a>
</div>

**Do this:** unzip it. **Windows:** right-click → **Extract All**. **macOS:** double-click.

**You should see:** a folder called `coin-rush-starter`. Move it somewhere you'll find again (Documents is fine).

> **Key insight:** don't rename or move files _inside_ the project. Godot stores file paths in its project files, and moving things behind its back is the easiest way to break a project.

## 5. Open it and press F5

**Do this:**

1. In the Project Manager, click **Import**.
2. **Browse** to `coin-rush-starter/project.godot` → **Open** → **Import & Edit**.
3. Wait for the import bar in the bottom-right corner to finish.
4. Press **F5** (Run Project).

**You should see:** a game window with a dark arena, a **blue box** near the bottom, a red box in the middle, five yellow diamonds and a **Coins: 0** label. The blue box won't move yet. That is correct. You fix it in Step 1.

![The running starter: a dark arena with a blue box at the bottom, a red box in the middle and yellow diamonds.](/assets/game-jam-speed-kit/previews/shot-first-run.webp)

Press **F8** (or close the window) to stop the game.

## Your first look at the editor

You don't need to learn it all. Find these four things:

| Where                        | What it is                                                 |
| ---------------------------- | ---------------------------------------------------------- |
| **Scene** (top-left)         | The tree of **nodes**: the building blocks of your game    |
| **FileSystem** (bottom-left) | Every file in your project: scenes, scripts, art, sound    |
| **Inspector** (right)        | The settings of whichever node you've selected             |
| **Output** (bottom)          | Where Godot prints errors and messages. Red text goes here |

> **Note:** a **node** is one building block (a sprite, a sound player, a collision shape). A **scene** is a saved group of nodes, like a LEGO model you can reuse. Your whole game is scenes made of nodes.

## Checkpoint

- [ ] Godot 4.6 opens
- [ ] Export templates installed
- [ ] itch.io account created
- [ ] The starter opens, and **F5** shows the arena
- [ ] You pressed **Ctrl+S** (**Cmd+S** on Mac) at least once

## If something goes wrong

```text
"Export templates" download fails or hangs.
```

> **Note:** try a different network, or use **Install from File** with a copy from the facilitator.

```text
Godot won't open on macOS: "unidentified developer".
```

> **Note:** right-click the Godot app → **Open** → **Open**. It's a one-time permission.

```text
The project says it was saved with a different 4.x version.
```

> **Note:** harmless. Click **OK** or **Fix** and carry on.

```text
F5 asks me to select a main scene.
```

> **Note:** pick `scenes/main.tscn` and click **Select Current**. That's the scene the game starts from.

Next: **[Step 1: Build the core](/game-jam-step-1-build-core/)**.
