---
layout: default
title: Podcasts
permalink: /blog/podcasts/
---
<article class="page narrow blog-category-page">
  <p class="label">My Blog</p>
  <h1><span class="blog-category-icon" aria-hidden="true"><span class="line-icon line-icon-podcast" aria-hidden="true"><svg viewBox="0 0 48 48" focusable="false"><path d="M24 7a7 7 0 0 0-7 7v10a7 7 0 0 0 14 0V14a7 7 0 0 0-7-7z"></path><path d="M12 22v2a12 12 0 0 0 24 0v-2"></path><path d="M24 36v6"></path><path d="M16 42h16"></path></svg></span></span>Podcasts</h1>
  <p class="lead">All podcast posts in one vertical list.</p>
  <p><a href="{{ '/blog/' | relative_url }}">← Back to My Blog</a></p>

  <section class="blog-full-list" data-blog-section="podcast">
    {% for post in site.posts %}
      {% assign post_kind = post.category | default: post.format | downcase %}
      {% if post_kind == "podcast" %}
        <article class="blog-full-list-item">
          <p class="meta">{{ post.date | date: '%B %-d, %Y' }} · {{ post.format | default: post.category | capitalize }}</p>
          <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
          {% if post.description %}
            <p>{{ post.description }}</p>
          {% endif %}
          {% if post.youtube_id %}
            <div class="video-embed blog-video-preview">
              <iframe
                src="https://www.youtube.com/embed/{{ post.youtube_id }}"
                title="{{ post.title | escape }}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
              </iframe>
            </div>
          {% endif %}
          <div class="blog-card-actions" data-post-title="{{ post.title | escape }}" data-post-url="{{ post.url | absolute_url }}">
            <button class="post-like-button" type="button" data-post-id="{{ post.url | slugify }}">♡ Like <span class="like-count" aria-live="polite">0</span></button>
            <a href="https://www.facebook.com/sharer/sharer.php?u={{ post.url | absolute_url | url_encode }}" target="_blank" rel="noopener">Facebook</a>
            <a href="https://twitter.com/intent/tweet?url={{ post.url | absolute_url | url_encode }}&text={{ post.title | url_encode }}" target="_blank" rel="noopener">X</a>
            <a href="mailto:?subject={{ post.title | url_encode }}&body={{ post.url | absolute_url | url_encode }}">Email</a>
            <a href="{{ post.url | relative_url }}#comments">Comment</a>
          </div>
        </article>
      {% endif %}
    {% endfor %}
  </section>
</article>
