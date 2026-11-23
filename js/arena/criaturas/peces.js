'use strict';
// Pececitos que nadan en el río. Si te acercas a la orilla, uno se asoma y te avisa que te puedes caer.
// Abajo, en el lago de la cueva donde cae la cascada, también nadan peces (los que trajo la corriente).

const pecesColores = [[0xfb923c, 0xffffff], [0xf472b6, 0xfde68a], [0x38bdf8, 0xffffff], [0xfacc15, 0xf97316], [0xa78bfa, 0xffffff], [0x34d399, 0x065f46], [0xfb7185, 0xfde68a]];
function pezModel(c, f) {
  const g = new THREE.Group(), body = new THREE.Group(); g.add(body);
  part(0.36, 0.2, 0.14, c, 0, 0, 0, body);                         // cuerpo
  part(0.1, 0.2, 0.15, f, 0.06, 0, 0, body);                       // franja
  const tail = new THREE.Group(); tail.position.x = -0.18; body.add(tail);
  part(0.14, 0.2, 0.05, c, -0.07, 0, 0, tail);                      // cola
  part(0.05, 0.05, 0.02, 0x111111, 0.13, 0.04, 0.075, body); part(0.05, 0.05, 0.02, 0x111111, 0.13, 0.04, -0.075, body); // ojos
  return { g, body, tail };
}
const peces = pecesColores.map(([c, f], i) => {
  const { g, body, tail } = pezModel(c, f);
  g.position.set(-9 + i * 3.4, -0.72, -1.2 + (i % 3) * 0.6); scene.add(g);
  return { g, body, tail, dir: i % 2 ? 1 : -1, sp: 0.6 + Math.random() * 0.5, z: g.position.z, t: Math.random() * 6, jump: 0 };
});
const fishBubble = label('¡Cuidado!', '#0369a1'); fishBubble.scale.set(2, 0.5, 1); fishBubble.visible = false; scene.add(fishBubble);
let fishWarnT = 0, fishBubbleT = 0, fishWarned = null;
const fishOnBridge = x => bridges.some(([a, b]) => x > a - 0.6 && x < b + 0.6);
function updatePeces(dt, t) {
  const p = player.position;
  // ¿estás en la orilla, a punto de caer?
  const bank = !swimming && !driving && feet > 0.2 && feet < 1.2 && p.x > -15 && p.x < 15.5 && !fishOnBridge(p.x) &&
    ((p.z > 0.5 && p.z < 1.7) || (p.z > -2.7 && p.z < -1.5));
  fishWarnT = Math.max(0, fishWarnT - dt);
  let nearest = null, nd = 4.5;
  peces.forEach(f => {
    f.t += dt;
    if (bank && f.g.position.x > -10.5) { const d = Math.abs(f.g.position.x - p.x); if (d < nd) { nd = d; nearest = f; } }
    if (f.jump > 0) { // se asoma a avisarte
      f.jump -= dt; const k = 1 - f.jump / 1.2;
      f.g.position.y = -0.72 + Math.sin(k * Math.PI) * 0.75; f.body.rotation.z = Math.cos(k * Math.PI) * 0.8;
    } else {
      // nada de lado a lado; si nadas cerca, se aleja rápido
      const flee = swimming && Math.hypot(p.x - f.g.position.x, p.z - f.g.position.z) < 1.4;
      if (flee) f.dir = f.g.position.x > p.x ? 1 : -1;
      f.g.position.x += f.dir * f.sp * (flee ? 4 : 1) * dt;
      if (f.g.position.x > 15) f.dir = -1; if (f.g.position.x < -10.5) f.dir = 1;
      f.g.position.z = f.z + Math.sin(f.t * 0.7) * 0.25;
      f.g.position.y = -0.72 + Math.sin(f.t * 2.4) * 0.04; f.body.rotation.z = 0;
    }
    f.g.rotation.y = f.dir > 0 ? 0 : Math.PI;
    f.tail.rotation.y = Math.sin(f.t * (f.jump > 0 ? 18 : 9)) * 0.6;
  });
  // el pececito más cercano viene hacia ti y te avisa
  if (nearest) {
    if (Math.abs(nearest.g.position.x - p.x) > 0.6 && nearest.jump <= 0) nearest.dir = p.x > nearest.g.position.x ? 1 : -1;
    nearest.z += ((p.z > 0 ? 0.1 : -1.1) - nearest.z) * Math.min(1, dt * 2);
    if (fishWarnT === 0 && Math.abs(nearest.g.position.x - p.x) < 1.4) {
      fishWarnT = 18; nearest.jump = 1.2; fishWarned = nearest; fishBubbleT = 2.8; sfx('splashOut');
      toast('≈', '¡BLUB, BLUB!', 'Un pececito te avisa: ¡cuidado!', 'Te puedes caer al río. Si caes, la corriente te llevará hasta la cueva.', '#0369a1');
    }
  }
  fishBubbleT = Math.max(0, fishBubbleT - dt);
  fishBubble.visible = fishBubbleT > 0 && !!fishWarned && feet > -1;
  if (fishBubble.visible) fishBubble.position.set(fishWarned.g.position.x, Math.max(fishWarned.g.position.y, -0.4) + 1.1, fishWarned.g.position.z);
}

