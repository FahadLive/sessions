---
layout: libdoc_page.liquid
title: Day 1 - Hand Tracking
description: Get a live webcam feed, a MediaPipe hand skeleton, and a dot that follows the index fingertip — the foundation for Day 2's drawing logic.
eleventyNavigation:
    key: Day 1
    parent: Air Pencil Workshop
    order: 3
---

# Day 1 (60 min): "Robot Eyes" — Hand Tracking

**Goal by end of session:** a live webcam feed with a hand skeleton drawn on it, and a dot that follows the index fingertip. All code runs with `uv run main.py` inside the `air-pencil` project folder from [Setup](/opencv-setup/).

## Concept intro

- A webcam gives Python a grid of pixels, about 30 times a second.
- MediaPipe (a free library from Google) looks at that grid and finds **21 points** on a hand — fingertips, knuckles, wrist — called **landmarks**.
- Landmark **#8** is always the tip of the index finger. That's the only one we need today.

## Step 1 — See yourself

Put this in `main.py`, replacing the sanity-check code from Setup:

```python
import cv2

cap = cv2.VideoCapture(0)

while True:
    success, frame = cap.read()
    if not success:
        break

    frame = cv2.flip(frame, 1)  # mirror so it feels natural
    cv2.imshow("Air Pencil", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

Run it with:

```bash
uv run main.py
```

**What's happening:** `cap.read()` grabs one frame, `imshow` displays it, the loop runs ~30x/sec, `waitKey` checks for the `q` key. Press `q` to quit, then wave at your own webcam for a minute — small win, but it matters.

> **Linux note:** if the webcam doesn't open, some laptops need `cv2.VideoCapture(0, cv2.CAP_V4L2)` instead of `cv2.VideoCapture(0)`. Swap it in if you hit a black window.

## Step 2 — Add the hand skeleton

```python
import cv2
import mediapipe as mp

mp_hands = mp.solutions.hands
mp_draw = mp.solutions.drawing_utils
hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7)

cap = cv2.VideoCapture(0)

while True:
    success, frame = cap.read()
    if not success:
        break

    frame = cv2.flip(frame, 1)
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)  # MediaPipe wants RGB, OpenCV gives BGR
    results = hands.process(rgb)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

    cv2.imshow("Air Pencil", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

Run with `uv run main.py` again — `uv` re-checks the environment each time, so nothing extra to do even if you just joined this exact second.

**Checkpoint:** you should see a green skeleton drawn on your hand. This is the "wow" moment of Day 1 — take it in.

## Step 3 — Track just the fingertip

Replace the inner `if results.multi_hand_landmarks:` block with:

```python
    if results.multi_hand_landmarks:
        hand_landmarks = results.multi_hand_landmarks[0]
        h, w, _ = frame.shape

        # landmark 8 = index fingertip
        tip = hand_landmarks.landmark[8]
        x, y = int(tip.x * w), int(tip.y * h)

        cv2.circle(frame, (x, y), 10, (0, 255, 0), -1)
```

(Keep the `mp_draw.draw_landmarks(...)` line too if you want the full skeleton _and_ the highlighted dot — good for debugging, remove it later for a cleaner look.)

## Wrap-up

**End of Day 1 checkpoint:** a green dot chases the index finger around the screen.

**Stretch challenge (optional):** try tracking your thumb instead — which landmark number is it? (answer: 4). It previews that other landmarks exist, and it's a hint for Day 2.

Continue to [Day 2](/opencv-day-2/).
