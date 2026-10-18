---
layout: libdoc_page.liquid
permalink: /game-jam-step-5-build/
title: Step 5 - Build Your Game (40 min)
description: 40 learner-led minutes to finish the core loop — seven speed boosters (instancing, export vars, groups, autoloads, timers, tweens, particles), how to debug in Godot, and the six-edit Coin Rush 3D track.
eleventyNavigation:
    key: Step 5 - Build
    parent: Game Jam Speed Kit
    order: 7
---

# Step 5 (40 min): Build your game

The training wheels are off. **You build; the facilitator watches.** Their job is to wait 5–10 minutes before touching anything, and to answer with questions, not keyboards: *"What did you expect to happen? …So what did actually happen? …Where does that number live?"*

**Your target:** your one-sentence loop from Step 2, running. Specifically:

- [ ] A **goal** (collect N, survive T seconds, reach the exit)
- [ ] A **way to lose** (touch the bad thing, timer, falling)
- [ ] A **restart** (press R, or automatic)

Everything else — art, polish, second ideas — is Step 6 or the cut list.

## How to spend the 40 minutes

1. **First 5 min:** make the smallest possible version of your loop with grey boxes. `icon.svg` art is fine. Fun first, paint later.
2. **Next 25 min:** add one thing at a time. Play after every single addition (F5). Never add three things and then test — you'll never know which one broke.
3. **Last 10 min:** make losing and restarting work. A game you can lose and replay is *finished*. A game you can't is a demo.

## Speed boosters — take what you need, ignore the rest

Each is ~5 minutes. **Introduce them one at a time, only when the build hits the wall they solve.** Dumping all seven on a beginner is how sessions die.

### 1. Instance scenes — one enemy, many copies

Make your enemy/hazard/coin a **scene** (`enemy.tscn`), then drag it from the FileSystem into your level five times. Change the script in *one* place; all five copies update.

> **Key insight:** this is the LEGO bag again. A scene is a sealed bag — every copy is identical until you *deliberately* change one in the Inspector (position, speed…). 90% of "game content" is re-instanced scenes.

### 2. Export variables — tune without editing code

```gdscript
@export var speed := 120.0
```

The variable appears in the **Inspector**. Change it there, press F5, feel it. No code editing, no fear. This is how you tune feel in 30 seconds instead of 10 minutes.

### 3. Groups — "tag, then find by tag"

Select a node → **Node** panel → **Groups** tab → add `enemy`. Then any script can ask:

```gdscript
if body.is_in_group("enemy"):
	game_over()
```

Use groups when your code needs to recognise *a kind of thing* that isn't always the same scene. (Collision layers from Step 1 solve the simpler "what triggers me" version — reach for groups when that's not enough.)

### 4. Grow your singleton — global state

You already built one in Step 1: `game_state.gd`, the `GameState` autoload. Because it exists in every scene, your score already survives restarts and scene changes. When something *else* needs to be global, it moves in here too:

```gdscript
extends Node

signal score_changed(new_score: int)

var score := 0
var best := 0

func add_point() -> void:
	score += 1
	if score > best:
		best = score
	score_changed.emit(score)
```

Lives, a high score, "is the game over yet" — all natural tenants.

> **The catch that catches everyone once:** an autoload **never resets itself**. Reload the scene and `GameState.score` is still sitting at whatever it was. If each round should start at zero, reset it by hand — `GameState.score = 0` in whatever starts the round.

### 5. Timers and Tweens — motion and delays without code

**Timer** node: set **Wait Time** to `2`, tick **Autostart**. Connect its **timeout** signal. Something now happens every 2 seconds — spawning, shaking, scoring. No script needed for the *when*.

**Tween** (in code) animates a property from A to B:

```gdscript
var tween := create_tween()
tween.tween_property(self, "scale", Vector2(1.4, 1.4), 0.1)
tween.tween_property(self, "scale", Vector2.ONE, 0.1)
```

A pickup that **pulses** before dying — six lines, infinite charm.

### 6. Particles — instant juice

Add a **GPUParticles2D** (or `GPUParticles3D`) node where something dies. Set **Amount** to `16`, **One Shot** on, **Explosiveness** to `1`. Emit once from code when needed: `$Particles.restart()`. Sparks, puffs, confetti — a five-minute dopamine machine.

### 7. Restart and game-over — the finish line

The whole thing, any track:

