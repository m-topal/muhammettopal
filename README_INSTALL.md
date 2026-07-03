# Muhammet Topal academic website, v12 final

This package is built from the corrected v11 version and includes the final requested additions.

## Included

- Sticky navigation tabs that remain visible while scrolling.
- A reading progress bar at the top of the page.
- Diversions captions:
  - Mt. Lemmon rock climbing.
  - Feeding the squirrels in the Grand Canyon.
  - Riding a mustang in Tucson. Her name is Sequoia.
  - Fishing trip with Clìo and Eryka.
- Blog system:
  - `_posts` support.
  - `_drafts/example-essay.md`.
  - `assets/img/blog/`.
  - categories: Essays, Notes, Videos, Podcasts, Fragments.
  - placeholder cards when there are no posts.
  - blog search, category filter, and sorting.
- Safe advanced search page at `/search/`:
  - type filter: pages or blog posts.
  - format filter: essays, notes, videos, podcasts, fragments, research, teaching, publications, presentations.
  - date range filter.
  - sorting by relevance, newest, oldest, or title.
- Language menu:
  - English, Türkçe, Français, العربية, Русский, فارسی.
  - Machine translation links using Google Translate.
- Domain settings remain prepared for `muhammettopal.com`.

## How to add a blog essay

Add a new Markdown file inside `_posts`.

Example file name:

`2026-07-02-on-biography-and-history.md`

Example file content:

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

Drafts can be kept in `_drafts`. They will not appear publicly until moved into `_posts`.

## Note on future dated posts

GitHub Pages does not publish posts with future dates. Use today's date or an earlier date if you want a post to appear immediately.


## v14 update

- Removed the Search tab from the main navigation bar.
- Removed the embedded advanced search box from the Blog page.
- Added an Advanced Search button in the upper-right site utility area, next to Language.
- Added a magnifying-glass-style icon for Advanced Search.
- Added a Google-Translate-style icon next to Language.
- The Advanced Search button opens `/search/`.


## v15 update

- Replaced the simple G language icon with a custom translation-style icon using overlapping A and 文 symbols.
- This keeps the visual association with translation without copying an external logo.


## v16 update

- Removed the homepage explanatory sentence while keeping a small amount of blank space.
- Moved the Advanced Search button to the left side of the top utility area.
- Kept the Language button on the right side of the top utility area.
- Added teaching sensitive subjects to the Teaching overview, Teaching Experience, and Teaching Statement.
- Changed Teaching Experience to a one-column layout.
- Kept Teaching Statement and College Teaching Certificate unchanged in their two-column prose layout.


## v17 update

- Teaching Experience remains one column, but it is now centered and constrained to a medium width, about one and a half former columns.
- On the main Teaching page, the three teaching cards now appear before the large image so they are visible earlier.


## v18 update

- Removed placeholder draft and empty placeholder files.
- Removed placeholder cards and helper placeholder text from the Blog page.
- Added a CSS safety rule so leftover placeholder UI classes stay hidden.


## v21 update

- Combines the safe blog shelves fix with the Diversions image lightbox and spacing fix.
- Blog homepage is organized into horizontal shelves: Essays, Podcasts, Videos.
- Blog cards now have post-specific sharing links, email comment link, and a local like button.
- Individual blog posts also have sharing, comment by email, and local like controls.
- Diversions images open larger in a centered lightbox when clicked.


## v23 update

- Blog shelf headings are clickable.
- Essays, Podcasts, and Videos now each have their own full vertical list page.
- Essay icon changed to a typewriter.
- Fake placeholder posts were removed from the full package.


## v24 update

- Adds Giscus comments to individual blog posts.
- Blog card "Comment" links now go to the post's comment section instead of opening email.
- Post pages still keep share and local like controls.


## v25 update

- Adds an external course-site card for Introduction to Political Islam on the Teaching page.
- Removes fake placeholder posts from the full package.


## v26 update

- Removes old placeholder comments text.
- Adds clean light-theme Giscus comments.
- Fixes Diversions gallery gaps.
- Hides fake placeholder posts with `published: false`.
- Includes contact form thank-you redirect and `thanks.md`.


## v27 update

- Removes top share bar on post pages.
- Keeps bottom share/comment/action row only.
- Adds YouTube thumbnail social preview metadata for video posts.


## v28 update

- Adds Mt. Lemmon photo next to the cats photo on Diversions.
- Adds advanced Blog search by text, format, tag, date, and sort.
- Includes v27 share-bar and YouTube-preview fixes.
