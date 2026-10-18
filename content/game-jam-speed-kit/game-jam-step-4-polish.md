---
layout: libdoc_page.liquid
permalink: /game-jam-step-4-polish/
title: Step 4 - Polish and Game Feel (25 min)
description: "Make your own sound effect in a browser with jsfxr, then add four cheap bits of \"juice\" to Coin Rush: win and hit sounds, a score pop with a Tween, a screen shake, and a title that fades out."
eleventyNavigation:
    key: Step 4 - Polish
    parent: Game Jam Speed Kit
    order: 7
---

# Step 4 (25 min): Polish and game feel

**Juice** is the small stuff that makes a game feel alive: sounds, shakes, pops. It's the cheapest upgrade in game development. Five steps, in order. Each one is about 5 minutes.

> **Rule for jams: learn at most ONE new tool per jam.** Today's one new tool is **jsfxr**, in the first step. Everything else here is Godot, which you already know.

## 4.1 Make your own sound effect (5 min)

jsfxr is a free sound-effect maker that runs **in your browser**. Nothing to install.

**Do this:**

1. Open [sfxr.me](https://sfxr.me).
2. Click a sound type on the left (try **Pickup/Coin**). It plays a sound and shows its settings.
3. Click the same button a few times. Each click makes a new random variation. Stop on one you like.
4. Find the `.wav` download link on the page and click it. **You should see** a `.wav` file land in your Downloads folder.
5. Drag that file into Godot's `audio` folder.
6. In `scenes/main.tscn`, click `CoinSound`, and drag your new file into its **Stream** box.

**You should see** (and hear) your own sound when you collect a coin.

**Credits:** a sound you made yourself needs no credit, but note it in `CREDITS.txt`: `coin sound: made with jsfxr (sfxr.me)`.

> **Skip it if** you like the Kenney sound. It's fine. The point is you now know how to make a sound for _anything_ in about 30 seconds.

## 4.2 Win and hit sounds (4 min)

**Idea: reuse the signal trick.** `GameState` already shouts when the game ends. `main.gd` just needs to listen.

**Do this:**

1. In `scenes/main.tscn` add two **AudioStreamPlayer** nodes to `Main`: `HitSound` (stream `audio/sfx_hit.wav`) and `WinSound` (stream `audio/sfx_win.wav`).
2. In `scripts/main.gd`, add these two lines under your `coin_sound` line:

```gdscript
@onready var hit_sound: AudioStreamPlayer = $HitSound
@onready var win_sound: AudioStreamPlayer = $WinSound
```

3. Add this line inside `_ready()`:

```gdscript
	GameState.game_over.connect(_on_game_over)
```

4. Add this function at the bottom:

```gdscript
func _on_game_over(won: bool) -> void:
	(win_sound if won else hit_sound).play()
```

Press **F5**, and win once and lose once.

**You should see** (and hear) a different sound for each ending.

## 4.3 Score pop with a Tween (5 min)

**Idea: a Tween smoothly changes a number over time.** Here it makes the score label swell and settle.

**Do this:** open `scripts/hud.gd` and replace `_on_score_changed` with:

```gdscript
func _on_score_changed(score: int) -> void:
	score_label.text = "Coins: " + str(score)
	score_label.pivot_offset = Vector2(0, score_label.size.y / 2)
	var tween := create_tween()
	tween.tween_property(score_label, "scale", Vector2(1.4, 1.4), 0.08)
	tween.tween_property(score_label, "scale", Vector2.ONE, 0.12)
```

Press **F5** and grab a coin.

**You should see** the **Coins** label swell and settle each time the score changes.

> **Key insight:** a tween is "go from here to there in this many seconds". You list the steps and Godot does the in-betweens. Change `1.4` for a bigger pop, or the times for a snappier one.

## 4.4 Screen shake (5 min)

**Idea: a Camera2D can be nudged randomly for a moment.**

**Do this:**

1. In `scenes/main.tscn` add a **Camera2D** to `Main`. In the Inspector set its **Position** to `240, 135` (the middle of the arena).
2. In `scripts/main.gd` add this function at the bottom:

```gdscript
func shake() -> void:
	var tween := create_tween()
	for i in 6:
		var kick := Vector2(randf_range(-6, 6), randf_range(-6, 6))
		tween.tween_property($Camera2D, "offset", kick, 0.04)
	tween.tween_property($Camera2D, "offset", Vector2.ZERO, 0.04)
```

3. Make `_on_game_over` call it when you lose:

```gdscript
func _on_game_over(won: bool) -> void:
	(win_sound if won else hit_sound).play()
	if not won:
		shake()
```

Press **F5** and hit the hazard.

**You should see** the whole screen judder for a quarter of a second.

## 4.5 A title that fades out (3 min)

**Do this:**

1. In `scenes/main.tscn` right-click `HUD/Message` → **Duplicate** and rename it `Title`. In the Inspector set **Text** to `COIN RUSH` and tick **Visible**.
2. In `scripts/hud.gd` add this under the two `connect` lines inside `_ready()`:

```gdscript
	var fade := create_tween()
	fade.tween_property($Title, "modulate:a", 0.0, 1.5).set_delay(1.0)
```

Press **F5**.

**You should see** "COIN RUSH" on screen for a second, then fade away.

## Stretch menu (only if you have time)

Pick **one**. Each is 5 minutes.

- **Time limit.** Add a **Timer** node to `Main`: **Wait Time** `30`, **Autostart** on. Open the **Node** tab → **Signals** → double-click `timeout` → connect it to `Main`. In the new function write `GameState.finish(false)`. Now there's a clock.
- **Particles.** Add a **CPUParticles2D** to `Player`. Set **Emitting** off, **One Shot** on, **Amount** `16`, **Explosiveness** `1`, **Spread** `180`, **Initial Velocity** min `40`, max `80`. In `_on_game_over`, when you lose, call `$Player/CPUParticles2D.restart()`. A puff when you get hit.
- **Tune the game.** Spend 5 minutes only changing numbers in the Inspector (speed, hazard distance, coin positions) until the game feels fair and a little tense.

## Checkpoint

- [ ] A sound that you made (or chose) plays on a coin
- [ ] Win and lose each have a sound
- [ ] The score label pops
- [ ] Losing shakes the screen
- [ ] A title fades out at the start
- [ ] `CREDITS.txt` is up to date

> **Note:** don't add more juice now. A game with five bits of juice and a finished export beats a game with fifteen and no link. Next is the export.

## If you get stuck

```text
Invalid get index 'play' (on base: 'Nil'). / Node not found: "HitSound"
```

> **Note:** the node name in `$HitSound` must match the Scene tree **exactly**, including capital letters. Check the spelling in the Scene panel.

```text
The screen shakes but the picture jumps off-centre.
```

> **Note:** the Camera2D's **Position** must be `240, 135`. A camera at `0, 0` shows the top-left corner.

```text
Tween does nothing.
```

> **Note:** check the property name is spelled exactly: `scale`, `offset`, `modulate:a`. A typo in a Tween property is silent.

Want more tools later? See the [Toolbox](/game-jam-toolbox/).

Next: **[Step 5: Export and deploy](/game-jam-step-5-export/)**.
