---
layout: libdoc_page.liquid
title: Air Pencil Workshop
description: Two-session workshop where you turn your webcam into an air pencil — track your index fingertip with MediaPipe Hand Landmarker and draw on screen by pointing at it.
eleventyNavigation:
    key: Air Pencil Workshop
    order: 1
---

# Air Pencil Workshop: Draw in the Air

You're going to turn your webcam into a magic pencil. Point your index finger at the screen, move it, and a line follows your fingertip — raise your finger to draw, lower it to lift the pen. All built from scratch in Python.

## What you'll build

- **Day 1 — Hand Tracking (60 min):** a live webcam feed with a MediaPipe hand skeleton drawn on you, and a dot that chases your index fingertip.
- **Day 2 — Drawing + Competition (60 min):** the fingertip becomes a real pencil — it leaves a trail while your finger is raised and stops when it isn't — ending with a short class "Draw-Off" competition.

## How it works

Every time your webcam captures a frame, [MediaPipe](https://developers.google.com/mediapipe) — a free library from Google — finds **21 landmark points** on your hand: fingertips, knuckles, wrist. Your index fingertip is always landmark **#8**. The whole "air pencil" trick is just reading that one number each frame and connecting the dots as it moves.

The code uses MediaPipe's modern **Tasks API** — a `HandLandmarker` object loaded from a `hand_landmarker.task` model file that you download in [Setup](/opencv-setup/). Each webcam frame is handed to the landmarker and comes back with 21 points; Day 2 then builds drawing directly on top of the same Day 1 code.

## What you need

- A computer (Windows or Linux) with a webcam
- [uv](https://docs.astral.sh/uv/) installed — the one tool that gets you Python and all libraries
- The `hand_landmarker.task` model file, downloaded in [Setup](/opencv-setup/)
- No prior coding experience required

## The plan

| Page                              | What it covers                               |
| --------------------------------- | -------------------------------------------- |
| [Setup](/opencv-setup/)           | Install uv, Python, libraries & the model    |
| [Day 1](/opencv-day-1/)           | Webcam feed + hand tracking                  |
| [Day 2](/opencv-day-2/)           | Drawing logic + class competition            |

Start with **[Setup](/opencv-setup/)** — it takes a few minutes and everything else builds on it.
