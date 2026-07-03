---
layout: default
title: My Blog
permalink: /blog/
---
<article class="page narrow">
  <p class="label">Separate track</p>
  <h1>My Blog</h1>
  <p class="lead">Essays, notes, videos, podcasts, and fragments.</p>

  <div class="search-box">
    <input id="blogSearch" class="search-input" type="search" placeholder="Search the blog archive">
    <div id="blogSearchResult" class="search-results">Blog archive is not yet published.</div>
  </div>

  <div class="share-row" aria-label="Share this page">
    <a href="https://www.linkedin.com/sharing/share-offsite/?url={{ page.url | absolute_url }}" target="_blank" rel="noopener">Share on LinkedIn</a>
    <a href="https://twitter.com/intent/tweet?url={{ page.url | absolute_url }}&text=My Blog | Muhammet Topal" target="_blank" rel="noopener">Share on X</a>
    <a href="mailto:?subject=My Blog | Muhammet Topal&body={{ page.url | absolute_url }}" target="_blank" rel="noopener">Email</a>
    <button id="copyLinkButton" onclick="copyCurrentLink()">Copy link</button>
  </div>

  <div class="blog-coming">
    <h2>Content coming soon.</h2>
    <p>This section is being prepared as a separate space for public writing, short notes, video entries, podcast episodes, and archive fragments.</p>
    <p class="note">Future posts will have their own share links and comment sections.</p>
  </div>
</article>
