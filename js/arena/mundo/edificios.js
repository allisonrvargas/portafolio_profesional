'use strict';
// Cerezos, casa, escenario, torres, castillo, gradas, granja e interiores.

// Cerezos
const trees = [ [-5, 8], [5, 7], [13, 7], [-13, -6], [13, -6], [-14, 21], [14, 21], [-13, -21], [13, -21], [-13, -15], [13, -15]];
function tree(x, z, h = 4) {
  for (let y = 1; y <= h; y++) put(x, y, z, 'log');
  for (let y = h - 1; y <= h + 1; y++) for (let dx = -2; dx <= 2; dx++) for (let dz = -2; dz <= 2; dz++) {
    if (Math.abs(dx) === 2 && Math.abs(dz) === 2) continue; if (y === h + 1 && (Math.abs(dx) === 2 || Math.abs(dz) === 2)) continue;
    if (!(dx === 0 && dz === 0 && y <= h)) put(x + dx, y, z + dz, 'leaves');
  }
  put(x, h + 2, z, 'leaves');
  solid(x - 0.5, z - 0.5, x + 0.5, z + 0.5);
}
trees.forEach(([x, z], i) => tree(x, z, 4 + (i % 2)));

// Casa: Sobre mí
function house(cx, cz) {
  const x1 = cx - 3, x2 = cx + 3, z1 = cz - 3, z2 = cz + 3;
  fill(x1, 1, z1, x2, 4, z2, 'planks');
  fill(x1 + 1, 1, z1 + 1, x2 - 1, 4, z2 - 1, 'air');
  [[x1, z1], [x1, z2], [x2, z1], [x2, z2]].forEach(([x, z]) => fill(x, 1, z, x, 4, z, 'log'));
  put(cx, 1, z2, 'air'); put(cx, 2, z2, 'air'); // puerta
  [[cx - 2, z2], [cx + 2, z2], [x1, cz], [x2, cz]].forEach(([x, z]) => put(x, 3, z, 'glass'));
  for (let s = 0; s <= 3; s++) fill(x1 - 1 + s, 5 + s, z1 - 1 + s, x2 + 1 - s, 5 + s, z2 + 1 - s, s % 2 ? 'woolRose' : 'woolPink');
  fill(x1 + 1, 5, z1 + 1, x1 + 1, 9, z1 + 1, 'cobble');
  put(cx - 1, 1, z2 + 1, 'woolRose'); put(cx + 1, 1, z2 + 1, 'woolRose'); // macetas
  solid(x1 - 0.5, z1 - 0.5, x2 + 0.5, z2 + 0.5);
}
house(-11, 13);

// Escenario: música
function stage(cx, cz) {
  fill(cx - 3, 1, cz - 2, cx + 3, 1, cz + 2, 'planks');
  fill(cx - 3, 2, cz - 2, cx + 3, 2, cz - 2, 'woolPink');
  [[cx - 3, cz - 1], [cx + 3, cz - 1]].forEach(([x, z]) => { fill(x, 2, z, x, 4, z, 'dark'); put(x, 5, z, 'woolPink'); });
  fill(cx - 3, 6, cz - 2, cx + 3, 6, cz - 2, 'woolRose');
  solid(cx - 3.5, cz - 2.5, cx + 3.5, cz + 2.5);
}
stage(11, 13);

// Torres
function tower(cx, cz, roof) {
  fill(cx - 2, 1, cz - 2, cx + 2, 7, cz + 2, 'cobble');
  fill(cx - 1, 1, cz - 1, cx + 1, 6, cz + 1, 'air');
  fill(cx - 1, 1, cz + 2, cx + 1, 3, cz + 2, 'air'); // puerta ancha (3 bloques)
  for (let x = cx - 2; x <= cx + 2; x++) for (let z = cz - 2; z <= cz + 2; z++) if ((x === cx - 2 || x === cx + 2 || z === cz - 2 || z === cz + 2) && (x + z) % 2 === 0) put(x, 8, z, 'cobble');
  fill(cx - 1, 8, cz - 1, cx + 1, 8, cz + 1, roof); fill(cx - 1, 9, cz - 1, cx + 1, 9, cz + 1, roof); put(cx, 10, cz, roof); put(cx, 11, cz, roof);
  [4, 6].forEach(y => { put(cx, y, cz + 2, 'glass'); put(cx - 2, y, cz, 'glass'); put(cx + 2, y, cz, 'glass'); });
  solid(cx - 2.5, cz - 2.5, cx + 2.5, cz + 2.5);
}
tower(-9, -12, 'woolLilac');
tower(9, -12, 'woolPink');

