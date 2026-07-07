ACADEMIC GLOBE FIX v6

This patch removes the university buildings and fixes the two main visual problems shown in the screenshots:

1. The world map is now a clear, recognizable full-width map behind the header.
2. The main navigation and the Research/Teaching section navigation no longer appear as detached floating white boxes.

It also replaces the fake CSS globe with a real Globe.GL WebGL globe:
- transparent wireframe sphere
- real 3D rotation
- animated arcs and rings
- scroll temporarily increases rotation speed
- no university building illustrations

Files:
- _layouts/default.html
- assets/css/academic-globe-v6.css
- assets/js/academic-globe-v6.js

This patch uses Globe.GL from the unpkg CDN. If the CDN cannot load, the 3D globe hides cleanly while the world map remains visible.
