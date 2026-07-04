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
/* v32: share dropdowns for blog cards and post pages */
(function () {
  function closeShareMenus(exceptPanel) {
    document.querySelectorAll('.share-menu-panel').forEach(function (panel) {
      if (panel !== exceptPanel) {
        panel.hidden = true;
        var toggle = panel.closest('.share-menu-wrap') && panel.closest('.share-menu-wrap').querySelector('.share-menu-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function copyText(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value);
    }

    var temp = document.createElement('textarea');
    temp.value = value;
    temp.setAttribute('readonly', '');
    temp.style.position = 'absolute';
    temp.style.left = '-9999px';
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    return Promise.resolve();
  }

  function setupShareMenus() {
    document.addEventListener('click', function (event) {
      var toggle = event.target.closest('.share-menu-toggle');
      if (toggle) {
        var wrap = toggle.closest('.share-menu-wrap');
        var panel = wrap && wrap.querySelector('.share-menu-panel');
        if (!panel) return;

        var willOpen = panel.hidden;
        closeShareMenus(panel);
        panel.hidden = !willOpen;
        toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        return;
      }

      var copyButton = event.target.closest('.share-copy');
      if (copyButton) {
        var url = copyButton.getAttribute('data-url') || window.location.href;
        copyText(url).then(function () {
          var old = copyButton.textContent;
          copyButton.textContent = 'Copied';
          setTimeout(function () {
            copyButton.textContent = old;
          }, 1400);
        });
        closeShareMenus();
        return;
      }

      if (!event.target.closest('.share-menu-wrap')) {
        closeShareMenus();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeShareMenus();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupShareMenus);
  } else {
    setupShareMenus();
  }
})();
/* v34: share popup modal, prevents card clipping */
(function () {
  function closePopup() {
    var existing = document.querySelector('.share-popup-overlay');
    if (existing) existing.remove();
    document.body.classList.remove('share-popup-open');
  }

  function copyText(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value);
    }
    var temp = document.createElement('textarea');
    temp.value = value;
    temp.setAttribute('readonly', '');
    temp.style.position = 'absolute';
    temp.style.left = '-9999px';
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    temp.remove();
    return Promise.resolve();
  }

  function classifyLink(el) {
    var href = el.getAttribute('href') || '';
    var text = (el.textContent || '').trim();

    if (href.indexOf('facebook') !== -1) return { label: 'Facebook', icon: 'f', cls: 'icon-facebook' };
    if (href.indexOf('twitter') !== -1 || text === 'X') return { label: 'X', icon: 'X', cls: 'icon-x' };
    if (href.indexOf('linkedin') !== -1) return { label: 'LinkedIn', icon: 'in', cls: 'icon-linkedin' };
    if (href.indexOf('mailto:') === 0) return { label: 'Email', icon: '✉', cls: 'icon-email' };
    if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp') !== -1) return { label: 'WhatsApp', icon: '☏', cls: 'icon-whatsapp' };
    return { label: text || 'Share', icon: '↗', cls: 'icon-share' };
  }

  function optionNodeFromElement(el) {
    var isCopy = el.classList && el.classList.contains('share-copy');
    var href = el.getAttribute('href');
    var info = isCopy ? { label: 'Copy link', icon: '🔗', cls: 'icon-copy' } : classifyLink(el);

    var node;
    if (isCopy) {
      node = document.createElement('button');
      node.type = 'button';
      node.setAttribute('data-copy-url', el.getAttribute('data-url') || window.location.href);
    } else {
      node = document.createElement('a');
      node.href = href;
      if (el.target) node.target = el.target;
      if (el.rel) node.rel = el.rel;
    }

    node.className = 'share-popup-option';
    node.innerHTML = '<span class="share-popup-icon ' + info.cls + '">' + info.icon + '</span><span>' + info.label + '</span>';
    return node;
  }

  function openPopup(toggle) {
    closePopup();

    var wrap = toggle.closest('.share-menu-wrap');
    var panel = wrap && wrap.querySelector('.share-menu-panel');
    if (!panel) return;

    var sourceActions = toggle.closest('.social-actions');
    var postUrl = (sourceActions && sourceActions.getAttribute('data-post-url')) || window.location.href;
    var postTitle = (sourceActions && sourceActions.getAttribute('data-post-title')) || document.title;

    var overlay = document.createElement('div');
    overlay.className = 'share-popup-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Share');

    var dialog = document.createElement('div');
    dialog.className = 'share-popup-dialog';

    var header = document.createElement('div');
    header.className = 'share-popup-header';
    header.innerHTML = '<h2 class="share-popup-title">Share</h2><button class="share-popup-close" type="button" aria-label="Close share dialog">×</button>';

    var options = document.createElement('div');
    options.className = 'share-popup-options';

    Array.prototype.slice.call(panel.children).forEach(function (child) {
      if (child.matches && (child.matches('a') || child.matches('button'))) {
        options.appendChild(optionNodeFromElement(child));
      }
    });

    var copyRow = document.createElement('div');
    copyRow.className = 'share-popup-copy-row';
    copyRow.innerHTML = '<div class="share-popup-url">' + postUrl + '</div><button class="share-popup-copy-main" type="button" data-copy-url="' + postUrl + '">Copy</button>';

    dialog.appendChild(header);
    dialog.appendChild(options);
    dialog.appendChild(copyRow);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    document.body.classList.add('share-popup-open');

    var close = overlay.querySelector('.share-popup-close');
    if (close) close.focus();
  }

  document.addEventListener('click', function (event) {
    var toggle = event.target.closest('.share-menu-toggle');
    if (toggle) {
      event.preventDefault();
      event.stopPropagation();
      if (event.stopImmediatePropagation) event.stopImmediatePropagation();
      openPopup(toggle);
      return;
    }

    var close = event.target.closest('.share-popup-close');
    if (close) {
      event.preventDefault();
      closePopup();
      return;
    }

    var copy = event.target.closest('.share-popup-option[data-copy-url], .share-popup-copy-main[data-copy-url]');
    if (copy) {
      event.preventDefault();
      copyText(copy.getAttribute('data-copy-url') || window.location.href).then(function () {
        var old = copy.textContent;
        copy.textContent = 'Copied';
        setTimeout(function () {
          copy.textContent = old;
        }, 1200);
      });
      return;
    }

    var overlay = event.target.classList && event.target.classList.contains('share-popup-overlay');
    if (overlay) closePopup();
  }, true);

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closePopup();
  });
})();
/* v35: close simplified navigation dropdowns on outside click */
(function () {
  function closeNavDropdowns(except) {
    document.querySelectorAll('.nav-dropdown[open]').forEach(function (dropdown) {
      if (dropdown !== except) dropdown.open = false;
    });
  }

  function setupNavDropdowns() {
    document.addEventListener('click', function (event) {
      var dropdown = event.target.closest('.nav-dropdown');

      if (dropdown) {
        document.querySelectorAll('.nav-dropdown[open]').forEach(function (other) {
          if (other !== dropdown) other.open = false;
        });
        return;
      }

      closeNavDropdowns();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeNavDropdowns();
    });

    document.querySelectorAll('.nav-dropdown-panel a').forEach(function (link) {
      link.addEventListener('click', function () {
        var dropdown = link.closest('.nav-dropdown');
        if (dropdown) dropdown.open = false;
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupNavDropdowns);
  } else {
    setupNavDropdowns();
  }
})();
/* v39: open nav dropdowns on hover as well as click */
(function () {
  function setupHoverDropdowns() {
    document.querySelectorAll('.nav-dropdown').forEach(function (dropdown) {
      var closeTimer = null;

      dropdown.addEventListener('mouseenter', function () {
        if (closeTimer) window.clearTimeout(closeTimer);
        dropdown.open = true;
        document.querySelectorAll('.nav-dropdown[open]').forEach(function (other) {
          if (other !== dropdown) other.open = false;
        });
      });

      dropdown.addEventListener('mouseleave', function () {
        closeTimer = window.setTimeout(function () {
          if (!dropdown.matches(':focus-within')) dropdown.open = false;
        }, 120);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHoverDropdowns);
  } else {
    setupHoverDropdowns();
  }
})();


/* v57b: universal click-to-enlarge image lightbox */
(function () {
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    var images = document.querySelectorAll('.js-lightbox-image');
    if (!images.length) return;

    var overlay = document.createElement('div');
    overlay.className = 'image-lightbox';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = [
      '<div class="image-lightbox-inner" role="dialog" aria-modal="true" aria-label="Expanded image">',
      '<button class="image-lightbox-close" type="button" aria-label="Close expanded image">×</button>',
      '<img alt="">',
      '<div class="image-lightbox-caption"></div>',
      '</div>'
    ].join('');

    document.body.appendChild(overlay);

    var lightboxImg = overlay.querySelector('img');
    var caption = overlay.querySelector('.image-lightbox-caption');
    var closeButton = overlay.querySelector('.image-lightbox-close');

    function closeLightbox() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('image-lightbox-open');
      lightboxImg.removeAttribute('src');
      caption.textContent = '';
    }

    function openLightbox(img) {
      var figure = img.closest('figure');
      var figcaption = figure ? figure.querySelector('figcaption') : null;
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || '';
      caption.textContent = figcaption ? figcaption.textContent.trim() : '';
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('image-lightbox-open');
      closeButton.focus();
    }

    images.forEach(function (img) {
      img.addEventListener('click', function () {
        openLightbox(img);
      });
      img.setAttribute('tabindex', '0');
      img.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(img);
        }
      });
    });

    closeButton.addEventListener('click', closeLightbox);

    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  });
})();


