'use strict';
// Lugares del mapa (casa, torres, castillo...) y el cofre del CV.

/* ---------------- LUGARES ---------------- */
const lugares = [
  { id: 'casa', n: 'Sobre mí', l: 'La casa · Sobre mí', door: [-11, 17.6], at: [-11, 13, 10.5], c: '#ec4899', q: 'Conoce a la jugadora (la casa)', open: () => panelCasa() },
  { id: 'musica', n: 'Música', l: 'Escenario · Música', door: [11, 17.2], alt: [11, 14.4], at: [11, 13, 8.2], c: '#f472b6', q: 'Pon música en el escenario', open: () => panelMusica() },
  { id: 'proyectos', n: 'Proyectos', l: 'Torre de proyectos', door: [-9, -8.6], at: [-9, -12, 13.6], c: '#a78bfa', q: 'Explora la torre de proyectos', open: () => panelProyectos() },
  { id: 'apps', n: 'Aplicaciones', l: 'Torre arcade · Apps', door: [9, -8.6], at: [9, -12, 13.6], c: '#db2777', q: 'Juega en la torre arcade', open: () => panelApps() },
  { id: 'castillo', n: 'Contacto', l: 'Castillo · Sube las gradas', door: [0, -14.6], at: [0, -20, 15], c: '#d97706', q: 'Llega al castillo (contacto)', open: () => panelCastillo() },
  { id: 'granja', n: 'Granja', l: 'Granja · Corral', door: [0, -2.4], at: [0, -5, 3.4], c: '#16a34a', open: () => panelGranja() },
  { id: 'cueva', n: 'Cueva secreta', l: 'Cueva · Baja con cuidado', door: [-12, -2.3], go: [-11.4, 7.8], at: [-13.5, 7.2, 2.4], c: '#78716c', open: () => panelCueva() },
  { id: 'cofre', n: 'Mi CV', l: 'Cofre · Mi CV', door: [5.5, -13.9], at: [5.5, -15.5, 2.6], c: '#0d9488', open: () => panelCofre() }
];
const visited = new Set();
const hitMeshes = [];
const hitMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
lugares.forEach(L => {
  const s = label(L.l, L.c); s.position.set(L.at[0], L.at[2], L.at[1]); scene.add(s); L.sprite = s;
});
[['npc', 3.2, 16.2, 1.2, 2.2, 1.2], ['casa', -11, 13, 8, 9, 8], ['musica', 11, 13, 8, 6, 6], ['proyectos', -9, -12, 6, 12, 6], ['apps', 9, -12, 6, 12, 6], ['castillo', 0, -20, 15, 12, 10], ['cofre', 5.5, -15.5, 1.4, 1.4, 1.2]].forEach(([id, x, z, w, h, d]) => {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), hitMat); m.position.set(x, h / 2, z); m.userData = { kind: 'loc', id }; scene.add(m); hitMeshes.push(m);
});
// Cofre del CV
const chest = new THREE.Group(); chest.position.set(5.5, 0.5, -15.5); scene.add(chest);
part(1.1, 0.6, 0.8, 0x9a6744, 0, 0.3, 0, chest); const lid = part(1.14, 0.3, 0.84, 0xb07a55, 0, 0.72, 0, chest); part(0.2, 0.26, 0.06, 0xfcd34d, 0, 0.55, 0.42, chest);
solid(4.8, -16.1, 6.2, -14.9);
