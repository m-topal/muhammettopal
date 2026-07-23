Muhammet Topal website update v2

This ZIP includes BOTH options:

1. replacement-files/
   Use this if you update through the GitHub web interface. Upload or replace each file in the same path:
   - assets/css/style.css
   - css/style.css
   - style.css
   - _layouts/default.html
   - _includes/footer.html

2. muhammettopal-update-v2.patch
   Use this only if you apply patches locally from the repository root:
   git apply muhammettopal-update-v2.patch

Main corrections included:
- Body and introductory text forced to 16px.
- Body/prose/modal line-height changed to 1.
- Paragraph gaps removed so consecutive paragraphs do not have extra spacing.
- Header name “Muhammet Topal” changed to teal, 32px, normal weight.
- Navigation text changed to 16px, normal weight by default, bold and single-underlined only on hover.
- Double navigation underlines removed.
- Popup/modal headers reduced.
- Publication and presentation titles standardized.
- Teaching hierarchy adjusted so main section headings remain larger than course/card/modal titles.
- White side veil behind teaching carousel card rows removed, without changing the cards themselves.
- Footer changed to: Designed and Developed by Muhammet Topal | © 2026
