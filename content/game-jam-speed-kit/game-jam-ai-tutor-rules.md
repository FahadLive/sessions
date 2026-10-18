---
layout: libdoc_page.liquid
permalink: /game-jam-ai-tutor-rules/
title: AI Tutor Rules (one-page handout)
description: "How to use an AI chat as a tutor for Godot 4 and GDScript. Includes a paste-in opening prompt, the rules that keep it useful, and eight good-versus-bad example prompts, including asset and license questions."
eleventyNavigation:
    key: AI Tutor Rules
    parent: Game Jam Speed Kit
    order: 11
---

# AI tutor rules

An AI chat can be a patient tutor. It can also write you a game you don't understand, break it, and leave you stuck. These rules keep it a tutor. Print this page or keep it open.

> **The big rule:** don't ask the AI to write your whole game. Ask it to **explain, review and unblock**.

## Start every new chat with this

Copy this and paste it as your **first message**:

```text
I'm a beginner using Godot 4.x, GDScript, 2D. Don't use Godot 3 syntax.
Explain simply. Give one small step at a time and ask what I see on screen.
Offer the fastest option first. If you're not sure a node, property or URL
exists, say "I'm not sure, check the docs" instead of guessing.
Keep code examples under 15 lines.
```

> **Why Godot 3 matters:** older tutorials, which the AI learned from, use Godot 3 words like `KinematicBody2D`, `onready` and `yield`. Godot 4 uses `CharacterBody2D`, `@onready` and `await`. Mixed syntax is the most common reason pasted code fails.

## The rules

1. **Paste the exact error message** (copy it from the **Output** panel, don't retype it) **and the relevant script**.
2. **Ask for one small change at a time.** Run it. Then ask for the next.
3. **Before you paste code, ask:** _"Explain this line by line."_ If you can't explain a line, don't paste it.
4. **Good things to ask the AI for:** asset search ideas, a shopping list of assets for your game idea, a `CREDITS.txt` layout, an import checklist, a cut list, a debug explanation.
5. **If its fix fails twice, stop.** Press **F1** in Godot (search the built-in docs) or ask the facilitator. Third and fourth attempts usually make it worse.
6. **Never trust the AI for licenses.** Verify the license on the **asset's own page**, every time.
7. **Never trust the AI for links or node names either.** If a link or a node doesn't exist, it made it up. Check the docs.
8. **Check the jam's rules on AI-generated assets** before using any.

## Eight example prompts

| # | ❌ Weak prompt | ✅ Strong prompt | Why |
| - | -------------- | ---------------- | --- |
| 1 | "Make me a game." | "I have a top-down Godot 4 game where a `CharacterBody2D` moves with arrow keys. How do I add a coin using an `Area2D`? One step at a time." | Small, specific, and states what you already have |
| 2 | "It's broken." | "Godot says `Invalid call. Nonexistent function 'add_point' in base 'Nil'` at `coin.gd` line 5. Here's the script: [paste]. What does the message mean?" | Exact error plus the script |
| 3 | "Fix my code." | "Explain this script line by line like I've never coded: [paste]." | You learn something, not just paste something |
| 4 | "Write the whole player controller with jump, dash, wall-slide and double jump." | "Add one thing: a jump when I press Space. Show only the lines to add and say where they go." | One change at a time |
| 5 | "Give me free art for my game." | "I'm making a top-down dungeon coin collector. Give me a shopping list of 6 assets (hero, tileset, coin, pickup sound, music, font) and the search words to find them on Kenney and OpenGameArt." | A list and search words, not links you can't trust |
| 6 | "Is this asset free to use?" | "I'm looking at an asset page. Here's the license text I copied: [paste]. Explain in simple words what I can and can't do, and what I should write in `CREDITS.txt`." | You paste the license from the page, so the AI isn't guessing |
| 7 | "My pixel art looks bad." | "My 16×16 pixel sprite looks blurry in Godot 4.6 at 2× scale. What setting should I check? Say where it is in Project Settings." | One symptom, version and context |
| 8 | "What should I cut?" | "Here's my game's one-sentence core loop and my feature list: [paste]. I have 4 hours left. Which 3 features should I cut first?" | Gives it the constraints so the answer is useful |

## Quick checks before you paste AI code

- [ ] Does it use `@onready`, `@export`, `CharacterBody2D`? (Good: that's Godot 4.)
- [ ] Does it use `onready`, `KinematicBody2D`, `yield`, `connect("signal", self, "func")`? (Bad: that's Godot 3. Ask for a Godot 4 version.)
- [ ] Do the node names in `$Name` match your Scene tree, letter for letter?
- [ ] Can you explain every line?

## Assets and AI

- An AI can suggest **where to look** and **what to search for**. It can't tell you a license.
- If **you** generate art or sound with an AI tool, check the jam's rules first, say so on the page if the jam asks, and note it in `CREDITS.txt`.

Back to the [overview](/game-jam-overview/).
