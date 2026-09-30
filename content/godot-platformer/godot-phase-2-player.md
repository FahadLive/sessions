---
layout: libdoc_page.liquid
permalink: /godot-phase-2-player/
title: Phase 2 - Move & Jump
description: Build a CharacterBody2D player in Godot from scratch and write the movement script — walk left and right, jump, fall with gravity, and add a smooth camera that follows.
eleventyNavigation:
    key: Phase 2 - Move & Jump
    parent: Godot Platformer Workshop
    order: 4
---

# Phase 2 (55 min): Move & jump

**You should be at 0:30.** By the end of this phase you have a character that runs and jumps around your level. This is the moment it becomes a game.

## Create the Player scene

1. Look at the **FileSystem** panel (left side, bottom half). Right-click the `scenes` folder → **New Scene**.
2. In the search box at the top of the dialog, type `CharacterBody2D` and select **CharacterBody2D** (under 2D). Click **Create**.
3. Save it as `scenes/player.tscn` (`Ctrl+S` / `Cmd+S`).

> **Key insight:** `CharacterBody2D` is the node type for "a thing in a 2D platformer that you control". Godot gives you the physics — standing on floors, sliding along walls, not falling through — and you just say how fast it moves.

## Give it a body and a sprite

Your scene currently has one node, `CharacterBody2D`. Add two children to it:

1. With `CharacterBody2D` selected, press `Ctrl+A` (Select All) — nothing. Instead: hover over `CharacterBody2D` in the Scene tree and click the **➕ Add Child Node** button at the top of the Scene panel. Search **CollisionShape2D** and add it.
2. With `CollisionShape2D` selected, find **Shape** in the Inspector. Click the **empty dropdown** next to it → **New CircleShape2D**. Now a small circle appears in the viewport — that's the player's body.

Now add the sprite:

3. Still on `CharacterBody2D`, add another child: **Sprite2D**.
4. With `Sprite2D` selected, find **Texture** in the Inspector → drag `assets/sprites/knight.png` from the FileSystem panel into it.

The knight will probably look huge. That's because `knight.png` is a sheet of **16 different 32×32 pictures**, and `Sprite2D` shows all of it. We only want the first one — the standing pose.

5. With `Sprite2D` selected, tick **Region → Enabled** in the Inspector.
6. Expand **Region** and set **Rect** to `X: 0`, `Y: 0`, `Width: 32`, `Height: 32`.
7. Set **Position** to `X: 0`, `Y: -12`.

```text
Your player should now look like:

        🗡️  ← 32x32 knight, standing on the circle
        ○   ← the collision circle, 5px radius
```

> **Key insight:** the circle and the sprite are two different jobs. The **circle is the body** — physics uses it, you never see it. The **sprite is the picture** — players see it, physics ignores it. Keeping them separate is what lets you change the art without breaking the jumping.

## Set the collision layer

Godot has numbered **collision layers** (1, 2, 3…) and **masks**. A layer is "what am I"; a mask is "what do I notice".

Select the `CharacterBody2D` root node. In the Inspector, under **Collision**, set:

- **Collision Layer** → check box **2** (click the empty square so it fills in)
- **Collision Mask** → leave it on **1**

> **Key insight:** we put the player on layer 2 instead of layer 1, so that later, coins and the death pit can be told "only notice the player" with one checkbox. This is the single most common cause of *"my coin works but the ground is invisible"* or *"my coin keeps triggering on the floor"* bugs — and it costs nothing to do right now.

## Write the movement script

Now the fun bit. Right-click `CharacterBody2D` in the Scene tree → **Attach Script** → **Create**.

- **Language:** GDScript
- **Path:** `res://scripts/player.gd`
- Click **Create**

Godot opens `player.gd`. **Select everything in it** (`Ctrl+A` / `Cmd+A`) and replace it with this:

```gdscript
extends CharacterBody2D

const SPEED = 130.0
const JUMP_VELOCITY = -300.0


func _physics_process(_delta: float) -> void:
	# 1. Gravity pulls us down whenever we're not standing on something.
	var gravity: float = ProjectSettings.get_setting("physics/2d/default_gravity")
	if not is_on_floor():
		velocity.y += gravity * _delta

	# 2. Left and right.
	var direction := Input.get_axis("ui_left", "ui_right")
	if direction != 0.0:
		velocity.x = direction * SPEED
	else:
		velocity.x = move_toward(velocity.x, 0, SPEED)

	# 3. Jump, but only from the ground.
	if Input.is_action_just_pressed("ui_accept") and is_on_floor():
		velocity.y = JUMP_VELOCITY

	# 4. Actually move.
	move_and_slide()
```

Press `Ctrl+S` / `Cmd+S` to save. Red squiggly lines disappear.

