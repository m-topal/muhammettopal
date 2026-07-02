---
layout: default
title: Home
permalink: /
---
<section id="home" class="billboard section-anchor">
  <div class="billboard-copy">
    <p class="section-label">Historian</p>
    <h1>Muhammet Topal</h1>
    <p class="tagline">Historian of the late Ottoman world: political opposition, print culture, biography, and the Caucasus.</p>
    <p class="home-note">This website brings together my research, teaching, publications, CV, and contact information. The Blog is a separate track, a living notebook for essays, notes, videos, podcasts, and fragments.</p>
    <p class="currently"><span>Currently</span> PhD candidate in History and Middle Eastern and North African Studies at the University of Arizona, completed jointly with INALCO, Paris.</p>
  </div>
  <figure class="portrait-panel">
    <div class="portrait-placeholder">Portrait or archival image</div>
    <figcaption>Add a photograph of yourself or an archival image here.</figcaption>
  </figure>
</section>

<section class="quote-strip">
  <p>“To read the past is also to learn how people made worlds in words.”</p>
</section>

<section id="research" class="content-section section-anchor">
  <p class="section-label">Research</p>
  <h2>Research</h2>
  <p class="lead">My research examines the making of public intellectual life, political opposition, and historical consciousness in the late Ottoman world, with particular attention to biography, print culture, and imperial borderlands.</p>
  <div class="two-column">
    <div>
      <h3>Dissertation</h3>
      <p>My dissertation reconstructs the intellectual and political trajectory of Mizancı Mehmed Murad Bey from the Russian Caucasus to Istanbul, Paris, Geneva, and Cairo. It uses biography as an instrument for studying the formation of Ottoman opposition, the public intellectual, and the political imagination of the late empire.</p>
    </div>
    <div>
      <h3>Interests</h3>
      <ul class="quiet-list">
        <li>Late Ottoman intellectual history</li>
        <li>Print culture and publics</li>
        <li>Political opposition and exile</li>
        <li>The Caucasus and imperial borderlands</li>
        <li>Biography, microhistory, and transimperial methods</li>
      </ul>
    </div>
  </div>
</section>

<section id="teaching" class="content-section section-anchor">
  <p class="section-label">Teaching</p>
  <h2>Teaching</h2>
  <p class="lead">I teach courses on the modern Middle East, political Islam, religious and ethnic diversity, and the history of empire. My teaching emphasizes historical context, careful reading, conceptual clarity, and the connection between political ideas and lived experience.</p>
  <div class="timeline-list">
    <div><span>2026</span><strong>Introduction to Political Islam</strong>, Instructor of Record</div>
    <div><span>2025</span><strong>Middle East Ethnic and Religious Minorities</strong>, Instructor of Record</div>
    <div><span>2025</span><strong>Introduction to Political Islam</strong>, Instructor of Record</div>
    <div><span>2024</span><strong>Introduction to Political Islam</strong>, Instructor of Record</div>
  </div>
</section>

<section id="publications" class="content-section section-anchor">
  <p class="section-label">Publications</p>
  <h2>Publications</h2>
  <p class="lead">Selected publications and translations. A fuller list is available in the CV.</p>
  <div class="publication-list">
    <div><span>2026</span><p>Topal, Muhammet, tr. <strong>Biyografi</strong>, by Melanie Nolan. İstanbul: Vakıf Bank Kültür Yayınları. Forthcoming.</p></div>
    <div><span>2026</span><p>“Bringing Them Across the Border: Dagestani Mehmed Murad Bey's Petitions for Emigration and Family Reunification.” <em>Keshif</em>, forthcoming.</p></div>
    <div><span>2026</span><p>“A Camel Story: Hadji Ali and the Transimperial Routes of Labor, Identity, and Enterprise.” <em>Footnotes: A Journal of History</em> 8: 70–84.</p></div>
    <div><span>2025</span><p>“Temsil, Hafıza ve Anlatının İzinde, İpek Yolu'nda Üç Seyyah: Marco Polo, İbn Battûta ve Tudelalı Benjamin.” <em>Tarih Dergisi</em>, no. 32: 178–86.</p></div>
  </div>
</section>

<section id="cv" class="content-section section-anchor">
  <p class="section-label">CV</p>
  <h2>CV</h2>
  <p class="lead">The full CV can be downloaded as a PDF. Once the PDF is placed in <code>assets/cv/Muhammet_Topal_CV.pdf</code>, it will also appear embedded below.</p>
  <p><a class="download-button" href="{{ '/assets/cv/Muhammet_Topal_CV.pdf' | relative_url }}">Download CV (PDF)</a></p>
  <div class="cv-frame">
    <iframe src="{{ '/assets/cv/Muhammet_Topal_CV.pdf' | relative_url }}" title="Muhammet Topal CV"></iframe>
  </div>
</section>

<section id="contact" class="content-section section-anchor">
  <p class="section-label">Contact</p>
  <h2>Contact</h2>
  <p class="lead">For academic correspondence, teaching, talks, or collaborations, please contact me by email.</p>
  <div class="contact-grid">
    <div><span>Email</span><a href="mailto:muhammettopal29@arizona.edu">muhammettopal29@arizona.edu</a></div>
    <div><span>Affiliation</span><p>Department of History, University of Arizona</p></div>
    <div><span>Profiles</span><p>Add ORCID, Academia.edu, Google Scholar, or LinkedIn links here.</p></div>
  </div>
</section>

<section class="from-blog">
  <div class="section-heading-row">
    <div>
      <p class="section-label">From the Blog</p>
      <h2>Recent writing and media</h2>
    </div>
    <a href="{{ '/blog/' | relative_url }}">Visit the Blog →</a>
  </div>
  <div class="teaser-grid">
    {% assign shown = site.posts | slice: 0, 3 %}
    {% for post in shown %}
      <article class="mini-post">
        <p class="post-meta">{{ post.format | default: post.category | upcase }} · {{ post.date | date: "%b %-d, %Y" }}</p>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        <p>{{ post.description | default: post.excerpt | strip_html | truncate: 110 }}</p>
      </article>
    {% else %}
      <p class="muted">First post coming soon.</p>
    {% endfor %}
  </div>
</section>
