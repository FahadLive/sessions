---
layout: libdoc_page.liquid
permalink: /game-jam-step-1-build-core/
title: Step 1 - Build the Core (35 min)
description: "Make Coin Rush playable and finishable in 35 minutes with grey-box placeholders, a few pasted scripts, and one autoload. You can move, collect coins, lose to a hazard, win, and restart."
eleventyNavigation:
    key: Step 1 - Build the Core
    parent: Game Jam Speed Kit
    order: 4
---

# Step 1 (35 min): Build the core

You'll finish **pass 1 (playable)** and **pass 2 (finishable)** of the [Jam Mindset](/game-jam-overview/). The art stays as coloured boxes on purpose.

Six small steps. Each adds **one idea**. Press **F5** after every one.

> **Key insight:** a **script** is a text file attached to a node that tells it what to do. The starter's scripts are empty shells. You fill them. To open one, **double-click it in the FileSystem panel**. To use a code block below, select everything in the script (**Ctrl+A** / **Cmd+A**), then paste.

## 1.1 Tour the scene (2 min)

**Do this:** in the FileSystem panel, double-click `scenes/main.tscn`. Look at the **Scene** panel.

**You should see** a tree: `Main`, `Walls`, `Floor`, five `Coin` nodes, a `Hazard`, a `Player` and a `HUD` with two labels.

> **Note:** the five coins are **instances** of one scene, `coin.tscn`. Build a thing once, then place copies. The little "clapperboard" icon beside a node means "this is a saved scene". Change `coin.tscn` and all five change.

## 1.2 Make the player move (5 min)

**Idea: a script reads the keyboard.**

**Do this:** double-click `scripts/player.gd`, select all, and paste:

```gdscript
extends CharacterBody2D

@export var speed := 90.0


func _physics_process(_delta: float) -> void:
	var dir := Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	velocity = dir * speed
	move_and_slide()
```

Press **F5**.

**You should see** the blue box move with the **arrow keys or WASD**. It stops at the walls.

| Line | What it does                                                                |
| ---- | --------------------------------------------------------------------------- |
| `@export var speed := 90.0` | A setting with a default value. It shows up in the Inspector |
| `Input.get_vector(...)`     | Reads four keys and returns a direction, like "up and left"  |
| `velocity = dir * speed`    | Direction times speed = how fast to move                     |
| `move_and_slide()`          | Moves the body and slides along walls                        |

## 1.3 Tune it without touching code (3 min)

**Idea: export variables.** The `@export` word put `speed` in the Inspector.

**Do this:** close the game. In the **Scene** panel click `Player`. In the **Inspector**, find **Speed** and change it to `140`. Press **F5**.

**You should see** the box move faster. Try `60`, then settle on whichever feels good.

> **Key insight:** this is how game designers tune "feel": change a number, press F5, feel it. No code editing, no fear. In a jam you'll do this a hundred times.

## 1.4 Collect coins (7 min)

**Idea: an `Area2D` notices when something touches it, and sends a signal.**

**Do this:** double-click `scripts/coin.gd`, select all, and paste:

```gdscript
extends Area2D


func _on_body_entered(_body: Node2D) -> void:
	GameState.add_point()
	queue_free()
```

Press **F5** and walk into a coin.

**You should see** the coin vanish and **Coins: 1** appear at the top left.

**How does it know?** Open `scenes/coin.tscn`, click the root `Coin` node, then open the **Node** tab next to the Inspector → **Signals**. Find `body_entered`. It shows a green connection to `_on_body_entered`. The starter connected it for you. A **signal** is a node shouting "something happened!", and your function is the one listening.

**Where does the score live?** Open `scripts/game_state.gd` and read it. Don't change it. It's an **autoload**: a script Godot loads once and keeps alive in every scene, so `GameState` can be reached from anywhere. The coin tells it, the label listens to it.

> **Note:** `queue_free()` means "delete this node at the end of the frame". It's how you make a thing disappear for good.

## 1.5 Add a hazard (7 min)

**Idea: the same trick, with different consequences.**

**Do this:** open `scripts/hazard.gd`. **Don't** select all this time. Add the lines below directly under `extends Area2D` and leave the `_on_body_entered` function at the bottom alone:

```gdscript
@export var distance := 120.0
@export var speed := 1.5
var _time := 0.0
var _origin := Vector2.ZERO


func _ready() -> void:
	_origin = position


func _physics_process(delta: float) -> void:
	_time += delta
	position.x = _origin.x + sin(_time * speed) * distance
```

Press **F5**.

**You should see** the red box swing left and right across the middle. `sin()` makes it ease back and forth like a pendulum.

Now make it dangerous. In the same file, change `pass` in the last function to:

```gdscript
func _on_body_entered(_body: Node2D) -> void:
	GameState.finish(false)
```

Press **F5** and touch the red box.

**You should see** "Ouch! Space to retry" in the middle of the screen. (Space won't do anything yet. That's next.)

**Tune it:** click `Hazard` in the Scene panel, change **Distance** and **Speed** in the Inspector, and press **F5**. Find the setting that makes grabbing the middle coin tricky but fair.

## 1.6 Win, lose, restart (10 min)

**Idea: a game needs an ending and a way to try again.** This is the line between a **demo** and a **game**.

**Do this:** double-click `scripts/main.gd`, select all, and paste:

```gdscript
extends Node2D


func _ready() -> void:
	GameState.score = 0
	GameState.playing = true


func _input(event: InputEvent) -> void:
	if not GameState.playing and event.is_action_pressed("ui_accept"):
		get_tree().reload_current_scene()
```

Then open `scripts/player.gd` and change this one line:

```gdscript
	velocity = dir * speed if GameState.playing else Vector2.ZERO
```

Press **F5**. Do all three:

1. Touch the hazard. **You should see** "Ouch! Space to retry". The player freezes. Press **Space**: a fresh round.
2. Collect all 5 coins. **You should see** "You win! Space to play again". Press **Space**: restart.
3. Check the score label starts at **Coins: 0** again after a restart.

> **Key insight:** an **autoload never resets itself**. When the scene reloads, `GameState.score` keeps its old value. That's why `_ready()` in `main.gd` sets it back to `0` by hand. This is the most common beginner bug with global variables. Remember it.

## Pass 1 and 2 are done

You now have a game with a **goal**, a **way to lose** and a **restart**. Everything from here is paint. Save with **Ctrl+S** / **Cmd+S**.

## Checkpoint

- [ ] Arrow keys / WASD move the blue box
- [ ] Coins vanish and the score goes up
- [ ] The hazard swings and ends the round
- [ ] Collecting 5 coins shows "You win!"
- [ ] **Space** restarts, and the score returns to 0

## If you get stuck

```text
Parse Error: Unexpected "Indent" / Expected end of statement
```

> **Note:** GDScript cares about indentation. Delete the script's contents and paste the block again, replacing everything, and keep each line's indent as it was.

```text
Invalid call. Nonexistent function 'add_point' in base 'Nil'.
```

> **Note:** `GameState` isn't registered. Open **Project → Project Settings → Globals → Autoload** and check that `GameState` points to `res://scripts/game_state.gd`. The starter has it already, so if it's missing, unzip the starter again.

```text
Touching the coin does nothing.
```

> **Note:** check `coin.gd` has the function `_on_body_entered`, spelled exactly like that, and that `coin.tscn` → Node → Signals shows `body_entered` connected. Also check the Player has a `CollisionShape2D` child.

Stuck twice on the same thing? Press **F1** inside Godot to search the built-in docs, then raise your hand.

Next: **[Step 2: Find assets](/game-jam-step-2-assets/)**.
