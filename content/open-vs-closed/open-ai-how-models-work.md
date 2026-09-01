---
layout: libdoc_page.liquid
permalink: /open-ai-how-models-work/
title: How AI Models Work - A Plain-English Primer
description: What an AI model actually is, the Transformer breakthrough and "attention", and how large language models generate text — tokens, embeddings and next-word prediction.
eleventyNavigation:
    key: How AI Models Work
    parent: Proprietary vs Open-Source AI Models
    order: 2
---

# How AI Models Work

This page is the "one or two ideas" version — just enough so the open-vs-closed debate in the next page makes sense. Everything here is a simplification; the resources at the bottom go deeper.

## What an AI model actually is

> **An AI model is like a chef who has read millions of recipes.** When you give it ingredients, it predicts the best dish — even if it's never made that exact dish before.

Technically, a **model** is a huge set of numbers (its **weights**) that encode patterns learned from training data. **Training** is the model learning from examples — like a child learning language by hearing it. Modern models don't "think"; they predict patterns based on what they've seen. The weights *are* the knowledge.

## The secret sauce: Transformers (and "attention")

Every modern AI model — GPT, Claude, Gemini, Llama, Mistral — is built on one architecture called the **Transformer**, introduced in a 2017 paper called [*Attention Is All You Need*](https://arxiv.org/abs/1706.03762).

Before Transformers, models read text one word at a time — slow, and they lost context. Transformers read **all words at once** and figure out which ones matter most. That "figuring out what matters" trick is called **attention**.

Example of attention at work:

> "The cat didn't cross the road **because it was scared**."

The model uses attention to know that **"it"** refers to the **cat**, not the road. Knowing which words relate to which is what makes the model understand meaning instead of just stringing words together.

You don't need the encoders/decoders detail — just remember: **attention = the model deciding which words matter.**

## How an LLM generates text (in plain English)

When a model like ChatGPT writes an answer, it does three things over and over:

**Step 1 — Tokenization.** It breaks your text into tiny pieces called **tokens** — words, subwords, or even characters. "Hi, 👋" might become `["Hi", ",", " ", "👋"]`. Tokens are how the model "reads" text.

**Step 2 — Embeddings.** It converts tokens into numbers, because computers work on numbers. Words with similar meanings get similar numbers — so "king" sits near "queen," and "dog" sits near "puppy." This is how the model finds meaning in relationships.

**Step 3 — Predict the next word.** The model looks at all the previous words, applies attention, and guesses the **most probable next word**. Then it repeats — one word at a time — building a whole response.

This last step is why models sometimes **hallucinate**: they're guessing the most likely next word, not "recalling" a fact. When you type in Google and it predicts your next word, you're seeing this same idea at a tiny scale.

## Go deeper

Practical, free resources:

- **[DeepLearning.AI — How Transformer LLMs Work](https://www.deeplearning.ai/short-courses/how-transformer-llms-work/)** — a free short course if you're new to the idea.
- **[3Blue1Brown — Attention in Transformers](https://www.youtube.com/watch?v=eMlx5fFNoYc)** — the most visual, clear explanation on YouTube.
- **[Hugging Face — Illustrated Transformers / course](https://huggingface.co/learn/nlp-course)** — free, hands-on, and it goes with the practical page later.

Ready to compare the two worlds? → **[Open vs Proprietary](/open-ai-open-vs-proprietary/)**
