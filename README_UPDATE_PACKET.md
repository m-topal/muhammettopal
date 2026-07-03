# Muhammet Topal Website Update Pack

This pack is for updating `muhammettopal.com` with the handwritten Topal wordmark as a persistent site identity element.

Core rule: keep the main site title and subtitle as they are.

Do not replace:

```text
Muhammet Topal
Academic Portfolio and Personal Blog
```

The handwritten wordmark should be used as:
1. the favicon and browser tab icon,
2. a small sticky tab-bar logo visible on every page,
3. a decorative horizontal divider on the About Me page,
4. optionally a refined visual accent on blog pages, but not as a replacement for “My Blog.”

## Files in this pack

```text
assets/
  topal-wordmark-transparent.png
  topal-wordmark-white-bg.png
  favicon.ico
  favicon.svg
  favicon-16x16.png
  favicon-32x32.png
  favicon-48x48.png
  apple-touch-icon.png
  icon-192.png
  icon-512.png
  site.webmanifest

snippets/
  head-icons.html
  sticky-tab-bar.css
  sticky-tab-bar.html
  about-logo-divider.html
  about-logo-divider.css
  blog-filter-and-empty-states.css
  blog-empty-section-logic.js
  implementation-prompt.txt
```

## 1. Add favicon and site icons

Copy all files from `assets/` into your site’s public assets folder.

Depending on the website setup, this might be one of:

```text
/public/
/public/assets/
/static/
/assets/
```

Then add the code from:

```text
snippets/head-icons.html
```

inside the site-wide `<head>` layout.

If your files live directly under `/`, use the first version in that snippet.
If your files live under `/assets/`, use the second version.

## 2. Add the handwritten logo to the sticky tab bar on every page

The wordmark should appear inside the sticky navigation or sticky tab bar, visible on every page.

It should not replace the large “Muhammet Topal” header.

Use:

```text
snippets/sticky-tab-bar.html
snippets/sticky-tab-bar.css
```

The intended structure is:

```text
[Topal wordmark] [Home] [About Me] [Research] [Teaching] ... [My Blog]
```

On desktop, the wordmark sits at the left of the sticky navigation.
On mobile, it stays smaller and does not crowd the menu.

## 3. Keep the main header unchanged

The top identity block should remain:

```text
Muhammet Topal
Academic Portfolio and Personal Blog
```

Do not delete the subtitle.

## 4. About Me page divider

On the About Me page, remove the large repeated title “About Me” above the body text.

Then add the horizontal divider between the navigation/header area and the two-column About Me text.

Use:

```text
snippets/about-logo-divider.html
snippets/about-logo-divider.css
```

It should look like:

```text
────────────  [handwritten Topal]  ────────────
```

This divider must span both text columns.

## 5. Make the blog search bar wider

The current search and filter panel is too cramped.

Problems to fix:
- “Search title, content, or keywords...” is clipped.
- “All formats” is clipped.
- “All tags” is clipped.
- “Newest first” is clipped.

Use:

```text
snippets/blog-filter-and-empty-states.css
```

The search field should be at least 320px wide on desktop.
The filter dropdowns and date fields should be wide enough to show their full text.

## 6. Keep category sections visible even when empty

Current problem:
- When All is selected, only Videos appears because only Videos has a post.
- When Essays or Podcasts is selected, the page becomes visually empty.

Required behavior:
- When All is selected, show Essays, Podcasts, and Videos section headers.
- If a category has no posts, show a small empty state:
  - No essays yet.
  - No podcasts yet.
  - No videos yet.
- When Essays is selected, show the Essays heading even with zero results.
- When Podcasts is selected, show the Podcasts heading even with zero results.
- When Videos is selected, show Videos and the existing video card.

Use:

```text
snippets/blog-empty-section-logic.js
```

Adapt the selectors if your site uses different class names.

## 7. Final check list

After updating, verify:

- Browser tab shows the handwritten Topal icon.
- Sticky tab bar on every page includes the handwritten Topal wordmark.
- Main site header still says “Muhammet Topal.”
- Subtitle “Academic Portfolio and Personal Blog” is still there.
- About Me no longer repeats the large bold “About Me” title.
- About Me has a horizontal wordmark divider spanning both columns.
- Blog search/filter fields are wider and readable.
- All filter texts are visible.
- All selected shows Essays, Podcasts, and Videos sections.
- Essays selected shows Essays section plus “No essays yet.”
- Podcasts selected shows Podcasts section plus “No podcasts yet.”
- Videos selected shows the existing video.
