'use strict';
// Vida de la cueva: cofre secreto, antorchas, ajolotes y murciélagos.

// Cofre secreto de la cueva
const caveChest = new THREE.Group(); caveChest.position.set(-12, -5.5, -3.1); caveChest.rotation.y = 0; scene.add(caveChest);
part(1.1, 0.6, 0.8, 0x6b4a33, 0, 0.3, 0, caveChest); const caveLid = part(1.14, 0.3, 0.84, 0x80583c, 0, 0.72, 0, caveChest); part(0.2, 0.26, 0.06, 0x22d3ee, 0, 0.55, 0.42, caveChest);
const caveLights = [];
function torch(x, y, z) {
  const g = new THREE.Group(); g.position.set(x, y, z); scene.add(g);
  part(0.1, 0.45, 0.1, 0x8b5a2b, 0, 0, 0, g);
  const fl = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.18, 0.16), new THREE.MeshBasicMaterial({ color: 0xffb347 })); fl.position.y = 0.3; g.add(fl);
  const L = new THREE.PointLight(0xffa64d, 7, 7, 1.6); L.position.y = 0.4; g.add(L); caveLights.push({ L, base: 7, fl });
}
torch(-10.6, -3.8, -0.5); torch(-14, -3.8, -3.6); torch(-12.4, -2.8, 6);
{ const L = new THREE.PointLight(0xff6a1a, 9, 6, 1.6); L.position.set(-15.4, -4.9, 2.6); scene.add(L); caveLights.push({ L, base: 9 }); }
torch(-15.4, -3.8, 21.5); torch(-14.5, -3.8, 17.6); torch(-8.5, -1.8, 20.6);
{ const L = new THREE.PointLight(0xff6a1a, 7, 5, 1.6); L.position.set(-14, -4.9, 18.6); scene.add(L); caveLights.push({ L, base: 7 }); }
{ const L = new THREE.PointLight(0x22d3ee, 4, 5, 1.6); L.position.set(-8, -4.4, 18.6); scene.add(L); caveLights.push({ L, base: 4 }); }
// túnel: soportes de madera, rieles y faroles (sin luz propia para no gastar)
for (let z = 5; z <= 16; z += 3) {
  part(0.2, 2.9, 0.2, 0x7c5a3a, -11.38, -4.05, z, scene); part(0.2, 2.9, 0.2, 0x7c5a3a, -9.62, -4.05, z, scene); part(1.96, 0.22, 0.24, 0x8b6a45, -10.5, -2.66, z, scene);
  const fl = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.18, 0.16), new THREE.MeshBasicMaterial({ color: 0xffb347 })); fl.position.set(-10.5, -2.9, z + 0.2); scene.add(fl);
}
for (let z = 3.6; z <= 17.4; z += 0.6) part(1.3, 0.05, 0.16, 0x6b4a33, -10.5, -5.47, z, scene);   // durmientes
[-10.9, -10.1].forEach(x => part(0.07, 0.07, 14.2, 0x9ca3af, x, -5.42, 10.5, scene));          // rieles
[[-11.4, -2.9], [-16.6, 2.3], [-12.4, 3.4], [-11.3, 22.4], [-14.6, 22.5]].forEach(([x, z], i) => {
  for (let k = 0; k < 3; k++) { const c = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.5 - k * 0.12, 0.16), new THREE.MeshLambertMaterial({ color: 0xc084fc, emissive: 0x9333ea, emissiveIntensity: 0.9 }));
    c.position.set(x + (k - 1) * 0.18, -5.5 + (0.5 - k * 0.12) / 2, z + (k % 2) * 0.12); c.rotation.z = (k - 1) * 0.3; scene.add(c); }
});
// Ajolote (diseño original)
function buildAxolotl(pink = 0xf9a8d4, gill = 0xdb2777) {
  const g = new THREE.Group(), body = new THREE.Group(); g.add(body);
  part(0.34, 0.2, 0.6, pink, 0, 0, 0, body);                      // cuerpo
  part(0.4, 0.26, 0.3, pink, 0, 0.03, 0.42, body);                // cabeza
  part(0.06, 0.06, 0.02, 0x111827, -0.12, 0.08, 0.575, body); part(0.06, 0.06, 0.02, 0x111827, 0.12, 0.08, 0.575, body); // ojos
  part(0.14, 0.03, 0.02, 0xbe185d, 0, -0.03, 0.575, body);        // boquita
  [-1, 1].forEach(sd => { [0.14, 0.04, -0.06].forEach((y, k) => part(0.12, 0.06, 0.06, gill, sd * (0.24 + k * 0.02), y + 0.05, 0.38 - k * 0.04, body)); }); // branquias
  const tail = new THREE.Group(); tail.position.z = -0.3; body.add(tail);
  part(0.04, 0.2, 0.42, pink, 0, 0.02, -0.2, tail); part(0.02, 0.1, 0.3, gill, 0, 0.14, -0.2, tail);
  [[-0.2, 0.2], [0.2, 0.2], [-0.2, -0.2], [0.2, -0.2]].forEach(([x, z]) => part(0.1, 0.06, 0.08, pink, x, -0.1, z, body)); // patitas
  return { g, body, tail };
}
const axo = buildAxolotl(); axo.g.position.set(-16, -5.6, -0.5); scene.add(axo.g); axo.t = 0; axo.dir = 1; axo.happy = 0;
{ const L = new THREE.PointLight(0x22d3ee, 5, 6, 1.6); L.position.set(-16, -4.4, -0.5); scene.add(L); caveLights.push({ L, base: 5 }); }
const axo2 = buildAxolotl(0x7dd3fc, 0x1d4ed8); axo2.g.position.set(-8, -5.6, 18.5); scene.add(axo2.g); axo2.t = 0.5; axo2.dir = -1; axo2.happy = 0; axo2.blue = true;
let axoMet = false, axo2Met = false, wasInWater = false;
function greetAxolotl(a = axo) {
  if (a.blue) return greetBlue();
  award('axo', 40, 'Amigo ajolote');
  axo.happy = 1.6; sfx('pop');
  for (let i = 0; i < 6; i++) { const h = new THREE.Sprite(new THREE.SpriteMaterial({ map: heartTex, transparent: true, depthTest: false })); h.scale.set(0.6, 0.6, 1); h.position.set(axo.g.position.x + (Math.random() - 0.5) * 0.8, -5.2, axo.g.position.z + (Math.random() - 0.5) * 0.6); scene.add(h); h.userData.v = 0.8 + Math.random() * 0.6; axoHearts.push(h); }
  toast('♥', 'AJOLOTE', axoMet ? '¡Te saluda otra vez!' : '¡Hiciste un amigo!', 'Vive en el lago de la cueva. Le gusta nadar de un lado a otro.', '#db2777'); axoMet = true;
}
function greetBlue() {
  award('axoBlue', 60, 'Ajolote azul');
  axo2.happy = 1.6; sfx('win');
  for (let i = 0; i < 8; i++) { const h = new THREE.Sprite(new THREE.SpriteMaterial({ map: heartTex, transparent: true, depthTest: false, color: 0x93c5fd })); h.scale.set(0.6, 0.6, 1); h.position.set(axo2.g.position.x + (Math.random() - 0.5) * 0.8, -5.2, axo2.g.position.z + (Math.random() - 0.5) * 0.8); h.userData.v = 0.8 + Math.random() * 0.6; scene.add(h); axoHearts.push(h); }
  toast('♥', 'AJOLOTE AZUL', axo2Met ? '¡Te saluda otra vez!' : '¡Encontraste al ajolote azul!', 'En Minecraft es el ajolote más raro de todos. Vive en el laguito de la cueva del jardín.', '#1d4ed8'); axo2Met = true;
}
const axoHearts = [];
const heartTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 16; const g = c.getContext('2d'); g.fillStyle = '#ec4899';
  ['0110110', '1111111', '1111111', '0111110', '0011100', '0001000'].forEach((row, y) => [...row].forEach((v, x) => v === '1' && g.fillRect(x + 4, y + 5, 1, 1)));
  const t = new THREE.CanvasTexture(c); t.magFilter = THREE.NearestFilter; return t; })();
