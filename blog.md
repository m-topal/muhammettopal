---
layout: default
title: Blog
permalink: /blog/
---
<section class="blog-hero">
  <div>
    <p class="kicker">Separate track</p>
    <h1>Blog</h1>
    <p>Essays, notes, videos, podcasts, and fragments, a living notebook on the late Ottoman Empire, intellectual life, and the wider world.</p>
  </div>
  <div class="blog-search-panel">
    <input id="blogSearch" class="search-input" type="search" placeholder="Search essays, notes, podcasts, videos..." aria-label="Search blog posts">
  </div>
</section>

<div class="toolbar" aria-label="Browse blog">
  <a href="#themes">Themes</a>
  <a href="#formats">Formats</a>
  <a href="#dates">Date</a>
  <a href="#tags">Tags</a>
  <a href="#series">Series</a>
</div>

<div class="format-tabs" id="formats">
  <button class="active" data-filter="all">All</button>
  <button data-filter="essay">Essays</button>
  <button data-filter="note">Notes</button>
  <button data-filter="podcast">Podcasts</button>
  <button data-filter="video">Videos</button>
  <button data-filter="fragment">Fragments</button>
</div>

<section class="feature-section" id="themes">
  <h2>Featured Essays</h2>
  <div class="grid-3">
    {% assign essays = site.posts | where: "format", "essay" %}
    {% for post in essays limit:3 %}
    <article class="post-card js-post" data-format="{{ post.format }}" data-text="{{ post.title | escape }} {{ post.description | escape }} {{ post.tags | join: ' ' | escape }}">
      {% if post.image %}<img src="{{ post.image | relative_url }}" alt="">{% endif %}
      <div class="post-card-body"><p class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</p><h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3><p>{{ post.description }}</p></div>
    </article>
    {% endfor %}
  </div>
</section>

<section class="feature-section">
  <h2>Featured Podcasts</h2>
  <div class="grid-3">
    {% assign podcasts = site.posts | where: "format", "podcast" %}
    {% for post in podcasts limit:3 %}
    <article class="post-card js-post" data-format="{{ post.format }}" data-text="{{ post.title | escape }} {{ post.description | escape }} {{ post.tags | join: ' ' | escape }}">
      <div class="post-card-body"><p class="post-meta">Podcast · {{ post.date | date: "%b %-d, %Y" }}</p><h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3><p>{{ post.description }}</p></div>
    </article>
    {% endfor %}
  </div>
</section>

<section class="feature-section">
  <h2>Featured Videos</h2>
  <div class="grid-3">
    {% assign videos = site.posts | where: "format", "video" %}
    {% for post in videos limit:3 %}
    <article class="post-card js-post" data-format="{{ post.format }}" data-text="{{ post.title | escape }} {{ post.description | escape }} {{ post.tags | join: ' ' | escape }}">
      {% if post.image %}<img src="{{ post.image | relative_url }}" alt="">{% endif %}
      <div class="post-card-body"><p class="post-meta">Video · {{ post.date | date: "%b %-d, %Y" }}</p><h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3><p>{{ post.description }}</p></div>
    </article>
    {% endfor %}
  </div>
</section>

<section class="feature-section" id="dates">
  <h2>Latest Notes and Fragments</h2>
  <div class="post-list" id="allPosts">
    {% for post in site.posts %}
    <article class="post-list-item js-post" data-format="{{ post.format }}" data-text="{{ post.title | escape }} {{ post.description | escape }} {{ post.tags | join: ' ' | escape }}">
      <div class="post-meta">{{ post.format | default: post.category }}<br>{{ post.date | date: "%b %-d, %Y" }}</div>
      <div><h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3><p>{{ post.description | default: post.excerpt | strip_html | truncate: 150 }}</p></div>
      <div class="post-meta">{% if post.read_time %}{{ post.read_time }}{% endif %}</div>
    </article>
    {% endfor %}
  </div>
</section>

<section class="section" id="tags">
  <div class="section-head">
    <p class="section-label">Browse</p>
    <div class="grid-3">
      <div class="card"><h3>Themes</h3><p>Ottoman Empire · Intellectual Life · Print Culture · Caucasus · Public Life · Books</p></div>
      <div class="card"><h3>Formats</h3><p>Essays · Notes · Podcasts · Videos · Fragments · Archive Finds</p></div>
      <div class="card"><h3>Series</h3><p>Reading Notes · Archive Fragments · Public Essays · Conversations</p></div>
    </div>
  </div>
</section>

<script>
const searchInput = document.getElementById('blogSearch');
const buttons = document.querySelectorAll('.format-tabs button');
const posts = document.querySelectorAll('.js-post');
let activeFilter = 'all';
function applyFilters(){
  const q = (searchInput.value || '').toLowerCase().trim();
  posts.forEach(post => {
    const format = post.dataset.format || '';
    const text = (post.dataset.text || '').toLowerCase();
    const okFormat = activeFilter === 'all' || format === activeFilter;
    const okText = !q || text.includes(q);
    post.classList.toggle('hidden', !(okFormat && okText));
  });
}
buttons.forEach(btn => btn.addEventListener('click', () => {
  buttons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = btn.dataset.filter;
  applyFilters();
}));
searchInput.addEventListener('input', applyFilters);
</script>
