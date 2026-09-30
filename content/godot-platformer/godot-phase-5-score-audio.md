---
layout: libdoc_page.liquid
permalink: /godot-phase-5-score-audio/
title: Phase 5 - Score & Sound
description: Finish the Godot platformer — pin the score counter to the screen with a CanvasLayer, give the UI a pixel font, and add jump, coin and music audio on the SFX and Music buses.
eleventyNavigation:
    key: Phase 5 - Score & Sound
    parent: Godot Platformer Workshop
    order: 7
---

# Phase 5 (45 min): Score & sound

**You should be at 3:15 (after the break).** The game works. This phase is the difference between "a thing that functions" and "a thing I'd show someone".

Three jobs, in order of how much they matter:

1. Stop the score scrolling away with the camera
2. Add sound effects
3. Add background music

## Stop the score from scrolling

Right now your `ScoreLabel` lives inside the level, so the camera drags it off-screen as you walk. There's a node for exactly this.

1. In `game.tscn`, select the `Game` node and **Add Child Node** → **CanvasLayer**.
2. **Drag `ScoreLabel` out of `GameManager` and onto `CanvasLayer`.** Cut it (`Ctrl+X`) and paste it (`Ctrl+V`) onto the new `CanvasLayer` so it becomes a child of `CanvasLayer` instead of `GameManager`.

> **Note:** after this, `game_manager.gd`'s `$ScoreLabel` path **breaks** — it only looks at its own children. Fix it in one line. Change:

```gdscript
@onready var score_label: Label = $ScoreLabel
```

to:

```gdscript
@onready var score_label: Label = $"../CanvasLayer/ScoreLabel"
```

> **Key insight:** `..` in a node path means "my parent". So this says *"my parent's sibling called CanvasLayer, and its child called ScoreLabel."* Node paths look intimidating, but they're just addresses written with slashes, and Godot fills them in for you if you **drag a node from the tree onto the field**.

> **Note:** an easier alternative — a `Control` node called `HUD`, a `Label` child of it called `ScoreLabel`, and then `score_label = $HUD/ScoreLabel`. No `..`, and it scales to a real game's UI far better. The `CanvasLayer` route above is faster when you're tired.

## Make the text look like the game

The default Godot font is a smooth modern sans-serif sitting on pixel art. It looks like a phone app dropped into a Game Boy game. Two clicks fix it.

1. Select `ScoreLabel`. In the **Inspector**, find **Font** → click the empty box → **Load Dynamic Font** (or **Load Font**). Navigate to `assets/fonts/PixelOperator8-Bold.ttf`.
2. Set **Font Size** to `8`.
3. Set **Font Outline Size** to `2` and **Font Outline Color** to black. This is the trick: a thick black outline makes small pixel text readable over any background.
4. Set **Font Color** to a light cream, e.g. `#FAE9E1`.

Press `F5`. It suddenly looks like a game.

> **Key insight:** outlines are the single cheapest way to make text readable in a game. Real studios call it *drop shadow* or *stroke*, and every game does some version of it. A 2px black outline at 8px font size is the entire trick.

## Add a jump sound

1. Open `scenes/player.tscn`. Select the `CharacterBody2D` root and **Add Child Node** → **AudioStreamPlayer2D**.
2. Rename it to `JumpSound`.
3. With it selected, drag `assets/sounds/jump.wav` from the **FileSystem** panel into its **Stream** field.
4. Set **Bus** to `SFX`. Leave **Autoplay** **off** — a jump sound must play on jump, not at startup.

Now tell `player.gd` to play it. Add one line at the top, just under `extends`:

```gdscript
@onready var jump_sound = $JumpSound
```

and one line inside the jump block:

```gdscript
	if Input.is_action_just_pressed("ui_accept") and is_on_floor():
		velocity.y = JUMP_VELOCITY
		jump_sound.play()
```

> **Key insight:** `AudioStreamPlayer2D` is a speaker that belongs to a place in the world. The `2D` part means it gets quieter the further away you are — which is right for a jump sound, and subtly wrong for music. That's why music (below) uses a different node.

## Add a coin sound

Same three steps, in `scenes/coin.tscn`:

1. **Add Child Node** → **AudioStreamPlayer2D**, rename it `PickupSound`
2. Drag `assets/sounds/coin.wav` into **Stream**
3. Set **Bus** to `SFX`

Then in `coin.gd`:

