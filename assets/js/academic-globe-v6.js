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
      .atmosphereColor('#9db8c8')
      .atmosphereAltitude(0.10)
      .pointsData(cities)
      .pointLat('lat')
      .pointLng('lng')
      .pointAltitude(0.012)
      .pointRadius(0.18)
      .pointColor(function () { return 'rgba(187,108,88,.72)'; })
      .ringsData(cities.slice(0, 3))
      .ringLat('lat')
      .ringLng('lng')
      .ringColor(function () { return function (t) { return 'rgba(137,168,190,' + (1 - t) * 0.30 + ')'; }; })
      .ringMaxRadius(2.4)
      .ringPropagationSpeed(0.55)
      .ringRepeatPeriod(1800)
      .arcsData(arcs)
      .arcStartLat('startLat')
      .arcStartLng('startLng')
      .arcEndLat('endLat')
      .arcEndLng('endLng')
      .arcColor(function () { return 'rgba(111,151,180,.56)'; })
      .arcAltitude(0.22)
      .arcStroke(0.34)
      .arcDashLength(0.44)
      .arcDashGap(0.10)
      .arcDashInitialGap(function () { return Math.random(); })
      .arcDashAnimateTime(3000)
      .enablePointerInteraction(false);

    var material = globe.globeMaterial();
    material.color.set('#d6e0e5');
    material.transparent = true;
    material.opacity = 0.20;
    material.wireframe = true;

    globe.pointOfView({ lat: 33, lng: -20, altitude: 1.72 }, 0);

    var controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.18;
    controls.enableZoom = false;
    controls.enablePan = false;

    var lastY = window.scrollY;
    var boost = 0;
    window.addEventListener('scroll', function () {
      var now = window.scrollY;
      boost = Math.min(Math.abs(now - lastY) * 0.008, 1.5);
      lastY = now;
      controls.autoRotateSpeed = 0.18 + boost;
      clearTimeout(window.__academicGlobeScrollTimer);
      window.__academicGlobeScrollTimer = setTimeout(function () {
        controls.autoRotateSpeed = 0.18;
      }, 180);
    }, { passive: true });

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
