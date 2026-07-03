# Copy-paste implementation prompt

Please update my personal academic website with the following changes.

Important principle:
The handwritten Topal wordmark is NOT replacing the main site title. The main header must still say:

Muhammet Topal
Academic Portfolio and Personal Blog

Use the handwritten wordmark as:
1. favicon/browser tab icon,
2. the logo element inside the sticky navigation/tab bar visible on every page,
3. the decorative horizontal divider on the About Me page.

Tasks:

1. Install icons
- Copy all image files from `assets/` into the public assets folder.
- Add the favicon links from `snippets/head-icons.html` to the site-wide head.

2. Sticky tab bar on all pages
- Add the wordmark logo from `assets/topal-wordmark-transparent.png` into the sticky navigation/tab bar, before Home.
- It should appear on every page.
- It should be small, elegant, and not crowd the menu.
- Use the CSS from `snippets/sticky-tab-bar.css`.

3. Keep the main header
- Keep “Muhammet Topal.”
- Keep “Academic Portfolio and Personal Blog.”
- Do not replace either with the handwritten wordmark.

4. About Me page
- Remove the large repeated bold “About Me” heading above the text.
- Add the horizontal wordmark divider between the navigation/header area and the two-column text.
- It should span both columns.
- Use `snippets/about-logo-divider.html` and `snippets/about-logo-divider.css`.

5. Blog search/filter bar
- Make the search/filter panel wider.
- The placeholder “Search title, content, or keywords...” must not be cut.
- “All formats,” “All tags,” and “Newest first” must not be cut.
- Use grid/flexible widths from `snippets/blog-filter-and-empty-states.css`.

6. Blog category visibility
- When All is selected, show Essays, Podcasts, and Videos section headers.
- If a section has no posts, show:
  - No essays yet.
  - No podcasts yet.
  - No videos yet.
- When Essays is selected, keep the Essays heading visible even if there are zero results.
- When Podcasts is selected, keep the Podcasts heading visible even if there are zero results.
- When Videos is selected, show Videos and the existing video card.
- Use/adapt `snippets/blog-empty-section-logic.js`.

Final check:
- Browser tab shows the Topal icon.
- Sticky navigation on every page shows the handwritten Topal wordmark.
- Main title and subtitle remain unchanged.
- About Me has the divider and no repeated big About Me title.
- Blog filters are readable and not cramped.
- Empty categories still display their headers and empty messages.

---

# CSS: sticky tab bar

```css
/* Site-wide sticky tab bar wordmark.
   Add this to the global stylesheet. */

:root {
  --topal-teal: #007a80;
  --topal-red: #b80000;
}

/* Apply to your sticky nav wrapper. Add this class to the nav if needed. */
.site-nav,
.sticky-tab-bar,
.header-nav,
nav[aria-label="Main navigation"] {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
}

/* Put the handwritten wordmark at the left of the navigation row. */
.sticky-wordmark-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 22px;
  text-decoration: none;
  flex: 0 0 auto;
}

.sticky-wordmark {
  width: 118px;
  height: auto;
  display: block;
}

/* If the nav is a flex row, this keeps everything aligned. */
.site-nav-inner,
.nav-inner,
.menu,
.nav-menu {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Keep the My Blog button visually separate. */
.nav-menu .my-blog,
.menu .my-blog,
a[href="/blog/"].active,
a[href="/blog"] {
  white-space: nowrap;
}

/* Mobile adjustments. */
@media (max-width: 800px) {
  .sticky-wordmark-link {
    margin-right: 12px;
  }

  .sticky-wordmark {
    width: 88px;
  }
}

@media (max-width: 560px) {
  .sticky-wordmark {
    width: 74px;
  }
}
```

# CSS: About divider

```css
/* About Me horizontal wordmark divider.
   It should span both columns above the body text. */

.about-wordmark-divider {
  grid-column: 1 / -1;
  width: 100%;
  max-width: 1100px;
  margin: 42px auto 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
}

.about-divider-line {
  height: 2px;
  background: var(--topal-teal, #007a80);
  flex: 1 1 auto;
  max-width: 430px;
}

.about-divider-logo {
  width: 170px;
  height: auto;
  display: block;
  flex: 0 0 auto;
}

/* Hide only the large repeated About Me title, not the page metadata label unless desired.
   Adjust the selector to match your actual page title class. */
.about-page .page-title,
.about-page h1.page-title,
body.about .page-title {
  display: none;
}

@media (max-width: 760px) {
  .about-wordmark-divider {
    gap: 18px;
    margin: 32px auto 28px;
  }

  .about-divider-logo {
    width: 122px;
  }

  .about-divider-line {
    max-width: 180px;
  }
}
```

# CSS: Blog filters and empty states

```css
/* Wider blog search/filter panel and persistent empty category styling. */

.blog-filter-panel,
.search-filter-panel,
.filter-panel {
  width: 100%;
  max-width: 1100px;
  margin: 32px auto 48px;
  padding: 28px 32px;
  border: 1px solid #e2e2e2;
  border-radius: 18px;
  box-sizing: border-box;
}

/* Use this class on the form row containing Search, Format, Tag, From, To, Sort. */
.blog-filter-grid,
.search-filter-grid,
.filter-grid {
  display: grid;
  grid-template-columns:
    minmax(320px, 2.2fr)
    minmax(150px, 1fr)
    minmax(150px, 1fr)
    minmax(170px, 1fr)
    minmax(170px, 1fr)
    minmax(170px, 1fr);
  gap: 16px;
  align-items: end;
}

.blog-filter-grid input,
.blog-filter-grid select,
.search-filter-grid input,
.search-filter-grid select,
.filter-grid input,
.filter-grid select {
  width: 100%;
  min-height: 48px;
  padding: 0 16px;
  font-size: 16px;
  line-height: 1.2;
  box-sizing: border-box;
  text-overflow: ellipsis;
}

/* Make labels breathe. */
.blog-filter-grid label,
.search-filter-grid label,
.filter-grid label {
  display: block;
  margin-bottom: 8px;
  letter-spacing: 0.08em;
  font-size: 13px;
}

/* Filter buttons row. */
.blog-filter-buttons,
.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

/* Category sections remain visible even when empty. */
.blog-category-section {
  display: block;
  margin: 46px auto;
  max-width: 1100px;
}

.blog-category-header {
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 12px;
  margin-bottom: 22px;
}

.blog-category-header h2 {
  margin: 0;
}

.blog-empty-state {
  color: #777;
  font-style: italic;
  font-size: 16px;
  margin: 10px 0 32px;
}

/* Responsive layout. */
@media (max-width: 1180px) {
  .blog-filter-grid,
  .search-filter-grid,
  .filter-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 650px) {
  .blog-filter-panel,
  .search-filter-panel,
  .filter-panel {
    padding: 22px 18px;
  }

  .blog-filter-grid,
  .search-filter-grid,
  .filter-grid {
    grid-template-columns: 1fr;
  }
}
```
