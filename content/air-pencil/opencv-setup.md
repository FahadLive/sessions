---
layout: libdoc_page.liquid
permalink: /opencv-setup/
title: Setup - Install uv, Python & the Model (Windows/Linux)
description: Get uv, Python, the Air Pencil dependencies, and the hand_landmarker.task model installed before Day 1, with a Windows 10/11 and Linux path.
eleventyNavigation:
    key: Setup
    parent: Air Pencil Workshop
    order: 2
---

# Setup: Install uv, Python & the Model

Do this **before Day 1**. It takes a few minutes, and everything else in the workshop builds on it. If you get stuck, don't sit on it — raise your hand and pair up with a neighbor who's ready so you don't fall behind.

We're using [uv](https://docs.astral.sh/uv/getting-started/installation/) instead of plain `pip` + `venv`. It handles the things that trip up beginners:

- One tool installs Python itself — no separate "download Python from python.org" step, no PATH issues.
- `uv run` auto-creates and syncs the virtual environment. Nobody has to remember `source .venv/bin/activate` vs `.venv\Scripts\Activate.ps1` — the #1 cross-platform beginner blocker, removed entirely.
- Installs are fast (seconds, not minutes) since packages are cached.

---

## Step 1 — Install uv

Run the command for your operating system, then confirm it worked by checking the version.

**Windows 10 / 11 (PowerShell):**

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

Close and reopen PowerShell, then confirm:

```powershell
uv --version
```

**Linux (bash/zsh):**

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Restart the terminal (or `source ~/.bashrc`), then confirm:

```bash
uv --version
```

You should see a version number. That's the whole goal of this step.

## Step 2 — Pre-download Python (optional but recommended)

The workshop will need Python 3.11. Downloading it ahead of time — on your own wifi, the night before — saves real minutes on workshop day:

```bash
uv python install 3.11
```

## Step 3 — Create the project

We'll do this together at the start of Day 1, but here's what's coming:

```bash
uv init air-pencil
cd air-pencil
uv add opencv-python mediapipe numpy
```

- `uv init` creates a project folder with a `pyproject.toml` and a starter `main.py`.
- `uv add` installs the three libraries we need and records them in `pyproject.toml`, creating a `.venv` automatically behind the scenes — you never touch it directly.

From here on, every run command is:

```bash
uv run main.py
```

`uv run` checks the environment matches `pyproject.toml` and fixes it if not, _then_ runs the file. Even if you closed your terminal overnight, or you're catching up mid-session, this one command self-heals — no "did you activate your venv?" troubleshooting.

## Step 4 — Download the hand model

The hand-tracking code needs a pre-trained **model file** named `hand_landmarker.task`. Download it now so it's waiting for you on workshop day.

Run this **inside the `air-pencil` folder** (the one with `main.py`), so the code can find it next to your program:

```bash
curl -L -o hand_landmarker.task https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task
```

**Windows 10 / 11 (PowerShell):** `curl` is a built-in PowerShell command, so use `curl.exe` for the real curl:

```powershell
curl.exe -L -o hand_landmarker.task https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task
```

Confirm the download worked — you should see a file of about 7.5 MB:

```bash
ls -lh hand_landmarker.task
```

If you see `hand_landmarker.task` in the list (about 7.5 MB), you're set.

## Quick sanity check

Put this in `main.py` and run it:

```py
import cv2
import mediapipe as mp
import numpy
from pathlib import Path

print("All libraries loaded OK!")

assert Path("hand_landmarker.task").exists(), "hand_landmarker.task not found — did you download it in Step 4?"
print("Model file found OK!")
```

```bash
uv run main.py
```

You should see **both** `All libraries loaded OK!` and `Model file found OK!`.

> **Note:** the hand-tracking code uses MediaPipe's **Tasks API** (the `mp.tasks` module). It's included with MediaPipe 0.10 and newer, and `uv add mediapipe` always installs the latest version — so you're covered.

If you're ready, head to [Day 1](/opencv-day-1/).
