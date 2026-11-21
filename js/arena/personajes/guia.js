'use strict';
// La guía que camina y te lleva a cada lugar.

/* ---------------- GUÍA ---------------- */
const npc = new THREE.Group(); scene.add(npc);
{ rig = npc; P = {}; personajes[0].build(); }
const npcP = P, npcHead = head; rig = mainRig;
npc.position.set(3.2, 0.5, 16.2); npc.rotation.y = Math.PI;
const npcSign = label('Allison · Guía', '#be185d'); npcSign.scale.set(4, 1, 1); npcSign.position.set(3.2, 2.9, 16.2); scene.add(npcSign);
const npcBubble = label('¡Hola! Pulsa E', '#d97706'); npcBubble.scale.set(3.4, 0.85, 1); npcBubble.position.set(3.2, 4.1, 16.2); npcBubble.visible = false; scene.add(npcBubble);
function talkNpc() {
  if (guide.state === 'leading') { toast('➜', 'LA GUÍA', 'Ya vamos en camino', 'Sígueme, ya casi llegamos.', '#be185d'); return; }
  sfx('open');
  showPanel(`<p class="p-kicker">LA GUÍA DE LA ARENA</p><h2 id="panelTitle">¡Hola, bienvenida!</h2>
    <div class="grid2"><div><div class="photo"><img src="img/allison.jpg" alt="Fotografía de Allison Vargas"></div></div><div>
    <p class="lead">Soy <strong>Allison</strong>, desarrolladora de software en formación en Campuslands. Construí esta arena para que conozcas mi trabajo jugando.</p>
    <p>Cada edificio es una parte de mí: la <strong>casa</strong> es quién soy, la <strong>torre de proyectos</strong> guarda lo que he construido, la <strong>torre arcade</strong> tiene mis apps funcionando y en el <strong>castillo</strong> está mi historia y mi contacto.</p>
    <p>Los <strong>bloques brillantes</strong> son mis habilidades: pícalos. Los <strong>animales</strong> llévalos al corral y cada uno te mostrará un proyecto.</p>
    <h3>¿A dónde quieres ir? Sígueme y te enseño</h3>
    <div class="row"><button class="btn" data-go="casa">La casa</button><button class="btn" data-go="proyectos">Proyectos</button><button class="btn" data-go="apps">Torre arcade</button><button class="btn" data-go="granja">La granja</button><button class="btn" data-go="musica">Escenario</button><button class="btn" data-go="castillo">Castillo</button><button class="btn big" id="npcQuick">Ver todo rápido <small>sin jugar</small></button></div>
    </div></div>`, () => {
    panelBody.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => { closePanel(); guideTo(b.dataset.go); }));
    $('#npcQuick').addEventListener('click', openQuick);
  });
  progress.npc = true; saveProgress();
}

