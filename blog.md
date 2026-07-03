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
      <button class="blog-filter" data-filter="essay" type="button">Essays</button>
      <button class="blog-filter" data-filter="note" type="button">Notes</button>
      <button class="blog-filter" data-filter="video" type="button">Videos</button>
      <button class="blog-filter" data-filter="podcast" type="button">Podcasts</button>
      <button class="blog-filter" data-filter="fragment" type="button">Fragments</button>
    </div>

    <div class="blog-sort-row">
      <label for="blogSort">Sort</label>
      <select id="blogSort">
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="title">Title</option>
      </select>
    </div>
  </section>
  <div class="share-row" aria-label="Share this page">
    <a href="https://www.linkedin.com/sharing/share-offsite/?url={{ page.url | absolute_url }}" target="_blank" rel="noopener">Share on LinkedIn</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u={{ page.url | absolute_url }}" target="_blank" rel="noopener">Share on Facebook</a>
    <a href="https://api.whatsapp.com/send?text=My%20Blog%20%7C%20Muhammet%20Topal%20{{ page.url | absolute_url }}" target="_blank" rel="noopener">Share on WhatsApp</a>
    <a href="https://twitter.com/intent/tweet?url={{ page.url | absolute_url }}&text=My%20Blog%20%7C%20Muhammet%20Topal" target="_blank" rel="noopener">Share on X</a>
    <a href="mailto:?subject=My Blog | Muhammet Topal&body={{ page.url | absolute_url }}" target="_blank" rel="noopener">Email</a>
    <button id="copyLinkButton" onclick="copyCurrentLink()" type="button">Copy link</button>
  </div>

  <section id="blogList" class="blog-list" aria-label="Blog archive">
    {% if site.posts.size > 0 %}

    {% assign essays = site.posts | where_exp: "post", "post.category == 'essay' or post.categories contains 'essay' or post.format == 'essay'" %}
    {% assign podcasts = site.posts | where_exp: "post", "post.category == 'podcast' or post.categories contains 'podcast' or post.format == 'podcast'" %}
    {% assign videos = site.posts | where_exp: "post", "post.category == 'video' or post.categories contains 'video' or post.format == 'video'" %}

    <section class="blog-shelf" data-blog-section="essay">
      <div class="blog-shelf-heading">
        <span class="blog-shelf-icon" aria-hidden="true">📝</span>
        <h2>Essays</h2>
      </div>

      <div class="blog-shelf-row">
        {% for post in essays %}
          <article class="blog-card"
            data-category="{{ post.category | default: post.format | downcase }}"
            data-date="{{ post.date | date: '%Y-%m-%d' }}"
            data-title="{{ post.title | escape }}"
            data-search="{{ post.title | strip_html | escape }} {{ post.description | strip_html | escape }} {{ post.category | escape }} {{ post.format | escape }} {{ post.content | strip_html | normalize_whitespace | escape }}">
            <p class="meta">{{ post.date | date: '%B %-d, %Y' }} · {{ post.format | default: post.category | capitalize }}</p>
            <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
            {% if post.description %}
              <p>{{ post.description }}</p>
            {% endif %}
          </article>
        {% endfor %}
      </div>
    </section>

    <section class="blog-shelf" data-blog-section="podcast">
      <div class="blog-shelf-heading">
        <span class="blog-shelf-icon" aria-hidden="true">🎙️</span>
        <h2>Podcasts</h2>
      </div>

      <div class="blog-shelf-row">
        {% for post in podcasts %}
          <article class="blog-card"
            data-category="{{ post.category | default: post.format | downcase }}"
            data-date="{{ post.date | date: '%Y-%m-%d' }}"
            data-title="{{ post.title | escape }}"
            data-search="{{ post.title | strip_html | escape }} {{ post.description | strip_html | escape }} {{ post.category | escape }} {{ post.format | escape }} {{ post.content | strip_html | normalize_whitespace | escape }}">
            <p class="meta">{{ post.date | date: '%B %-d, %Y' }} · {{ post.format | default: post.category | capitalize }}</p>
            <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
            {% if post.description %}
              <p>{{ post.description }}</p>
            {% endif %}
          </article>
        {% endfor %}
      </div>
    </section>

    <section class="blog-shelf" data-blog-section="video">
      <div class="blog-shelf-heading">
        <span class="blog-shelf-icon" aria-hidden="true">🎬</span>
        <h2>Videos</h2>
      </div>

      <div class="blog-shelf-row">
        {% for post in videos %}
          <article class="blog-card video-card"
            data-category="{{ post.category | default: post.format | downcase }}"
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
          </article>
        {% endfor %}
      </div>
    </section>

  {% else %}
    <div class="blog-coming">
      <h2>Posts coming soon.</h2>
    </div>
  {% endif %}
  </section>

  <p id="blogNoResults" class="note blog-no-results" hidden>No matching posts found.</p>

  <details class="blog-help">
    <summary>How to add an essay</summary>
    <div class="prose">
      <p>Create a new Markdown file in <code>_posts</code>. The file name should follow this format: <code>2026-07-02-my-essay-title.md</code>.</p>
      <p>Use the example draft included in <code>_drafts/example-essay.md</code> as a model. Drafts do not appear on the public site until moved into <code>_posts</code>.</p>
    </div>
  </details>
</article>
