# One file only

This time it's genuinely one file. `default.html` has the CSS, the
JavaScript, and all three building images (as embedded base64 data)
built directly into it. Nothing else to upload.

## What to do

Go to `_layouts/default.html` in your GitHub repo, replace its entire
contents with this file's contents, commit. That's the whole thing.

You can delete `assets/css/globe-bg.css`, `assets/js/globe-bg.js`, and
`assets/img/globe/*.png` from your repo if you added them in earlier
rounds, they're no longer used, everything they contained now lives
inside this one file.

## Why it's a bigger file than before

It's about 620KB now instead of a few KB, because the three images are
baked in as text (base64) rather than linked as separate image files.
That's normal and fine for GitHub, just know that's why the file looks
big when you open it, it's mostly image data sitting inside a JavaScript
variable near the middle of the file, not something to worry about or
edit by hand.

## Try it first

Unzip the preview zip from this message, open `index.html`, scroll.
Same effect as the last round, bold map and globe, buildings docked at
the bottom, text kept readable, just delivered as a single file this
time.
