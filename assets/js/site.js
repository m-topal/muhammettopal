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


/* v64: robust course modal open close */
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

  function setupCourseModalFallback() {
    document.addEventListener('click', function (event) {
      var trigger = event.target.closest('.course-modal-trigger[data-course-modal]');
      if (trigger) {
        event.preventDefault();
        event.stopPropagation();
        openCourseModal(document.getElementById(trigger.getAttribute('data-course-modal')));
        return;
      }

      var close = event.target.closest('.course-modal-close');
      if (close) {
        event.preventDefault();
        closeCourseModal(close.closest('.course-modal'));
        return;
      }

      if (event.target.classList && event.target.classList.contains('course-modal')) {
        closeCourseModal(event.target);
      }
    }, true);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        document.querySelectorAll('.course-modal:not([hidden])').forEach(closeCourseModal);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCourseModalFallback);
  } else {
    setupCourseModalFallback();
  }
})();


/* v64b: direct modal trigger fallback */
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

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('.course-modal-trigger[data-course-modal]');
    if (trigger) {
      event.preventDefault();
      event.stopPropagation();
      openCourseModal(document.getElementById(trigger.getAttribute('data-course-modal')));
      return;
    }

    var close = event.target.closest('.course-modal-close');
    if (close) {
      event.preventDefault();
      closeCourseModal(close.closest('.course-modal'));
      return;
    }

    if (event.target.classList && event.target.classList.contains('course-modal')) {
      closeCourseModal(event.target);
    }
  }, true);

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      document.querySelectorAll('.course-modal:not([hidden])').forEach(closeCourseModal);
    }
  });
})();

/* v89: keyboard support for certificate detail cards */
(function () {
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    var trigger = event.target.closest('.certificate-detail-card.course-modal-trigger[data-course-modal]');
    if (!trigger) return;
    event.preventDefault();
    trigger.click();
  });
})();

/* v95: make blog cards open from the whole card, while keeping action buttons separate */
(function () {
  function setupClickableBlogCards() {
    var cards = document.querySelectorAll('.blog-page .blog-card');
    if (!cards.length) return;

    cards.forEach(function (card) {
      var titleLink = card.querySelector('h3 a[href]');
      if (!titleLink) return;

      card.classList.add('blog-card-clickable');
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'link');
      card.setAttribute('aria-label', (titleLink.textContent || 'Open post').trim());

      function shouldIgnore(target) {
        return !!target.closest('a, button, input, textarea, select, label, .blog-card-actions, .social-actions, .share-menu-wrap, .share-popup-overlay');
      }

      card.addEventListener('click', function (event) {
        if (shouldIgnore(event.target)) return;
        window.location.href = titleLink.href;
      });

      card.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        if (shouldIgnore(event.target)) return;
        event.preventDefault();
        window.location.href = titleLink.href;
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupClickableBlogCards);
  } else {
    setupClickableBlogCards();
  }
})();


/* v97: make video list cards and dropdown labels behave as links */
(function () {
  function setupV97Links() {
    document.querySelectorAll('.blog-list-click-card[data-post-href]').forEach(function (card) {
      var href = card.getAttribute('data-post-href');
      if (!href) return;
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'link');

      function ignore(target) {
        return !!target.closest('a, button, input, textarea, select, label, iframe');
      }

      card.addEventListener('click', function (event) {
        if (ignore(event.target)) return;
        window.location.href = href;
      });

      card.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        if (ignore(event.target)) return;
        event.preventDefault();
        window.location.href = href;
      });
    });

    document.querySelectorAll('.nav-dropdown > summary[data-nav-target]').forEach(function (summary) {
      summary.addEventListener('click', function (event) {
        var target = summary.getAttribute('data-nav-target');
        if (!target) return;
        event.preventDefault();
        window.location.href = target;
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupV97Links);
  } else {
    setupV97Links();
  }
})();

