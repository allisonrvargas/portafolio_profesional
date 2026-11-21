'use strict';
// Convierte el mapa de bloques en mallas 3D y define los techos que se ocultan.

// Construir mallas instanciadas por tipo de bloque
const blockMeshes = [];
// techos que se ocultan cuando entras a un edificio
const roofZones = [
  { x1: -15, x2: -7, z1: 9, z2: 17, y: 5, inX: [-13.6, -8.4], inZ: [10.4, 15.6], groups: {} },
  { x1: -11, x2: -7, z1: -14, z2: -10, y: 3, inX: [-10.6, -7.4], inZ: [-13.6, -10.4], groups: {} },
  { x1: 7, x2: 11, z1: -14, z2: -10, y: 3, inX: [7.4, 10.6], inZ: [-13.6, -10.4], groups: {} },
  // castillo: al entrar se ocultan el muro y las torres del frente
  { x1: -7, x2: 7, z1: -18, z2: -15, y: 2, inX: [-5.6, 5.6], inZ: [-23.8, -17.4], always: true, groups: {} },
  // la torre central se corta por capas: solo se ve hasta la altura de tus pies
  { x1: -2, x2: 2, z1: -22, z2: -20, y: 2, inX: [-5.6, 5.6], inZ: [-23.8, -17.4], always: true, layered: true, groups: {} },
  // cueva: al bajar se oculta el suelo de arriba para ver adentro
  { x1: -17, x2: -11, z1: -4, z2: 4, y: -1, feetBelow: -0.6, inX: [-18, -10.5], inZ: [-4.6, 8.6], cave: true, groups: {} },
  { x1: -16, x2: -7, z1: 18, z2: 23, y: -1, feetBelow: -0.6, inX: [-16.6, -4.5], inZ: [17.5, 23.6], cave: true, groups: {} },
  // túnel bajo la casa: al entrar se corta todo lo que está encima (también la casa) para ver el pasadizo por dentro
  { x1: -12, x2: -9, z1: 5, z2: 17, y: -2, feetBelow: -0.6, inX: [-12.6, -8.4], inZ: [2.5, 19.5], tunnel: true, priority: true, groups: {} },
  // puentes: al nadar por debajo se ocultan el piso y las barandas que están sobre el agua
  ...bridges.map(([a, b]) => ({ x1: a - 1, x2: b + 1, z1: -1, z2: 0, y: 0, feetBelow: -0.4, inX: [a - 2.2, b + 2.2], inZ: [-1.7, 0.7], priority: true, groups: {} }))
];
function buildBlocks() {
  const byType = {};
  const key = (x, y, z) => blocks.get(`${x},${y},${z}`);
  const opaque = t => t && t !== 'air' && t !== 'glass' && t !== 'leaves' && t !== 'agua';
  for (const [k, t] of blocks) {
    if (t === 'air') continue;
    const [x, y, z] = k.split(',').map(Number);
    // ocultar bloques totalmente rodeados
    const cutLayer = roofZones.some(r => r.layered && y >= 1 && x >= r.x1 && x <= r.x2 && z >= r.z1 && z <= r.z2) || ((y <= 0 && y >= -7 && x >= -18 && x <= -10 && z >= -5 && z <= 9) || (y <= 0 && y >= -7 && x >= -17 && x <= -3 && z >= 16 && z <= 24) || (y <= -2 && y >= -7 && x >= -12 && x <= -9 && z >= 3 && z <= 18)); // la cueva se ve por dentro
    if (!cutLayer && opaque(key(x + 1, y, z)) && opaque(key(x - 1, y, z)) && opaque(key(x, y + 1, z)) && opaque(key(x, y - 1, z)) && opaque(key(x, y, z + 1)) && opaque(key(x, y, z - 1))) continue;
    const inZone = r => y >= r.y && x >= r.x1 && x <= r.x2 && z >= r.z1 && z <= r.z2;
    const zone = roofZones.find(r => r.priority && inZone(r)) || roofZones.find(inZone);
    if (zone) { (zone.groups[zone.layered || zone.tunnel ? t + '|' + y : t] ||= []).push([x, y, z]); continue; }
    (byType[t] ||= []).push([x, y, z]);
  }
  roofZones.forEach(r => { r.meshes = []; for (const [key, list] of Object.entries(r.groups)) { const [t, ly] = key.split('|'); const mesh = new THREE.InstancedMesh(unit, M[t], list.length); mesh.userData.layer = ly === undefined ? null : +ly; const mm = new THREE.Matrix4(); list.forEach(([x, y, z], i) => { mm.makeTranslation(x, y, z); mesh.setMatrixAt(i, mm); }); mesh.castShadow = true; mesh.receiveShadow = true; scene.add(mesh); blockMeshes.push(mesh); r.meshes.push(mesh); } });
  const m4 = new THREE.Matrix4();
  for (const [t, list] of Object.entries(byType)) {
    const mesh = new THREE.InstancedMesh(unit, M[t], list.length);
    list.forEach(([x, y, z], i) => { m4.makeTranslation(x, y, z); mesh.setMatrixAt(i, m4); });
    mesh.castShadow = t !== 'glass'; mesh.receiveShadow = true;
    scene.add(mesh); blockMeshes.push(mesh);
  }
}

buildBlocks();