/* ---- peces del lago de la cueva, debajo de la cascada ---- */
const LAGO_Y = -5.6, LAGO_C = [-16.2, -0.5]; // nadan alrededor de la caída de agua
const pecesLago = [[0xfb923c, 0xffffff], [0x38bdf8, 0xfde68a], [0xf472b6, 0xffffff], [0xfacc15, 0x0ea5e9]].map(([c, f], i) => {
  const m = pezModel(c, f); m.g.scale.setScalar(0.85); scene.add(m.g);
  return { ...m, a: i * 1.6, sp: (i % 2 ? -1 : 1) * (0.5 + i * 0.12), rx: 1.05 + (i % 2) * 0.15, rz: 1.3 + (i % 3) * 0.1, t: Math.random() * 6, jump: 0, flee: 0 };
});
let lagoJumpT = 4;
function updatePecesLago(dt, t) {
  const p = player.position, cerca = feet < -3 && Math.hypot(p.x - LAGO_C[0], p.z - LAGO_C[1]) < 6;
  pecesLago.forEach(f => f.g.visible = cerca || camMode === 'arriba');
  if (!cerca) return;
  lagoJumpT -= dt;
  if (lagoJumpT <= 0) { lagoJumpT = 5 + Math.random() * 6; const f = pecesLago[Math.floor(Math.random() * pecesLago.length)]; if (f.jump <= 0) { f.jump = 1; sfx('splashOut'); } } // de vez en cuando uno salta
  pecesLago.forEach(f => {
    f.t += dt;
    const near = Math.hypot(p.x - f.g.position.x, p.z - f.g.position.z) < 1.1 && feet < -5;
    if (near && f.flee <= 0) { f.flee = 1.2; f.sp = -f.sp; } // si te metes al lago, se van nadando rápido
    f.flee = Math.max(0, f.flee - dt);
    const v = f.sp * (f.flee > 0 ? 3 : 1);
    f.a += v * dt;
    const x = LAGO_C[0] + Math.cos(f.a) * f.rx, z = LAGO_C[1] + Math.sin(f.a) * f.rz;
    const dx = -Math.sin(f.a) * f.rx * Math.sign(v), dz = Math.cos(f.a) * f.rz * Math.sign(v);
    f.g.position.x = x; f.g.position.z = z; f.g.rotation.y = Math.atan2(-dz, dx);
    if (f.jump > 0) { f.jump -= dt; const k = 1 - f.jump; f.g.position.y = LAGO_Y + Math.sin(k * Math.PI) * 0.7; f.body.rotation.z = Math.cos(k * Math.PI) * 0.8; }
    else { f.g.position.y = LAGO_Y + Math.sin(f.t * 2.4) * 0.04; f.body.rotation.z = 0; }
    f.tail.rotation.y = Math.sin(f.t * (f.flee > 0 || f.jump > 0 ? 18 : 9)) * 0.6;
  });
}
