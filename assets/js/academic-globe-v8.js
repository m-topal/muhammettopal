(function () {
  var host = document.getElementById('academicGlobe');
  if (!host) return;

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
    if (!window.Globe) return;

    var cities = [
      { name: 'Tucson', lat: 32.2226, lng: -110.9747 },
      { name: 'Paris', lat: 48.8566, lng: 2.3522 },
      { name: 'Istanbul', lat: 41.0082, lng: 28.9784 },
      { name: 'London', lat: 51.5072, lng: -0.1276 },
      { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
      { name: 'New York', lat: 40.7128, lng: -74.0060 }
    ];

    var arcs = [
      { startLat: 32.2226, startLng: -110.9747, endLat: 48.8566, endLng: 2.3522 },
      { startLat: 48.8566, startLng: 2.3522, endLat: 41.0082, endLng: 28.9784 },
      { startLat: 51.5072, startLng: -0.1276, endLat: 30.0444, endLng: 31.2357 },
      { startLat: 40.7128, startLng: -74.0060, endLat: 48.8566, endLng: 2.3522 },
      { startLat: 30.0444, startLng: 31.2357, endLat: 41.0082, endLng: 28.9784 }
    ];

    var globe = Globe()(host)
      .width(host.clientWidth)
      .height(host.clientHeight)
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(true)
      .atmosphereColor('#a9c0cd')
      .atmosphereAltitude(0.09)
      .pointsData(cities)
      .pointLat('lat')
      .pointLng('lng')
      .pointAltitude(0.014)
      .pointRadius(0.16)
      .pointColor(function () { return 'rgba(183,101,80,.76)'; })
      .ringsData(cities.slice(0, 3))
      .ringLat('lat')
      .ringLng('lng')
      .ringColor(function () { return function (t) { return 'rgba(119,158,184,' + ((1 - t) * 0.28) + ')'; }; })
      .ringMaxRadius(2.1)
      .ringPropagationSpeed(0.48)
      .ringRepeatPeriod(1900)
      .arcsData(arcs)
      .arcStartLat('startLat')
      .arcStartLng('startLng')
      .arcEndLat('endLat')
      .arcEndLng('endLng')
      .arcColor(function () { return 'rgba(96,142,174,.58)'; })
      .arcAltitude(0.19)
      .arcStroke(0.32)
      .arcDashLength(0.54)
      .arcDashGap(0.10)
      .arcDashInitialGap(function () { return Math.random(); })
      .arcDashAnimateTime(3200)
      .enablePointerInteraction(false);

    var material = globe.globeMaterial();
    material.color.set('#dbe4e8');
    material.transparent = true;
    material.opacity = 0.25;
    material.wireframe = false;
    material.roughness = 0.88;
    material.metalness = 0;

    fetch('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(function (res) { return res.json(); })
      .then(function (countries) {
        globe
          .polygonsData(countries.features)
          .polygonAltitude(0.006)
          .polygonCapColor(function () { return 'rgba(218,226,230,.40)'; })
          .polygonSideColor(function () { return 'rgba(179,196,204,.15)'; })
          .polygonStrokeColor(function () { return 'rgba(89,111,123,.62)'; });
      })
      .catch(function () {
        material.wireframe = true;
        material.opacity = 0.18;
      });

    globe.pointOfView({ lat: 31, lng: -18, altitude: 1.68 }, 0);

    var controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.16;
    controls.enableZoom = false;
    controls.enablePan = false;

    var lastY = window.scrollY;
    var timer;
    var baseLng = -18;

    function rotateWithScroll() {
      var now = window.scrollY;
      var delta = Math.abs(now - lastY);
      lastY = now;

      // Directly tie longitude to scroll so the globe visibly turns as the page moves.
      var lng = ((baseLng + now * 0.055 + 540) % 360) - 180;
      globe.pointOfView({ lat: 31, lng: lng, altitude: 1.68 }, 0);

      controls.autoRotateSpeed = 0.12 + Math.min(delta * 0.004, 0.65);
      clearTimeout(timer);
      timer = setTimeout(function () {
        controls.autoRotateSpeed = 0.12;
      }, 180);
    }

    rotateWithScroll();
    window.addEventListener('scroll', rotateWithScroll, { passive: true });

    function resize() {
      globe.width(host.clientWidth).height(host.clientHeight);
    }
    window.addEventListener('resize', resize);
  }

  loadScript('https://unpkg.com/globe.gl@2.45.0/dist/globe.gl.min.js')
    .then(initGlobe)
    .catch(function () {
      host.style.display = 'none';
    });
})();
