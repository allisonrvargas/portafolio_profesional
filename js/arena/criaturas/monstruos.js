'use strict';
// Modo noche y monstruos.

let night = false, spawnT = 0;
const monsters = [];
function jumpToNight(on) { cycleT = on ? CYCLE * 0.665 : 0.001; }
function setNight(on, quiet) {
  if (on === night) return;
  night = on;
  ores.forEach(o => { if (!o.mined) o.m.material.emissiveIntensity = on ? 0.7 : 0.18; });
  const b = $('#nightBtn'); b.setAttribute('aria-pressed', on); b.textContent = on ? '☀' : '☾'; b.setAttribute('aria-label', on ? 'Cambiar a modo día' : 'Cambiar a modo noche');
  spawnT = 0;
  if (on) {
    if (minedCount < habilidades.length) toast('☾', 'CAYÓ LA NOCHE', '¡Cuidado con los monstruos!', 'Aparece uno cada 20 segundos y te persigue. Pica un bloque de habilidad para hacerlos desaparecer.', '#7c3aed');
    else toast('☾', 'NOCHE TRANQUILA', 'Ya no hay monstruos', 'Encontraste todas las habilidades: la arena es tuya.', '#7c3aed');
  } else { clearMonsters(false); if (!quiet) toast('☀', 'AMANECIÓ', 'Modo día', 'Los monstruos se fueron.'); }
}

