const posts = [
  {
    type: "videos",
    title: "Mountaineering as a Critique of Modernity and Colonialism",
    date: "July 3, 2026",
    format: "Video",
    tags: ["modernity", "colonialism", "environment"],
    excerpt: "A short video reflection on mountaineering as a practice through which modernity, colonial dimensions, environmental imagination, and the sublime can be critically examined.",
    embedText: "Video embed placeholder"
  }
];

const categories = [
  { key: "essays", label: "Essays", icon: "✍️", empty: "No essays yet." },
  { key: "podcasts", label: "Podcasts", icon: "🎙", empty: "No podcasts yet." },
  { key: "videos", label: "Videos", icon: "🎬", empty: "No videos yet." }
];

function normalize(value) {
  return String(value || "").toLowerCase().trim();
}

function matchesPost(post, state) {
  const q = normalize(state.query);
  const tag = normalize(state.tag);
  const format = normalize(state.format);

  const haystack = normalize([
    post.title,
    post.excerpt,
    post.format,
    ...(post.tags || [])
  ].join(" "));

  if (q && !haystack.includes(q)) return false;
  if (format !== "all" && normalize(post.type) !== format) return false;
  if (tag !== "all" && !(post.tags || []).map(normalize).includes(tag)) return false;

  return true;
}

function sortPosts(items, sort) {
  const copy = [...items];
  if (sort === "oldest") copy.reverse();
  return copy;
}

function createCard(post) {
  const article = document.createElement("article");
  article.className = "blog-card";
  article.innerHTML = `
    <p class="blog-card-meta">${post.date} • ${post.format}</p>
    <h3>${post.title}</h3>
    <p>${post.excerpt}</p>
    ${post.type === "videos" ? `<div class="video-embed-placeholder">${post.embedText || "Video embed"}</div>` : ""}
  `;
  return article;
}

function renderBlog() {
  const root = document.querySelector("[data-blog-root]");
  if (!root) return;

  const query = document.querySelector("#blog-search")?.value || "";
  const format = document.querySelector("#blog-format")?.value || "all";
  const tag = document.querySelector("#blog-tag")?.value || "all";
  const sort = document.querySelector("#blog-sort")?.value || "newest";
  const activeButton = document.querySelector(".filter-buttons button.active");
  const activeCategory = activeButton?.dataset.category || "all";

  const selectedCategory = activeCategory === "all" ? "all" : activeCategory;

  let filtered = posts.filter(post => matchesPost(post, { query, format, tag }));
  if (selectedCategory !== "all") {
    filtered = filtered.filter(post => post.type === selectedCategory);
  }
  filtered = sortPosts(filtered, sort);

  const count = document.querySelector("[data-result-count]");
  if (count) {
    count.textContent = `${filtered.length} ${filtered.length === 1 ? "result" : "results"}`;
  }

  const toRender = selectedCategory === "all"
    ? categories
    : categories.filter(c => c.key === selectedCategory);

  root.innerHTML = "";

  toRender.forEach(category => {
    const section = document.createElement("section");
    section.className = "blog-section";
    section.dataset.section = category.key;

    const header = document.createElement("div");
    header.className = "blog-section-header";
    header.innerHTML = `
      <span class="blog-section-icon" aria-hidden="true">${category.icon}</span>
      <h2>${category.label}</h2>
    `;
    section.appendChild(header);

    const items = filtered.filter(post => post.type === category.key);

    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = category.empty;
      section.appendChild(empty);
    } else {
      const grid = document.createElement("div");
      grid.className = "card-grid";
      items.forEach(post => grid.appendChild(createCard(post)));
      section.appendChild(grid);
    }

    root.appendChild(section);
  });
}

function setupBlog() {
  if (!document.querySelector("[data-blog-root]")) return;

  document.querySelectorAll("#blog-search, #blog-format, #blog-tag, #blog-from, #blog-to, #blog-sort")
    .forEach(el => el.addEventListener("input", renderBlog));

  document.querySelectorAll(".filter-buttons button[data-category]")
    .forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-buttons button[data-category]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.dataset.category;
        const format = document.querySelector("#blog-format");
        if (format) format.value = category === "all" ? "all" : category;
        renderBlog();
      });
    });

  const reset = document.querySelector("[data-reset-filters]");
  if (reset) {
    reset.addEventListener("click", () => {
      document.querySelector("#blog-search").value = "";
      document.querySelector("#blog-format").value = "all";
      document.querySelector("#blog-tag").value = "all";
      document.querySelector("#blog-from").value = "";
      document.querySelector("#blog-to").value = "";
      document.querySelector("#blog-sort").value = "newest";
      document.querySelectorAll(".filter-buttons button[data-category]").forEach(b => b.classList.remove("active"));
      document.querySelector('.filter-buttons button[data-category="all"]').classList.add("active");
      renderBlog();
    });
  }

  renderBlog();
}

function setActiveNav() {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  setupBlog();
});
