/*
  Site-wide scroll background for muhammettopal.com, v2.
  Fixes the v1 bug: blending one custom raw projection between flat and
  orthographic produced degenerate geometry (the diamond-shaped artifacts
  cutting across text). This version renders two separate, correctly
  configured d3 projections, a flat map and a globe, and crossfades
  their opacity as the page scrolls, instead of interpolating coordinates.
  Requires d3 v7 and topojson-client, loaded before this file.
*/

(function () {
  "use strict";

  var CITIES = [
    { id: "istanbul", lon: 28.9784, lat: 41.0082, img: "istanbul.png" },
    { id: "paris", lon: 2.3522, lat: 48.8566, img: "paris.png" },
    { id: "tucson", lon: -110.9747, lat: 32.2226, img: "tucson.png" }
  ];
  var BUILDING_IMG_BASE = (window.TOPAL_ASSET_BASE || "/assets/") + "img/globe/";

  var wrap = document.getElementById("globe-bg");
  if (!wrap) return;

  var flatGroup = document.getElementById("globe-bg-flat");
  var globeGroup = document.getElementById("globe-bg-globe");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  var graticule = d3.geoGraticule10();

  function buildScene(group, withGlow) {
    var sphere = group.querySelector(".gb-sphere");
    var grat = group.querySelector(".gb-graticule");
    var land = group.querySelector(".gb-land");
    var connections = group.querySelector(".gb-connections");
    var markers = group.querySelector(".gb-markers");

    var connectionEls = [
      [CITIES[0], CITIES[1]],
      [CITIES[1], CITIES[2]],
      [CITIES[2], CITIES[0]]
    ].map(function (pair) {
      var el = document.createElementNS("http://www.w3.org/2000/svg", "path");
      el.setAttribute("class", "globe-connection");
      connections.appendChild(el);
      return { el: el, a: pair[0], b: pair[1] };
    });

    var markerEls = {};
    CITIES.forEach(function (city) {
      var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", "globe-city-marker");

      if (withGlow) {
        var glow = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        glow.setAttribute("r", 5);
        glow.setAttribute("class", "globe-city-glow");
        g.appendChild(glow);
      }

      var dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("r", 3);
      dot.setAttribute("class", "globe-city-dot");
      g.appendChild(dot);

      var img = document.createElementNS("http://www.w3.org/2000/svg", "image");
      img.setAttribute("class", "globe-city-building");
      img.setAttribute("width", 34);
      img.setAttribute("height", 34);
      img.setAttribute("x", -17);
      img.setAttribute("y", -40);
      img.setAttributeNS("http://www.w3.org/1999/xlink", "href", BUILDING_IMG_BASE + city.img);
      img.addEventListener("error", function () { img.style.display = "none"; });
      g.appendChild(img);

      markers.appendChild(g);
      markerEls[city.id] = g;
    });

    return { sphere: sphere, grat: grat, land: land, connectionEls: connectionEls, markerEls: markerEls };
  }

  var flatScene = buildScene(flatGroup, false);
  var globeScene = buildScene(globeGroup, true);

  function drawScene(scene, projection, depthOf) {
    var path = d3.geoPath(projection);
    scene.sphere.setAttribute("d", path({ type: "Sphere" }) || "");
    scene.grat.setAttribute("d", path(graticule) || "");
    if (window.__globeBgWorld) {
      scene.land.setAttribute("d", path(window.__globeBgWorld) || "");
    }

    CITIES.forEach(function (city) {
      var g = scene.markerEls[city.id];
      var coords = projection([city.lon, city.lat]);
      if (!coords) { g.style.opacity = 0; return; }
      var depth = depthOf ? depthOf(city) : 1;
      g.setAttribute("transform", "translate(" + coords[0] + "," + coords[1] + ")");
      g.style.opacity = depthOf ? Math.max(0, Math.min(1, depth + 0.4)) : 1;
    });

    scene.connectionEls.forEach(function (c) {
      var line = { type: "LineString", coordinates: [[c.a.lon, c.a.lat], [c.b.lon, c.b.lat]] };
      c.el.setAttribute("d", path(line) || "");
      var depthA = depthOf ? depthOf(c.a) : 1;
      var depthB = depthOf ? depthOf(c.b) : 1;
      var minDepth = Math.min(depthA, depthB);
      c.el.style.opacity = depthOf ? Math.max(0, minDepth * 0.5 + 0.1) : 0.4;
    });
  }

  function interpolateView(rotateProgress) {
    if (rotateProgress <= 0.5) {
      var interp1 = d3.geoInterpolate(
        [CITIES[0].lon, CITIES[0].lat],
        [CITIES[1].lon, CITIES[1].lat]
      );
      return interp1(rotateProgress / 0.5);
    }
    var interp2 = d3.geoInterpolate(
      [CITIES[1].lon, CITIES[1].lat],
      [CITIES[2].lon, CITIES[2].lat]
    );
    return interp2((rotateProgress - 0.5) / 0.5);
  }

  function render(progress) {
    var width = window.innerWidth;
    var height = window.innerHeight;

    // 0 to 0.35: flat map visible, fading out. 0.35 to 1: globe fading
    // in and rotating through the three cities.
    var fadeT = Math.min(1, progress / 0.35);
    var rotateProgress = Math.min(1, Math.max(0, (progress - 0.35) / 0.65));

    flatGroup.style.opacity = 1 - fadeT;
    globeGroup.style.opacity = fadeT;

    if (fadeT < 1) {
      var flatProjection = d3.geoEquirectangular()
        .fitSize([width * 0.94, height * 0.9], { type: "Sphere" })
        .translate([width / 2, height / 2]);
      drawScene(flatScene, flatProjection, null);
    }

    if (fadeT > 0) {
      var center = interpolateView(rotateProgress);
      var lon = center[0];
      var lat = center[1];
      var globeProjection = d3.geoOrthographic()
        .scale(Math.min(width, height) * 0.4)
        .translate([width / 2, height / 2])
        .rotate([-lon, -lat])
        .clipAngle(90)
        .precision(0.3);

      function depthOf(city) {
        var d = d3.geoDistance([lon, lat], [city.lon, city.lat]);
        return 1 - d / (Math.PI / 2);
      }
      drawScene(globeScene, globeProjection, depthOf);
    }
  }

  fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
    .then(function (res) { return res.json(); })
    .then(function (world) {
      window.__globeBgWorld = topojson.feature(world, world.objects.countries);
      render(currentProgress());
    })
    .catch(function () {
      // Graticule, dots, and connections still render without coastlines.
    });

  function currentProgress() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return 0;
    return Math.min(1, Math.max(0, window.scrollY / max));
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      render(currentProgress());
      ticking = false;
    });
  }

  render(0);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
})();
