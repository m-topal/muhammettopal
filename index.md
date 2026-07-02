---
layout: default
title: Home
permalink: /
---
<section class="billboard">
  <div class="billboard-copy">
    <p class="section-label">Historian</p>
    <h1>Muhammet Topal</h1>
    <p class="hero-tagline">Late Ottoman intellectual history, political opposition, print culture, biography, empire, and the Caucasus.</p>
    <p class="site-purpose">This website gathers my academic work, teaching, publications, CV, and professional materials. It also includes a separate <a href="{{ '/blog/' | relative_url }}">Blog</a>, a running space for essays, notes, videos, podcasts, and fragments.</p>
    <p class="current-line">PhD candidate in History and Middle Eastern &amp; North African Studies, University of Arizona. Joint doctoral degree with INALCO, Paris.</p>
  </div>
  <div class="billboard-panel" aria-label="visual panel">
    <div class="panel-kicker">portfolio · notebook · archive</div>
    <div class="panel-title">Research and public writing from the late Ottoman world outward.</div>
  </div>
</section>

<section class="latest-strip">
  <div class="strip-heading">
    <p class="section-label">From the Blog</p>
    <a href="{{ '/blog/' | relative_url }}">Enter the Blog →</a>
  </div>
  <div class="teaser-grid compact">
    {% for post in site.posts limit:3 %}
    <article class="teaser-card" data-format="{{ post.format | default: post.category | downcase }}">
      <p class="teaser-label">{{ post.format | default: post.category | upcase }} · {{ post.date | date: "%b %-d, %Y" }}</p>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p>{{ post.excerpt | strip_html | truncate: 110 }}</p>
    </article>
    {% else %}
    <p class="muted">First post coming soon.</p>
    {% endfor %}
  </div>
</section>
