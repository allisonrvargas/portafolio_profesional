'use strict';
// Pececitos que nadan en el río. Si te acercas a la orilla, uno se asoma y te avisa que te puedes caer.

const pecesColores = [[0xfb923c, 0xffffff], [0xf472b6, 0xfde68a], [0x38bdf8, 0xffffff], [0xfacc15, 0xf97316], [0xa78bfa, 0xffffff], [0x34d399, 0x065f46], [0xfb7185, 0xfde68a]];
const peces = pecesColores.map(([c, f], i) => {
  const g = new THREE.Group(), body = new THREE.Group(); g.add(body);
  part(0.36, 0.2, 0.14, c, 0, 0, 0, body);                         // cuerpo
  part(0.1, 0.2, 0.15, f, 0.06, 0, 0, body);                       // franja
  const tail = new THREE.Group(); tail.position.x = -0.18; body.add(tail);
  part(0.14, 0.2, 0.05, c, -0.07, 0, 0, tail);                      // cola
  part(0.05, 0.05, 0.02, 0x111111, 0.13, 0.04, 0.075, body); part(0.05, 0.05, 0.02, 0x111111, 0.13, 0.04, -0.075, body); // ojos
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
