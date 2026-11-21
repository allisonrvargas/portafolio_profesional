'use strict';
// DJ con tornamesas en el escenario.

/* ---------------- DJ DEL ESCENARIO (diseño original) ---------------- */
const djBooth = new THREE.Group(); djBooth.position.set(11, 1.5, 13); scene.add(djBooth);
part(3.1, 0.74, 1.04, 0x1f1530, 0, 0.37, 0, djBooth);
part(3.12, 0.1, 0.2, 0xec4899, 0, 0.5, 0.48, djBooth);
part(3.12, 0.06, 0.2, 0x22d3ee, 0, 0.3, 0.48, djBooth);
[-0.95, 0.95].forEach(x => part(0.9, 0.04, 0.9, 0x9ca3af, x, 0.75, -0.05, djBooth)); // base plateada
const discs = [-0.95, 0.95].map(x => { const d = new THREE.Group(); d.position.set(x, 0.79, -0.05); djBooth.add(d);
  part(0.78, 0.05, 0.78, 0x111827, 0, 0, 0, d); part(0.26, 0.06, 0.26, 0xf472b6, 0, 0.01, 0, d); part(0.06, 0.07, 0.3, 0xe5e7eb, 0.22, 0.02, 0.1, d); return d; });
const mixerLeds = [];
part(0.7, 0.08, 0.6, 0x374151, 0, 0.77, -0.05, djBooth);
[-0.2, 0, 0.2].forEach((x, i) => { const l = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 0.1), new THREE.MeshBasicMaterial({ color: [0x22d3ee, 0xf472b6, 0xfbbf24][i] })); l.position.set(x, 0.83, 0.08); djBooth.add(l); mixerLeds.push(l); });
function buildDJ() {
  const g = new THREE.Group(), body = new THREE.Group(); g.add(body);
  part(0.22, 0.6, 0.24, 0x1e1b4b, -0.14, 0.3, 0, body); part(0.22, 0.6, 0.24, 0x1e1b4b, 0.14, 0.3, 0, body);
  part(0.62, 0.66, 0.36, 0xdb2777, 0, 0.93, 0, body);
  part(0.64, 0.08, 0.38, 0x22d3ee, 0, 0.66, 0, body);
  const head = new THREE.Group(); head.position.y = 1.5; body.add(head);
  part(0.48, 0.48, 0.48, 0xc68863, 0, 0, 0, head);
  part(0.5, 0.14, 0.5, 0x3b0764, 0, 0.27, 0, head); part(0.42, 0.06, 0.24, 0x3b0764, 0, 0.21, -0.34, head);
  part(0.42, 0.1, 0.04, 0x111827, 0, 0.04, 0.25, head);
  part(0.12, 0.04, 0.02, 0xbe185d, 0, -0.13, 0.245, head);
  part(0.58, 0.08, 0.12, 0x0891b2, 0, 0.3, 0, head);
  part(0.1, 0.22, 0.22, 0x22d3ee, -0.29, 0.02, 0, head); part(0.1, 0.22, 0.22, 0x22d3ee, 0.29, 0.02, 0, head);
  const armL = new THREE.Group(), armR = new THREE.Group(); armL.position.set(-0.4, 1.2, 0); armR.position.set(0.4, 1.2, 0); body.add(armL, armR);
  part(0.18, 0.56, 0.18, 0xdb2777, 0, -0.24, 0, armL); part(0.18, 0.56, 0.18, 0xdb2777, 0, -0.24, 0, armR);
  part(0.16, 0.14, 0.16, 0xc68863, 0, -0.56, 0, armL); part(0.16, 0.14, 0.16, 0xc68863, 0, -0.56, 0, armR);
  return { g, body, head, armL, armR };
}
const dj = buildDJ(); dj.g.scale.setScalar(1.3); dj.g.position.set(11, 1.5, 12.2); scene.add(dj.g);
const djLight = new THREE.PointLight(0xf472b6, 0, 9, 1.6); djLight.position.set(11, 4.2, 13.5); scene.add(djLight);
function updateDJ(dt, t) {
  const beat = playing ? t * 8.6 : t * 2;
  discs.forEach((d, i) => d.rotation.y += dt * (playing ? 7 : 0.6) * (i ? -1 : 1));
  dj.body.position.y = playing ? Math.abs(Math.sin(beat)) * 0.08 : Math.sin(t * 1.5) * 0.02;
  dj.head.rotation.x = playing ? Math.sin(beat) * 0.22 : 0;
  dj.armL.rotation.x = -0.6 + (playing ? Math.sin(beat * 2) * 0.25 : 0);
  dj.armL.rotation.z = playing ? Math.sin(beat * 2) * 0.2 : 0;
  dj.armR.rotation.x = playing ? -2.6 + Math.sin(beat) * 0.5 : -0.6;
  dj.armR.rotation.z = playing ? -0.3 : 0;
  mixerLeds.forEach((l, i) => l.visible = !playing || Math.sin(beat * 2 + i * 2) > -0.2);
  djLight.intensity = playing ? 4 + Math.abs(Math.sin(beat)) * 6 : 0;
  if (playing) djLight.color.setHSL(((t * 0.15) % 1), 0.8, 0.6);
}
