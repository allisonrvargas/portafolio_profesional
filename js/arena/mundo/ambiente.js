'use strict';
// Luciérnagas, flores, pasto, cascadas, espuma y peces.

/* ---------------- AMBIENTE ---------------- */
function glowTexture(color) {
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, color); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}
const glowTex = glowTexture('rgba(255,190,225,1)');
const lampGlows = lamps.map(([x, z]) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false })); s.scale.set(4, 4, 1); s.position.set(x, 3, z); s.visible = false; scene.add(s); return s; });
// luciérnagas
const ffN = 70, ffGeo = new THREE.BufferGeometry(), ffPos = new Float32Array(ffN * 3), ffBase = [];
for (let i = 0; i < ffN; i++) { const [tx, tz] = trees[i % trees.length]; const b = [tx + (Math.random() - 0.5) * 6, 1 + Math.random() * 3, tz + (Math.random() - 0.5) * 6, Math.random() * 6]; ffBase.push(b); ffPos.set(b.slice(0, 3), i * 3); }
ffGeo.setAttribute('position', new THREE.BufferAttribute(ffPos, 3));
const fireflies = new THREE.Points(ffGeo, new THREE.PointsMaterial({ color: 0xfef08a, size: 0.22, map: glowTexture('rgba(254,240,138,1)'), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
fireflies.visible = false; scene.add(fireflies);
// flores y pasto alto
const floraSpots = [];
{ const r = rng(77); for (let tries = 0; tries < 2500 && floraSpots.length < 260; tries++) {
  const x = Math.floor(r() * 31) - 15, z = Math.floor(r() * 47) - 25;
  if (blocks.get(`${x},0,${z}`) !== 'grass') continue; const up = blocks.get(`${x},1,${z}`); if (up && up !== 'air') continue;
  if (orePos.some(([ox, oz]) => ox === x && oz === z) || inCaveArea(x, z)) continue;
  floraSpots.push([x + (r() - 0.5) * 0.6, z + (r() - 0.5) * 0.6, r()]); } }
const flowers = floraSpots.filter((_, i) => i % 2 === 0), grassTufts = floraSpots.filter((_, i) => i % 2 === 1);
const stemMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.05, 0.32, 0.05), new THREE.MeshLambertMaterial({ color: 0x4d7c0f }), flowers.length);
const headMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.16, 0.12, 0.16), new THREE.MeshLambertMaterial({ color: 0xffffff }), flowers.length);
const flowerCols = [0xf472b6, 0xfde047, 0xffffff, 0xa78bfa, 0xfb7185, 0x60a5fa];
const m4b = new THREE.Matrix4();
flowers.forEach(([x, z, k], i) => { m4b.makeTranslation(x, 0.66, z); stemMesh.setMatrixAt(i, m4b); m4b.makeTranslation(x, 0.86, z); headMesh.setMatrixAt(i, m4b); headMesh.setColorAt(i, new THREE.Color(flowerCols[Math.floor(k * flowerCols.length)])); });
scene.add(stemMesh, headMesh);
const tuftMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.06, 0.38, 0.06), new THREE.MeshLambertMaterial({ color: 0x7cc464 }), grassTufts.length * 3);
const tuftDummy = new THREE.Object3D();
function swayGrass(t) {
  let n = 0; grassTufts.forEach(([x, z, k]) => { for (let j = 0; j < 3; j++) { tuftDummy.position.set(x + (j - 1) * 0.1, 0.69, z + ((j * 7) % 3 - 1) * 0.08); tuftDummy.rotation.set(Math.sin(t * 1.6 + x * 0.5 + j) * 0.18, 0, Math.cos(t * 1.3 + z * 0.4) * 0.18); tuftDummy.scale.set(1, 0.8 + ((k * 10 + j) % 1) * 0.6, 1); tuftDummy.updateMatrix(); tuftMesh.setMatrixAt(n++, tuftDummy.matrix); } });
  tuftMesh.instanceMatrix.needsUpdate = true;
}
swayGrass(0); scene.add(tuftMesh);
// brillos en el agua
const spN = 50, spGeo = new THREE.BufferGeometry(), spPos = new Float32Array(spN * 3);
for (let i = 0; i < spN; i++) spPos.set([Math.random() * 30 - 15, -0.42, -1.4 + Math.random() * 1.8], i * 3);
spGeo.setAttribute('position', new THREE.BufferAttribute(spPos, 3));
const sparkles = new THREE.Points(spGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.16, transparent: true, opacity: 0.8 })); scene.add(sparkles);
// cascada
const fallTex = texture((g, r) => speckle(g, r, ['#bfe6ff', '#9fd8ff', '#e0f4ff', '#8ccdf8', '#ffffff']), 41); fallTex.wrapS = fallTex.wrapT = THREE.RepeatWrapping; fallTex.repeat.set(2, 6);
const fall = new THREE.Mesh(new THREE.PlaneGeometry(2, 6.6), new THREE.MeshLambertMaterial({ map: fallTex, transparent: true, opacity: 0.72, side: THREE.DoubleSide, depthWrite: false }));
fall.rotation.y = -Math.PI / 2; fall.position.set(16.3, 2.8, -0.5); scene.add(fall);
// sombra de la cueva detrás de la cascada (de aquí sale el río)
const caveMouth = new THREE.Mesh(new THREE.PlaneGeometry(2, 2.6), new THREE.MeshBasicMaterial({ color: 0x1a1226, transparent: true, opacity: 0.88 }));
caveMouth.rotation.y = -Math.PI / 2; caveMouth.position.set(16.75, 1.0, -0.5); scene.add(caveMouth);
const foam = []; for (let i = 0; i < 14; i++) { const f = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.22), new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 })); f.userData.t = Math.random(); scene.add(f); foam.push(f); }
// chorro que cae al agujero del oeste
const drainFall = new THREE.Mesh(new THREE.PlaneGeometry(2, 5.2), new THREE.MeshLambertMaterial({ map: fallTex, transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false }));
drainFall.rotation.y = Math.PI / 2; drainFall.position.set(-15.55, -3.05, -0.5); scene.add(drainFall);
// espuma que se mete al agujero del oeste
const drain = []; for (let i = 0; i < 10; i++) { const f = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.18), new THREE.MeshLambertMaterial({ color: 0xe0f4ff, transparent: true, opacity: 0.8 })); f.userData.t = Math.random(); f.userData.z = -1.3 + Math.random() * 1.6; scene.add(f); drain.push(f); }
// peces que saltan
const fish = [0xfb7185, 0xfdba74, 0xa78bfa].map(c => { const g = new THREE.Group(); part(0.4, 0.2, 0.14, c, 0, 0, 0, g); part(0.14, 0.18, 0.06, c, -0.26, 0, 0, g); part(0.05, 0.05, 0.02, 0x111111, 0.14, 0.04, 0.075, g); g.visible = false; scene.add(g); return { g, t: Math.random() * 4, x: 0, dir: 1 }; });
function updateAmbient(dt, t) {
  fallTex.offset.y = t * 1.6;
  foam.forEach(f => { f.userData.t += dt * 0.9; if (f.userData.t > 1) f.userData.t = 0; const k = f.userData.t; f.position.set(15.6 - k * 1.6, -0.35 + Math.sin(k * Math.PI) * 0.6, -1 + ((f.id * 37) % 10) / 10 * 1.4); f.material.opacity = 0.85 * (1 - k); });
  sparkles.material.opacity = 0.35 + Math.abs(Math.sin(t * 3)) * 0.5;
  drain.forEach(f => { f.userData.t += dt * 0.5; if (f.userData.t > 1) { f.userData.t = 0; f.userData.z = -1.3 + Math.random() * 1.6; } const k = f.userData.t;
    f.position.set(-12 - k * 4, k < 0.85 ? -0.42 : -0.42 - (k - 0.85) * 20, f.userData.z + (-0.5 - f.userData.z) * k * k); f.rotation.y = t * 3; f.material.opacity = 0.8 * (1 - k * k); });
  const sp = spGeo.attributes.position.array; for (let i = 0; i < spN; i++) { sp[i * 3] -= dt * 0.8; if (sp[i * 3] < -16.5) sp[i * 3] = 15.5; } spGeo.attributes.position.needsUpdate = true;
  fish.forEach(f => {
    f.t -= dt;
    if (f.t <= 0 && !f.g.visible) { f.x = Math.random() * 24 - 12; if (bridges.some(([a, b]) => f.x > a - 1 && f.x < b + 1)) f.x = 3; f.dir = Math.random() < 0.5 ? -1 : 1; f.g.visible = true; f.t = 1.1; f.z = -1 + Math.random(); }
    if (f.g.visible) { const k = 1 - f.t / 1.1; f.g.position.set(f.x + f.dir * k * 1.6, -0.65 + Math.sin(k * Math.PI) * 1.4, f.z); f.g.rotation.set(0, f.dir > 0 ? 0 : Math.PI, (0.5 - k) * 1.6 * f.dir); if (f.t <= 0) { f.g.visible = false; f.t = 3 + Math.random() * 5; } }
  });
  if (fireflies.visible) { for (let i = 0; i < ffN; i++) { const b = ffBase[i]; ffPos[i * 3] = b[0] + Math.sin(t * 0.7 + b[3]) * 0.8; ffPos[i * 3 + 1] = b[1] + Math.sin(t * 1.3 + b[3] * 2) * 0.4; ffPos[i * 3 + 2] = b[2] + Math.cos(t * 0.6 + b[3]) * 0.8; } ffGeo.attributes.position.needsUpdate = true; fireflies.material.opacity = 0.6 + Math.sin(t * 5) * 0.4; }
}
