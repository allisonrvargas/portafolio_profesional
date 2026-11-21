'use strict';
// Tutorial de 4 pasos.

/* ---------------- TUTORIAL ---------------- */
const tutSteps = [
  { t: 'Camina', d: 'Usa W A S D o las flechas, o toca el suelo para ir ahí.', done: () => Math.hypot(player.position.x - tutFrom[0], player.position.z - tutFrom[1]) > 3 },
  { t: 'Habla con la guía', d: 'Acércate a la guía junto a la entrada y pulsa E (o tócala).', done: () => !!progress.npc },
  { t: 'Pica un bloque brillante', d: 'Acércate a un bloque de color y pulsa E. Es una de mis habilidades.', done: () => minedCount > 0 },
  { t: 'Entra a un edificio', d: 'Camina hasta una puerta y pulsa E. Cada edificio es una sección.', done: () => visited.size > 0 }
];
let tutStep = -1, tutFrom = [0, 18], tutDone = (() => { try { return localStorage.getItem('arenaTut') === '1'; } catch (e) { return false; } })();
function startTutorial() { if (tutDone) return; tutStep = 0; tutFrom = [player.position.x, player.position.z]; showTut(); $('#tut').hidden = false; }
function showTut() { const s = tutSteps[tutStep]; $('#tutStep').textContent = `PASO ${tutStep + 1} DE ${tutSteps.length}`; $('#tutTitle').textContent = s.t; $('#tutText').textContent = s.d; }
function endTutorial(msg) { tutStep = -1; tutDone = true; $('#tut').hidden = true; try { localStorage.setItem('arenaTut', '1'); } catch (e) { } if (msg) toast('★', 'TUTORIAL COMPLETO', '¡Ya sabes jugar!', 'Explora libremente. El botón "Resumen" abre todo mi portafolio sin jugar.', '#16a34a'); }
$('#tutSkip').addEventListener('click', () => endTutorial(false));
function updateTutorial() {
  if (tutStep < 0 || panelOpen || selecting) return;
  if (tutSteps[tutStep].done()) { sfx('pop'); tutStep++; if (tutStep >= tutSteps.length) endTutorial(true); else showTut(); }
}
