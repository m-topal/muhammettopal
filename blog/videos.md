---
layout: default
title: Videos
permalink: /blog/videos/
---
<p class="section-label">Blog</p>
<h1>Videos</h1>

<div class="format-tabs">
  <a href="{{ '/blog/' | relative_url }}">All</a>
  <a href="{{ '/blog/essays/' | relative_url }}">Essays</a>
  <a href="{{ '/blog/notes/' | relative_url }}">Notes</a>
  <a href="{{ '/blog/videos/' | relative_url }}" class="active">Videos</a>
  <a href="{{ '/blog/podcast/' | relative_url }}">Podcast</a>
</div>

{% assign filtered = site.posts | where: "category", "video" %}
{% for post in filtered %}
<div class="post-card">
  <p class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</p>
  <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
  <p>{{ post.excerpt | strip_html | truncate: 140 }}</p>
</div>
{% else %}
<p style="color: var(--muted);">No videos yet.</p>
{% endfor %}
