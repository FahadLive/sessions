---
layout: libdoc_page.liquid
permalink: /vibecode-day-3/
title: Day 3 - Ship Your Website
description: Turn the AI Onam Post Generator into a real product — mobile-ready with loading and error states — then push it to GitHub and deploy it live on Vercel with people watching it fail and get fixed on production.
eleventyNavigation:
    key: Day 3
    parent: Vibecode Your First Website
    order: 4
---

# Day 3 (60 min): "It's on the internet" — Ship

**Goal by end of session:** your app is deployed. `localhost` (only you can see it) becomes something like `yourname-onam.vercel.app` (everyone with the link can open it, on any phone).

No new big technology today. Today answers one question:

> **"How do I take what I built and actually release it?"**

## 0–15 min — Make it production-ready

Everyone has an AI generator. Now it has to feel like a real product. Checklist to run through the AI:

- [ ] Mobile responsive (open it on a phone — does it look right?)
- [ ] Loading state ("Generating…", not a frozen button)
- [ ] Error message (a friendly one when something goes wrong)
- [ ] Copy button
- [ ] Regenerate button
- [ ] Clean URL / app name
- [ ] Favicon (the little icon in the browser tab)
- [ ] README (a short "what is this and how do I run it")

Two prompts you can copy:

> "Audit this application for obvious mobile UI problems. Don't change the functionality."

> "Add proper loading and error states to the Generate button."

The AI does the edits; you review each one before accepting it.

## 15–30 min — GitHub

Time to get it out of your laptop. Git tracks changes, GitHub stores them online:

```text
My laptop
    ↓  git (commit + push)
GitHub
```

1. Go to github.com → **+** → **New repository**. Name it `onam-post`, leave it empty, click **Create repository**.
2. On the next screen, GitHub shows ready-made commands. Copy-paste them into your terminal.

Or just ask opencode: *"commit my code and push it to my new GitHub repo."*

Don't worry about Git theory. Two words: **commit**, **push**.

## 30–45 min — Deploy

Connect GitHub → Vercel:

1. On [vercel.com](https://vercel.com), **Create New Project**.
2. Import the GitHub repo you just pushed.
3. Add the API key as an environment variable (Vercel calls it env).
4. **Deploy.**

A minute later:

```text
localhost          →    yourname-onam.vercel.app
only you                everyone with the link
```

This is the second big **wow moment** — everyone opens their site on their phone from their real seats.

## 45–55 min — Fix production

Someone will say (it's practically guaranteed):

> "Sir, it works on my laptop but not on the website."

That is the lesson. Nothing works twice just because it worked once:

```text
LOCAL         PRODUCTION
  ↓               ↓
WORKS            BROKEN
```

Most likely culprit: the **environment variable**. On your laptop the API key is a file; on Vercel it's a setting you may have forgotten to fill in, or named differently. Diagnose it like Day 1 and Day 2 — don't rebuild, find the spot:

- Check the deployed error message (Vercel shows you logs).
- Confirm the environment variable name matches what the code expects.
- Redeploy and watch it go green.

Everyone absorbs the same lesson:

> **Deployment isn't the end of coding.**

## 55–60 min — Hackathon handoff

You've spent three days building one very specific app. But the hackathon isn't asking for another Onam caption generator. You've learned a **pattern**, and patterns transfer:

```text
INPUT
  ↓
PROCESS
  ↓
OUTPUT
  ↓
SHIP
```

> **For the hackathon, replace the Onam idea with whatever useless idea you can come up with.**

Same pattern, new idea. Maybe "weird sandwich judge". Maybe "cracked excuse generator". The engine — HTML/CSS/JS, one AI API, GitHub, Vercel — is already in your hands.

|                | Day 1                    | Day 2                    | Day 3            |
| -------------- | ------------------------ | ------------------------ | ---------------- |
| **New thing**  | JavaScript               | API + AI                 | Deployment       |
| **Core skill** | Build                    | Integrate                | Ship              |
| **Feeling**    | "I built a website."     | "I connected an AI."     | "I shipped an app." |

You built a website, connected it to AI, and shipped it. That's the entire vibe-coding workshop. Go build something useless.