> **Key insight:** `velocity` is the character's speed and direction, and `move_and_slide()` is what applies it. `velocity.x` is sideways speed, `velocity.y` is up-and-down. **Jump is just negative downward speed.** The negative sign is the only reason a jump goes up.

> **Note:** GDScript is **indentation-sensitive**. Every line inside a `for`, `if`, or a function must start with a **Tab** (Godot inserts tabs for you when you press Enter). Mixing tabs and spaces causes an `Indent` error that looks like nonsense. Press **Tab** to indent, **Shift+Tab** to outdent.

### Why those three input names

`ui_left`, `ui_right` and `ui_accept` are Godot's **built-in** actions. They already exist in every Godot project — nothing to set up:

| Action name | Bound to |
| ----------- | -------- |
| `ui_left` | `←` and `A` |
| `ui_right` | `→` and `D` |
| `ui_accept` | `Space`, `Enter`, gamepad `A` |

This is deliberate. If we'd used custom names like `move_left`, you'd have to open **Project Settings → Input Map** and add events by hand — and that's a great way to lose fifteen minutes to a mis-clicked dialog.

## Put the player in the level

1. Save `player.tscn`.
2. Go back to `scenes/game.tscn`.
3. Drag `player.tscn` from the **FileSystem** panel and drop it onto the `Game` node in the **Scene** tree. It appears in the viewport.
4. Select it, and in the Inspector set **Position** to roughly `X: 34, Y: 100` — just above your ground.

Press `F5`.

## You should see

You can **walk left and right** and **jump** over your gaps and onto your platforms. The camera does not follow yet, so you'll walk off the edge of the screen — that's next.

> **Note:** if the knight is invisible but the level moved, or the character is a blurry mess — go back to `player.tscn` and check the Sprite2D's **Region** settings (step 5–6 above). That single checkbox is the most common slip.

## Add a camera (10 seconds, huge payoff)

A camera that follows the character is what makes it feel like a real game. Ten seconds of work.

1. Go back to `scenes/player.tscn`, select the `CharacterBody2D` root, and **Add Child Node** → **Camera2D**.
2. Select the new `Camera2D`. In the Inspector:
   - **Position** → `X: 0, Y: -7`
   - **Zoom** → `X: 3, Y: 3` (bigger number = more zoomed in)
   - Tick **Position Smoothing → Enabled**

Press `F5` and walk around. The camera glides after you.

> **Key insight:** `Zoom` is backwards from what you'd expect — `3` means **3× magnified**, not zoomed out. Position Smoothing is what turns a jerky camera into a smooth one. Together they're the whole trick.

## Tuning your jump

These numbers decide how your game feels. Change the two constants at the top of `player.gd`, save, `F5`, and try:

| Constant | Try | Effect |
| -------- | ---- | ------ |
| `SPEED` | `70` | Feels like wading through treacle |
| `SPEED` | `130` | **The default. Good.** |
| `SPEED` | `250` | Fast. Now your 3-tile gaps are trivial |
| `JUMP_VELOCITY` | `-200` | A small hop. Good for precision platforming |
| `JUMP_VELOCITY` | `-300` | **The default. 3 tiles high.** |
| `JUMP_VELOCITY` | `-450` | Enormous. Now jump up onto your platforms |

> **Key insight:** when something feels wrong in a game, it is almost always one of these two numbers. "It feels bad" is a real design problem, and these two constants are the dial. Change one, press `F5`, feel the difference. This is more valuable than any tutorial about game feel.

## If you get stuck

```text
"Unexpected identifier" or "Parse Error" in player.gd
```

> **Note:** an indentation problem. Select all the code in `player.gd` and paste the block from this page again, replacing everything.

```text
The character falls through the floor.
```

> **Note:** either the `CollisionShape2D` has no shape (check **Shape** isn't empty), or you painted the level with a decoration tile instead of the plain dirt block. The circle is 5px — it's easy to leave it sitting a few pixels too high, which is fine, but it must overlap the floor.

```text
I can walk but not jump.
```

> **Note:** check the `is_on_floor()` condition is spelled exactly as shown, and that you used `ui_accept` and not `ui_jump`.

```text
The character floats in the air.
```

> **Note:** gravity only applies when `not is_on_floor()`. If the collision shape started overlapping the floor at spawn, `is_on_floor()` is true immediately and gravity never kicks in. Nudge the player's starting **Position** up a few pixels.

## Stretch goal

Make the knight **face the direction it's walking**. In `_physics_process`, after you read `direction`:

```gdscript
	$Sprite2D.flip_h = direction < 0.0
```

That one line flips the sprite when walking left. Save, `F5`, and look.

Next: **[Phase 3](/godot-phase-3-coins/)** — coins and the score.
