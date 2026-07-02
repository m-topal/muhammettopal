---
layout: default
title: Blog
permalink: /blog/
---
<section class="blog-hero">
  <div>
    <p class="section-label">Separate track</p>
    <h1>Blog</h1>
    <p>Essays, notes, videos, podcasts, and fragments. A living notebook beside the more stable academic sections of this website.</p>
  </div>
  <div class="blog-mini-card">
    <span>Browse by</span>
    <strong>theme · format · date · series</strong>
  </div>
</section>

<section class="blog-toolbar" aria-label="Blog search and browsing tools">
  <label class="search-box">
    <span>Search</span>
    <input id="blogSearch" type="search" placeholder="Search essays, notes, podcasts, videos...">
  </label>
  <div class="toolbar-links">
    <a href="#themes">Themes</a>
    <a href="#formats">Formats</a>
    <a href="#archive">Date</a>
    <a href="#tags">Tags</a>
    <a href="#series">Series</a>
  </div>
</section>

<section class="browse-board">
  <div id="themes" class="browse-box">
    <p class="browse-title">Themes</p>
    <button data-filter="ottoman">Ottoman Empire</button>
    <button data-filter="caucasus">Caucasus</button>
    <button data-filter="archives">Archives</button>
    <button data-filter="public life">Public Life</button>
    <button data-filter="books">Books</button>
  </div>
  <div id="formats" class="browse-box">
    <p class="browse-title">Formats</p>
    <button data-filter="essay">Essays</button>
    <button data-filter="note">Notes</button>
    <button data-filter="video">Videos</button>
    <button data-filter="podcast">Podcast</button>
  </div>
  <div id="archive" class="browse-box">
    <p class="browse-title">Date</p>
    <button data-filter="2026">2026</button>
    <button data-filter="2025">2025</button>
    <button data-filter="2024">2024</button>
  </div>
</section>

<section class="featured-section">
  <div class="section-headline">
    <p class="section-label">Featured</p>
    <h2>Essays</h2>
  </div>
  <div class="feature-grid">
    {% assign essay_posts = site.posts | where: "format", "essay" %}
    {% for post in essay_posts limit:3 %}
    {% include post-card.html post=post %}
    {% else %}
    <p class="muted">Featured essays will appear here.</p>
    {% endfor %}
  </div>
</section>

<section class="featured-section two-col">
  <div>
    <div class="section-headline">
      <p class="section-label">Featured</p>
      <h2>Podcasts</h2>
    </div>
    {% assign podcast_posts = site.posts | where: "format", "podcast" %}
    {% for post in podcast_posts limit:2 %}
    {% include post-card.html post=post %}
    {% else %}
    <p class="muted">Podcast episodes will appear here.</p>
    {% endfor %}
  </div>
  <div>
    <div class="section-headline">
      <p class="section-label">Featured</p>
      <h2>Videos</h2>
    </div>
    {% assign video_posts = site.posts | where: "format", "video" %}
    {% for post in video_posts limit:2 %}
    {% include post-card.html post=post %}
    {% else %}
    <p class="muted">Videos will appear here.</p>
    {% endfor %}
  </div>
</section>

<section class="featured-section" id="all-posts">
  <div class="section-headline">
    <p class="section-label">Archive</p>
    <h2>Latest notes and fragments</h2>
  </div>
  <div class="post-list" id="postList">
    {% for post in site.posts %}
    <article class="post-card searchable" data-search="{{ post.title | downcase }} {{ post.excerpt | strip_html | downcase }} {{ post.tags | join: ' ' | downcase }} {{ post.format | downcase }} {{ post.date | date: '%Y' }}">
      <p class="post-meta">{{ post.format | default: post.category | upcase }} · {{ post.date | date: "%B %-d, %Y" }}</p>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
      {% if post.tags %}<div class="tag-row">{% for tag in post.tags %}<span class="tag">{{ tag }}</span>{% endfor %}</div>{% endif %}
    </article>
    {% else %}
    <p class="muted">No posts yet. The first entry will appear here once published.</p>
    {% endfor %}
  </div>
</section>

<script src="{{ '/assets/js/search.js' | relative_url }}"></script>
