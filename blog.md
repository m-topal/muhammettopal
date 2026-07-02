---
layout: default
title: My Blog
permalink: /blog/
---
<section class="blog-intro">
  <div>
    <p class="label">Separate track</p>
    <h1>My Blog</h1>
    <p class="lead">Essays, notes, videos, podcasts, and fragments, a living notebook on the late Ottoman world, intellectual life, and the wider world.</p>
  </div>
  <div class="search-box">
    <input id="blogSearch" type="search" placeholder="Search essays, notes, podcasts, videos..." aria-label="Search blog posts">
  </div>
</section>

<div class="toolbar">
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

<section class="blog-section" id="themes">
  <h2>Featured Essays</h2>
  <div class="post-grid">
    {% assign essays = site.posts | where: "format", "essay" %}
    {% for post in essays limit:3 %}
    <article class="post-card js-post" data-format="{{ post.format }}" data-text="{{ post.title | escape }} {{ post.description | escape }} {{ post.tags | join: ' ' | escape }}">
      <div class="body"><p class="meta">{{ post.date | date: "%b %-d, %Y" }}</p><h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3><p>{{ post.description }}</p></div>
    </article>
    {% endfor %}
  </div>
</section>

<section class="blog-section">
  <h2>Featured Podcasts</h2>
  <div class="post-grid">
    {% assign podcasts = site.posts | where: "format", "podcast" %}
    {% for post in podcasts limit:3 %}
    <article class="post-card js-post" data-format="{{ post.format }}" data-text="{{ post.title | escape }} {{ post.description | escape }} {{ post.tags | join: ' ' | escape }}">
      <div class="body"><p class="meta">Podcast · {{ post.date | date: "%b %-d, %Y" }}</p><h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3><p>{{ post.description }}</p></div>
    </article>
    {% endfor %}
  </div>
</section>

<section class="blog-section">
  <h2>Featured Videos</h2>
  <div class="post-grid">
    {% assign videos = site.posts | where: "format", "video" %}
    {% for post in videos limit:3 %}
    <article class="post-card js-post" data-format="{{ post.format }}" data-text="{{ post.title | escape }} {{ post.description | escape }} {{ post.tags | join: ' ' | escape }}">
      <div class="body"><p class="meta">Video · {{ post.date | date: "%b %-d, %Y" }}</p><h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3><p>{{ post.description }}</p></div>
    </article>
    {% endfor %}
  </div>
</section>

<section class="blog-section" id="dates">
  <h2>Latest Notes and Fragments</h2>
  <div class="post-list">
    {% for post in site.posts %}
    <article class="post-list-item js-post" data-format="{{ post.format }}" data-text="{{ post.title | escape }} {{ post.description | escape }} {{ post.tags | join: ' ' | escape }}">
      <div class="meta">{{ post.format | default: post.category }}<br>{{ post.date | date: "%b %-d, %Y" }}</div>
      <div><h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3><p>{{ post.description | default: post.excerpt | strip_html | truncate: 150 }}</p></div>
    </article>
    {% endfor %}
  </div>
</section>

<section class="blog-section" id="tags">
  <h2>Browse</h2>
  <div class="grid-2">
    <div class="card"><h3>Themes</h3><p>Ottoman world · Intellectual life · Political opposition · Biography · Caucasus · Public life · Books</p></div>
    <div class="card"><h3>Series</h3><p>Reading Notes · Archive Fragments · Public Essays · Conversations</p></div>
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
