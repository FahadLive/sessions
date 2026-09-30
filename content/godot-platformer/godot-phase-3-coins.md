---
layout: libdoc_page.liquid
permalink: /godot-phase-3-coins/
title: Phase 3 - Coins
description: Build a collectible coin in Godot with an Area2D, wire it to the player with a single collision mask, and add a score counter node that every coin reports to.
eleventyNavigation:
    key: Phase 3 - Coins
    parent: Godot Platformer Workshop
    order: 5
---

# Phase 3 (45 min): Coins

**You should be at 1:40 (after the break).** By the end of this phase the player can collect things, and there's a number counting up on screen.

## The idea

A coin is a **trigger**, not a solid object. Two different node types do different jobs in Godot:

| Node type | What it's for | Example |
| --------- | ------------- | ------- |
| `CharacterBody2D` | Things that are **solid** and moved by code | your player, the ground |
| `Area2D` | Things that **notice overlap** but aren't solid | coins, the death pit, checkpoints |

If a coin were solid, you'd be bumping into it. Instead it just says *"someone touched me"* and gets out of the way.

## Create the Coin scene

1. Go to the **FileSystem** panel, right-click `scenes` → **New Scene**.
2. Search for `Area2D`, select **Area2D** (under 2D), click **Create**.
3. Save as `scenes/coin.tscn`.

## Build it up

1. Select the `Area2D` root and **Add Child Node** → **CollisionShape2D**. Set its **Shape** → **New CircleShape2D**.
2. Select the `Area2D` root again and **Add Child Node** → **Sprite2D**. Drag `assets/sprites/coin.png` into its **Texture**.
3. `coin.png` is a strip of 12 spinning frames, so cut it down to one: tick **Region → Enabled**, set **Rect** to `X: 0, Y: 0, Width: 16, Height: 16`.
4. Select the `Area2D` root and set **Z Index** to `4` so coins draw in front of the ground.

## The one setting that matters

Select the `Area2D` root. In the Inspector, under **Collision**:

- **Collision Layer** → leave **unchecked** (a coin isn't on any layer — it doesn't block anything)
- **Collision Mask** → check box **2**

> **Key insight:** this is one checkbox and it saves you an hour. In [Phase 2](/godot-phase-2-player/) you put the player on layer **2**. This mask means *"I only pay attention to things on layer 2."* So the coin can never be triggered by the ground, the platforms, or anything else you add later — **only** the player.

If you skip this, your coin will keep vanishing when you walk into a wall.

## Write the coin script

Right-click the `Area2D` root in the Scene tree → **Attach Script** → **Create**, path `res://scripts/coin.gd`.

Replace everything with:

```gdscript
extends Area2D

@onready var game_manager = %GameManager


func _on_body_entered(_body: Node2D) -> void:
	game_manager.add_point()
	queue_free()
```

Save it. Nothing happens yet — two pieces are still missing.

## Wire up the signal

The function is named `_on_body_entered`, which is Godot's convention, but Godot doesn't just guess. You have to connect it.

1. Select the `Area2D` root.
2. Scroll down in the **Inspector** to the **Node** section → **Signals**.
3. Find **body_entered** and click **Connect** on the right.
4. A small dialog appears. It should already say **Method: `_on_body_entered`**. Click **OK**.

> **Key insight:** an `Area2D` *detects* overlap and *emits* a signal saying so. A script *listens* for that signal. You just connected those two halves. This is the single most common thing beginners miss — the code is right, but nothing calls it.

## Build the score counter

The coin's script calls `game_manager.add_point()`. That thing doesn't exist yet, so let's make it.

1. Go back to `scenes/game.tscn`.
2. Select the `Game` node, then **Add Child Node** → **Node**. Rename it to `GameManager` (click the name, type, press Enter).
3. Select `GameManager`, scroll to the bottom of the **Inspector** to **Node**, and tick **Unique Name in Owner**. This is what makes `%GameManager` work in scripts.
4. With `GameManager` selected, **Add Child Node** → **Label**. Rename it to `ScoreLabel`.
5. Select `ScoreLabel` and in the Inspector set **Text** to `You collected 0 coins.`
6. Expand **Layout → Position** and set `X: 8`, `Y: 6`. Expand **Size** and set `X: 300`, `Y: 20`. Those are the top-left corner of the screen, where a score belongs.

