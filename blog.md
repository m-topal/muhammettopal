---
layout: default
title: Blog
permalink: /blog/
---
<section class="blog-hero">
  <div>
    <p class="section-label">Separate track</p>
    <h1>Blog</h1>
    <p class="tagline small">Essays, notes, videos, podcasts, and fragments, a living notebook on Ottoman history, intellectual life, and public writing.</p>
  </div>
  <div class="blog-mark">B</div>
</section>

<section class="blog-tools">
  <label class="search-box" for="post-search">
    <span>Search</span>
    <input id="post-search" type="search" placeholder="Search essays, notes, podcasts, videos..." autocomplete="off">
  </label>
  <div class="tool-row">
    <a href="#themes">Themes</a>
    <a href="#formats">Formats</a>
    <a href="#archive">Date</a>
    <a href="#tags">Tags</a>
    <a href="#series">Series</a>
  </div>
</section>

<section class="browse-wall">
  <div id="themes">
    <h3>Themes</h3>
    <a href="#">Ottoman Empire</a>
    <a href="#">Intellectual Life</a>
    <a href="#">Print Culture</a>
    <a href="#">Caucasus</a>
    <a href="#">Public Life</a>
  </div>
  <div id="formats">
    <h3>Formats</h3>
    <a href="#essays">Essays</a>
    <a href="#podcasts">Podcasts</a>
    <a href="#videos">Videos</a>
    <a href="#notes">Notes and Fragments</a>
  </div>
  <div id="archive">
    <h3>By Date</h3>
    <a href="#">2026</a>
    <a href="#">2025</a>
    <a href="#">2024</a>
  </div>
  <div id="series">
    <h3>Series</h3>
    <a href="#">Archive Notes</a>
    <a href="#">Publics and Print</a>
    <a href="#">Roads and Borderlands</a>
  </div>
</section>

<section id="essays" class="featured-section">
  <div class="section-heading-row"><h2>Featured Essays</h2><a href="#">View all essays →</a></div>
  <div class="card-grid post-search-area">
    {% assign essays = site.posts | where: 'format', 'essay' %}
    {% for post in essays limit:3 %}{% include post-card.html post=post %}{% endfor %}
  </div>
</section>

<section id="podcasts" class="featured-section">
  <div class="section-heading-row"><h2>Featured Podcasts</h2><a href="#">View all podcasts →</a></div>
  <div class="media-row post-search-area">
    {% assign podcasts = site.posts | where: 'format', 'podcast' %}
    {% for post in podcasts limit:3 %}{% include post-card.html post=post %}{% endfor %}
  </div>
</section>

<section id="videos" class="featured-section">
  <div class="section-heading-row"><h2>Featured Videos</h2><a href="#">View all videos →</a></div>
  <div class="card-grid post-search-area">
    {% assign videos = site.posts | where: 'format', 'video' %}
    {% for post in videos limit:3 %}{% include post-card.html post=post %}{% endfor %}
  </div>
</section>

<section id="notes" class="featured-section">
  <div class="section-heading-row"><h2>Latest Notes and Fragments</h2><a href="#">View all notes →</a></div>
  <div class="note-list post-search-area">
    {% for post in site.posts limit:6 %}
      <article class="note-item" data-search="{{ post.title | downcase }} {{ post.tags | join: ' ' | downcase }} {{ post.description | downcase }}">
        <span>{{ post.date | date: "%b %-d, %Y" }}</span>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        <p>{{ post.description | default: post.excerpt | strip_html | truncate: 100 }}</p>
      </article>
    {% endfor %}
  </div>
</section>
