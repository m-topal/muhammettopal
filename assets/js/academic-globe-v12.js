(function () {
  var globeHost = document.getElementById('academicGlobe');
  var mapHost = document.getElementById('academicTopMap');
  if (!globeHost || !mapHost) return;

  mapHost.innerHTML = `
    <svg viewBox="0 0 1600 430" preserveAspectRatio="none" width="100%" height="100%" aria-hidden="true">
      <g fill="none" stroke-linecap="round" stroke-linejoin="round">
        <g stroke="rgba(78,94,109,.20)" stroke-width="1.35">
          <path d="M62 135l79-46 91 9 78 38 61 55 46-4 55 31 24 32-14 31-52 16-43 42-77 3-68 38-67-13-91-19-36-60 15-35-54-7-41-47 14-35 28-23-7-31 22-34z"/>
          <path d="M330 280l56 41 25 61-11 47 26 49 46 84-10 46-38 31-28-20-17-45-36-56-31-112-16-71-8-41 16-14z"/>
          <path d="M651 98l58-15 67 8 33 24 33-9 62 7 41 24 58-3 56 17 45 30 61 3 77 29 70 48 40 51-11 25-52 14-37 25 16 36-23 11-49-13-47 14-35-8-36-37-51-30-71 2-45-17-42 20-75-5-47-34-33-4-30-33 13-27-7-26-31-3-49 18-50-9-6-35-40-29 14-28 31-10z"/>
          <path d="M839 282l70 8 52 42 11 54-24 72-50 56-69 5-50-34-25-52 5-61 31-52 49-38z"/>
          <path d="M1260 300l54 8 67 28 40 40 14 45-18 38-47 17-51-7-31-35-36-24-22-43 10-32 20-20z"/>
          <path d="M1420 350l74 8 53 28 31 34-7 28-32 17-52-7-62-23-20-31 15-24z"/>
        </g>
        <g stroke="rgba(124,142,156,.12)" stroke-width=".85">
          <path d="M0 130H1600M0 220H1600M0 310H1600"/>
          <path d="M170 0V430M370 0V430M570 0V430M770 0V430M970 0V430M1170 0V430M1370 0V430"/>
        </g>
        <g stroke="rgba(124,160,194,.18)" stroke-width="1.7">
          <path d="M325 280C500 184 646 184 804 212C900 228 990 232 1078 245"/>
          <path d="M804 212C866 178 928 151 1000 126"/>
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
      .atmosphereAltitude(0.09)
      .pointsData([])
      .ringsData([])
      .arcsData(arcs)
      .arcStartLat('startLat')
      .arcStartLng('startLng')
      .arcEndLat('endLat')
      .arcEndLng('endLng')
      .arcColor(function () { return 'rgba(96,142,174,.50)'; })
      .arcAltitude(0.19)
      .arcStroke(0.28)
      .arcDashLength(0.48)
      .arcDashGap(0.12)
      .arcDashInitialGap(function () { return Math.random(); })
      .arcDashAnimateTime(2800)
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
          .polygonStrokeColor(function () { return 'rgba(89,111,123,.62)'; });
      })
      .catch(function () {
        material.wireframe = true;
        material.opacity = 0.20;
      });

    /* Turkey centered on initial load. */
    globe.pointOfView({ lat: 39.0, lng: 35.0, altitude: 1.72 }, 0);

    var controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.28;
    controls.enableZoom = false;
    controls.enablePan = false;

    var lastY = window.scrollY || 0;
    var currentSpeed = 0.28;
    var targetSpeed = 0.28;
    var orbitAngle = 0;
    var s1 = document.getElementById('schoolSatellite1');
    var s2 = document.getElementById('schoolSatellite2');
    var s3 = document.getElementById('schoolSatellite3');

    window.addEventListener('scroll', function () {
      var y = window.scrollY || 0;
      var dy = y - lastY;
      lastY = y;
      var dir = dy >= 0 ? 1 : -1;
      targetSpeed = dir * (0.28 + Math.min(Math.abs(dy) * 0.012, 1.9));
    }, { passive: true });

    function animate() {
      currentSpeed += (targetSpeed - currentSpeed) * 0.14;
      targetSpeed += ((targetSpeed >= 0 ? 0.28 : -0.28) - targetSpeed) * 0.035;
      controls.autoRotateSpeed = currentSpeed;
      orbitAngle += currentSpeed * 0.52;
      var radius = globeHost.clientWidth * 0.54;
      positionSatellite(s1, orbitAngle - 35, radius);
      positionSatellite(s2, orbitAngle + 92, radius * 0.94);
      positionSatellite(s3, orbitAngle + 212, radius * 1.02);
      requestAnimationFrame(animate);
    }
    animate();

    function resize() {
      globe.width(globeHost.clientWidth).height(globeHost.clientHeight);
    }
    window.addEventListener('resize', resize);
  }

  loadScript('https://unpkg.com/globe.gl@2.45.0/dist/globe.gl.min.js')
    .then(initGlobe)
    .catch(function () {
      globeHost.style.display = 'none';
    });
})();
