---
layout: libdoc_page.liquid
permalink: /game-jam-3d-showcase/
title: 3D Showcase - Coin Rush in 3D (15 min)
description: "See the same collect-and-avoid game in 3D. Open a ready 3D starter, spot what's identical to your 2D game, make five small edits, and learn where to find free 3D models. No 3D experience needed."
eleventyNavigation:
    key: 3D Showcase
    parent: Game Jam Speed Kit
    order: 9
---

# 3D showcase (15 min): the same game, one dimension up

You built Coin Rush in 2D. This 15 minutes proves that **3D is not scary**, and that nothing you learned today was "only 2D". You won't build anything new from scratch. You'll **open, change and run** a finished 3D version.

> **Note:** the facilitator demos the first two minutes on the big screen. You then do the rest on your own machine. Your 2D game and your itch.io link stay untouched.

![Placeholder: the 3D Coin Rush arena, a blue capsule, gold spheres and a red ball in a green walled arena.](/assets/game-jam-speed-kit/previews/shot-3d-showcase.webp)

{% comment %}
EMBED PLACEHOLDER: once the 3D build is hosted, replace this comment with:
{% gameEmbed "https://YOUR-3D-GAME-URL", "", "Play Coin Rush 3D" %}
{% endcomment %}

## Open it (3 min)

<div class="d-flex fw-wrap gap-3" rgap-3="xs">
  <a href="/assets/game-jam-speed-kit/coin-rush-3d-starter.zip" download class="btn btn-primary">⬇ Download the 3D starter (9 KB)</a>
</div>

**Do this:** unzip it. In the Godot **Project Manager** click **Import** → pick `coin-rush-3d-starter/project.godot` → **Import & Edit**. Wait for the import bar, then press **F5**.

**You should see** a green walled arena from above and behind, a blue capsule, five gold spheres, and a red ball swinging through the middle. Walk with the arrow keys or WASD. Touch the ball, or run out of the 30 seconds, and the round restarts.

> **Note:** it's all built from **primitive shapes**: boxes, spheres and capsules. There are no 3D models to import, so nothing can fail. Swapping them for real models is the stretch goal below.

## What's the same, what's different

You'll recognise almost everything:

| In your 2D game                                          | In the 3D version                         | Different?                  |
| -------------------------------------------------------- | ----------------------------------------- | --------------------------- |
| `Player`: `CharacterBody2D`                              | `Player`: `CharacterBody3D`               | Same idea, one more axis    |
| `Coin`: `Area2D`                                         | `Coin`: `Area3D`                          | Same signal: `body_entered` |
| Coin script: `GameState.add_point()` then `queue_free()` | Same lines (plus `rotate_y`, so it spins) | **Identical**               |
| `Sprite2D` (a picture)                                   | `MeshInstance3D` (a shape)                | Picture vs shape            |
| `Camera2D`                                               | `Camera3D`, attached to the player        | Follows the player          |
| `GameState` autoload                                     | `GameState` autoload                      | **Identical**               |
| Export to the web                                        | Export to the web                         | **Identical**               |

> **Key insight:** a different dimension changes the **nodes**, not the **ideas**. The signal, the autoload, the export and the Inspector tuning are the same. A 3D jam game is a 2D jam game with `3D` on the end of the node names.

## Five edits (10 min)

Press **F5** after each. One at a time.

1. **Tune the hazard.** Open `scenes/main.tscn`, click `Hazard`. In the Inspector change **Distance** and **Speed** (same `@export` trick as Step 1.3).
2. **Add a coin.** In the FileSystem, drag `scenes/coin.tscn` into the **viewport** and drop it on the floor. In the Inspector set its **Position** (try `x 6, y 1.2, z 6`).
3. **Change a colour.** Open `scenes/coin.tscn` and click its `MeshInstance3D`. In the Inspector click the **Mesh** box, then its **Material**, then change **Albedo → Color**. Pick any colour for the coin.
4. **Change the speed.** Open `scripts/player.gd` and change `const SPEED := 5.0` to `8.0`.
5. **Change the timer.** Open `scripts/game_state.gd` and change `ROUND_SECONDS` from `30.0` to `45.0`.

**You should see** every edit take effect in a few seconds. That feedback loop is 90% of making games.

## Where 3D art comes from

You don't model anything. **Kenney** has a whole [3D category](https://kenney.nl/assets/category:3D) with CC0 low-poly packs, and everything you learned in [Step 2](/game-jam-step-2-assets/) about licenses and `CREDITS.txt` applies unchanged.

**Stretch (take-home):**

1. Download a Kenney 3D pack that includes `.glb` files.
2. Drag a `.glb` into your project's FileSystem. Godot imports it as a scene.
3. Drag that scene into the viewport, scale it until it looks right, and delete the old `MeshInstance3D`.

> **Note:** if a model is huge or invisible, change its **Scale**. 3D models come in all sizes. That's in the [troubleshooting table](/game-jam-troubleshooting/).

## Exporting a 3D game

The same Web export you used in Step 5 works here: **Project → Export → Add → Web**. The 3D starter uses the **Compatibility** renderer, which is the one that runs in browsers.

## Checkpoint

- [ ] The 3D starter ran
- [ ] You made at least three of the five edits
- [ ] You can say which parts were identical to 2D

Next: **[Step 6: Where to go next](/game-jam-step-6-next/)**.