// murciélagos (diseño original): unos cuelgan de cabeza del techo y otros vuelan en círculos
function buildBat() {
  const g = new THREE.Group(), body = new THREE.Group(); g.add(body);
  part(0.22, 0.26, 0.18, 0x3f2a1d, 0, 0, 0, body);                                   // cuerpo
  part(0.2, 0.18, 0.18, 0x4a3426, 0, 0.2, 0.02, body);                               // cabeza
  part(0.05, 0.08, 0.04, 0x3f2a1d, -0.07, 0.32, 0.02, body); part(0.05, 0.08, 0.04, 0x3f2a1d, 0.07, 0.32, 0.02, body); // orejas
  part(0.04, 0.04, 0.02, 0xfacc15, -0.05, 0.22, 0.11, body); part(0.04, 0.04, 0.02, 0xfacc15, 0.05, 0.22, 0.11, body); // ojos
  const wl = new THREE.Group(), wr = new THREE.Group(); wl.position.set(-0.1, 0.06, 0); wr.position.set(0.1, 0.06, 0); body.add(wl, wr);
  part(0.36, 0.22, 0.03, 0x2b1d14, -0.18, 0, 0, wl); part(0.36, 0.22, 0.03, 0x2b1d14, 0.18, 0, 0, wr);
  return { g, body, wl, wr };
}
const bats = [];
[[-13, 1], [-15, -2.6], [-12.4, -1.6], [-16, 2.4], [-14.2, 2.6], [-13, 20], [-11.6, 21.6], [-14.5, 20.6]].forEach(([x, z], i) => { const b = buildBat(); b.hang = true; b.g.position.set(x, -1.72, z); b.g.rotation.z = Math.PI; b.ph = i; scene.add(b.g); bats.push(b); });
[0, 1].forEach(i => { const b = buildBat(); b.hang = false; b.ph = i * Math.PI; scene.add(b.g); bats.push(b); });
function updateBats(dt, t) {
  bats.forEach(b => {
    if (b.hang) { b.body.rotation.y = Math.sin(t * 0.8 + b.ph) * 0.3; const f = 0.15 + Math.sin(t * 3 + b.ph) * 0.05; b.wl.rotation.y = 1.3 - f; b.wr.rotation.y = -1.3 + f; return; }
    const a = t * 0.9 + b.ph, r = 2.2 + Math.sin(t * 0.5 + b.ph) * 0.6;
    b.g.position.set(-14 + Math.cos(a) * r, -3.2 + Math.sin(t * 2 + b.ph) * 0.35, 0 + Math.sin(a) * r);
    b.g.rotation.y = -a; const flap = Math.sin(t * 22 + b.ph) * 0.9; b.wl.rotation.y = flap; b.wr.rotation.y = -flap;
  });
}
let caveK = 0, caveFound = false;

