# Header, Favicon, and Blog Social Patch

This patch is based on the real Jekyll/GitHub Pages site files.

Do not upload the full site. Upload only these changed files to their matching folders.

## Changed root-level file
- blog.md

## Changed layout files
Upload inside `_layouts/`:
- default.html
- post.html

## Changed CSS/JS files
Upload inside `assets/css/`:
- style.css

Upload inside `assets/js/`:
- site.js

## Changed assets
Upload inside `assets/`:
- topal-wordmark-transparent.png
- favicon.ico
- favicon.svg
- favicon-16x16.png
- favicon-32x32.png
- favicon-48x48.png
- apple-touch-icon.png
- icon-192.png
- icon-512.png
- site.webmanifest

## What this patch does

1. Adds the handwritten Topal wordmark above “Muhammet Topal” on the home page only.
2. Adds a small “Teaching Statement” tag below the wordmark, linking to `/teaching/statement/`.
3. Replaces the dark browser tab icon with the handwritten Topal favicon.
4. Updates blog cards and post pages so they show:
   - Like
   - Comment
   - Share
5. Share opens an on-page menu with:
   - Facebook
   - X
   - LinkedIn
   - Email
   - WhatsApp
   - Copy link

## Important

Like count is still local to each visitor's browser.
Comments still go to the existing post comment section/Giscus setup.
