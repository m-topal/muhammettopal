document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.share-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var options = btn.nextElementSibling;
      var isHidden = options.hasAttribute('hidden');
      if (isHidden) {
        options.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        options.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.querySelectorAll('.share-copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(btn.dataset.url).then(function () {
        var original = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = original; }, 1500);
      });
    });
  });

  var searchInput = document.getElementById('blog-search');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var query = searchInput.value.trim().toLowerCase();
      var cards = document.querySelectorAll('.searchable');
      var anyVisible = false;
      cards.forEach(function (card) {
        var haystack = (card.dataset.search || '') + ' ' + card.textContent.toLowerCase();
        var match = haystack.indexOf(query) !== -1;
        card.classList.toggle('is-hidden', query.length > 0 && !match);
        if (match || query.length === 0) anyVisible = true;
      });
      document.querySelectorAll('[data-shelf]').forEach(function (shelf) {
        var visibleCards = shelf.querySelectorAll('.searchable:not(.is-hidden)');
        shelf.style.display = (query.length > 0 && visibleCards.length === 0) ? 'none' : '';
      });
      var noResults = document.getElementById('no-results');
      if (noResults) noResults.classList.toggle('is-visible', query.length > 0 && !anyVisible);
    });
  }
});
