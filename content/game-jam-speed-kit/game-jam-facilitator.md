---
layout: libdoc_page.liquid
permalink: /game-jam-facilitator/
title: Facilitator Notes
description: "A pre-session checklist, pacing, per-step checks, common stuck points and a list of placeholder images and embeds to replace for the Game Jam Speed Kit 3-hour session."
eleventyNavigation:
    key: Facilitator Notes
    parent: Game Jam Speed Kit
    order: 16
---

# Facilitator notes

## Before the session (do this yourself)

- [ ] **Open both starters in Godot 4.6 and press F5.** The projects were written by hand and **have not been opened in the editor yet**. This is the single most important check. Fix anything that isn't as the guide says (and tell the author).
- [ ] Walk through Steps 1–5 once. Confirm each "You should see".
- [ ] Look at the **Step 3** menu paths in your Godot version: the **Default Texture Filter** location, the **Sprite Frames** panel and the TileSet panel.
- [ ] Put these on a USB stick or a shared drive: Godot 4.6 for each OS, the **export templates** (`.tpz`), `coin-rush-starter.zip`, `coin-rush-assets.zip`, `coin-rush-3d-starter.zip`.
- [ ] Ask participants to do **Step 0** beforehand (Godot, templates, itch.io account).
- [ ] Check venue wifi can reach kenney.nl, sfxr.me and itch.io.
- [ ] Replace the placeholders listed below, if you have real screenshots.

## Timeline

| Time | Step                                   | Watch for                                                                                       |
| ---- | -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 0:00 | [Step 0](/game-jam-step-0-setup/)      | Nobody has templates or an account. Fix now                                                     |
| 0:10 | [Step 1](/game-jam-step-1-build-core/) | Paste errors (indentation). Slow typists. Make sure everyone has **win, lose, restart** by 0:45 |
| 0:45 | [Step 2](/game-jam-step-2-assets/)     | Wifi. Fall back to `coin-rush-assets.zip`                                                       |
| 1:10 | Break (15 min)                         | Anyone behind? Catch them up now                                                                |
| 1:25 | [Step 3](/game-jam-step-3-import/)     | Blurry sprites, **TileMapLayer covering the player**, music not looping                         |
| 1:55 | [Step 4](/game-jam-step-4-polish/)     | Typos in node names. Tell fast finishers to do the stretch menu                                 |
| 2:20 | [Step 5](/game-jam-step-5-export/)     | Zip with a folder inside, Thread Support, missing templates                                     |
| 2:40 | [3D showcase](/game-jam-3d-showcase/)  | Demo 2 minutes on screen, then let them explore                                                 |
| 2:55 | [Step 6](/game-jam-step-6-next/)       | Make sure everyone has their link                                                               |

## How to help

- **Wait 5 minutes before touching anyone's keyboard.** Ask: _"What did you expect to happen? What happened instead? Where does that number live?"_
- Point at the **Output** panel and the **line number** before anything else.
- If someone is more than one step behind at the break, give them the finished project state: they can skip ahead and catch up, or re-import the starter. Don't let them sit silently stuck.
- **Don't allow "do whatever you want" before Step 5 is done.** Everyone ships first. Free-style is the Step 6 take-home.

## If time runs short

| Cut                                                        | Keep                               |
| ---------------------------------------------------------- | ---------------------------------- |
| The AnimatedSprite2D bonus and Exercise 5 (font) in Step 3 | Sprite, TileMapLayer, sound, music |
| Everything after 4.3 in Step 4                             | Sounds and the score pop           |
| The 3D showcase to a demo only                             | **Step 5. Never cut the export**   |

## Placeholders to replace

| Where            | File (in `assets/game-jam-speed-kit/previews/`)         | Replace with                                      |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------- |
| Overview         | `finished-game.webp` and the commented `gameEmbed`      | A hosted build, or a real screenshot              |
| Overview         | `finished-game.webp`, `shot-3d-showcase.webp`           | Screenshots of a UI-only game and the 3D showcase |
| Overview, Step 2 | `style-2d-pixel.png` is a **mock-up**, not a screenshot | A real screenshot of the finished game            |
| Step 0           | `shot-project-manager.webp`, `shot-first-run.webp`      | Real screenshots                                  |
| Step 3           | `shot-sprite-imported.webp`                             | A real screenshot                                 |
| Step 5           | `shot-export-dialog.webp`, `shot-itch-upload.webp`      | Real screenshots                                  |
| 3D showcase      | `shot-3d-showcase.webp` and the commented `gameEmbed`   | A screenshot, or a hosted 3D build                |

Keep the same file names (and extension, or update the page) so no page edits are needed.

## What's in the files

| File                       | What it is                                                                        |
| -------------------------- | --------------------------------------------------------------------------------- |
| `coin-rush-starter.zip`    | The 2D project: placeholder shapes, scenes wired up, 4 empty scripts to fill      |
| `coin-rush-assets.zip`     | CC0 art, sounds, music and a font, plus `CREDITS-lines.txt` and the license texts |
| `coin-rush-3d-starter.zip` | The finished 3D showcase project                                                  |

Back to the [overview](/game-jam-overview/).
