---
layout: default
title: Home
permalink: /
---
<section class="hero">
  <div class="portrait">
    <img src="{{ '/assets/img/muhammet-topal.jpg' | relative_url }}" alt="Muhammet Topal">
    <div class="caption">Muhammet Topal</div>
  </div>
  <div>
    <h1>Historian of the late Ottoman world.</h1>
    <p class="lead">I work on intellectual life, political opposition, biography, public life, and the Caucasus in the nineteenth and early twentieth centuries.</p>
    <p>I am a PhD candidate in History and Middle Eastern and North African Studies at the University of Arizona, completing a joint doctoral degree with INALCO, Paris. This website gathers my research, teaching, publications, CV, and contact information. <a href="{{ '/blog/' | relative_url }}">My Blog</a> is a separate space for essays, notes, videos, podcasts, and fragments.</p>
    <div class="actions">
      <a class="button" href="{{ '/research/' | relative_url }}">Research</a>
      <a class="button" href="{{ '/teaching/' | relative_url }}">Teaching</a>
      <a class="button" href="{{ '/assets/cv/Muhammet_Topal_CV_2026_July.pdf' | relative_url }}">Download CV</a>
      <a class="button" href="{{ '/blog/' | relative_url }}">My Blog</a>
    </div>
  </div>
</section>

<section class="page narrow">
  <div class="rule"></div>
  <p class="label">Latest</p>
  <h2>From My Blog</h2>
  <div class="post-list">
    {% for post in site.posts limit:3 %}
    <article class="post-list-item">
      <div class="meta">{{ post.format | default: post.category }}<br>{{ post.date | date: "%b %-d, %Y" }}</div>
      <div>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        <p>{{ post.description | default: post.excerpt | strip_html | truncate: 150 }}</p>
      </div>
    </article>
    {% else %}
    <p>First post coming soon.</p>
    {% endfor %}
  </div>
</section>
