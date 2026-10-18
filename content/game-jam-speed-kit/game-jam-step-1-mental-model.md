---
layout: libdoc_page.liquid
permalink: /game-jam-step-1-mental-model/
title: Step 1 - The Mental Model (25 min)
description: Learn nodes, scenes, the scene tree and signals in Godot 4 with one analogy — then build a moving player, a collectible and a score label in 20 lines of GDScript.
eleventyNavigation:
    key: Step 1 - The Mental Model
    parent: Game Jam Speed Kit
    order: 3
---

# Step 1 (25 min): The mental model

By the end of this step you'll have a little character you can steer into a coin, and a score that goes up. More importantly, you'll have the **five ideas** that run every game ever made — including the one you build in Step 5.

## The whole mental model in 60 seconds

Forget "coding" for a minute. Think **LEGO**:

| LEGO | In Godot | Plain words |
| ---- | -------- | ----------- |
| A single brick | **Node** | One part with one job — a picture, a body, a sound, a button |
| How you stack them | **Scene tree** | The list of bricks, in order, inside the current scene |
| A sealed bag of bricks you can open anywhere | **Scene** | A reusable bundle (your player, a coin) saved as a file |
| "When this happens, do that" | **Signal** | A message one brick shouts when something happens |

That's it. A game is scenes made of nodes, wired together by signals, with a few lines of code saying what each part *does* when it hears its signal.

> **Key insight:** you will not write "a game's worth of code" today. Most of your work is clicking parts into place — like LEGO with a search box. The code is the small, powerful part that makes the parts *react*.

## Build the sandbox (15 min)

We're building three tiny things and wiring them together. **Type the code yourself** — copy-paste teaches your fingers nothing, and typing is how the syntax sticks.

### 1. The player

1. In the **FileSystem** panel, right-click `scenes` → **New Scene**.
2. In the search box, type `CharacterBody2D` and pick it (under 2D). Click **Create**.
3. **Save** it: `Ctrl+S` / `Cmd+S`, name it `player.tscn`.

> **Key insight:** `CharacterBody2D` is the brick for "a solid thing that code moves around" — players, enemies, rolling barrels. It comes with physics built in: it won't fall through floors or slide through walls. You just tell it how to move.

Give it two children (select the `CharacterBody2D`, click the **➕** at the top of the Scene panel):

4. Add **CollisionShape2D**. In the Inspector, find **Shape** → click the empty dropdown → **New CapsuleShape2D**. *This invisible shape is the body physics uses.*
5. Add **Sprite2D**. In the Inspector, find **Texture** and drag `icon.svg` from the FileSystem panel into it. *This is the picture players see.*

Press F5 — but nothing runs yet: Godot wants to know which scene is *the game*. We'll answer that in a moment. First, it needs to know how to move.

### 2. Make it move

Right-click the `CharacterBody2D` → **Attach Script** → **Create** at `res://scripts/player.gd`. Select everything (`Ctrl+A`) and replace it with:

```gdscript
extends CharacterBody2D

const SPEED := 200.0

func _physics_process(_delta: float) -> void:
	var direction := Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	velocity = direction * SPEED
	move_and_slide()
```

Save. Now right-click `player.tscn` in the FileSystem → **Run Scene** (or `Ctrl+F5`).

**You should see:** the little icon steerable with the **arrow keys**, sliding around a grey void.

> **Note:** the icon starts in the **top-left corner** — that's not a bug. In 2D, the screen's origin `(0, 0)` is the top-left, and the default camera looks at the stretch of world from there. Steer right and down and it comes into view. When you place the player into `main.tscn` in a minute, move it to about `X: 400, Y: 250` — the middle of the play area.

### 3. The coin

Stop the game (`F8`). Right-click `scenes` → **New Scene** → `Area2D` → save as `coin.tscn`.

`Area2D` is a different brick: it **notices** things touching it but isn't solid. Coins, traps, checkpoints — anything that should *react to overlap*.

