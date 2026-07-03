---
layout: default
title: Advanced Search
permalink: /search/
description: Search Muhammet Topal's academic website and blog.
---
<article class="page narrow">
  <p class="label">Site tool</p>
  <h1>Advanced Search</h1>
  <p class="lead">Search the website, research pages, teaching pages, publications, presentations, and blog posts.</p>

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

  <p id="siteSearchStatus" class="note">Start typing to search.</p>
  <section id="siteSearchResults" class="site-search-results" aria-label="Search results"></section>

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
