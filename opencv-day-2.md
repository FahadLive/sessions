---
layout: libdoc_page.liquid
title: Day 2 - Drawing Logic
description: Turn the tracked fingertip into an actual air pencil with a one-rule pen-up/pen-down gesture, then run a short Draw-Off competition to close the workshop.
eleventyNavigation:
    key: Day 2
    parent: Air Pencil Workshop
    order: 4
---

# Day 2 (60 min): "Magic Pencil" — Drawing

**Goal by end of session:** the dot leaves a trail when the index finger is raised and stops when it isn't — a working air pencil

## Concept intro

Today's only new idea: **a canvas is a second, invisible image that remembers every line drawn.** Each frame, combine "what the camera sees" with "what's on the canvas" so a drawing doesn't disappear the instant the hand moves.

## Step 4 — Add a canvas

```python
import cv2
import mediapipe as mp
import numpy as np

mp_hands = mp.solutions.hands
mp_draw = mp.solutions.drawing_utils
hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7)

cap = cv2.VideoCapture(0)
success, frame = cap.read()
canvas = np.zeros_like(frame)  # blank black canvas, same size as the webcam frame

prev_x, prev_y = 0, 0

while True:
    success, frame = cap.read()
    if not success:
        break
    frame = cv2.flip(frame, 1)
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(rgb)

    if results.multi_hand_landmarks:
        hand_landmarks = results.multi_hand_landmarks[0]
        h, w, _ = frame.shape
        tip = hand_landmarks.landmark[8]
        x, y = int(tip.x * w), int(tip.y * h)
        cv2.circle(frame, (x, y), 10, (0, 255, 0), -1)

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

Replace the `if results.multi_hand_landmarks:` block with:

```python
    if results.multi_hand_landmarks:
        hand_landmarks = results.multi_hand_landmarks[0]
        h, w, _ = frame.shape

        tip = hand_landmarks.landmark[8]   # index fingertip
        pip = hand_landmarks.landmark[6]   # index middle knuckle
        x, y = int(tip.x * w), int(tip.y * h)

        finger_up = tip.y < pip.y  # smaller y = higher up on screen

        if finger_up:
            cv2.circle(frame, (x, y), 10, (0, 255, 0), -1)  # green = drawing
            if prev_x == 0 and prev_y == 0:
                prev_x, prev_y = x, y
            cv2.line(canvas, (prev_x, prev_y), (x, y), (255, 0, 255), 6)
            prev_x, prev_y = x, y
        else:
            cv2.circle(frame, (x, y), 10, (0, 0, 255), -1)  # red = pen up
            prev_x, prev_y = 0, 0
    else:
        prev_x, prev_y = 0, 0
```

## Step 6 — Clear key + free practice

Add this near the `q` check inside the main loop:

```python
    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):
        break
    if key == ord('c'):
        canvas = np.zeros_like(frame)  # wipe the canvas
```

(Remove the old separate `waitKey` check so it isn't called twice.)

Use the rest of this time for free practice — initials, a smiley, whatever. Most common issue: canvas size mismatch if the webcam resolution changes mid-run — restart with `uv run main.py` to fix it.

---

## 🏆 Competition: "Air Pencil Draw-Off"

Low-stakes and fast. Two quick rounds, whole class watches on a shared screen.

1. **Round 1 — Speed Star (60 sec):** draw a 5-pointed star in the air, as clean as possible, before time runs out. `c` restarts (costs time). Class votes on the best star by cheer or show of hands.
2. **Round 2 — Sign Your Name (45 sec):** draw a first name legibly, once, no restarts. Most readable name wins.

**Scoring:**

| Criteria                        | Points |
| ------------------------------- | ------ |
| Recognizable shape / legible    | 2      |
| Finished within time            | 1      |
| Smooth lines (not shaky/broken) | 1      |

Total out of 4 per round; add both rounds for a winner.

**Style bonus:** finished both rounds early? Change the line color (`(255, 0, 255)` → any BGR tuple) or thickness (the `6` in `cv2.line`) for a "style bonus."

---

## Full reference solution

If you fell behind or want to check your work, here's the complete final program:

```python
import cv2
import mediapipe as mp
import numpy as np

mp_hands = mp.solutions.hands
mp_draw = mp.solutions.drawing_utils
hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7)

cap = cv2.VideoCapture(0)
success, frame = cap.read()
canvas = np.zeros_like(frame)
prev_x, prev_y = 0, 0

while True:
    success, frame = cap.read()
    if not success:
        break
    frame = cv2.flip(frame, 1)
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(rgb)

    if results.multi_hand_landmarks:
        hand_landmarks = results.multi_hand_landmarks[0]
        h, w, _ = frame.shape
        tip = hand_landmarks.landmark[8]
        pip = hand_landmarks.landmark[6]
        x, y = int(tip.x * w), int(tip.y * h)
        finger_up = tip.y < pip.y

        if finger_up:
            cv2.circle(frame, (x, y), 10, (0, 255, 0), -1)
            if prev_x == 0 and prev_y == 0:
                prev_x, prev_y = x, y
            cv2.line(canvas, (prev_x, prev_y), (x, y), (255, 0, 255), 6)
            prev_x, prev_y = x, y
        else:
            cv2.circle(frame, (x, y), 10, (0, 0, 255), -1)
            prev_x, prev_y = 0, 0
    else:
        prev_x, prev_y = 0, 0

    combined = cv2.add(frame, canvas)
    cv2.imshow("Air Pencil", combined)

    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):
        break
    if key == ord('c'):
        canvas = np.zeros_like(frame)

cap.release()
cv2.destroyAllWindows()
```
