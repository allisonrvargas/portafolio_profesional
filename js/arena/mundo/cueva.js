'use strict';
// Bloques de las cuevas, el hoyo del río y el túnel.

/* ---------------- CUEVA (estilo Minecraft) ---------------- */
const CAVE_LAKE = [[-17, -2], [-16, -2], [-15, -2], [-17, -1], [-16, -1], [-15, -1], [-17, 0], [-16, 0], [-15, 0], [-17, 1], [-16, 1]];
const inCaveArea = (x, z) => (x > -18 && x < -10.5 && z > -4.6 && z < 8.6) || (x > -11.6 && x < -9.4 && z > 2.5 && z < 18) || (x > -16.5 && x < -4.5 && z > 17.5 && z < 23.5);
T.oreCoal = oreTexture('#27272a', 31); T.oreGem = oreTexture('#22d3ee', 32); T.oreAme = oreTexture('#a855f7', 33);
T.lava = texture((g, r) => speckle(g, r, ['#f97316', '#fb923c', '#ea580c', '#fbbf24', '#f59e0b', '#fdba74']), 34);
T.lava.wrapS = T.lava.wrapT = THREE.RepeatWrapping;
M.oreCoal = lambert(T.oreCoal); M.oreGem = lambert(T.oreGem, { emissive: 0x0e7490, emissiveIntensity: 0.4 });
M.agua = new THREE.MeshLambertMaterial({ map: texture((g, r) => speckle(g, r, ['#38bdf8', '#22d3ee', '#0ea5e9', '#67e8f9']), 35), transparent: true, opacity: 0.72, emissive: 0x0e7490, emissiveIntensity: 0.35, depthWrite: false });
M.oreAme = lambert(T.oreAme, { emissive: 0x7e22ce, emissiveIntensity: 0.5 }); M.lava = new THREE.MeshBasicMaterial({ map: T.lava });
{ const cr = rng(91);
  // roca alrededor de la cueva (bajo la orilla oeste del río)
  for (let x = -18; x <= -10; x++) for (let z = -5; z <= 4; z++) for (let y = -7; y <= -2; y++) {
    const k = cr(); put(x, y, z, k < 0.06 ? 'oreCoal' : k < 0.09 ? 'oreGem' : k < 0.11 ? 'gold' : k < 0.13 ? 'oreAme' : k < 0.3 ? 'cobble' : 'stone');
  }
  for (let x = -15; x <= -12; x++) for (let z = 5; z <= 9; z++) for (let y = -6; y <= -2; y++) put(x, y, z, cr() < 0.25 ? 'cobble' : 'stone');
  // caverna
  for (let x = -17; x <= -11; x++) for (let z = -3; z <= 3; z++) { for (let y = -5; y <= -2; y++) put(x, y, z, 'air'); put(x, -6, z, 'stone'); }
  // agujero del río: el agua cae desde la superficie hasta el lago de la cueva
  for (let x = -18; x <= -15; x++) for (let z = -2; z <= 1; z++) for (let y = -1; y <= 4; y++) {
    const wall = x === -18 || z === -2 || z === 1;
    if (x === -15 && !wall) { if (y === -1) { put(x, -1, z, 'air'); put(x, -2, z, 'sand'); } continue; }
    put(x, y, z, y > 0 ? 'air' : wall ? (y === 0 ? 'cobble' : 'stone') : 'air');
  }
  for (let x = -15; x <= -11; x++) for (const z of [-1, 0]) put(x, -2, z, 'sand');    // fondo del río encima de la caverna
  // lago del ajolote, justo debajo de la caída de agua
  CAVE_LAKE.forEach(([x, z]) => { put(x, -6, z, 'agua'); put(x, -7, z, 'sand'); });
  // gradas: bajan desde la orilla sur hacia el río
  for (let i = 1; i <= 5; i++) { const z = 9 - i; for (const x of [-14, -13]) { for (let y = -i + 1; y <= 0; y++) put(x, y, z, 'air'); put(x, -i, z, 'cobble'); } }
  [[-12, 0], [-14, -3], [-11, -1], [-16, 3]].forEach(([x, z]) => put(x, -2, z, 'stone'));   // estalactitas
  put(-11, -5, 3, 'cobble');                                                               // estalagmita
  put(-16, -6, 3, 'lava'); put(-15, -6, 3, 'lava'); put(-15, -6, 2, 'lava');             // charco de lava
  // túnel tipo mina que une las dos cuevas (pasa debajo de la casa)
  for (let x = -12; x <= -9; x++) for (let z = 3; z <= 18; z++) for (let y = -6; y <= -2; y++) if (x === -12 || x === -9 || y === -6 || y === -2) { if (blocks.get(`${x},${y},${z}`) !== 'air') put(x, y, z, cr() < 0.25 ? 'cobble' : 'stone'); }
  for (let x = -11; x <= -10; x++) for (let z = 3; z <= 17; z++) { for (let y = -5; y <= -3; y++) put(x, y, z, 'air'); put(x, -6, z, 'stone'); }
  // la primera cueva, en el jardín detrás de la casa
  for (let x = -16; x <= -4; x++) for (let z = 17; z <= 23; z++) for (let y = -7; y <= -2; y++) {
    if (x >= -11 && x <= -10 && z === 17 && y >= -5 && y <= -3) continue;
    const k = cr(); put(x, y, z, k < 0.06 ? 'oreCoal' : k < 0.09 ? 'oreGem' : k < 0.11 ? 'gold' : k < 0.13 ? 'oreAme' : k < 0.3 ? 'cobble' : 'stone');
  }
  for (let x = -11; x <= -10; x++) put(x, -6, 17, 'stone');
  for (let i = 1; i <= 5; i++) { const x = -5 - i; for (const z of [21, 22]) { for (let y = -i + 1; y <= 0; y++) put(x, y, z, 'air'); put(x, -i, z, 'cobble'); } }
  for (let x = -15; x <= -11; x++) for (let z = 18; z <= 22; z++) { for (let y = -5; y <= -2; y++) put(x, y, z, 'air'); put(x, -6, z, 'stone'); }
  [[-12, 19], [-14, 22], [-15, 19]].forEach(([x, z]) => put(x, -2, z, 'stone'));
  put(-15, -5, 22, 'cobble');
  for (let x = -10; x <= -7; x++) for (let z = 18; z <= 20; z++) { for (let y = -5; y <= -2; y++) put(x, y, z, 'air'); put(x, -6, z, 'stone'); }
  for (let x = -9; x <= -7; x++) for (let z = 18; z <= 19; z++) { put(x, -6, z, 'agua'); put(x, -7, z, 'sand'); }   // laguito
  put(-14, -6, 18, 'lava'); put(-14, -6, 19, 'lava');
}
