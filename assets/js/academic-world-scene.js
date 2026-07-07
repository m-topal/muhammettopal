(function () {
  function topMapMarkup() {
    return `
      <div class="aws-top-map-shell">
        <svg class="aws-svg" viewBox="0 0 1600 410" preserveAspectRatio="none" aria-hidden="true">
          <g>
            <line class="aws-map-grid" x1="160" y1="40" x2="160" y2="338"></line>
            <line class="aws-map-grid" x1="390" y1="40" x2="390" y2="338"></line>
            <line class="aws-map-grid" x1="620" y1="40" x2="620" y2="338"></line>
            <line class="aws-map-grid" x1="850" y1="40" x2="850" y2="338"></line>
            <line class="aws-map-grid" x1="1080" y1="40" x2="1080" y2="338"></line>
            <line class="aws-map-grid" x1="1310" y1="40" x2="1310" y2="338"></line>
            <line class="aws-map-grid" x1="24" y1="118" x2="1576" y2="118"></line>
            <line class="aws-map-grid" x1="24" y1="194" x2="1576" y2="194"></line>
            <line class="aws-map-grid" x1="24" y1="270" x2="1576" y2="270"></line>

            <path class="aws-map-land" d="M32 188l76-34 115 14 100 46 86 78 46-4 54 34 12 51-30 54-64 20-25 64"></path>
            <path class="aws-map-land" d="M535 145l123-35 110 11 74 37 106-7 99 15 124-6 117 39 91 80 38 70-16 32-58 18-42 58-94 12-54-40-87-6-89-57-100 10-84 28-108-4-71-63-46-12-42-48 24-45-17-42-65-15-58 19-61-13-13-57-60-44 24-35 62-13z"></path>
            <path class="aws-map-land" d="M1184 308l84 14 110 52 71 72-10 33-70 8-60-18-32-48-63-22-44-60 14-31z"></path>
            <path class="aws-map-land" d="M1390 338l70 8 82 44 34 58-10 30-34 16-64-10-56-42-24-58 2-22z"></path>

            <path class="aws-map-arc" d="M226 246C416 212 612 210 806 232"></path>
            <path class="aws-map-arc" d="M806 232C930 211 1044 214 1176 244"></path>
            <path class="aws-map-arc" d="M806 232C774 198 748 160 726 122"></path>
          </g>
        </svg>
      </div>`;
  }

  function globeMarkup() {
    return `
      <div class="aws-globe-center" id="awsGlobeCenter">
        <svg class="aws-svg" viewBox="0 0 720 720" aria-hidden="true">
          <defs>
            <clipPath id="awsGlobeClip"><circle cx="360" cy="360" r="276"></circle></clipPath>
          </defs>
          <circle class="aws-globe-outline" cx="360" cy="360" r="276"></circle>
          <g clip-path="url(#awsGlobeClip)">
            <g class="aws-globe-spin" id="awsGlobeSpin">
              <ellipse class="aws-globe-grid" cx="360" cy="360" rx="222" ry="276"></ellipse>
              <ellipse class="aws-globe-grid" cx="360" cy="360" rx="146" ry="276"></ellipse>
              <ellipse class="aws-globe-grid" cx="360" cy="360" rx="70" ry="276"></ellipse>
              <line class="aws-globe-grid" x1="84" y1="360" x2="636" y2="360"></line>
              <path class="aws-globe-grid" d="M112 270H608"></path>
              <path class="aws-globe-grid" d="M112 450H608"></path>
              <path class="aws-globe-grid" d="M162 196H558"></path>
              <path class="aws-globe-grid" d="M162 524H558"></path>

              <path class="aws-globe-continent" d="M218 220l55-38 70-11 62 16 29-13 66 12 42 24 54 2 45 18 33 31 15 37-11 27-37 24-40 2-31 20 10 25-17 11-34-11-22 8-20-7-19-25-33-20-55 3-34-11-24 15-55-4-34-25-22-5-22-30 6-21-3-24-27-6-37 15-34-8-6-25-23-19 9-17 22-7z"></path>
              <path class="aws-globe-continent" d="M364 304l43 5 35 25 10 33-16 49-29 42-35 7-32-21-16-34 3-38 18-39 19-16z"></path>
              <path class="aws-globe-continent" d="M248 468l60 25 20 36-12 38-39 28-40 0-33-15-18-30 7-31 22-27 33-24z"></path>
              <path class="aws-globe-continent" d="M510 424l28 8 23 20 10 28-6 19-26 10-24-7-17-15-9-23 5-19 16-21z"></path>
              <path class="aws-globe-continent" d="M574 254l38 11 29 19 15 25-8 13-26 4-21-9-20-20-9-22 2-21z"></path>
              <path class="aws-globe-continent" d="M603 488l39 7 19 18-5 13-20 8-29-6-16-15 3-12z"></path>
              <path class="aws-globe-continent" d="M164 338l28-16 31 6 15 24-5 27-20 16-27 3-22-14-8-24 8-22z"></path>
              <path class="aws-globe-continent" d="M430 186l18-10 23 1 10 13-5 18-18 10-20-3-11-12 3-17z"></path>

              <ellipse class="aws-globe-orbit" cx="360" cy="360" rx="312" ry="86" transform="rotate(-17 360 360)"></ellipse>
              <ellipse class="aws-globe-orbit" cx="360" cy="360" rx="306" ry="72" transform="rotate(23 360 360)"></ellipse>
              <ellipse class="aws-globe-orbit" cx="360" cy="360" rx="294" ry="62" transform="rotate(56 360 360)"></ellipse>

              <path class="aws-globe-arc" d="M206 394C258 313 310 288 357 280"></path>
              <path class="aws-globe-arc" d="M357 280C373 281 383 288 393 296"></path>
              <path class="aws-globe-arc" d="M393 296C405 290 417 287 429 289"></path>
              <path class="aws-globe-arc secondary" d="M429 289C437 280 441 270 443 258"></path>
              <path class="aws-globe-arc secondary" d="M393 296C391 309 389 321 386 334"></path>
              <path class="aws-globe-arc secondary" d="M357 280C347 275 339 271 332 269"></path>
              <path class="aws-globe-arc secondary" d="M332 269C277 283 224 300 179 330"></path>
              <path class="aws-globe-arc secondary" d="M429 289C460 305 493 329 524 360"></path>
              <path class="aws-globe-arc secondary" d="M524 360C547 351 565 337 581 325"></path>
              <path class="aws-globe-arc secondary" d="M386 334C394 371 401 397 408 420"></path>
              <path class="aws-globe-arc secondary" d="M408 420C473 413 539 433 598 474"></path>
              <path class="aws-globe-arc secondary" d="M386 334C378 402 369 459 362 508"></path>
              <path class="aws-globe-arc secondary" d="M408 420C426 447 443 472 458 500"></path>
            </g>
          </g>
        </svg>

        <div class="aws-school-satellite" id="awsSchool1"><img src="/assets/img/background/sorbonne-line.png" alt=""></div>
        <div class="aws-school-satellite" id="awsSchool2"><img src="/assets/img/background/anderson-hall-line.png" alt=""></div>
        <div class="aws-school-satellite" id="awsSchool3"><img src="/assets/img/background/old-main-line.png" alt=""></div>
      </div>`;
  }

  function setSatellitePosition(el, angleDeg, radius) {
    el.style.transform = 'translate(-50%, -50%) rotate(' + angleDeg + 'deg) translateX(' + radius + 'px) rotate(' + (-angleDeg) + 'deg)';
  }

  function init() {
    var topMap = document.getElementById('academicTopMap');
    var globeScene = document.getElementById('academicGlobeScene');
    if (!topMap || !globeScene) return;
    if (!topMap.dataset.ready) {
      topMap.innerHTML = topMapMarkup();
      topMap.dataset.ready = 'true';
    }
    if (!globeScene.dataset.ready) {
      globeScene.innerHTML = globeMarkup();
      globeScene.dataset.ready = 'true';
    }

    var rotation = 0;
    var velocity = 0;
    var targetVelocity = 0;
    var lastY = window.scrollY || 0;
    var globeCenter = document.getElementById('awsGlobeCenter');
    var s1 = document.getElementById('awsSchool1');
    var s2 = document.getElementById('awsSchool2');
    var s3 = document.getElementById('awsSchool3');

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
      targetVelocity *= 0.88;
      rotation += velocity;
      globeScene.style.setProperty('--globe-rot', rotation.toFixed(3) + 'deg');

      if (globeCenter && s1 && s2 && s3) {
        var size = globeCenter.offsetWidth || 560;
        var baseRadius = size * 0.58;
        setSatellitePosition(s1, rotation * 0.55 - 42, baseRadius);
        setSatellitePosition(s2, rotation * 0.55 + 88, baseRadius * 0.94);
        setSatellitePosition(s3, rotation * 0.55 + 210, baseRadius * 1.02);
      }
      window.requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
