'use strict';
// Princesas arqueras y rey del castillo.

/* ---------------- GUARDIANES DEL CASTILLO (diseño original) ---------------- */
function buildPrincess() {
  const g = new THREE.Group(), body = new THREE.Group(); g.add(body);
  part(0.62, 0.5, 0.5, 0x0f766e, 0, 0.25, 0, body);            // falda turquesa
  part(0.66, 0.08, 0.54, 0xfbbf24, 0, 0.52, 0, body);           // cinturón dorado
  part(0.5, 0.45, 0.36, 0x14b8a6, 0, 0.78, 0, body);            // blusa
  part(0.46, 0.46, 0.46, 0xf1c9a5, 0, 1.24, 0, body);           // cara
  part(0.5, 0.18, 0.5, 0x5b3a29, 0, 1.5, -0.01, body);          // cabello
  part(0.5, 0.5, 0.12, 0x5b3a29, 0, 1.2, -0.24, body);          // cabello atrás
  part(0.14, 0.6, 0.14, 0x5b3a29, 0, 0.8, -0.3, body);          // trenza
  part(0.07, 0.07, 0.02, 0x1f2937, -0.1, 1.27, 0.235, body); part(0.07, 0.07, 0.02, 0x1f2937, 0.1, 1.27, 0.235, body);
  part(0.36, 0.08, 0.36, 0xe5e7eb, 0, 1.63, 0, body); part(0.08, 0.1, 0.08, 0xf472b6, 0, 1.72, 0.12, body); // tiara
  const arm = new THREE.Group(); arm.position.set(0.3, 0.95, 0); body.add(arm);
  part(0.14, 0.42, 0.14, 0x14b8a6, 0, -0.18, 0, arm);
  const bow = new THREE.Group(); bow.position.set(0, -0.38, 0.12); arm.add(bow);
  part(0.06, 0.7, 0.06, 0x8b5a2b, 0, 0, 0.12, bow); part(0.02, 0.66, 0.02, 0xffffff, 0, 0, 0.02, bow);
  part(0.14, 0.42, 0.14, 0x14b8a6, -0.3, 0.77, 0.05, body);
  return { g, body, arm };
}
function buildKing() {
  const g = new THREE.Group(), body = new THREE.Group(); g.add(body);
  part(0.72, 0.6, 0.52, 0x6d28d9, 0, 0.3, 0, body);             // túnica lila
  part(0.76, 0.1, 0.56, 0xfbbf24, 0, 0.62, 0, body);            // cinturón
  part(0.64, 0.5, 0.42, 0x7c3aed, 0, 0.9, 0, body);
  part(0.86, 0.75, 0.08, 0xdb2777, 0, 0.75, -0.26, body);       // capa rosa
  part(0.86, 0.12, 0.5, 0xffffff, 0, 1.13, -0.02, body);        // cuello de armiño
  part(0.5, 0.48, 0.48, 0xe8b48f, 0, 1.43, 0, body);            // cara
  part(0.5, 0.26, 0.1, 0xf3f4f6, 0, 1.28, 0.24, body);          // barba blanca
  part(0.08, 0.08, 0.02, 0x1f2937, -0.11, 1.5, 0.245, body); part(0.08, 0.08, 0.02, 0x1f2937, 0.11, 1.5, 0.245, body);
  part(0.54, 0.16, 0.54, 0xfbbf24, 0, 1.74, 0, body);           // corona
  [[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2], [0, 0.2]].forEach(([x, z]) => part(0.1, 0.16, 0.1, 0xfbbf24, x, 1.88, z, body));
  part(0.1, 0.1, 0.04, 0xec4899, 0, 1.76, 0.28, body);          // gema
  const arm = new THREE.Group(); arm.position.set(0.4, 1.05, 0); body.add(arm);
  part(0.16, 0.44, 0.16, 0x7c3aed, 0, -0.2, 0, arm);
  part(0.06, 0.9, 0.06, 0xfbbf24, 0, -0.2, 0.14, arm); part(0.16, 0.16, 0.16, 0xec4899, 0, 0.28, 0.14, arm); // cetro
  part(0.16, 0.44, 0.16, 0x7c3aed, -0.4, 0.85, 0, body);
  return { g, body, arm };
}
const princesses = [-6, 6].map(x => { const pr = buildPrincess(); pr.g.position.set(x, 9.5, -17); pr.g.scale.setScalar(1.3); pr.cool = Math.random(); scene.add(pr.g); return pr; });
const king = buildKing(); king.body.rotation.x = -0.25; king.g.position.set(0, 10.5, -19.9); king.g.scale.setScalar(1.75); scene.add(king.g);

