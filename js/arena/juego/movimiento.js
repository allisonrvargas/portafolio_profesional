'use strict';
// Colisiones, suelo y caminar hacia un destino.

/* ---------------- MOVIMIENTO ---------------- */
const keys = {};
let target = null, waypoints = [], onArrive = null, stuckT = 0, lastDist = Infinity, mining = null;
let feet = 0.5, vy = 0, onGround = true, coyote = 0, jumpReq = 0, autoWalk = false;
const PR = 0.3, JUMP = 8.6, GRAV = 26; let PH = 1.7; // al nadar el personaje va acostado (más bajo)
const chestBox = [4.85, -16, 6.15, -15, 1.5];
function solidCell(i, j, k) { const t = blocks.get(`${i},${j},${k}`); return (t && t !== 'air' && t !== 'agua') || oreCells.has(`${i},${j},${k}`); }
// cauce del río por debajo del nivel del suelo: las barandas y el piso del puente quedan arriba de ti
const inRiverChannel = (x, y, z) => y < 0.45 && y > -2.6 && z > -1.65 && z < 0.65 && x > -15.7 && x < 15.8;
function hits(x, y, z) {
  if (x < -17.6 || x > 16.6 || z < -27.6 || z > 24.6) return true;
  const i0 = Math.round(x - PR), i1 = Math.round(x + PR), k0 = Math.round(z - PR), k1 = Math.round(z + PR), j0 = Math.ceil(y - 0.5 + 0.001), j1 = inRiverChannel(x, y, z) ? Math.max(j0, -1) : Math.ceil(y + PH + 0.5 - 0.001) - 1; // dentro del cauce del río solo cuenta lo que está bajo el agua
  for (let i = i0; i <= i1; i++) for (let k = k0; k <= k1; k++) for (let j = j0; j <= j1; j++) if (solidCell(i, j, k)) return true;
  if (x + PR > 9.45 && x - PR < 12.55 && z + PR > 12.48 && z - PR < 13.52 && y < 2.25 && y > 0.9) return true; // cabina del DJ
  if (typeof PET_BOX !== 'undefined' && x + PR > PET_BOX[0] && x - PR < PET_BOX[2] && z + PR > PET_BOX[1] && z - PR < PET_BOX[3] && y < 2.3 && y > -0.5) return true; // casita de la mascota
  if (x + PR > -12.55 && x - PR < -11.45 && z + PR > -3.5 && z - PR < -2.7 && y < -4.6) return true; // cofre secreto
  if (x + PR > chestBox[0] && x - PR < chestBox[2] && z + PR > chestBox[1] && z - PR < chestBox[3] && y < chestBox[4] - 0.01) return true;
  return false;
}
function groundBelow(x, z, from) {
  const i = Math.round(x), k = Math.round(z);
  for (let j = Math.round(from - 0.45); j >= -9; j--) if (solidCell(i, j, k)) return j + 0.5;
  return -1.5;
}
function blocked(x, z) { const g = groundBelow(x, z, 8); return hits(x, g, z); }
function planTo(tx, tz, cb) {
  const p = player.position; waypoints = [];
  const side = z => z > -0.5;
  if (side(p.z) !== side(tz)) {
    const bx = [-9, 9].sort((a, b) => (Math.abs(p.x - a) + Math.abs(tx - a)) - (Math.abs(p.x - b) + Math.abs(tx - b)))[0];
    const near = side(p.z) ? 2.2 : -3.2, far = side(p.z) ? -3.2 : 2.2;
    waypoints.push([bx, near], [bx, far]);
  }
  waypoints.push([tx, tz]); target = waypoints.shift(); onArrive = cb; stuckT = 0; lastDist = Infinity;
}
function travel(L) { closeMenu(); if (L.go) planTo(L.go[0], L.go[1], () => toast('⛏', 'LA CUEVA', 'Baja por las gradas', 'Camina hacia el río: los escalones bajan hasta la caverna, justo debajo de la cascada.', '#78716c')); else planTo(L.door[0], L.door[1], () => openPlace(L)); }
