## Step 2 — Track your hand

Now let's give the computer some "eyes."

MediaPipe's **Hand Landmarker** looks at each camera frame and gives us the position of up to 21 points on a hand.

We don't need to draw all 21 points yet. For our Air Pencil, we only care about **one**:

> **Landmark #8 = index fingertip**

Replace the whole contents of `main.py` with:

```python
import cv2
import mediapipe as mp

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

timestamp_ms = 0


# ─────────────────────────────────────────────
# Start Hand Landmarker
# ─────────────────────────────────────────────

with HandLandmarker.create_from_options(options) as landmarker:

    while True:

        success, frame = cap.read()

        if not success:
            break

        # Mirror the camera
        frame = cv2.flip(frame, 1)

        h, w, _ = frame.shape

        # OpenCV uses BGR.
        # MediaPipe expects RGB.
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        mp_image = mp.Image(
            image_format=mp.ImageFormat.SRGB,
            data=rgb
        )

        # VIDEO mode needs a timestamp for every frame.
        timestamp_ms += 1

        result = landmarker.detect_for_video(
            mp_image,
            timestamp_ms
        )


        # ─────────────────────────────────────
        # Find the index fingertip
        # ─────────────────────────────────────

        if result.hand_landmarks:

            hand = result.hand_landmarks[0]

            # Landmark 8 = index fingertip
            tip = hand[8]

            # MediaPipe gives normalized coordinates
            # between 0.0 and 1.0.
            x = int(tip.x * w)
            y = int(tip.y * h)

            # Draw a dot on the fingertip
            cv2.circle(
                frame,
                (x, y),
                10,
                (0, 255, 0),
                -1
            )


        # ─────────────────────────────────────
        # Display
        # ─────────────────────────────────────

        cv2.imshow("Air Pencil", frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break


cap.release()
cv2.destroyAllWindows()
```

Run it:

```bash
uv run main.py
```

### What's happening?

There are only **three important lines** to understand:

```python
hand = result.hand_landmarks[0]
```

Get the first detected hand.

```python
tip = hand[8]
```

Get landmark #8 — the index fingertip.

```python
x = int(tip.x * w)
y = int(tip.y * h)
```

Convert MediaPipe's normalized coordinates into actual camera pixels.

Then OpenCV puts a dot there:

```python
cv2.circle(frame, (x, y), 10, (0, 255, 0), -1)
```

### Checkpoint

Move your index finger around.

**The green dot should follow it.**

That's the entire foundation of the Air Pencil.

You don't need to understand all 21 landmarks yet. Just remember:

```text
Hand
 └── Landmark #8
      └── Index fingertip
           └── (x, y)
```

### Why aren't we drawing the whole hand?

Because we don't need it.

The old version used MediaPipe's drawing utilities to visualize the complete hand skeleton. With the newer Tasks API, we would have to add extra drawing logic ourselves.

That would teach you something useful **later**, but right now it would distract from the main idea:

**camera → hand → fingertip → coordinates**

Day 2 will take exactly those coordinates and turn them into a pencil.

## Wrap-up

**End of Day 1 checkpoint:** a green dot chases your index finger around the screen.

**Stretch challenge:** change `hand[8]` to `hand[4]`.

What happens?

> `8` = index fingertip
> `4` = thumb tip

Continue to [Day 2](/opencv-day-2/).
