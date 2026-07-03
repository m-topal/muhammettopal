/*
Blog empty section logic.
Adapt selectors to your site if needed.

Expected behavior:
- All selected: show Essays, Podcasts, Videos sections.
- Empty sections still show heading plus empty message.
- Essays selected: show Essays heading and “No essays yet.”
- Podcasts selected: show Podcasts heading and “No podcasts yet.”
- Videos selected: show Videos and its card(s).
*/

const BLOG_CATEGORIES = [
  {
    key: "essays",
    label: "Essays",
    emptyText: "No essays yet.",
    icon: "✍️"
  },
  {
    key: "podcasts",
    label: "Podcasts",
    emptyText: "No podcasts yet.",
    icon: "🎙"
  },
  {
    key: "videos",
    label: "Videos",
    emptyText: "No videos yet.",
    icon: "🎬"
  }
];

function renderBlogSections({ selectedCategory = "all", posts = [] }) {
  const container = document.querySelector("[data-blog-sections]");
  if (!container) return;

  const categoriesToRender =
    selectedCategory === "all"
      ? BLOG_CATEGORIES
      : BLOG_CATEGORIES.filter((category) => category.key === selectedCategory);

  container.innerHTML = "";

  categoriesToRender.forEach((category) => {
    const section = document.createElement("section");
    section.className = "blog-category-section";
    section.dataset.category = category.key;

    const header = document.createElement("div");
    header.className = "blog-category-header";
    header.innerHTML = `
      <span class="blog-category-icon" aria-hidden="true">${category.icon}</span>
      <h2>${category.label}</h2>
    `;

    const categoryPosts = posts.filter((post) => post.type === category.key);

    section.appendChild(header);

    if (categoryPosts.length === 0) {
      const empty = document.createElement("p");
      empty.className = "blog-empty-state";
      empty.textContent = category.emptyText;
      section.appendChild(empty);
    } else {
      const list = document.createElement("div");
      list.className = "blog-card-grid";

      categoryPosts.forEach((post) => {
        const card = document.createElement("article");
        card.className = "blog-card";
        card.innerHTML = `
          <p class="blog-card-meta">${post.date || ""} · ${category.label.slice(0, -1)}</p>
          <h3>${post.title}</h3>
          ${post.excerpt ? `<p>${post.excerpt}</p>` : ""}
        `;
        list.appendChild(card);
      });

      section.appendChild(list);
    }

    container.appendChild(section);
  });
}

/*
Example use:

renderBlogSections({
  selectedCategory: "all",
  posts: [
    {
      type: "videos",
      date: "July 3, 2026",
      title: "Mountaineering as a Critique of Modernity and Colonialism",
      excerpt: "A short video reflection on mountaineering..."
    }
  ]
});
*/
