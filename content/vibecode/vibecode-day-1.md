---
layout: libdoc_page.liquid
permalink: /vibecode-day-1/
title: Day 1 - Build the Website
description: Build a working Onam Post Generator in 60 minutes — a description box, vibe buttons and a Generate button that picks from pre-written captions — and learn the debugging mindset behind vibe-coding.
eleventyNavigation:
    key: Day 1
    parent: Vibecode Your First Website
    order: 2
---

# Day 1 (60 min): "Oh, I built a website" — Build

**Goal by end of session:** a working website with a description box, vibe buttons and a Generate button that returns a caption. It isn't real AI yet — the computer picks from captions we wrote into the code. That's intentional.

The app we're aiming for:

```text
┌────────────────────────────────────────────┐
│             ONAM POST™ 🌼                  │
│                                            │
│  Tell us about your post                   │
│                                            │
│  What's in the photo?                      │
│  [ Onam sadya with friends              ]  │
│                                            │
│  Your vibe                                 │
│  [   ✨ Aesthetic   ] [ 😂 Chaos ]         │
│                                            │
│  [ GENERATE POST ]                         │
│                                            │
└────────────────────────────────────────────┘
```

## Your tools, in 30 seconds

- **opencode** (terminal) — type what you want, it writes the code into your files.
- **ChatGPT / Claude** (browser) — a second brain for ideas and plain-English error explanations.

One rule: **opencode edits the files. ChatGPT/Claude only talks.** To see your site, open `index.html` in your browser (or ask opencode to start a local server).

## Starting point

Everyone starts with the same tiny folder — already created in the `onam-post/` folder on your machine:

```text
onam-post/
├── index.html
├── style.css
└── script.js
```

Each file is just a few lines of a placeholder. Three files, three jobs:

- `index.html` — the words and structure you see ("what's in the photo?", the button)
- `style.css` — the look and feel (colors, spacing, fonts, Onam vibes)
- `script.js` — the behavior (what happens when you click Generate)

Simple version: **HTML is the skeleton, CSS is the clothes, JavaScript is the behavior.**

## 0–10 min — Build the first version together

We build together, live. Prompt opencode to create:

- An Onam-themed landing page
- A description input ("What's in the photo?")
- Vibe selector buttons (✨ Aesthetic, 😂 Chaos, …)
- A **GENERATE POST** button
- A result card that shows the caption

**Within ten minutes you have a website.** That's the whole point of this day — not to explain everything, but to feel the momentum.

## 10–35 min — Build your own

Now you steer. The team prompt:

> "I have an Onam photo/reel. What caption, vibe and Malayalam-style text should I post?"

### Required — every app must have

- Post description input
- Vibe selection
- Generate button
- Caption result

### Optional — pick whichever you like

- Malayalam / English toggle
- Emoji intensity slider
- Hashtag generation
- "Cringe level"
- Dark mode

The AI does almost all the typing. Your job is to **steer** — decide what feature to ask for next, in English, and keep the requests small and specific. One feature per prompt.

## 35–50 min — The important part: debugging

Right on schedule, something breaks. Don't panic — that's the lesson.

Real examples from this kind of workshop:

```text
Button does nothing.
```

```text
Malayalam text looks broken.
```

```text
CSS destroyed the layout.
```

```text
AI removed something that was already working.
```

Here's the workflow that separates a vibe-coder from a mess:

> **Don't regenerate the entire application. Diagnose the specific problem.**

Describe the exact symptom to the AI:
- What did you click?
- What did you expect?
- What actually happened?
- Can you open the browser's developer console (right-click → **Inspect** → **Console**) and paste the red error text? Not sure what it means? Paste it into ChatGPT or Claude for a plain-English explanation.

This is where the actual vibe-coding skill lives: the AI writes fast, but **you** decide whether what it wrote is right, and you point it at the exact spot it got wrong.

## 50–60 min — Day 1 checkpoint

Everyone should have a **working Onam Post Generator**. It isn't AI-powered yet — "Generate" just picks a random caption from a list we typed into `script.js`. That's OK. Day 1 is:

> **UI + basic JavaScript**

The result card looks like this:

```text
┌────────────────────────────────────────────┐
│  🌼 YOUR ONAM POST                         │
│                                            │
│  Caption                                   │
│  "Sadya kazhichu... ini jeevitham          │
│   oru urakkam mathram."                    │
│                                            │
│  #Onam2026 #OnamVibes #Malayali            │
│                                            │
│  [ COPY CAPTION ] [ TRY AGAIN ]             │
└────────────────────────────────────────────┘
```

**Stretch challenge:** change the pre-written captions so one of them is about *you* — your friend group, your hometown festival, your family's sadya.

Day 1 done. Tomorrow the computer stops pretending.

Continue to [Day 2](/vibecode-day-2/).