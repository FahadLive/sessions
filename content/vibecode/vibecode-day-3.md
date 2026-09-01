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

### Step 1 — Open terminal and go to your project

Open your terminal (Terminal on Mac/Linux, Command Prompt or PowerShell on Windows) and navigate to your project folder:

**Linux / Mac:**
```bash
cd ~/path/to/onam-post
```

**Windows:**
```cmd
cd C:\Users\YourName\path\to\onam-post
```

### Step 2 — Make sure you're in the right place

Check that you're inside your project folder by looking at the path and listing the files:

**Linux / Mac:**
```bash
pwd          # shows your current path
ls           # lists files — you should see index.html, app.js, etc.
```

**Windows:**
```cmd
cd           # shows your current path
dir          # lists files — you should see index.html, app.js, etc.
```

If the files are there, you're in the right spot.

### Step 3 — Initialize Git (one-time only)

```bash
git init
```

This creates a hidden `.git` folder in your project. That folder stores every commit, every version, everything Git needs to track your code. **You only run this once** — if you run it again in the same folder, nothing bad happens (Git just says "already a Git repo"), but there's never a reason to.

### Step 4 — Stage all your files

```bash
git add .
```

The `.` means "everything in this folder."

### Step 5 — Commit

```bash
git commit -m "first commit"
```

This saves a snapshot. Think of it as hitting "save" — but only when you tell it to.

### Step 6 — Create a GitHub repo

1. Go to [github.com](https://github.com) → click the **+** icon (top-right) → **New repository**
2. Name it `onam-post`
3. Leave it **empty** — no README, no `.gitignore`, nothing
4. Click **Create repository**

### Step 7 — Copy the repo link

After creating the repo, GitHub shows a "Quick setup" page. Look for the section that says **"…or push an existing repository from the command line"** — copy the URL shown there. It looks like:

```text
https://github.com/yourusername/onam-post.git
```

### Step 8 — Link your local project to GitHub

```bash
git remote add origin https://github.com/yourusername/onam-post.git
```

Replace the URL with your actual repo link. This tells Git: "this is where I want to push."

### Step 9 — Push

```bash
git push -u origin main
```

GitHub may ask you to sign in — follow the prompts. After that, your code is on GitHub.

---

**Shortcut:** Or just ask opencode: *"commit my code and push it to my new GitHub repo."*

## 30–45 min — Deploy

Connect GitHub → Vercel:

### Step 1 — Create a Vercel project

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click **Create New Project**
3. **Import** the GitHub repo you just pushed
4. Vercel auto-detects your framework — leave the defaults, click **Deploy**

You'll see a build log. Wait for the green "Congratulations!" — but you're not done yet.

### Step 2 — Add environment variables

Your app has an API key (in your `.env` file) that Vercel doesn't know about yet. If you skip this step, the deployed site will break.

1. In your Vercel project dashboard, go to **Settings**
2. Click **Environment Variables**
3. For each variable in your `.env` file, add a new entry:
   - **Key:** the variable name (e.g., `AI_API_KEY`)
   - **Value:** the variable value (paste the same key from your `.env` file)
4. Click **Save**

**Why can't we just hardcode the API key in the code?** Because if you push that key to GitHub, anyone can see it and use it — and you'll get charged. API keys are like passwords: keep them out of your code. [Read more](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions#using-secrets).

### Step 3 — Redeploy

After adding env vars, Vercel doesn't automatically redeploy. Go to the **Deployments** tab and click **Redeploy** on your latest deployment. This forces Vercel to rebuild with your environment variables included.

### Step 4 — Open your live site

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

