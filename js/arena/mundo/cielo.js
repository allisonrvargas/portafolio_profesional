'use strict';
// Cielo, estrellas, luna y ciclo de día y noche.

/* ---------------- MODO NOCHE Y MONSTRUOS ---------------- */
const nightSky = (() => {
  const c = document.createElement('canvas'); c.width = 2; c.height = 256; const g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, '#0f0a24'); gr.addColorStop(0.6, '#2a1747'); gr.addColorStop(1, '#4a2160');
  g.fillStyle = gr; g.fillRect(0, 0, 2, 256); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
const starGeo = new THREE.BufferGeometry(), starPos = new Float32Array(500 * 3);
for (let i = 0; i < 500; i++) { const a = Math.random() * Math.PI * 2, r = 70 + Math.random() * 30; starPos[i * 3] = Math.cos(a) * r; starPos[i * 3 + 1] = 25 + Math.random() * 45; starPos[i * 3 + 2] = Math.sin(a) * r; }
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xfdf2ff, size: 0.6, fog: false, transparent: true })); stars.visible = false; scene.add(stars);
const moon = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 32; const g = c.getContext('2d');
  g.fillStyle = '#fff7fb'; g.fillRect(4, 4, 24, 24); g.fillStyle = '#f3d6e6'; [[9, 9, 5, 4], [18, 16, 6, 5], [11, 20, 3, 3]].forEach(a => g.fillRect(...a));
  const t = new THREE.CanvasTexture(c); t.magFilter = THREE.NearestFilter; const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, fog: false })); sp.scale.set(9, 9, 1); sp.visible = false; scene.add(sp); return sp;
})();
const lantern = new THREE.PointLight(0xffc4e1, 0, 11, 1.4); scene.add(lantern);

/* ---------------- CICLO DE DÍA Y NOCHE ---------------- */
const CYCLE = 240; // segundos que dura un día completo
let cycleT = 0, skyT = 0, nightness = 0;
const skyKeys = [
  { p: 0.00, top: '#ffc9e3', mid: '#ffe4f1', bot: '#fff6fa', hemi: 1.05, sun: 1.7, sunC: '#ffffff', n: 0 },
  { p: 0.50, top: '#ffc9e3', mid: '#ffe4f1', bot: '#fff6fa', hemi: 1.05, sun: 1.7, sunC: '#ffffff', n: 0 },
  { p: 0.57, top: '#f472b6', mid: '#fdba74', bot: '#fde68a', hemi: 0.8, sun: 1.25, sunC: '#ffb37a', n: 0.15 },
  { p: 0.66, top: '#0f0a24', mid: '#2a1747', bot: '#4a2160', hemi: 0.32, sun: 0.35, sunC: '#b9c4ff', n: 1 },
  { p: 0.92, top: '#0f0a24', mid: '#2a1747', bot: '#4a2160', hemi: 0.32, sun: 0.35, sunC: '#b9c4ff', n: 1 },
  { p: 0.97, top: '#a78bfa', mid: '#f9a8d4', bot: '#fed7aa', hemi: 0.75, sun: 1.1, sunC: '#ffd1b3', n: 0.2 },
  { p: 1.00, top: '#ffc9e3', mid: '#ffe4f1', bot: '#fff6fa', hemi: 1.05, sun: 1.7, sunC: '#ffffff', n: 0 }
];
const cA = new THREE.Color(), cB = new THREE.Color();
const mix = (a, b, k) => '#' + cA.set(a).lerp(cB.set(b), k).getHexString();
let baseHemi = 1.05, baseSun = 1.7;
function applySky(phase) {
  let i = 0; while (i < skyKeys.length - 2 && phase > skyKeys[i + 1].p) i++;
  const A = skyKeys[i], B = skyKeys[i + 1], k = Math.min(1, Math.max(0, (phase - A.p) / (B.p - A.p || 1)));
  const top = mix(A.top, B.top, k), mid = mix(A.mid, B.mid, k), bot = mix(A.bot, B.bot, k);
  const g = skyCanvas.getContext('2d'), gr = g.createLinearGradient(0, 0, 0, 256);
  gr.addColorStop(0, top); gr.addColorStop(0.55, mid); gr.addColorStop(1, bot); g.fillStyle = gr; g.fillRect(0, 0, 2, 256); skyTex.needsUpdate = true;
  scene.background = skyTex; scene.fog.color.set(mid);
  nightness = A.n + (B.n - A.n) * k;
  scene.fog.near = 60 - nightness * 35; scene.fog.far = 120 - nightness * 45;
  baseHemi = A.hemi + (B.hemi - A.hemi) * k; hemi.intensity = baseHemi * (1 - 0.6 * caveK); hemi.color.set(mix('#fff4fa', '#9aa4ff', nightness)); hemi.groundColor.set(mix('#d8a7c0', '#3b2050', nightness));
  baseSun = A.sun + (B.sun - A.sun) * k; sun.intensity = baseSun * (1 - 0.8 * caveK); sun.color.set(mix(A.sunC, B.sunC, k));
  stars.visible = nightness > 0.05; stars.material.opacity = nightness; moon.visible = nightness > 0.3;
  lantern.intensity = nightness * 9;
  M.lamp.emissiveIntensity = 0.2 + nightness * 1.4; lampGlows.forEach(s => { s.visible = nightness > 0.2; s.material.opacity = nightness * 0.8; });
  fireflies.visible = nightness > 0.4;
}
