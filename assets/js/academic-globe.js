(function () {
  'use strict';

  var canvas = document.getElementById('academicGlobeCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var width = 0, height = 0, cx = 0, cy = 0, radius = 0;
  var rotation = -0.55;
  var targetRotation = rotation;
  var scrollVelocity = 0;
  var lastY = window.scrollY;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var cities = [
    { name: 'Tucson', lat: 32.22, lon: -110.97, main: true },
    { name: 'Paris', lat: 48.86, lon: 2.35, main: true },
    { name: 'Istanbul', lat: 41.01, lon: 28.98, main: true },
    { name: 'London', lat: 51.51, lon: -0.13 },
    { name: 'Cairo', lat: 30.04, lon: 31.24 },
    { name: 'New York', lat: 40.71, lon: -74.01 },
    { name: 'Tokyo', lat: 35.68, lon: 139.69 },
    { name: 'Delhi', lat: 28.61, lon: 77.21 },
    { name: 'Moscow', lat: 55.76, lon: 37.62 },
    { name: 'Mexico City', lat: 19.43, lon: -99.13 }
  ];

  var links = [
    [0,1],[1,2],[0,5],[1,3],[1,4],[2,6],[2,7],[2,8],[5,9],[3,8],[4,7]
  ];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    cx = width * 0.5;
    cy = Math.max(300, Math.min(height * 0.55, 560));
    radius = Math.min(width * 0.31, height * 0.34, 360);
  }

  function toXYZ(lat, lon, extraRot) {
    var phi = (90 - lat) * Math.PI / 180;
    var theta = (lon + extraRot * 180 / Math.PI) * Math.PI / 180;
    return {
      x: Math.sin(phi) * Math.cos(theta),
      y: Math.cos(phi),
      z: Math.sin(phi) * Math.sin(theta)
    };
  }

  function project(p, scale) {
    var perspective = 1 + p.z * 0.12;
    return {
      x: cx + p.x * radius * scale * perspective,
      y: cy - p.y * radius * scale * perspective,
      z: p.z
    };
  }

  function drawHeaderMap() {
    var topH = Math.min(250, height * 0.30);
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = '#667b8d';
    ctx.lineWidth = 1.1;
    var y0 = 18;
    for (var i=0;i<7;i++) {
      var y = y0 + i * (topH/7);
      ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(width,y); ctx.stroke();
    }
    for (var j=0;j<12;j++) {
      var x = j * (width/11);
      ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,topH); ctx.stroke();
    }
    ctx.globalAlpha = 0.20;
    ctx.strokeStyle = '#4f6271';
    ctx.lineWidth = 1.2;
    var continents = [
      [[.03,.18],[.11,.12],[.20,.14],[.27,.22],[.25,.30],[.18,.33],[.14,.42],[.08,.39],[.04,.29]],
      [[.19,.43],[.24,.48],[.27,.59],[.25,.72],[.22,.82],[.19,.70],[.17,.56]],
      [[.39,.16],[.47,.13],[.54,.19],[.60,.17],[.68,.22],[.77,.20],[.86,.26],[.94,.34],[.88,.43],[.76,.42],[.67,.37],[.56,.39],[.47,.31],[.42,.25]],
      [[.49,.39],[.57,.40],[.61,.51],[.58,.66],[.52,.73],[.46,.61],[.45,.49]],
      [[.78,.66],[.85,.68],[.90,.76],[.87,.84],[.80,.82],[.75,.74]]
    ];
    continents.forEach(function(poly){
      ctx.beginPath();
      poly.forEach(function(pt,k){ var x=pt[0]*width,y=pt[1]*topH; if(k===0)ctx.moveTo(x,y); else ctx.lineTo(x,y); });
      ctx.closePath(); ctx.stroke();
    });
    var pts = [[.21,.36],[.50,.29],[.65,.34],[.10,.31],[.42,.23],[.58,.31],[.76,.31],[.87,.39]];
    ctx.strokeStyle = '#7d9ab3'; ctx.lineWidth = 1.25; ctx.globalAlpha=.22;
    for (var k=0;k<pts.length-1;k++) {
      var a=pts[k],b=pts[k+1];
      ctx.beginPath();
      ctx.moveTo(a[0]*width,a[1]*topH);
      var mx=(a[0]+b[0])*width/2, my=Math.min(a[1],b[1])*topH-18;
      ctx.quadraticCurveTo(mx,my,b[0]*width,b[1]*topH);
      ctx.stroke();
    }
    pts.forEach(function(p){
      ctx.fillStyle='rgba(202,101,74,.35)';
      ctx.beginPath(); ctx.arc(p[0]*width,p[1]*topH,2.2,0,Math.PI*2); ctx.fill();
    });
    ctx.restore();
  }

  function drawGlobe() {
    ctx.save();
    ctx.translate(0,0);
    var grad = ctx.createRadialGradient(cx-radius*.28,cy-radius*.35,radius*.05,cx,cy,radius);
    grad.addColorStop(0,'rgba(255,255,255,.18)');
    grad.addColorStop(.65,'rgba(120,153,181,.08)');
    grad.addColorStop(1,'rgba(56,75,91,.03)');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(cx,cy,radius,0,Math.PI*2); ctx.fill();

    ctx.strokeStyle='rgba(62,77,90,.18)'; ctx.lineWidth=1.1;
    ctx.beginPath(); ctx.arc(cx,cy,radius,0,Math.PI*2); ctx.stroke();

    for (var lat=-60; lat<=60; lat+=30) {
      ctx.beginPath();
      for (var lon=-180; lon<=180; lon+=4) {
        var p=project(toXYZ(lat,lon,rotation),1);
        if (p.z < -0.02) continue;
        if (lon===-180) ctx.moveTo(p.x,p.y); else ctx.lineTo(p.x,p.y);
      }
      ctx.strokeStyle='rgba(75,91,105,.10)'; ctx.lineWidth=0.8; ctx.stroke();
    }
    for (var lon2=-150; lon2<=150; lon2+=30) {
      ctx.beginPath(); var started=false;
      for (var lat2=-88; lat2<=88; lat2+=3) {
        var q=project(toXYZ(lat2,lon2,rotation),1);
        if (q.z < -0.02) { started=false; continue; }
        if (!started) { ctx.moveTo(q.x,q.y); started=true; } else ctx.lineTo(q.x,q.y);
      }
      ctx.strokeStyle='rgba(75,91,105,.10)'; ctx.lineWidth=0.8; ctx.stroke();
    }

    var projected = cities.map(function(c){ return project(toXYZ(c.lat,c.lon,rotation),1); });
    links.forEach(function(link){
      var a=projected[link[0]], b=projected[link[1]];
      if (a.z < 0 || b.z < 0) return;
      var mx=(a.x+b.x)/2, my=(a.y+b.y)/2 - 35 - Math.abs(a.x-b.x)*.05;
      ctx.strokeStyle='rgba(109,146,180,.20)'; ctx.lineWidth=5;
      ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.quadraticCurveTo(mx,my,b.x,b.y); ctx.stroke();
      ctx.strokeStyle='rgba(100,140,176,.48)'; ctx.lineWidth=1.25;
      ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.quadraticCurveTo(mx,my,b.x,b.y); ctx.stroke();
      ctx.strokeStyle='rgba(100,140,176,.25)'; ctx.lineWidth=.75;
      ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.quadraticCurveTo(mx,my+10,b.x,b.y); ctx.stroke();
    });

    projected.forEach(function(p,i){
      if (p.z < 0) return;
      var main=cities[i].main;
      ctx.fillStyle=main?'rgba(205,102,74,.55)':'rgba(130,158,182,.38)';
      ctx.beginPath(); ctx.arc(p.x,p.y,main?3.2:2,0,Math.PI*2); ctx.fill();
      if(main){ ctx.fillStyle='rgba(205,102,74,.10)'; ctx.beginPath(); ctx.arc(p.x,p.y,10,0,Math.PI*2); ctx.fill(); }
    });

    ctx.strokeStyle='rgba(103,132,156,.16)'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.ellipse(cx,cy,radius*1.22,radius*.34,-.22,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx,cy,radius*1.08,radius*.25,.34,0,Math.PI*2); ctx.stroke();
    ctx.restore();
  }

  function frame() {
    ctx.clearRect(0,0,width,height);
    drawHeaderMap();
    drawGlobe();
    if (!reduced) {
      rotation += 0.0007 + Math.min(Math.abs(scrollVelocity)*0.00008,0.008);
      scrollVelocity *= 0.90;
    }
    requestAnimationFrame(frame);
  }

  window.addEventListener('scroll', function(){
    var y=window.scrollY;
    scrollVelocity += y-lastY;
    lastY=y;
  }, {passive:true});
  window.addEventListener('resize', resize);
  resize();
  frame();
})();
