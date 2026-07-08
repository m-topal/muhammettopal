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
            <g stroke="rgba(78,94,109,.26)" stroke-width="2">
              <path d="M0 146 C88 146 120 140 166 140 C216 140 252 116 300 80 C336 54 366 40 398 40 C430 40 456 56 482 72 C508 88 538 96 572 96 C610 96 646 82 682 58 C720 34 752 18 784 18 C820 18 852 36 882 62 C914 88 946 100 984 100 C1026 100 1062 68 1100 28 C1134 -8 1160 -18 1186 -18 C1218 -18 1248 8 1280 42 C1318 82 1352 100 1392 100 C1432 100 1468 86 1502 66 C1534 48 1568 40 1600 40"/>
              <path d="M148 146C414 120 788 122 1140 126C1320 128 1476 136 1600 144"/>
              <path d="M222 142v-26m0 0l-10 11h8l-11 12h8l-11 12m16-35l10 11h-8l11 12h-8l11 12"/>
              <path d="M250 143v-20m0 0l-8 8h6l-9 10h7l-9 10m12-28l8 8h-6l9 10h-7l9 10"/>
              <path d="M278 144v-16m0 0l-6 7h5l-8 8h6l-8 9m11-24l6 7h-5l8 8h-6l8 9"/>
              <circle cx="1188" cy="14" r="18"/>
            </g>
            <g stroke="rgba(124,160,194,.10)" stroke-width="1.3">
              <path d="M150 148C406 126 712 124 1020 128C1224 130 1418 136 1578 148"/>
            </g>
          </g>
        </svg>`
      footer.appendChild(deco);
    });
  }

  function dockFooterSatellites() {
    var footer = document.querySelector('.footer');
    if (!footer) return;
    var deco = footer.querySelector('.academic-footer-range');
    if (!deco) return;
    var dock = deco.querySelector('.footer-satellite-dock');
    if (!dock) {
      dock = document.createElement('div');
      dock.className = 'footer-satellite-dock';
      deco.appendChild(dock);
    }
    ['schoolSatellite1','schoolSatellite2','schoolSatellite3'].forEach(function(id, idx) {
      var el = document.getElementById(id);
      if (!el) return;
      el.classList.add('footer-school-satellite', 'footer-school-satellite-' + (idx + 1));
      dock.appendChild(el);
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
  dockFooterSatellites();
  collapseAndTrimPanels();
  harmonizePresentationAccordions();
  window.addEventListener('scroll', updateSceneTop, { passive: true });
  window.addEventListener('resize', updateSceneTop);
  window.addEventListener('load', function () {
    updateSceneTop();
    injectFooterRange();
    dockFooterSatellites();
    collapseAndTrimPanels();
    harmonizePresentationAccordions();
  });
  document.addEventListener('DOMContentLoaded', function () {
    updateSceneTop();
    injectFooterRange();
    dockFooterSatellites();
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
        <g stroke="rgba(78,94,109,.22)" stroke-width="2.05">
          <path d="M0 228 C88 228 122 220 168 220 C218 220 256 194 304 158 C338 132 368 118 400 118 C432 118 458 134 484 152 C510 170 540 178 576 178 C612 178 648 164 684 138 C722 112 754 96 786 96 C820 96 848 112 876 138 C906 164 942 178 980 178 C1020 178 1058 146 1094 104 C1128 64 1158 44 1190 44 C1220 44 1248 66 1278 98 C1312 134 1346 158 1386 158 C1426 158 1462 140 1498 112 C1534 84 1568 70 1600 70"/>
          <path d="M158 220 C230 220 288 214 344 206 C394 198 438 174 482 144 C512 154 544 164 580 170 C620 176 662 178 706 178 C752 178 798 172 844 164 C892 156 936 152 978 152 C1018 152 1060 156 1102 164 C1148 172 1190 176 1232 176 C1278 176 1320 168 1362 156 C1406 144 1446 136 1484 136 C1522 136 1562 144 1600 154"/>
          <path d="M398 177v-26m0 0l-10 10h8l-11 12h8l-11 12m16-34l10 10h-8l11 12h-8l11 12"/>
          <path d="M428 179v-20m0 0l-8 8h6l-9 10h7l-9 10m12-28l8 8h-6l9 10h-7l9 10"/>
          <path d="M458 182v-16m0 0l-6 7h5l-8 8h6l-8 9m11-24l6 7h-5l8 8h-6l8 9"/>
          <circle cx="1190" cy="56" r="22"/>
        </g>
        <g stroke="rgba(124,160,194,.14)" stroke-width="1.45">
          <path d="M280 232C520 206 848 204 1140 214C1310 220 1452 224 1550 228"/>
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
