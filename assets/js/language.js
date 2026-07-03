(function(){
  function updateTranslationLinks(){
    const currentUrl = window.location.href;
    document.querySelectorAll(".translate-link").forEach(function(link){
      const lang = link.getAttribute("data-lang");
      if(!lang) return;
      link.href = "https://translate.google.com/translate?sl=auto&tl=" + encodeURIComponent(lang) + "&u=" + encodeURIComponent(currentUrl);
    });
  }

  document.addEventListener("DOMContentLoaded", updateTranslationLinks);
})();
