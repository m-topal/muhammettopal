(function () {
  var globeHost = document.getElementById('academicGlobe');
  var mapHost = document.getElementById('academicTopMap');
  if (!globeHost || !mapHost) return;

  function updateSceneTop() {
    var scene = document.querySelector('.academic-world-scene');
    var globe = document.getElementById('academicGlobe');
    var nav = document.querySelector('.sticky-nav, .nav-wrap');
    if (!scene || !globe || !nav) return;

    var clearance = window.innerWidth <= 900 ? 72 : 96;
    var topBoundary = Math.max(0, Math.ceil(nav.getBoundingClientRect().bottom + clearance));
    var bottomBoundary = window.innerHeight;

    var footer = document.querySelector('.footer');
    if (footer) {
      var footerRect = footer.getBoundingClientRect();
      if (footerRect.top < window.innerHeight) {
        bottomBoundary = Math.max(topBoundary + 180, Math.floor(footerRect.top - clearance));
      }
    }

    var baseSize = Math.min(630, window.innerWidth * 0.60);
    if (window.innerWidth <= 900) baseSize = Math.min(470, window.innerWidth * 0.78);
    var availableHeight = Math.max(180, bottomBoundary - topBoundary);
    var globeSize = Math.min(baseSize, availableHeight);
    var centerY = topBoundary + (globeSize / 2);

    scene.style.setProperty('--academic-globe-size', globeSize + 'px');
    scene.style.setProperty('--academic-globe-center-y', centerY + 'px');
  }

  function injectFooterRange() {
    document.querySelectorAll('.footer').forEach(function (footer) {
      if (footer.querySelector('.academic-footer-range')) return;
      var deco = document.createElement('div');
      deco.className = 'academic-footer-range';
      deco.setAttribute('aria-hidden', 'true');
      deco.innerHTML = '<div class="academic-mountain-art academic-mountain-art-footer"><img src="/assets/img/academic-mountain-range-continuous.png" alt=""></div>'
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

  mapHost.innerHTML = '<div class="academic-mountain-art academic-mountain-art-top"><img src="/assets/img/academic-mountain-range-continuous.png" alt=""></div>'

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
