'use strict';
// Granja: animales, lazo, corral y mascota.

/* ---------------- GRANJA Y ANIMALES ---------------- */
const animalesDef = [
  { id: 'vaca', n: 'Vaca Fresita', p: 0, frase: 'La vaca te trae mi proyecto más completo de consola:' },
  { id: 'cerdo', n: 'Cerdito Bit', p: 2, frase: 'El cerdito te trae el proyecto que hicimos en equipo:' },
  { id: 'oveja', n: 'Oveja Nube', p: 1, frase: 'La oveja te trae el proyecto del que más aprendí trabajando en células:' },
  { id: 'gallina', n: 'Gallina Pixel', p: 7, frase: 'La gallina te trae mi tienda hecha solo con HTML y CSS:' },
  { id: 'conejo', n: 'Conejo Byte', p: 4, frase: 'El conejo te trae la API con más pruebas que he escrito:' },
  { id: 'pato', n: 'Pato Query', p: 3, frase: 'El pato te trae mi sistema de biblioteca:' }
];
// el orden de "p" apunta a la lista de proyectos: 0 Kid-Fit, 1 Gym Manager, 2 MarisolliFlix, 3 Librarian, 4 Postulaciones, 7 CampusShop
animalesDef[0].p = 1; animalesDef[2].p = 0;
const spawnAnimal = [[-4, 3], [3, 4], [-1, 7], [11, -6], [-12, -12], [12, 18]];
function animalModel(id) {
  const g = new THREE.Group(); const legs = []; let headG = new THREE.Group(); g.add(headG);
  const leg = (x, z, h, c, w = 0.16) => { const l = new THREE.Group(); l.position.set(x, h, z); g.add(l); part(w, h, w, c, 0, -h / 2, 0, l); legs.push(l); };
  if (id === 'vaca' || id === 'cerdo' || id === 'oveja') {
    const C = { vaca: [0xfafafa, 0xf9a8d4, 0x3f3f46], cerdo: [0xf9a8d4, 0xec4899, 0xf472b6], oveja: [0xfbe4f0, 0xfbcfe8, 0x52525b] }[id];
    leg(-0.22, 0.3, 0.42, C[2]); leg(0.22, 0.3, 0.42, C[2]); leg(-0.22, -0.3, 0.42, C[2]); leg(0.22, -0.3, 0.42, C[2]);
    if (id === 'oveja') { legs.forEach(l => l.children[0].material.color.set(0xd4d4d8)); part(0.72, 0.58, 1.0, C[0], 0, 0.72, 0); }
    else part(0.64, 0.5, 0.96, C[0], 0, 0.68, 0);
    if (id === 'vaca') { part(0.66, 0.2, 0.3, C[1], 0.02, 0.8, 0.12); part(0.3, 0.24, 0.24, C[1], -0.18, 0.62, -0.26); part(0.2, 0.12, 0.2, C[1], 0, 0.42, 0.25); }
    headG.position.set(0, 0.86, 0.52);
    part(0.46, 0.42, 0.38, id === 'oveja' ? 0x71717a : C[0], 0, 0, 0.12, headG);
    part(0.3, 0.18, 0.08, C[1], 0, -0.08, 0.33, headG);
    part(0.06, 0.06, 0.02, 0x111111, -0.14, 0.08, 0.32, headG); part(0.06, 0.06, 0.02, 0x111111, 0.14, 0.08, 0.32, headG);
    if (id === 'vaca') { part(0.08, 0.12, 0.08, 0xfde68a, -0.2, 0.26, 0.05, headG); part(0.08, 0.12, 0.08, 0xfde68a, 0.2, 0.26, 0.05, headG); }
    if (id === 'cerdo') { part(0.12, 0.1, 0.06, C[0], -0.17, 0.24, 0.04, headG); part(0.12, 0.1, 0.06, C[0], 0.17, 0.24, 0.04, headG); part(0.08, 0.08, 0.08, C[1], 0, 0.62, -0.52); }
    if (id === 'oveja') part(0.5, 0.18, 0.34, C[0], 0, 0.22, 0.08, headG);
  } else if (id === 'gallina' || id === 'pato') {
    const body = id === 'gallina' ? 0xfafafa : 0xfde047;
    leg(-0.1, 0, 0.26, 0xf59e0b, 0.07); leg(0.1, 0, 0.26, 0xf59e0b, 0.07);
    part(0.42, 0.36, 0.5, body, 0, 0.44, -0.02); part(0.06, 0.24, 0.3, id === 'gallina' ? 0xf5f5f5 : 0xfacc15, -0.24, 0.46, -0.02); part(0.06, 0.24, 0.3, id === 'gallina' ? 0xf5f5f5 : 0xfacc15, 0.24, 0.46, -0.02);
    headG.position.set(0, 0.74, 0.2);
    part(0.28, 0.34, 0.24, body, 0, 0, 0, headG);
    part(0.14, 0.08, id === 'pato' ? 0.18 : 0.1, 0xf97316, 0, -0.02, 0.17, headG);
    part(0.05, 0.05, 0.02, 0x111111, -0.1, 0.08, 0.125, headG); part(0.05, 0.05, 0.02, 0x111111, 0.1, 0.08, 0.125, headG);
    if (id === 'gallina') { part(0.06, 0.12, 0.16, 0xe11d48, 0, 0.22, 0, headG); part(0.08, 0.1, 0.04, 0xe11d48, 0, -0.14, 0.13, headG); }
    else part(0.16, 0.06, 0.2, 0xec4899, 0, 0.2, 0, headG); // moñito
  } else { // conejo
    leg(-0.14, 0.14, 0.2, 0xf5e6d3, 0.12); leg(0.14, 0.14, 0.2, 0xf5e6d3, 0.12); leg(-0.16, -0.18, 0.2, 0xf5e6d3, 0.16); leg(0.16, -0.18, 0.2, 0xf5e6d3, 0.16);
    part(0.42, 0.36, 0.56, 0xf5e6d3, 0, 0.38, -0.04); part(0.16, 0.16, 0.12, 0xffffff, 0, 0.42, -0.36);
    headG.position.set(0, 0.6, 0.28);
    part(0.32, 0.3, 0.3, 0xf5e6d3, 0, 0, 0.04, headG);
    part(0.08, 0.36, 0.06, 0xf5e6d3, -0.08, 0.32, 0, headG); part(0.08, 0.36, 0.06, 0xf5e6d3, 0.08, 0.32, 0, headG);
    part(0.04, 0.26, 0.02, 0xf9a8d4, -0.08, 0.32, 0.035, headG); part(0.04, 0.26, 0.02, 0xf9a8d4, 0.08, 0.32, 0.035, headG);
    part(0.05, 0.05, 0.02, 0x111111, -0.09, 0.04, 0.2, headG); part(0.05, 0.05, 0.02, 0x111111, 0.09, 0.04, 0.2, headG); part(0.06, 0.04, 0.02, 0xec4899, 0, -0.04, 0.2, headG);
  }
  return { g, legs, headG };
}
const animals = animalesDef.map((d, i) => {
  const { g, legs, headG } = animalModel(d.id); const [x, z] = spawnAnimal[i];
  g.position.set(x, groundBelow(x, z, 1.2), z); g.rotation.y = Math.random() * 6.28; scene.add(g);
  const rope = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), new THREE.LineBasicMaterial({ color: 0x9a6744 }));
  rope.visible = false; rope.frustumCulled = false; scene.add(rope);
  return { ...d, i, g, legs, headG, rope, state: 'libre', goal: null, wait: Math.random() * 3, t: Math.random() * 9, y: g.position.y };
});
let penned = 0, pet = null;
const inCorral = (x, z, m = 0) => x > CORRAL.x1 + 0.5 + m && x < CORRAL.x2 - 0.5 - m && z > CORRAL.z1 + 0.5 + m && z < CORRAL.z2 - 0.5 - m;
function animalOk(x, z, from) {
  if (x < -15 || x > 15 || z < -25 || z > 22) return false;
  if (z > -1.9 && z < 0.9 && !bridges.some(([a, b]) => x > a - 0.4 && x < b + 0.4)) return false;
  return Math.abs(groundBelow(x, z, from + 1.2) - from) <= 0.6;
}

