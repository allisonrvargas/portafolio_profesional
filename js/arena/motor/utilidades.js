'use strict';
// Funciones de ayuda: números aleatorios, avisos (toasts) y confeti.

/* ---------------- UTILIDADES ---------------- */
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function hash(s) { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function pixelArt(name, w = 12, h = 8) {
  const r = rng(hash(name)); const pal = ['#ec4899', '#f472b6', '#f9a8d4', '#db2777', '#be185d', '#f9a8d4'];
  const base = Math.floor(r() * pal.length);
  let s = `<svg viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" aria-hidden="true"><rect width="${w}" height="${h}" fill="#fff0f7"/>`;
  for (let i = 0; i < 18; i++) s += `<rect x="${Math.floor(r() * w)}" y="${Math.floor(r() * h)}" width="1" height="1" fill="#fde2ef"/>`;
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w / 2; x++) if (r() < 0.55) { const c = pal[(base + Math.floor(r() * 3)) % pal.length]; s += `<rect x="${x}" y="${y}" width="1" height="1" fill="${c}"/><rect x="${w - 1 - x}" y="${y}" width="1" height="1" fill="${c}"/>`; }
  return s + '</svg>';
}
function toast(ic, small, title, text = '', color) {
  const t = document.createElement('div'); t.className = 'toast';
  t.innerHTML = `<div class="ti" style="${color ? '--c:' + color : ''}"></div><div><small></small><b></b>${text ? '<p></p>' : ''}</div>`;
  t.querySelector('.ti').textContent = ic; t.querySelector('small').textContent = small; t.querySelector('b').textContent = title;
  if (text) t.querySelector('p').textContent = text;
  $('#toasts').appendChild(t); setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 320); }, 3400);
}
function confetti() {
  for (let i = 0; i < 90; i++) {
    const c = document.createElement('i'); c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw'; c.style.top = '-12px';
    c.style.background = ['#ec4899', '#f472b6', '#fcd34d', '#5eead4', '#fbcfe8'][i % 5];
    c.style.animationDelay = Math.random() * 0.8 + 's'; document.body.appendChild(c); setTimeout(() => c.remove(), 3000);
  }
}
