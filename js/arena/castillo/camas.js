'use strict';
// Camas del castillo y de la cueva: dormir te regresa al inicio.

// Cama en el patio del castillo: al acostarte vuelves al inicio
const BED = [-4, -21]; const bed = new THREE.Group(); bed.position.set(BED[0], 1.5, BED[1]); bed.rotation.y = Math.PI / 2; scene.add(bed);
part(2, 0.3, 1, 0x7a4e3a, 0, 0.15, 0, bed); part(1.96, 0.18, 0.96, 0xec4899, 0.18, 0.39, 0, bed); part(0.5, 0.2, 0.9, 0xffffff, -0.7, 0.4, 0, bed);
part(0.1, 0.7, 1, 0x7a4e3a, -1, 0.35, 0, bed); part(0.1, 0.45, 1, 0x7a4e3a, 1, 0.22, 0, bed);
put(0, 10, -20, 'gold'); put(1, 10, -20, 'gold'); put(2, 10, -20, 'gold');
// segunda cama: en la cueva del jardín
const CAVE_BED = [-14.9, 20.5]; const caveBed = new THREE.Group(); caveBed.position.set(CAVE_BED[0], -5.5, CAVE_BED[1]); caveBed.rotation.y = Math.PI / 2; scene.add(caveBed);
part(2, 0.3, 1, 0x7a4e3a, 0, 0.15, 0, caveBed); part(1.96, 0.18, 0.96, 0x38bdf8, 0.18, 0.39, 0, caveBed); part(0.5, 0.2, 0.9, 0xffffff, -0.7, 0.4, 0, caveBed);
part(0.1, 0.7, 1, 0x7a4e3a, -1, 0.35, 0, caveBed); part(0.1, 0.45, 1, 0x7a4e3a, 1, 0.22, 0, caveBed);
let sleepAt = 'castle';
const bedSign = label('Cama · Volver al inicio', '#9d174d'); bedSign.scale.set(4.4, 1.1, 1); bedSign.position.set(BED[0], 3.4, BED[1]); scene.add(bedSign);

let sleeping = false;
function sleep(where = 'castle') {
  award('sleep', 30, 'Dormiste en una cama');
  if (sleeping) return; sleeping = true; sfx('open'); sleepAt = where;
  if (where === 'cave') { player.position.set(CAVE_BED[0], -5.5, CAVE_BED[1] - 0.2); feet = -5.1; }
  else { player.position.set(BED[0], 1.5, BED[1] - 0.2); feet = 1.9; }
  vy = 0; player.rotation.y = 0;
  rig.rotation.z = Math.PI / 2; rig.position.y = 0.25;
  const f = $('#fade'); f.hidden = false; requestAnimationFrame(() => f.classList.add('on'));
  setTimeout(() => {
    rig.rotation.z = 0; rig.position.y = 0;
    player.position.set(0, 0.5, 18); feet = 0.5; vy = 0; player.rotation.y = Math.PI;
    camPos.set(0, 22, 31);
    const wasNight = night; // si era de noche, al despertar ya amaneció
    if (wasNight) { cycleT = CYCLE * 0.02; setNight(false, true); applySky(0.02); }
    f.classList.remove('on'); setTimeout(() => { f.hidden = true; sleeping = false; }, 900);
    toast('☀', 'AMANECIÓ', '¡Volviste al inicio!', wasNight ? 'Dormiste toda la noche: ya es de día y los monstruos se fueron.' : 'Dormiste en el castillo y despertaste en la entrada de la arena.');
  }, 2200);
}
