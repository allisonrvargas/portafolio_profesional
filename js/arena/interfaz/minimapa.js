'use strict';
// Minimapa con cabecitas de animales.

// Minimapa
const mm = $('#minimap'), mg = mm.getContext('2d');
const toMap = (x, z) => [(x + 16.5) / 33 * mm.width, (z + 26.5) / 50 * mm.height];

// Cabecitas pixeladas de cada animal para el minimapa (9x9)
const headIcons = {
  vaca:    ['  y   y  ','.wwwwwww.','.wkwwwkw.','.wwwwwww.','.wpppppw.','.pdpppdp.','.ppppppp.','  .....  ','         '],
  cerdo:   [' pp   pp ','.ppppppp.','.pkpppkp.','.ppppppp.','.prrrrrp.','.rdrrrdr.','.ppppppp.','  .....  ','         '],
  oveja:   ['.lllllll.','lllllllll','lgggggggl','lgkgggkgl','lgggggggl','lgggpgggl',' ggggggg ','  .....  ','         '],
  gallina: ['   rr    ','  rrr    ','.wwwwwww.','.wkwwwkw.','.wwoooww.','.wwrooww.','.wwwrwww.','  .....  ','         '],
  conejo:  [' cp   pc ',' cp   pc ',' cp   pc ','.ccccccc.','.ckcccck.','.cccpccc.','.ccccccc.','  .....  ','         '],
  pato:    ['   mmm   ','.yyyyyyy.','.ykyyyky.','.yyyyyyy.','.oooooooy','.yyyyyyy.','.yyyyyyy.','  .....  ','         ']
};
const headPal = { '.': '#4a1238', w: '#ffffff', k: '#111111', p: '#f9a8d4', d: '#9d174d', r: '#ec4899', y: '#fde68a', l: '#fbcfe8', g: '#71717a', o: '#f97316', c: '#f5e6d3', m: '#ec4899' };
function drawHead(id, cx, cy, active) {
  const rows = headIcons[id], S = 1.4, ox = cx - 4.5 * S, oy = cy - 4.5 * S;
  mg.fillStyle = active ? '#ec4899' : '#ffffff'; mg.fillRect(ox - 1.5, oy - 1.5, 9 * S + 3, 8 * S + 3);
  rows.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === ' ') return; mg.fillStyle = headPal[ch]; mg.fillRect(ox + i * S, oy + j * S, S + 0.05, S + 0.05); }));
}
function drawMap() {
  mg.fillStyle = '#bfe8a8'; mg.fillRect(0, 0, mm.width, mm.height);
  mg.fillStyle = '#f6e3c5'; paths.forEach(([a, b, c, d]) => { const [x1, y1] = toMap(a - 0.5, b - 0.5), [x2, y2] = toMap(c + 0.5, d + 0.5); mg.fillRect(x1, y1, x2 - x1, y2 - y1); });
  mg.fillStyle = '#9fd8ff'; { const [x1, y1] = toMap(-16.5, -1.5), [x2, y2] = toMap(16.5, 0.5); mg.fillRect(x1, y1, x2 - x1, y2 - y1); }
  mg.fillStyle = '#f3c6b4'; bridges.forEach(([a, b]) => { const [x1, y1] = toMap(a - 0.5, -1.5), [x2, y2] = toMap(b + 0.5, 0.5); mg.fillRect(x1, y1, x2 - x1, y2 - y1); });
  mg.fillStyle = '#f9a8d4'; trees.forEach(([x, z]) => { const [a, b] = toMap(x, z); mg.fillRect(a - 3, b - 3, 6, 6); });
  lugares.forEach(L => { const [a, b] = toMap(L.at[0], L.at[1]); mg.fillStyle = L.c; const s = L.id === 'cofre' ? 6 : L.id === 'castillo' ? 16 : 11; mg.fillRect(a - s / 2, b - s / 2, s, s); });
  { const [x1, y1] = toMap(CORRAL.x1 - 0.5, CORRAL.z1 - 0.5), [x2, y2] = toMap(CORRAL.x2 + 0.5, CORRAL.z2 + 0.5); mg.strokeStyle = '#9a6744'; mg.lineWidth = 2; mg.strokeRect(x1, y1, x2 - x1, y2 - y1); }
  animals.forEach(a => { if (a.state === 'corral') return; const [x, y] = toMap(a.g.position.x, a.g.position.z); drawHead(a.id, x, y, a.state !== 'libre'); });
  ores.forEach(o => { if (o.mined) return; const [a, b] = toMap(o.x, o.z); mg.fillStyle = '#fff'; mg.fillRect(a - 2.5, b - 2.5, 5, 5); mg.fillStyle = habilidades[o.i].c; mg.fillRect(a - 1.5, b - 1.5, 3, 3); });
  if (!driving) { const [kx, ky] = toMap(kart.position.x, kart.position.z); mg.fillStyle = '#facc15'; mg.fillRect(kx - 3, ky - 3, 6, 6); mg.strokeStyle = '#4a1238'; mg.strokeRect(kx - 3, ky - 3, 6, 6); }
  const [px, py] = toMap(player.position.x, player.position.z); const ang = player.rotation.y;
  mg.save(); mg.translate(px, py); mg.rotate(-ang); mg.fillStyle = '#4a1238'; mg.beginPath(); mg.moveTo(0, 6); mg.lineTo(-4.5, -4); mg.lineTo(4.5, -4); mg.fill(); mg.restore();
  mg.strokeStyle = '#ec4899'; mg.lineWidth = 2; mg.strokeRect(1, 1, mm.width - 2, mm.height - 2);
}
mm.addEventListener('click', e => {
  const r = mm.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width * 33 - 16.5, z = (e.clientY - r.top) / r.height * 50 - 26.5;
  const L = lugares.map(L => [L, Math.hypot(L.at[0] - x, L.at[1] - z)]).sort((a, b) => a[1] - b[1])[0];
  if (L[1] < 4) travel(L[0]); else if (!blocked(x, z)) planTo(x, z, null);
});