const arrows = [];
function shootArrow(pr, m) {
  const from = new THREE.Vector3(pr.g.position.x, pr.g.position.y + 1.1, pr.g.position.z);
  const a = new THREE.Group(); part(0.05, 0.05, 0.7, 0x8b5a2b, 0, 0, 0, a); part(0.12, 0.12, 0.12, 0xe5e7eb, 0, 0, 0.36, a); part(0.14, 0.02, 0.16, 0xf472b6, 0, 0, -0.32, a);
  a.position.copy(from); scene.add(a); arrows.push({ a, from, m, t: 0 }); sfx('arrow');
}
function updateGuards(dt, t) {
  const p = player.position;
  princesses.forEach((pr, k) => {
    pr.cool = Math.max(0, pr.cool - dt);
    let target = null, bd = 11;
    if (night) monsters.forEach(m => { const d = Math.hypot(m.g.position.x - pr.g.position.x, m.g.position.z - pr.g.position.z); if (d < bd && !arrows.some(a => a.m === m)) { bd = d; target = m; } });
    const look = target ? target.g.position : camera.position; // sin monstruos, mira a la cámara
    const want = Math.atan2(look.x - pr.g.position.x, look.z - pr.g.position.z);
    pr.g.rotation.y += Math.atan2(Math.sin(want - pr.g.rotation.y), Math.cos(want - pr.g.rotation.y)) * Math.min(1, dt * 6);
    pr.body.position.y = Math.sin(t * 2 + k) * 0.04;
    pr.arm.rotation.x = target ? -1.5 : -0.2 + Math.sin(t * 1.5 + k) * 0.08;
    if (target && pr.cool === 0) { pr.cool = 1.4; shootArrow(pr, target); }
  });
  for (let i = arrows.length - 1; i >= 0; i--) {
    const ar = arrows[i]; ar.t += dt / 0.45;
    const alive = monsters.includes(ar.m);
    const to = alive ? ar.m.g.position : ar.last || ar.from; ar.last = to.clone ? to.clone() : to;
    const k = Math.min(1, ar.t), x = ar.from.x + (to.x - ar.from.x) * k, z = ar.from.z + (to.z - ar.from.z) * k, y = ar.from.y + (to.y + 0.6 - ar.from.y) * k + Math.sin(k * Math.PI) * 1.5;
    ar.a.lookAt(x, y, z); ar.a.position.set(x, y, z);
    if (k >= 1) {
      scene.remove(ar.a); arrows.splice(i, 1);
      const idx = monsters.indexOf(ar.m);
      if (idx >= 0) { killMonster(ar.m, 0x14b8a6); monsters.splice(idx, 1); sfx('pop'); if (!updateGuards.told) { updateGuards.told = true; toast('➶', 'TORRES DE PRINCESA', '¡Te están cuidando!', 'Las princesas del castillo disparan flechas a los monstruos que se acercan.', '#0d9488'); } }
    }
  }
  // el rey saluda cuando te acercas
  const dk = Math.hypot(p.x - king.g.position.x, p.z - king.g.position.z);
  const wantK = Math.atan2(camera.position.x - king.g.position.x, camera.position.z - king.g.position.z); // siempre de frente a la cámara
  king.g.rotation.y += Math.atan2(Math.sin(wantK - king.g.rotation.y), Math.cos(wantK - king.g.rotation.y)) * Math.min(1, dt * 3);
  king.body.position.y = Math.sin(t * 1.6) * 0.03;
  king.arm.rotation.z = dk < 9 ? 2.4 + Math.sin(t * 8) * 0.35 : 0.15;
}