```gdscript
extends Area2D

@onready var game_manager = %GameManager
@onready var pickup_sound = $PickupSound


func _on_body_entered(_body: Node2D) -> void:
	game_manager.add_point()
	pickup_sound.play()
	queue_free()
```

> **Note:** `play()` *before* `queue_free()`. Swap those two lines and the coin disappears before it ever makes a noise, because `queue_free()` deletes it at the end of the frame. This ordering is a genuinely common bug.

## What are the buses?

Open **Audio** at the bottom of the editor (the dock that says *Audio*). You should see three rows: **Master**, **Music**, **SFX**.

- **Master** is the output.
- **SFX** is for short effects — jumps, coins, hits.
- **Music** is for long background loops.

Putting a sound on a bus means you can turn *all* the music down with one slider, without touching the effects.

> **Key insight:** this is why your project has `default_bus_layout.tres`. Without buses you'd have to rebalance every individual sound file forever. Buses are one level of grouping that costs four clicks and saves an afternoon.

> **Note:** Music is at `-11.9 dB` and SFX at `0 dB`, so music sits quietly under the effects. Drag the **Music** slider a bit if you want it louder or quieter.

## Add background music

1. In `game.tscn`, select the `Game` node and **Add Child Node** → **AudioStreamPlayer** (note: **no `2D`**).
2. Rename it `Music`.
3. Drag `assets/music/time_for_adventure.mp3` into **Stream**.
4. Set **Bus** to `Music`.
5. Tick **Autoplay**.

Press `F5`. The music starts by itself.

> **Key insight:** the difference between `AudioStreamPlayer` and `AudioStreamPlayer2D` is **distance**. A 2D player gets quieter the further you move from it — perfect for a sound that happens *at a place*. Music isn't at a place, it's everywhere equally, so it uses the non-2D version. That's the whole lesson.

> **Note:** the mp3 is about 1.5 MB of the 1.1 MB zipped starter. If your download was slow, you can safely delete `assets/music/` — you just won't have background music, and everything else still works.

## You should see

- The score **stays put** in the corner while you walk and jump
- Text in a crisp **pixel font** with a black outline
- A **jump sound** every time you jump
- A **coin sound** when you collect
- **Music** playing underneath, quieter than the effects

Play your level properly. Walk it end to end, collecting every coin. Watch for the moment you can't quite make a jump — then go back to [Phase 2](/godot-phase-2-player/) and change `JUMP_VELOCITY` until it's right. That last loop is the actual craft of game design, and you've now done it once.

## If you get stuck

```text
Node not found: JumpSound / PickupSound
```

> **Note:** the name doesn't match, or you renamed the node after attaching the script. The name in `$Name` is case-sensitive and must match the Scene tree exactly.

```text
No sound at all.
```

> **Note:** check the **Stream** field isn't empty, and that **Bus** says `SFX` or `Music` rather than `Master`. Also check your laptop's volume — sounds obvious, and it comes up every single workshop.

```text
The music is way too loud / I can't hear the effects.
```

> **Note:** open the **Audio** dock and drag the **Music** slider. It starts at `-11.9 dB`, which is deliberately quiet.

```text
The score label disappeared.
```

> **Note:** you moved `ScoreLabel` under `CanvasLayer` but didn't update the path in `game_manager.gd`. It should read `$"../CanvasLayer/ScoreLabel"`. Or just drag the node onto the field and let Godot type it for you.

```text
The score text is huge or unreadable.
```

> **Note:** **Font Size** `8`, **Font Outline Size** `2`, outline colour black. Those three values are the whole recipe.

## Stretch goal

Pick any one:

- **A death sound.** Add a `DeathSound` (`hurt.wav`) to `player.tscn`, and play it from `killzone.gd` before reloading.
- **A jump that varies.** Play the sound only when the player lands, not on every jump.
- **Coin particles.** Select `coin.tscn`, add a `GPUParticles2D`, and drag it in. It emits a little puff when the coin disappears. The coin scene needs a little more work to trigger it — a good half-hour puzzle.
- **Finish the game.** Count all the coins in the level and print `You win!` when `score` reaches that number. This is your first **win condition**, and adding one is the single biggest change from "a toy" to "a game".

---

**That's the whole game.** Four scripts, about 30 lines of code, and one level you designed. Everything else in every game you'll ever play is this, with more of it.

If you want to keep going, the natural next steps are exactly the stretch goals above, then: animations for the knight ([Phase 3](/godot-phase-3-coins/) has the coin-spin recipe), a slime that patrols, and a second level. All of it is a copy-paste away from what you've already built.
