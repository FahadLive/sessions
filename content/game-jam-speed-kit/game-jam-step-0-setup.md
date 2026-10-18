---
layout: libdoc_page.liquid
permalink: /game-jam-step-0-setup/
title: Step 0 - Setup (10 min)
description: Install Godot 4.6 with no installer, download export templates up front, create a free itch.io account, and make a project with art/audio/scenes/scripts folders.
eleventyNavigation:
    key: Step 0 - Setup
    parent: Game Jam Speed Kit
    order: 2
---

# Step 0 (10 min): Setup

Everything in this step exists to protect the other 170 minutes. Four moves: get Godot, get the export templates, get an itch.io account, make the project.

## 1. Get Godot 4.6 (3 min)

Go to the [Godot download page](https://godotengine.org/download/archive/4.6.3-stable/) and get the **standard** build for your computer.

- **Windows** — download the `.zip`, extract it anywhere, double-click `Godot_v4.6-stable_win64.exe`.
- **macOS** — download the `.zip`, extract it, drag `Godot.app` into **Applications**, open it. If macOS asks, click **Open** → **Open**.
- **Linux** — download, make executable, run it.

> **Note:** pick the **standard** build, not .NET (C#). We're using GDScript, which is Godot's built-in language.

The first window you see is the **Project Manager** — Godot's home screen. You'll pass through it every session.

## 2. Download the export templates NOW (3 min)

Export templates are the pre-built engine bits Godot needs to turn your project into a browser download. If you skip this, Step 7 stops dead — and downloading them at minute 150 is a sad way to end a jam.

1. In the Project Manager, go to **Editor → Manage Export Templates…**
2. Click **Download and Install**.
3. Wait for the progress bar. It's a few hundred MB — this is exactly why we're doing it now.

> **Key insight:** the Godot editor you run games in is *not* the same as the files a browser needs. Templates bridge that gap. Ten minutes of download now buys a stress-free export later.

## 3. Make a free itch.io account (2 min)

1. Go to [itch.io](https://itch.io) and click **Join**.
2. Username, email, password. Nothing else.

This is the site your game will live on. An account takes two minutes now and saves ten later when you're tired and typing at minute 165.

> **Note:** while you're there, have a look around — itch.io is where most of the world's jam games are published. Yours joins them today.

## 4. Create the project (2 min)

1. In the Project Manager, click **New Project**.
2. **Project name:** something lowercase with no spaces, like `my-jam-game`. Spaces and capitals cause real, boring problems later.
3. **Project path:** anywhere you'll find it again. Make a new folder called `game-jam` inside Documents or Desktop and put it there.
4. **Renderer:** choose **Compatibility**. (It's the middle option.)
5. Click **Create & Edit**.

> **Key insight:** **Compatibility** is the renderer that runs everywhere — old laptops, school machines, and browsers. The fancier renderer looks slightly nicer on strong machines but complicates the web export in Step 7. Choosing it now means Step 7 has one less thing that can go wrong.

Now make the folders. In the **FileSystem** panel (bottom-left):

1. Right-click the top item (your project name) → **New Folder** → type `art` → OK.
2. Repeat for `audio`, `scenes`, `scripts`.

```text
my-jam-game/
├── art/        ← images and models go here
├── audio/      ← sounds and music go here
├── scenes/     ← the rooms of your game go here
└── scripts/    ← your code goes here
```

## Checkpoint

Press **F5** (Run Project). Godot asks: *"Select a main scene to run"* — you don't have one yet, so click **Cancel**. A tiny game window opens showing the Godot logo on a grey background.

That grey window **is** a running game. Your project works.

Close it (the X, or **F8** in the editor) and press **Ctrl+S** / **Cmd+S** to save.

## You should see

- The editor with your project name in the title bar
- Four empty folders in the FileSystem panel: `art`, `audio`, `scenes`, `scripts`
- A game window that opens and closes on F5

If all four are true, you're done. This is the last time setup costs you anything.

## If something goes wrong

```text
"Export templates" download fails or hangs.
```

> **Note:** try again on a different network, or grab the templates from the Godot website's download section manually and install via **Manage Export Templates → Install from File**. If it still fails, tell your facilitator — there's a shared copy on the workshop machine.

```text
Godot won't open on macOS: "unidentified developer".
```

> **Note:** right-click the Godot app → **Open** → **Open**. One-time permission.

```text
The Compatibility renderer option isn't there.
```

> **Note:** you're on an older Godot. Close the project, and make sure you downloaded **4.6 standard**, not 3.x or .NET.

Next: **[Step 1](/game-jam-step-1-mental-model/)** — the five ideas that run every game ever made.
