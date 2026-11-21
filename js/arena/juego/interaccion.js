'use strict';
// Tecla E: qué hay cerca, abrir lugares y picar bloques.

function nearest() {
  const p = player.position; let best = null, bd = 1e9;
  if (feet < -1) { // bajo tierra solo cuentan las cosas de la cueva
    const cv = lugares.find(L => L.id === 'cueva'), dc = Math.hypot(p.x - cv.door[0], p.z - cv.door[1]), da = Math.hypot(p.x - axo.g.position.x, p.z - axo.g.position.z);
    const db = Math.hypot(p.x - axo2.g.position.x, p.z - axo2.g.position.z), dbed = Math.hypot(p.x - CAVE_BED[0], p.z - CAVE_BED[1]);
    if (feet < -3 && db < 2.2 && db <= dbed) return { kind: 'axo', a: axo2 };
    if (feet < -3 && dbed < 2) return { kind: 'bed', where: 'cave' };
    if (feet < -3 && da < 2.2 && da <= dc) return { kind: 'axo', a: axo };
    if (feet < -3 && dc < 2.4) return { kind: 'loc', L: cv };
    return null;
  }
  for (const L of lugares) for (const pt of [L.door, L.alt].filter(Boolean)) { const d = Math.hypot(p.x - pt[0], p.z - pt[1]); if (d < 2.4 && d < bd) { bd = d; best = { kind: 'loc', L }; } }
  for (const o of ores) { if (o.mined) continue; const d = Math.hypot(p.x - o.x, p.z - o.z); if (d < 1.9 && d < bd) { bd = d; best = { kind: 'ore', o }; } }
  if (guide.state === 'home' || guide.state === 'returning') { const d = Math.hypot(p.x - npc.position.x, p.z - npc.position.z); if (d < 2.2 && d < bd) { bd = d; best = { kind: 'npc' }; } }
  for (const a of animals) { if (a.state === 'lazo' || a.state === 'mascota' || (a.state === 'corral' && penned < animals.length)) continue; const d = Math.hypot(p.x - a.g.position.x, p.z - a.g.position.z); if (d < 2.6 && d < bd) { bd = d; best = { kind: 'animal', a }; } }
  if (feet < 3 && Math.hypot(p.x - BED[0], p.z - BED[1]) < 2.4) best = { kind: 'bed' };
  if (feet > 1.2 && best?.kind === 'loc' && best.L.id === 'castillo') best = null;
  if (best?.kind === 'loc' && best.L.id === 'cueva' && feet > -3) best = null;
  return best;
}
function interact() {
  if (!near || panelOpen) return;
  if (near.kind === 'npc') talkNpc(); else if (near.kind === 'animal') lasso(near.a); else if (near.kind === 'bed') sleep(near.where); else if (near.kind === 'axo') greetAxolotl(near.a); else if (near.kind === 'loc') openPlace(near.L); else mine(near.o);
}
function openPlace(L) {
  sfx('open'); L.open();
  if (L.q && !visited.has(L.id)) { visited.add(L.id); renderQuests(); saveProgress(); }
  if (L.q) award(`visit:${L.id}`, 100, 'Nuevo lugar: ' + L.n);
}
function mine(o) {
  if (mining || o.mined) return;
  const p = player.position; player.rotation.y = Math.atan2(o.x - p.x, o.z - p.z);
  mining = { o, t: 0, hits: 0 };
}

const crackTex = [1, 2, 3, 4, 5, 6].map(stage => texture((g, r) => {
  g.clearRect(0, 0, 16, 16); g.fillStyle = 'rgba(30,20,30,.85)';
  let x = 8, y = 8; for (let i = 0; i < stage * 7; i++) { g.fillRect(x, y, 1, 1); x = Math.max(0, Math.min(15, x + Math.floor(r() * 3) - 1)); y = Math.max(0, Math.min(15, y + Math.floor(r() * 3) - 1)); if (i % 9 === 8) { x = 8; y = 8; } }
}, 900));
const crack = new THREE.Mesh(new THREE.BoxGeometry(1.03, 1.03, 1.03), new THREE.MeshBasicMaterial({ map: crackTex[0], transparent: true, depthWrite: false }));
crack.visible = false; scene.add(crack);
const debris = [];
function breakOre(o) {
  o.mined = true; scene.remove(o.m); scene.remove(o.tag);
  oreCells.delete(`${o.x},1,${o.z}`);
  hitMeshes.splice(hitMeshes.indexOf(o.m), 1);
  const h = habilidades[o.i];
  for (let i = 0; i < 14; i++) {
    const d = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), new THREE.MeshLambertMaterial({ color: i % 2 ? h.c : '#c4bfc8' }));
    d.position.set(o.x, 1, o.z); d.userData.v = new THREE.Vector3((Math.random() - 0.5) * 5, 3 + Math.random() * 3, (Math.random() - 0.5) * 5); d.userData.life = 1; scene.add(d); debris.push(d);
  }
  award(`ore:${o.i}`, 40, 'Habilidad: ' + habilidades[o.i].n);
  const before = tier(); minedCount++; sfx('break'); setTimeout(() => sfx('pop'), 180);
  if (tier() > before) { buildTool(); setTimeout(() => { sfx('win'); toast('⛏', '¡NUEVA HERRAMIENTA!', picos[tier()].n, 'Ahora picas más rápido.', picos[tier()].css); }, 900); }
  const slot = document.querySelectorAll('.slot')[o.i]; slot.classList.add('got'); slot.textContent = h.a.length > 4 ? h.a.slice(0, 4) : h.a; slot.setAttribute('aria-label', h.n + ', conseguida');
  $('#invCount').textContent = minedCount;
  toast(h.a.length > 3 ? h.a.slice(0, 3) : h.a, `HABILIDAD ${minedCount}/${habilidades.length}`, h.n, 'Usada en: ' + h.u, h.c);
  renderQuests();
  clearMonsters(true); saveProgress(); checkComplete();
  if (minedCount === habilidades.length) setTimeout(() => { if (crown) crown.visible = true; sfx('win'); confetti(); toast('♛', 'LOGRO DESBLOQUEADO', 'Maestra constructora', 'Encontraste todas mis habilidades. ¡Ganaste la corona!', '#d97706'); }, 700);
}
