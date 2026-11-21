'use strict';
// Teclado, mouse, toque y cámara.

/* ---------------- ENTRADA ---------------- */
let started = false;
addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  if (viendo && !panelOpen) { // mirando una obra
    if (['e', 'enter', 'escape'].includes(k) && !e.repeat) salirObra();
    else if ((k === 'arrowleft' || k === 'a') && !e.repeat) cambiarObra(-1);
    else if ((k === 'arrowright' || k === 'd') && !e.repeat) cambiarObra(1);
    if (k.startsWith('arrow')) e.preventDefault();
    return;
  }
  if (k === 'escape') { if (panelOpen) closePanel(); else closeMenu(); return; }
  if (!started || panelOpen || selecting) return;
  keys[k] = true;
  if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) e.preventDefault();
  if ((k === 'e' || k === 'enter') && !e.repeat) interact();
  if (k === ' ') {
    e.preventDefault();
    const a = document.activeElement; if (a && a !== document.body && (a.tagName === 'BUTTON' || a.tagName === 'INPUT' || a.tagName === 'A')) a.blur();
    if (!e.repeat) jumpReq = 0.18;
  }
  if (k === 'm' && !e.repeat) setMusic(!soundOn);
  if ((k === '+' || k === '=') && !e.repeat) setVolume(volume + 0.1);
  if (k === '-' && !e.repeat) setVolume(volume - 0.1);
  if (k === 'n' && !e.repeat) jumpToNight(!night);
});
addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; if (e.key === ' ' && started && !panelOpen) e.preventDefault(); });
addEventListener('blur', () => Object.keys(keys).forEach(k => keys[k] = false));

const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.5);
let down = null, camYaw = 0, camPitch = 1, lastDrag = null, dragged = false, zoom = innerWidth < 700 ? 1.4 : 1; const pointers = new Map(); let pinch = 0;
canvas.addEventListener('pointerdown', e => { dragged = false; canvas.setPointerCapture?.(e.pointerId); pointers.set(e.pointerId, [e.clientX, e.clientY]); down = [e.clientX, e.clientY]; });
canvas.addEventListener('pointermove', e => {
  if (!pointers.has(e.pointerId)) return; pointers.set(e.pointerId, [e.clientX, e.clientY]);
  if (pointers.size === 2) { const [a, b] = [...pointers.values()]; const d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (pinch) zoom = Math.min(1.7, Math.max(0.55, zoom * pinch / d)); pinch = d; down = null; return; }
  // arrastrar para girar la cámara alrededor del personaje
  if (down && started && !panelOpen && !selecting) {
    if (!dragged && Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 8) { dragged = true; lastDrag = [e.clientX, e.clientY]; canvas.style.cursor = 'grabbing'; }
    if (dragged) {
      camYaw -= (e.clientX - lastDrag[0]) * 0.008;
      camPitch = Math.min(1.5, Math.max(0.35, camPitch + (e.clientY - lastDrag[1]) * 0.004));
      lastDrag = [e.clientX, e.clientY];
    }
  }
});
canvas.addEventListener('pointerup', e => { canvas.style.cursor = '';
  if (dragged) { dragged = false; down = null; pointers.delete(e.pointerId); return; }
  pointers.delete(e.pointerId); if (pointers.size < 2) pinch = 0;
  if (!down || !started || panelOpen) return;
  if (Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 8) return;
  ndc.set(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); ray.setFromCamera(ndc, camera);
  const hit = ray.intersectObjects(hitMeshes, false)[0];
  if (hit) {
    const u = hit.object.userData;
    if (u.kind === 'ore') { const o = ores[u.i]; const p = player.position; const dx = p.x - o.x, dz = p.z - o.z, d = Math.hypot(dx, dz) || 1; planTo(o.x + dx / d * 1.25, o.z + dz / d * 1.25, () => mine(o)); }
    else if (u.id === 'npc') planTo(npc.position.x, npc.position.z + 1.2, () => talkNpc());
    else { const L = lugares.find(l => l.id === u.id); planTo(L.door[0], L.door[1], () => openPlace(L)); }
    sfx('blip'); return;
  }
  const bh = ray.intersectObjects(blockMeshes, false).find(h => h.face && h.face.normal.y > 0.5);
  const pt = bh ? bh.point : new THREE.Vector3(); if (bh || ray.ray.intersectPlane(groundPlane, pt)) { if (!blocked(pt.x, pt.z)) { planTo(pt.x, pt.z, null); marker.position.set(pt.x, pt.y + 0.03, pt.z); marker.visible = true; } }
});
canvas.addEventListener('wheel', e => { e.preventDefault(); zoom = Math.min(1.7, Math.max(0.55, zoom * (e.deltaY > 0 ? 1.08 : 0.92))); }, { passive: false });
const marker = new THREE.Mesh(new THREE.RingGeometry(0.25, 0.4, 4), new THREE.MeshBasicMaterial({ color: 0xec4899 })); marker.rotation.x = -Math.PI / 2; marker.visible = false; scene.add(marker);

addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });
