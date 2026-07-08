(function () {
  var globeHost = document.getElementById('academicGlobe');
  var mapHost = document.getElementById('academicTopMap');
  if (!globeHost || !mapHost) return;

  function updateSceneTop() {
    var scene = document.querySelector('.academic-world-scene');
    var nav = document.querySelector('.sticky-nav, .nav-wrap');
    if (!scene || !nav) return;
    var bottom = Math.max(0, Math.ceil(nav.getBoundingClientRect().bottom + 26));
    scene.style.setProperty('--academic-scene-top', bottom + 'px');
  }

  function injectFooterRange() {
    document.querySelectorAll('.footer').forEach(function (footer) {
      if (footer.querySelector('.academic-footer-range')) return;
      var deco = document.createElement('div');
      deco.className = 'academic-footer-range';
      deco.setAttribute('aria-hidden', 'true');
      deco.innerHTML = `
        <svg viewBox="0 0 1600 180" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke-linecap="round" stroke-linejoin="round">
            <g stroke="rgba(78,94,109,.28)" stroke-width="2">
              <path d="M0 146 C88 146 118 138 164 138 C214 138 250 114 300 76 C336 48 366 36 396 36 C426 36 452 54 476 70 C502 88 530 96 560 96 C594 96 626 82 658 60 C690 38 718 26 748 26 C776 26 804 44 832 64 C860 84 894 94 930 94 C968 94 1000 74 1038 40 C1070 12 1096 2 1122 2 C1148 2 1174 22 1202 48 C1238 82 1272 98 1308 98 C1346 98 1378 82 1410 58 C1438 38 1466 28 1498 28 C1538 28 1576 44 1600 56"/>
              <path d="M182 142v-28m0 0l-10 11h8l-12 13h9l-13 13m18-37l10 11h-8l12 13h-9l13 13"/>
              <path d="M210 143v-22m0 0l-7 8h6l-9 10h7l-9 10m12-28l7 8h-6l9 10h-7l9 10"/>
              <path d="M238 144v-18m0 0l-6 7h5l-8 8h6l-8 9m11-24l6 7h-5l8 8h-6l8 9"/>
              <circle cx="1122" cy="24" r="18"/>
            </g>
            <g stroke="rgba(124,160,194,.12)" stroke-width="1.35">
              <path d="M150 148C406 126 712 124 1020 128C1224 130 1418 136 1578 148"/>
            </g>
          </g>
        </svg>`
      footer.appendChild(deco);
    });
  }

  function harmonizePresentationAccordions() {
    var roots = [];
    var researchPresentations = document.querySelector('#presentations .accordion');
    if (researchPresentations) roots.push(researchPresentations);
    if (location.pathname.indexOf('/presentations/') !== -1 || location.pathname.match(/\/presentations\/?$/)) {
      document.body.classList.add('presentations-page');
      document.querySelectorAll('.accordion').forEach(function (acc) { roots.push(acc); });
    }
    roots.forEach(function (root) {
      root.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
        trigger.classList.add('publication-trigger');
      });
    });
  }

  function collapseAndTrimPanels() {
    // Research page sections
    ['#presentations', '#publications'].forEach(function (sectionSelector) {
      var section = document.querySelector(sectionSelector);
      if (!section) return;
      section.querySelectorAll('.accordion-item.open').forEach(function (item) {
        item.classList.remove('open');
      });
    });

    // Standalone pages
    if (location.pathname.indexOf('/presentations/') !== -1 || location.pathname.match(/\/presentations\/?$/)) {
      document.querySelectorAll('.accordion-item.open').forEach(function (item) {
        item.classList.remove('open');
      });
    }
    if (location.pathname.indexOf('/publications/') !== -1 || location.pathname.match(/\/publications\/?$/)) {
      document.querySelectorAll('.accordion-item.open').forEach(function (item) {
        item.classList.remove('open');
      });
    }

    // Presentations: keep only the meta line, hide explanatory paragraphs.
    var presentationRoots = [];
    var researchPresentations = document.querySelector('#presentations .accordion');
    if (researchPresentations) presentationRoots.push(researchPresentations);
    if (location.pathname.indexOf('/presentations/') !== -1 || location.pathname.match(/\/presentations\/?$/)) {
      document.querySelectorAll('.accordion').forEach(function (acc) { presentationRoots.push(acc); });
    }

    presentationRoots.forEach(function (root) {
      root.querySelectorAll('.accordion-panel').forEach(function (panel) {
        panel.querySelectorAll('p').forEach(function (p) {
          p.style.display = 'none';
        });
      });
    });
  }

  updateSceneTop();
  injectFooterRange();
  collapseAndTrimPanels();
  harmonizePresentationAccordions();
  window.addEventListener('scroll', updateSceneTop, { passive: true });
  window.addEventListener('resize', updateSceneTop);
  window.addEventListener('load', function () {
    updateSceneTop();
    injectFooterRange();
    collapseAndTrimPanels();
    harmonizePresentationAccordions();
  });
  document.addEventListener('DOMContentLoaded', function () {
    updateSceneTop();
    injectFooterRange();
    collapseAndTrimPanels();
    harmonizePresentationAccordions();
  });

  mapHost.innerHTML = `
    <svg viewBox="0 0 1600 300" preserveAspectRatio="none" width="100%" height="100%" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke-linecap="round" stroke-linejoin="round">
        <g stroke="rgba(124,142,156,.10)" stroke-width="1">
          <path d="M170 0V300M370 0V300M570 0V300M770 0V300M970 0V300M1170 0V300M1370 0V300"/>
          <path d="M0 84H1600M0 164H1600M0 244H1600"/>
        </g>

        <g stroke="rgba(78,94,109,.23)" stroke-width="2.05">
          <path d="M0 228 C92 228 126 220 172 220 C220 220 258 194 308 156 C344 128 374 116 404 116 C434 116 460 132 486 148 C512 164 538 170 568 170 C604 170 636 154 668 130 C700 106 730 94 760 94 C790 94 818 110 846 132 C876 156 908 168 944 168 C986 168 1020 136 1056 98 C1092 60 1120 44 1146 44 C1172 44 1198 64 1228 94 C1264 130 1298 152 1336 152 C1376 152 1410 132 1444 108 C1478 84 1512 70 1600 70"/>
          <path d="M164 220 C230 220 286 214 340 206 C390 198 432 168 474 140 C506 154 540 164 574 172 C612 180 648 184 690 184 C736 184 780 176 824 166 C868 156 908 150 944 150 C982 150 1022 156 1064 164 C1108 172 1148 176 1186 176 C1230 176 1272 166 1312 152 C1354 138 1392 130 1428 130 C1472 130 1516 142 1600 164"/>
          <path d="M396 180v-30m0 0l-11 12h8l-13 14h10l-14 14m20-40l11 12h-8l13 14h-10l14 14"/>
          <path d="M428 183v-24m0 0l-8 9h6l-10 11h8l-10 11m14-31l8 9h-6l10 11h-8l10 11"/>
          <path d="M460 186v-18m0 0l-7 7h5l-8 9h6l-9 10m13-26l7 7h-5l8 9h-6l9 10"/>
          <circle cx="1146" cy="56" r="22"/>
        </g>

        <g stroke="rgba(124,160,194,.15)" stroke-width="1.45">
          <path d="M280 232C510 206 820 204 1100 214C1254 220 1408 226 1500 228"/>
        </g>
      </g>
    </svg>`

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[src="' + src + '"]');
      if (existing) {
        if (window.Globe) return resolve();
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }
      var script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function positionSatellite(el, angle, radius) {
    if (!el) return;
    el.style.transform = 'translate(-50%, -50%) rotate(' + angle + 'deg) translateX(' + radius + 'px) rotate(' + (-angle) + 'deg)';
  }

  function initGlobe() {
    var cities = [
      { name: 'Tucson', lat: 32.2226, lng: -110.9747 },
      { name: 'Paris', lat: 48.8566, lng: 2.3522 },
      { name: 'Istanbul', lat: 41.0082, lng: 28.9784 },
      { name: 'London', lat: 51.5072, lng: -0.1276 },
      { name: 'New York', lat: 40.7128, lng: -74.0060 },
      { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
      { name: 'Moscow', lat: 55.7558, lng: 37.6173 },
      { name: 'Tbilisi', lat: 41.7151, lng: 44.8271 },
      { name: 'Baku', lat: 40.4093, lng: 49.8671 },
      { name: 'Delhi', lat: 28.6139, lng: 77.2090 },
      { name: 'Beijing', lat: 39.9042, lng: 116.4074 },
      { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
      { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
      { name: 'Nairobi', lat: -1.2864, lng: 36.8172 },
      { name: 'Johannesburg', lat: -26.2041, lng: 28.0473 },
      { name: 'Sao Paulo', lat: -23.5505, lng: -46.6333 },
      { name: 'Mexico City', lat: 19.4326, lng: -99.1332 },
      { name: 'Sydney', lat: -33.8688, lng: 151.2093 }
    ];

    var arcs = [
      ['Tucson','Paris'], ['Paris','Istanbul'], ['Istanbul','Tbilisi'], ['Tbilisi','Baku'],
      ['Istanbul','Moscow'], ['Istanbul','Cairo'], ['Cairo','Nairobi'], ['Nairobi','Johannesburg'],
      ['Moscow','Beijing'], ['Baku','Delhi'], ['Delhi','Singapore'], ['Singapore','Tokyo'],
      ['Singapore','Sydney'], ['New York','London'], ['New York','Mexico City'], ['Sao Paulo','New York'],
      ['Paris','London'], ['Paris','Cairo']
    ].map(function (pair) {
      var a = cities.find(function (c) { return c.name === pair[0]; });
      var b = cities.find(function (c) { return c.name === pair[1]; });
      return { startLat: a.lat, startLng: a.lng, endLat: b.lat, endLng: b.lng };
    });

    var globe = Globe()(globeHost)
      .width(globeHost.clientWidth)
      .height(globeHost.clientHeight)
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(true)
      .atmosphereColor('#a9c0cd')
      .atmosphereAltitude(0.08)
      .pointsData([])
      .ringsData([])
      .arcsData(arcs)
      .arcStartLat('startLat')
      .arcStartLng('startLng')
      .arcEndLat('endLat')
      .arcEndLng('endLng')
      .arcColor(function () { return 'rgba(96,142,174,.42)'; })
      .arcAltitude(0.19)
      .arcStroke(0.24)
      .arcDashLength(0.48)
      .arcDashGap(0.14)
      .arcDashInitialGap(function () { return Math.random(); })
      .arcDashAnimateTime(2600)
      .enablePointerInteraction(false);

    var material = globe.globeMaterial();
    material.color.set('#dbe4e8');
    material.transparent = true;
    material.opacity = 0.27;
    material.wireframe = false;
    material.roughness = 0.88;
    material.metalness = 0;

    fetch('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(function (res) { return res.json(); })
      .then(function (countries) {
        globe
          .polygonsData(countries.features)
          .polygonAltitude(0.006)
          .polygonCapColor(function () { return 'rgba(218,226,230,.38)'; })
          .polygonSideColor(function () { return 'rgba(179,196,204,.12)'; })
          .polygonStrokeColor(function () { return 'rgba(89,111,123,.62)'; })
          .polygonsTransitionDuration(0);
      })
      .catch(function () {
        material.wireframe = true;
        material.opacity = 0.20;
      });

    globe.pointOfView({ lat: 39.0, lng: 35.0, altitude: 1.72 }, 0);

    var controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.55;
    controls.enableZoom = false;
    controls.enablePan = false;

    var lastY = window.scrollY || 0;
    var currentSpeed = 0.55;
    var targetSpeed = 0.55;
    var orbitAngle = 0;
    var s1 = document.getElementById('schoolSatellite1');
    var s2 = document.getElementById('schoolSatellite2');
    var s3 = document.getElementById('schoolSatellite3');

    window.addEventListener('scroll', function () {
      var y = window.scrollY || 0;
      var dy = y - lastY;
      lastY = y;
      var dir = dy >= 0 ? 1 : -1;
      targetSpeed = dir * (0.55 + Math.min(Math.abs(dy) * 0.018, 2.7));
    }, { passive: true });

    function animate() {
      currentSpeed += (targetSpeed - currentSpeed) * 0.14;
      targetSpeed += ((targetSpeed >= 0 ? 0.55 : -0.55) - targetSpeed) * 0.05;
      controls.autoRotateSpeed = currentSpeed;
      orbitAngle += currentSpeed * 0.58;
      var radius = globeHost.clientWidth * 0.56;
      positionSatellite(s1, orbitAngle - 40, radius);
      positionSatellite(s2, orbitAngle + 92, radius * 0.95);
      positionSatellite(s3, orbitAngle + 214, radius * 1.01);
      requestAnimationFrame(animate);
    }
    animate();

    function resize() {
      globe.width(globeHost.clientWidth).height(globeHost.clientHeight);
      updateSceneTop();
    }
    window.addEventListener('resize', resize);
  }

  loadScript('https://unpkg.com/globe.gl@2.45.0/dist/globe.gl.min.js')
    .then(initGlobe)
    .catch(function () {
      globeHost.style.display = 'none';
    });
})();