// Castillo: contacto
function castle(cx, cz) {
  const x1 = cx - 6, x2 = cx + 6, z1 = cz - 4, z2 = cz + 3;
  fill(x1, 1, z1, x2, 5, z2, 'quartz'); fill(x1 + 1, 1, z1 + 1, x2 - 1, 5, z2 - 1, 'air');
  fill(x1 + 1, 1, z1 + 1, x2 - 1, 1, z2 - 1, 'woolRose');
  fill(cx - 1, 1, z2, cx + 1, 3, z2, 'air'); fill(cx - 2, 4, z2, cx + 2, 4, z2, 'gold');
  for (let x = x1; x <= x2; x++) if (x % 2 === 0) { put(x, 6, z1, 'quartz'); put(x, 6, z2, 'quartz'); }
  for (let z = z1; z <= z2; z++) if (z % 2 === 0) { put(x1, 6, z, 'quartz'); put(x2, 6, z, 'quartz'); }
  [[x1, z1], [x2, z1], [x1, z2], [x2, z2]].forEach(([x, z]) => {
    fill(x - 1, 1, z - 1, x + 1, 8, z + 1, 'cobble');
    fill(x - 1, 9, z - 1, x + 1, 9, z + 1, 'woolPink');
    if (z === z2) { [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => put(x + a, 10, z + b, 'woolRose')); } // torre de princesa: almenas
    else { put(x, 10, z, 'woolPink'); put(x, 11, z, 'woolRose'); }
  });
  fill(cx - 2, 1, cz - 2, cx + 2, 9, cz, 'quartz'); fill(cx - 2, 10, cz - 2, cx + 2, 10, cz, 'gold');
  fill(cx - 1, 11, cz - 1, cx + 1, 11, cz - 1, 'woolPink'); 
  [[cx - 3, z2 + 1], [cx + 3, z2 + 1]].forEach(([x, z]) => { put(x, 1, z, 'gold'); });
  solid(x1 - 1.5, z1 - 1.5, x2 + 1.5, z2 + 1.5);
}
castle(0, -20);
// Escalera de la línea de tiempo: sube por dentro del castillo hasta la azotea
const stairSteps = [
  [3, 2, -19], [4, 2, -19], [3, 3, -20], [4, 3, -20], [3, 4, -21], [4, 4, -21], [3, 5, -22], [4, 5, -22],
  [3, 5, -23], [4, 5, -23], [2, 6, -23], [1, 7, -23], [0, 8, -23], [-1, 9, -23], [-2, 9, -23]
];
stairSteps.forEach(([x, y, z]) => { put(x, y, z, 'planks'); });
// los escalones que marcan un hito son de oro
[[4, 2, -19], [4, 4, -21], [4, 5, -23], [1, 7, -23], [-1, 9, -23]].forEach(([x, y, z]) => put(x, y, z, 'gold'));
put(-3, 9, -23, 'planks');
// Granja: corral con cerca de troncos y tablas, puerta al sur
const CORRAL = { x1: -4, x2: 4, z1: -7, z2: -3 };
for (let x = CORRAL.x1; x <= CORRAL.x2; x++) for (const z of [CORRAL.z1, CORRAL.z2]) if (!(z === CORRAL.z2 && x === 0)) put(x, 1, z, (x % 2 === 0) ? 'log' : 'planks');
for (let z = CORRAL.z1; z <= CORRAL.z2; z++) for (const x of [CORRAL.x1, CORRAL.x2]) put(x, 1, z, (z % 2 === 0) ? 'log' : 'planks');
for (let x = CORRAL.x1 + 1; x < CORRAL.x2; x++) for (let z = CORRAL.z1 + 1; z < CORRAL.z2; z++) put(x, 0, z, 'grass');
put(-3, 1, -6, 'woolRose'); put(3, 1, -6, 'woolRose'); // fardos de heno rosa
// barandas de vidrio para no caerse fuera del castillo al subir
const freeCell = (x, y, z) => { const t = blocks.get(`${x},${y},${z}`); return !t || t === 'air'; };
for (let z = -22; z <= -19; z++) for (let y = 2; y <= 10; y++) if (freeCell(5, y, z)) put(5, y, z, 'glass');
for (let x = -5; x <= 5; x++) for (let y = 6; y <= 12; y++) if (freeCell(x, y, -24)) put(x, y, -24, 'glass');
for (let y = 10; y <= 12; y++) for (let z = -23; z <= -19; z++) if (freeCell(-4, y, z)) put(-4, y, z, 'glass');

// Interior de la casa: cama, librero y escritorio con computadora
put(-13, 1, 11, 'woolWhite'); put(-13, 1, 12, 'woolPink'); put(-12, 1, 12, 'woolPink'); put(-12, 1, 11, 'woolWhite');
fill(-9, 1, 11, -9, 3, 12, 'books');
put(-13, 1, 15, 'planks'); put(-12, 1, 15, 'planks'); put(-13, 2, 15, 'screen');
put(-9, 1, 15, 'woolRose');
// Torre de proyectos: libreros con proyectos
fill(-10, 1, -13, -10, 3, -13, 'books'); fill(-8, 1, -13, -8, 3, -13, 'books'); fill(-9, 1, -13, -9, 2, -13, 'books');
// Torre arcade: dos maquinitas
put(8, 1, -13, 'dark'); put(8, 2, -13, 'screen'); put(10, 1, -13, 'dark'); put(10, 2, -13, 'screen');
// Acantilado con cascada al este del río
fill(16, 0, -3, 17, 5, 2, 'stone'); fill(16, 6, -2, 17, 6, 1, 'grass');
for (let z = -1; z <= 0; z++) for (let y = 0; y <= 6; y++) blocks.set(`16,${y},${z}`, 'air');
// cueva bajo la cascada: de aquí sale el río
for (let z = -1; z <= 0; z++) { for (let y = 0; y <= 2; y++) { put(17, y, z, 'air'); put(18, y, z, 'dark'); } put(17, 3, z, 'stone'); }
[[-2, 0], [-2, 1], [-2, 2], [1, 0], [1, 1], [1, 2]].forEach(([z, y]) => put(16, y, z, 'cobble'));   // marco de la cueva
put(16, 3, -2, 'cobble'); put(16, 3, 1, 'cobble');
