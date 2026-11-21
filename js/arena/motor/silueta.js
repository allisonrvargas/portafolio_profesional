'use strict';
// Silueta de la jugadora cuando algo la tapa.

/* ---------------- SILUETA CUANDO ALGO TE TAPA ---------------- */
// Si un techo, árbol o torre queda entre la cámara y tú, se dibuja tu silueta rosa encima.
const xrayScene = new THREE.Scene();
const xrayFill = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85, depthTest: false, depthWrite: false });
const xrayEdge = new THREE.MeshBasicMaterial({ color: 0xbe185d, transparent: true, opacity: 0.95, depthTest: false, depthWrite: false });
let xrayT = 0, occluded = false;
function hiddenByZone(i, j, k) { return roofZones.some(r => r.inside && i >= r.x1 && i <= r.x2 && k >= r.z1 && k <= r.z2 && j >= r.y); }
function checkOccluded() {
  const from = new THREE.Vector3(player.position.x, feet + 0.9, player.position.z), dir = camera.position.clone().sub(from);
  const len = dir.length(); dir.normalize();
  for (let d = 0.9; d < len; d += 0.25) {
    const x = from.x + dir.x * d, y = from.y + dir.y * d, z = from.z + dir.z * d;
    const i = Math.round(x), j = Math.round(y), k = Math.round(z), t = blocks.get(`${i},${j},${k}`);
    if (t && t !== 'air' && t !== 'glass' && t !== 'agua' && !hiddenByZone(i, j, k)) return true;
  }
  return false;
}
function drawXray(dt) {
  if (!started || selecting || sleeping || camMode !== 'arriba') return; // en las vistas de cerca no hace falta
  if ((xrayT -= dt) <= 0) { xrayT = 0.12; occluded = checkOccluded(); }
  if (!occluded) return;
  const parent = player.parent, sc = player.scale.x; xrayScene.add(player); renderer.autoClear = false;
  player.scale.setScalar(sc * 1.12); player.updateMatrixWorld(true); xrayScene.overrideMaterial = xrayEdge; renderer.render(xrayScene, camera);   // borde
  player.scale.setScalar(sc); player.updateMatrixWorld(true); xrayScene.overrideMaterial = xrayFill; renderer.render(xrayScene, camera);          // relleno
  renderer.autoClear = true; parent.add(player);
}
