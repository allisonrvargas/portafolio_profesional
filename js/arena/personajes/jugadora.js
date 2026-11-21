'use strict';
// Tu personaje y las 10 cartas de personajes originales.

/* ---------------- PERSONAJES (cartas originales) ---------------- */
const player = new THREE.Group(); scene.add(player);
const mainRig = new THREE.Group(); player.add(mainRig);
let rig = mainRig;
let P = {}, head, crown, toolHolder;
function part(w, h, d, color, x, y, z, parent = rig) { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshLambertMaterial({ color })); m.position.set(x, y, z); m.castShadow = true; parent.add(m); return m; }
function limb(w, h, d, color, x, y, z) { const g = new THREE.Group(); g.position.set(x, y, z); rig.add(g); const m = part(w, h, d, color, 0, -h / 2, 0, g); return { g, m }; }
function baseBody(c) {
  P.legL = limb(0.26, 0.6, 0.28, c.legs, -0.15, 0.62, 0);
  P.legR = limb(0.26, 0.6, 0.28, c.legs, 0.15, 0.62, 0);
  P.body = part(0.6, 0.66, 0.34, c.body, 0, 0.95, 0);
  P.armL = limb(0.2, 0.62, 0.24, c.arms || c.body, -0.41, 1.26, 0);
  P.armR = limb(0.2, 0.62, 0.24, c.arms || c.body, 0.41, 1.26, 0);
  head = new THREE.Group(); head.position.set(0, 1.56, 0); rig.add(head);
  part(0.56, 0.56, 0.52, c.skin, 0, 0, 0, head);
  part(0.09, 0.09, 0.02, c.eyes || 0x2a1408, -0.12, 0.02, 0.265, head); part(0.09, 0.09, 0.02, c.eyes || 0x2a1408, 0.12, 0.02, 0.265, head);
  if (c.mouth !== false) part(0.12, 0.04, 0.02, 0xd9667f, 0, -0.14, 0.265, head);
}
const personajes = [
  { id: 'allison', n: 'Allison', rol: 'Constructora', rar: 'Legendaria', cost: 5, c1: '#ec4899', c2: '#fcd34d', d: 'Desarrolladora full stack. Construye mundos bloque a bloque con sus audífonos puestos.',
    build() {
      baseBody({ legs: 0x2b3a67, body: 0xec4899, skin: 0xb98263 });
      part(0.18, 0.5, 0.02, 0xffffff, 0, 1.0, 0.175);
      part(0.6, 0.18, 0.56, 0x161018, 0, 0.24, 0, head); part(0.6, 0.8, 0.14, 0x161018, 0, -0.12, -0.26, head);
      part(0.1, 0.62, 0.5, 0x161018, -0.29, -0.06, -0.02, head); part(0.1, 0.62, 0.5, 0x161018, 0.29, -0.06, -0.02, head);
      part(0.66, 0.08, 0.12, 0xf9a8d4, 0, 0.36, 0, head); part(0.1, 0.22, 0.22, 0xec4899, -0.34, 0.02, 0, head); part(0.1, 0.22, 0.22, 0xec4899, 0.34, 0.02, 0, head);
    } },
  { id: 'caballera', n: 'Caballera Rosa', rol: 'Defensora', rar: 'Épica', cost: 4, c1: '#a78bfa', c2: '#f472b6', d: 'Armadura brillante y capa rosa. Protege la torre de proyectos de cualquier bug.',
    build() {
      baseBody({ legs: 0x9ca3af, body: 0xd1d5db, arms: 0xc0c4cc, skin: 0xcfd3da, eyes: 0x1f2937, mouth: false });
      part(0.62, 0.1, 0.36, 0xf472b6, 0, 0.66, 0); part(0.55, 0.7, 0.06, 0xf472b6, 0, 0.98, -0.2);
      part(0.6, 0.1, 0.56, 0xb8bcc6, 0, 0.27, 0, head); part(0.6, 0.06, 0.04, 0x1f2937, 0, 0.03, 0.27, head);
      part(0.08, 0.3, 0.4, 0xec4899, 0, 0.45, -0.02, head); part(0.08, 0.2, 0.2, 0xf9a8d4, 0, 0.62, -0.12, head);
    } },
  { id: 'arquera', n: 'Arquera del Bosque', rol: 'Exploradora', rar: 'Especial', cost: 3, c1: '#14b8a6', c2: '#86efac', d: 'Ojo de águila: encuentra los bloques de habilidad escondidos entre los cerezos.',
    build() {
      baseBody({ legs: 0x5b4636, body: 0x2f855a, arms: 0x2f855a, skin: 0xe6b48f });
      part(0.64, 0.66, 0.6, 0x276749, 0, 0.08, -0.03, head); part(0.5, 0.36, 0.04, 0xe6b48f, 0, -0.03, 0.27, head);
      part(0.09, 0.09, 0.02, 0x3b2a1a, -0.12, 0.02, 0.29, head); part(0.09, 0.09, 0.02, 0x3b2a1a, 0.12, 0.02, 0.29, head);
      part(0.22, 0.6, 0.18, 0x7a4e3a, 0.16, 1.0, -0.26); part(0.04, 0.2, 0.04, 0xfcd34d, 0.12, 1.36, -0.26); part(0.04, 0.2, 0.04, 0xfcd34d, 0.2, 1.38, -0.26);
    } },
  { id: 'maga', n: 'Maga de Código', rol: 'Hechicera', rar: 'Épica', cost: 4, c1: '#8b5cf6', c2: '#c4b5fd', d: 'Convierte ideas en funciones con un toque de su varita. Sus hechizos compilan a la primera.',
    build() {
      baseBody({ legs: 0x5b21b6, body: 0x7c3aed, arms: 0x7c3aed, skin: 0xd39b78 });
      part(0.64, 0.34, 0.4, 0x7c3aed, 0, 0.5, 0); part(0.12, 0.12, 0.02, 0xfcd34d, 0.12, 1.1, 0.175);
      part(0.6, 0.6, 0.12, 0xf5f5f5, 0, -0.08, -0.25, head); part(0.6, 0.12, 0.56, 0xf5f5f5, 0, 0.24, 0, head);
      part(0.8, 0.08, 0.8, 0x5b21b6, 0, 0.32, 0, head); part(0.46, 0.3, 0.46, 0x6d28d9, 0, 0.5, 0, head); part(0.28, 0.26, 0.28, 0x7c3aed, 0.04, 0.76, -0.04, head); part(0.12, 0.12, 0.12, 0xfcd34d, 0.08, 0.92, -0.06, head);
    } },
  { id: 'robot', n: 'Byte', rol: 'Robot programador', rar: 'Común', cost: 2, c1: '#0ea5e9', c2: '#f9a8d4', d: 'Pequeño robot que nunca se cansa de correr pruebas. Su antena capta wifi y buenas ideas.',
    build() {
      baseBody({ legs: 0x64748b, body: 0x94a3b8, arms: 0x7c8ea3, skin: 0xb8c4d2, eyes: 0x22d3ee, mouth: false });
      part(0.42, 0.3, 0.02, 0x0f172a, 0, 0.02, 0.265, head); part(0.09, 0.09, 0.03, 0x22d3ee, -0.1, 0.05, 0.275, head); part(0.09, 0.09, 0.03, 0x22d3ee, 0.1, 0.05, 0.275, head); part(0.16, 0.03, 0.03, 0xf472b6, 0, -0.06, 0.275, head);
      part(0.04, 0.3, 0.04, 0x475569, 0, 0.42, 0, head); part(0.12, 0.12, 0.12, 0xf472b6, 0, 0.6, 0, head);
      part(0.3, 0.2, 0.04, 0x0f172a, 0, 1.02, 0.18); part(0.06, 0.06, 0.02, 0x22c55e, -0.07, 1.04, 0.205); part(0.06, 0.06, 0.02, 0xf472b6, 0.07, 1.04, 0.205);
    } },
  { id: 'martilla', n: 'Martilla de Cristal', rol: 'Guerrera', rar: 'Épica', cost: 5, c1: '#c084fc', c2: '#67e8f9', d: 'Rompe muros de bugs con su martillo de cristal. Lleva trenzas rosas y una armadura lila.',
    build() {
      baseBody({ legs: 0x6d28d9, body: 0xa78bfa, arms: 0xc4b5fd, skin: 0xe8b796 });
      part(0.64, 0.12, 0.38, 0xfcd34d, 0, 0.7, 0); part(0.66, 0.22, 0.38, 0x8b5cf6, 0, 1.18, 0);
      part(0.6, 0.2, 0.56, 0xf472b6, 0, 0.23, 0, head); part(0.12, 0.6, 0.12, 0xf472b6, -0.3, -0.25, -0.12, head); part(0.12, 0.6, 0.12, 0xf472b6, 0.3, -0.25, -0.12, head);
      part(0.14, 0.14, 0.14, 0xfcd34d, -0.3, -0.58, -0.12, head); part(0.14, 0.14, 0.14, 0xfcd34d, 0.3, -0.58, -0.12, head);
      part(0.08, 0.9, 0.08, 0x7a4e3a, -0.36, 1.05, -0.24); part(0.5, 0.32, 0.32, 0x67e8f9, -0.36, 1.55, -0.24); part(0.3, 0.2, 0.36, 0xa5f3fc, -0.36, 1.55, -0.24);
    } },
  { id: 'golem', n: 'Gólem de Musgo', rol: 'Tanque', rar: 'Épica', cost: 7, c1: '#65a30d', c2: '#a3e635', d: 'Lento pero imparable. Crece flores rosas en la espalda y carga con los proyectos más pesados.',
    build() {
      baseBody({ legs: 0x78716c, body: 0x8a8580, arms: 0x78716c, skin: 0x9ca3af, eyes: 0x84cc16, mouth: false });
      P.body.scale.set(1.35, 1.1, 1.3); P.armL.g.position.x = -0.55; P.armR.g.position.x = 0.55; P.armL.m.scale.set(1.6, 1.15, 1.4); P.armR.m.scale.set(1.6, 1.15, 1.4);
      part(0.62, 0.14, 0.58, 0x4d7c0f, 0, 0.28, 0, head); part(0.84, 0.16, 0.5, 0x4d7c0f, 0, 1.3, 0);
      part(0.12, 0.12, 0.12, 0xf472b6, -0.2, 1.42, -0.1); part(0.12, 0.12, 0.12, 0xf9a8d4, 0.16, 1.42, 0.08); part(0.12, 0.12, 0.12, 0xfcd34d, 0.05, 0.4, -0.1, head);
      part(0.3, 0.06, 0.02, 0x3f3f46, 0, -0.14, 0.265, head);
    } },
  { id: 'dj', n: 'Calaverita DJ', rol: 'Animadora', rar: 'Rara', cost: 3, c1: '#f43f5e', c2: '#fda4af', d: 'Pone el ritmo en el escenario. Cuando suena la música baila más que nadie.',
    build() {
      baseBody({ legs: 0x1f2937, body: 0x111827, arms: 0xf3f4f6, skin: 0xf9fafb, eyes: 0x111827, mouth: false });
      P.legL.m.scale.set(0.6, 1, 0.6); P.legR.m.scale.set(0.6, 1, 0.6); P.armL.m.scale.set(0.6, 1, 0.6); P.armR.m.scale.set(0.6, 1, 0.6);
      part(0.14, 0.14, 0.02, 0x111827, -0.12, 0.02, 0.266, head); part(0.14, 0.14, 0.02, 0x111827, 0.12, 0.02, 0.266, head);
      [-0.15, -0.05, 0.05, 0.15].forEach(x => part(0.06, 0.08, 0.02, 0x9ca3af, x, -0.17, 0.266, head));
      part(0.66, 0.08, 0.12, 0xf43f5e, 0, 0.32, 0, head); part(0.12, 0.26, 0.26, 0xfda4af, -0.34, 0.02, 0, head); part(0.12, 0.26, 0.26, 0xfda4af, 0.34, 0.02, 0, head);
      [0.85, 1.0, 1.15].forEach(y => part(0.5, 0.05, 0.02, 0xf9fafb, 0, y, 0.175));
    } },
  { id: 'minera', n: 'Minera Exploradora', rol: 'Recolectora', rar: 'Especial', cost: 3, c1: '#f59e0b', c2: '#fde68a', d: 'Experta en encontrar bloques brillantes. Su linterna ilumina hasta las cuevas más oscuras.',
    build() {
      baseBody({ legs: 0x92400e, body: 0x1d4ed8, arms: 0xc2410c, skin: 0xc68a6a });
      part(0.6, 0.66, 0.06, 0x2563eb, 0, 0.92, 0.18); part(0.08, 0.5, 0.02, 0xfcd34d, -0.2, 1.08, 0.215); part(0.08, 0.5, 0.02, 0xfcd34d, 0.2, 1.08, 0.215);
      part(0.64, 0.24, 0.6, 0xfbbf24, 0, 0.3, 0, head); part(0.7, 0.06, 0.66, 0xf59e0b, 0, 0.19, 0, head); part(0.16, 0.14, 0.06, 0xfef9c3, 0, 0.3, 0.31, head);
      part(0.6, 0.4, 0.12, 0x6b3f1d, 0, -0.08, -0.25, head);
    } },
  { id: 'alquimista', n: 'Alquimista Lila', rol: 'Sanadora', rar: 'Épica', cost: 4, c1: '#a855f7', c2: '#f0abfc', d: 'Mezcla pociones de café y buenas ideas. Arregla cualquier error con un frasquito.',
    build() {
      baseBody({ legs: 0x581c87, body: 0x7e22ce, arms: 0x9333ea, skin: 0xf0c8a8 });
      part(0.68, 0.66, 0.6, 0x6b21a8, 0, 0.06, -0.04, head); part(0.48, 0.34, 0.04, 0xf0c8a8, 0, -0.03, 0.27, head);
      part(0.09, 0.09, 0.02, 0x4c1d95, -0.12, 0.02, 0.295, head); part(0.09, 0.09, 0.02, 0x4c1d95, 0.12, 0.02, 0.295, head); part(0.2, 0.2, 0.2, 0x6b21a8, 0, 0.42, -0.2, head);
      part(0.66, 0.08, 0.38, 0xfcd34d, 0, 0.7, 0);
      [[-0.2, 0x22d3ee], [0, 0xf472b6], [0.2, 0x84cc16]].forEach(([x, c]) => { part(0.1, 0.14, 0.08, c, x, 0.62, 0.2); part(0.05, 0.05, 0.05, 0xf5f5f5, x, 0.72, 0.2); });
    } },
];
let charIndex = 0;
function buildCharacter(i) {
  charIndex = i; rig = mainRig;
  while (rig.children.length) rig.remove(rig.children[0]);
  P = {}; personajes[i].build();
  crown = new THREE.Group(); crown.position.set(0, personajes[i].id === 'maga' ? 1.02 : 0.44, 0); head.add(crown); crown.visible = minedCount === habilidades.length;
  part(0.46, 0.12, 0.42, 0xfcd34d, 0, 0, 0, crown); [[-0.17, 0.17], [0.17, 0.17], [-0.17, -0.15], [0.17, -0.15], [0, 0.17]].forEach(([x, z]) => part(0.1, 0.14, 0.1, 0xfbbf24, x, 0.12, z, crown));
  toolHolder = new THREE.Group(); toolHolder.position.set(0, -0.58, 0.06); P.armR.g.add(toolHolder); buildTool();
}
const finder = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(12, 10); g.lineTo(52, 10); g.lineTo(32, 46); g.closePath(); g.fill();
  g.fillStyle = '#ec4899'; g.beginPath(); g.moveTo(18, 14); g.lineTo(46, 14); g.lineTo(32, 38); g.closePath(); g.fill();
  const t = new THREE.CanvasTexture(c); const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false, transparent: true }));
  sp.scale.set(0.7, 0.7, 1); sp.renderOrder = 20; scene.add(sp); return sp;
})();
const pShadow = new THREE.Mesh(new THREE.CircleGeometry(0.42, 16), new THREE.MeshBasicMaterial({ color: 0x9d174d, transparent: true, opacity: 0.18 }));
pShadow.rotation.x = -Math.PI / 2; pShadow.position.y = 0.52; scene.add(pShadow);
player.position.set(0, 0.5, 18);
player.rotation.y = Math.PI;
let minedCount = 0;