```gdscript
func _input(event: InputEvent) -> void:
	if event.is_action_pressed("ui_accept"):
		get_tree().reload_current_scene()
```

(`ui_accept` = Space/Enter — already exists, no setup.) A game-over **Label** ("You crashed! Press Space") is a Label whose text you set and whose `show()` you call when losing. That's it. You now have a complete game.

## Debugging without panic

When (not if) something breaks:

1. **Read the red text.** The Output panel (bottom) names the file and **the line number**. `player.gd:7` means look at line 7. The message is usually blunt and correct: `Invalid call. Nonexistent function 'add_points' in base 'Node'`.
2. **The Debugger panel** (bottom-center) stops on the exact line when a script hard-errors, and shows the call stack. Click the line it highlights.
3. **`F1` opens the built-in docs** for whatever is selected — every node, every function, with examples. Faster than any search engine, works offline.
4. **`print()` is your printf:** drop `print("coin touched")` anywhere. It appears in the Output panel. Print the *value* you suspect: `print(score)`.

> **Key insight:** an error message is not Godot being angry — it's Godot being **specific**. It tells you the file, the line, and the problem. "Read the whole error out loud" solves a third of all bugs, and the next third is a typo.

## The 3D track: make Coin Rush yours — six edits

Track C builds by *editing* the tested starter. Each edit is one idea, and after six, it's your game. Open the starter, press F5, then:

1. **Read the tree (3 min).** Open `main.tscn`. Click every node in the Scene tree — the Inspector shows what each one is. Match them to the translation table below. *You already know these jobs.* One thing is deliberately **not** in this tree: `GameState`, the autoload you built in Step 1. The 3D track uses the exact same singleton — **Project → Project Settings → Globals → Autoload** shows it, and `coin.gd` scores with the same four lines as your 2D coin.
2. **Retune the hazard (4 min).** Select `Hazard` → Inspector → **Script Variables** → change `distance` and `speed`. These are `@export` variables — that's Booster 2, already wired. Make the game fair, then make it mean.
3. **Reshape the arena (5 min).** Select `Ground` → scale it, move the four walls in or out. Add platforms: **BoxMesh** `MeshInstance3D` + matching `BoxShape3D` on a `StaticBody3D`, stacked anywhere.
4. **Recolour everything (4 min).** Click any mesh → its material (under **Mesh > Surface 0** or the mesh resource) → **Albedo** colour. Five colours is a style. This is your art direction now.
5. **Change the game rules (5 min).** The round length is `const ROUND_SECONDS := 30.0` in `game_state.gd`; the on-screen text lives in `hud.gd`. Add a twist — when `score` hits 5, show a victory message instead of counting down.
6. **Your signature (10 min).** One thing only you would add: a bouncy camera, coins that flee, a second hazard (duplicate the `Hazard` node — Booster 1), a shrinking arena. Then stop and go to Step 6.

### 2D ↔ 3D translation table

| 2D | 3D | Same job |
| -- | -- | -------- |
| `CharacterBody2D` | `CharacterBody3D` | The thing you steer |
| `Area2D` | `Area3D` | The thing that notices overlap |
| `StaticBody2D` | `StaticBody3D` | The world (doesn't move) |
| `Camera2D` | `Camera3D` | The window into the game |
| `Sprite2D` | `MeshInstance3D` / `Sprite3D` | The visible picture/shape |
| `CollisionShape2D` | `CollisionShape3D` | The invisible physics body |
| `Vector2(x, y)` | `Vector3(x, y, z)` | A position (one extra number) |
| `_physics_process`, signals, groups, autoloads, tweens | **identical** | The whole mental model |

**Hybrids, for the curious:** *2.5D* = flat `Sprite3D` characters walking around a 3D world — often the prettiest-per-hour option in Godot. *Fixed-camera 3D* = what Coin Rush already is: one camera angle, no camera code, no motion sickness. Both stay tiny. Rigged animation and custom models stay on the cut list.

## Checkpoint

Hand someone the keyboard (or the facilitator pretends to be a stranger):

- [ ] There's a **goal** they can discover in 10 seconds
- [ ] There's a **way to lose**, and it triggers
- [ ] There's a **restart** (button, key, or automatic)
- [ ] You can explain your core loop in one breath

Next: **[Step 6](/game-jam-step-6-polish/)** — the 20 minutes that make people say "this feels good".
