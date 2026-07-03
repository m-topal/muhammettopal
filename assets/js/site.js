function copyCurrentLink(){
  navigator.clipboard.writeText(window.location.href);
  const b=document.getElementById("copyLinkButton");
  if(b){
    const o=b.textContent;
    b.textContent="Copied";
    setTimeout(()=>b.textContent=o,1400);
  }
}

function updateReadingProgress(){
  const bar = document.getElementById("readingProgress");
  if(!bar) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? Math.min(100, Math.max(0, (scrollTop / height) * 100)) : 0;
  bar.style.width = progress + "%";
}

document.addEventListener("DOMContentLoaded",function(){
  document.querySelectorAll(".accordion-trigger").forEach(function(btn){
    btn.addEventListener("click",function(){
      btn.closest(".accordion-item").classList.toggle("open");
    });
  });

  const slides=document.querySelectorAll(".slide");
  let index=0;

  function showSlide(i){
    if(!slides.length)return;
    slides[index].classList.remove("active");
    index=(i+slides.length)%slides.length;
    slides[index].classList.add("active");
    const c=document.getElementById("slideCounter");
    if(c)c.textContent=(index+1)+" / "+slides.length;
  }

  const p=document.getElementById("slidePrev");
  const n=document.getElementById("slideNext");
  if(p)p.addEventListener("click",()=>showSlide(index-1));
  if(n)n.addEventListener("click",()=>showSlide(index+1));

  updateReadingProgress();
});

window.addEventListener("scroll", updateReadingProgress, {passive:true});
window.addEventListener("resize", updateReadingProgress);


/* v21: clickable images on Diversions page */
(function () {
  function setupDiversionsLightbox() {
    if (!document.body || !/\/diversions\/?$/.test(window.location.pathname)) return;

    var images = document.querySelectorAll('.diversions-feature-grid figure img, .caption-gallery figure img');
    if (!images.length) return;

    var lightbox = document.createElement('div');
    lightbox.className = 'diversions-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.innerHTML = [
      '<button class="diversions-lightbox-close" type="button" aria-label="Close image">×</button>',
      '<div class="diversions-lightbox-inner">',
      '<img alt="">',
      '<div class="diversions-lightbox-caption"></div>',
      '</div>'
    ].join('');

    document.body.appendChild(lightbox);

    var modalImg = lightbox.querySelector('img');
    var modalCaption = lightbox.querySelector('.diversions-lightbox-caption');
    var closeButton = lightbox.querySelector('.diversions-lightbox-close');

    function openLightbox(img) {
      var figure = img.closest('figure');
      var caption = figure ? figure.querySelector('figcaption') : null;
      modalImg.src = img.currentSrc || img.src;
      modalImg.alt = img.alt || '';
      modalCaption.textContent = caption ? caption.textContent.trim() : '';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      closeButton.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
      modalImg.removeAttribute('src');
    }

    images.forEach(function (img) {
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Open image');
      img.addEventListener('click', function () { openLightbox(img); });
      img.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(img);
        }
      });
    });

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupDiversionsLightbox);
  } else {
    setupDiversionsLightbox();
  }
})();