/* v99: small interactive appointment calendar */
(function () {
  function initMiniCalendars() {
    document.querySelectorAll('[data-mini-calendar]').forEach(function (calendar) {
      var monthNode = calendar.querySelector('[data-calendar-month]');
      var yearNode = calendar.querySelector('[data-calendar-year]');
      var daysNode = calendar.querySelector('[data-calendar-days]');
      var prevButton = calendar.querySelector('[data-calendar-prev]');
      var nextButton = calendar.querySelector('[data-calendar-next]');
      var todayButtons = calendar.querySelectorAll('[data-calendar-today]');
      if (!monthNode || !yearNode || !daysNode || !prevButton || !nextButton) return;

      var today = new Date();
      var shown = new Date(today.getFullYear(), today.getMonth(), 1);
      var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      function render() {
        var year = shown.getFullYear();
        var month = shown.getMonth();
        var first = new Date(year, month, 1);
        var start = first.getDay();
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        var prevDays = new Date(year, month, 0).getDate();
        var cells = [];

        monthNode.textContent = monthNames[month];
        yearNode.textContent = year;
        daysNode.innerHTML = '';

        for (var i = 0; i < 42; i += 1) {
          var dayNumber = i - start + 1;
          var cell = document.createElement('button');
          cell.type = 'button';
          cell.className = 'mini-calendar-day';

          if (dayNumber < 1) {
            cell.textContent = prevDays + dayNumber;
            cell.classList.add('is-muted');
          } else if (dayNumber > daysInMonth) {
            cell.textContent = dayNumber - daysInMonth;
            cell.classList.add('is-muted');
          } else {
            cell.textContent = dayNumber;
            if (year === today.getFullYear() && month === today.getMonth() && dayNumber === today.getDate()) {
              cell.classList.add('is-today');
              cell.setAttribute('aria-current', 'date');
            }
          }

          cells.push(cell);
        }

        /* Always render six weeks so the calendar height never changes between months. */
        cells.forEach(function (cell) {
          cell.addEventListener('click', function () {
            daysNode.querySelectorAll('.mini-calendar-day.is-selected').forEach(function (selected) {
              selected.classList.remove('is-selected');
            });
            cell.classList.add('is-selected');
          });
          daysNode.appendChild(cell);
        });
      }

      prevButton.addEventListener('click', function () {
        shown = new Date(shown.getFullYear(), shown.getMonth() - 1, 1);
        render();
      });

      nextButton.addEventListener('click', function () {
        shown = new Date(shown.getFullYear(), shown.getMonth() + 1, 1);
        render();
      });

      todayButtons.forEach(function (button) {
        button.addEventListener('click', function () {
          shown = new Date(today.getFullYear(), today.getMonth(), 1);
          render();
        });
      });

      render();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMiniCalendars);
  } else {
    initMiniCalendars();
  }
})();


/* v116: FormSubmit-compatible single attachment with removable chip, maximum 10MB */
(function () {
  var SINGLE_FILE_MESSAGE = 'Please add your attachments as a single file, max 10MB.';
  var MAX_TOTAL_SIZE = 10 * 1024 * 1024;
  var SIZE_MESSAGE = 'Attachment must be under 10MB.';

  function showAttachmentWarning(message) {
    var existing = document.querySelector('.attachment-limit-popup');
    if (existing) existing.remove();

    var popup = document.createElement('div');
    popup.className = 'attachment-limit-popup';
    popup.setAttribute('role', 'alert');
    popup.innerHTML = '<span>' + message + '</span><button type="button" aria-label="Close attachment warning">×</button>';
    document.body.appendChild(popup);

    var close = popup.querySelector('button');
    var timer = window.setTimeout(function () {
      popup.classList.add('is-hiding');
      window.setTimeout(function () { popup.remove(); }, 180);
    }, 3600);

    close.addEventListener('click', function () {
      window.clearTimeout(timer);
      popup.remove();
    });
  }

  function fileListFromArray(files) {
    var dt = new DataTransfer();
    files.forEach(function (file) { dt.items.add(file); });
    return dt.files;
  }

  function initAttachmentNames() {
    document.querySelectorAll('.message-toolbar-file').forEach(function (input) {
      var toolbar = input.closest('.message-toolbar');
      var output = toolbar ? toolbar.querySelector('[data-attachment-filename]') : null;
      var clear = toolbar ? toolbar.querySelector('[data-attachment-clear]') : null;
      if (!output) return;

      var selectedFile = null;

      function syncInputFile() {
        input.files = selectedFile ? fileListFromArray([selectedFile]) : fileListFromArray([]);
      }

      function renderAttachmentLabel() {
        output.innerHTML = '';

        if (!selectedFile) {
          output.textContent = 'No file selected';
          if (clear) clear.hidden = true;
          return;
        }

        var list = document.createElement('span');
        list.className = 'message-toolbar-file-list';

        var chip = document.createElement('span');
        chip.className = 'message-toolbar-file-chip';

        var name = document.createElement('span');
        name.className = 'message-toolbar-file-name';
        name.textContent = selectedFile.name;

        var remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'message-toolbar-file-remove';
        remove.setAttribute('aria-label', 'Remove ' + selectedFile.name);
        remove.textContent = '×';
        remove.addEventListener('click', function () {
          selectedFile = null;
          input.value = '';
          syncInputFile();
          renderAttachmentLabel();
        });

        chip.appendChild(name);
        chip.appendChild(remove);
        list.appendChild(chip);
        output.appendChild(list);
        if (clear) clear.hidden = false;
      }

      input.addEventListener('change', function () {
        var incomingFiles = input.files ? Array.prototype.slice.call(input.files) : [];

        if (incomingFiles.length > 1) {
          showAttachmentWarning(SINGLE_FILE_MESSAGE);
          input.value = '';
          syncInputFile();
          renderAttachmentLabel();
          return;
        }

        if (!incomingFiles.length) {
          syncInputFile();
          renderAttachmentLabel();
          return;
        }

        var file = incomingFiles[0];
        if (file.size > MAX_TOTAL_SIZE) {
          showAttachmentWarning(SIZE_MESSAGE);
          input.value = '';
          syncInputFile();
          renderAttachmentLabel();
          return;
        }

        if (selectedFile) {
          showAttachmentWarning(SINGLE_FILE_MESSAGE);
          input.value = '';
          syncInputFile();
          renderAttachmentLabel();
          return;
        }

        selectedFile = file;
        syncInputFile();
        renderAttachmentLabel();
      });

      if (clear) {
        clear.addEventListener('click', function () {
          selectedFile = null;
          input.value = '';
          syncInputFile();
          renderAttachmentLabel();
        });
      }

      renderAttachmentLabel();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAttachmentNames);
  } else {
    initAttachmentNames();
  }
})();
/* v109: contact message character counter, maximum 1000 characters */
(function () {
  function initMessageCharacterCounters() {
    document.querySelectorAll('[data-message-counter-source]').forEach(function (textarea) {
      var wrap = textarea.closest('.message-box-wrap');
      var counter = wrap ? wrap.querySelector('[data-message-character-count]') : null;
      var max = Number(textarea.getAttribute('maxlength')) || 1000;
      if (!wrap || !counter) return;

      function updateCounter() {
        var length = textarea.value.length;
        if (length === 0) {
          counter.textContent = 'Max ' + max + ' characters';
        } else {
          counter.textContent = length + '/' + max;
        }
        wrap.classList.toggle('is-at-limit', length >= max);
      }

      textarea.addEventListener('input', updateCounter);
      updateCounter();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMessageCharacterCounters);
  } else {
    initMessageCharacterCounters();
  }
})();

/* v112: keyboard support for whole Teaching Experience course cards */
(function () {
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    var trigger = event.target.closest('.teaching-experience-page .teaching-course-card.course-modal-trigger[data-course-modal]');
    if (!trigger) return;
    event.preventDefault();
    trigger.click();
  });
})();

/* v129: CV PDF modal on About page */
(function () {
  function closeCvModal(modal) {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('cv-modal-open');
  }

  function openCvModal(modal) {
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add('cv-modal-open');
    var close = modal.querySelector('.cv-modal-close');
    if (close) close.focus();
  }

  function setupCvModal() {
    document.addEventListener('click', function (event) {
      var trigger = event.target.closest('.cv-modal-trigger[data-cv-modal]');
      if (trigger) {
        event.preventDefault();
        openCvModal(document.getElementById(trigger.getAttribute('data-cv-modal')));
        return;
      }

      var close = event.target.closest('.cv-modal-close');
      if (close) {
        event.preventDefault();
        closeCvModal(close.closest('.cv-modal'));
        return;
      }

      if (event.target.classList && event.target.classList.contains('cv-modal')) {
        closeCvModal(event.target);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      document.querySelectorAll('.cv-modal:not([hidden])').forEach(closeCvModal);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCvModal);
  } else {
    setupCvModal();
  }
})();


/* v130: Teaching page smooth section scrolling and hash sync */
(function () {
  function setupTeachingContinuousScroll() {
    var page = document.querySelector('[data-scroll-sections].teaching-continuous-page');
    if (!page) return;

    var nav = page.querySelector('.teaching-scroll-nav');
    var sections = Array.prototype.slice.call(page.querySelectorAll('.teaching-scroll-section[id]'));
    if (!nav || !sections.length) return;

    var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));

    function setActive(id, updateHash) {
      links.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
      if (updateHash && history.replaceState && window.location.hash !== '#' + id) {
        history.replaceState(null, '', '#' + id);
      }
    }

    links.forEach(function (link) {
      link.addEventListener('click', function (event) {
        var id = link.getAttribute('href').slice(1);
        var target = document.getElementById(id);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActive(id, true);
      });
    });

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        var visible = entries
          .filter(function (entry) { return entry.isIntersecting; })
          .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
        if (visible && visible.target && visible.target.id) {
          setActive(visible.target.id, true);
        }
      }, {
        root: null,
        rootMargin: '-32% 0px -55% 0px',
        threshold: [0, .15, .3, .55]
      });
      sections.forEach(function (section) { observer.observe(section); });
    }

    var initial = window.location.hash ? window.location.hash.slice(1) : sections[0].id;
    if (document.getElementById(initial)) setActive(initial, false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupTeachingContinuousScroll);
  } else {
    setupTeachingContinuousScroll();
  }
})();

