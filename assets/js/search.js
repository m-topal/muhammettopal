(function () {
  const input = document.getElementById('post-search');
  if (!input) return;
  input.addEventListener('input', function () {
    const q = input.value.trim().toLowerCase();
    document.querySelectorAll('[data-search]').forEach(function (card) {
      const haystack = card.getAttribute('data-search') || card.textContent.toLowerCase();
      card.style.display = !q || haystack.includes(q) ? '' : 'none';
    });
  });
})();
