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
  window.addEventListener('scroll', updateSceneTop, { passive: true });
  window.addEventListener('resize', updateSceneTop);
  window.addEventListener('load', function () {
    updateSceneTop();
    injectFooterRange();
    collapseAndTrimPanels();
  });
  document.addEventListener('DOMContentLoaded', function () {
    updateSceneTop();
    injectFooterRange();
    collapseAndTrimPanels();
  });

  mapHost.innerHTML = `
    <svg viewBox="0 0 1600 260" preserveAspectRatio="none" width="100%" height="100%" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke-linecap="round" stroke-linejoin="round">
        <g stroke="rgba(124,142,156,.10)" stroke-width="1">
          <path d="M170 0V260M370 0V260M570 0V260M770 0V260M970 0V260M1170 0V260M1370 0V260"/>
          <path d="M0 78H1600M0 156H1600M0 234H1600"/>
        </g>
        <g stroke="rgba(78,94,109,.22)" stroke-width="2.1">
          <path d="M0 187 C62 187, 84 126, 132 126 C184 126, 201 167, 247 167 C296 167, 319 104, 391 104 C461 104, 477 139, 529 139 C585 139, 603 69, 691 69 C776 69, 794 114, 846 114 C900 114, 918 58, 985 58 C1052 58, 1067 99, 1123 99 C1179 99, 1204 74, 1262 74 C1342 74, 1360 146, 1434 146 C1490 146, 1517 112, 1600 112"/>
          <path d="M0 205 C44 205, 72 176, 121 176 C171 176, 198 193, 247 193 C310 193, 332 144, 406 144 C464 144, 486 179, 543 179 C603 179, 623 121, 700 121 C777 121, 795 150, 851 150 C905 150, 924 131, 979 131 C1038 131, 1061 167, 1123 167 C1188 167, 1216 143, 1279 143 C1338 143, 1365 185, 1431 185 C1495 185, 1524 159, 1600 159"/>
        </g>
        <g stroke="rgba(124,160,194,.18)" stroke-width="1.6">
          <path d="M292 196C431 150 621 136 792 146C958 156 1107 171 1250 185"/>
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
    material.color.set('#f6f4ef');
    material.transparent = true;
    material.opacity = 0.92;
    material.wireframe = false;
    material.roughness = 0.92;
    material.metalness = 0;

    fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson')
      .then(function (res) { return res.json(); })
      .then(function (land) {
        globe
          .polygonsData(land.features)
          .polygonAltitude(0.004)
          .polygonCapColor(function () { return 'rgba(237,241,242,.22)'; })
          .polygonSideColor(function () { return 'rgba(237,241,242,.03)'; })
          .polygonStrokeColor(function () { return 'rgba(101,116,126,.34)'; })
          .polygonsTransitionDuration(0);
      })
      .catch(function () {
        material.wireframe = true;
        material.opacity = 0.16;
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