/* v132: keep Teaching section bar visually separated while scrolling */
(function () {
  function setupTeachingScrollNavVisibility() {
    var nav = document.querySelector('.teaching-scroll-nav');
    if (!nav) return;
    var timer = null;
    function markScrolling() {
      nav.classList.add('is-scrolling');
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        nav.classList.remove('is-scrolling');
      }, 850);
    }
    window.addEventListener('scroll', markScrolling, { passive: true });
    markScrolling();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupTeachingScrollNavVisibility);
  } else {
    setupTeachingScrollNavVisibility();
  }
})();

/* v133: clickable co-teaching carousel arrows and persistent sticky nav frame */
(function () {
  function setupTeachingSliderControls() {
    document.querySelectorAll('.teaching-slider-frame').forEach(function (frame) {
      var row = frame.querySelector('.co-teaching-course-row');
      var left = frame.querySelector('.teaching-slider-cue-left');
      var right = frame.querySelector('.teaching-slider-cue-right');
      if (!row || !left || !right) return;

      function scrollByCard(direction) {
        var card = row.querySelector('.teaching-course-card');
        var amount = card ? Math.round(card.getBoundingClientRect().width + 22) : Math.round(row.clientWidth * .8);
        row.scrollBy({ left: direction * amount, behavior: 'smooth' });
      }

      [left, right].forEach(function (button) {
        button.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          scrollByCard(button === right ? 1 : -1);
        });
        button.addEventListener('keydown', function (event) {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          event.stopPropagation();
          scrollByCard(button === right ? 1 : -1);
        });
      });
    });
  }

  function setupTeachingStickyNavState() {
    var nav = document.querySelector('.teaching-scroll-nav');
    if (!nav) return;
    var initialTop = nav.getBoundingClientRect().top + window.scrollY;
    function update() {
      var active = window.scrollY > initialTop - 82;
      nav.classList.toggle('is-sticky-active', active);
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', function () {
      initialTop = nav.getBoundingClientRect().top + window.scrollY;
      update();
    });
    update();
  }

  function init() {
    setupTeachingSliderControls();
    setupTeachingStickyNavState();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* v134: make co-teaching carousel circular and keep Teaching section nav clearly framed */
(function () {
  function initCircularTeachingCarousel() {
    document.querySelectorAll('.teaching-slider-frame').forEach(function (frame) {
      var row = frame.querySelector('.co-teaching-course-row');
      var left = frame.querySelector('.teaching-slider-cue-left');
      var right = frame.querySelector('.teaching-slider-cue-right');
      if (!row || !left || !right || row.dataset.circularReady === 'true') return;

      var originalCards = Array.prototype.slice.call(row.children);
      if (originalCards.length < 2) return;

      var before = originalCards.map(function (card) {
        var clone = card.cloneNode(true);
        clone.dataset.carouselClone = 'true';
        clone.setAttribute('aria-hidden', 'true');
        clone.querySelectorAll('[tabindex]').forEach(function (node) { node.setAttribute('tabindex', '-1'); });
        return clone;
      });
      var after = originalCards.map(function (card) {
        var clone = card.cloneNode(true);
        clone.dataset.carouselClone = 'true';
        clone.setAttribute('aria-hidden', 'true');
        clone.querySelectorAll('[tabindex]').forEach(function (node) { node.setAttribute('tabindex', '-1'); });
        return clone;
      });

      before.forEach(function (clone) { row.insertBefore(clone, row.firstChild); });
      after.forEach(function (clone) { row.appendChild(clone); });

      frame.classList.add('is-circular');
      row.dataset.circularReady = 'true';

      function originalWidth() {
        var width = 0;
        originalCards.forEach(function (card) {
          width += card.getBoundingClientRect().width;
        });
        var gap = parseFloat(window.getComputedStyle(row).columnGap || window.getComputedStyle(row).gap || '0') || 0;
        return width + gap * originalCards.length;
      }

      function cardStep() {
        var card = originalCards[0];
        var gap = parseFloat(window.getComputedStyle(row).columnGap || window.getComputedStyle(row).gap || '22') || 22;
        return card ? Math.round(card.getBoundingClientRect().width + gap) : Math.round(row.clientWidth * .8);
      }

      function jumpToMiddle() {
        row.scrollLeft = originalWidth();
      }

      function normalizePosition() {
        var width = originalWidth();
        if (!width) return;
        if (row.scrollLeft < width * .35) {
          row.scrollLeft += width;
        } else if (row.scrollLeft > width * 1.65) {
          row.scrollLeft -= width;
        }
      }

      window.setTimeout(jumpToMiddle, 50);

      var scrollTimer = null;
      row.addEventListener('scroll', function () {
        if (scrollTimer) window.clearTimeout(scrollTimer);
        scrollTimer = window.setTimeout(normalizePosition, 90);
      }, { passive: true });

      window.addEventListener('resize', function () {
        window.setTimeout(jumpToMiddle, 80);
      });

      function move(direction) {
        normalizePosition();
        row.scrollBy({ left: direction * cardStep(), behavior: 'smooth' });
        window.setTimeout(normalizePosition, 420);
      }

      [left, right].forEach(function (button) {
        button.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopImmediatePropagation();
          event.stopPropagation();
          move(button === right ? 1 : -1);
        }, true);
        button.addEventListener('keydown', function (event) {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          event.stopImmediatePropagation();
          event.stopPropagation();
          move(button === right ? 1 : -1);
        }, true);
      });
    });
  }

  function initClearTeachingNavOnScroll() {
    var nav = document.querySelector('.teaching-scroll-nav');
    if (!nav) return;
    function update() {
      nav.classList.toggle('is-sticky-active', window.scrollY > 80);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function init() {
    initCircularTeachingCarousel();
    initClearTeachingNavOnScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* v139: sitewide back-to-top button */
(function () {
  function initBackToTopButton() {
    if (document.querySelector('.back-to-top-button')) return;

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'back-to-top-button';
    button.setAttribute('aria-label', 'Back to top');
    button.innerHTML = '';
    document.body.appendChild(button);

    function update() {
      var visible = window.scrollY > 420;
      button.classList.toggle('is-visible', visible);
    }

    button.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackToTopButton);
  } else {
    initBackToTopButton();
  }
})();

/* v141: robust Teaching card modal behavior after carousel changes */
(function () {
  function openCourseModal(modal) {
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add('course-modal-open');
    var close = modal.querySelector('.course-modal-close');
    if (close) close.focus();
  }

  function setupTeachingCardInteractivity() {
    document.addEventListener('click', function (event) {
      if (event.target.closest('.teaching-slider-cue')) return;
      var card = event.target.closest('.teaching-continuous-page .teaching-course-card.course-modal-trigger[data-course-modal]');
      if (!card) return;
      event.preventDefault();
      event.stopPropagation();
      openCourseModal(document.getElementById(card.getAttribute('data-course-modal')));
    }, true);

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      var card = event.target.closest('.teaching-continuous-page .teaching-course-card.course-modal-trigger[data-course-modal]');
      if (!card || event.target.closest('.teaching-slider-cue')) return;
      event.preventDefault();
      openCourseModal(document.getElementById(card.getAttribute('data-course-modal')));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupTeachingCardInteractivity);
  } else {
    setupTeachingCardInteractivity();
  }
})();

/* v142: continuous Research page section nav */
(function () {
  function setupContinuousResearchScroll() {
    var page = document.querySelector('[data-scroll-sections].research-continuous-page');
    if (!page) return;

    var nav = page.querySelector('.teaching-scroll-nav');
    var sections = Array.prototype.slice.call(page.querySelectorAll('.teaching-scroll-section[id]'));
    if (!nav || !sections.length) return;

    var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));

    function setActive(id, updateHash) {
      links.forEach(function (link) {
        var active = link.getAttribute('href') === '#' + id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
      if (updateHash && history.replaceState && window.location.hash !== '#' + id) {
        history.replaceState(null, '', '#' + id);
      }
    }

    links.forEach(function (link) {
      link.addEventListener('click', function (event) {
        var id = link.getAttribute('href').slice(1);
        var target = document.getElementById(id);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActive(id, true);
      });
    });

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        var visible = entries
          .filter(function (entry) { return entry.isIntersecting; })
          .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
        if (visible && visible.target && visible.target.id) {
          setActive(visible.target.id, true);
        }
      }, {
        root: null,
        rootMargin: '-32% 0px -55% 0px',
        threshold: [0, .15, .3, .55]
      });
      sections.forEach(function (section) { observer.observe(section); });
    }

    var initial = window.location.hash ? window.location.hash.slice(1) : sections[0].id;
    if (document.getElementById(initial)) setActive(initial, false);
  }

  function setupAllScrollNavState() {
    var navs = Array.prototype.slice.call(document.querySelectorAll('.teaching-scroll-nav'));
    if (!navs.length) return;
    var timer = null;
    function update() {
      navs.forEach(function (nav) {
        nav.classList.toggle('is-sticky-active', window.scrollY > 80);
        nav.classList.add('is-scrolling');
      });
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        navs.forEach(function (nav) { nav.classList.remove('is-scrolling'); });
      }, 850);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function init() {
    setupContinuousResearchScroll();
    setupAllScrollNavState();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* v144: rebuild co-teaching circular carousel in stable order after earlier cloning */
(function () {
  function stabilizeCoTeachingCarousel() {
    document.querySelectorAll('.teaching-slider-frame').forEach(function (frame) {
      var row = frame.querySelector('.co-teaching-course-row');
      if (!row) return;

      var originals = Array.prototype.slice.call(row.children).filter(function (card) {
        return card.dataset.carouselClone !== 'true';
      });
      if (originals.length < 2) return;

      Array.prototype.slice.call(row.children).forEach(function (card) {
        if (card.dataset.carouselClone === 'true') card.remove();
      });

      function makeClone(card) {
        var clone = card.cloneNode(true);
        clone.dataset.carouselClone = 'true';
        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('tabindex', '-1');
        clone.querySelectorAll('[tabindex]').forEach(function (node) {
          node.setAttribute('tabindex', '-1');
        });
        return clone;
      }

      var before = document.createDocumentFragment();
      originals.forEach(function (card) { before.appendChild(makeClone(card)); });
      row.insertBefore(before, originals[0]);
      originals.forEach(function (card) { row.appendChild(makeClone(card)); });

      function originalWidth() {
        var width = 0;
        originals.forEach(function (card) {
          width += card.getBoundingClientRect().width;
        });
        var gap = parseFloat(window.getComputedStyle(row).columnGap || window.getComputedStyle(row).gap || '22') || 22;
        return width + gap * originals.length;
      }

      function jumpToOriginalSet() {
        var width = originalWidth();
        if (width) row.scrollLeft = width;
      }

      frame.classList.add('is-circular');
      row.dataset.circularReady = 'true';
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(jumpToOriginalSet);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', stabilizeCoTeachingCarousel);
  } else {
    stabilizeCoTeachingCarousel();
  }
})();

/* v145: replace earlier carousel listeners with a stable circular co-teaching slider */
(function () {
  function initStableCoTeachingSlider() {
    document.querySelectorAll('.teaching-slider-frame').forEach(function (frame) {
      var row = frame.querySelector('.co-teaching-course-row');
      var left = frame.querySelector('.teaching-slider-cue-left');
      var right = frame.querySelector('.teaching-slider-cue-right');
      if (!row || !left || !right || row.dataset.v145Ready === 'true') return;

      var newLeft = left.cloneNode(true);
      var newRight = right.cloneNode(true);
      left.parentNode.replaceChild(newLeft, left);
      right.parentNode.replaceChild(newRight, right);
      left = newLeft;
      right = newRight;

      var originals = Array.prototype.slice.call(row.children).filter(function (card) {
        return card.dataset.carouselClone !== 'true';
      });
      if (originals.length < 2) return;

      Array.prototype.slice.call(row.children).forEach(function (card) {
        if (card.dataset.carouselClone === 'true') card.remove();
      });

      function makeClone(card) {
        var clone = card.cloneNode(true);
        clone.dataset.carouselClone = 'true';
        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('tabindex', '-1');
        clone.querySelectorAll('[tabindex]').forEach(function (node) {
          node.setAttribute('tabindex', '-1');
        });
        return clone;
      }

      var before = document.createDocumentFragment();
      originals.forEach(function (card) {
        before.appendChild(makeClone(card));
      });
      row.insertBefore(before, originals[0]);

      var after = document.createDocumentFragment();
      originals.forEach(function (card) {
        after.appendChild(makeClone(card));
      });
      row.appendChild(after);

      function gapSize() {
        var style = window.getComputedStyle(row);
        return parseFloat(style.columnGap || style.gap || '22') || 22;
      }

      function setWidth() {
        var gap = gapSize();
        var total = 0;
        originals.forEach(function (card) {
          total += card.getBoundingClientRect().width;
        });
        return total + gap * originals.length;
      }

      function stepSize() {
        var first = originals[0];
        return first ? Math.round(first.getBoundingClientRect().width + gapSize()) : Math.round(row.clientWidth * 0.8);
      }

      function jumpToOriginalSet() {
        var width = setWidth();
        if (width) row.scrollLeft = width;
      }

      function normalize() {
        var width = setWidth();
        if (!width) return;
        if (row.scrollLeft < width * 0.5) {
          row.scrollLeft += width;
        } else if (row.scrollLeft > width * 1.5) {
          row.scrollLeft -= width;
        }
      }

      function move(direction) {
        normalize();
        row.scrollBy({ left: direction * stepSize(), behavior: 'smooth' });
        window.setTimeout(normalize, 480);
      }

      left.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        move(-1);
      }, true);

      right.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        move(1);
      }, true);

      [left, right].forEach(function (button) {
        button.addEventListener('keydown', function (event) {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          move(button === right ? 1 : -1);
        }, true);
      });

      var timer = null;
      row.addEventListener('scroll', function () {
        if (timer) window.clearTimeout(timer);
        timer = window.setTimeout(normalize, 120);
      }, { passive: true });

      frame.classList.add('is-circular');
      row.dataset.circularReady = 'true';
      row.dataset.v145Ready = 'true';

      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(jumpToOriginalSet);
      });

      window.addEventListener('resize', function () {
        window.setTimeout(jumpToOriginalSet, 100);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStableCoTeachingSlider);
  } else {
    initStableCoTeachingSlider();
  }
})();

/* v146: final smooth circular co-teaching carousel, with partial next-card visibility */
(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    document.querySelectorAll('.teaching-slider-frame').forEach(function (frame) {
      var row = frame.querySelector('.co-teaching-course-row');
      var left = frame.querySelector('.teaching-slider-cue-left');
      var right = frame.querySelector('.teaching-slider-cue-right');
      if (!row || !left || !right) return;

      /* Remove earlier experimental clones, then build one clean infinite strip. */
      Array.from(row.querySelectorAll('[data-carousel-clone="true"]')).forEach(function (clone) {
        clone.remove();
      });

      var originals = Array.from(row.children).filter(function (el) {
        return el.classList && el.classList.contains('teaching-course-card');
      });
      if (originals.length < 2) return;

      row.dataset.circularReady = 'v146';
      frame.classList.add('is-circular', 'is-v146-carousel');

      function cloneCard(card) {
        var clone = card.cloneNode(true);
        clone.setAttribute('data-carousel-clone', 'true');
        clone.setAttribute('aria-hidden', 'true');
        clone.tabIndex = -1;
        return clone;
      }

      var before = originals.map(cloneCard);
      var after = originals.map(cloneCard);
      before.reverse().forEach(function (clone) { row.insertBefore(clone, row.firstChild); });
      after.forEach(function (clone) { row.appendChild(clone); });

      function cardStep() {
        var card = row.querySelector('.teaching-course-card');
        if (!card) return Math.round(row.clientWidth * 0.86);
        var style = window.getComputedStyle(row);
        var gap = parseFloat(style.columnGap || style.gap || '28') || 28;
        return Math.round(card.getBoundingClientRect().width + gap);
      }

      function setWidth() {
        return cardStep() * originals.length;
      }

      function placeAtMiddle() {
        row.scrollLeft = setWidth();
      }

      function normalize() {
        var width = setWidth();
        if (!width) return;
        if (row.scrollLeft < width * 0.42) {
          row.scrollLeft += width;
        } else if (row.scrollLeft > width * 1.58) {
          row.scrollLeft -= width;
        }
      }

      function slide(direction) {
        normalize();
        row.scrollBy({ left: direction * cardStep(), behavior: 'smooth' });
        window.setTimeout(normalize, 430);
        window.setTimeout(normalize, 760);
      }

      [left, right].forEach(function (button) {
        var replacement = button.cloneNode(true);
        button.parentNode.replaceChild(replacement, button);
        if (button === left) left = replacement;
        if (button === right) right = replacement;
      });

      left.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        slide(-1);
      }, true);

      right.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        slide(1);
      }, true);

      row.addEventListener('scroll', function () {
        window.clearTimeout(row._v146NormalizeTimer);
        row._v146NormalizeTimer = window.setTimeout(normalize, 120);
      }, { passive: true });

      window.setTimeout(placeAtMiddle, 0);
      window.setTimeout(placeAtMiddle, 180);
      window.addEventListener('resize', function () {
        window.clearTimeout(row._v146ResizeTimer);
        row._v146ResizeTimer = window.setTimeout(placeAtMiddle, 180);
      });
    });
  });
})();

