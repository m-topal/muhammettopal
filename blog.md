---
layout: default
title: My Blog
permalink: /blog/
description: Essays, notes, videos, podcasts, and fragments by Muhammet Topal.
---
<article class="page narrow">
  <p class="label">Separate track</p>
  <h1>My Blog</h1>
  <p class="lead">Essays, notes, videos, podcasts, and fragments.</p>

  <section class="blog-tools" aria-label="Blog tools">
    <input id="blogSearch" class="search-input" type="search" placeholder="Search the blog">

    <div class="blog-filter-row" aria-label="Blog categories">
      <button class="blog-filter active" data-filter="all" type="button">All</button>
      <a class="blog-filter blog-filter-link" href="{{ '/blog/essays/' | relative_url }}">Essays</a>
      <a class="blog-filter blog-filter-link" href="{{ '/blog/podcasts/' | relative_url }}">Podcasts</a>
      <a class="blog-filter blog-filter-link" href="{{ '/blog/videos/' | relative_url }}">Videos</a>
    </div>
  </section>

  <section class="blog-shelf" data-blog-section="essay">
    <a class="blog-shelf-heading blog-shelf-heading-link" href="{{ '/blog/essays/' | relative_url }}">
      <span class="blog-shelf-icon typewriter-icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" focusable="false">
          <path d="M13 6h22v12H13z"></path>
          <path d="M8 22h32a4 4 0 0 1 4 4v12H4V26a4 4 0 0 1 4-4z"></path>
          <path d="M11 38h26v4H11z"></path>
          <path d="M15 27h3M22 27h3M29 27h3M36 27h3M12 32h24"></path>
        </svg>
      </span>
      <h2>Essays</h2>
      <span class="view-all">View all</span>
    </a>

    <div class="blog-shelf-row">
      {% for post in site.posts %}
        {% assign post_kind = post.category | default: post.format | downcase %}
        {% if post_kind == "essay" %}
          <article class="blog-card"
            data-category="{{ post_kind }}"
            data-date="{{ post.date | date: '%Y-%m-%d' }}"
            data-title="{{ post.title | escape }}"
            data-search="{{ post.title | strip_html | escape }} {{ post.description | strip_html | escape }} {{ post.category | escape }} {{ post.format | escape }} {{ post.content | strip_html | normalize_whitespace | escape }}">
            <p class="meta">{{ post.date | date: '%B %-d, %Y' }} · {{ post.format | default: post.category | capitalize }}</p>
            <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
            {% if post.description %}
              <p>{{ post.description }}</p>
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
    </div>
  </section>

  <section class="blog-shelf" data-blog-section="podcast">
    <a class="blog-shelf-heading blog-shelf-heading-link" href="{{ '/blog/podcasts/' | relative_url }}">
      <span class="blog-shelf-icon" aria-hidden="true">🎙️</span>
      <h2>Podcasts</h2>
      <span class="view-all">View all</span>
    </a>

    <div class="blog-shelf-row">
      {% for post in site.posts %}
        {% assign post_kind = post.category | default: post.format | downcase %}
        {% if post_kind == "podcast" %}
          <article class="blog-card"
            data-category="{{ post_kind }}"
            data-date="{{ post.date | date: '%Y-%m-%d' }}"
            data-title="{{ post.title | escape }}"
            data-search="{{ post.title | strip_html | escape }} {{ post.description | strip_html | escape }} {{ post.category | escape }} {{ post.format | escape }} {{ post.content | strip_html | normalize_whitespace | escape }}">
            <p class="meta">{{ post.date | date: '%B %-d, %Y' }} · {{ post.format | default: post.category | capitalize }}</p>
            <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
            {% if post.description %}
              <p>{{ post.description }}</p>
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
    </div>
  </section>

  <section class="blog-shelf" data-blog-section="video">
    <a class="blog-shelf-heading blog-shelf-heading-link" href="{{ '/blog/videos/' | relative_url }}">
      <span class="blog-shelf-icon" aria-hidden="true">🎬</span>
      <h2>Videos</h2>
      <span class="view-all">View all</span>
    </a>

    <div class="blog-shelf-row">
      {% for post in site.posts %}
        {% assign post_kind = post.category | default: post.format | downcase %}
        {% if post_kind == "video" %}
          <article class="blog-card video-card"
            data-category="{{ post_kind }}"
            data-date="{{ post.date | date: '%Y-%m-%d' }}"
            data-title="{{ post.title | escape }}"
            data-search="{{ post.title | strip_html | escape }} {{ post.description | strip_html | escape }} {{ post.category | escape }} {{ post.format | escape }} {{ post.content | strip_html | normalize_whitespace | escape }}">
            <p class="meta">{{ post.date | date: '%B %-d, %Y' }} · {{ post.format | default: post.category | capitalize }}</p>
            <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
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
    </div>
  </section>

  <p id="blogNoResults" class="note blog-no-results" hidden>No matching posts found.</p>
</article>
