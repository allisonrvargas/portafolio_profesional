'use strict';
// Mapa de bloques, suelo, caminos, río y puentes.

/* ---------------- MUNDO ---------------- */
const blocks = new Map(); // "x,y,z" -> tipo
const put = (x, y, z, t) => blocks.set(`${x},${y},${z}`, t);
const fill = (x1, y1, z1, x2, y2, z2, t) => { for (let x = x1; x <= x2; x++) for (let y = y1; y <= y2; y++) for (let z = z1; z <= z2; z++) put(x, y, z, t); };
const colliders = []; // AABB [x1,z1,x2,z2]
const solid = (x1, z1, x2, z2) => colliders.push([x1, z1, x2, z2]);

const X0 = -18, X1 = 17, Z0 = -28, Z1 = 25;
const bridges = [[-10, -8], [8, 10]];
const onBridge = x => bridges.some(([a, b]) => x >= a && x <= b);
const isRiver = z => z === -1 || z === 0;
const paths = [[-3, 16, 3, 20], [-12, 17, 12, 19], [-10, -10, -8, 19], [8, -10, 10, 19], [-10, -9, 10, -8], [-1, -16, 1, -8], [-3, -17, 6, -15]];
const isPath = (x, z) => paths.some(([a, b, c, d]) => x >= a && x <= c && z >= b && z <= d);
const terr = rng(42);
for (let x = X0; x <= X1; x++) for (let z = Z0; z <= Z1; z++) {
  const border = x <= -16 || x >= 16 || z >= 23 || z <= -26;
  put(x, -1, z, 'dirt');
  if (border) {
    const h = 1 + Math.floor(terr() * 2.2) + (Math.abs(x) >= 17 || z >= 24 || z <= -27 ? 1 : 0);
    for (let y = 0; y < h; y++) put(x, y, z, y === h - 1 ? 'grass' : 'dirt');
    continue;
  }
  if (isRiver(z)) { put(x, -1, z, 'air'); put(x, -2, z, 'sand'); } // cauce del río
  if (isRiver(z) && !onBridge(x)) continue; // agua
  put(x, 0, z, isRiver(z) ? 'planks' : isPath(x, z) ? 'sand' : 'grass');
}
// barandas del puente
bridges.forEach(([a, b]) => { [-2, 1].forEach(z => { put(a - 1, 1, z, 'log'); put(b + 1, 1, z, 'log'); }); [-1, 0].forEach(z => { put(a - 1, 1, z, 'planks'); put(b + 1, 1, z, 'planks'); }); });
