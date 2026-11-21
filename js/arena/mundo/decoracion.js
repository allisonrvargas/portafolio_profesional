'use strict';
// Agua, letreros flotantes, pantalla arcade, banderas, nubes, pétalos y notas.

// Agua animada
const waterTex = texture((g, r) => speckle(g, r, ['#9fd8ff', '#b4e2ff', '#8ccdf8', '#c4eaff']), 21);
waterTex.wrapS = waterTex.wrapT = THREE.RepeatWrapping; waterTex.repeat.set(36, 2);
const water = new THREE.Mesh(new THREE.BoxGeometry(28, 1.15, 2), new THREE.MeshLambertMaterial({ map: waterTex, transparent: true, opacity: 0.72, depthWrite: false }));
water.position.set(3.5, -1.02, -0.5); water.receiveShadow = true; scene.add(water);
// tramo del río que pasa encima de la cueva: se oculta cuando estás abajo para no tapar la caverna
const waterOverCave = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.15, 2), water.material);
waterOverCave.position.set(-12.8, -1.02, -0.5); scene.add(waterOverCave);

// Etiquetas flotantes
function label(text, color = '#db2777') {
  const c = document.createElement('canvas'); c.width = 512; c.height = 128; const g = c.getContext('2d');
  let fs = 64; g.font = fs + 'px "Bubblegum Sans", system-ui';
  while (g.measureText(text).width > 440 && fs > 30) { fs -= 2; g.font = fs + 'px "Bubblegum Sans", system-ui'; } // letra más pequeña si no cabe
  const w = Math.min(500, g.measureText(text).width + 50);
  const x = (512 - w) / 2;
  g.fillStyle = '#f5b8d3'; g.fillRect(x - 6, 14, w + 12, 100);
  g.fillStyle = '#ffffff'; g.fillRect(x, 20, w, 88);
  g.fillStyle = color; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, 256, 68);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false })); s.scale.set(4.8, 1.2, 1); s.renderOrder = 10; return s;
}

// Pantalla arcade animada sobre la torre de aplicaciones
const arcadeCanvas = document.createElement('canvas'); arcadeCanvas.width = arcadeCanvas.height = 32;
const arcadeTex = new THREE.CanvasTexture(arcadeCanvas); arcadeTex.magFilter = THREE.NearestFilter; arcadeTex.colorSpace = THREE.SRGBColorSpace;
const arcade = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.6), new THREE.MeshBasicMaterial({ map: arcadeTex }));
arcade.position.set(9, 5.6, -9.48); scene.add(arcade);
function drawArcade(t) {
  const g = arcadeCanvas.getContext('2d'); g.fillStyle = '#2b1235'; g.fillRect(0, 0, 32, 32);
  for (let i = 0; i < 6; i++) { const x = (i * 6 + Math.floor(t * 8)) % 32; g.fillStyle = ['#ec4899', '#f9a8d4', '#fcd34d', '#5eead4'][i % 4]; g.fillRect(x, 4 + (i % 3) * 3, 2, 2); }
  g.fillStyle = '#fff'; g.font = 'bold 9px monospace'; g.fillText('APPS', 5, 22);
  g.fillStyle = Math.floor(t * 2) % 2 ? '#fcd34d' : '#ec4899'; g.fillRect(4, 26, 24, 3);
  arcadeTex.needsUpdate = true;
}

// Banderas
const flags = [];
function flag(x, y, z, color) {
  const pole = new THREE.Mesh(new THREE.BoxGeometry(0.15, 3, 0.15), M.log[0]); pole.position.set(x, y + 1.5, z); pole.castShadow = true; scene.add(pole);
  const cloth = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.8, 0.08), new THREE.MeshLambertMaterial({ color })); cloth.geometry.translate(0.7, 0, 0);
  cloth.position.set(x + 0.08, y + 2.5, z); cloth.castShadow = true; scene.add(cloth); flags.push(cloth);
}
flag(-2, 10.5, -22, '#ec4899'); flag(-9, 11.5, -12, '#c4b5fd'); flag(9, 11.5, -12, '#f472b6');

// Nubes de bloques
const clouds = new THREE.Group(); scene.add(clouds);
const cloudMat = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.92 });
for (let i = 0; i < 7; i++) {
  const c = new THREE.Group(); const r = rng(100 + i);
  for (let j = 0; j < 5; j++) { const b = new THREE.Mesh(unit, cloudMat); b.scale.set(2 + r() * 3, 1, 2 + r() * 2); b.position.set(r() * 5, r() * 0.6, r() * 3); c.add(b); }
  c.position.set(-40 + i * 13, 24 + r() * 4, -30 + r() * 50); clouds.add(c);
}

// Pétalos
const petalCount = 260, petalGeo = new THREE.BufferGeometry(), petalPos = new Float32Array(petalCount * 3);
for (let i = 0; i < petalCount; i++) { petalPos[i * 3] = Math.random() * 36 - 18; petalPos[i * 3 + 1] = Math.random() * 14; petalPos[i * 3 + 2] = Math.random() * 52 - 27; }
petalGeo.setAttribute('position', new THREE.BufferAttribute(petalPos, 3));
const petals = new THREE.Points(petalGeo, new THREE.PointsMaterial({ color: 0xf472b6, size: 0.18 }));
scene.add(petals);

// Notas musicales sobre el escenario
const notes = [];
for (let i = 0; i < 5; i++) {
  const s = label(['♪', '♫', '♪', '♬', '♫'][i], '#ec4899'); s.scale.set(1.6, 0.4, 1);
  s.material.opacity = 0; s.material.transparent = true; s.position.set(11, 3, 13); scene.add(s); notes.push({ s, t: i / 5 });
}
