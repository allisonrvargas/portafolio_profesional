'use strict';
// Progreso guardado, niveles y experiencia.

/* ---------------- PROGRESO GUARDADO ---------------- */
let progress = (() => { try { return JSON.parse(localStorage.getItem('arenaSave') || '{}'); } catch (e) { return {}; } })();
let playTime = progress.time || 0;
/* ---------------- NIVELES Y EXPERIENCIA ---------------- */
const niveles = [
  { xp: 0, n: 'Novata' }, { xp: 80, n: 'Aprendiz' }, { xp: 200, n: 'Exploradora' }, { xp: 360, n: 'Constructora' }, { xp: 560, n: 'Minera' },
  { xp: 800, n: 'Granjera' }, { xp: 1080, n: 'Arquera' }, { xp: 1400, n: 'Hechicera' }, { xp: 1720, n: 'Campeona' }, { xp: 2000, n: 'Leyenda de la arena' }
];
const xpKeys = new Set(progress.xpKeys || []); let xp = 0; var xpReady = true;
const xpValue = k => k.startsWith('obra:') ? 20 : k.startsWith('ore:') ? 40 : k.startsWith('pen:') ? 50 : k.startsWith('visit:') ? 100 : k.startsWith('hito:') ? 30 : ({ cofre: 50, pet: 60, cave: 80, caveChest: 80, axo: 40, axoBlue: 60, sleep: 30, petName: 20 })[k] || 0;
const levelOf = v => { let l = 0; while (l < niveles.length - 1 && v >= niveles[l + 1].xp) l++; return l; };
function renderLevel() {
  const l = levelOf(xp), cur = niveles[l], next = niveles[l + 1];
  $('#lvlNum').textContent = l + 1;
  $('#lvlName').textContent = `Nivel ${l + 1} · ${cur.n}`;
  $('#xpText').textContent = next ? `${xp - cur.xp}/${next.xp - cur.xp} XP` : 'Nivel máximo';
  $('#xpFill').style.width = (next ? (xp - cur.xp) / (next.xp - cur.xp) * 100 : 100) + '%';
}
function award(key, amount, why, silent) {
  if (xpKeys.has(key)) return; xpKeys.add(key);
  const before = levelOf(xp); xp += amount; renderLevel();
  if (silent) return;
  const pop = document.createElement('div'); pop.className = 'xp-pop'; pop.textContent = `+${amount} XP · ${why}`; $('#xpPops').appendChild(pop); setTimeout(() => pop.remove(), 1900);
  const chip = $('.player-chip'); chip.classList.remove('xp-glow'); void chip.offsetWidth; chip.classList.add('xp-glow');
  const after = levelOf(xp);
  if (after > before) setTimeout(() => {
    sfx('win'); if (typeof confetti === 'function' && after === niveles.length - 1) confetti();
    const b = $('#lvlUp'); b.querySelector('b').textContent = after + 1; b.querySelector('span').textContent = niveles[after].n;
    b.hidden = false; b.classList.remove('show'); void b.offsetWidth; b.classList.add('show'); setTimeout(() => b.hidden = true, 2600);
    renderQuests();
  }, 500);
  saveProgress();
}
function saveProgress() {
  progress.xpKeys = [...xpKeys];
  progress.mined = ores.filter(o => o.mined).map(o => o.i);
  progress.penned = animals.filter(a => a.state === 'corral' || a.state === 'mascota' || a.state === 'casa').map(a => a.id);
  progress.pet = pet ? pet.id : null; progress.char = charIndex; progress.visited = [...visited]; progress.tl = tlShown; progress.time = Math.round(playTime);
  try { localStorage.setItem('arenaSave', JSON.stringify(progress)); } catch (e) { }
}
function restoreProgress() {
  let any = false;
  (progress.mined || []).forEach(i => { const o = ores[i]; if (!o || o.mined) return; o.mined = true; scene.remove(o.m); scene.remove(o.tag); oreCells.delete(`${o.x},1,${o.z}`); const k = hitMeshes.indexOf(o.m); if (k > -1) hitMeshes.splice(k, 1);
    const h = habilidades[i], slot = document.querySelectorAll('.slot')[i]; slot.classList.add('got'); slot.textContent = h.a.length > 4 ? h.a.slice(0, 4) : h.a; minedCount++; any = true; });
  $('#invCount').textContent = minedCount;
  (progress.penned || []).forEach(id => { const a = animals.find(x => x.id === id); if (!a) return; a.state = 'corral'; a.g.position.set(-2.5 + a.i, 0.5, -5); a.y = 0.5; penned++; any = true; });
  if (progress.pet) { const a = animals.find(x => x.id === progress.pet); if (a) { pet = a; if (progress.petHome) { a.state = 'casa'; a.g.position.set(6, 0.5, -4.4); a.y = 0.5; } else { a.state = 'mascota'; a.g.position.set(1, 0.5, 18); } } }
  renderHouseSign(); renderPetTag();
  (progress.visited || []).forEach(v => visited.add(v));
  for (let k = 0; k < (progress.tl || 0); k++) { const h = hitos[k]; h.done = true; h.sprite.material.opacity = 1; const li = document.createElement('li'); if (h.now) li.className = 'now'; li.innerHTML = '<small></small><b></b><p></p>'; li.querySelector('small').textContent = h.f; li.querySelector('b').textContent = h.t; li.querySelector('p').textContent = h.d; $('#tlList').appendChild(li); tlShown++; }
  $('#tlCount').textContent = tlShown;
  if (typeof progress.char === 'number') buildCharacter(progress.char); else buildTool();
  [...xpKeys].forEach(k => { xpKeys.delete(k); award(k, xpValue(k), '', true); });
  ores.forEach(o => o.mined && award(`ore:${o.i}`, 40, '', true));
  animals.forEach(a => (a.state === 'corral' || a.state === 'mascota' || a.state === 'casa') && award(`pen:${a.id}`, 50, '', true));
  if (pet) award('pet', 60, '', true);
  visited.forEach(v => award(`visit:${v}`, 100, '', true));
  hitos.forEach((h, k) => h.done && award(`hito:${k}`, 30, '', true));
  renderLevel(); renderQuests();
  return any;
}
$('#resetSave').addEventListener('click', () => { try { localStorage.removeItem('arenaSave'); localStorage.removeItem('arenaTut'); } catch (e) { } location.reload(); });