function updateCave(dt, t) {
  const p = player.position, inside = inCaveArea(p.x, p.z) && feet < -1;
  caveK += ((inside ? 1 : 0) - caveK) * Math.min(1, dt * 3);
  updateBats(dt, t); water.material.opacity = 0.72 - 0.4 * caveK; waterOverCave.visible = caveK < 0.5; // el río se ve transparente desde la cueva
  hemi.intensity = baseHemi * (1 - 0.6 * caveK); sun.intensity = baseSun * (1 - 0.8 * caveK);
  caveLights.forEach((c, i) => { c.L.intensity = c.base * (0.85 + Math.sin(t * 9 + i * 2) * 0.1 + Math.sin(t * 23 + i) * 0.05); });
  T.lava.offset.y = (t * 0.05) % 1;
  // el ajolote nada de un lado a otro del lago
  axo.t += dt * (axo.happy > 0 ? 0 : 0.35) * axo.dir;
  if (axo.t > 1) { axo.t = 1; axo.dir = -1; } if (axo.t < 0) { axo.t = 0; axo.dir = 1; }
  const ax = -16.1 + Math.sin(t * 0.8) * 0.5, az = -1.8 + axo.t * 2.6;
  axo.g.position.x = ax; axo.g.position.z = az; axo.g.position.y = -5.6 + Math.sin(t * 2) * 0.05;
  if (axo.happy > 0) { axo.happy -= dt; axo.g.rotation.y += dt * 8; axo.g.position.y += Math.abs(Math.sin(t * 10)) * 0.3; }
  else { const want = axo.dir > 0 ? 0 : Math.PI; axo.g.rotation.y += Math.atan2(Math.sin(want - axo.g.rotation.y), Math.cos(want - axo.g.rotation.y)) * Math.min(1, dt * 4); }
  axo.tail.rotation.y = Math.sin(t * 6) * 0.5;
  // ajolote azul: nada de lado a lado en el laguito del jardín
  axo2.t += dt * (axo2.happy > 0 ? 0 : 0.3) * axo2.dir;
  if (axo2.t > 1) { axo2.t = 1; axo2.dir = -1; } if (axo2.t < 0) { axo2.t = 0; axo2.dir = 1; }
  axo2.g.position.set(-9.2 + axo2.t * 2.4, -5.6 + Math.sin(t * 2.2) * 0.05, 18.5 + Math.sin(t * 0.7) * 0.35);
  if (axo2.happy > 0) { axo2.happy -= dt; axo2.g.rotation.y += dt * 8; axo2.g.position.y += Math.abs(Math.sin(t * 10)) * 0.3; }
  else { const want = axo2.dir > 0 ? Math.PI / 2 : -Math.PI / 2; axo2.g.rotation.y += Math.atan2(Math.sin(want - axo2.g.rotation.y), Math.cos(want - axo2.g.rotation.y)) * Math.min(1, dt * 4); }
  axo2.tail.rotation.y = Math.sin(t * 6 + 1) * 0.5;
  for (let i = axoHearts.length - 1; i >= 0; i--) { const h = axoHearts[i]; h.position.y += dt * h.userData.v; h.material.opacity = Math.max(0, 1 - (h.position.y + 5.2) / 1.6); if (h.material.opacity <= 0) { scene.remove(h); axoHearts.splice(i, 1); } }
  // chapoteo al entrar al agua
  const inWater = blocks.get(`${Math.round(p.x)},${Math.round(feet + 0.2)},${Math.round(p.z)}`) === 'agua';
  if (inWater && !wasInWater) { sfx('splash'); dust(p.x, feet + 0.6, p.z, 22, 0x67e8f9); dust(p.x, feet + 0.9, p.z, 10, 0xffffff); }
  if (!inWater && wasInWater) sfx('splashOut'); // salir del agua
  wasInWater = inWater;
  if (inside && feet < -3 && !caveFound) { caveFound = true; sfx('pop'); award('cave', 80, 'Cueva secreta'); toast('⛏', 'CUEVA SECRETA', '¡Encontraste la cueva!', 'Busca el cofre del fondo: guarda un secreto. Cuidado con la lava.', '#78716c'); }
  if (onGround && groundType() === 'lava') {
    sfx('hurt'); p.set(-11.4, 0.5, 7.8); feet = 0.5; vy = 0;
    toast('♨', '¡AY, LAVA!', 'Volviste a la entrada', 'La lava quema: rodéala para llegar al cofre.', '#ea580c');
  }
}
