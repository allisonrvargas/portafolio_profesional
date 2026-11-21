'use strict';
// Sonido de pisadas y polvo.

/* ---------------- PISADAS Y POLVO ---------------- */
let lastStep = 0;
function groundType() { const t = blocks.get(`${Math.round(player.position.x)},${Math.round(feet - 0.5)},${Math.round(player.position.z)}`); return t || 'grass'; }
function footstep() {
  if (!actx || volume === 0) return;
  const g = groundType(), t = actx.currentTime;
  if (g === 'planks' || g === 'log') { tone(50 + Math.random() * 4, t, 0.05, 'triangle', 0.35); grit(t, 0.04, 900, 0.25); }
  else if (g === 'sand') grit(t, 0.07, 2400 + Math.random() * 600, 0.35);
  else if (['stone', 'cobble', 'quartz', 'gold'].includes(g)) { grit(t, 0.03, 3200, 0.45); tone(84, t, 0.02, 'square', 0.05); }
  else if (g.startsWith('wool')) grit(t, 0.06, 600, 0.15);
  else grit(t, 0.08, 1300 + Math.random() * 400, 0.3);
}
function dust(x, y, z, n, color) {
  for (let i = 0; i < n; i++) {
    const d = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), new THREE.MeshLambertMaterial({ color }));
    d.position.set(x + (Math.random() - 0.5) * 0.4, y + 0.1, z + (Math.random() - 0.5) * 0.4);
    d.userData.v = new THREE.Vector3((Math.random() - 0.5) * 1.5, 1 + Math.random() * 1.5, (Math.random() - 0.5) * 1.5); d.userData.life = 0.5; scene.add(d); debris.push(d);
  }
}
const dustColor = { sand: 0xf1d9b4, grass: 0x8fd17a, planks: 0xeebba8, stone: 0xc4bfc8, cobble: 0xc4bfc8, quartz: 0xfbeef5 };
