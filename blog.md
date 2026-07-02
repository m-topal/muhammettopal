---
layout: default
title: Blog
permalink: /blog/
---
<p class="section-label">Blog</p>
<h1>Blog</h1>
<p>Essays, notes, videos, and podcast episodes, updated as they're written.</p>

<div class="search-bar">
  <i class="ti ti-search search-icon" aria-hidden="true"></i>
  <input type="text" id="blog-search" placeholder="Search essays, notes, podcasts, videos...">
</div>

<div class="format-tabs">
  <a href="{{ '/blog/' | relative_url }}" class="active">All</a>
  <a href="{{ '/blog/essays/' | relative_url }}">Essays</a>
  <a href="{{ '/blog/notes/' | relative_url }}">Notes</a>
  <a href="{{ '/blog/videos/' | relative_url }}">Videos</a>
  <a href="{{ '/blog/podcast/' | relative_url }}">Podcast</a>
</div>

<div id="blog-content">
{% assign essays = site.posts | where: "category", "essay" %}
{% assign notes = site.posts | where: "category", "note" %}
{% assign videos = site.posts | where: "category", "video" %}
{% assign podcasts = site.posts | where: "category", "podcast" %}

{% if essays.size > 0 %}
<div class="shelf" data-shelf>
  <div class="shelf-head"><h2>Featured essays</h2><a href="{{ '/blog/essays/' | relative_url }}">View all essays →</a></div>
  <div class="card-grid">
    {% for post in essays limit:3 %}
    <div class="card searchable" data-search="{{ post.title | downcase }} {% for t in post.tags %}{{ t | downcase }} {% endfor %}">
      <p class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</p>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p>{{ post.excerpt | strip_html | truncate: 90 }}</p>
    </div>
    {% endfor %}
  </div>
</div>
{% endif %}

{% if podcasts.size > 0 %}
<div class="shelf" data-shelf>
  <div class="shelf-head"><h2>Featured podcasts</h2><a href="{{ '/blog/podcast/' | relative_url }}">View all episodes →</a></div>
  <div class="card-grid">
    {% for post in podcasts limit:3 %}
    <div class="card searchable" data-search="{{ post.title | downcase }} {% for t in post.tags %}{{ t | downcase }} {% endfor %}">
      <p class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</p>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p>{{ post.excerpt | strip_html | truncate: 90 }}</p>
    </div>
    {% endfor %}
  </div>
</div>
{% endif %}

{% if videos.size > 0 %}
<div class="shelf" data-shelf>
  <div class="shelf-head"><h2>Featured videos</h2><a href="{{ '/blog/videos/' | relative_url }}">View all videos →</a></div>
  <div class="card-grid">
    {% for post in videos limit:3 %}
    <div class="card searchable" data-search="{{ post.title | downcase }} {% for t in post.tags %}{{ t | downcase }} {% endfor %}">
      <p class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</p>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p>{{ post.excerpt | strip_html | truncate: 90 }}</p>
    </div>
    {% endfor %}
  </div>
</div>
{% endif %}

<div class="shelf" data-shelf>
  <div class="shelf-head"><h2>Latest notes &amp; fragments</h2><a href="{{ '/blog/notes/' | relative_url }}">View all notes →</a></div>
  {% if notes.size > 0 %}
  {% for post in notes limit:4 %}
  <div class="post-card searchable" data-search="{{ post.title | downcase }} {% for t in post.tags %}{{ t | downcase }} {% endfor %}">
    <p class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</p>
    <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    <p>{{ post.excerpt | strip_html | truncate: 140 }}</p>
  </div>
  {% endfor %}
  {% else %}
  <p style="color: var(--muted); font-size: 14px;">No notes yet.</p>
  {% endif %}
</div>

{% if site.posts.size == 0 %}
<p style="color: var(--muted);">No posts yet. The first entry will appear here once published.</p>
{% endif %}
</div>

<p class="no-results" id="no-results">No posts match your search.</p>

<div class="signup-box">
  <h3>Get new posts by email</h3>
  <p>Occasional essays, notes, and recordings, sent when there's something new. No spam, unsubscribe anytime.</p>
  <form class="signup-form" action="https://buttondown.email/api/emails/embed-subscribe/YOUR_USERNAME" method="post">
    <input type="email" name="email" placeholder="your@email.com" required>
    <button type="submit">Subscribe</button>
  </form>
  <!-- Before publishing: replace YOUR_USERNAME with your real Buttondown username (buttondown.email) -->
</div>
