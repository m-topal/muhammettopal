# Muhammet Topal website revision

This folder is a revised GitHub Pages/Jekyll version of the site.

## What changed

- Homepage redesigned as a short billboard, not a long one-page CV.
- Blog given a separate visual place in the navigation.
- Blog page redesigned with search, toolbar, browse boxes, featured essays, podcasts, videos, and latest archive.
- Research and Teaching pages filled with starter text instead of placeholders.
- Contact page simplified and the unfinished Formspree placeholder removed.
- Warm archival newspaper style added in `assets/css/style.css`.
- Client-side search/filtering added in `assets/js/search.js`.

## How to use

Copy these files into your GitHub repository, replacing the existing files.

Important: `_config.yml` currently has:

```yaml
baseurl: "/muhammettopal"
```

This is correct for the current preview URL:

```text
https://m-topal.github.io/muhammettopal/
```

When the custom domain `muhammettopal.com` is connected, change it to:

```yaml
baseurl: ""
```

## Adding a new blog post

Create a new Markdown file inside `_posts/` with this filename pattern:

```text
YYYY-MM-DD-short-title.md
```

Example:

```markdown
---
title: "A Note on Ottoman Anti-Imperialism"
date: 2026-07-10
category: essays
format: essay
tags: [Ottoman Empire, anti-imperialism, public life]
reading_time: "5 min read"
---

Post text goes here.
```

For video posts, use:

```yaml
format: video
category: videos
```

For podcast posts, use:

```yaml
format: podcast
category: podcast
```
