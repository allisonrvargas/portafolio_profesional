'use strict';
// Texturas pixel art 16x16 de cada tipo de bloque.

/* ---------------- TEXTURAS DE BLOQUES (pixel art 16x16) ---------------- */
function texture(fn, seed = 1) {
  const c = document.createElement('canvas'); c.width = c.height = 16; const g = c.getContext('2d'); const r = rng(seed);
  fn(g, r); const t = new THREE.CanvasTexture(c); t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; t.colorSpace = THREE.SRGBColorSpace; return t;
}
function speckle(g, r, cols) { for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) { g.fillStyle = cols[Math.floor(r() * cols.length)]; g.fillRect(x, y, 1, 1); } }
const T = {
  grassTop: texture((g, r) => speckle(g, r, ['#8fd17a', '#9ddc86', '#84c46f', '#a6e18e', '#8fd17a']), 2),
  grassSide: texture((g, r) => { speckle(g, r, ['#b07a55', '#a06c48', '#bb8661', '#9a6744']); for (let x = 0; x < 16; x++) { const h = 3 + Math.floor(r() * 3); for (let y = 0; y < h; y++) { g.fillStyle = ['#8fd17a', '#9ddc86', '#84c46f'][Math.floor(r() * 3)]; g.fillRect(x, y, 1, 1); } } }, 3),
  dirt: texture((g, r) => speckle(g, r, ['#b07a55', '#a06c48', '#bb8661', '#9a6744']), 4),
  sand: texture((g, r) => speckle(g, r, ['#f6e3c5', '#f1d9b4', '#f9ead2', '#ecd2aa']), 5),
  stone: texture((g, r) => speckle(g, r, ['#b8b2bd', '#aaa3b0', '#c4bfc8', '#9f98a6']), 6),
  cobble: texture((g, r) => { speckle(g, r, ['#c9c2cf', '#b9b1c0', '#d6d0db']); g.fillStyle = '#8f8797'; [[0, 5, 16, 1], [0, 11, 16, 1], [5, 0, 1, 5], [11, 6, 1, 5], [3, 12, 1, 4], [9, 12, 1, 4]].forEach(a => g.fillRect(...a)); }, 7),
  planks: texture((g, r) => { speckle(g, r, ['#f3c6b4', '#eebba8', '#f7d0c0']); g.fillStyle = '#d99a86'; [0, 4, 8, 12].forEach(y => g.fillRect(0, y + 3, 16, 1)); g.fillRect(6, 0, 1, 4); g.fillRect(12, 4, 1, 4); g.fillRect(3, 8, 1, 4); g.fillRect(10, 12, 1, 4); }, 8),
  log: texture((g, r) => { for (let x = 0; x < 16; x++) { g.fillStyle = x % 4 === 0 ? '#5e3b2c' : ['#7a4e3a', '#6e4433', '#835540'][Math.floor(r() * 3)]; g.fillRect(x, 0, 1, 16); } }, 9),
  logTop: texture((g) => { g.fillStyle = '#e8b48f'; g.fillRect(0, 0, 16, 16); g.strokeStyle = '#b97f5c'; [7, 5, 3].forEach(s => { g.strokeRect(8 - s + 0.5, 8 - s + 0.5, s * 2 - 1, s * 2 - 1); }); g.fillStyle = '#6e4433'; g.fillRect(0, 0, 16, 1); g.fillRect(0, 15, 16, 1); g.fillRect(0, 0, 1, 16); g.fillRect(15, 0, 1, 16); }, 10),
  leaves: texture((g, r) => { speckle(g, r, ['#f9a8d4', '#f472b6', '#fbcfe8', '#f9a8d4', '#ec4899', '#fde2ef']); }, 11),
  woolPink: texture((g, r) => speckle(g, r, ['#ec4899', '#f05aa6', '#e23d8e']), 12),
  woolRose: texture((g, r) => speckle(g, r, ['#f9a8d4', '#f7b6da', '#f39cca']), 13),
  woolWhite: texture((g, r) => speckle(g, r, ['#ffffff', '#f7f2f5', '#fdf8fb']), 14),
  woolLilac: texture((g, r) => speckle(g, r, ['#c4b5fd', '#cdbffe', '#b9a8fb']), 15),
  quartz: texture((g, r) => { speckle(g, r, ['#fff8fc', '#fbeef5', '#fff']); g.fillStyle = '#f3d3e3'; g.fillRect(0, 0, 16, 1); g.fillRect(0, 0, 1, 16); }, 16),
  gold: texture((g, r) => { speckle(g, r, ['#fcd34d', '#fbbf24', '#fde68a']); g.fillStyle = '#d97706'; g.fillRect(0, 15, 16, 1); g.fillRect(15, 0, 1, 16); }, 17),
  dark: texture((g, r) => speckle(g, r, ['#3b2440', '#43294a', '#33203a']), 18),
  glass: texture((g) => { g.fillStyle = 'rgba(220,240,255,.35)'; g.fillRect(0, 0, 16, 16); g.fillStyle = '#ffffff'; g.fillRect(0, 0, 16, 1); g.fillRect(0, 15, 16, 1); g.fillRect(0, 0, 1, 16); g.fillRect(15, 0, 1, 16); g.fillRect(3, 3, 2, 1); g.fillRect(3, 4, 1, 2); }, 19)
};
const M = {};
const lambert = (map, extra = {}) => new THREE.MeshLambertMaterial({ map, ...extra });
M.grass = [lambert(T.grassSide), lambert(T.grassSide), lambert(T.grassTop), lambert(T.dirt), lambert(T.grassSide), lambert(T.grassSide)];
M.log = [lambert(T.log), lambert(T.log), lambert(T.logTop), lambert(T.logTop), lambert(T.log), lambert(T.log)];
['dirt', 'sand', 'stone', 'cobble', 'planks', 'leaves', 'woolPink', 'woolRose', 'woolWhite', 'woolLilac', 'quartz', 'gold', 'dark'].forEach(k => M[k] = lambert(T[k]));
T.books = texture((g, r) => { g.fillStyle = '#7a4e3a'; g.fillRect(0, 0, 16, 16); g.fillStyle = '#5e3b2c'; g.fillRect(0, 7, 16, 2); g.fillRect(0, 0, 16, 1); g.fillRect(0, 15, 16, 1);
  const cols = ['#ec4899', '#a78bfa', '#5eead4', '#fcd34d', '#f472b6', '#60a5fa', '#f97316'];
  [[1, 1], [1, 9]].forEach(([y0]) => { let x = 1; while (x < 15) { const w = 1 + Math.floor(r() * 2); g.fillStyle = cols[Math.floor(r() * cols.length)]; g.fillRect(x, y0 + Math.floor(r() * 2), w, 6 - Math.floor(r() * 2)); x += w + (r() < 0.2 ? 1 : 0); } }); }, 31);
