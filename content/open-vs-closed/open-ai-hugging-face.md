---
layout: libdoc_page.liquid
permalink: /open-ai-hugging-face/
title: Try Open-Source AI - Hugging Face & Ollama
description: Hands-on and free — browse the open-source model hub, try live demos in your browser with Hugging Face Spaces, and run open models locally on your own machine with Ollama.
eleventyNavigation:
    key: Try Open-Source AI (Hugging Face & Ollama)
    parent: Proprietary vs Open-Source AI Models
    order: 4
---

# Try Open-Source AI (for free)

Open-source is not just theoretical. This page is the "aha" moment — ways to *touch* a real open model today, with zero or near-zero setup. Everything here is free and open-source (FOSS).

## What is Hugging Face?

> **Hugging Face is "the GitHub for AI"** — the place where the open-source AI community shares models, datasets and apps.

It's the first place most people go to search for an open AI model. If open-source AI has a front door, this is it.

## 1. Browse the model hub (no code)

The **[Hugging Face Hub](https://huggingface.co/models)** is a searchable repository of hundreds of thousands of models. You can:

- Search by name, task (text generation, image, speech) or license.
- Read each model's **Model Card** — a page explaining its purpose, limitations and license.
- Download a model's **weights** and run it yourself.

Try searching for `Llama`, `Mistral`, or `Qwen` to see famous open models with their cards.

## 2. Try a live demo (no code at all) — Spaces

**[Hugging Face Spaces](https://huggingface.co/spaces)** are interactive demos you can open in your browser and click around — no install, no code. This is the fastest "wow" demo during a talk.

- Browse popular Spaces: <https://huggingface.co/spaces>
- Many of the community's best demos live here and run a real model in real time.

> **Tip for the session:** open a Spaces demo live in the talk and ask the audience to type something. It's the "let's see a model think" moment.

## 3. Run a model on your own machine — Ollama

**[Ollama](https://ollama.com/)** is the easiest free, open-source way to run open models **locally** on your own laptop — private, offline, and $0 for the software.

```bash
# Install Ollama, then pull and run an open model:
ollama run llama3.2
```

That one command downloads an open model and gives you a local `ChatGPT`-style chat in your terminal. No account, no API key, no data leaving your machine. This is the privacy story of open-source made tangible.

## 4. Go further: a Python library and fine-tuning

- **[Transformers library](https://huggingface.co/docs/transformers)** — Hugging Face's free Python library that loads and uses almost any open model in a few lines (`from transformers import pipeline`).
- **[Google Colab](https://colab.research.google.com/)** — free cloud notebooks with free GPUs, the easiest way to run or **fine-tune** (adapt) an open model without owning a GPU.

## Session "aha" moments to reuse

- Open a **Spaces** demo live and let the audience play.
- Show a **proprietary pricing page** vs a **free open alternative** side by side.
- Pull down **Ollama** on your machine and show a model answering *with no internet*.

Next: the bigger picture and a shelf of resources → **[Resources & Glossary](/open-ai-resources/)**
