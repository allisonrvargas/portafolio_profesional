'use strict';
// Vidas: 5 corazones. La lava, los monstruos de la noche y las caídas muy altas te quitan uno.
// Al perder los 5 sale "Fin del juego" y todo se reinicia desde cero.

const MAX_VIDAS = 5;
let vidas = Math.max(1, Math.min(MAX_VIDAS, progress.vidas ?? MAX_VIDAS));
let invulnerable = 0, muriendo = false;

function renderVidas(perdida) {
  const box = $('#hearts'); box.innerHTML = '';
  for (let i = 0; i < MAX_VIDAS; i++) {
    const h = document.createElement('i');
    h.className = 'heart' + (i < vidas ? '' : ' empty') + (i === perdida ? ' lost' : '');
    box.appendChild(h);
  }
  box.setAttribute('aria-label', `Vidas: ${vidas} de ${MAX_VIDAS}`);
}

// razon: 'lava' o el tipo de monstruo ('esqueleto', 'arana', 'petardin')
function perderVida(razon) {
  if (muriendo || invulnerable > 0 || sleeping || !started) return;
  leaveKart(true);
  muriendo = true; vidas--; progress.vidas = vidas; saveProgress();
  renderVidas(vidas);
  target = null; waypoints = []; mining = null; crack.visible = false; vy = 0;
  sfx('hurt'); const f = $('#hurt'); f.classList.remove('on'); void f.offsetWidth; f.classList.add('on');
  rig.rotation.z = Math.PI / 2; rig.position.y = 0.25;             // cae al suelo
  const quien = razon === 'lava' ? 'Caíste en la lava' : razon === 'caida' ? 'Caíste desde muy alto' : `Te atrapó ${razon === 'arana' ? 'una araña' : razon === 'petardin' ? 'un Petardín' : 'un esqueleto'}`;
  const d = $('#death');
  d.querySelector('h2').textContent = vidas > 0 ? '¡Perdiste una vida!' : 'Fin del juego';
  d.querySelector('p').textContent = vidas > 0 ? `${quien}. Te quedan ${vidas} ${vidas === 1 ? 'corazón' : 'corazones'}.` : `${quien} y se acabaron tus 5 corazones. La arena empieza de nuevo.`;
  d.querySelector('button').hidden = vidas > 0;
  d.classList.toggle('over', vidas === 0);
  d.hidden = false; requestAnimationFrame(() => d.classList.add('on'));
  if (vidas === 0) { sfx('boom'); return; }                        // espera a que pulse "Empezar de nuevo"
  setTimeout(() => {
    rig.rotation.z = 0; rig.position.y = 0;
    player.position.set(0, 0.5, 18); feet = 0.5; vy = 0; player.rotation.y = Math.PI; camPos.set(0, 22, 31);
    if (swimming) { swimming = false; PH = 1.7; rig.rotation.x = 0; }
    clearMonsters(false);
    d.classList.remove('on'); setTimeout(() => { d.hidden = true; muriendo = false; invulnerable = 2.5; }, 600);
  }, 1800);
}
// caída: más de 4 bloques sin agua abajo te quita una vida (como en Minecraft)
function checkFall(drop, landY) {
  if (drop < 4.2) return;
  const p = player.position, enAgua = blocks.get(`${Math.round(p.x)},${Math.round(landY + 0.2)},${Math.round(p.z)}`) === 'agua' || inRiverChannel(p.x, landY, p.z);
  if (!enAgua) perderVida('caida');
}
function reiniciarTodo() {
  try { localStorage.removeItem('arenaSave'); localStorage.removeItem('arenaTut'); } catch (e) { }
  location.reload();
}
$('#deathRestart').addEventListener('click', reiniciarTodo);
// parpadeo mientras eres invulnerable al reaparecer
function updateVidas(dt, t) {
  if (invulnerable > 0) { invulnerable -= dt; player.visible = invulnerable <= 0 || Math.floor(t * 12) % 2 === 0; }
  else if (!player.visible && !muriendo) player.visible = true;
}
renderVidas();
