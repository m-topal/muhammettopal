Patch v99

Apply this on top of v98.

Mobile PDF scrolling repair:
- On screens up to 900px wide, the CV and PDF syllabus triggers open the document in the phone's native full-page PDF viewer.
- This avoids the mobile Safari/embedded-iframe limitation that shows only the first PDF page.
- Desktop CV and syllabus popups remain unchanged.
- Non-PDF teaching detail popups remain unchanged.

Changed file:
- assets/js/site.js