Now attach the script. Right-click `GameManager` → **Attach Script** → **Create**, path `res://scripts/game_manager.gd`:

```gdscript
extends Node

var score := 0

@onready var score_label: Label = $ScoreLabel


func _ready() -> void:
	_update_label()


func add_point() -> void:
	score += 1
	_update_label()


func _update_label() -> void:
	score_label.text = "You collected " + str(score) + " coins."
```

> **Key insight:** `$ScoreLabel` means "the child node called `ScoreLabel`". The `@onready` line means "get it now, not at startup, because it doesn't exist until the scene is built". And `add_point()` is the *only* door into this script — the coin doesn't touch `score` directly, it just knocks on the door. That single indirection is why the label updates for free.

> **Note:** the label scrolls with the camera. That's fine for now — you'll fix it properly in [Phase 5](/godot-phase-5-score-audio/) with a `CanvasLayer`.

## Place the coins

1. Save `coin.tscn`, then go back to `scenes/game.tscn`.
2. Drag `coin.tscn` from the **FileSystem** panel onto the `Game` node. One coin appears.
3. **Select it** and press `Ctrl+D` (Duplicate) — the copy lands right on top of the original, offset slightly. Move it with the arrow keys or by dragging, then duplicate again.

Put your coins:

- Floating **just above** the ground, easy to grab while running
- In the **middle of your gaps** — this is the classic platformer move. It makes the player *want* to risk the jump
- On top of your **floating platforms**

Place 5–8. That's a good level.

## You should see

Press `F5`. Run into a coin:

- The coin **disappears**
- The text in the top-left **changes to "You collected 1 coins."**

and it goes up by one every time.

> **Note:** deliberately awkward English, on purpose. `"You collected 1 coins."` reads wrong, and that's *good* — a teacher noticing it live is a free 60-second lesson about why programmers write helper functions. Try it yourself later:

```gdscript
	score_label.text = "You collected " + str(score) + (" coin." if score == 1 else " coins.")
```

## If you get stuck

```text
The coin disappears but the score doesn't change.
```

> **Note:** `%GameManager` didn't resolve, or the signal isn't connected. Check three things: `GameManager` is ticked **Unique Name in Owner**; the coin's **Signals → body_entered** is connected to `_on_body_entered`; and `game_manager.gd` is attached to `GameManager`, not to `ScoreLabel`.

```text
Error: "Node not found: GameManager" or "Invalid access to property add_point"
```

> **Note:** `GameManager` is missing, or is a child of something else instead of being a direct child of `Game`. `%` only searches the current scene and its direct children.

```text
Coins vanish when I walk into the ground.
```

> **Note:** the coin's **Collision Mask** isn't set to **2**. That's the whole fix.

```text
The coin is a blurry stripe, not a coin.
```

> **Note:** `coin.png` is a 12-frame strip. Tick **Region → Enabled** and set **Rect** to `0, 0, 16, 16`.

```text
The label text is white on a white background.
```

> **Note:** it inherits the default theme colour. Click `ScoreLabel` in the Scene tree and, in the Inspector, find **Font Color** and pick a dark colour. You'll replace the font properly in Phase 5.

## Stretch goal

- Make the coin **spin**. Replace the `Sprite2D` with an `AnimatedSprite2D`, then the **SpriteFrames** panel at the bottom lets you add all 12 frames and turn on autoplay. Ten minutes, and it's the most satisfying thing in this whole workshop.
- **Big coins.** Duplicate `coin.tscn`, change the `Sprite2D`'s **Scale** to `1.5`, and make it worth 5 points by changing `add_point()` to `score += 5` for a second script. Nothing says you can't have two kinds of coin.

Next: **[Phase 4](/godot-phase-4-hazards/)** — the death pit.
