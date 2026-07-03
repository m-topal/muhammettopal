function copyCurrentLink(){
  navigator.clipboard.writeText(window.location.href);
  const b=document.getElementById("copyLinkButton");
  if(b){
    const o=b.textContent;
    b.textContent="Copied";
    setTimeout(()=>b.textContent=o,1400);
  }
}

function updateReadingProgress(){
  const bar = document.getElementById("readingProgress");
  if(!bar) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? Math.min(100, Math.max(0, (scrollTop / height) * 100)) : 0;
  bar.style.width = progress + "%";
}

document.addEventListener("DOMContentLoaded",function(){
  document.querySelectorAll(".accordion-trigger").forEach(function(btn){
    btn.addEventListener("click",function(){
      btn.closest(".accordion-item").classList.toggle("open");
    });
  });

  const slides=document.querySelectorAll(".slide");
  let index=0;

  function showSlide(i){
    if(!slides.length)return;
    slides[index].classList.remove("active");
    index=(i+slides.length)%slides.length;
    slides[index].classList.add("active");
    const c=document.getElementById("slideCounter");
    if(c)c.textContent=(index+1)+" / "+slides.length;
  }

  const p=document.getElementById("slidePrev");
  const n=document.getElementById("slideNext");
  if(p)p.addEventListener("click",()=>showSlide(index-1));
  if(n)n.addEventListener("click",()=>showSlide(index+1));

  updateReadingProgress();
});

window.addEventListener("scroll", updateReadingProgress, {passive:true});
window.addEventListener("resize", updateReadingProgress);
