---
layout: libdoc_page.liquid
permalink: /godot-phase-4-hazards/
title: Phase 4 - The Death Pit
description: Add a killzone to a Godot platformer that catches the player falling off the level and restarts the scene — including the one-word fix for the physics-callback error that makes it reload forever.
eleventyNavigation:
    key: Phase 4 - The Death Pit
    parent: Godot Platformer Workshop
    order: 6
---

# Phase 4 (35 min): The death pit

**You should be at 2:25.** By the end of this phase falling off the level costs you. A game needs stakes, or it's a screensaver.

> **Note:** the best hazard in a 2D platformer is free — **the bottom of the screen**. You don't need spikes, enemies, or lava. You just need "if you fall out of the world, start over". The coin you were about to grab is the punishment.

## Create the Killzone scene

1. In the **FileSystem** panel, right-click `scenes` → **New Scene**.
2. Search for `Area2D`, select **Area2D**, click **Create**.
3. Save as `scenes/killzone.tscn`.
4. Select the `Area2D` root and **Add Child Node** → **CollisionShape2D**.
5. With `CollisionShape2D` selected, find **Shape** in the Inspector and choose **New RectangleShape2D**. You'll see a thin blue line in the viewport — that's the death zone.
6. Select the `CollisionShape2D` and expand **Shape → Size**. Set it to `X: 2000, Y: 200`. This is deliberately enormous: it should stretch far past both edges of your level, because players *will* try to leave the map.
7. Select the `Area2D` root and set the same collision settings as the coin:
   - **Collision Layer** → leave unchecked
   - **Collision Mask** → check box **2**

> **Key insight:** in the 2D editor you can see `Area2D` collision shapes as coloured outlines — blue for `CollisionShape2D`. If you don't see a shape at all, the node isn't selected. When in doubt, click the node and watch the Inspector.

## Write the killzone script

Right-click the `Area2D` root → **Attach Script** → **Create**, path `res://scripts/killzone.gd`:

```gdscript
extends Area2D


func _on_body_entered(_body: Node2D) -> void:
	get_tree().call_deferred("reload_current_scene")
```

### Why `call_deferred` — and not just `reload_current_scene()`

This is the single most important line in the whole workshop, so read it twice.

`body_entered` fires **in the middle of a physics collision check**. Godot is part-way through working out what's touching what. If you delete the scene at that exact moment, you're deleting physics objects while the engine is holding them. Godot refuses, prints a wall of red text, and then — because your player is still sitting in the zone — fires `body_entered` again next frame. And again. Forever. Your game becomes an unkillable error spew.

`call_deferred` means *"ask Godot to do this the instant it finishes what it's doing."* One extra word. Completely safe.

> **Key insight:** this is a general Godot rule, not a coin flip. **Never delete or reload things from inside a physics or process callback.** Queue it for later instead: `call_deferred`, or `queue_free()` instead of `free()`. You'll meet this rule again and again.

## Connect the signal

Same as the coin:

1. Select the `Area2D` root.
2. In the **Inspector → Node → Signals**, find **body_entered** and click **Connect**.
3. Confirm **Method: `_on_body_entered`** and click **OK**.

## Place it

1. Save `killzone.tscn`, then go back to `scenes/game.tscn`.
2. Drag `killzone.tscn` from the **FileSystem** panel onto the `Game` node.
3. Drag it **well below** your level. A good spot: `X: 300, Y: 300`. If it's too close, players will die just from walking; too far and you'll fall forever before anything happens.

Press `F5` and walk off the edge.

## You should see

- The game window **closes and reopens instantly**
- You're back at the start of the level
- **The score is back to zero** and the coins are all there again

That last part isn't a bug — the whole level reloads from scratch, so everything resets. It's the standard, simple way to do it.

> **Key insight:** a full scene reload is a *complete* reset, and that's usually exactly what you want. It costs a tiny bit of performance, but on a level this size nobody can tell. Real games do this constantly. "Every game gets easier when you write the death and the restart at the same time" is a good rule to learn now.

## Make the death less jarring (optional, 5 min)

Instantly blinking back to the start feels abrupt. A 0.4-second pause makes it feel intentional.

1. Select the `Area2D` root in `killzone.tscn` and **Add Child Node** → **Timer**.
2. With `Timer` selected, set **Wait Time** to `0.4` and tick **One Shot**.
3. In the **Node** section, connect the Timer's **timeout** signal to a new method, then replace `killzone.gd` with:

```gdscript
extends Area2D

@onready var timer = $Timer


func _on_body_entered(_body: Node2D) -> void:
	timer.start()


func _on_timer_timeout() -> void:
	get_tree().call_deferred("reload_current_scene")
```

Now the same `call_deferred` rule applies, just one step later.

## If you get stuck

```text
"Removing a CollisionObject node during a physics callback is not allowed"
and the game spews red text forever.
```

> **Note:** this is the error from earlier, and it's the one thing on this page that actually matters. You wrote `get_tree().reload_current_scene()` instead of `get_tree().call_deferred("reload_current_scene")`. Go back, add `call_deferred`, and it's fixed.

```text
Nothing happens when I fall.
```

> **Note:** three things to check, in order. Is the killzone's **Collision Mask** set to **2**? Is **body_entered** connected to `_on_body_entered`? Is the RectangleShape2D actually sized (`2000` × `200`) and is the whole node dragged below the level — not left at the origin, sitting inside the ground?

```text
I die the instant the game starts.
```

> **Note:** the killzone overlaps the level. Select it and check its **Position** in the Inspector. If the blue rectangle is anywhere near your ground, drag it down.

```text
I fall forever and never die.
```

> **Note:** the killzone isn't wide or tall enough, or it's not where you think it is. Set the RectangleShape2D size to `2000` × `200` and check the **Position**.

## Stretch goal

- **Make the killzone visible while you're building.** Select it and, in the Inspector, set **Visibility → Visible** to on. You'll see a big translucent box across the bottom of your level. Remember to switch it off before you finish.
- **Add real spikes.** Duplicate `killzone.tscn`, call it `spikes.tscn`, give the `Area2D` a `Sprite2D` using a spiky tile or the `fruit.png` art, and shrink the RectangleShape2D down to fit. Then place spike instances along the floor where you want them to hurt. You now have two kinds of hazard, and the only thing that changed was the size of a box.

Next: **[Phase 5](/godot-phase-5-score-audio/)** — sound, and making the score counter look like it belongs.
