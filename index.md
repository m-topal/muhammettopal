---
layout: default
title: Home
permalink: /
---
<section class="hero">
  <div class="hero-text">
    <p class="section-label">Historian</p>
    <h1>Muhammet Topal</h1>
    <p class="hero-tagline">Historian of the late Ottoman world: political opposition, print culture, biography, and the Caucasus.</p>
    <p>PhD candidate in History and Middle Eastern and North African Studies, University of Arizona, completed jointly with INALCO, Paris. This site holds my research, teaching, publications, and CV. The <a href="{{ '/blog/' | relative_url }}">Blog</a>, alongside it, is a running notebook of essays, notes, video, and audio.</p>
  </div>
  <div class="hero-photo">Portrait photo<br>(coming soon)</div>
</section>

<div class="divider"></div>

<section id="bio">
  <p class="section-label">Bio</p>
  <div class="placeholder-notice">This section is under construction. Check back soon.</div>
</section>

<div class="divider"></div>

<section id="research">
  <p class="section-label">Research</p>
  <div class="placeholder-notice">This section is under construction. Check back soon.</div>
</section>

<div class="divider"></div>

<section id="teaching">
  <p class="section-label">Teaching</p>
  <div class="placeholder-notice">This section is under construction. Check back soon.</div>
</section>

<div class="divider"></div>

<section id="publications">
  <p class="section-label">Publications</p>
  <p><a href="{{ '/publications/' | relative_url }}">View the full publications list →</a></p>
</section>

<div class="divider"></div>

<section id="cv-contact">
  <p class="section-label">CV &amp; Contact</p>
  <p><a href="{{ '/cv/' | relative_url }}">Download CV</a> · <a href="{{ '/contact/' | relative_url }}">Get in touch</a></p>
</section>

<div class="divider"></div>

<section>
  <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:16px;">
    <p class="section-label" style="margin:0;">From the blog</p>
    <a href="{{ '/blog/' | relative_url }}" style="font-size:13px;">Visit the blog →</a>
  </div>
  <div class="teaser-grid">
    {% for post in site.posts limit:3 %}
    <div>
      <p class="teaser-label">{{ post.category | upcase }} · {{ post.date | date: "%b %-d" }}</p>
      <p class="teaser-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></p>
      <p class="teaser-desc">{{ post.excerpt | strip_html | truncate: 90 }}</p>
    </div>
    {% else %}
    <p style="color: var(--muted); font-size: 14px;">First post coming soon.</p>
    {% endfor %}
  </div>
</section>