function monsterModel(kind) {
  const g = new THREE.Group(); const legs = [];
  if (kind === 'esqueleto') {
    const bone = 0xf1ece4, dark = 0x2b2033;
    [-0.13, 0.13].forEach(x => { const l = new THREE.Group(); l.position.set(x, 0.62, 0); g.add(l); part(0.12, 0.62, 0.12, bone, 0, -0.31, 0, l); legs.push(l); });
    part(0.5, 0.08, 0.2, bone, 0, 0.66, 0, g); part(0.08, 0.62, 0.08, bone, 0, 0.98, 0, g);
    [0.82, 0.96, 1.1].forEach(y => part(0.46, 0.06, 0.24, bone, 0, y, 0, g));
    [-0.3, 0.3].forEach(x => { const a = new THREE.Group(); a.position.set(x, 1.24, 0); a.rotation.x = -1.3; g.add(a); part(0.1, 0.62, 0.1, bone, 0, -0.31, 0, a); legs.push(a); });
    part(0.52, 0.5, 0.48, bone, 0, 1.54, 0, g);
    part(0.13, 0.13, 0.02, dark, -0.12, 1.57, 0.245, g); part(0.13, 0.13, 0.02, dark, 0.12, 1.57, 0.245, g);
    part(0.07, 0.07, 0.02, 0xec4899, -0.12, 1.57, 0.26, g); part(0.07, 0.07, 0.02, 0xec4899, 0.12, 1.57, 0.26, g);
    part(0.3, 0.05, 0.02, dark, 0, 1.38, 0.245, g);
    part(0.56, 0.12, 0.52, 0xbe185d, 0, 1.76, 0, g); // pañoleta
  } else if (kind === 'arana') {
    const body = 0x3b1f4f;
    part(0.9, 0.5, 1.0, body, 0, 0.55, -0.15, g); part(0.6, 0.45, 0.5, 0x4c2a63, 0, 0.55, 0.5, g);
    [[-0.15, 0.62, 0.76], [0.15, 0.62, 0.76], [-0.08, 0.5, 0.76], [0.08, 0.5, 0.76]].forEach(([x, y, z]) => part(0.1, 0.1, 0.02, 0xf472b6, x, y, z, g));
    part(0.6, 0.06, 0.6, 0xec4899, 0, 0.81, -0.2, g);
    for (let i = 0; i < 4; i++) for (const side of [-1, 1]) {
      const l = new THREE.Group(); l.position.set(side * 0.42, 0.6, 0.35 - i * 0.28); l.rotation.z = side * 0.7; g.add(l);
      part(0.9, 0.08, 0.08, 0x2b1638, side * 0.45, 0, 0, l); legs.push(l);
    }
  } else {
    // Petardín: bomba andante original con mecha encendida
    [-0.15, 0.15].forEach(x => { const l = new THREE.Group(); l.position.set(x, 0.32, 0); g.add(l); part(0.18, 0.32, 0.2, 0x1f1530, 0, -0.16, 0, l); legs.push(l); });
    part(0.8, 0.75, 0.8, 0x3a2a55, 0, 0.72, 0, g); part(0.84, 0.12, 0.84, 0xf472b6, 0, 0.62, 0, g); part(0.84, 0.12, 0.84, 0xf472b6, 0, 0.86, 0, g);
    part(0.16, 0.12, 0.02, 0xffffff, -0.17, 0.8, 0.41, g); part(0.16, 0.12, 0.02, 0xffffff, 0.17, 0.8, 0.41, g);
    part(0.08, 0.08, 0.02, 0x111111, -0.15, 0.78, 0.42, g); part(0.08, 0.08, 0.02, 0x111111, 0.15, 0.78, 0.42, g);
    part(0.3, 0.06, 0.02, 0x111111, 0, 0.6, 0.41, g);
    part(0.12, 0.3, 0.12, 0x7a4e3a, 0, 1.24, 0, g);
    const spark = part(0.16, 0.16, 0.16, 0xfcd34d, 0, 1.44, 0, g); spark.material.emissive = new THREE.Color(0xf59e0b); spark.material.emissiveIntensity = 1; g.userData.spark = spark;
  }
  g.traverse(o => { if (o.isMesh) o.castShadow = true; });
  return { g, legs };
}
const monsterInfo = {
  esqueleto: { n: 'Esqueleto', speed: 2.6 },
  arana: { n: 'Araña', speed: 3.4 },
  petardin: { n: 'Petardín', speed: 2.1 }
};
function spawnMonster() {
  if (monsters.length >= 6) return;
  const kinds = Object.keys(monsterInfo), kind = kinds[Math.floor(Math.random() * kinds.length)];
  const p = player.position; let pos = null;
  for (let tries = 0; tries < 40 && !pos; tries++) {
    const a = Math.random() * Math.PI * 2, r = 9 + Math.random() * 5, x = p.x + Math.cos(a) * r, z = p.z + Math.sin(a) * r;
    if (x < -15 || x > 15 || z < -25 || z > 22) continue;
    if (!blocked(x, z) && !hits(x, 0.5, z) && (z > -0.5) === (p.z > -0.5) && Math.abs(groundBelow(x, z, 1.2) - 0.5) < 0.1) pos = [x, z];
  }
  if (!pos) return;
  const { g, legs } = monsterModel(kind); const y = groundBelow(pos[0], pos[1], 1.2);
  g.position.set(pos[0], y, pos[1]); g.scale.setScalar(0.01); scene.add(g);
  monsters.push({ kind, g, legs, y, t: Math.random() * 6, born: 0, cool: 0, fuse: 0 });
  poof(pos[0], y + 0.6, pos[1], 0x7c3aed); sfx('spawn');
  toast(kind === 'arana' ? '✶' : kind === 'petardin' ? '✸' : '☠', 'APARECIÓ UN MONSTRUO', monsterInfo[kind].n, 'Pica un bloque de habilidad para hacerlo desaparecer.', '#7c3aed');
}
function poof(x, y, z, color) {
  for (let i = 0; i < 16; i++) {
    const d = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.22), new THREE.MeshLambertMaterial({ color: i % 2 ? color : 0xe5e7eb }));
    d.position.set(x, y, z); d.userData.v = new THREE.Vector3((Math.random() - 0.5) * 6, 2 + Math.random() * 4, (Math.random() - 0.5) * 6); d.userData.life = 1; scene.add(d); debris.push(d);
  }
}
function killMonster(m, color = 0xf9a8d4) { scene.remove(m.g); poof(m.g.position.x, m.g.position.y + 0.6, m.g.position.z, color); }
function clearMonsters(announce) {
  if (!monsters.length) return;
  const n = monsters.length; monsters.forEach(m => killMonster(m)); monsters.length = 0;
  if (announce) { sfx('pop'); toast('✦', 'MONSTRUOS DERROTADOS', n === 1 ? '¡Desapareció el monstruo!' : `¡Desaparecieron ${n} monstruos!`, 'Romper un bloque de habilidad los espanta.', '#ec4899'); }
}
function hurt(m, power) {
  const p = player.position, dx = p.x - m.g.position.x, dz = p.z - m.g.position.z, d = Math.hypot(dx, dz) || 1;
  for (let i = 0; i < 10; i++) { const nx = p.x + dx / d * power * 0.12, nz = p.z + dz / d * power * 0.12; if (!hits(nx, feet, nz)) { p.x = nx; p.z = nz; } }
  vy = 5; onGround = false; target = null; waypoints = []; mining = null; crack.visible = false;
  const f = $('#hurt'); f.classList.remove('on'); void f.offsetWidth; f.classList.add('on'); sfx('hurt');
  perderVida(m.kind);
}
function updateMonsters(dt, t) {
  if (!started || selecting) return;
  const cleared = minedCount >= habilidades.length;
  if (cleared && monsters.length) clearMonsters(true);
  if (night && !cleared && !panelOpen) { spawnT += dt; if (spawnT >= 20) { spawnT = 0; spawnMonster(); } }
  const p = player.position;
  for (let i = monsters.length - 1; i >= 0; i--) {
    const m = monsters[i], info = monsterInfo[m.kind];
    if (m.y > 1.6 && feet < m.y - 1.5) { killMonster(m, 0x7c3aed); monsters.splice(i, 1); continue; }
    m.t += dt; m.born = Math.min(1, m.born + dt * 2.5); m.g.scale.setScalar(m.born); m.cool = Math.max(0, m.cool - dt);
    const dx = p.x - m.g.position.x, dz = p.z - m.g.position.z, d = Math.hypot(dx, dz);
    let moving = false;
    if (!panelOpen && d > 0.9 && m.fuse === 0) {
      const sp = info.speed * dt, nx = m.g.position.x + dx / d * sp, nz = m.g.position.z + dz / d * sp;
      const gy = groundBelow(nx, nz, m.y + 1.2);
      // solo caminan por suelo al mismo nivel (sin subirse a faroles ni muros) y sin meterse en bloques
      const ok = (x, z) => Math.abs(groundBelow(x, z, m.y + 0.6) - m.y) <= 0.55 && !hits(x, m.y, z) && !(x < -15.4 || x > 15.4 || z < -25.4 || z > 22.4) && !(z > -1.8 && z < 0.8 && !bridges.some(([a, b]) => x > a - 0.4 && x < b + 0.4));
      const ang = Math.atan2(dx, dz);
      // si algo estorba, prueba rodearlo (hacia el lado que eligió la última vez)
      m.side = m.side || (Math.random() < 0.5 ? 1 : -1);
      let moved = false;
      for (const off of [0, 0.6, -0.6, 1.2, -1.2, 1.7, -1.7]) {
        const a2 = ang + off * m.side, tx = m.g.position.x + Math.sin(a2) * sp, tz = m.g.position.z + Math.cos(a2) * sp;
        if (ok(tx, tz)) { m.g.position.x = tx; m.g.position.z = tz; moving = moved = true; if (off !== 0) m.rodeoT = 0.6; break; }
      }
      if (!moved) { m.side = -m.side; m.stuckT = (m.stuckT || 0) + dt; } else m.stuckT = 0;
      if (m.stuckT > 3) { killMonster(m, 0x7c3aed); monsters.splice(i, 1); continue; }   // atrapado del todo: desaparece en humo
      const gy2 = groundBelow(m.g.position.x, m.g.position.z, m.y + 0.6); m.y += (gy2 - m.y) * Math.min(1, dt * 10); m.g.position.y = m.y;
      m.g.rotation.y = Math.atan2(dx, dz);
    }
    const sw = moving ? Math.sin(m.t * (m.kind === 'arana' ? 16 : 10)) : 0;
    m.legs.forEach((l, k) => { if (m.kind === 'arana') l.rotation.x = sw * 0.4 * (k % 2 ? 1 : -1); else l.rotation.x = (m.kind === 'esqueleto' && k > 1) ? -1.3 + sw * 0.2 : sw * 0.7 * (k % 2 ? 1 : -1); });
    if (m.g.userData.spark) m.g.userData.spark.visible = Math.floor(t * 10) % 2 === 0 || m.fuse > 0;
    const close = d < 1.2 && Math.abs(feet - m.y) < 1.6;
    if (m.kind === 'petardin') {
      if (close && m.fuse === 0) { m.fuse = 0.01; sfx('fuse'); }
      if (m.fuse > 0) {
        m.fuse += dt; const k = 1 + Math.sin(m.fuse * 30) * 0.08 + m.fuse * 0.25; m.g.scale.setScalar(k);
        m.g.traverse(o => { if (o.isMesh && o !== m.g.userData.spark) o.material.emissive?.setHex(Math.floor(m.fuse * 8) % 2 ? 0x664455 : 0x000000); });
        if (m.fuse > 1.2) {
          sfx('boom'); poof(m.g.position.x, m.g.position.y + 0.6, m.g.position.z, 0xfcd34d); poof(m.g.position.x, m.g.position.y + 0.8, m.g.position.z, 0xec4899);
          if (Math.hypot(p.x - m.g.position.x, p.z - m.g.position.z) < 3) hurt(m, 9);
          scene.remove(m.g); monsters.splice(i, 1);
        }
      }
    } else if (close && m.cool === 0) {
      m.cool = 1.4; hurt(m, 5);
    }
  }
  lantern.position.set(p.x, feet + 2.2, p.z);
  if (night) { moon.position.set(camLook.x - 30, 38, camLook.z - 55); stars.position.set(camLook.x, 0, camLook.z); }
}