/* v58: restore Teaching Experience course modal clicks */
(function () {
  function closeCourseModal(modal) {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('course-modal-open');
  }

  function openCourseModal(modal) {
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add('course-modal-open');
    var close = modal.querySelector('.course-modal-close');
    if (close) close.focus();
  }

  function setupCourseModals() {
    document.querySelectorAll('.course-modal-trigger[data-course-modal]').forEach(function (button) {
      if (button.dataset.courseModalReady === 'true') return;
      button.dataset.courseModalReady = 'true';

      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        var id = button.getAttribute('data-course-modal');
        openCourseModal(document.getElementById(id));
      });
    });

    document.querySelectorAll('.course-modal').forEach(function (modal) {
      if (modal.dataset.courseModalReady === 'true') return;
      modal.dataset.courseModalReady = 'true';

      modal.addEventListener('click', function (event) {
        if (event.target === modal) {
          closeCourseModal(modal);
        }
      });

      modal.querySelectorAll('.course-modal-close').forEach(function (close) {
        close.addEventListener('click', function () {
          closeCourseModal(modal);
        });
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        document.querySelectorAll('.course-modal:not([hidden])').forEach(closeCourseModal);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCourseModals);
  } else {
    setupCourseModals();
  }
})();


/* v60: Teaching Assistantship course modal safety */
(function () {
  function closeCourseModal(modal) {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('course-modal-open');
  }

  function openCourseModal(modal) {
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add('course-modal-open');
    var close = modal.querySelector('.course-modal-close');
    if (close) close.focus();
  }

  function setupV60CourseModals() {
    document.querySelectorAll('.course-modal-trigger[data-course-modal]').forEach(function (button) {
      if (button.dataset.v60Ready === 'true') return;
      button.dataset.v60Ready = 'true';
      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        openCourseModal(document.getElementById(button.getAttribute('data-course-modal')));
      });
    });

    document.querySelectorAll('.course-modal').forEach(function (modal) {
      if (modal.dataset.v60ModalReady === 'true') return;
      modal.dataset.v60ModalReady = 'true';
      modal.addEventListener('click', function (event) {
        if (event.target === modal) closeCourseModal(modal);
      });
      modal.querySelectorAll('.course-modal-close').forEach(function (close) {
        close.addEventListener('click', function () {
          closeCourseModal(modal);
        });
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        document.querySelectorAll('.course-modal:not([hidden])').forEach(closeCourseModal);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupV60CourseModals);
  } else {
    setupV60CourseModals();
  }
})();
