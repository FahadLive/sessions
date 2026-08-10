---
layout: libdoc_page.liquid
title: Day 2 - Drawing Logic
description: Turn the tracked fingertip into an actual air pencil with a one-rule pen-up/pen-down gesture, then run a short Draw-Off competition to close the workshop — all on top of the Day 1 Hand Landmarker code.
eleventyNavigation:
    key: Day 2
    parent: Air Pencil Workshop
    order: 4
---

# Day 2 (60 min): "Magic Pencil" — Drawing

**Goal by end of session:** the dot leaves a trail when the index finger is raised and stops when it isn't — a working air pencil.

Today we build **directly on the Day 1 code**. Same imports, same `HandLandmarker`, same `detect_for_video` loop — we only add three things: a canvas to draw on, a one-rule gesture, and a clear key.

## Concept intro

Today's only new idea: **a canvas is a second, invisible image that remembers every line drawn.** Each frame, combine "what the camera sees" with "what's on the canvas" so a drawing doesn't disappear the instant the hand moves.

## Step 4 (continued from Day 1) — Add a canvas

Start from your Day 1 program and add a canvas. Replace the whole contents of `main.py`:

```py
import cv2
import mediapipe as mp
import numpy as np

# ─────────────────────────────────────────────
# MediaPipe Hand Landmarker
# ─────────────────────────────────────────────

BaseOptions = mp.tasks.BaseOptions
HandLandmarker = mp.tasks.vision.HandLandmarker
HandLandmarkerOptions = mp.tasks.vision.HandLandmarkerOptions
VisionRunningMode = mp.tasks.vision.RunningMode

MODEL_PATH = "hand_landmarker.task"

options = HandLandmarkerOptions(
    base_options=BaseOptions(model_asset_path=MODEL_PATH),
    running_mode=VisionRunningMode.VIDEO,
    num_hands=1,
    min_hand_detection_confidence=0.7,
    min_hand_presence_confidence=0.7,
    min_tracking_confidence=0.7,
)

# ─────────────────────────────────────────────
# Camera
# ─────────────────────────────────────────────

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    raise RuntimeError("Could not open camera")

success, frame = cap.read()

if not success:
    cap.release()
    raise RuntimeError("Could not read from camera")

canvas = np.zeros_like(frame)  # blank black canvas, same size as the webcam frame

timestamp_ms = 0

# ─────────────────────────────────────────────
# Hand Landmarker
# ─────────────────────────────────────────────

with HandLandmarker.create_from_options(options) as landmarker:
    while True:
        success, frame = cap.read()

        if not success:
            break

        # Mirror camera
        frame = cv2.flip(frame, 1)

        h, w, _ = frame.shape

        # OpenCV gives BGR.
        # MediaPipe expects an RGB image.
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)

        # VIDEO mode requires a timestamp for every frame
        timestamp_ms += 1

        result = landmarker.detect_for_video(mp_image, timestamp_ms)

        # ─────────────────────────────────────
        # Hand detected
        # ─────────────────────────────────────

        if result.hand_landmarks:
            hand = result.hand_landmarks[0]

            # MediaPipe landmark 8 = index fingertip
            tip = hand[8]

            x = int(tip.x * w)
            y = int(tip.y * h)

            cv2.circle(frame, (x, y), 10, (0, 255, 0), -1)

        # ─────────────────────────────────────
        # Display
        # ─────────────────────────────────────

        # merge canvas onto live frame
        combined = cv2.add(frame, canvas)
        cv2.imshow("Air Pencil", combined)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()
```

Run with `uv run main.py`. Nothing draws yet — that's the next step. Confirm the black canvas merges fine (screen should look identical to Day 1).

## Step 5 — The one-rule gesture

This is the whole "AI" trick of the project, and it's one comparison: the index fingertip (landmark 8) is _higher on screen_ (smaller y) than the middle knuckle of that same finger (landmark 6). If yes, the finger is pointing up, so **draw**. Otherwise, **don't draw**.

Before scrolling on, try it yourself: **how would you tell the computer the finger is pointing up, using only numbers?** Most people land close to `tip.y < pip.y`.

Replace the `if result.hand_landmarks:` block with:

```py
        if result.hand_landmarks:
            hand = result.hand_landmarks[0]

            # MediaPipe landmark 8 = index fingertip
            # MediaPipe landmark 6 = index finger PIP
            tip = hand[8]
            pip = hand[6]

            x = int(tip.x * w)
            y = int(tip.y * h)

            # Index finger pointing upward
            finger_up = tip.y < pip.y

            if finger_up:
                # Green fingertip = drawing
                cv2.circle(frame, (x, y), 10, (0, 255, 0), -1)

                # Initialize drawing position
                if prev_x == 0 and prev_y == 0:
                    prev_x, prev_y = x, y

                # Draw onto persistent canvas
                cv2.line(canvas, (prev_x, prev_y), (x, y), (255, 0, 255), 6)

                prev_x, prev_y = x, y

            else:
                # Red fingertip = not drawing
                cv2.circle(frame, (x, y), 10, (0, 0, 255), -1)

                # Reset previous point
                prev_x, prev_y = 0, 0

        else:
            # No hand → stop drawing
            prev_x, prev_y = 0, 0
```

