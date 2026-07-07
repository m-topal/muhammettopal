(function () {
  function sceneMarkup() {
    return `
      <div class="aws-top-map">
        <svg class="aws-svg" viewBox="0 0 1600 470" preserveAspectRatio="none" aria-hidden="true">
          <g>
            <path class="aws-path" d="M48 186l74-40 109 15 95 44 85 77 49-3 61 35 12 52-29 54-62 19-24 70"></path>
            <path class="aws-path" d="M533 136l132-34 112 10 74 39 102-8 100 16 130-6 129 42 102 95 22 74-43 51-75 10-47 57-98 12-52-40-89-6-89-57-103 9-82 28-108-4-73-64-46-11-42-49 24-44-17-42-65-16-58 18-61-13-14-56-59-44 24-34 61-13z"></path>
            <path class="aws-path" d="M1178 308l78 12 112 55 72 77-15 40-73 8-56-21-26-42-62-20-46-61 16-48z"></path>
            <path class="aws-path" d="M1389 350l74 8 75 44 39 61-8 31-32 18-66-10-53-41-22-53 9-33z"></path>

            <line class="aws-grid" x1="175" y1="24" x2="175" y2="408"></line>
            <line class="aws-grid" x1="390" y1="24" x2="390" y2="408"></line>
            <line class="aws-grid" x1="605" y1="24" x2="605" y2="408"></line>
            <line class="aws-grid" x1="820" y1="24" x2="820" y2="408"></line>
            <line class="aws-grid" x1="1035" y1="24" x2="1035" y2="408"></line>
            <line class="aws-grid" x1="1250" y1="24" x2="1250" y2="408"></line>
            <line class="aws-grid" x1="1465" y1="24" x2="1465" y2="408"></line>
            <line class="aws-grid" x1="24" y1="98" x2="1576" y2="98"></line>
            <line class="aws-grid" x1="24" y1="170" x2="1576" y2="170"></line>
            <line class="aws-grid" x1="24" y1="242" x2="1576" y2="242"></line>
            <line class="aws-grid" x1="24" y1="314" x2="1576" y2="314"></line>

            <path class="aws-arc" d="M250 250C450 210 600 205 795 233"></path>
            <path class="aws-arc" d="M795 233C915 204 1030 210 1170 248"></path>
            <path class="aws-arc secondary" d="M1012 239C1068 210 1148 164 1235 143"></path>
            <path class="aws-arc secondary" d="M776 224C761 180 742 141 717 114"></path>
            <path class="aws-arc secondary" d="M240 252C191 236 132 213 96 188"></path>
            <path class="aws-arc secondary" d="M1170 248C1270 270 1364 310 1438 355"></path>

            <circle class="aws-node" cx="250" cy="250" r="4.3"></circle>
            <circle class="aws-node" cx="795" cy="233" r="4.3"></circle>
            <circle class="aws-node" cx="1170" cy="248" r="4.3"></circle>
            <circle class="aws-node" cx="1012" cy="239" r="3.4"></circle>
            <circle class="aws-node" cx="1235" cy="143" r="3.4"></circle>
            <circle class="aws-node" cx="717" cy="114" r="3.4"></circle>
            <circle class="aws-node" cx="96" cy="188" r="3.4"></circle>
            <circle class="aws-node" cx="1438" cy="355" r="3.4"></circle>
          </g>
        </svg>
      </div>

      <div class="aws-globe-wrap">
        <svg class="aws-svg" viewBox="0 0 720 720" aria-hidden="true">
          <defs>
            <clipPath id="awsGlobeClip"><circle cx="360" cy="360" r="276"></circle></clipPath>
          </defs>
          <circle class="aws-globe-outline" cx="360" cy="360" r="276"></circle>
          <g class="aws-globe-surface" clip-path="url(#awsGlobeClip)">
            <g class="aws-globe-spin">
              <ellipse class="aws-globe-grid" cx="360" cy="360" rx="220" ry="276"></ellipse>
              <ellipse class="aws-globe-grid" cx="360" cy="360" rx="140" ry="276"></ellipse>
              <ellipse class="aws-globe-grid" cx="360" cy="360" rx="64" ry="276"></ellipse>
              <line class="aws-globe-grid" x1="84" y1="360" x2="636" y2="360"></line>
              <path class="aws-globe-grid" d="M112 270H608"></path>
              <path class="aws-globe-grid" d="M112 450H608"></path>
              <path class="aws-globe-grid" d="M162 196H558"></path>
              <path class="aws-globe-grid" d="M162 524H558"></path>

              <!-- Eurasia/Africa focused to start with Turkey near the middle -->
              <path class="aws-globe-continent" d="M224 220l52-34 70-10 60 18 28-12 67 11 40 22 50 0 48 20 32 30 13 38-10 28-36 22-42 2-28 20 10 24-18 12-34-10-22 8-20-7-18-25-35-20-54 2-32-10-24 15-56-4-34-26-22-4-21-28 7-23-4-22-26-6-36 15-35-7-5-25-24-18 10-18 24-8z"></path>
              <path class="aws-globe-continent" d="M364 306l44 5 34 25 8 34-16 48-28 43-36 5-31-20-16-35 4-37 19-38 18-17z"></path>
              <path class="aws-globe-continent" d="M248 470l58 24 20 38-12 36-38 27-40 0-33-16-18-30 7-30 22-27 34-22z"></path>
              <path class="aws-globe-continent" d="M512 424l26 8 24 21 8 27-6 19-25 10-24-6-18-16-8-22 4-20 19-21z"></path>
              <path class="aws-globe-continent" d="M574 254l36 10 29 20 15 24-8 14-25 4-22-10-18-18-9-24 2-20z"></path>
              <path class="aws-globe-continent" d="M604 488l38 7 18 18-4 12-20 8-28-6-16-14 2-13z"></path>

              <ellipse class="aws-globe-orbit" cx="360" cy="360" rx="318" ry="92" transform="rotate(-18 360 360)"></ellipse>
              <ellipse class="aws-globe-orbit" cx="360" cy="360" rx="310" ry="76" transform="rotate(24 360 360)"></ellipse>

              <!-- primary nodes: Tucson, Paris, Istanbul, Caucasus, Moscow, Cairo -->
              <circle class="aws-globe-node" cx="202" cy="396" r="4.4"></circle>
              <circle class="aws-globe-node" cx="356" cy="280" r="4.4"></circle>
              <circle class="aws-globe-node" cx="392" cy="294" r="4.8"></circle>
              <circle class="aws-globe-node" cx="428" cy="288" r="4.2"></circle>
              <circle class="aws-globe-node" cx="442" cy="258" r="4.0"></circle>
              <circle class="aws-globe-node" cx="386" cy="335" r="4.0"></circle>
              <!-- global secondary nodes -->
              <circle class="aws-globe-node" cx="332" cy="270" r="3.6"></circle>
              <circle class="aws-globe-node" cx="180" cy="330" r="3.6"></circle>
              <circle class="aws-globe-node" cx="522" cy="360" r="3.6"></circle>
              <circle class="aws-globe-node" cx="580" cy="326" r="3.6"></circle>
              <circle class="aws-globe-node" cx="408" cy="420" r="3.6"></circle>
              <circle class="aws-globe-node" cx="598" cy="474" r="3.6"></circle>
              <circle class="aws-globe-node" cx="362" cy="508" r="3.6"></circle>
              <circle class="aws-globe-node" cx="458" cy="500" r="3.6"></circle>

              <path class="aws-globe-arc" d="M202 396C256 312 306 288 356 280"></path>
              <path class="aws-globe-arc" d="M356 280C372 280 383 287 392 294"></path>
              <path class="aws-globe-arc" d="M392 294C405 289 417 287 428 288"></path>
              <path class="aws-globe-arc secondary" d="M428 288C436 280 441 269 442 258"></path>
              <path class="aws-globe-arc secondary" d="M392 294C390 308 389 320 386 335"></path>
              <path class="aws-globe-arc secondary" d="M356 280C345 274 339 271 332 270"></path>
              <path class="aws-globe-arc secondary" d="M332 270C276 283 224 300 180 330"></path>
              <path class="aws-globe-arc secondary" d="M428 288C460 303 492 328 522 360"></path>
              <path class="aws-globe-arc secondary" d="M522 360C544 350 564 338 580 326"></path>
              <path class="aws-globe-arc secondary" d="M386 335C394 372 401 396 408 420"></path>
              <path class="aws-globe-arc secondary" d="M408 420C473 413 538 433 598 474"></path>
              <path class="aws-globe-arc secondary" d="M386 335C377 405 368 462 362 508"></path>
              <path class="aws-globe-arc secondary" d="M408 420C426 446 442 471 458 500"></path>
            </g>
          </g>
        </svg>
      </div>

      <div class="aws-campus-row">
        <div class="aws-campus aws-campus-left"><img src="/assets/img/background/sorbonne-line.png" alt=""></div>
        <div class="aws-campus aws-campus-center"><img src="/assets/img/background/anderson-hall-line.png" alt=""></div>
        <div class="aws-campus aws-campus-right"><img src="/assets/img/background/old-main-line.png" alt=""></div>
      </div>
    `;
  }

  function initScene() {
    var host = document.getElementById('academicWorldScene');
    if (!host || host.dataset.ready === 'true') return;
    host.innerHTML = sceneMarkup();
    host.dataset.ready = 'true';

    var rotation = 0;
    var velocity = 0;
    var targetVelocity = 0;
    var lastY = window.scrollY || 0;

    function onScroll() {
      var y = window.scrollY || 0;
      var dy = y - lastY;
      lastY = y;
      targetVelocity += dy * 0.015;
      if (targetVelocity > 2.8) targetVelocity = 2.8;
      if (targetVelocity < -2.8) targetVelocity = -2.8;
    }

    function tick() {
      velocity += (targetVelocity - velocity) * 0.16;
      targetVelocity *= 0.86;
      rotation += velocity;
      host.style.setProperty('--globe-rot', rotation.toFixed(3) + 'deg');
      window.requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScene);
  } else {
    initScene();
  }
})();
