---
layout: default
title: Videos
permalink: /blog/videos/
---
<article class="page narrow blog-category-page">
  <p class="label">My Blog</p>
  <h1><span class="blog-category-icon" aria-hidden="true">🎬</span>Videos</h1>
  <p class="lead">All video posts in one vertical list.</p>
  <p><a href="{{ '/blog/' | relative_url }}">← Back to My Blog</a></p>

  <section class="blog-full-list" data-blog-section="video">
    {% for post in site.posts %}
      {% assign post_kind = post.category | default: post.format | downcase %}
      {% if post_kind == "video" %}
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
              <a class="comment-button" href="{{ post.url | relative_url }}#comments">Comment</a>
              <button class="share-button" type="button" data-share-title="{{ post.title | escape }}" data-share-url="{{ post.url | absolute_url }}">Share</button>
            </div>
        </article>
      {% endif %}
    {% endfor %}
  </section>
</article>
