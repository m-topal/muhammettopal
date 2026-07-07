(function () {
  function renderBackground() {
    var host = document.getElementById('academicJourneyBackground');
    if (!host || host.dataset.ready === 'true') return;

    var base = '/assets/img/background/';
    var oldMain = base + 'old-main-line.png';
    var sorbonne = base + 'sorbonne-line.png';
    var anderson = base + 'anderson-hall-line.png';

    host.innerHTML = `
      <div class="journey-bg-layer journey-bg-map">
        <svg class="journey-bg-svg" viewBox="0 0 1600 900" aria-hidden="true">
          <path class="journey-outline" d="M33 230l73-45 96 9 82 42 70 60 47-2 55 33 25 39-12 39-56 18-44 53-84 3-68 45-75-16-97-21-41-73 16-44-60-8-46-57 13-43 31-27-8-37 24-42z"/>
          <path class="journey-outline" d="M314 515l61 47 26 70-11 55 29 58 49 95-11 54-43 35-30-22-20-52-39-63-33-128-18-82-8-47 18-18z"/>
          <path class="journey-outline" d="M640 190l60-16 74 10 36 27 35-10 69 8 44 28 64-3 61 20 50 37 68 4 86 35 78 58 44 60-12 30-58 17-41 30 18 42-26 13-53-15-52 17-39-10-40-44-57-35-80 2-49-20-47 24-82-6-53-40-37-4-33-39 15-31-8-31-34-4-55 22-55-10-7-41-44-35 16-33 35-12z"/>
          <path class="journey-outline" d="M825 403l78 10 57 49 12 61-26 84-56 66-76 6-56-40-27-62 5-71 35-62 54-41z"/>
          <path class="journey-outline" d="M1248 652l59 10 74 35 44 48 15 52-20 45-52 20-56-9-35-41-40-29-24-50 11-38 24-23z"/>
          <path class="journey-outline" d="M1418 748l81 11 59 35 33 39-8 33-35 20-57-8-68-28-22-36 17-29z"/>

          <line class="journey-grid" x1="70" y1="420" x2="1530" y2="420"/>
          <line class="journey-grid" x1="70" y1="570" x2="1530" y2="570"/>
          <line class="journey-grid" x1="210" y1="150" x2="210" y2="860"/>
          <line class="journey-grid" x1="415" y1="140" x2="415" y2="860"/>
          <line class="journey-grid" x1="620" y1="130" x2="620" y2="860"/>
          <line class="journey-grid" x1="825" y1="120" x2="825" y2="860"/>
          <line class="journey-grid" x1="1030" y1="130" x2="1030" y2="860"/>
          <line class="journey-grid" x1="1235" y1="140" x2="1235" y2="860"/>
          <line class="journey-grid" x1="1440" y1="150" x2="1440" y2="860"/>

          <path class="journey-flow-glow" d="M299 493C420 430 557 400 808 374"/>
          <path class="journey-flow" d="M299 493C420 430 557 400 808 374"/>
          <path class="journey-flow-glow" d="M299 493C452 454 603 440 808 374"/>
          <path class="journey-flow" d="M299 493C452 454 603 440 808 374"/>
          <path class="journey-flow-glow" d="M808 374C853 373 891 381 932 399"/>
          <path class="journey-flow" d="M808 374C853 373 891 381 932 399"/>
          <path class="journey-flow-glow" d="M808 374C856 389 894 410 932 399"/>
          <path class="journey-flow" d="M808 374C856 389 894 410 932 399"/>
          <path class="journey-flow-glow" d="M570 420C590 397 615 382 642 370"/>
          <path class="journey-flow" d="M570 420C590 397 615 382 642 370"/>
          <path class="journey-flow-glow" d="M880 391C900 378 916 365 928 350"/>
          <path class="journey-flow" d="M880 391C900 378 916 365 928 350"/>

          <circle class="journey-city-halo" cx="299" cy="493" r="15"/>
          <circle class="journey-city-dot" cx="299" cy="493" r="4.5"/>
          <circle class="journey-city-halo" cx="808" cy="374" r="15"/>
          <circle class="journey-city-dot" cx="808" cy="374" r="4.5"/>
          <circle class="journey-city-halo" cx="932" cy="399" r="15"/>
          <circle class="journey-city-dot" cx="932" cy="399" r="4.5"/>
        </svg>
        <img class="journey-building journey-bldg-tucson-map" src="${oldMain}" alt="">
        <img class="journey-building journey-bldg-paris-map" src="${sorbonne}" alt="">
        <img class="journey-building journey-bldg-istanbul-map" src="${anderson}" alt="">
      </div>

      <div class="journey-bg-layer journey-bg-globe">
        <svg class="journey-bg-svg" viewBox="0 0 1600 900" aria-hidden="true">
          <defs>
            <clipPath id="journey-globe-clip"><ellipse cx="800" cy="480" rx="520" ry="285"/></clipPath>
          </defs>
          <ellipse class="journey-oval" cx="800" cy="480" rx="520" ry="285"/>
          <g clip-path="url(#journey-globe-clip)">
            <g class="journey-rotor" style="animation: journey-globe-spin 100s linear infinite; transform-origin: 800px 480px;">
              <path class="journey-outline" d="M33 230l73-45 96 9 82 42 70 60 47-2 55 33 25 39-12 39-56 18-44 53-84 3-68 45-75-16-97-21-41-73 16-44-60-8-46-57 13-43 31-27-8-37 24-42z" transform="translate(210 150) scale(.68)"/>
              <path class="journey-outline" d="M314 515l61 47 26 70-11 55 29 58 49 95-11 54-43 35-30-22-20-52-39-63-33-128-18-82-8-47 18-18z" transform="translate(210 150) scale(.68)"/>
              <path class="journey-outline" d="M640 190l60-16 74 10 36 27 35-10 69 8 44 28 64-3 61 20 50 37 68 4 86 35 78 58 44 60-12 30-58 17-41 30 18 42-26 13-53-15-52 17-39-10-40-44-57-35-80 2-49-20-47 24-82-6-53-40-37-4-33-39 15-31-8-31-34-4-55 22-55-10-7-41-44-35 16-33 35-12z" transform="translate(210 150) scale(.68)"/>
              <path class="journey-outline" d="M825 403l78 10 57 49 12 61-26 84-56 66-76 6-56-40-27-62 5-71 35-62 54-41z" transform="translate(210 150) scale(.68)"/>
              <path class="journey-outline" d="M1248 652l59 10 74 35 44 48 15 52-20 45-52 20-56-9-35-41-40-29-24-50 11-38 24-23z" transform="translate(210 150) scale(.68)"/>
              <path class="journey-outline" d="M1418 748l81 11 59 35 33 39-8 33-35 20-57-8-68-28-22-36 17-29z" transform="translate(210 150) scale(.68)"/>

              <ellipse class="journey-grid" cx="800" cy="480" rx="420" ry="240"/>
              <ellipse class="journey-grid" cx="800" cy="480" rx="320" ry="240"/>
              <ellipse class="journey-grid" cx="800" cy="480" rx="215" ry="240"/>
              <line class="journey-grid" x1="290" y1="480" x2="1310" y2="480"/>
              <line class="journey-grid" x1="340" y1="390" x2="1260" y2="390"/>
              <line class="journey-grid" x1="340" y1="570" x2="1260" y2="570"/>

              <path class="journey-flow-glow" d="M498 550C620 455 710 420 833 395"/>
              <path class="journey-flow" d="M498 550C620 455 710 420 833 395"/>
              <path class="journey-flow-glow" d="M833 395C875 396 918 406 951 423"/>
              <path class="journey-flow" d="M833 395C875 396 918 406 951 423"/>

              <circle class="journey-city-halo" cx="498" cy="550" r="14"/>
              <circle class="journey-city-dot" cx="498" cy="550" r="4.2"/>
              <circle class="journey-city-halo" cx="833" cy="395" r="14"/>
              <circle class="journey-city-dot" cx="833" cy="395" r="4.2"/>
              <circle class="journey-city-halo" cx="951" cy="423" r="14"/>
              <circle class="journey-city-dot" cx="951" cy="423" r="4.2"/>
            </g>
          </g>
        </svg>
        <img class="journey-building journey-bldg-tucson-globe" src="${oldMain}" alt="">
        <img class="journey-building journey-bldg-paris-globe" src="${sorbonne}" alt="">
        <img class="journey-building journey-bldg-istanbul-globe" src="${anderson}" alt="">
      </div>
    `;

    host.dataset.ready = 'true';
  }

  function updateProgress() {
    var host = document.getElementById('academicJourneyBackground');
    if (!host) return;
    var maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    var progress = Math.min(window.scrollY / Math.min(maxScroll, 1600), 1);
    host.style.setProperty('--journey-progress', progress.toFixed(4));
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderBackground();
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
  });
})();
