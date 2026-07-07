
(function () {
  function injectBackground() {
    var host = document.getElementById('academicJourneyBackground');
    if (!host || host.dataset.ready === 'true') return;

    host.innerHTML = `
      <div class="journey-bg-stage">
        <svg class="journey-bg-layer journey-bg-map" viewBox="0 0 1200 620" aria-hidden="true">
          <defs>
            <symbol id="journey-old-main" viewBox="0 0 120 96">
              <g class="journey-bg-building">
                <path class="building-main" d="M10 84H110M26 84V52H42V84M78 84V52H94V84M42 84V36H78V84M52 36V16H68V36M52 16L60 4L68 16M48 36H72M18 52H102M10 52V84M110 52V84M18 52L28 42H42M78 52H92L102 42M28 42V32H42M78 32H92V42M54 52V68H66V52M50 84V74H70V84"/>
                <path class="building-accent" d="M55 84V70H65V84"/>
                <path class="building-main" d="M34 62V74M86 62V74M18 60V74M102 60V74"/>
              </g>
            </symbol>
            <symbol id="journey-sorbonne" viewBox="0 0 120 96">
              <g class="journey-bg-building">
                <path class="building-main" d="M8 84H106M18 84V32H72V84M22 32L28 22H62L68 32M24 44V72M36 44V72M48 44V72M60 44V72M18 58H72M78 84V40H102V84M84 40C84 26 96 18 108 26M84 40C84 26 90 12 100 10C108 12 114 26 114 40M100 10V4M90 22H108M30 84V66H44V84"/>
                <path class="building-accent" d="M33 84V67H41V84"/>
                <path class="building-main" d="M26 26H64M72 84H114"/>
              </g>
            </symbol>
            <symbol id="journey-anderson" viewBox="0 0 140 96">
              <g class="journey-bg-building">
                <path class="building-main" d="M6 82H134M16 82V20H42V82M42 82V16H98V82M98 82V20H124V82M16 20H42M98 20H124M42 16L50 8H62V16M78 16V8H90L98 16M56 28V42M68 28V42M80 28V42M28 28V42M112 28V42M28 54V68M112 54V68M56 54V68M68 54V68M80 54V68M18 82L28 72H46M6 82H18M18 82V72M40 82V72"/>
                <path class="building-accent" d="M104 82V62H116V82"/>
                <path class="building-main" d="M104 62H116M54 82V60H66V82M74 82V60H86V82"/>
              </g>
            </symbol>
          </defs>

          <g>
            <path class="journey-bg-coast" d="M65 143l35-18 42 4 40 16 44 29 16 19 14 18 27-2 17 12-11 21-37 8-19 22-34 2-25 19-31-6-42-8-19-29 7-20-27-4-18-24 5-18 16-12-4-17 9-20z"/>
            <path class="journey-bg-coast" d="M245 332l40 24 22 42-12 38 16 42 30 61-8 39-25 25-18-15-9-37-25-39-24-79-14-55-6-37 13-9z"/>
            <path class="journey-bg-coast" d="M486 140l35-10 42 6 18 17 20-7 41 5 22 17 36-2 34 12 31 22 35 2 42 18 38 29 20 30-10 17-31 8-20 16 9 22-18 8-32-10-30 10-20-6-22-26-27-17-43 1-27-10-25 13-44-3-28-23-22-2-18-25 10-18-5-16-18-2-30 12-31-6-4-23-25-19 9-21 21-8z"/>
            <path class="journey-bg-coast" d="M596 270l52 6 36 33 8 40-17 56-35 43-47 4-34-26-18-43 4-50 23-42 28-21z"/>
            <path class="journey-bg-coast" d="M906 420l34 4 39 19 26 27 8 32-12 28-28 12-31-5-20-27-25-18-15-33 8-24 16-15z"/>
            <path class="journey-bg-coast" d="M1042 470l41 5 30 18 20 20-4 20-21 12-30-4-35-15-12-21 11-17z"/>

            <path class="journey-bg-graticule" d="M70 310H1130M70 215H1130M70 405H1130"/>
            <path class="journey-bg-graticule" d="M170 110V510M320 100V520M470 92V528M620 88V532M770 92V528M920 100V520M1070 110V510"/>

            <path class="journey-bg-glow-line" d="M220 250C345 204 460 208 546 222"/>
            <path class="journey-bg-line" d="M220 250C345 204 460 208 546 222"/>
            <path class="journey-bg-glow-line" d="M546 222C605 215 670 220 730 240"/>
            <path class="journey-bg-line" d="M546 222C605 215 670 220 730 240"/>

            <g transform="translate(158 150) scale(0.86)"><use href="#journey-old-main"></use></g>
            <g transform="translate(498 140) scale(0.84)"><use href="#journey-sorbonne"></use></g>
            <g transform="translate(660 175) scale(0.78)"><use href="#journey-anderson"></use></g>

            <g transform="translate(220 250)"><circle class="journey-bg-dot-halo" r="16"></circle><circle class="journey-bg-dot-ring" r="8"></circle><circle class="journey-bg-dot-core" r="3.4"></circle></g>
            <g transform="translate(546 222)"><circle class="journey-bg-dot-halo" r="16"></circle><circle class="journey-bg-dot-ring" r="8"></circle><circle class="journey-bg-dot-core" r="3.4"></circle></g>
            <g transform="translate(730 240)"><circle class="journey-bg-dot-halo" r="16"></circle><circle class="journey-bg-dot-ring" r="8"></circle><circle class="journey-bg-dot-core" r="3.4"></circle></g>
          </g>
        </svg>

        <svg class="journey-bg-layer journey-bg-globe" viewBox="0 0 1200 700" aria-hidden="true">
          <defs>
            <clipPath id="journey-globe-clip"><ellipse cx="600" cy="350" rx="430" ry="250"></ellipse></clipPath>
            <symbol id="journey-old-main-g" viewBox="0 0 120 96">
              <g class="journey-bg-building">
                <path class="building-main" d="M10 84H110M26 84V52H42V84M78 84V52H94V84M42 84V36H78V84M52 36V16H68V36M52 16L60 4L68 16M48 36H72M18 52H102M10 52V84M110 52V84M18 52L28 42H42M78 52H92L102 42M28 42V32H42M78 32H92V42M54 52V68H66V52M50 84V74H70V84"/>
                <path class="building-accent" d="M55 84V70H65V84"/>
                <path class="building-main" d="M34 62V74M86 62V74M18 60V74M102 60V74"/>
              </g>
            </symbol>
            <symbol id="journey-sorbonne-g" viewBox="0 0 120 96">
              <g class="journey-bg-building">
                <path class="building-main" d="M8 84H106M18 84V32H72V84M22 32L28 22H62L68 32M24 44V72M36 44V72M48 44V72M60 44V72M18 58H72M78 84V40H102V84M84 40C84 26 96 18 108 26M84 40C84 26 90 12 100 10C108 12 114 26 114 40M100 10V4M90 22H108M30 84V66H44V84"/>
                <path class="building-accent" d="M33 84V67H41V84"/>
                <path class="building-main" d="M26 26H64M72 84H114"/>
              </g>
            </symbol>
            <symbol id="journey-anderson-g" viewBox="0 0 140 96">
              <g class="journey-bg-building">
                <path class="building-main" d="M6 82H134M16 82V20H42V82M42 82V16H98V82M98 82V20H124V82M16 20H42M98 20H124M42 16L50 8H62V16M78 16V8H90L98 16M56 28V42M68 28V42M80 28V42M28 28V42M112 28V42M28 54V68M112 54V68M56 54V68M68 54V68M80 54V68M18 82L28 72H46M6 82H18M18 82V72M40 82V72"/>
                <path class="building-accent" d="M104 82V62H116V82"/>
                <path class="building-main" d="M104 62H116M54 82V60H66V82M74 82V60H86V82"/>
              </g>
            </symbol>
          </defs>

          <ellipse class="journey-bg-globe-oval" cx="600" cy="350" rx="430" ry="250"></ellipse>
          <g clip-path="url(#journey-globe-clip)">
            <g class="globe-rotor">
              <path class="journey-bg-coast" d="M65 143l35-18 42 4 40 16 44 29 16 19 14 18 27-2 17 12-11 21-37 8-19 22-34 2-25 19-31-6-42-8-19-29 7-20-27-4-18-24 5-18 16-12-4-17 9-20z" transform="translate(80 120) scale(0.78)"/>
              <path class="journey-bg-coast" d="M245 332l40 24 22 42-12 38 16 42 30 61-8 39-25 25-18-15-9-37-25-39-24-79-14-55-6-37 13-9z" transform="translate(80 120) scale(0.78)"/>
              <path class="journey-bg-coast" d="M486 140l35-10 42 6 18 17 20-7 41 5 22 17 36-2 34 12 31 22 35 2 42 18 38 29 20 30-10 17-31 8-20 16 9 22-18 8-32-10-30 10-20-6-22-26-27-17-43 1-27-10-25 13-44-3-28-23-22-2-18-25 10-18-5-16-18-2-30 12-31-6-4-23-25-19 9-21 21-8z" transform="translate(80 120) scale(0.78)"/>
              <path class="journey-bg-coast" d="M596 270l52 6 36 33 8 40-17 56-35 43-47 4-34-26-18-43 4-50 23-42 28-21z" transform="translate(80 120) scale(0.78)"/>
              <path class="journey-bg-coast" d="M906 420l34 4 39 19 26 27 8 32-12 28-28 12-31-5-20-27-25-18-15-33 8-24 16-15z" transform="translate(80 120) scale(0.78)"/>
              <path class="journey-bg-coast" d="M1042 470l41 5 30 18 20 20-4 20-21 12-30-4-35-15-12-21 11-17z" transform="translate(80 120) scale(0.78)"/>

              <ellipse class="journey-bg-graticule" cx="600" cy="350" rx="360" ry="205"></ellipse>
              <ellipse class="journey-bg-graticule" cx="600" cy="350" rx="275" ry="205"></ellipse>
              <ellipse class="journey-bg-graticule" cx="600" cy="350" rx="185" ry="205"></ellipse>
              <path class="journey-bg-graticule" d="M170 350H1030M210 285H990M210 415H990M275 220H925M275 480H925"/>

              <path class="journey-bg-glow-line" d="M300 355C390 292 485 255 600 244"/>
              <path class="journey-bg-line" d="M300 355C390 292 485 255 600 244"/>
              <path class="journey-bg-glow-line" d="M600 244C675 242 758 255 828 288"/>
              <path class="journey-bg-line" d="M600 244C675 242 758 255 828 288"/>

              <g transform="translate(248 255) scale(0.76)"><use href="#journey-old-main-g"></use></g>
              <g transform="translate(552 164) scale(0.74)"><use href="#journey-sorbonne-g"></use></g>
              <g transform="translate(742 226) scale(0.68)"><use href="#journey-anderson-g"></use></g>

              <g transform="translate(300 355)"><circle class="journey-bg-dot-halo" r="14"></circle><circle class="journey-bg-dot-ring" r="7"></circle><circle class="journey-bg-dot-core" r="3.2"></circle></g>
              <g transform="translate(600 244)"><circle class="journey-bg-dot-halo" r="14"></circle><circle class="journey-bg-dot-ring" r="7"></circle><circle class="journey-bg-dot-core" r="3.2"></circle></g>
              <g transform="translate(828 288)"><circle class="journey-bg-dot-halo" r="14"></circle><circle class="journey-bg-dot-ring" r="7"></circle><circle class="journey-bg-dot-core" r="3.2"></circle></g>
            </g>
          </g>
        </svg>
      </div>
    `;
    host.dataset.ready = 'true';
  }

  function updateProgress() {
    var host = document.getElementById('academicJourneyBackground');
    if (!host) return;
    var scrollMax = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    var progress = Math.min(window.scrollY / Math.min(scrollMax, 1400), 1);
    host.style.setProperty('--journey-progress', progress.toFixed(4));
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectBackground();
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
  });
})();