This block uses `prev_x, prev_y` — but they're not defined yet! Add them right after `canvas = np.zeros_like(frame)`:

```py
prev_x, prev_y = 0, 0
```

`prev_x, prev_y` remembers where the fingertip was last frame. A line from the previous point to the current one is a tiny stroke; hundreds of tiny strokes per second add up to a smooth drawing.

Run it. Point your finger up and move it around — you're drawing in the air. Lower your finger to "lift the pen" and move somewhere else without drawing.

## Step 6 — Clear key + free practice

Replace the keyboard check near the bottom of the loop (the `if cv2.waitKey(1) & 0xFF == ord('q'):` block) with:

```py
        key = cv2.waitKey(1) & 0xFF

        # Q → quit
        if key == ord("q"):
            break

        # C → clear canvas
        if key == ord("c"):
            canvas = np.zeros_like(frame)
```

(Remove the old separate `waitKey` check so it isn't called twice.)

Use the rest of this time for free practice — initials, a smiley, whatever. Most common issue: canvas size mismatch if the webcam resolution changes mid-run — restart with `uv run main.py` to fix it.

## Full reference solution

If you fell behind or want to check your work, here's the complete final program:

```py
import cv2
import mediapipe as mp
import numpy as np

# ─────────────────────────────────────────────
# MediaPipe Hand Landmarker
# ─────────────────────────────────────────────

BaseOptions = mp.tasks.BaseOptions
HandLandmarker = mp.tasks.vision.HandLandmarker
HandLandmarkerOptions = mp.tasks.vision.HandLandmarkerOptions
VisionRunningMode = mp.tasks.vision.RunningMode


MODEL_PATH = "hand_landmarker.task"

options = HandLandmarkerOptions(
    base_options=BaseOptions(model_asset_path=MODEL_PATH),
    running_mode=VisionRunningMode.VIDEO,
    num_hands=1,
    min_hand_detection_confidence=0.7,
    min_hand_presence_confidence=0.7,
    min_tracking_confidence=0.7,
)


# ─────────────────────────────────────────────
# Camera
# ─────────────────────────────────────────────

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    raise RuntimeError("Could not open camera")

success, frame = cap.read()

if not success:
    cap.release()
    raise RuntimeError("Could not read from camera")

canvas = np.zeros_like(frame)

prev_x, prev_y = 0, 0
timestamp_ms = 0

print("Starting...")


# ─────────────────────────────────────────────
# Hand Landmarker
# ─────────────────────────────────────────────

with HandLandmarker.create_from_options(options) as landmarker:
    while True:
        success, frame = cap.read()

        if not success:
            break

        # Mirror camera
        frame = cv2.flip(frame, 1)

        h, w, _ = frame.shape

        # OpenCV gives BGR.
        # MediaPipe expects an RGB image.
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)

        # VIDEO mode requires a timestamp for every frame
        timestamp_ms += 1

        result = landmarker.detect_for_video(mp_image, timestamp_ms)

        # ─────────────────────────────────────
        # Hand detected
        # ─────────────────────────────────────

        if result.hand_landmarks:
            hand_landmarks = result.hand_landmarks[0]

            # MediaPipe landmark 8 = index fingertip
            # MediaPipe landmark 6 = index finger PIP
            tip = hand_landmarks[8]
            pip = hand_landmarks[6]

            x = int(tip.x * w)
            y = int(tip.y * h)

            # Index finger pointing upward
            finger_up = tip.y < pip.y

            if finger_up:
                # Green fingertip = drawing
                cv2.circle(frame, (x, y), 10, (0, 255, 0), -1)

                # Initialize drawing position
                if prev_x == 0 and prev_y == 0:
                    prev_x, prev_y = x, y

                # Draw onto persistent canvas
                cv2.line(canvas, (prev_x, prev_y), (x, y), (255, 0, 255), 6)

                prev_x, prev_y = x, y

            else:
                # Red fingertip = not drawing
                cv2.circle(frame, (x, y), 10, (0, 0, 255), -1)

                # Reset previous point
                prev_x, prev_y = 0, 0

        else:
            # No hand → stop drawing
            prev_x, prev_y = 0, 0

        # ─────────────────────────────────────
        # Display
        # ─────────────────────────────────────

        combined = cv2.add(frame, canvas)

        cv2.imshow("Air Pencil", combined)

        # ─────────────────────────────────────
        # Keyboard controls
        # ─────────────────────────────────────

        key = cv2.waitKey(1) & 0xFF

        # Q → quit
        if key == ord("q"):
            break

        # C → clear canvas
        if key == ord("c"):
            canvas = np.zeros_like(frame)


# ─────────────────────────────────────────────
# Cleanup
# ─────────────────────────────────────────────

cap.release()
cv2.destroyAllWindows()
```