/* v147: replace experimental co-teaching carousel with simple non-forcing circular arrow movement */
(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    document.querySelectorAll('.teaching-slider-frame').forEach(function (frame) {
      var oldRow = frame.querySelector('.co-teaching-course-row');
      var oldLeft = frame.querySelector('.teaching-slider-cue-left');
      var oldRight = frame.querySelector('.teaching-slider-cue-right');
      if (!oldRow || !oldLeft || !oldRight) return;

      var cards = Array.from(oldRow.children).filter(function (el) {
        return el.classList && el.classList.contains('teaching-course-card') && el.dataset.carouselClone !== 'true';
      });
      if (cards.length < 2) return;

      /* Replace the row itself to remove old scroll-normalizing listeners, but keep the actual card nodes. */
      var row = oldRow.cloneNode(false);
      row.removeAttribute('data-circular-ready');
      row.dataset.circularReady = 'v147';
      cards.forEach(function (card) {
        card.removeAttribute('data-carousel-clone');
        card.removeAttribute('aria-hidden');
        row.appendChild(card);
      });
      oldRow.parentNode.replaceChild(row, oldRow);

      /* Replace buttons to remove old arrow listeners. */
      var left = oldLeft.cloneNode(true);
      var right = oldRight.cloneNode(true);
      oldLeft.parentNode.replaceChild(left, oldLeft);
      oldRight.parentNode.replaceChild(right, oldRight);

      var animating = false;

      function getGap() {
        var style = window.getComputedStyle(row);
        return parseFloat(style.columnGap || style.gap || '25') || 25;
      }

      function getStep() {
        var card = row.querySelector('.teaching-course-card');
        if (!card) return Math.round(row.clientWidth * 0.82);
        return Math.round(card.getBoundingClientRect().width + getGap());
      }

      function finish(direction, step) {
        if (direction > 0) {
          var first = row.querySelector('.teaching-course-card');
          if (first) row.appendChild(first);
          row.scrollLeft = Math.max(0, row.scrollLeft - step);
        }
        animating = false;
      }

      function slide(direction) {
        if (animating) return;
        animating = true;
        var step = getStep();

        if (direction < 0) {
          var cardsNow = row.querySelectorAll('.teaching-course-card');
          var last = cardsNow[cardsNow.length - 1];
          if (last) {
            row.insertBefore(last, row.firstElementChild);
            row.scrollLeft += step;
          }
          row.scrollBy({ left: -step, behavior: 'smooth' });
          window.setTimeout(function () { animating = false; }, 460);
          return;
        }

        row.scrollBy({ left: step, behavior: 'smooth' });
        window.setTimeout(function () { finish(direction, step); }, 460);
      }

      left.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        slide(-1);
      }, true);

      right.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        slide(1);
      }, true);

      [left, right].forEach(function (button) {
        button.addEventListener('keydown', function (event) {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          event.stopPropagation();
          slide(button === right ? 1 : -1);
        }, true);
      });
    });
  });
})();

