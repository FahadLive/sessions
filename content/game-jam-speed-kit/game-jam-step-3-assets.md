---
layout: libdoc_page.liquid
permalink: /game-jam-step-3-assets/
title: Step 3 - Get Assets Fast (20 min)
description: A need-to-website-to-time table for free game assets — Kenney, itch.io, OpenGameArt, jsfxr, BeepBox, Piskel, Blockbench — plus the 20-minute hard rule and a tool picker.
eleventyNavigation:
    key: Step 3 - Get Assets Fast
    parent: Game Jam Speed Kit
    order: 5
---

# Step 3 (20 min): Get assets fast

"Assets" is game-dev word for **everything that isn't code or levels**: pictures, models, sounds, music, fonts. Today you download them, you don't make them. Making art is a beautiful time-sink, and you have 100 minutes left.

## The 20-minute hard rule

**Set a timer for 20 minutes. When it rings, you stop downloading — even mid-pack.** Whatever you have, we import next step. Placeholders are legal in a shipped game. An unfinished game is not.

> **Key insight:** assets don't make a jam game fun; **juice** does — sounds, bumps, flashes, which you add in Step 6. Ten mediocre assets with good sound beats gorgeous art in silence, every single time.

## Where to look — by need

| Need | Website | Time it takes |
| ---- | ------- | ------------- |
| Characters, tiles, UI, props — 2D **and 3D kits** | [Kenney.nl](https://kenney.nl) | 5–8 min, no account |
| More art, more 3D models | itch.io assets (filter by **free**) or [OpenGameArt.org](https://opengameart.org) | 5–10 min |
| Sound effects, in seconds | [jsfxr.me](https://sfxr.me) or ChipTone (in browser) | 2 min, clicky-clicky |
| Music loops | [BeepBox.co](https://beepbox.co) (make your own in-browser) or free tracks on Pixabay | 3–5 min |
| Fonts | [Google Fonts](https://fonts.google.com) | 2 min |
| Quick pixel art, or editing other people's art | [Piskel](https://www.piskelapp.com) (browser) or [Pixelorama](https://pixelorama.org) (free download) | 5 min |
| Quick edits of any image (recolor, resize, cut out) | [Photopea](https://www.photopea.com) — Photoshop in a browser tab | 2 min |
| Quick low-poly 3D models | [Blockbench](https://www.blockbench.net) (browser version available) | stretch goal only |

> **Note:** every tool above is free, and none needs an account except itch.io (which you already have). If a site demands a login to download something free — close it and get the same thing from Kenney.

## Search like a jammer

Asset sites are huge. Two habits keep you out of the swamp:

1. **Search by kit keyword, not by object.** `"kenney platformer pack"` beats `"platformer art"` — you get a matched set, not fifty strangers. `"free low poly forest itch.io"` beats `"tree model"`.
2. **Open the pack page before downloading anything.** Check: does it have a *character* AND *tiles* AND *UI*? A pack you can theme your whole game around is worth more than three perfect stray sprites.

Suggested searches, by track:

- **Track A (2D):** `kenney platformer pack`, `kenney top-down pack`, `pixel art roguelike tiles free itch.io`
- **Track B (UI):** `kenney UI pack`, `pixel font itch.io`, a Google Font with a bit of personality
- **Track C (3D):** nothing — your Coin Rush starter is complete. If you're hungry, `kenney prototype kit` gives blocks and props that match the primitive look

## Sound in two minutes (do this even if you skip everything else)

1. Open [jsfxr.me](https://sfxr.me).
2. Click **pickup/collect** → a sound plays. Click again for a new variant. Three clicks, pick your favourite → **Download WAV**.
3. Click **hit/hurt** → pick one → download.
4. Click **jump** (or **blip**) → pick one → download.

That's your entire SFX kit. In the browser, no account, no install. ChipTone (search "chiptone") goes deeper — envelopes, noise, music stings — when you fall in love with sound design later.

## Download discipline

- Create one folder on your Desktop: `jam-assets`. Everything goes here.
- **Unzip every pack** into it. Godot can't read zips.
- Aim for **5–10 files total**, not 50. One character, one tile/world set, 2–3 sounds, one font, maybe music. That's a game's worth.
- Delete anything you downloaded "just in case". "Just in case" is how the folder becomes a swamp.

## Tool picker — need X, use Y

Text list version of everything above; stick it on your second monitor:

- Need 2D **or** 3D art, matched sets, zero account → **Kenney.nl**
- Need more art variety or a niche theme → **itch.io assets (free filter)**, **OpenGameArt**
- Need a sound effect in under 60 seconds → **jsfxr.me** (or **ChipTone** for finer control)
- Need a music loop you can call your own → **BeepBox.co**
- Need music you'd never guess is free → **Pixabay** (music section)
- Need a chunky readable font → **Google Fonts** (search "pixel" or "display")
- Need to draw or edit pixel art → **Piskel** (browser), **Pixelorama** (free app)
- Need to edit *any* image fast (resize, recolor, cut out) → **Photopea** (browser)
- Need a simple low-poly 3D model → **Blockbench**
- Need to do anything at all in 3D today → **don't** — the Coin Rush starter already has everything

## Checkpoint

- [ ] Timer rang (or is about to)
- [ ] `jam-assets` folder has 5–10 unzipped files
- [ ] At least: 1 sound effect. (Non-negotiable. Step 6 depends on it.)

If your downloads failed (venue wifi, blocked sites) — don't panic. `icon.svg` in your Godot project is already legal art, jsfxr works offline in most setups, and your facilitator has an offline backup pack. Move on.

Next: **[Step 4](/game-jam-step-4-import/)** — getting those files *into* the game.