1. Add a child **CollisionShape2D** → **New CircleShape2D**.
2. Add a child **Sprite2D** → drag `icon.svg` into **Texture** again. In the Inspector, set **Scale** to `X: 0.3, Y: 0.3` so it's smaller than the player.
3. Select the root `Area2D` → Inspector → **Collision** → **Collision Mask** → tick box **2**.
4. Go back to `player.tscn`, select the root, and under **Collision** set **Collision Layer** → tick **2**.

> **Key insight:** layers are "what am I", masks are "what do I notice". Player is *on* layer 2; coin *notices* layer 2. One checkbox each means the coin can only ever be triggered by the player — never by the floor, never by a wall you add later.

### 4. The score — your first singleton

Where should the score *live*? The coin changes it, the label shows it, and later a win screen will want it too. Threading one number through several scenes gets messy fast.

Godot's answer is a **singleton**: a script that always exists while the game runs, no matter which scene is on screen. Godot calls these **autoloads** — set one up once, and *any* script in the project can reach it.

**Make the score script:**

1. Right-click the `scripts` folder → **New Script…** → name it `game_state.gd` → **Create**. (Leave **Inherits** as `Node` — that's right.)
2. Select all the template text and replace it with this:

```gdscript
extends Node

signal score_changed(new_score: int)

var score := 0

func add_point() -> void:
	score += 1
	score_changed.emit(score)
```

**Register it as an autoload:**

3. **Project → Project Settings → Globals → Autoload**.
4. Click the folder icon next to **Path** → pick `res://scripts/game_state.gd`.
5. Change **Node Name** to `GameState` (capital G, capital S). This name is how your code reaches the script from anywhere, so it must match exactly.
6. Click **Add**. Close Project Settings.

> **Key insight:** there is now a node called `GameState` sitting above every scene you ever run. `GameState.score` and `GameState.add_point()` work from *any* script in the project. That's the whole trick — the coin never needs to know where the label is.

**Now the label that displays it:**

7. New Scene → search `Node` (the plain generic one, not 2D or 3D) → **Create** → save as `main.tscn` → rename the root to `Main`.
8. Add a **Label** child → name it `ScoreLabel`. In the Inspector: **Text** `Score: 0`, **Position** `X: 8, Y: 6`, and under **Theme Overrides → Font Sizes**, set **Font Size** to `24`.
9. Attach a script to the **Label** (`res://scripts/score_label.gd`):

```gdscript
extends Label

func _ready() -> void:
	GameState.score_changed.connect(_on_score_changed)

func _on_score_changed(new_score: int) -> void:
	if new_score >= 5:
		text = "You win! Press R to play again."
	else:
		text = "Score: " + str(new_score)
```

> **Note:** the label *subscribes* to `score_changed` and updates itself. Nobody tells it what to do — it just listens. That's why adding a second label later (a big score in the corner, a number on a win screen) needs no changes anywhere else.

> **Note:** "Press R" doesn't work *yet* — that's [Step 5](/game-jam-step-5-build/), Booster 7. While you're building, **F5** restarts the game from the editor, and in the finished web game you'll want a real key. Writing the message before the feature is how you remember to build it.

### 5. Wire everything together

1. Drag `player.tscn` from the FileSystem onto `Main` in the Scene tree. Select the new `Player` node and set its **Position** to `X: 400, Y: 250` — the middle of the screen. Drag `coin.tscn` onto `Main` too, select it, and put it near the player (try `X: 600, Y: 250`). Duplicate it with `Ctrl+D` and spread the copies out.
2. Open `coin.tscn`, attach a script (`res://scripts/coin.gd`):

```gdscript
extends Area2D

func _on_body_entered(_body: Node2D) -> void:
	GameState.add_point()
	queue_free()
```

3. One thing left: Godot must be **told** to run this function when something touches the coin. Select the `Area2D` root → in the Inspector, scroll to **Node → Signals** → find **body_entered** → click **Connect** → **OK**. The function name it suggests is already correct.

**Checkpoint:** back in `main.tscn`, press **F5**. If Godot asks *"Select a main scene to run"*, pick `main.tscn` and tick **Set as Main Scene** — that's you telling Godot "this one is the game". Steer the player into a coin.

**You should see:** the coin vanishes, the label goes `Score: 1`, and after five coins: **"You win!"**

> **Key insight:** that last step — connecting the signal — is the single most-missed thing in Godot. The code can be perfect, the coin can be touching the player, and *nothing happens* until the signal is connected. Signal = the doorbell; the function = you answering it. An unconnected signal is a doorbell nobody's listening to.

## What just happened — the five ideas, named

Read this *after* playing, not before:

| Idea | Where you used it | In plain words |
| ---- | ----------------- | -------------- |
| **`_physics_process`** | `player.gd` | A function Godot calls ~60 times a second. Whatever you put in it runs every frame — that's how movement feels continuous |
| **Variables** | `var score := 0`, `const SPEED` | Named boxes that remember. `score` holds the number; `SPEED` is a number that never changes (that's what `const` means) |
| **Functions** | `add_point()`, `_on_body_entered()` | Named chunks of code. `add_point()` is a door: the coin knocks, the score changes. Nobody needs to know *how* |
| **`if`** | `if new_score >= 5:` | The game now *reacts* — same code, different behaviour depending on a condition |
| **Signals** | `body_entered` (connected in the Inspector) and `score_changed` (connected in code) | "When this happens, run that." The coin doesn't chase the player; it waits to be told |
| **Singleton** — one structural extra | `game_state.gd`, registered as autoload `GameState` | A script that always exists. Not a new kind of code — it's *where* a global number lives so every scene can reach it |

That's the toolbox. Step 5 adds a few power tools, but everything you build today is these five ideas in different coats.

## Speed hack for the facilitator

Don't explain a concept before building it. Build → press F5 → *then* name what just happened. "What you just did — that's a signal." Five minutes of talking at a time, maximum. Hands on keyboards, always.

## If something goes wrong

```text
Parse Error / Unexpected identifier in the script.
```

> **Note:** a typo or a tab problem. GDScript cares about indentation — lines inside a function must start with **Tab** (Godot usually inserts these for you). Compare your script to the block above, line by line, or select-all and retype the block.

```text
F5 says "No main scene has been defined".
```

> **Note:** you're in `main.tscn` and it's not marked as the scene to run. That's fine — right-click `main.tscn` in the FileSystem → **Run Scene** instead. (Or: Project → Project Settings → Run → Main Scene → pick `main.tscn`.)

```text
Identifier "GameState" not declared in the current scope.
```

> **Note:** the autoload isn't registered, or its **Node Name** isn't exactly `GameState`. This one bites everyone, because the *file* is `game_state.gd` but the *access name* is up to you — and they're easy to mix up. Check **Project → Project Settings → Globals → Autoload**: one row, `res://scripts/game_state.gd`, named `GameState`, with **Enable** ticked. If it looks right and the error persists, **Project → Reload Current Project**.

```text
Player moves but the coin never scores.
```

> **Note:** three suspects, in order of guilt: the signal isn't connected (Inspector → Node → Signals → body_entered should show a green dot); the `GameState` autoload is missing or named differently (check the error above); the coin's Collision Mask isn't **2**.

```text
The label doesn't appear / is off-screen.
```

> **Note:** make sure `ScoreLabel` is a child of `Main` — not floating under something else. Position `X: 8, Y: 6` is the top-left corner. And if it shows `Score: 0` forever, the label's script hasn't connected: check that `score_label.gd` is attached to the **Label** and not to `Main`.

Next: **[Step 2](/game-jam-step-2-pick-game/)** — choosing what this machinery will actually *be*.