/* v148: remove forced circular behavior from Co-Teaching slider */
(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    document.querySelectorAll('.teaching-slider-frame').forEach(function (frame) {
      var oldRow = frame.querySelector('.co-teaching-course-row');
      var oldLeft = frame.querySelector('.teaching-slider-cue-left');
      var oldRight = frame.querySelector('.teaching-slider-cue-right');
      if (!oldRow || !oldLeft || !oldRight) return;

      /* Keep only real cards. Remove every clone and every older scroll listener by replacing the row. */
      var realCards = Array.from(oldRow.children).filter(function (el) {
        return el.classList && el.classList.contains('teaching-course-card') && el.dataset.carouselClone !== 'true';
      });
      if (!realCards.length) return;

      var row = oldRow.cloneNode(false);
      row.removeAttribute('data-circular-ready');
      row.dataset.sliderMode = 'simple-scroll-v148';
      realCards.forEach(function (card) {
        card.removeAttribute('data-carousel-clone');
        card.removeAttribute('aria-hidden');
        card.tabIndex = 0;
        row.appendChild(card);
      });
      oldRow.parentNode.replaceChild(row, oldRow);

      /* Replace arrows so previous circular listeners cannot fire. */
      var left = oldLeft.cloneNode(true);
      var right = oldRight.cloneNode(true);
      oldLeft.parentNode.replaceChild(left, oldLeft);
      oldRight.parentNode.replaceChild(right, oldRight);
      frame.classList.remove('is-circular', 'is-v146-carousel');
      frame.classList.add('is-simple-scroll');

      function getStep() {
        var card = row.querySelector('.teaching-course-card');
        if (!card) return Math.round(row.clientWidth * 0.75);
        var style = window.getComputedStyle(row);
        var gap = parseFloat(style.columnGap || style.gap || '22') || 22;
        return Math.round(card.getBoundingClientRect().width + gap);
      }

      function scroll(direction) {
        row.scrollBy({ left: direction * getStep(), behavior: 'smooth' });
      }

      left.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        scroll(-1);
      }, true);

      right.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        scroll(1);
      }, true);

      [left, right].forEach(function (button) {
        button.addEventListener('keydown', function (event) {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          event.stopPropagation();
          scroll(button === right ? 1 : -1);
        }, true);
      });
    });
  });
})();