T.screen = texture((g, r) => { g.fillStyle = '#1e1b2e'; g.fillRect(0, 0, 16, 16); g.fillStyle = '#ec4899'; g.fillRect(2, 2, 12, 9); g.fillStyle = '#fde68a'; g.fillRect(4, 4, 3, 3); g.fillStyle = '#5eead4'; g.fillRect(9, 6, 3, 3); g.fillStyle = '#ffffff'; g.fillRect(3, 9, 10, 1); g.fillStyle = '#f472b6'; g.fillRect(4, 13, 2, 2); g.fillStyle = '#fcd34d'; g.fillRect(10, 13, 2, 2); }, 32);
T.lamp = texture((g, r) => { g.fillStyle = '#7a4e3a'; g.fillRect(0, 0, 16, 16); g.fillStyle = '#ffe4f1'; g.fillRect(2, 2, 12, 12); g.fillStyle = '#f9a8d4'; g.fillRect(4, 4, 8, 8); g.fillStyle = '#fff7fb'; g.fillRect(6, 6, 4, 4); }, 33);
M.books = lambert(T.books);
M.screen = new THREE.MeshLambertMaterial({ map: T.screen, emissive: 0xffffff, emissiveMap: T.screen, emissiveIntensity: 0.55 });
M.lamp = new THREE.MeshLambertMaterial({ map: T.lamp, emissive: 0xffffff, emissiveMap: T.lamp, emissiveIntensity: 0.2 });
M.glass = lambert(T.glass, { transparent: true, opacity: 0.9 });
const unit = new THREE.BoxGeometry(1, 1, 1);
// textura de mineral: piedra con manchas del color de la habilidad
function oreTexture(color, seed) {
  return texture((g, r) => { speckle(g, r, ['#c4bfc8', '#b8b2bd', '#d0cbd4', '#aaa3b0']); g.fillStyle = color; for (let i = 0; i < 7; i++) { const x = 1 + Math.floor(r() * 12), y = 1 + Math.floor(r() * 12); g.fillRect(x, y, 3, 2); g.fillRect(x + 1, y + 2, 1, 1); } g.fillStyle = '#ffffff'; for (let i = 0; i < 5; i++) g.fillRect(Math.floor(r() * 16), Math.floor(r() * 16), 1, 1); }, seed);
}
