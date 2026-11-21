'use strict';
// Bucle principal: física, nadar, cámara y animaciones de cada cuadro.

/* ---------------- BUCLE ---------------- */
const clock = new THREE.Clock();
const camPos = new THREE.Vector3(0, 30, 50), camLook = new THREE.Vector3(0, 0, 0);
let fallTop = 0.5;
let swimming = false, wasSwimming = false, riverTold = false;
let walkT = 0, mapT = 0, wasOnStage = false, airT = 0, lastSaveSec = -1;
function update(dt, t) {
  // movimiento
  let mx = 0, mz = 0;
  if (selecting) { target = null; waypoints = []; onArrive = null; mining = null; Object.keys(keys).forEach(k => keys[k] = false); }
  if (started && !panelOpen && !selecting) {
    if (keys.w || keys.arrowup) mz -= 1; if (keys.s || keys.arrowdown) mz += 1;
    if (keys.a || keys.arrowleft) mx -= 1; if (keys.d || keys.arrowright) mx += 1;
  }
  if (muriendo) { mx = 0; mz = 0; target = null; } // sin moverse mientras pierdes una vida
  const p = player.position; let moving = false;
  const speed = (keys.shift ? 8.5 : 5) * (swimming ? 0.35 : 1);
  if (mx || mz) { target = null; waypoints = []; onArrive = null; marker.visible = false; const l = Math.hypot(mx, mz); mx /= l; mz /= l;
    const c = Math.cos(camYaw), sN = Math.sin(camYaw); const wx = mx * c + mz * sN, wz = -mx * sN + mz * c; mx = wx; mz = wz; }
  else if (target && !mining) {
    const dx = target[0] - p.x, dz = target[1] - p.z, d = Math.hypot(dx, dz);
    if (d < 0.2) { if (waypoints.length) { target = waypoints.shift(); lastDist = Infinity; stuckT = 0; } else { target = null; marker.visible = false; const cb = onArrive; onArrive = null; if (cb) cb(); } }
    else {
      mx = dx / d; mz = dz / d;
      if (d < lastDist - 0.01) { lastDist = d; stuckT = 0; } else if ((stuckT += dt) > 1.2) { target = null; waypoints = []; onArrive = null; marker.visible = false; }
    }
  }
  // Q y R giran la cámara; C la centra
  if (started && !panelOpen && !selecting) { if (keys.q) camYaw += dt * 2; if (keys.r) camYaw -= dt * 2; if (keys.c) { camYaw = 0; camPitch = 1; } }
  autoWalk = !!target && !(keys.w || keys.a || keys.s || keys.d || keys.arrowup || keys.arrowdown || keys.arrowleft || keys.arrowright);
  if (mx || mz) {
    let hitWall = false;
    const nx = p.x + mx * speed * dt, nz = p.z + mz * speed * dt;
    if (!hits(nx, feet, p.z)) p.x = nx; else hitWall = true;
    if (!hits(p.x, feet, nz)) p.z = nz; else hitWall = true;
    // al caminar solo hacia un destino, salta escalones de un bloque
    if (hitWall && (autoWalk || (inCaveArea(p.x, p.z) && feet < 0.4)) && onGround && !hits(p.x + mx * 0.45, feet + 1.05, p.z + mz * 0.45)) { vy = JUMP; onGround = false; }
    const want = Math.atan2(mx, mz); let diff = want - player.rotation.y; diff = Math.atan2(Math.sin(diff), Math.cos(diff)); player.rotation.y += diff * Math.min(1, dt * 14);
    moving = true;
  }
  // en el río: nadas acostado y la corriente te arrastra hacia el hoyo (pasando debajo de los puentes)
  swimming = p.z > -1.65 && p.z < 0.65 && feet < -0.6 && feet > -2.2 && p.x > -17.4 && p.x < 15.8;
  PH = swimming ? 0.8 : 1.7;
  if (swimming) {
    const cx = p.x - 3.4 * dt; if (!hits(cx, feet, p.z)) p.x = cx;                      // corriente hacia el oeste
    const cz = p.z + (-0.5 - p.z) * Math.min(1, dt * 2.5); if (!hits(p.x, feet, cz)) p.z = cz; // al centro del río
    if (!(mx || mz)) { const want = -Math.PI / 2; let diff = want - player.rotation.y; diff = Math.atan2(Math.sin(diff), Math.cos(diff)); player.rotation.y += diff * Math.min(1, dt * 6); }
    if (Math.random() < dt * 6) dust(p.x + 0.4, -0.45, p.z + (Math.random() - 0.5) * 0.6, 1, 0xe0f4ff);
    if (!wasSwimming) { sfx('splash'); dust(p.x, -0.4, p.z, 20, 0x67e8f9); if (!riverTold) { riverTold = true; toast('≈', '¡TE ARRASTRA LA CORRIENTE!', 'El río te lleva', 'Pasarás debajo de los puentes y caerás por el hoyo hasta la cueva.', '#0ea5e9'); } }
  }
  rig.rotation.x = swimming ? -1.35 : 0; if (swimming) rig.position.y = 0.35; else if (wasSwimming) rig.position.y = 0;
  wasSwimming = swimming;
  // al caer al río desde la orilla, te acomoda dentro del cauce para que no quedes colgada del borde
  if (inRiverChannel(p.x, feet, p.z)) p.z = Math.max(-1.15, Math.min(0.15, p.z));
  updateVidas(dt, t);
  // salto y gravedad
  coyote = onGround ? 0.12 : Math.max(0, coyote - dt);
  if (jumpReq > 0) {
    if (coyote > 0 && !panelOpen && vy <= 0.5) { vy = JUMP; onGround = false; coyote = 0; jumpReq = 0; sfx('jump'); }
    else jumpReq = Math.max(0, jumpReq - dt);
  }
  vy -= GRAV * dt;
  let ny = feet + vy * dt;
  fallTop = onGround ? feet : Math.max(fallTop, feet); // altura desde donde empezaste a caer
  if (vy <= 0) {
    if (hits(p.x, ny, p.z)) { ny = Math.floor(ny - 0.5) + 1.5; if (!onGround && vy < -6) { sfx('land'); const g = groundType(); dust(p.x, ny, p.z, 8, dustColor[g] || 0xe5e7eb); } if (!onGround) checkFall(fallTop - ny, ny); vy = 0; onGround = true; }
    else onGround = false;
  } else if (hits(p.x, ny, p.z)) { vy = 0; ny = feet; }
  feet = ny;
  if (feet < -12) { p.set(0, 0.5, 18); feet = 0.5; vy = 0; toast('↺', 'DE VUELTA', 'Regresaste al inicio'); }
  const onStage = p.x > 7.5 && p.x < 14.5 && p.z > 10.5 && p.z < 15.5 && feet > 1.4;
  if (onStage && !wasOnStage) toast('♪', '¡SUBISTE AL ESCENARIO!', playing ? 'A bailar' : 'Pon música para bailar', playing ? '' : 'Pulsa E junto al tocadiscos o M para la música.', '#ec4899');
  wasOnStage = onStage;
  walkT += dt * (moving ? (keys.shift ? 15 : 11) : 0);
  if (moving && onGround && Math.floor(walkT / Math.PI) !== lastStep) { lastStep = Math.floor(walkT / Math.PI); footstep(); if (lastStep % 2 === 0) { const g = groundType(); if (dustColor[g]) dust(p.x, feet, p.z, 2, dustColor[g]); } }
  const sw = moving ? Math.sin(walkT) * 0.7 : 0;
  P.legL.g.rotation.x = sw; P.legR.g.rotation.x = -sw;
  if (!mining) { P.armL.g.rotation.x = -sw; P.armR.g.rotation.x = sw; }
  const dancing = playing && !moving && onGround && wasOnStage;
  player.position.y = feet + (!onGround ? 0 : moving ? Math.abs(Math.sin(walkT)) * 0.06 : dancing ? Math.abs(Math.sin(t * 7)) * 0.12 : Math.sin(t * 2) * 0.015);
  if (dancing && !mining) { P.armL.g.rotation.x = -2.6 + Math.sin(t * 7) * 0.5; P.armR.g.rotation.x = -2.6 - Math.sin(t * 7) * 0.5; }
  airT = onGround ? 0 : airT + dt;
  if (airT > 0.12) { P.legL.g.rotation.x = -0.5; P.legR.g.rotation.x = 0.4; P.armL.g.rotation.x = -2.4; P.armR.g.rotation.x = -2.4; }
  const gY = groundBelow(p.x, p.z, feet + 0.1);
  pShadow.position.set(p.x, gY + 0.02, p.z); pShadow.scale.setScalar(Math.max(0.4, 1 - (feet - gY) * 0.25));
  head.rotation.z = playing && !moving ? Math.sin(t * 6) * (dancing ? 0.15 : 0.06) : 0;

  // picar
  if (mining) {
    mining.t += dt; const dur = picos[tier()].t, prog = Math.min(1, mining.t / dur);
    P.armR.g.rotation.x = -2.2 + Math.abs(Math.sin(mining.t * 13)) * 1.6;
    const o = mining.o; o.m.position.x = o.x + (Math.random() - 0.5) * 0.04;
    crack.visible = true; crack.position.copy(o.m.position); crack.rotation.copy(o.m.rotation); crack.material.map = crackTex[Math.min(5, Math.floor(prog * 6))];
    if (Math.floor(mining.t * 4.2) > mining.hits) { mining.hits++; sfx('dig'); }
    if (prog >= 1) { crack.visible = false; breakOre(o); mining = null; P.armR.g.rotation.x = 0; }
  }
  debris.forEach((d, i) => { d.userData.v.y -= 14 * dt; d.position.addScaledVector(d.userData.v, dt); if (d.position.y < 0.6) { d.position.y = 0.6; d.userData.v.multiplyScalar(0.5); } d.userData.life -= dt * 1.2; d.scale.setScalar(Math.max(0.01, d.userData.life)); if (d.userData.life <= 0) { scene.remove(d); debris.splice(i, 1); } });

  if (started && !selecting) checkHitos();
  updateMonsters(dt, t); updateGuards(dt, t); updateCave(dt, t); updateDJ(dt, t);
  updateAnimals(dt, t);
  if (started && !selecting && !panelOpen) { cycleT += dt; playTime += dt; }
  { const ph = (cycleT % CYCLE) / CYCLE; if ((skyT += dt) > 0.2 || !started) { skyT = 0; applySky(ph); }
    const shouldNight = ph > 0.63 && ph < 0.965; if (started && shouldNight !== night) setNight(shouldNight); }
  updateAmbient(dt, t); if (Math.floor(t * 15) % 2 === 0) swayGrass(t);
  updateNpc(dt, t); updateTutorial();
  roofZones.forEach(r => { const inside = p.x > r.inX[0] && p.x < r.inX[1] && p.z > r.inZ[0] && p.z < r.inZ[1] && (r.always || feet < (r.feetBelow ?? r.y));
    r.inside = inside;
    if (r.tunnel) r.meshes.forEach(m => m.visible = !inside && !(roofZones[0].inside && m.userData.layer >= roofZones[0].y)); // el techo de la casa también se oculta si estás dentro de ella
    else r.meshes.forEach(m => m.visible = !inside || (m.userData.layer !== null && (m.userData.layer <= feet - 0.4 || feet > 9.4)));
    if (r === roofZones[2]) arcade.visible = !inside;
    if (r === roofZones[3]) princesses.forEach(pr => pr.g.visible = !inside);
    if (r.layered) { king.g.visible = !inside || feet > 9.4; }
    });
  if (started && Math.floor(playTime) % 15 === 0 && Math.floor(playTime) !== lastSaveSec) { lastSaveSec = Math.floor(playTime); saveProgress(); }
  finder.visible = started && !selecting; finder.position.set(p.x, player.position.y + 2.7 + Math.sin(t * 4) * 0.12, p.z);
  // bloques de habilidad
  ores.forEach(o => { if (o.mined || mining?.o === o) return; o.m.position.y = 1 + Math.sin(t * 2 + o.i) * 0.08; o.m.rotation.y = Math.sin(t * 0.8 + o.i) * 0.25; o.m.material.emissiveIntensity = 0.18 + Math.max(0, Math.sin(t * 3 + o.i)) * 0.3; });

  // interacción cercana
  if (started && !panelOpen) {
    near = mining ? null : nearest();
    ores.forEach(o => { if (!o.mined) o.tag.visible = near?.o === o; });
    const pr = $('#prompt');
    if (near) { pr.hidden = false; $('#promptText').textContent = near.kind === 'npc' ? 'Hablar con la guía' : near.kind === 'animal' ? (near.a.state === 'corral' ? 'Elegir de mascota: ' : 'Lazar: ') + near.a.n : near.kind === 'bed' ? 'Acostarse y volver al inicio' : near.kind === 'axo' ? (near.a && near.a.blue ? 'Saludar al ajolote azul' : 'Saludar al ajolote') : near.kind === 'loc' ? (near.L.id === 'cofre' ? 'Abrir el cofre' : near.L.id === 'cueva' ? 'Abrir el cofre secreto' : 'Entrar: ' + near.L.n) : 'Picar bloque: ' + habilidades[near.o.i].n; }
    else pr.hidden = true;
  }

  // ambiente
  waterTex.offset.x = t * 0.05; waterTex.offset.y = Math.sin(t) * 0.02;
  flags.forEach((f, i) => f.rotation.y = Math.sin(t * 3 + i) * 0.25);
  clouds.children.forEach((c, i) => { c.position.x += dt * (0.4 + i * 0.05); if (c.position.x > 40) c.position.x = -45; });
  const pp = petalGeo.attributes.position.array;
  for (let i = 0; i < petalCount; i++) { pp[i * 3 + 1] -= dt * (0.6 + (i % 5) * 0.12); pp[i * 3] += Math.sin(t + i) * dt * 0.4; if (pp[i * 3 + 1] < 0.5) pp[i * 3 + 1] = 12 + Math.random() * 3; }
  petalGeo.attributes.position.needsUpdate = true;
  // menos letreros: cada uno aparece solo cuando sirve
  const lp = player.position;
  lugares.forEach((L, i) => { L.sprite.position.y = L.at[2] + Math.sin(t * 1.5 + i) * 0.15;
    const near = Math.hypot(lp.x - L.at[0], lp.z - L.at[1]) < (L.id === 'castillo' ? 9 : 4.5); // de cerca ya sale el botón "Entrar"
    L.sprite.visible = !selecting && !near && !(L.id === 'castillo' && feet > 1.2) && !(L.id === 'cueva' && feet < -0.6); });
  bedSign.visible = !selecting && feet < 3 && Math.hypot(lp.x - BED[0], lp.z - BED[1]) < 5;
  hitos.forEach(h => h.sprite.visible = !selecting && feet > 1.2 && Math.hypot(lp.x - h.sprite.position.x, lp.z - h.sprite.position.z, (feet + 2) - h.sprite.position.y) < 3.6);
  lid.rotation.x += ((lidOpen ? -1.1 : 0) - lid.rotation.x) * Math.min(1, dt * 6); lid.position.z = lidOpen ? -0.2 : 0; lid.position.y = lidOpen ? 0.95 : 0.72;
  notes.forEach(n => { n.t += dt * 0.35; if (n.t > 1) n.t -= 1; n.s.position.set(11 + Math.sin(n.t * 9 + n.s.id) * 1.2, 3 + n.t * 4, 13); n.s.material.opacity = playing ? Math.sin(n.t * Math.PI) : 0; });
  drawArcade(t);

  // cámara
  if (started && !selecting) {
    const hz = 12.5 * (1.15 - camPitch * 0.15) * (1 - 0.6 * caveK); // en la cueva la cámara mira más desde arriba
    const off = new THREE.Vector3(Math.sin(camYaw) * hz, 21 * camPitch, Math.cos(camYaw) * hz).multiplyScalar(zoom);
    camPos.lerp(new THREE.Vector3(p.x, p.y, p.z).add(off), Math.min(1, dt * 4));
    camLook.lerp(new THREE.Vector3(p.x - Math.sin(camYaw) * 2.5 * camPitch * (1 - caveK), 1 + (p.y - 0.5) * caveK, p.z - Math.cos(camYaw) * 2.5 * camPitch * (1 - caveK)), Math.min(1, dt * 5));
  } else if (selecting) {
    const sx = innerWidth > 700 ? -1.5 : 0, sy = innerWidth > 700 ? 0.9 : -0.4; camPos.lerp(new THREE.Vector3(p.x + sx, p.y + 2.2, p.z + 8.5), Math.min(1, dt * 5)); camLook.lerp(new THREE.Vector3(p.x + sx, p.y + sy, p.z), Math.min(1, dt * 5));
  } else {
    const a = t * 0.12; camPos.set(Math.sin(a) * 44, 30, Math.cos(a) * 44); camLook.set(0, 0, -2);
  }
  if (selecting) {
    player.rotation.y += dt * 0.6;
    P.legL.g.rotation.x = P.legR.g.rotation.x = 0; P.armL.g.rotation.x = 0; P.armL.g.rotation.z = 0;
    P.armR.g.rotation.x = -0.4 + Math.sin(t * 2) * 0.15; P.armR.g.rotation.z = 0;
    head.rotation.z = 0; head.rotation.y = Math.sin(t * 0.9) * 0.15;
    player.position.y = feet + Math.sin(t * 2) * 0.02;
    if (hop > 0) { hop = Math.max(0, hop - dt * 2.2); const k = Math.sin((1 - hop) * Math.PI); player.position.y = feet + k * 0.5; P.armL.g.rotation.x = P.armR.g.rotation.x = -2.6 * k; }
  } else if (head) head.rotation.y = 0;
  camera.position.copy(camPos); camera.lookAt(camLook);
  sun.position.set(camLook.x + 20, 34, camLook.z + 14); sun.target.position.set(camLook.x, 0, camLook.z); sun.target.updateMatrixWorld();

  if ((mapT += dt) > 0.1 && started) { mapT = 0; drawMap(); }
}
let perfStart = 0, perfN = 0, perfLevel = 0;
function adaptQuality() {
  const now = performance.now(); if (!perfStart) perfStart = now; perfN++;
  if (now - perfStart < 2500) return;
  const fps = perfN / ((now - perfStart) / 1000); perfStart = now; perfN = 0;
  if (fps < 38 && perfLevel < 3) {
    perfLevel++;
    if (perfLevel === 1) { pixelRatio = Math.max(0.85, pixelRatio - 0.4); renderer.setPixelRatio(pixelRatio); }
    if (perfLevel === 2) { petals.visible = false; clouds.visible = false; }
    if (perfLevel === 3) { sun.castShadow = false; pixelRatio = Math.max(0.75, pixelRatio - 0.15); renderer.setPixelRatio(pixelRatio); }
  }
}
function loop() {
  const dt = Math.min(0.05, clock.getDelta()), t = clock.elapsedTime;
  update(dt, t); renderer.render(scene, camera); drawXray(dt); if (started) adaptQuality(); requestAnimationFrame(loop);
}
