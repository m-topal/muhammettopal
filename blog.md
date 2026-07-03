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


  <section class="blog-tools blog-advanced-tools" aria-label="Advanced blog search">
    <div class="advanced-blog-grid">
      <label>
        <span>Search</span>
        <input id="blogSearch" class="search-input" type="search" placeholder="Search title, description, text, tags">
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
    </div>
  </section>

  <p id="blogNoResults" class="note blog-no-results" hidden>No matching posts found.</p>
</article>
