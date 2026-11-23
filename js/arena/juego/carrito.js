'use strict';
// Carrito: súbete con E y recorre la arena. No entra a edificios, al agua ni a lugares angostos: te avisa y lo dejas enfrente.

const KART_HOME = [-2.2, 19.2];
const kart = new THREE.Group(); kart.position.set(KART_HOME[0], 0.5, KART_HOME[1]); scene.add(kart);
// carrocería (diseño original: rosa con franja turquesa)
part(1.2, 0.36, 1.9, 0xec4899, 0, 0.32, 0, kart);
part(1.24, 0.08, 1.94, 0x22d3ee, 0, 0.46, 0, kart);
part(1.0, 0.3, 0.5, 0xdb2777, 0, 0.55, 0.62, kart);            // cofre del motor
part(0.9, 0.5, 0.16, 0x4a1238, 0, 0.72, -0.62, kart);           // respaldo del asiento
part(0.9, 0.1, 0.6, 0x7a3d63, 0, 0.52, -0.3, kart);             // asiento
part(0.06, 0.4, 0.06, 0x374151, 0, 0.72, 0.32, kart).rotation.x = -0.6; // columna del volante
const kartWheel = part(0.44, 0.06, 0.44, 0x111827, 0, 0.92, 0.2, kart); kartWheel.rotation.x = -0.6; // volante
[[-0.3, 0.98], [0.3, 0.98]].forEach(([x, z]) => part(0.18, 0.12, 0.06, 0xfef08a, x, 0.4, z, kart)); // faros
part(0.04, 0.9, 0.04, 0x9ca3af, 0.5, 0.95, -0.85, kart); part(0.36, 0.24, 0.02, 0xfacc15, 0.68, 1.3, -0.85, kart); // banderita
const kartWheels = [[-0.62, 0.62], [0.62, 0.62], [-0.62, -0.62], [0.62, -0.62]].map(([x, z]) => {
  const w = new THREE.Group(); w.position.set(x, 0.24, z); kart.add(w);
  part(0.2, 0.48, 0.48, 0x1f2937, 0, 0, 0, w); part(0.22, 0.2, 0.2, 0xe5e7eb, 0, 0, 0, w); return w;
});
// remolque para la mascota (aparece cuando tienes mascota)
const trailer = new THREE.Group(); trailer.position.z = -1.95; kart.add(trailer);
part(0.1, 0.1, 0.75, 0x4b5563, 0, 0.3, 0.62, trailer);                       // enganche
part(1.0, 0.1, 1.0, 0x1f1530, 0, 0.32, 0, trailer);                           // piso
part(1.0, 0.2, 0.08, 0xec4899, 0, 0.46, 0.46, trailer); part(1.0, 0.2, 0.08, 0xec4899, 0, 0.46, -0.46, trailer); // frente y atrás (bajitos para que se vea la mascota)
part(0.08, 0.2, 1.0, 0xec4899, 0.5, 0.46, 0, trailer); part(0.08, 0.2, 1.0, 0xec4899, -0.5, 0.46, 0, trailer);   // lados
part(1.04, 0.05, 1.04, 0x22d3ee, 0, 0.58, 0, trailer);                        // borde turquesa
const glassMat = new THREE.MeshLambertMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.22, depthWrite: false });
[[0.52, 0, Math.PI / 2], [-0.52, 0, Math.PI / 2], [0, -0.52, 0]].forEach(([x, z, r]) => { const w = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.92), glassMat); w.position.set(x, 1.06, z); w.rotation.y = r; trailer.add(w); }); // ventanas grandes
[[0.5, 0.5], [-0.5, 0.5], [0.5, -0.5], [-0.5, -0.5]].forEach(([x, z]) => part(0.06, 0.96, 0.06, 0xec4899, x, 1.06, z, trailer)); // postes
part(1.12, 0.08, 1.12, 0x7c3aed, 0, 1.56, 0, trailer);                        // techo
part(0.16, 0.08, 0.06, 0xef4444, 0.34, 0.44, -0.5, trailer); part(0.16, 0.08, 0.06, 0xef4444, -0.34, 0.44, -0.5, trailer); // luces traseras
part(0.03, 0.8, 0.03, 0x9ca3af, 0.44, 1.92, -0.44, trailer); part(0.3, 0.2, 0.02, 0xf472b6, 0.6, 2.22, -0.44, trailer); // banderita
const trailerWheels = [0.62, -0.62].map(x => { const w = new THREE.Group(); w.position.set(x, 0.22, 0); trailer.add(w); part(0.16, 0.44, 0.44, 0x1f2937, 0, 0, 0, w); part(0.18, 0.18, 0.18, 0xe5e7eb, 0, 0, 0, w); return w; });
const trailerSeat = new THREE.Object3D(); trailerSeat.position.set(0, 0.37, 0); trailer.add(trailerSeat);
trailer.visible = false;
let trailerTold = false; const _seat = new THREE.Vector3();
function rideTrailer(a, dt, t) {
  trailerSeat.getWorldPosition(_seat);
  a.g.position.set(_seat.x, _seat.y + Math.abs(Math.sin(t * 6)) * 0.03, _seat.z); a.y = _seat.y; a.g.rotation.y = kart.rotation.y;
  a.legs.forEach(l => l.rotation.x = 0); a.headG.rotation.x = Math.sin(t * 2) * 0.1; a.inLake = false; a.swim = false;
  if (a.rope.visible) a.rope.visible = false;
  if (!trailerTold) { trailerTold = true; toast('♥', 'EN SU REMOLQUE', `${petName || a.n} va contigo`, 'Tu mascota viaja en su remolque mientras manejas.', '#ec4899'); }
}
// para que el personaje no lo atraviese cuando está estacionado
let driving = false, kartMsgT = 0, kartRot = 0;

