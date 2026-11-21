'use strict';
// Bloques de habilidad para picar y picos por niveles.

/* ---------------- BLOQUES DE HABILIDAD ---------------- */
const ores = [];
const oreCells = new Set();
habilidades.forEach((h, i) => {
  const [x, z] = orePos[i];
  oreCells.add(`${x},1,${z}`);
  const m = new THREE.Mesh(unit, new THREE.MeshLambertMaterial({ map: oreTexture(h.c, 300 + i), emissive: new THREE.Color(h.c), emissiveIntensity: 0.18 }));
  m.position.set(x, 1, z); m.castShadow = true; m.userData = { kind: 'ore', i }; scene.add(m); hitMeshes.push(m);
  const tag = label(h.n, h.c); tag.scale.set(4, 1, 1); tag.position.set(x, 2.5, z); tag.visible = false; scene.add(tag);
  ores.push({ m, tag, i, x, z, mined: false });
});

/* ---------------- HERRAMIENTAS ---------------- */
const picos = [
  { n: 'Pico de madera', c: 0xb07a55, css: '#b07a55', t: 1.5, from: 0 },
  { n: 'Pico de piedra', c: 0x9a98a6, css: '#9a98a6', t: 1.1, from: 4 },
  { n: 'Pico de hierro', c: 0xeef0f4, css: '#cbd5e1', t: 0.8, from: 8 },
  { n: 'Pico de oro', c: 0xfcd34d, css: '#fbbf24', t: 0.55, from: 12 },
  { n: 'Pico de diamante', c: 0x5eead4, css: '#2dd4bf', t: 0.35, from: 16 }
];
const tier = () => { let k = 0; picos.forEach((x, i) => { if (minedCount >= x.from) k = i; }); return k; };
function buildTool() {
  if (!toolHolder) return;
  while (toolHolder.children.length) toolHolder.remove(toolHolder.children[0]);
  const pk = picos[tier()];
  part(0.07, 0.7, 0.07, 0x7a4e3a, 0, 0, 0.18, toolHolder).rotation.x = Math.PI / 2;
  const headT = new THREE.Group(); headT.position.set(0, 0, 0.52); toolHolder.add(headT);
  part(0.62, 0.1, 0.1, pk.c, 0, 0, 0, headT);
  part(0.1, 0.1, 0.1, pk.c, -0.3, -0.08, 0, headT); part(0.1, 0.1, 0.1, pk.c, 0.3, -0.08, 0, headT);
  updateToolHud();
}
function updateToolHud() {
  const pk = picos[tier()], el = $('#toolName'); if (!el) return;
  el.textContent = pk.n; $('#toolIcon').style.background = pk.css;
}
