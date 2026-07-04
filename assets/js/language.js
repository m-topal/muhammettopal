(function(){
  function updateTranslationLinks(){
    const currentUrl = window.location.href;
    document.querySelectorAll(".translate-link").forEach(function(link){
      const lang = link.getAttribute("data-lang");
      if(!lang) return;
      link.href = "https://translate.google.com/translate?sl=auto&tl=" + encodeURIComponent(lang) + "&u=" + encodeURIComponent(currentUrl);
    });
  }

  function setupLanguageMenuClose(){
    const menus = document.querySelectorAll(".language-menu");
    if(!menus.length) return;

    document.addEventListener("click", function(event){
      menus.forEach(function(menu){
        if(menu.open && !menu.contains(event.target)){
          menu.open = false;
        }
      });
    });

    document.addEventListener("keydown", function(event){
      if(event.key === "Escape"){
        menus.forEach(function(menu){
          menu.open = false;
        });
      }
    });

    menus.forEach(function(menu){
      const links = menu.querySelectorAll("a");
      links.forEach(function(link){
        link.addEventListener("click", function(){
          menu.open = false;
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function(){
    updateTranslationLinks();
    setupLanguageMenuClose();
  });
})();
