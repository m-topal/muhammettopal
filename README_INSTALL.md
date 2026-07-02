# Muhammet Topal site revision

This version changes the site into a one-page academic homepage with anchor sections, plus a separate Blog page.

## What changed

- Almost-white background instead of straw/old paper color.
- Centered masthead: name above, keywords below.
- Navigation tabs sit in the middle.
- Research, Teaching, Publications, CV, and Contact are homepage sections reached by scrolling.
- Clicking the navigation jumps directly to the relevant section.
- Blog is a separate visual track, shown as an outlined pill on the right.
- CV section includes a download button and an embedded PDF frame.
- Blog page includes search, browse tools, featured essays, podcasts, videos, and latest notes.

## How to install

1. Unzip this folder.
2. Copy the contents into your GitHub repository, replacing the existing files.
3. Commit the changes.
4. Put your CV PDF at:

   assets/cv/Muhammet_Topal_CV.pdf

5. Replace the portrait placeholder in `index.md` with a real image later.

## Custom domain note

Current preview setting in `_config.yml`:

```yaml
baseurl: "/muhammettopal"
```

When you connect `muhammettopal.com`, change it to:

```yaml
baseurl: ""
```

## Adding a blog post

Create a new file inside `_posts/` with this naming pattern:

`YYYY-MM-DD-title.md`

Example:

```markdown
---
title: "A Note on Ottoman Anti-Imperialism"
date: 2026-07-10
format: essay
category: Essays
tags: [Ottoman Empire, anti-imperialism, press]
description: "A short note on Ottoman responses to European imperialism."
read_time: "6 min read"
---

Write the post here.
```
