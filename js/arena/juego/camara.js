'use strict';
// Modos de cámara: detrás de ti (como en Minecraft con F5), primera persona (los ojos del personaje) o desde arriba.
// Tecla V o el botón del ojo para cambiar. Arrastra el mouse para girar la vista.

const camModes = ['detras', 'ojos', 'arriba'];
const camInfo = {
  detras: { icon: '👤', n: 'Detrás de ti', d: 'La cámara te sigue por la espalda. Arrastra el mouse para girar.' },
  ojos: { icon: '👁', n: 'Primera persona', d: 'Ves con los ojos del personaje. Arrastra el mouse para mirar alrededor.' },
  arriba: { icon: '🗺', n: 'Desde arriba', d: 'Vista de toda la arena, como un mapa.' }
};
let camMode = 'detras';
try { if (camModes.includes(localStorage.getItem('arenaCam'))) camMode = localStorage.getItem('arenaCam'); } catch (e) { }

function setCamMode(m, quiet) {
  camMode = m; try { localStorage.setItem('arenaCam', m); } catch (e) { }
  const b = $('#camBtn'); b.textContent = camInfo[m].icon; b.setAttribute('aria-label', 'Cámara: ' + camInfo[m].n + '. Cambiar vista');
  if (m !== 'arriba') camPitch = 1; else unlockMouse();
  if (!quiet) { sfx('blip'); toast(camInfo[m].icon, 'CÁMARA (V)', camInfo[m].n, camInfo[m].d, '#7c3aed'); }
}
function cycleCam() { setCamMode(camModes[(camModes.indexOf(camMode) + 1) % camModes.length]); }
$('#camBtn').addEventListener('click', e => { cycleCam(); e.currentTarget.blur(); });
setCamMode(camMode, true);

// ¿hay un bloque que tape la cámara en este punto?
function camHit(x, y, z) {
  const i = Math.round(x), j = Math.round(y), k = Math.round(z), t = blocks.get(`${i},${j},${k}`);
  return !!t && t !== 'air' && t !== 'glass' && t !== 'agua' && !hiddenByZone(i, j, k);
}
// mueve la cámara según el modo; devuelve false en "desde arriba" para usar la cámara de siempre
function camaraJugador(dt) {
  if (camMode === 'arriba') return false;
  const p = player.position, fx = -Math.sin(camYaw), fz = -Math.cos(camYaw);
  if (camMode === 'ojos') {
    const eyeH = swimming ? 0.45 : driving ? 1.3 : 1.55;
    const eye = new THREE.Vector3(p.x + fx * 0.25, feet + eyeH, p.z + fz * 0.25);
    camPos.lerp(eye, Math.min(1, dt * 18));
    camLook.copy(camPos).add(new THREE.Vector3(fx * 5, -(camPitch - 1) * 6, fz * 5));
    return true;
  }
  // detrás de ti: si una pared queda en medio, la cámara se acerca para no atravesarla
  const head = new THREE.Vector3(p.x, feet + (swimming ? 0.6 : 1.45), p.z);
  const under = feet < -1;                                           // túnel y cuevas: cámara más baja y cerca para no salirse
  const want = (under ? 3 : 4.6) * zoom, up = under ? 0.25 + camPitch * 0.25 : 0.5 + camPitch * 1.3;
  const dir = new THREE.Vector3(-fx * want, up, -fz * want); const len = dir.length(); dir.normalize();
  let d = len; for (let s = 0.4; s < len; s += 0.15) if (camHit(head.x + dir.x * s, head.y + dir.y * s, head.z + dir.z * s)) { d = Math.max(0.6, s - 0.3); break; }
  camPos.lerp(head.clone().addScaledVector(dir, d), Math.min(1, dt * (d < len ? 14 : 7)));
  camLook.lerp(head.clone().add(new THREE.Vector3(fx * 2.2, -0.15, fz * 2.2)), Math.min(1, dt * 10));
  return true;
}
const camFov = () => camMode === 'ojos' ? 72 : camMode === 'detras' ? 58 : 38;

// Mirar con el mouse sin arrastrar (como en Minecraft): un clic captura el mouse, Esc lo suelta.
const mouseLocked = () => document.pointerLockElement === canvas;
function lockMouse() { try { const r = canvas.requestPointerLock?.(); r?.catch?.(() => { }); } catch (e) { } }
function unlockMouse() { if (mouseLocked()) document.exitPointerLock?.(); }
document.addEventListener('mousemove', e => {
  if (!mouseLocked() || !started || panelOpen || selecting || camMode === 'arriba') return;
  camYaw -= e.movementX * 0.0028;
  camPitch = Math.min(1.5, Math.max(0.35, camPitch + e.movementY * 0.0018));
});
function updateLockUI() {
  const fine = matchMedia('(pointer: fine)').matches, locked = mouseLocked();
  $('#lockHint').hidden = !fine || locked || !started || selecting || panelOpen || camMode === 'arriba';
  $('#crosshair').hidden = !locked || camMode !== 'ojos';
}
document.addEventListener('pointerlockchange', updateLockUI);
