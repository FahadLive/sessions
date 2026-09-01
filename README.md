# Guides

**Guides** is a personal [Eleventy][11ty] site, built on the [Eleventy LibDoc](https://github.com/ita-design-system/eleventy-libdoc) starter, that hosts the session and workshop notes I run. Each series is a set of step-by-step guides with copy-paste code blocks, covering a different topic.

## Series

- **Vibecode Your First Website** — A 3-day vibe-coding workshop for beginners. Build an Onam Post Generator with plain HTML, CSS and JavaScript, connect it to the Gemini API, and ship it live on Vercel — no React, no backend, no prior coding required.
- **Air Pencil Workshop** — A two-session Python workshop that turns your webcam into an air pencil. Track your index fingertip with MediaPipe Hand Landmarker and draw on screen by pointing at it.
- **E-commerce App** — A comprehensive guide series for building an e-commerce app with Supabase and Next.js: product listing, cart, checkout, orders and admin auth.
- **Proprietary vs Open-Source AI Models** — A beginner-friendly, reference-style guide series (with FOSS links) explaining what an AI model is, how open vs proprietary models differ, and how to try open-source AI on Hugging Face and Ollama.

## Getting started

Local development uses [pnpm](https://pnpm.io/) and the Eleventy CLI:

```bash
pnpm install
pnpm dev   # runs npx @11ty/eleventy --serve
```

The dev server builds the site and serves it locally with live reload, so you can edit a guide and see the change immediately.

## Structure

| Path                        | Purpose                                                                          |
| --------------------------- | -------------------------------------------------------------------------------- |
| `index.md`                  | Home page                                                                        |
| `content/ecommerce/`        | E-commerce App guides (products, cart, checkout, orders, admin auth)             |
| `content/air-pencil/`       | Air Pencil Workshop guides (setup, day 1, day 2)                                 |
| `content/vibecode/`         | Vibecode Your First Website guides (day 1-3)                                     |
| `content/open-vs-closed/`   | Proprietary vs Open-Source AI Models reference guides                            |
| `_data/`                    | Site settings, LibDoc config and functions                                       |
| `_includes/`                | Eleventy / LibDoc templates and layouts                                          |
| `core/`                     | LibDoc core assets                                                               |
| `assets/`                   | Site assets (favicons, opengraph image, sample products)                         |
| `settings.json`             | Site title, description, author and custom links                                 |
| `.eleventy.js`              | Eleventy config: plugins, filters, collections and shortcodes                    |

Content guides live under `content/<series>/`. Each page's front matter sets a `permalink` so its output URL stays at the site root (e.g. `content/ecommerce/cart-page.md` → `/cart-page/`), independent of the folder it lives in.

## Configuration

Site-wide settings live in [`settings.json`](settings.json):

- `siteTitle` / `siteDescription` — site name and tagline
- `author` — content author
- `customLinks` — links shown in the header (e.g. About Me, GitHub)
- `ogImageUrl` / `faviconUrl` — social share and favicon assets

## Built with

- [Eleventy][11ty] — the static site generator
- [Eleventy LibDoc](https://github.com/ita-design-system/eleventy-libdoc) — the documentation starter
- [11ty Navigation](https://github.com/11ty/eleventy-navigation), [11ty Image](https://github.com/11ty/eleventy-img) and [11ty RSS](https://github.com/11ty/eleventy-plugin-rss) plugins

## License

[MIT](LICENSE)

[11ty]: https://www.11ty.dev/
