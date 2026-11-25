'use strict';
// Pantalla final y resumen rápido.

/* ---------------- FINAL ---------------- */
function checkComplete() {
  if (progress.final || minedCount < habilidades.length || penned < animals.length || tlShown < hitos.length) return;
  progress.final = true; saveProgress();
  setTimeout(() => {
    sfx('win'); confetti(); setTimeout(confetti, 900);
    const mins = Math.max(1, Math.round(playTime / 60));
    showPanel(`<p class="p-kicker">¡FELICIDADES!</p><h2 id="panelTitle">¡Completaste la arena!</h2>
      <p class="lead">Recorriste todo mi mundo. Gracias por jugar y por conocer mi trabajo de esta forma.</p>
      <div class="stats-final">
        <div><b>${minedCount}/${habilidades.length}</b><span>habilidades</span></div>
        <div><b>${penned}/${animals.length}</b><span>animales</span></div>
        <div><b>${tlShown}/${hitos.length}</b><span>historia</span></div>
        <div><b>${mins} min</b><span>jugando</span></div>
      </div>
      <p>Jugaste como <strong>${personajes[charIndex].n}</strong>${pet ? ` con tu mascota <strong>${pet.n}</strong>` : ''}. Si quieres formar equipo para la siguiente misión, aquí me encuentras:</p>
      <div class="contact"><a class="btn big" href="${CV}" target="_blank" rel="noopener">Ver mi CV <small>PDF</small></a>
      <a class="btn" href="mailto:av503640@gmail.com">Correo <small>av503640@gmail.com</small></a>
      <a class="btn" href="https://www.linkedin.com/in/allis-vargas-181519335" target="_blank" rel="noopener">LinkedIn <small>/in/allis-vargas-181519335</small></a>
      <a class="btn" href="https://github.com/allisonrvargas" target="_blank" rel="noopener">GitHub <small>@allisonrvargas</small></a></div>`);
  }, 1500);
}

/* ---------------- RESUMEN RÁPIDO ---------------- */
function openQuick() {
  closeMenu(); sfx('open');
  showPanel(`<p class="p-kicker">VER TODO RÁPIDO</p><h2 id="panelTitle">Allison Vargas</h2>
    <div class="grid2"><div><div class="photo"><img src="img/allison.jpg" alt="Fotografía de Allison Vargas"></div>
    <ul class="facts"><li><span>Formación</span>Campuslands GT</li><li><span>Estudios</span>Ing. en Ciencias y Sistemas</li><li><span>Idiomas</span>Español · Inglés B1</li></ul></div><div>
    <p class="lead">Desarrolladora de software en formación. Construyo APIs con Node.js y Express, bases de datos SQL y NoSQL, interfaces web y apps móviles con React Native.</p>
    <h3>Proyectos</h3>
    <ul class="quick-list">${proyectos.map(p => `<li><b>${p.t}</b><span>${p.tags.join(' · ')}</span>${p.link ? `<a href="${p.link}" target="_blank" rel="noopener">Código ↗</a>` : `<em>${p.nota}</em>`}</li>`).join('')}</ul>
    <h3>Habilidades</h3>
    <div class="tags">${habilidades.map(h => `<i>${h.n}</i>`).join('')}</div>
    <h3>Contacto</h3>
    <div class="contact"><a class="btn big" href="${CV}" target="_blank" rel="noopener">Ver mi CV <small>PDF</small></a>
    <a class="btn" href="mailto:av503640@gmail.com">Correo <small>av503640@gmail.com</small></a>
    <a class="btn" href="https://www.linkedin.com/in/allis-vargas-181519335" target="_blank" rel="noopener">LinkedIn</a>
    <a class="btn" href="https://github.com/allisonrvargas" target="_blank" rel="noopener">GitHub</a>
    <a class="btn" href="clasico.html">Modo clásico</a></div>
    </div></div>`);
}
$('#quickBtn').addEventListener('click', openQuick);
$('#quickIntro').addEventListener('click', e => { e.preventDefault(); openQuick(); });
