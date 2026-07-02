---
layout: default
title: Blog
permalink: /blog/
---
<p class="section-label">Blog</p>
<h1>Blog</h1>
<p>Essays, notes, videos, and podcast episodes.</p>

<div class="format-tabs">
  <a href="{{ '/blog/' | relative_url }}" class="active">All</a>
  <a href="{{ '/blog/essays/' | relative_url }}">Essays</a>
  <a href="{{ '/blog/notes/' | relative_url }}">Notes</a>
  <a href="{{ '/blog/videos/' | relative_url }}">Videos</a>
  <a href="{{ '/blog/podcast/' | relative_url }}">Podcast</a>
</div>

{% for post in site.posts %}
<div class="post-card">
  <p class="post-meta">{{ post.category | upcase }} · {{ post.date | date: "%B %-d, %Y" }}</p>
  <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
  <p>{{ post.excerpt | strip_html | truncate: 140 }}</p>
  {% if post.tags %}
  <div class="tag-row">
    {% for tag in post.tags %}<span class="tag">{{ tag }}</span>{% endfor %}
  </div>
  {% endif %}
</div>
{% else %}
<p style="color: var(--muted);">No posts yet. The first entry will appear here once published.</p>
{% endfor %}
