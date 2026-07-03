(function(){
  function normalize(value){
    return (value || "").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function escapeHtml(value){
    return (value || "").toString().replace(/[&<>"']/g, function(char){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char];
    });
  }

  function scoreText(item, query){
    const q = normalize(query);
    if(!q) return 0;

    const title = normalize(item.title);
    const description = normalize(item.description);
    const category = normalize(item.category);
    const content = normalize(item.content);

    let score = 0;
    if(title.includes(q)) score += 8;
    if(description.includes(q)) score += 5;
    if(category.includes(q)) score += 3;
    if(content.includes(q)) score += 1;

    q.split(/\s+/).filter(Boolean).forEach(function(term){
      if(title.includes(term)) score += 4;
      if(description.includes(term)) score += 2;
      if(category.includes(term)) score += 1;
      if(content.includes(term)) score += 0.5;
    });

    return score;
  }

  function excerpt(text, query){
    const clean = (text || "").replace(/\s+/g, " ").trim();
    if(!clean) return "";
    const lower = normalize(clean);
    const q = normalize(query);
    let pos = lower.indexOf(q);
    if(pos < 0) pos = 0;
    const start = Math.max(0, pos - 90);
    const end = Math.min(clean.length, pos + 190);
    return (start > 0 ? "…" : "") + clean.slice(start, end) + (end < clean.length ? "…" : "");
  }

  function dateAllowed(itemDate, from, to){
    if(!itemDate) return !from && !to;
    if(from && itemDate < from) return false;
    if(to && itemDate > to) return false;
    return true;
  }

  function readSearchData(){
    return Array.from(document.querySelectorAll(".search-data-item")).map(function(el){
      return {
        title: el.dataset.title || "",
        url: el.dataset.url || "#",
        type: el.dataset.type || "page",
        category: el.dataset.category || "other",
        date: el.dataset.date || "",
        description: el.dataset.description || "",
        content: el.dataset.content || ""
      };
    });
  }

  function initSiteSearch(){
    const input = document.getElementById("siteSearchInput");
    const results = document.getElementById("siteSearchResults");
    const status = document.getElementById("siteSearchStatus");
    const typeSelect = document.getElementById("siteSearchType");
    const categorySelect = document.getElementById("siteSearchCategory");
    const fromInput = document.getElementById("siteSearchFrom");
    const toInput = document.getElementById("siteSearchTo");
    const sortSelect = document.getElementById("siteSearchSort");

    if(!input || !results || !status) return;

    const index = readSearchData();

    function render(){
      const query = input.value.trim();
      const activeType = typeSelect ? typeSelect.value : "all";
      const activeCategory = categorySelect ? categorySelect.value : "all";
      const from = fromInput ? fromInput.value : "";
      const to = toInput ? toInput.value : "";
      const sort = sortSelect ? sortSelect.value : "relevance";

      results.innerHTML = "";

      if(query.length < 2 && activeCategory === "all" && activeType === "all" && !from && !to){
        status.textContent = "Type at least two characters, or use the filters.";
        return;
      }

      let matches = index.map(function(item){
          return Object.assign({}, item, {score: scoreText(item, query)});
        })
        .filter(function(item){
          const queryOk = query.length < 2 || item.score > 0;
          const typeOk = activeType === "all" || item.type === activeType;
          const categoryOk = activeCategory === "all" || normalize(item.category) === normalize(activeCategory);
          const dateOk = dateAllowed(item.date, from, to);
          return queryOk && typeOk && categoryOk && dateOk;
        });

      if(sort === "newest"){
        matches.sort(function(a,b){ return (b.date || "").localeCompare(a.date || ""); });
      } else if(sort === "oldest"){
        matches.sort(function(a,b){ return (a.date || "9999").localeCompare(b.date || "9999"); });
      } else if(sort === "title"){
        matches.sort(function(a,b){ return (a.title || "").localeCompare(b.title || ""); });
      } else {
        matches.sort(function(a,b){ return b.score - a.score; });
      }

      matches = matches.slice(0, 40);

      if(!matches.length){
        status.textContent = "No matching results found.";
        return;
      }

      status.textContent = matches.length + " result" + (matches.length === 1 ? "" : "s") + " found.";

      matches.forEach(function(item){
        const article = document.createElement("article");
        article.className = "search-result-item";
        article.innerHTML =
          '<p class="meta">' + escapeHtml(item.type === "post" ? "Blog post" : "Page") +
          (item.category ? " · " + escapeHtml(item.category) : "") +
          (item.date ? " · " + escapeHtml(item.date) : "") + '</p>' +
          '<h2><a href="' + item.url + '">' + escapeHtml(item.title) + '</a></h2>' +
          '<p>' + escapeHtml(item.description || excerpt(item.content, query)) + '</p>';
        results.appendChild(article);
      });
    }

    [input, typeSelect, categorySelect, fromInput, toInput, sortSelect].forEach(function(el){
      if(el) el.addEventListener("input", render);
      if(el) el.addEventListener("change", render);
    });

    render();
  }

  function initBlogSearch(){
    const input = document.getElementById("blogSearch");
    const list = document.getElementById("blogList");
    const items = Array.from(document.querySelectorAll(".blog-list-item"));
    const filters = document.querySelectorAll(".blog-filter");
    const noResults = document.getElementById("blogNoResults");
    const sort = document.getElementById("blogSort");

    if(!input || !items.length || !list) return;

    let activeCategory = "all";

    function sortItems(){
      const mode = sort ? sort.value : "newest";
      const sorted = items.slice().sort(function(a,b){
        if(mode === "oldest") return (a.dataset.date || "").localeCompare(b.dataset.date || "");
        if(mode === "title") return (a.dataset.title || "").localeCompare(b.dataset.title || "");
        return (b.dataset.date || "").localeCompare(a.dataset.date || "");
      });
      sorted.forEach(function(item){ list.appendChild(item); });
    }

    function apply(){
      const q = normalize(input.value.trim());
      let visible = 0;

      sortItems();

      items.forEach(function(item){
        const category = normalize(item.dataset.category || "");
        const searchable = normalize(item.dataset.search || item.textContent);
        const categoryMatch = activeCategory === "all" || category === normalize(activeCategory);
        const queryMatch = !q || searchable.includes(q);
        const show = categoryMatch && queryMatch;
        item.hidden = !show;
        if(show) visible += 1;
      });

      if(noResults) noResults.hidden = visible !== 0;
    }

    input.addEventListener("input", apply);
    if(sort) sort.addEventListener("change", apply);

    filters.forEach(function(button){
      button.addEventListener("click", function(){
        filters.forEach(function(b){ b.classList.remove("active"); });
        button.classList.add("active");
        activeCategory = button.dataset.filter || "all";
        apply();
      });
    });

    apply();
  }

  document.addEventListener("DOMContentLoaded", function(){
    initSiteSearch();
    initBlogSearch();
  });
})();