/* v21: local like buttons for blog cards and post pages */
(function () {
  function setupPostLikes() {
    var buttons = document.querySelectorAll('.post-like-button');
    if (!buttons.length) return;

    buttons.forEach(function (button) {
      var id = button.getAttribute('data-post-id') || window.location.pathname;
      var key = 'post-like-' + id;
      var countKey = 'post-like-count-' + id;
      var countEl = button.querySelector('.like-count');
      var liked = localStorage.getItem(key) === '1';
      var count = parseInt(localStorage.getItem(countKey) || '0', 10);

      function render() {
        button.classList.toggle('is-liked', liked);
        var label = liked ? '♥ Liked ' : '♡ Like ';
        button.childNodes[0].nodeValue = label;
        if (countEl) countEl.textContent = String(count);
      }

      render();

      button.addEventListener('click', function () {
        liked = !liked;
        count = Math.max(0, count + (liked ? 1 : -1));
        localStorage.setItem(key, liked ? '1' : '0');
        localStorage.setItem(countKey, String(count));
        render();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPostLikes);
  } else {
    setupPostLikes();
  }
})();


/* v28: advanced blog search by text, format, tag, date, and sort */
(function () {
  function setupAdvancedBlogSearch() {
    var blogPage = document.querySelector('.blog-advanced-tools');
    if (!blogPage) return;

    var search = document.getElementById('blogSearch');
    var format = document.getElementById('blogFormatFilter');
    var tag = document.getElementById('blogTagFilter');
    var dateFrom = document.getElementById('blogDateFrom');
    var dateTo = document.getElementById('blogDateTo');
    var sort = document.getElementById('blogSort');
    var reset = document.getElementById('blogResetFilters');
    var summary = document.getElementById('blogSearchSummary');
    var cards = Array.prototype.slice.call(document.querySelectorAll('.blog-card'));

    function normalize(value) {
      return (value || '').toString().trim().toLowerCase();
    }

    function cardMatches(card) {
      var q = normalize(search && search.value);
      var fmt = normalize(format && format.value);
      var tg = normalize(tag && tag.value);
      var from = dateFrom && dateFrom.value ? dateFrom.value : '';
      var to = dateTo && dateTo.value ? dateTo.value : '';

      var cardText = normalize(card.getAttribute('data-search'));
      var cardFormat = normalize(card.getAttribute('data-format') || card.getAttribute('data-category'));
      var cardTags = normalize(card.getAttribute('data-tags'));
      var cardDate = card.getAttribute('data-date') || '';

      if (q && cardText.indexOf(q) === -1) return false;
      if (fmt && fmt !== 'all' && cardFormat !== fmt) return false;
      if (tg && tg !== 'all' && cardTags.split(/\s+/).indexOf(tg) === -1) return false;
      if (from && cardDate < from) return false;
      if (to && cardDate > to) return false;

      return true;
    }

    function applySort() {
      var mode = sort ? sort.value : 'newest';
      document.querySelectorAll('.blog-shelf-row').forEach(function (row) {
        var rowCards = Array.prototype.slice.call(row.querySelectorAll('.blog-card'));
        rowCards.sort(function (a, b) {
          if (mode === 'oldest') {
            return (a.getAttribute('data-date') || '').localeCompare(b.getAttribute('data-date') || '');
          }
          if (mode === 'title') {
            return normalize(a.getAttribute('data-title')).localeCompare(normalize(b.getAttribute('data-title')));
          }
          return (b.getAttribute('data-date') || '').localeCompare(a.getAttribute('data-date') || '');
        });
        rowCards.forEach(function (card) { row.appendChild(card); });
      });
    }

    function selectedFormat() {
      return normalize(format && format.value) || 'all';
    }

    function updateSections() {
      var selected = selectedFormat();

      document.querySelectorAll('.blog-shelf').forEach(function (section) {
        var sectionType = normalize(section.getAttribute('data-blog-section'));
        var sectionRelevant = selected === 'all' || selected === sectionType;
        var visible = section.querySelectorAll('.blog-card:not([hidden])').length;
        var emptyState = section.querySelector('.blog-empty-state');

        section.hidden = !sectionRelevant;

        if (emptyState) {
          emptyState.hidden = visible !== 0;
        }
      });

      var noResults = document.getElementById('blogNoResults');
      if (noResults) noResults.hidden = true;
    }

    function syncShortcutButtons() {
      var selected = selectedFormat();
      document.querySelectorAll('[data-format-shortcut]').forEach(function (button) {
        button.classList.toggle('active', normalize(button.getAttribute('data-format-shortcut')) === selected);
      });
    }

    function applyFilters() {
      applySort();
      syncShortcutButtons();
      var count = 0;
      cards.forEach(function (card) {
        var show = cardMatches(card);
        card.hidden = !show;
        if (show) count += 1;
      });
      updateSections();
      if (summary) {
        summary.textContent = count + (count === 1 ? ' result' : ' results');
      }
    }

    [search, format, tag, dateFrom, dateTo, sort].forEach(function (el) {
      if (!el) return;
      el.addEventListener('input', applyFilters);
      el.addEventListener('change', applyFilters);
    });

    document.querySelectorAll('[data-format-shortcut]').forEach(function (button) {
      button.addEventListener('click', function () {
        var value = button.getAttribute('data-format-shortcut') || 'all';
        if (format) format.value = value;
        document.querySelectorAll('[data-format-shortcut]').forEach(function (b) {
          b.classList.toggle('active', b === button);
        });
        applyFilters();
      });
    });

    if (reset) {
      reset.addEventListener('click', function () {
        if (search) search.value = '';
        if (format) format.value = 'all';
        if (tag) tag.value = 'all';
        if (dateFrom) dateFrom.value = '';
        if (dateTo) dateTo.value = '';
        if (sort) sort.value = 'newest';
        document.querySelectorAll('[data-format-shortcut]').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-format-shortcut') === 'all');
        });
        applyFilters();
      });
    }

    applyFilters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAdvancedBlogSearch);
  } else {
    setupAdvancedBlogSearch();
  }
})();
