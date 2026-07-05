---
layout: default
title: My Blog
permalink: /blog/
description: Essays, notes, videos, podcasts, and fragments by Muhammet Topal.
---
<article class="page narrow blog-page">
  <p class="label">Separate track</p>
  <h1>My Blog</h1>
  <p class="lead">Essays, notes, videos, podcasts, and fragments.</p>


  <section class="blog-tools blog-advanced-tools" aria-label="Advanced blog search">
    <div class="advanced-blog-grid">
      <label class="blog-search-field">
        <span>Search</span>
        <input id="blogSearch" class="search-input" type="search" placeholder="Search keywords, title, description, text, or tags">
      </label>

      <label>
        <span>Format</span>
        <select id="blogFormatFilter" class="search-input">
          <option value="all">All formats</option>
          <option value="essay">Essays</option>
          <option value="podcast">Podcasts</option>
          <option value="video">Videos</option>
        </select>
      </label>

      <label>
        <span>Tag</span>
        <select id="blogTagFilter" class="search-input">
          <option value="all">All tags</option>
          {% assign all_tags = "" | split: "" %}
          {% for post in site.posts %}
            {% for tag in post.tags %}
              {% assign all_tags = all_tags | push: tag %}
            {% endfor %}
          {% endfor %}
          {% assign all_tags = all_tags | uniq | sort %}
          {% for tag in all_tags %}
            <option value="{{ tag | downcase | escape }}">{{ tag }}</option>
          {% endfor %}
        </select>
      </label>

      <label>
        <span>From</span>
        <input id="blogDateFrom" class="search-input" type="date">
      </label>

      <label>
        <span>To</span>
        <input id="blogDateTo" class="search-input" type="date">
      </label>

      <label>
        <span>Sort</span>
        <select id="blogSort" class="search-input">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="title">Title A to Z</option>
        </select>
      </label>
    </div>

    <div class="blog-filter-row" aria-label="Blog categories">
      <button class="blog-filter active" data-format-shortcut="all" type="button">All</button>
      <button class="blog-filter" data-format-shortcut="essay" type="button">Essays</button>
      <button class="blog-filter" data-format-shortcut="podcast" type="button">Podcasts</button>
      <button class="blog-filter" data-format-shortcut="video" type="button">Videos</button>
      <button class="blog-filter" id="blogResetFilters" type="button">Reset</button>
    </div>

    <p id="blogSearchSummary" class="blog-search-summary" aria-live="polite"></p>
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
            data-format="{{ post_kind }}"
            data-date="{{ post.date | date: '%Y-%m-%d' }}"
            data-title="{{ post.title | escape }}"
            data-tags="{{ post.tags | join: ' ' | downcase | escape }}"
            data-search="{{ post.title | strip_html | escape }} {{ post.description | strip_html | escape }} {{ post.category | escape }} {{ post.format | escape }} {{ post.tags | join: ' ' | escape }} {{ post.content | strip_html | normalize_whitespace | escape }}">
            <p class="meta">{{ post.date | date: '%B %-d, %Y' }} · {{ post.format | default: post.category | capitalize }}</p>
            <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
            {% if post.description %}
              <p>{{ post.description }}</p>
            {% endif %}

            <div class="blog-card-actions social-actions" data-post-title="{{ post.title | escape }}" data-post-url="{{ post.url | absolute_url }}">
              <button class="post-like-button social-action-button" type="button" data-post-id="{{ post.url | slugify }}">♡ Like <span class="like-count" aria-live="polite">0</span></button>
              <a class="social-action-button" href="{{ post.url | relative_url }}#comments">Comment</a>
              <div class="share-menu-wrap">
                <button class="social-action-button share-menu-toggle" type="button" aria-expanded="false">Share</button>
                <div class="share-menu-panel" hidden>
                  <a href="https://www.facebook.com/sharer/sharer.php?u={{ post.url | absolute_url | url_encode }}" target="_blank" rel="noopener">Facebook</a>
                  <a href="https://twitter.com/intent/tweet?url={{ post.url | absolute_url | url_encode }}&text={{ post.title | url_encode }}" target="_blank" rel="noopener">X</a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url={{ post.url | absolute_url | url_encode }}" target="_blank" rel="noopener">LinkedIn</a>
                  <a href="mailto:?subject={{ post.title | url_encode }}&body={{ post.url | absolute_url | url_encode }}">Email</a>
                  <a href="https://wa.me/?text={{ post.title | url_encode }}%20{{ post.url | absolute_url | url_encode }}" target="_blank" rel="noopener">WhatsApp</a>
                  <button class="share-copy" type="button" data-url="{{ post.url | absolute_url }}">Copy link</button>
                </div>
              </div>
            </div>
          </article>
        {% endif %}
      {% endfor %}
    </div>
    <p class="blog-empty-state" hidden>No essays yet.</p>
  </section>

  <section class="blog-shelf" data-blog-section="podcast">
    <a class="blog-shelf-heading blog-shelf-heading-link" href="{{ '/blog/podcasts/' | relative_url }}">
      <span class="blog-shelf-icon" aria-hidden="true"><span class="line-icon line-icon-podcast" aria-hidden="true"><svg viewBox="0 0 48 48" focusable="false"><path d="M24 7a7 7 0 0 0-7 7v10a7 7 0 0 0 14 0V14a7 7 0 0 0-7-7z"></path><path d="M12 22v2a12 12 0 0 0 24 0v-2"></path><path d="M24 36v6"></path><path d="M16 42h16"></path></svg></span></span>
      <h2>Podcasts</h2>
      <span class="view-all">View all</span>
    </a>

    <div class="blog-shelf-row">
      {% for post in site.posts %}
        {% assign post_kind = post.category | default: post.format | downcase %}
        {% if post_kind == "podcast" %}
          <article class="blog-card"
            data-category="{{ post_kind }}"
            data-format="{{ post_kind }}"
            data-date="{{ post.date | date: '%Y-%m-%d' }}"
            data-title="{{ post.title | escape }}"
            data-tags="{{ post.tags | join: ' ' | downcase | escape }}"
            data-search="{{ post.title | strip_html | escape }} {{ post.description | strip_html | escape }} {{ post.category | escape }} {{ post.format | escape }} {{ post.tags | join: ' ' | escape }} {{ post.content | strip_html | normalize_whitespace | escape }}">
            <p class="meta">{{ post.date | date: '%B %-d, %Y' }} · {{ post.format | default: post.category | capitalize }}</p>
            <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
            {% if post.description %}
              <p>{{ post.description }}</p>
            {% endif %}

            <div class="blog-card-actions social-actions" data-post-title="{{ post.title | escape }}" data-post-url="{{ post.url | absolute_url }}">
              <button class="post-like-button social-action-button" type="button" data-post-id="{{ post.url | slugify }}">♡ Like <span class="like-count" aria-live="polite">0</span></button>
              <a class="social-action-button" href="{{ post.url | relative_url }}#comments">Comment</a>
              <div class="share-menu-wrap">
                <button class="social-action-button share-menu-toggle" type="button" aria-expanded="false">Share</button>
                <div class="share-menu-panel" hidden>
                  <a href="https://www.facebook.com/sharer/sharer.php?u={{ post.url | absolute_url | url_encode }}" target="_blank" rel="noopener">Facebook</a>
                  <a href="https://twitter.com/intent/tweet?url={{ post.url | absolute_url | url_encode }}&text={{ post.title | url_encode }}" target="_blank" rel="noopener">X</a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url={{ post.url | absolute_url | url_encode }}" target="_blank" rel="noopener">LinkedIn</a>
                  <a href="mailto:?subject={{ post.title | url_encode }}&body={{ post.url | absolute_url | url_encode }}">Email</a>
                  <a href="https://wa.me/?text={{ post.title | url_encode }}%20{{ post.url | absolute_url | url_encode }}" target="_blank" rel="noopener">WhatsApp</a>
                  <button class="share-copy" type="button" data-url="{{ post.url | absolute_url }}">Copy link</button>
                </div>
              </div>
            </div>
          </article>
        {% endif %}
      {% endfor %}
    </div>
    <p class="blog-empty-state" hidden>No podcasts yet.</p>
  </section>

  <section class="blog-shelf" data-blog-section="video">
    <a class="blog-shelf-heading blog-shelf-heading-link" href="{{ '/blog/videos/' | relative_url }}">
      <span class="blog-shelf-icon" aria-hidden="true"><span class="line-icon line-icon-video" aria-hidden="true"><svg viewBox="0 0 48 48" focusable="false"><path d="M7 12h34v24H7z"></path><path d="M21 19l10 5-10 5z"></path></svg></span></span>
      <h2>Videos</h2>
      <span class="view-all">View all</span>
    </a>

    <div class="blog-shelf-row">
      {% for post in site.posts %}
        {% assign post_kind = post.category | default: post.format | downcase %}
        {% if post_kind == "video" %}
          <article class="blog-card video-card"
            data-category="{{ post_kind }}"
            data-format="{{ post_kind }}"
            data-date="{{ post.date | date: '%Y-%m-%d' }}"
            data-title="{{ post.title | escape }}"
            data-tags="{{ post.tags | join: ' ' | downcase | escape }}"
            data-search="{{ post.title | strip_html | escape }} {{ post.description | strip_html | escape }} {{ post.category | escape }} {{ post.format | escape }} {{ post.tags | join: ' ' | escape }} {{ post.content | strip_html | normalize_whitespace | escape }}">
            <p class="meta">{{ post.date | date: '%B %-d, %Y' }} · {{ post.format | default: post.category | capitalize }}</p>
            <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
            {% comment %}v96: video cards show only title, video preview, and actions on the preview card.{% endcomment %}
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

            <div class="blog-card-actions social-actions" data-post-title="{{ post.title | escape }}" data-post-url="{{ post.url | absolute_url }}">
              <button class="post-like-button social-action-button" type="button" data-post-id="{{ post.url | slugify }}">♡ Like <span class="like-count" aria-live="polite">0</span></button>
              <a class="social-action-button" href="{{ post.url | relative_url }}#comments">Comment</a>
              <div class="share-menu-wrap">
                <button class="social-action-button share-menu-toggle" type="button" aria-expanded="false">Share</button>
                <div class="share-menu-panel" hidden>
                  <a href="https://www.facebook.com/sharer/sharer.php?u={{ post.url | absolute_url | url_encode }}" target="_blank" rel="noopener">Facebook</a>
                  <a href="https://twitter.com/intent/tweet?url={{ post.url | absolute_url | url_encode }}&text={{ post.title | url_encode }}" target="_blank" rel="noopener">X</a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url={{ post.url | absolute_url | url_encode }}" target="_blank" rel="noopener">LinkedIn</a>
                  <a href="mailto:?subject={{ post.title | url_encode }}&body={{ post.url | absolute_url | url_encode }}">Email</a>
                  <a href="https://wa.me/?text={{ post.title | url_encode }}%20{{ post.url | absolute_url | url_encode }}" target="_blank" rel="noopener">WhatsApp</a>
                  <button class="share-copy" type="button" data-url="{{ post.url | absolute_url }}">Copy link</button>
                </div>
              </div>
            </div>
          </article>
        {% endif %}
      {% endfor %}
    </div>
    <p class="blog-empty-state" hidden>No videos yet.</p>
  </section>

  <p id="blogNoResults" class="note blog-no-results" hidden>No matching posts found.</p>
</article>
