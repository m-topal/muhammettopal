# Muhammet Topal website revision

This package is a clean, almost white, one page academic site for GitHub Pages.

## What changed

- The homepage uses a centered name, keyword line, and centered navigation.
- Research, Teaching, Publications, CV, and Contact appear as scroll sections on the homepage.
- The top navigation jumps to the correct section.
- Blog is separate and visually distinct, but it keeps the same clean white style.
- The color palette is white, black, gray, and very soft lines. There is no red or beige paper tone.
- The CV is included as a downloadable and embedded PDF.
- Your portrait photo is included in `assets/images/muhammet-topal.jpg`.

## Uploading to GitHub

Replace your current site files with everything in this folder.

For the current preview URL `https://m-topal.github.io/muhammettopal/`, keep this in `_config.yml`:

```yaml
baseurl: "/muhammettopal"
```

When you later connect `muhammettopal.com`, change it to:

```yaml
baseurl: ""
```

## Adding a blog post

Create a new Markdown file in `_posts`, using this naming pattern:

```text
YYYY-MM-DD-title-of-post.md
```

Use this template:

```markdown
---
layout: post
title: "Post title"
date: 2026-07-02
format: essay
category: essay
tags: [Ottoman Empire, print culture]
description: "One sentence description."
read_time: "8 min read"
---

Write the post here.
```

Formats can be: `essay`, `note`, `podcast`, `video`, or `fragment`.
