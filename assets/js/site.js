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
