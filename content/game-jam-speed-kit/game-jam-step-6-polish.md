---
layout: libdoc_page.liquid
permalink: /game-jam-step-6-polish/
title: Step 6 - Polish Pass (20 min)
description: A 20-minute polish order that works — sound, screen shake or hit flash, a title screen, restart, and squashing the worst bug — until someone else can play your game without you explaining it.
eleventyNavigation:
    key: Step 6 - Polish
    parent: Game Jam Speed Kit
    order: 8
---

# Step 6 (20 min): The polish pass

Your game works. Now the 20 minutes that separate "it works" from "*it feels good*". Polish is not decoration — it's **communication**: every sound and flash tells the player what just happened.

Work in this exact order. Each is small, and the order is chosen so that even if the timer runs out mid-list, everything above the line is already shipped.

## 1. Sound everywhere it matters (7 min)

A game with sound on events feels 3× more finished than the same game silent. Audit your loop and add a sound to every event that matters:

| Event | Sound |
| ----- | ----- |
| Collect / pickup | short bright blip (jsfxr "pickup") |
| Hurt / lose | lower, rougher (jsfxr "hit") |
| Win / goal | little fanfare (jsfxr "powerup") |
| Button click (Track B) | tiny "blip" |
| Background | one looping music track, `Volume DB` around **-15** |

The pattern each time: an `AudioStreamPlayer` next to the thing, `$Name.play()` in the moment. If two sounds fight, lower music, not effects.

## 2. Screen shake or hit flash (4 min)

Pick **one**. Both are three-line dopamine.

**Screen shake** (on hit/collect) — put this in your camera's script (or player's, with `$Camera2D` paths):

```gdscript
func shake() -> void:
	var tween := create_tween()
	tween.tween_property($Camera2D, "offset", Vector2(6, 0), 0.05)
	tween.tween_property($Camera2D, "offset", Vector2(-6, 0), 0.05)
	tween.tween_property($Camera2D, "offset", Vector2.ZERO, 0.05)
```

Call `shake()` from the moment of impact. Five lines: `0.15` seconds of chaos, perfectly recovered.

**Hit flash** — on the thing that gets hit:

```gdscript
func flash() -> void:
	modulate = Color.WHITE
	var tween := create_tween()
	tween.tween_property(self, "modulate", Color(1, 0.3, 0.3), 0.15)
```

> **Key insight:** shake communicates **force**; flash communicates **"you hit that"**. Both are cheaper than animation and read instantly at jam-game speed. If you only have two minutes, do the flash.

## 3. Title screen (4 min)

Three versions, easiest first:

1. **A label that says the name.** Add a `TitleLabel` to your main scene — big font (Theme Overrides → Font Size: `48`) — and hide the game behind it: on any keypress (`_input`, `ui_accept`), `title_label.hide()`.
2. **A separate `title.tscn`** with the name and "Press Space", whose script swaps scenes: `get_tree().change_scene_to_file("res://scenes/main.tscn")`. Proper main menu, ten minutes.
3. **Cut it.** A title screen on the cut list is legal. The itch.io page title already says the name.

Whatever you pick: **the first 5 seconds must teach the goal.** "Collect 10 before the timer runs out" as a subtitle on the title screen is worth more than any menu.

## 4. Pause and/or restart button (2 min)

- **Pause:** `get_tree().paused = true` freezes everything whose **Process Mode** allows it (set a pause-menu Label to Process Mode: Always). Unpause reverses it. Bound to `ui_cancel` (Esc), it's two lines of insurance.
- **Restart:** `get_tree().reload_current_scene()` on `R` — or the Space restart from Step 5, Booster 7.

## 5. Fix the worst bug (3 min)

Squash the **one** bug a player would call "broken" — the thing that loses their progress or kills the fun. Ignore cosmetic weirdness entirely right now.

## The friend test (the real checkpoint)

Hand over the keyboard. **Do not talk.** Watch for 60 seconds. Someone who has never seen your game should be able to:

- [ ] Start it and know what to do
- [ ] Understand when they've done well or badly
- [ ] Restart without asking you how

If they stall, that's not them being slow — that's a missing signpost. Add the sound, the flash, or the line of text that answers the question they just silently asked.

> **Key insight:** polish is the last 20 minutes and the first impression. Sound → feedback → title → restart → worst bug, in that order. When the timer rings, **stop and go to export**. A rough game uploaded beats a perfect game on your disk — every jam, forever.

Next: **[Step 7](/game-jam-step-7-export/)** — the part where your game leaves your laptop.
