'use strict';
// Línea de tiempo que aparece al subir las gradas del castillo.

/* ---------------- INTERACCIÓN ---------------- */
let near = null;
/* ---------------- LÍNEA DE TIEMPO EN EL CASTILLO ---------------- */
const hitos = [
  { pos: [0, -19], minY: 1.4 },
  { pos: [3.5, -19], minY: 2.4 },
  { pos: [3.5, -21], minY: 4.4 },
  { pos: [3.5, -23], minY: 5.4 },
  { pos: [1, -23], minY: 7.4 },
  { pos: [0, -21], minY: 10.4 }
].map((h, i) => ({ ...h, ...historia[i], i, done: false }));
hitos.forEach((h, i) => {
  const s = label(h.f.split(' · ')[0], i === 5 ? '#d97706' : '#db2777'); s.scale.set(3.2, 0.8, 1);
  s.position.set(h.pos[0], h.minY + 2.4, h.pos[1]); s.material.transparent = true; s.material.opacity = 0.35; scene.add(s); h.sprite = s;
});
let tlShown = 0;
function checkHitos() {
  const p = player.position;
  for (const h of hitos) {
    if (h.done || h.i !== tlShown) continue;
    if (Math.hypot(p.x - h.pos[0], p.z - h.pos[1]) < 1.6 && feet >= h.minY - 0.2) {
      h.done = true; tlShown++; h.sprite.material.opacity = 1; award(`hito:${h.i}`, 30, 'Línea de tiempo'); sfx(h.i === 5 ? 'win' : 'pop');
      const box = $('#tlHud'); box.hidden = false;
      const li = document.createElement('li'); if (h.now) li.className = 'now';
      li.innerHTML = '<small></small><b></b><p></p>'; li.querySelector('small').textContent = h.f; li.querySelector('b').textContent = h.t; li.querySelector('p').textContent = h.d;
      $('#tlList').appendChild(li); $('#tlCount').textContent = tlShown; saveProgress(); checkComplete();
      if (h.i === 5) { confetti(); toast('♛', 'LLEGASTE A LA CIMA', 'Bloque a bloque', 'Recorriste toda mi historia. Baja al patio: ahí está la cama para descansar.', '#d97706'); }
    }
  }
}
$('#tlClose').addEventListener('click', () => $('#tlHud').hidden = true);