/* ---------------- LA GUÍA CAMINA Y TÚ LA SIGUES ---------------- */
const NPC_HOME = [3.2, 16.2];
// rutas por los caminos de arena (sin chocar con nada)
const guideRoutes = {
  casa: [[3.2, 18], [-9, 18], [-11, 18], [-11, 17.4]],
  musica: [[3.2, 18], [11, 18], [11, 17.2]],
  proyectos: [[3.2, 18], [-9, 18], [-9, -8.4]],
  apps: [[3.2, 18], [9, 18], [9, -8.4]],
  granja: [[3.2, 18], [9, 18], [9, -2], [1, -2], [0, -2.2]],
  castillo: [[3.2, 18], [9, 18], [9, -8.5], [0, -8.5], [0, -14.2]],
  cofre: [[3.2, 18], [9, 18], [9, -8.5], [1.5, -8.5], [1.5, -14.5], [4.2, -14.5]]
};
let guide = { state: 'casa', route: [], dest: null, waitT: 0, walkT: 0 };
guide.state = 'home';
function guideTo(id) {
  const L = lugares.find(l => l.id === id); if (!L) return;
  guide.dest = L; guide.route = guideRoutes[id].map(a => a.slice()); guide.state = 'leading'; guide.waitT = 0;
  // si ya no está en casa, primero vuelve a la plaza
  if (Math.hypot(npc.position.x - NPC_HOME[0], npc.position.z - NPC_HOME[1]) > 3) guide.route = guideRoutes[guide.lastId || 'casa'].slice().reverse().concat(guide.route);
  guide.lastId = id; sfx('open');
  toast('➜', '¡SÍGUEME!', 'Vamos a: ' + L.n, 'Camina detrás de la guía. Si te quedas atrás, te espera.', '#be185d');
}
function guideStep(dt) {
  if (guide.state !== 'leading' && guide.state !== 'returning') return false;
  const p = player.position, tgt = guide.route[0];
  if (!tgt) {
    if (guide.state === 'leading') { guide.state = 'arrived'; guide.waitT = 0; sfx('pop'); toast('★', '¡AQUÍ ES!', guide.dest.n, guide.dest.id === 'cofre' ? 'Pulsa E junto al cofre.' : 'Camina a la puerta y pulsa E para entrar.', '#be185d'); }
    else guide.state = 'home';
    return false;
  }
  const far = Math.hypot(p.x - npc.position.x, p.z - npc.position.z);
  if (guide.state === 'leading' && far > 6.5) { guide.waiting = true; return false; }
  guide.waiting = false;
  const dx = tgt[0] - npc.position.x, dz = tgt[1] - npc.position.z, d = Math.hypot(dx, dz);
  if (d < 0.15) { guide.route.shift(); return true; }
  const st = Math.min(d, (guide.state === 'returning' ? 3.6 : 3.1) * dt);
  npc.position.x += dx / d * st; npc.position.z += dz / d * st;
  const want = Math.atan2(dx, dz); let df = want - npc.rotation.y; df = Math.atan2(Math.sin(df), Math.cos(df)); npc.rotation.y += df * Math.min(1, dt * 10);
  return true;
}
function updateNpc(dt, t) {
  const p = player.position, d = Math.hypot(p.x - npc.position.x, p.z - npc.position.z);
  const walking = guideStep(dt);
  if (!walking) {
    const want = d < 7 ? Math.atan2(p.x - npc.position.x, p.z - npc.position.z) : Math.PI;
    let df = want - npc.rotation.y; df = Math.atan2(Math.sin(df), Math.cos(df)); npc.rotation.y += df * Math.min(1, dt * 4);
  }
  guide.walkT += walking ? dt * 9 : 0;
  const sw = walking ? Math.sin(guide.walkT) * 0.7 : 0;
  npcP.legL.g.rotation.x = sw; npcP.legR.g.rotation.x = -sw; npcP.armL.g.rotation.x = -sw * 0.8;
  const beckon = guide.waiting || guide.state === 'arrived' || (!walking && d < 4);
  npcP.armR.g.rotation.x = walking ? sw * 0.8 : beckon ? -2.6 + Math.sin(t * 8) * 0.35 : -0.2; npcP.armR.g.rotation.z = beckon && !walking ? -0.3 : 0;
  npcHead.rotation.z = Math.sin(t * 1.5) * 0.05;
  npc.position.y = groundBelow(npc.position.x, npc.position.z, 2) + (walking ? Math.abs(Math.sin(guide.walkT)) * 0.06 : Math.sin(t * 2) * 0.02);
  // llegó: espera a que entres o te acerques, luego vuelve a casa
  if (guide.state === 'arrived') {
    guide.waitT += dt;
    const dd = Math.hypot(p.x - guide.dest.door[0], p.z - guide.dest.door[1]);
    if ((dd < 2.5 && guide.waitT > 2) || guide.waitT > 30 || panelOpen) { guide.state = 'returning'; guide.route = guideRoutes[guide.dest.id].slice(0, -1).reverse().concat([NPC_HOME]); }
  }
  // letreros y zona para tocarla siguen a la guía
  npcSign.position.set(npc.position.x, npc.position.y + 2.4, npc.position.z);
  const msg = guide.waiting ? '¡Sígueme! Te espero' : guide.state === 'leading' ? '¡Por aquí!' : guide.state === 'arrived' ? '¡Aquí es! Pulsa E' : !progress.npc ? '¡Hola! Pulsa E' : '';
  if (msg !== guide.msg) { guide.msg = msg; if (msg) { const s2 = label(msg, '#d97706'); npcBubble.material.map = s2.material.map; npcBubble.material.needsUpdate = true; } }
  npcBubble.visible = started && !selecting && feet > -1 && !!msg && (d < 9 || guide.state !== 'home');
  npcSign.visible = feet > -1 || npc.position.y < -1; // bajo tierra no se cuela el letrero
  npcBubble.position.set(npc.position.x, npc.position.y + 3.6 + Math.sin(t * 3) * 0.1, npc.position.z);
  if (!guide.hit) guide.hit = hitMeshes.find(m => m.userData.id === 'npc');
  if (guide.hit) guide.hit.position.set(npc.position.x, 1.1, npc.position.z);
}
