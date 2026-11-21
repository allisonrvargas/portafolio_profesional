'use strict';
// Arranque: restaura el progreso y empieza el bucle.

buildCharacter(0);
const restored = restoreProgress();

(async () => {
  const pct = $('#loadPct');
  pct.textContent = '40%';
  try { await Promise.race([document.fonts.load('64px "Bubblegum Sans"'), new Promise(r => setTimeout(r, 2500))]); } catch (e) { }
  // redibujar etiquetas con la fuente ya cargada
  lugares.forEach(L => { const s = label(L.l, L.c); L.sprite.material.map = s.material.map; L.sprite.material.needsUpdate = true; });
  ores.forEach(o => { const s = label(habilidades[o.i].n, habilidades[o.i].c); o.tag.material.map = s.material.map; });
  pct.textContent = '100%';
  renderer.compile(scene, camera);
  loop();
  setTimeout(() => $('#loader').classList.add('done'), 250);
  setTimeout(() => $('#loader').hidden = true, 800);
})();

// acceso para depurar desde la consola del navegador
window.arena = { npc, guide, setCycle: v => { cycleT = v; }, jumpToNight, cycle: () => cycleT, progress: () => progress, talkNpc, openQuick, animals, lasso, setNight, spawnMonster, monsters, hits: (x, y, z) => hits(x, y, z), cell: (i, j, k) => blocks.get(`${i},${j},${k}`), sleep, tl: () => tlShown, buildCharacter, setMined: n => { minedCount = n; buildTool(); }, player, lugares, ores, openPlace, travel, mine, state: () => ({ feet, onGround, vy }), setFeet: v => { feet = v; } };
