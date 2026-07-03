---
layout: default
title: Essays
permalink: /blog/essays/
---
<article class="page narrow blog-category-page">
  <p class="label">My Blog</p>
  <h1><span class="blog-category-icon" aria-hidden="true"><span class="typewriter-icon inline"><svg viewBox="0 0 48 48" focusable="false"><path d="M13 6h22v12H13z"></path><path d="M8 22h32a4 4 0 0 1 4 4v12H4V26a4 4 0 0 1 4-4z"></path><path d="M11 38h26v4H11z"></path><path d="M15 27h3M22 27h3M29 27h3M36 27h3M12 32h24"></path></svg></span></span>Essays</h1>
  <p class="lead">All essay posts in one vertical list.</p>
  <p><a href="{{ '/blog/' | relative_url }}">← Back to My Blog</a></p>

  <section class="blog-full-list" data-blog-section="essay">
    {% for post in site.posts %}
      {% assign post_kind = post.category | default: post.format | downcase %}
      {% if post_kind == "essay" %}
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
            <a href="mailto:muhammet.topal@sciencespo.fr?subject=Comment on {{ post.title | url_encode }}&body={{ post.url | absolute_url | url_encode }}">Comment</a>
          </div>
        </article>
      {% endif %}
    {% endfor %}
  </section>
</article>
