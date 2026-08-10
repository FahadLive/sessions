---
layout: libdoc_page.liquid
title: Setup - Install uv & Python (Windows/Linux)
description: Get uv, Python, and the Air Pencil dependencies installed before Day 1, with a Windows 10/11 and Linux path.
eleventyNavigation:
    key: Setup
    parent: Air Pencil Workshop
    order: 2
---

# Setup: Install uv & Python

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

## Quick sanity check

Put this in `main.py` and run it:

```python
import cv2
import mediapipe
import numpy
print("All libraries loaded OK!")
```

```bash
uv run main.py
```

If you see **"All libraries loaded OK!"**, you're ready for [Day 1](/opencv-day-1/).
