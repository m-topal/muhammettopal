(function () {
  var globeHost = document.getElementById('academicGlobe');
  var mapHost = document.getElementById('academicTopMap');
  if (!globeHost || !mapHost) return;

  function updateSceneTop() {
    var scene = document.querySelector('.academic-world-scene');
    var nav = document.querySelector('.sticky-nav, .nav-wrap');
    if (!scene || !nav) return;
    var bottom = Math.max(0, Math.ceil(nav.getBoundingClientRect().bottom + 16));
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
          <g fill="none" stroke="rgba(78,94,109,.48)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M0 138 C58 138, 72 86, 112 86 C151 86, 169 125, 205 125 C248 125, 266 64, 322 64 C378 64, 391 96, 429 96 C467 96, 487 34, 560 34 C631 34, 650 74, 689 74 C738 74, 758 25, 826 25 C891 25, 911 61, 964 61 C1010 61, 1028 40, 1088 40 C1161 40, 1180 92, 1239 92 C1285 92, 1310 48, 1372 48 C1431 48, 1454 120, 1510 120 C1542 120, 1563 93, 1600 93"/>
            <path d="M0 148 C46 148, 68 118, 116 118 C152 118, 179 142, 220 142 C282 142, 301 82, 362 82 C432 82, 449 125, 502 125 C557 125, 578 72, 648 72 C710 72, 729 101, 778 101 C827 101, 848 83, 905 83 C960 83, 980 120, 1040 120 C1103 120, 1128 88, 1186 88 C1248 88, 1266 131, 1320 131 C1393 131, 1411 78, 1491 78 C1543 78, 1569 108, 1600 108"/>
          </g>
        </svg>`;
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
        <!-- Subtle meridian / parallel structure retained from the current site. -->
        <g stroke="rgba(124,142,156,.10)" stroke-width="1">
          <path d="M170 0V300M370 0V300M570 0V300M770 0V300M970 0V300M1170 0V300M1370 0V300"/>
          <path d="M0 84H1600M0 164H1600M0 244H1600"/>
        </g>

        <!-- Refined continuous mountain range, with even peaks, pine trees, and sun. -->
        <g stroke="rgba(78,94,109,.22)" stroke-width="2.05">
          <path d="M0 236 C70 236 95 211 147 211 C196 211 220 220 263 220 C314 220 344 184 393 184 C438 184 467 205 510 205 C555 205 582 179 628 179 C676 179 703 202 746 202 C795 202 826 158 878 158 C930 158 961 189 1005 189 C1055 189 1082 163 1128 163 C1177 163 1207 191 1254 191 C1302 191 1330 168 1376 168 C1427 168 1456 207 1502 207 C1542 207 1567 196 1600 196"/>
          <path d="M31 234 C104 222 151 196 205 157 C243 130 276 114 315 114 C359 114 391 153 429 153 C470 153 505 115 544 115 C584 115 622 146 660 146 C705 146 741 105 786 105 C827 105 853 80 891 63 C931 89 951 121 982 135 C1017 151 1044 138 1070 121 C1100 145 1121 160 1151 160 C1183 160 1204 135 1233 118 C1260 137 1283 155 1310 155 C1340 155 1362 128 1392 112 C1422 134 1442 153 1471 153 C1510 153 1533 183 1573 190"/>
          <path d="M164 219 C210 207 253 176 296 145 C336 172 373 198 418 208"/>
          <path d="M473 204 C519 191 565 161 608 132 C648 160 686 185 728 200"/>
          <path d="M759 199 C804 181 844 139 891 91 C936 137 973 174 1015 189"/>
          <path d="M1068 188 C1110 174 1153 147 1198 123 C1237 151 1273 178 1314 190"/>
          <path d="M1326 189 C1367 172 1408 145 1450 126 C1488 153 1523 180 1566 191"/>
          <!-- Three small pine trees. -->
          <path d="M411 205v-42m0 0l-14 16h10l-16 18h13l-18 18m25-52l14 16h-10l16 18h-13l18 18"/>
          <path d="M447 211v-31m0 0l-10 12h7l-12 14h9l-13 14m19-40l10 12h-7l12 14h-9l13 14"/>
          <path d="M479 214v-24m0 0l-8 9h6l-10 12h8l-11 12m15-33l8 9h-6l10 12h-8l11 12"/>
          <!-- Sun. -->
          <circle cx="1065" cy="70" r="34"/>
        </g>

        <g stroke="rgba(124,160,194,.18)" stroke-width="1.6">
          <path d="M280 228C450 195 650 187 820 194C1001 201 1160 213 1322 229"/>
        </g>
      </g>
    </svg>`;

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
