---
layout: libdoc_page.liquid
permalink: /vibecode-overview/
title: Vibecode Your First Website
description: A 3-day vibe-coding workshop where beginners build an Onam Post Generator with plain HTML, CSS & JavaScript, connect it to the Gemini API, and ship it live on Vercel — no React, no backend, no prior coding required.
eleventyNavigation:
    key: Vibecode Your First Website
    order: 1
---

# Vibecode Your First Website

You're going to build your first website. And not a boring one.

Every Malayali is posting Onam content right now — outfits, pookkalam, sadya, reels. Your website is going to answer one simple question:

> **"I have an Onam photo/reel. What caption, vibe and Malayalam-style text should I post?"**

You won't write most of the code yourself. You'll **steer an AI assistant** to write it for you. Two tools:

1. **[opencode](https://opencode.ai)** — runs in your terminal and writes the code *into your files*. Your builder.
2. **[ChatGPT](https://chatgpt.com/) / [Claude](https://claude.ai/)** (free tier) — a second brain in your browser, for ideas and plain-English error explanations.

That's vibe-coding: tell the computer what you want, check what it gives you, fix what breaks.

In three days you go from **an empty folder** to **a live website on the internet**.

## What you'll build

The **Onam Post Generator** — a small web app. You type what's in your photo, pick a vibe, press a button, and it returns a caption you can copy and post.

- **Day 1 — Build (60 min):** a working website with a description box, vibe buttons and a Generate button. The "AI" is just pre-written captions picked at random.
- **Day 2 — Make it Real (60 min):** the Generate button now calls the **Gemini API** — a real AI model from Google — and gets a real caption written for your exact description.
- **Day 3 — Ship it (60 min):** make it work on phones, push it to GitHub and deploy it to Vercel. Your website gets a public URL, e.g. `yourname-onam.vercel.app`, that anyone can open.

## How it works

|                 | Day 1                    | Day 2                    | Day 3            |
| --------------- | ------------------------ | ------------------------ | ---------------- |
| **Project**     | Onam Post Generator      | AI Onam Post Generator   | Live AI App      |
| **New thing**   | JavaScript               | API + AI                 | Deployment      |
| **Core skill**  | Build                    | Integrate                | Ship             |
| **Output**      | Working website          | Real AI product          | Public URL       |
| **Stack**       | HTML / CSS / JS          | + Gemini                 | + GitHub/Vercel |

And how each day should feel:

> **Day 1 — "I built a website."**
> **Day 2 — "I connected an AI to my website."**
> **Day 3 — "I shipped an AI application."**

## What you need

- [opencode](https://opencode.ai) — the AI that writes and edits your code (free)
- [ChatGPT](https://chatgpt.com/) or [Claude](https://claude.ai/) — free tier, second brain for ideas and errors (free)
- A [GitHub](https://github.com/) account — where your code lives online (free)
- **That's it.** No editor to learn, no React, no Next.js, no npm, no database, no auth, no complicated setup.

To keep setup near zero, everyone gets the same tiny starter:

```text
onam-post/
├── index.html
├── style.css
└── script.js
```

## The plan

| Page                        | What it covers                        |
| --------------------------- | ------------------------------------- |
| [Day 1](/vibecode-day-1/)    | Build the website (UI + JavaScript)  |
| [Day 2](/vibecode-day-2/)    | Connect it to a real AI (Gemini API) |
| [Day 3](/vibecode-day-3/)    | Ship it live (GitHub + Vercel)       |

## Why Onam?

Because it's what everyone is posting this week — kasavu outfits, pookkalam, sadya everywhere on Reels. Building something people are *actually* doing makes it feel real.

Start with **[Day 1](/vibecode-day-1/)** — this is the "wow" day, where you see a website appear in the first ten minutes.