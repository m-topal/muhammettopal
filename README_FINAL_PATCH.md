# Final Patch for v11

Apply this patch on top of `muhammettopal_site_v11_home_text_corrected`.

This is a patch, not a full website rebuild.

## What it changes

1. Keeps the navigation tabs visible while scrolling.
2. Adds a reading progress bar at the very top of the page.
3. Adds captions under the Diversions images:
   - Mt. Lemmon rock climbing.
   - Feeding the squirrels in the Grand Canyon.
   - Riding a mustang in Tucson. Her name is Sequoia.
   - Fishing trip with Clìo and Eryka.
4. Keeps the Blog upgrade:
   - `_posts` support.
   - `_drafts/example-essay.md`.
   - blog categories: Essays, Notes, Videos, Podcasts, Fragments.
   - placeholder cards for empty blog categories.
   - blog search, category filter, and sorting.
5. Adds the advanced search page:
   - site-wide search at `/search/`.
   - filters by type, format/category, and date range.
   - sorting by relevance, newest, oldest, or title.
6. Keeps the Language tab:
   - English, Türkçe, Français, العربية, Русский, فارسی.
   - links use machine translation.

## How to install

Copy everything inside this patch folder into the root of the website repository.

When GitHub asks whether to replace existing files, replace them.

## How to add a blog essay

Add a new Markdown file inside `_posts`.

Example file name:

`2026-07-02-on-biography-and-history.md`

Example:

```markdown
---
layout: post
title: "On Biography and Historical Judgment"
date: 2026-07-02
category: essay
format: essay
description: "A short reflection on biography as a historical method."
---

Write the essay here.
```

## Note on language

The language menu uses machine translation for now. Later, curated Turkish, French, Arabic, Russian, or Persian versions can be built as real pages.
