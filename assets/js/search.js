(function () {
  const input = document.getElementById('blogSearch');
  const cards = Array.from(document.querySelectorAll('.searchable'));
  const buttons = Array.from(document.querySelectorAll('[data-filter]'));

  function applyFilter(query) {
    const q = (query || '').toLowerCase().trim();
    cards.forEach(card => {
      const text = card.getAttribute('data-search') || '';
      card.style.display = !q || text.includes(q) ? '' : 'none';
    });
  }

  if (input) {
    input.addEventListener('input', function () {
      applyFilter(input.value);
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const q = button.getAttribute('data-filter');
      if (input) input.value = q;
      applyFilter(q);
      document.getElementById('all-posts')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