// zonas donde el carrito no entra (lo dejas enfrente)
function kartZone(x, z) {
  const inR = r => x > r.inX[0] - 0.4 && x < r.inX[1] + 0.4 && z > r.inZ[0] - 0.4 && z < r.inZ[1] + 0.4;
  if (inR(roofZones[0])) return 'la casa';
  if (inR(roofZones[1])) return 'la torre de proyectos';
  if (inR(roofZones[2])) return 'la torre arcade';
  if (x > -6.6 && x < 6.6 && z < -14.4 && z > -24.5) return 'el castillo';
  if (x > 7 && x < 15 && z > 10 && z < 16) return 'el escenario';
  if (x > CORRAL.x1 - 0.2 && x < CORRAL.x2 + 0.2 && z > CORRAL.z1 - 0.2 && z < CORRAL.z2 + 0.2) return 'el corral';
  return null;
}
// ¿cabe el carrito aquí? devuelve null o el motivo
function kartBlocked(x, z) {
  const zone = kartZone(x, z); if (zone) return { why: 'zona', zone };
  const g = groundBelow(x, z, feet + 0.4);
  if (g < feet - 0.3) return inCaveArea(x, z) ? { why: 'zona', zone: 'la cueva' } : { why: z > -1.9 && z < 0.9 ? 'agua' : 'escalon' };
  if (g > feet + 0.3) return { why: 'escalon' };
  for (const dx of [-0.42, 0.42]) for (const dz of [-0.42, 0.42]) if (hits(x + dx, feet, z + dz)) {
    for (const [ex, ez] of [[1.4, 0], [-1.4, 0], [0, 1.4], [0, -1.4]]) { const near = kartZone(x + ex, z + ez); if (near) return { why: 'zona', zone: near }; } // pegado a un edificio
    return { why: 'angosto' };
  }
  return null;
}
function kartWarn(b) {
  if (kartMsgT > 0) return; kartMsgT = 3.5; sfx('blip');
  if (b.why === 'zona') toast('🚗', 'ESTACIONA AQUÍ', `El carrito no entra ${b.zone.startsWith('el ') ? 'al ' + b.zone.slice(3) : 'a ' + b.zone}`, 'Bájate con E y entra caminando.', '#db2777');
  else if (b.why === 'agua') toast('🚗', 'CUIDADO', 'El carrito no flota', 'Cruza el río por un puente.', '#0ea5e9');
  else if (b.why === 'escalon') toast('🚗', 'NO PUEDE PASAR', 'Hay un escalón o un desnivel', 'El carrito solo va por terreno plano. Bájate con E para seguir.', '#db2777');
  else toast('🚗', 'NO CABE', 'El espacio es muy pequeño para el carrito', 'Bájate con E para pasar caminando.', '#db2777');
}
// el bucle llama a esto para saber si te puedes mover a (x, z)
function canMove(x, z) {
  if (!driving) return !hits(x, feet, z) && !kartBody(x, z);
  let b = kartBlocked(x, z);
  if (!b && trailer.visible) { const r = player.rotation.y, tx = x - Math.sin(r) * 1.95, tz = z - Math.cos(r) * 1.95; if (hits(tx, feet, tz)) b = { why: 'angosto' }; } // el remolque también tiene que caber
  if (b) { kartWarn(b); return false; } return true;
}
// el carrito estacionado es sólido
function kartBody(x, z) {
  if (driving || feet > 1.4 || feet < -0.2) return false;
  const c = Math.cos(kartRot), s = Math.sin(kartRot), dx = x - kart.position.x, dz = z - kart.position.z;
  const lx = dx * c - dz * s, lz = dx * s + dz * c;
  return Math.abs(lx) < 0.6 + PR && lz < 0.95 + PR && lz > -0.95 - (trailer.visible ? 1.5 : 0) - PR; // con remolque es más largo
}
function enterKart() {
  if (driving) return;
  driving = true; sfx('open'); target = null; waypoints = [];
  player.position.set(kart.position.x, feet, kart.position.z); player.rotation.y = kartRot;
  toast('🚗', '¡AL VOLANTE!', 'Recorre la arena en carrito', 'Más rápido que caminando. Pulsa E para bajarte.', '#ec4899');
}
function leaveKart(sendHome) {
  if (!driving) return;
  driving = false; rig.position.y = 0; rig.position.z = 0;
  if (sendHome) { kart.position.set(KART_HOME[0], 0.5, KART_HOME[1]); kartRot = 0; kart.rotation.y = 0; return; }
  kart.position.set(player.position.x, feet, player.position.z); kartRot = player.rotation.y; kart.rotation.y = kartRot;
  // te bajas por un lado
  const side = [[Math.cos(kartRot), -Math.sin(kartRot)], [-Math.cos(kartRot), Math.sin(kartRot)]];
  for (const [ux, uz] of side) { const x = kart.position.x + ux * 1.3, z = kart.position.z + uz * 1.3; if (!hits(x, feet, z) && Math.abs(groundBelow(x, z, feet + 0.4) - feet) < 0.3) { player.position.set(x, feet, z); break; } }
  sfx('blip');
}
function updateKart(dt, t, moving) {
  kartMsgT = Math.max(0, kartMsgT - dt);
  trailer.visible = !!pet; trailerWheels.forEach(w => w.rotation.x += dt * (driving && moving ? 14 : 0));
  if (!driving) return;
  kart.position.set(player.position.x, feet, player.position.z); kartRot = player.rotation.y; kart.rotation.y = kartRot;
  rig.position.y = -0.05; rig.position.z = -0.3;            // sentada en el asiento (las piernas se doblan en el bucle)
  kartWheels.forEach(w => w.rotation.x += dt * (moving ? 14 : 0));
  kartWheel.rotation.z = moving ? Math.sin(t * 3) * 0.2 : 0;
  if (moving && Math.random() < dt * 8) dust(player.position.x - Math.sin(kartRot) * 0.9, feet, player.position.z - Math.cos(kartRot) * 0.9, 1, 0xe5e7eb);
}
