'use strict';
// Faroles junto a los caminos.

const lampSpots = [[-7, 3], [7, 3], [-7, -5], [7, -5], [-7, 10], [7, 10], [-5, 20], [5, 20], [-11, -7], [11, -7], [-2, -11], [2, -11], [-13, 18], [13, 18]];
const lamps = [];
lampSpots.forEach(([x, z]) => {
  const free = y => { const t = blocks.get(`${x},${y},${z}`); return !t || t === 'air'; };
  if (!free(1) || !free(2) || !free(3) || !blocks.get(`${x},0,${z}`)) return;
  if (orePos.some(([ox, oz]) => Math.hypot(ox - x, oz - z) < 1.6)) return;
  put(x, 1, z, 'log'); put(x, 2, z, 'log'); put(x, 3, z, 'lamp'); lamps.push([x, z]);
});