function panelGranja() {
  const rows = animals.map(a => {
    const st = a.state === 'corral' ? 'En el corral' : a.state === 'mascota' ? 'Tu mascota' : a.state === 'casa' ? 'En su casita' : a.state === 'lazo' ? 'Te sigue' : 'Suelto';
    return `<li class="${a.state === 'libre' ? '' : 'ok'}"><b>${a.n}</b><span>${st}</span>${a.state === 'libre' ? `<button class="btn" data-find="${a.i}">Llévame</button>` : `<em>${proyectos[a.p].t}</em>`}</li>`;
  }).join('');
  showPanel(`<p class="p-kicker">LA GRANJA · ${penned}/${animals.length} EN EL CORRAL</p><h2 id="panelTitle">Junta a los animales</h2>
    <p class="lead">Hay 6 animales sueltos por la arena. Acércate a uno y pulsa <strong>E</strong> para lazarlo; te seguirá. Tráelo a este corral y te mostrará uno de mis proyectos. Con los 6 adentro ganas una <strong>mascota</strong>.</p>
    <p>En el mapa de la esquina los ves como cabecitas. Toca <strong>Llévame</strong> para ir hasta uno.</p>
    <ul class="farm-list">${rows}</ul>`, () => {
    panelBody.querySelectorAll('[data-find]').forEach(bt => bt.addEventListener('click', () => {
      const a = animals[+bt.dataset.find]; closePanel(); planTo(a.g.position.x, a.g.position.z + 1.3, () => { if (a.state === 'libre' && Math.hypot(player.position.x - a.g.position.x, player.position.z - a.g.position.z) < 3) lasso(a); });
      toast('➰', 'VAMOS POR ÉL', a.n, 'Al llegar lo lazo automáticamente.', '#16a34a');
    }));
  });
}
function lasso(a) {
  if (a.state === 'corral' && penned === animals.length) { choosePet(a); return; }
  if (a.state !== 'libre') return;
  a.state = 'lazo'; a.rope.visible = true; sfx('open');
  toast('➰', '¡LO LAZASTE!', a.n, 'Te seguirá a donde vayas. Llévalo al corral de la granja.', '#9a6744');
}
const farmQueue = [];
function penAnimal(a) {
  a.state = 'corral'; a.rope.visible = false; penned++; sfx('pop'); award(`pen:${a.id}`, 50, 'Animal al corral'); renderQuests();
  afterPen(); saveProgress(); checkComplete();
  if (panelOpen) { farmQueue.push([a, penned]); return; }
  showFarmCard(a, penned);
}
function showFarmCard(a, count) {
  const pr = proyectos[a.p];
  showPanel(`<p class="p-kicker">GRANJA · ${count}/${animals.length} EN EL CORRAL</p><h2 id="panelTitle">${a.n}</h2>
    <div class="detail"><div>${pixelArt(pr.t, 24, 16)}</div><div>
    <p class="lead">${a.frase}</p><h3>${pr.t}</h3><p>${pr.d}</p>
    <div class="tags">${pr.tags.map(t => `<i>${t}</i>`).join('')}</div>
    <div class="row">${pr.link ? `<a class="btn big" href="${pr.link}" target="_blank" rel="noopener">Ver código <small>en GitHub</small></a>` : ''}<button class="btn" id="farmOk">Seguir jugando</button></div>
    </div></div>`, () => $('#farmOk').addEventListener('click', closePanel));
}
function afterPen() {
  if (penned === animals.length) setTimeout(() => { sfx('win'); confetti(); toast('★', 'GRANJA COMPLETA', '¡Juntaste a todos!', 'Ganaste una mascota: entra al corral y pulsa E junto al animal que quieras.', '#16a34a'); }, 600);
}
function choosePet(a) {
  if (pet) { if (petTag) petTag.visible = false; pet.state = 'corral'; const [x, z] = [(Math.random() * 6 - 3), -5]; pet.g.position.set(x, pet.y, z); }
  pet = a; a.state = 'mascota'; sfx('win'); award('pet', 60, 'Mascota nueva'); onNewPet(); saveProgress();
  toast('♥', 'NUEVA MASCOTA', a.n, 'Ahora te acompaña por toda la arena.', '#ec4899');
}
// ¿puede pisar aquí un animal que te sigue? Sube o baja como tú (máx. 1 bloque hacia arriba) y su cuerpo no queda dentro de un bloque
function followOk(x, z, y) {
  const gy = groundBelow(x, z, y + 1.3);
  if (gy - y > 1.05) return false;
  const i = Math.round(x), k = Math.round(z), j = Math.round(gy + 0.5);
  return !solidCell(i, j, k) && !solidCell(i, j + 1, k) && !(z > -1.5 && z < 0.5 && !bridges.some(([a, b]) => x > a - 0.5 && x < b + 0.5));
}
// lugar libre junto a la jugadora (mismo nivel de suelo, sin muros)
function spotNear(px, pz) {
  for (const [dx, dz] of [[-1, 0], [1, 0], [0, 1], [0, -1], [-1, 1], [1, 1], [-1, -1], [1, -1], [-0.6, 0], [0.6, 0], [0, 0]]) {
    const x = px + dx, z = pz + dz; if (z > -1.7 && z < 0.7) continue; if (Math.abs(groundBelow(x, z, feet + 0.6) - feet) < 0.3) return [x, z, feet];
  }
  return [px, pz, feet];
}
function updateAnimals(dt, t) {
  const p = player.position; const leashed = animals.filter(a => a.state === 'lazo');
  const followers = animals.filter(a => a.state === 'lazo' || a.state === 'mascota');
  animals.forEach(a => {
    if (a.state === 'casa') { a.t += dt; updatePetHome(a, dt, t); return; } // jugando en su casita
    a.t += dt; let moving = false; let tx = null, tz = null, speed = 1.2;
    if ((a.state === 'lazo' || a.state === 'mascota') && swimming) {
      // en el río: nadan detrás de ti y la corriente los lleva contigo (también por debajo de los puentes)
      const k = followers.indexOf(a);
      if (!a.swim) { a.swim = true; sfx('splash'); dust(a.g.position.x, -0.4, a.g.position.z, 12, 0x67e8f9); }
      const tx2 = p.x + 1.1 * (k + 1), tz2 = Math.max(-1.1, Math.min(0.1, p.z + (k % 2 ? 0.35 : -0.35)));
      a.g.position.x += (tx2 - a.g.position.x) * Math.min(1, dt * 4); a.g.position.z += (tz2 - a.g.position.z) * Math.min(1, dt * 4);
      a.y = -0.95; a.g.position.y = a.y + Math.sin(t * 3 + k) * 0.06;
      a.g.rotation.y += (-Math.PI / 2 - a.g.rotation.y) * Math.min(1, dt * 4);
      a.legs.forEach((l, j) => l.rotation.x = Math.sin(a.t * 12 + j) * 0.7);           // patalean nadando
      if (Math.random() < dt * 3) dust(a.g.position.x + 0.3, -0.45, a.g.position.z, 1, 0xe0f4ff);
    } else if (a.state === 'lazo' || a.state === 'mascota') {
      if (a.swim) { // saliste del río (o caíste por el hoyo): te sigue a donde fuiste
        a.swim = false; const k = followers.indexOf(a), [sx, sz, sy] = spotNear(p.x, p.z); a.g.position.set(sx + 0.9 + k * 0.8, sy + 0.4, sz + (k % 2 ? 0.6 : -0.6)); a.y = sy + 0.4;
      }
      const idx = leashed.indexOf(a), lead = a.state === 'mascota' ? null : idx > 0 ? leashed[idx - 1].g.position : null;
      const fx = lead ? lead.x : p.x, fz = lead ? lead.z : p.z, d = Math.hypot(fx - a.g.position.x, fz - a.g.position.z);
      if (d > (a.state === 'mascota' ? 1.4 : 1.6)) { tx = fx; tz = fz; speed = Math.min(9, d * 2.4); }
      if (!lead && feet - a.y > 0.5 && d < 5) { // tú estás más arriba: busca un lugar libre a tu nivel y sube contigo
        const [sx, sz] = spotNear(p.x, p.z); if (Math.hypot(sx - a.g.position.x, sz - a.g.position.z) > 0.15) { tx = sx; tz = sz; speed = 3; } }
      if (d > 6 && !swimming) { const [sx, sz, sy] = spotNear(p.x, p.z); a.g.position.set(sx, sy, sz); a.y = sy; }
      if (a.state === 'lazo' && inCorral(a.g.position.x, a.g.position.z, 0.2)) { penAnimal(a); return; }
    } else {
      if (a.state === 'libre' && a.y > 1.6) { const [sx, sz] = spawnAnimal[a.i]; a.g.position.set(sx, groundBelow(sx, sz, 1.2), sz); a.y = a.g.position.y; a.goal = null; }
      a.wait -= dt;
      if (a.wait <= 0 && !a.goal) {
        for (let k = 0; k < 8 && !a.goal; k++) {
          const nx = a.g.position.x + (Math.random() - 0.5) * 6, nz = a.g.position.z + (Math.random() - 0.5) * 6;
          if (a.state === 'corral' ? inCorral(nx, nz, 0.3) : (animalOk(nx, nz, a.y) && !inCorral(nx, nz, -0.6))) a.goal = [nx, nz];
        }
        a.wait = 2 + Math.random() * 4;
      }
      if (a.goal) { tx = a.goal[0]; tz = a.goal[1]; speed = 1.1; if (Math.hypot(tx - a.g.position.x, tz - a.g.position.z) < 0.2) { a.goal = null; tx = null; } }
    }
    if (tx !== null) {
      const dx = tx - a.g.position.x, dz = tz - a.g.position.z, d = Math.hypot(dx, dz) || 1, st = Math.min(d, speed * dt);
      const nx = a.g.position.x + dx / d * st, nz = a.g.position.z + dz / d * st;
      const free = a.state === 'libre' ? (x, z) => animalOk(x, z, a.y) && !inCorral(x, z, -0.6) : a.state === 'corral' ? (x, z) => inCorral(x, z, 0.1) : (x, z) => followOk(x, z, a.y); // con lazo o mascota: sube 1 bloque contigo, sin atravesar nada
      if (free(nx, nz)) { a.g.position.x = nx; a.g.position.z = nz; moving = true; a.stuck = 0; } else a.goal = null;
      if (!moving && !swimming && (a.state === 'lazo' || a.state === 'mascota') && (a.stuck = (a.stuck || 0) + dt) > 0.7) { // trabado (baranda, río, muro): aparece a tu lado
        const [sx, sz, sy] = spotNear(p.x, p.z); a.g.position.set(sx, sy, sz); a.y = sy; a.stuck = 0; dust(sx, sy + 0.3, sz, 6, 0xffffff); }
      const want = Math.atan2(dx, dz); let df = want - a.g.rotation.y; df = Math.atan2(Math.sin(df), Math.cos(df)); a.g.rotation.y += df * Math.min(1, dt * 8);
    }
    if (a.swim) { if (a.rope.visible) { const pos = a.rope.geometry.attributes.position; pos.setXYZ(0, p.x, feet + 0.5, p.z); pos.setXYZ(1, a.g.position.x, a.g.position.y + 0.6, a.g.position.z); pos.needsUpdate = true; } return; }
    const climb = a.state === 'libre' ? 1.2 : 1.3;
    const gy = groundBelow(a.g.position.x, a.g.position.z, a.y + climb);
    if (gy > a.y + 0.3) a.jumpT = 0.35;                                     // brinca para subir
    a.y += (gy - a.y) * Math.min(1, dt * (gy > a.y ? 9 : 12));
    a.jumpT = Math.max(0, (a.jumpT || 0) - dt);
    if ((a.state === 'lazo' || a.state === 'mascota') && (a.y > feet + 2.2 || a.y < feet - 2.2)) { const [sx, sz, sy] = spotNear(p.x, p.z); a.g.position.set(sx, sy, sz); a.y = sy; } // si quedó en lo alto, baja junto a ti
    const hop = (a.id === 'conejo' && moving ? Math.abs(Math.sin(a.t * 9)) * 0.25 : 0) + Math.sin((a.jumpT || 0) / 0.35 * Math.PI) * 0.45;
    a.g.position.y = a.y + hop;
    const sw = moving ? Math.sin(a.t * 10) * 0.6 : 0; a.legs.forEach((l, k) => l.rotation.x = sw * (k % 2 ? 1 : -1) * (k > 1 ? -1 : 1));
    a.headG.rotation.x = !moving && a.state !== 'lazo' ? Math.max(0, Math.sin(a.t * 0.8)) * 0.5 : 0; // come pasto
    if (a.rope.visible) {
      const pos = a.rope.geometry.attributes.position; const leadP = leashed.indexOf(a) > 0 ? leashed[leashed.indexOf(a) - 1].g.position : null;
      if (leadP) pos.setXYZ(0, leadP.x, leadP.y + 0.6, leadP.z); else pos.setXYZ(0, p.x + Math.cos(player.rotation.y) * 0.4, feet + 1.0, p.z - Math.sin(player.rotation.y) * 0.4);
      pos.setXYZ(1, a.g.position.x, a.g.position.y + 0.8, a.g.position.z); pos.needsUpdate = true;
    }
  });
}
