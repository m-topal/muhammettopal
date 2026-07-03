/*
TOPAL LIVE PATCH
Install this file site-wide, after topal-live-patch.css.
It forces the visual changes even if the original component class names differ.

Recommended script tag:
<script src="/assets/topal-live-patch.js" defer></script>
*/

(function () {
  const ASSET_BASE = window.TOPAL_ASSET_BASE || "/assets/";
  const LOGO = ASSET_BASE + "topal-wordmark-transparent.png";

  function textOf(el) {
    return (el && el.textContent ? el.textContent : "").replace(/\s+/g, " ").trim();
  }

  function addHeadIcons() {
    const icons = [
      ['link[rel="icon"][sizes="any"]', { rel: "icon", href: ASSET_BASE + "favicon.ico", sizes: "any" }],
      ['link[rel="icon"][type="image/png"][sizes="32x32"]', { rel: "icon", type: "image/png", sizes: "32x32", href: ASSET_BASE + "favicon-32x32.png" }],
      ['link[rel="icon"][type="image/png"][sizes="16x16"]', { rel: "icon", type: "image/png", sizes: "16x16", href: ASSET_BASE + "favicon-16x16.png" }],
      ['link[rel="apple-touch-icon"]', { rel: "apple-touch-icon", sizes: "180x180", href: ASSET_BASE + "apple-touch-icon.png" }],
      ['link[rel="manifest"]', { rel: "manifest", href: ASSET_BASE + "site.webmanifest" }]
    ];

    icons.forEach(([selector, attrs]) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("link");
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    });
  }

  function findMainNav() {
    const links = Array.from(document.querySelectorAll("a"));
    const homeLinks = links.filter(a => /^Home$/i.test(textOf(a)));
    const navWords = ["About Me", "Research", "Teaching", "Publications", "Presentations", "CV", "Contact", "My Blog"];

    for (const home of homeLinks) {
      let el = home.parentElement;
      for (let i = 0; el && i < 7; i++, el = el.parentElement) {
        const t = textOf(el);
        const score = navWords.reduce((n, word) => n + (t.includes(word) ? 1 : 0), 0);
        if (score >= 4) return el;
      }
    }

    return document.querySelector("nav") || null;
  }

  function addStickyWordmark() {
    const nav = findMainNav();
    if (!nav) return;

    nav.classList.add("topal-live-nav");

    if (nav.querySelector(".topal-live-wordmark-link")) return;

    const link = document.createElement("a");
    link.className = "topal-live-wordmark-link";
    link.href = "/";
    link.setAttribute("aria-label", "Muhammet Topal home");

    const img = document.createElement("img");
    img.className = "topal-live-wordmark";
    img.src = LOGO;
    img.alt = "Topal";

    link.appendChild(img);

    const home = Array.from(nav.querySelectorAll("a")).find(a => /^Home$/i.test(textOf(a)));
    if (home && home.parentElement && home.parentElement.tagName.toLowerCase() === "li") {
      home.parentElement.parentElement.insertBefore(link, home.parentElement);
    } else if (home) {
      home.parentElement.insertBefore(link, home);
    } else {
      nav.insertBefore(link, nav.firstChild);
    }
  }

  function isAboutPage() {
    return /\/about\/?$/.test(window.location.pathname) ||
      Array.from(document.querySelectorAll("a")).some(a => /\/about\/?$/.test(a.getAttribute("href") || "") && a.getAttribute("aria-current") === "page");
  }

  function addAboutDivider() {
    if (!isAboutPage()) return;
    if (document.querySelector(".topal-live-about-divider")) return;

    const h1s = Array.from(document.querySelectorAll("h1"));
    const aboutH1 = h1s.find(h => /^About Me$/i.test(textOf(h)));

    if (aboutH1) {
      aboutH1.classList.add("topal-live-hide-about-title");
    }

    const divider = document.createElement("section");
    divider.className = "topal-live-about-divider";
    divider.setAttribute("aria-label", "Topal section divider");
    divider.innerHTML = `
      <span class="topal-live-about-divider-line"></span>
      <img class="topal-live-about-divider-logo" src="${LOGO}" alt="Topal">
      <span class="topal-live-about-divider-line"></span>
    `;

    if (aboutH1 && aboutH1.parentElement) {
      aboutH1.parentElement.insertBefore(divider, aboutH1);
      return;
    }

    const main = document.querySelector("main") || document.body;
    const firstParagraph = main.querySelector("p");
    if (firstParagraph && firstParagraph.parentElement) {
      firstParagraph.parentElement.insertBefore(divider, firstParagraph);
    } else {
      main.insertBefore(divider, main.firstChild);
    }
  }

  function isBlogPage() {
    return /\/blog\/?$/.test(window.location.pathname);
  }

  function findBlogFilter() {
    const inputs = Array.from(document.querySelectorAll("input, select, button"));
    const searchInput = inputs.find(el => {
      const ph = el.getAttribute("placeholder") || "";
      return /Search title|Search/i.test(ph);
    });

    if (!searchInput) return null;

    let el = searchInput.parentElement;
    for (let i = 0; el && i < 8; i++, el = el.parentElement) {
      const t = textOf(el);
      if (/FORMAT/i.test(t) && /TAG/i.test(t) && (/SORT/i.test(t) || /Newest/i.test(t))) return el;
    }

    return searchInput.closest("form") || searchInput.parentElement;
  }

  function widenBlogFilter() {
    if (!isBlogPage()) return;
    const filter = findBlogFilter();
    if (!filter) return;
    filter.classList.add("topal-live-blog-filter");

    const search = filter.querySelector('input[placeholder*="Search"], input[type="search"], input[type="text"]');
    if (search && !/keywords/i.test(search.getAttribute("placeholder") || "")) {
      search.setAttribute("placeholder", "Search title, content, or keywords...");
    }
  }

  const sections = [
    { key: "essays", label: "Essays", empty: "No essays yet.", icon: "✍️" },
    { key: "podcasts", label: "Podcasts", empty: "No podcasts yet.", icon: "🎙" },
    { key: "videos", label: "Videos", empty: "No videos yet.", icon: "🎬" }
  ];

  function currentCategory() {
    const active = Array.from(document.querySelectorAll("button, a")).find(el => {
      const t = textOf(el).toLowerCase();
      const isCat = ["all", "essays", "podcasts", "videos"].includes(t);
      if (!isCat) return false;
      const cls = (el.className || "").toString().toLowerCase();
      const aria = (el.getAttribute("aria-pressed") || el.getAttribute("aria-current") || "").toLowerCase();
      return cls.includes("active") || cls.includes("selected") || aria === "true" || aria === "page";
    });

    if (active) return textOf(active).toLowerCase();

    const params = new URLSearchParams(window.location.search);
    const f = (params.get("format") || params.get("type") || params.get("category") || "").toLowerCase();
    if (["essays", "podcasts", "videos"].includes(f)) return f;

    return window.__topalLastBlogCategory || "all";
  }

  function findExistingSection(label) {
    const headings = Array.from(document.querySelectorAll("h1,h2,h3"));
    const h = headings.find(x => new RegExp("^" + label + "$", "i").test(textOf(x)));
    if (!h) return null;
    let el = h.parentElement;
    for (let i = 0; el && i < 4; i++, el = el.parentElement) {
      if (el.tagName && /section|article|div/i.test(el.tagName)) return el;
    }
    return h;
  }

  function makeEmptySection(s) {
    const section = document.createElement("section");
    section.className = "topal-live-empty-section";
    section.dataset.topalEmpty = s.key;
    section.innerHTML = `
      <div class="topal-live-empty-header">
        <span aria-hidden="true">${s.icon}</span>
        <h2>${s.label}</h2>
      </div>
      <p class="topal-live-empty-msg">${s.empty}</p>
    `;
    return section;
  }

  function removeInjectedBlogSections() {
    document.querySelectorAll("[data-topal-empty]").forEach(el => el.remove());
  }

  function anchorForBlogSections() {
    const filter = findBlogFilter();
    if (filter) return filter;
    const myBlog = Array.from(document.querySelectorAll("h1,h2")).find(h => /My Blog/i.test(textOf(h)));
    return myBlog || null;
  }

  function ensureBlogEmptySections() {
    if (!isBlogPage()) return;

    removeInjectedBlogSections();

    const cat = currentCategory();
    const wanted = cat === "all" ? sections : sections.filter(s => s.key === cat);

    let anchor = anchorForBlogSections();
    if (!anchor) return;

    let insertAfter = anchor;
    wanted.forEach(s => {
      const existing = findExistingSection(s.label);
      const hasContent = existing && textOf(existing).length > s.label.length + 15;

      if (!existing || !hasContent || s.key !== "videos") {
        // Do not duplicate real Videos section if it already exists with content.
        if (s.key === "videos" && existing && hasContent) {
          insertAfter = existing;
          return;
        }

        const emptySec = makeEmptySection(s);

        // For All, Essays and Podcasts should appear before the real Videos section.
        const realVideos = findExistingSection("Videos");
        if (cat === "all" && realVideos && (s.key === "essays" || s.key === "podcasts")) {
          realVideos.parentElement.insertBefore(emptySec, realVideos);
        } else if (insertAfter && insertAfter.parentNode) {
          insertAfter.parentNode.insertBefore(emptySec, insertAfter.nextSibling);
          insertAfter = emptySec;
        }
      }
    });
  }

  function rememberCategoryClicks() {
    document.addEventListener("click", function (e) {
      const btn = e.target.closest("button, a");
      if (!btn) return;
      const t = textOf(btn).toLowerCase();
      if (["all", "essays", "podcasts", "videos"].includes(t)) {
        window.__topalLastBlogCategory = t;
        setTimeout(runBlogPatch, 150);
        setTimeout(runBlogPatch, 600);
      }
    }, true);
  }

  function runBlogPatch() {
    widenBlogFilter();
    ensureBlogEmptySections();
  }

  function runAll() {
    addHeadIcons();
    addStickyWordmark();
    addAboutDivider();
    runBlogPatch();
  }

  let observerStarted = false;
  function startObserver() {
    if (observerStarted) return;
    observerStarted = true;
    const obs = new MutationObserver(function () {
      clearTimeout(window.__topalPatchTimer);
      window.__topalPatchTimer = setTimeout(runAll, 100);
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }

  document.addEventListener("DOMContentLoaded", function () {
    runAll();
    rememberCategoryClicks();
    startObserver();
    setTimeout(runAll, 500);
    setTimeout(runAll, 1500);
  });

  if (document.readyState !== "loading") {
    runAll();
    rememberCategoryClicks();
    startObserver();
    setTimeout(runAll, 500);
    setTimeout(runAll, 1500);
  }
})();
