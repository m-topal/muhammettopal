---
layout: default
title: Search
permalink: /search/
description: Search Muhammet Topal's academic website and blog.
---
<article class="page narrow">
  <p class="label">Search</p>
  <h1>Search</h1>
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
</article>
