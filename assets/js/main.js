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
});
