'use strict';
// Barra de inventario, misiones, menú y volumen.

/* ---------------- HUD ---------------- */
const hotbar = $('#hotbar');
habilidades.forEach((h, i) => {
  const b = document.createElement('button'); b.type = 'button'; b.className = 'slot'; b.style.setProperty('--c', h.c); b.textContent = '?';
  b.setAttribute('aria-label', 'Habilidad sin descubrir');
  b.addEventListener('click', () => { if (ores[i].mined) toast(h.a.slice(0, 3), 'INVENTARIO', h.n, 'Usada en: ' + h.u, h.c); else { const o = ores[i]; planTo(o.x, o.z + 1.2, () => mine(o)); toast('⛏', 'CAMINO AL BLOQUE', 'Vamos a buscarla', 'Te llevo hasta el bloque brillante.'); } });
  hotbar.appendChild(b);
});
$('#invTotal').textContent = habilidades.length;
function renderQuests() {
  const ul = $('#questList'); ul.innerHTML = '';
  lugares.filter(L => L.q).forEach(L => { const li = document.createElement('li'); li.textContent = L.q; if (visited.has(L.id)) li.className = 'done'; li.addEventListener('click', () => travel(L)); ul.appendChild(li); });
  const lf = document.createElement('li'); lf.textContent = `Lleva los animales al corral (${typeof penned === 'number' ? penned : 0}/6)`; if (typeof penned === 'number' && penned === 6) lf.className = 'done'; ul.appendChild(lf);
  const li = document.createElement('li'); li.textContent = `Pica las habilidades (${minedCount}/${habilidades.length})`; if (minedCount === habilidades.length) li.className = 'done'; ul.appendChild(li);
  if (typeof xpReady !== 'undefined' && xpReady) { const lv = levelOf(xp) + 1, ll = document.createElement('li'); ll.textContent = `Llega al nivel 10 (${lv}/10)`; if (lv === 10) ll.className = 'done'; ul.appendChild(ll); }
}
renderQuests();
const travelList = $('#travelList');
lugares.forEach(L => { const b = document.createElement('button'); b.innerHTML = `<i style="background:${L.c}"></i>`; b.append(L.n); b.addEventListener('click', () => travel(L)); travelList.appendChild(b); });
const menu = $('#menu'), menuBtn = $('#menuBtn');
function closeMenu() { menu.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); }
menuBtn.addEventListener('click', () => { menu.hidden = !menu.hidden; menuBtn.setAttribute('aria-expanded', String(!menu.hidden)); sfx('blip'); });
$('#soundBtn').addEventListener('click', () => setMusic(!soundOn));
const volEl = $('#volume');
function setVolume(v) {
  volume = Math.max(0, Math.min(1, v)); volEl.value = Math.round(volume * 100);
  volEl.style.setProperty('--p', volume * 100 + '%'); $('#volIcon').textContent = volume === 0 ? '🔇' : volume < 0.4 ? '🔈' : '🔊';
  if (master) master.gain.setTargetAtTime(0.22 * volume, actx.currentTime, 0.03);
  try { localStorage.setItem('arenaVol', String(volume)); } catch (e) { }
}
volEl.addEventListener('input', () => setVolume(volEl.value / 100));
let lastVol = volume || 0.6;
$('#volIcon').addEventListener('click', () => { if (volume > 0) { lastVol = volume; setVolume(0); } else setVolume(lastVol || 0.6); });
setVolume(volume);
$('#nightBtn').addEventListener('click', () => jumpToNight(!night));
$('#promptBtn').addEventListener('click', interact);
$('#jumpBtn').addEventListener('pointerdown', e => { e.preventDefault(); jumpReq = 0.18; });
