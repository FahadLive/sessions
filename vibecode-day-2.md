---
layout: libdoc_page.liquid
title: Day 2 - Connect a Real AI
description: Upgrade the Onam Post Generator so Generate actually calls the Gemini API — understand what an API is, customise your vibes and outputs, and debug the real problems that show up on day two.
eleventyNavigation:
    key: Day 2
    parent: Vibecode Your First Website
    order: 3
---

# Day 2 (60 min): "It's actually AI now" — Integrate

**Goal by end of session:** the Generate button no longer picks from a list. It sends your description to the **Gemini API** — a real AI model from Google — and Gemini writes the caption.

Yesterday the computer was pretending to be smart. Today we connect it to an actual AI.

## 0–10 min — What's an API?

An **API** (Application Programming Interface) is just a postal address for asking a program to do something. One diagram, that's all you need:

```text
OUR WEBSITE
     │
     │ "Generate caption"
     ▼
GEMINI
     │
     │ "Here's the caption"
     ▼
OUR WEBSITE
```

Your website doesn't understand "write me a funny Onam caption" any better than you'd expect a toaster to. **Gemini does.** An API is the doorway your website knocks on to hand the question over.

## 10–20 min — The Day 2 reveal

Open Monday's app. Type:

> "Me and my friends standing next to a huge pookkalam."

Click **GENERATE**.

Before the change, it returns something from our fixed list. After connecting the Gemini API, it returns something like:

> "Pookkalam ready. Squad also ready. 🌼"

That's the visible shift: it read *your* words and answered them. You demonstrate the code change, and everyone follows along. One new extra: a serverless function in the starter repo under `/api/generate` — your frontend calls that, and *that* calls Gemini. You don't need to understand it, just call it.

## 20–45 min — Make it yours

Now customize. Ask the AI to add any of these:

### Vibes

- ✨ Aesthetic
- 😂 Mallu chaos
- ❤️ Romantic
- 🗿 Deadpan
- 👨‍👩‍👧 Family
- 🥘 Sadya
- 🥂 College Onam

### Output — pick which ones you want

- Full caption
- Short caption
- Malayalam caption
- Hashtags

Keep every prompt small: *"add a Malayalam caption option next to the English one"*, not *"make it better"*.

## 45–55 min — Debugging (this is where the real problems arrive)

Adding a real AI means real errors. Some you'll hit today:

- **API key issues** — the key is wrong, missing, or not loaded.
- **Wrong request format** — Gemini expects a specific JSON shape and says no.
- **Quota / rate limits** — too many free requests in a few minutes.
- **Malformed JSON** — Gemini replies with something your code can't read.
- **Unexpected text** — the AI went off-script and returned nonsense.
- **CORS / security errors** — the browser refuses to talk to the endpoint.

Same rule as Day 1: **diagnose, don't regenerate.** Copy the exact error into the AI and describe what you clicked.

## 55–60 min — Day 2 checklist

- [ ] Generate actually returns a caption written *for your description*
- [ ] Your chosen vibe changes the caption's tone
- [ ] At least one extra output (hashtags, short, Malayalam) works
- [ ] The API key is **not** visible anywhere in the browser code

## The key architecture decision

Don't put the Gemini API key directly in the browser. Anyone who opens your site could read it and use up your quota (or your money).

Instead, the starter repo already contains a tiny **serverless function**:

```text
Your frontend
     │
     ▼
/api/generate   ← your secret key lives here, safely on the server
     │
     ▼
Gemini
```

Your site calls `/api/generate`; that tiny function holds the secret and calls Gemini for you. You don't have to build it — it's in the starter. You just learn that **frontend talks to an address, server holds the secrets** — and in Day 3 that ends up on Vercel.

## Finish

The difference is now clear:

|            | Day 1 (fake)                  | Day 2 (real)                   |
| ---------- | ----------------------------- | ------------------------------ |
| **Flow**   | Button → JavaScript → list    | You → Website → /api → Gemini  |
| **Result** | A caption we wrote             | A caption written for *your* photo |

Continue to [Day 3](/vibecode-day-3/).