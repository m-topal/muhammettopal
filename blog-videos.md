---
layout: default
title: Videos
permalink: /blog/videos/
---
<article class="page wide blog-video-list-page">
  <p class="label">My Blog</p>
  <h1><span class="blog-category-icon" aria-hidden="true"><span class="line-icon line-icon-video" aria-hidden="true"><svg viewBox="0 0 48 48" focusable="false"><path d="M7 12h34v24H7z"></path><path d="M21 19l10 5-10 5z"></path></svg></span></span>Videos</h1>
  <p><a href="{{ '/blog/' | relative_url }}">← Back to My Blog</a></p>

  <section class="blog-video-list" data-blog-section="video">
    {% for post in site.posts %}
      {% assign post_kind = post.category | default: post.format | downcase %}
      {% if post_kind == "video" %}
        <article class="video-list-card blog-list-click-card" data-post-href="{{ post.url | relative_url }}">
          {% if post.youtube_id %}
            <div class="video-embed video-list-preview">
              <iframe
                src="https://www.youtube.com/embed/{{ post.youtube_id }}"
                title="{{ post.title | escape }}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
              </iframe>
            </div>
          {% endif %}
          <div class="video-list-body">
            <p class="meta">{{ post.date | date: '%B %-d, %Y' }} · {{ post.format | default: post.category | capitalize }}</p>
            <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
            {% if post.description %}<p>{{ post.description }}</p>{% endif %}
          </div>
        </article>
      {% endif %}
    {% endfor %}
  </section>
</article>
