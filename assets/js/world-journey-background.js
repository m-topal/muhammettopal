(function () {
  function renderBackground() {
    var host = document.getElementById('academicJourneyBackground');
    if (!host || host.dataset.ready === 'true') return;

    var base = '/assets/img/background/';
    var sorbonne = base + 'sorbonne-line.png';
    var anderson = base + 'anderson-hall-line.png';
    var oldMain = base + 'old-main-line.png';

    host.innerHTML = `
      <div class="journey-bg-stage">
        <div class="journey-bg-layer journey-bg-map">
          <svg class="journey-bg-svg" viewBox="0 0 1600 900" aria-hidden="true">
            <g>
              <path class="journey-outline" d="M35 238l70-48 92 8 82 44 76 60 46-3 58 36 25 40-12 39-56 19-44 51-84 4-69 45-73-15-99-22-39-74 15-45-59-8-48-57 13-44 32-28-8-37 23-43z"></path>
              <path class="journey-outline" d="M314 512l62 48 27 70-11 55 29 58 49 96-11 53-44 36-31-22-19-51-39-64-33-128-18-81-8-47 17-18z"></path>
              <path class="journey-outline" d="M638 192l62-17 74 10 35 28 36-11 70 9 42 28 67-4 63 21 51 37 66 4 87 35 79 58 44 60-13 31-58 17-40 29 18 42-26 13-54-15-51 17-39-10-41-44-56-35-81 2-49-21-48 25-82-6-54-39-35-5-34-39 15-31-8-31-34-4-55 22-55-10-7-41-44-35 16-33 35-12z"></path>
              <path class="journey-outline" d="M825 403l78 10 57 48 12 62-26 84-55 66-77 6-55-40-28-61 5-72 35-62 54-41z"></path>
              <path class="journey-outline" d="M1248 652l59 11 74 35 44 47 15 52-20 46-51 20-57-9-35-41-40-29-24-51 11-37 24-24z"></path>
              <path class="journey-outline" d="M1418 748l81 11 58 35 34 39-8 33-34 20-58-8-68-28-22-36 17-29z"></path>

              <line class="journey-grid" x1="72" y1="420" x2="1528" y2="420"></line>
              <line class="journey-grid" x1="72" y1="572" x2="1528" y2="572"></line>
              <line class="journey-grid" x1="210" y1="148" x2="210" y2="862"></line>
              <line class="journey-grid" x1="414" y1="140" x2="414" y2="862"></line>
              <line class="journey-grid" x1="618" y1="132" x2="618" y2="862"></line>
              <line class="journey-grid" x1="822" y1="124" x2="822" y2="862"></line>
              <line class="journey-grid" x1="1026" y1="132" x2="1026" y2="862"></line>
              <line class="journey-grid" x1="1230" y1="140" x2="1230" y2="862"></line>
              <line class="journey-grid" x1="1434" y1="148" x2="1434" y2="862"></line>

              <path class="journey-flow-glow" d="M338 489C452 417 577 401 690 406C748 409 782 417 803 426"></path>
              <path class="journey-flow" d="M338 489C452 417 577 401 690 406C748 409 782 417 803 426"></path>
              <path class="journey-flow-glow" d="M338 489C464 430 603 427 726 442C759 446 781 440 803 426"></path>
              <path class="journey-flow" d="M338 489C464 430 603 427 726 442C759 446 781 440 803 426"></path>
              <path class="journey-flow-glow" d="M803 426C846 418 892 419 934 428C988 441 1028 454 1063 457"></path>
              <path class="journey-flow" d="M803 426C846 418 892 419 934 428C988 441 1028 454 1063 457"></path>
              <path class="journey-flow-glow" d="M803 426C854 431 896 442 948 463C995 482 1032 475 1063 457"></path>
              <path class="journey-flow" d="M803 426C854 431 896 442 948 463C995 482 1032 475 1063 457"></path>
              <path class="journey-flow-glow" d="M789 420C771 411 757 404 740 400"></path>
              <path class="journey-flow" d="M789 420C771 411 757 404 740 400"></path>
              <path class="journey-flow-glow" d="M1070 452C1090 447 1106 440 1120 431"></path>
              <path class="journey-flow" d="M1070 452C1090 447 1106 440 1120 431"></path>

              <circle class="journey-city-halo" cx="338" cy="489" r="18"></circle>
              <circle class="journey-city-dot" cx="338" cy="489" r="4.7"></circle>
              <circle class="journey-city-halo" cx="803" cy="426" r="18"></circle>
              <circle class="journey-city-dot" cx="803" cy="426" r="4.7"></circle>
              <circle class="journey-city-halo" cx="1063" cy="457" r="18"></circle>
              <circle class="journey-city-dot" cx="1063" cy="457" r="4.7"></circle>
            </g>
          </svg>
          <img class="journey-building journey-bldg-tucson-map" src="${oldMain}" alt="">
          <img class="journey-building journey-bldg-paris-map" src="${sorbonne}" alt="">
          <img class="journey-building journey-bldg-istanbul-map" src="${anderson}" alt="">
        </div>

        <div class="journey-bg-layer journey-bg-globe">
          <svg class="journey-bg-svg" viewBox="0 0 1600 900" aria-hidden="true">
            <defs>
              <clipPath id="journey-globe-clip"><ellipse cx="800" cy="476" rx="520" ry="286"></ellipse></clipPath>
            </defs>
            <ellipse class="journey-oval" cx="800" cy="476" rx="520" ry="286"></ellipse>
            <g clip-path="url(#journey-globe-clip)">
              <g class="journey-rotor" style="animation: journey-globe-spin 90s linear infinite; transform-origin: 800px 476px;">
                <path class="journey-outline" d="M35 238l70-48 92 8 82 44 76 60 46-3 58 36 25 40-12 39-56 19-44 51-84 4-69 45-73-15-99-22-39-74 15-45-59-8-48-57 13-44 32-28-8-37 23-43z" transform="translate(208 150) scale(0.68)"></path>
                <path class="journey-outline" d="M314 512l62 48 27 70-11 55 29 58 49 96-11 53-44 36-31-22-19-51-39-64-33-128-18-81-8-47 17-18z" transform="translate(208 150) scale(0.68)"></path>
                <path class="journey-outline" d="M638 192l62-17 74 10 35 28 36-11 70 9 42 28 67-4 63 21 51 37 66 4 87 35 79 58 44 60-13 31-58 17-40 29 18 42-26 13-54-15-51 17-39-10-41-44-56-35-81 2-49-21-48 25-82-6-54-39-35-5-34-39 15-31-8-31-34-4-55 22-55-10-7-41-44-35 16-33 35-12z" transform="translate(208 150) scale(0.68)"></path>
                <path class="journey-outline" d="M825 403l78 10 57 48 12 62-26 84-55 66-77 6-55-40-28-61 5-72 35-62 54-41z" transform="translate(208 150) scale(0.68)"></path>
                <path class="journey-outline" d="M1248 652l59 11 74 35 44 47 15 52-20 46-51 20-57-9-35-41-40-29-24-51 11-37 24-24z" transform="translate(208 150) scale(0.68)"></path>
                <path class="journey-outline" d="M1418 748l81 11 58 35 34 39-8 33-34 20-58-8-68-28-22-36 17-29z" transform="translate(208 150) scale(0.68)"></path>

                <ellipse class="journey-grid" cx="800" cy="476" rx="420" ry="240"></ellipse>
                <ellipse class="journey-grid" cx="800" cy="476" rx="320" ry="240"></ellipse>
                <ellipse class="journey-grid" cx="800" cy="476" rx="215" ry="240"></ellipse>
                <line class="journey-grid" x1="286" y1="476" x2="1314" y2="476"></line>
                <line class="journey-grid" x1="336" y1="384" x2="1264" y2="384"></line>
                <line class="journey-grid" x1="336" y1="568" x2="1264" y2="568"></line>
                <line class="journey-grid" x1="430" y1="308" x2="1170" y2="308"></line>
                <line class="journey-grid" x1="430" y1="644" x2="1170" y2="644"></line>

                <path class="journey-flow-glow" d="M496 550C583 472 684 425 823 404"></path>
                <path class="journey-flow" d="M496 550C583 472 684 425 823 404"></path>
                <path class="journey-flow-glow" d="M496 550C607 503 689 497 780 458C796 451 809 431 823 404"></path>
                <path class="journey-flow" d="M496 550C607 503 689 497 780 458C796 451 809 431 823 404"></path>
                <path class="journey-flow-glow" d="M823 404C885 404 951 421 1030 450C1048 456 1068 459 1088 458"></path>
                <path class="journey-flow" d="M823 404C885 404 951 421 1030 450C1048 456 1068 459 1088 458"></path>
                <path class="journey-flow-glow" d="M823 404C872 419 926 444 979 473C1020 495 1062 482 1088 458"></path>
                <path class="journey-flow" d="M823 404C872 419 926 444 979 473C1020 495 1062 482 1088 458"></path>

                <circle class="journey-city-halo" cx="496" cy="550" r="16"></circle>
                <circle class="journey-city-dot" cx="496" cy="550" r="4.4"></circle>
                <circle class="journey-city-halo" cx="823" cy="404" r="16"></circle>
                <circle class="journey-city-dot" cx="823" cy="404" r="4.4"></circle>
                <circle class="journey-city-halo" cx="1088" cy="458" r="16"></circle>
                <circle class="journey-city-dot" cx="1088" cy="458" r="4.4"></circle>
              </g>
            </g>
          </svg>
          <img class="journey-building journey-bldg-tucson-globe" src="${oldMain}" alt="">
          <img class="journey-building journey-bldg-paris-globe" src="${sorbonne}" alt="">
          <img class="journey-building journey-bldg-istanbul-globe" src="${anderson}" alt="">
        </div>
      </div>
    `;

    host.dataset.ready = 'true';
  }

  function updateProgress() {
    var host = document.getElementById('academicJourneyBackground');
    if (!host) return;
    var max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    var progress = Math.min(window.scrollY / Math.min(max, 1500), 1);
    host.style.setProperty('--journey-progress', progress.toFixed(4));
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderBackground();
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
  });
})();
