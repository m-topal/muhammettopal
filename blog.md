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

  <details class="blog-advanced-search" open>
    <summary>Advanced search</summary>
    <div class="blog-advanced-search-inner">
      <p class="note">Search the blog together with the rest of the website, and filter by type, format, and date.</p>

      <section class="site-search-box" aria-label="Advanced site search">
        <input id="siteSearchInput" class="search-input" type="search" placeholder="Type a word, title, topic, course, publication, or phrase">

        <div class="advanced-search-grid">
          <label>
            Type
            <select id="siteSearchType">
              <option value="all">All</option>
              <option value="page">Pages</option>
              <option value="post">Blog posts</option>
            </select>
          </label>

          <label>
            Format
            <select id="siteSearchCategory">
              <option value="all">All formats</option>
              <option value="essay">Essays</option>
              <option value="note">Notes</option>
              <option value="video">Videos</option>
              <option value="podcast">Podcasts</option>
              <option value="fragment">Fragments</option>
              <option value="research">Research</option>
              <option value="teaching">Teaching</option>
              <option value="publication">Publications</option>
              <option value="presentation">Presentations</option>
              <option value="other">Other pages</option>
            </select>
          </label>

          <label>
            From
            <input id="siteSearchFrom" type="date">
          </label>

          <label>
            To
            <input id="siteSearchTo" type="date">
          </label>

          <label>
            Sort
            <select id="siteSearchSort">
              <option value="relevance">Relevance</option>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="title">Title</option>
            </select>
          </label>
        </div>
      </section>

      <p id="siteSearchStatus" class="note">Type at least two characters, or use the filters.</p>
      <section id="siteSearchResults" class="site-search-results" aria-label="Search results"></section>
    </div>
  </details>

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
      {% for post in site.posts %}
        <article class="blog-list-item"
                 data-category="{{ post.category | default: post.format | downcase }}"
                 data-date="{{ post.date | date: '%Y-%m-%d' }}"
                 data-title="{{ post.title | escape }}"
                 data-search="{{ post.title | strip_html | escape }} {{ post.description | strip_html | escape }} {{ post.category | escape }} {{ post.format | escape }} {{ post.content | strip_html | normalize_whitespace | escape }}">
          <p class="meta">{{ post.date | date: "%B %-d, %Y" }} · {{ post.format | default: post.category | capitalize }}</p>
          <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
          {% if post.description %}
            <p>{{ post.description }}</p>
          {% endif %}
        </article>
      {% endfor %}
    {% else %}
      <div class="blog-coming">
        <h2>Content coming soon.</h2>
        <p>This section is ready for essays, notes, videos, podcasts, and fragments. Once a file is added to <code>_posts</code>, it will automatically appear here.</p>
      </div>

      <div class="placeholder-grid">
        <article>
          <span>Essays</span>
          <p>Longer reflections and public writing.</p>
        </article>
        <article>
          <span>Notes</span>
          <p>Short observations, reading notes, and archival fragments.</p>
        </article>
        <article>
          <span>Videos</span>
          <p>Future video entries and recorded conversations.</p>
        </article>
        <article>
          <span>Podcasts</span>
          <p>Audio entries and possible interview materials.</p>
        </article>
        <article>
          <span>Fragments</span>
          <p>Draft-like pieces that do not need to become essays.</p>
        </article>
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

  <div id="siteSearchData" hidden>
    {% for post in site.posts %}
      <article class="search-data-item"
        data-title="{{ post.title | strip_html | escape }}"
        data-url="{{ post.url | relative_url }}"
        data-type="post"
        data-category="{{ post.category | default: post.format | default: 'post' | downcase | escape }}"
        data-date="{{ post.date | date: '%Y-%m-%d' }}"
        data-description="{{ post.description | default: post.excerpt | strip_html | normalize_whitespace | escape }}"
        data-content="{{ post.content | strip_html | normalize_whitespace | escape }}"></article>
    {% endfor %}

    {% for site_page in site.pages %}
      {% if site_page.title and site_page.url != '/search/' and site_page.url != '/search.json' and site_page.url != '/404.html' %}
        <article class="search-data-item"
          data-title="{{ site_page.title | strip_html | escape }}"
          data-url="{{ site_page.url | relative_url }}"
          data-type="page"
          data-category="{% if site_page.url contains 'research' %}research{% elsif site_page.url contains 'teaching' %}teaching{% elsif site_page.url contains 'publication' %}publication{% elsif site_page.url contains 'presentation' %}presentation{% else %}other{% endif %}"
          data-date=""
          data-description="{{ site_page.description | default: site_page.excerpt | strip_html | normalize_whitespace | escape }}"
          data-content="{{ site_page.content | strip_html | normalize_whitespace | escape }}"></article>
      {% endif %}
    {% endfor %}
  </div>
</article>
