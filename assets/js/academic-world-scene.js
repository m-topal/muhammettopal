(function () {
  function markup() {
    return `
      <div class="aws-top-map">
        <svg class="aws-svg" viewBox="0 0 1600 430" preserveAspectRatio="none" aria-hidden="true">
          <g>
            <path class="aws-path" d="M34 202l94-52 98 14 92 46 84 74 44-2 56 34 20 46-13 43-52 18-42 55-82 4-64 40-73-15-105-20-39-70 15-40-60-8-42-54 12-40 33-28-6-35 30-40z"></path>
            <path class="aws-path" d="M610 138l82-26 94 12 42 24 42-10 76 10 44 24 72-4 68 22 58 40 74 6 92 40 86 64 44 66-14 28-58 18-42 28 16 42-28 14-56-15-52 16-40-10-42-42-58-34-84 2-51-22-48 24-82-6-56-38-34-4-34-38 12-32-8-32-34-4-54 22-54-10-8-40-44-35 14-32 38-14z"></path>
            <path class="aws-path" d="M1398 338l88 10 58 36 30 40-6 31-32 18-60-8-66-30-24-36 12-29z"></path>

            <line class="aws-grid" x1="160" y1="26" x2="160" y2="402"></line>
            <line class="aws-grid" x1="390" y1="26" x2="390" y2="402"></line>
            <line class="aws-grid" x1="620" y1="26" x2="620" y2="402"></line>
            <line class="aws-grid" x1="850" y1="26" x2="850" y2="402"></line>
            <line class="aws-grid" x1="1080" y1="26" x2="1080" y2="402"></line>
            <line class="aws-grid" x1="1310" y1="26" x2="1310" y2="402"></line>
            <line class="aws-grid" x1="24" y1="100" x2="1576" y2="100"></line>
            <line class="aws-grid" x1="24" y1="176" x2="1576" y2="176"></line>
            <line class="aws-grid" x1="24" y1="252" x2="1576" y2="252"></line>
            <line class="aws-grid" x1="24" y1="328" x2="1576" y2="328"></line>

            <path class="aws-arc" d="M220 244C420 208 610 206 806 232"></path>
            <path class="aws-arc" d="M806 232C932 208 1042 214 1168 244"></path>
            <path class="aws-arc secondary" d="M780 226C762 190 744 155 720 126"></path>
            <path class="aws-arc secondary" d="M1162 244C1268 264 1360 302 1432 346"></path>
            <path class="aws-arc secondary" d="M806 232C830 248 856 266 876 292"></path>
          </g>
        </svg>
      </div>

      <div class="aws-globe-wrap">
        <svg class="aws-svg" viewBox="0 0 720 720" aria-hidden="true">
          <defs>
            <clipPath id="awsGlobeClip"><circle cx="360" cy="360" r="276"></circle></clipPath>
          </defs>
          <circle class="aws-globe-outline" cx="360" cy="360" r="276"></circle>
          <g clip-path="url(#awsGlobeClip)">
            <g class="aws-globe-spin">
              <ellipse class="aws-globe-grid" cx="360" cy="360" rx="220" ry="276"></ellipse>
              <ellipse class="aws-globe-grid" cx="360" cy="360" rx="140" ry="276"></ellipse>
              <ellipse class="aws-globe-grid" cx="360" cy="360" rx="64" ry="276"></ellipse>
              <line class="aws-globe-grid" x1="84" y1="360" x2="636" y2="360"></line>
              <path class="aws-globe-grid" d="M112 270H608"></path>
              <path class="aws-globe-grid" d="M112 450H608"></path>
              <path class="aws-globe-grid" d="M162 196H558"></path>
              <path class="aws-globe-grid" d="M162 524H558"></path>

              <path class="aws-globe-continent" d="M224 220l52-34 70-10 60 18 28-12 67 11 40 22 50 0 48 20 32 30 13 38-10 28-36 22-42 2-28 20 10 24-18 12-34-10-22 8-20-7-18-25-35-20-54 2-32-10-24 15-56-4-34-26-22-4-21-28 7-23-4-22-26-6-36 15-35-7-5-25-24-18 10-18 24-8z"></path>
              <path class="aws-globe-continent" d="M364 306l44 5 34 25 8 34-16 48-28 43-36 5-31-20-16-35 4-37 19-38 18-17z"></path>
              <path class="aws-globe-continent" d="M248 470l58 24 20 38-12 36-38 27-40 0-33-16-18-30 7-30 22-27 34-22z"></path>
              <path class="aws-globe-continent" d="M512 424l26 8 24 21 8 27-6 19-25 10-24-6-18-16-8-22 4-20 19-21z"></path>
              <path class="aws-globe-continent" d="M574 254l36 10 29 20 15 24-8 14-25 4-22-10-18-18-9-24 2-20z"></path>
              <path class="aws-globe-continent" d="M604 488l38 7 18 18-4 12-20 8-28-6-16-14 2-13z"></path>

              <ellipse class="aws-globe-orbit" cx="360" cy="360" rx="312" ry="88" transform="rotate(-18 360 360)"></ellipse>
              <ellipse class="aws-globe-orbit" cx="360" cy="360" rx="304" ry="72" transform="rotate(23 360 360)"></ellipse>

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
        <div class="aws-campus"><img src="/assets/img/background/sorbonne-line.png" alt=""></div>
        <div class="aws-campus"><img src="/assets/img/background/anderson-hall-line.png" alt=""></div>
        <div class="aws-campus"><img src="/assets/img/background/old-main-line.png" alt=""></div>
      </div>
    `;
  }

  function initScene() {
    var host = document.getElementById('academicWorldScene');
    if (!host || host.dataset.ready === 'true') return;
    host.innerHTML = markup();
    host.dataset.ready = 'true';

    var rotation = 0;
    var velocity = 0;
    var targetVelocity = 0;
    var lastY = window.scrollY || 0;

    function onScroll() {
      var y = window.scrollY || 0;
      var dy = y - lastY;
      lastY = y;
      targetVelocity += dy * 0.014;
      if (targetVelocity > 2.6) targetVelocity = 2.6;
      if (targetVelocity < -2.6) targetVelocity = -2.6;
    }

    function tick() {
      velocity += (targetVelocity - velocity) * 0.16;
      targetVelocity *= 0.88;
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
