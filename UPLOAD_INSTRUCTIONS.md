# Favicon and Share Popup Patch

Upload only these files to their matching folders.

## Upload to `_layouts/`
- default.html

## Upload to `assets/css/`
- style.css

## Upload to `assets/js/`
- site.js

## Upload to `assets/`
- favicon.ico
- favicon.svg
- favicon-16x16.png
- favicon-32x32.png
- favicon-48x48.png
- apple-touch-icon.png
- icon-192.png
- icon-512.png
- favicon-mark-preview.png
- site.webmanifest

## What changes

1. Favicon now uses a compact special mark from the handwritten Topal logo, not the full long word. It should appear larger and clearer in the browser tab.
2. Favicon links are cache-busted with ?v=4.
3. Share no longer opens inside the card. It opens as a centered popup/modal in the style of YouTube's share dialog, but with the site's clean white academic aesthetic.
4. The popup includes:
   Facebook, X, LinkedIn, Email, WhatsApp, Copy link.
