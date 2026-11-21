'use strict';
// Paneles con el contenido de cada lugar.

/* ---------------- PANELES ---------------- */
let panelOpen = false;
const panelBg = $('#panelBg'), panelBody = $('#panelBody');
function showPanel(html, after) {
  panelBody.innerHTML = html; panelBg.hidden = false; panelOpen = true; target = null; waypoints = [];
  $('#panelClose').focus(); if (after) after();
}
function closePanel() { panelBg.hidden = true; panelOpen = false; panelBody.innerHTML = '';
  if (typeof farmQueue !== 'undefined' && farmQueue.length) { const [a, c] = farmQueue.shift(); setTimeout(() => showFarmCard(a, c), 250); } canvas.focus?.(); }
$('#panelClose').addEventListener('click', closePanel);
panelBg.addEventListener('click', e => { if (e.target === panelBg) closePanel(); });

function panelCasa() {
  showPanel(`
  <p class="p-kicker">LA CASA · NIVEL 01</p><h2 id="panelTitle">Sobre mí</h2>
  <div class="grid2">
    <div><div class="photo"><img src="img/allison.jpg" alt="Fotografía de Allison Vargas"></div>
      <ul class="facts"><li><span>Nombre</span>Allison Rocío Vargas Mejía</li><li><span>Clase</span>Desarrolladora en formación</li><li><span>Gremio</span>Campuslands GT</li><li><span>Base</span>Guatemala</li><li><span>Idiomas</span>Español · Inglés B1</li></ul>
    </div>
    <div>
      <p class="lead">Estudio <strong>Ingeniería en Ciencias y Sistemas</strong> y me formo como técnico en desarrollo de software en <strong>Campuslands</strong>. Me gusta el desarrollo de punta a punta: desde diseñar una base de datos hasta construir interfaces web y móviles.</p>
      <p>Soy sociable, empática y alegre. Conecto rápido con las personas y eso me ayuda a integrarme en cualquier equipo. En el código aplico lo mismo que en mis juegos favoritos: lógica, estrategia y paciencia para construir pieza por pieza.</p>
      <h3>Bloque a bloque</h3>
      <ul class="tl">${historia.map(h => `<li class="${h.now ? 'now' : ''}"><small>${h.f}</small><b>${h.t}</b><p>${h.d}</p></li>`).join('')}</ul>
      <h3>Lo que me gusta</h3>
      <div class="likes">
        <div class="like"><b>Juegos de estrategia</b><p>Como Clash Royale: armar un buen mazo, leer al rival y decidir en segundos.</p></div>
        <div class="like"><b>Juegos de construcción</b><p>Como Minecraft: planear, recolectar y crear mundos desde cero. Por eso este portafolio es una arena de bloques.</p></div>
        <div class="like"><b>Música</b><p>Es una de mis grandes pasiones y mi compañía para concentrarme e inspirarme. Visita el escenario para escuchar mi radio.</p></div>
        <div class="like"><b>Mi inventario</b><p>Llevas <strong>${minedCount} de ${habilidades.length}</strong> habilidades. Pica los bloques brillantes de la arena para descubrirlas todas.</p></div>
      </div>
    </div>
  </div>`);
}
function panelProyectos() {
  const cards = proyectos.map((p, i) => `<button class="card" data-i="${i}" data-cat="${p.cat.join(' ')}">${pixelArt(p.t)}<div><b>${p.t}</b><span>${p.cat.map(c => catName[c].toUpperCase()).join(' · ')}</span></div></button>`).join('');
  showPanel(`<p class="p-kicker">TORRE DE PROYECTOS · NIVEL 02</p><h2 id="panelTitle">Proyectos</h2>
    <p class="lead">Todo lo que he construido, bloque por bloque. Filtra por área y toca un proyecto para ver los detalles.</p>
    <div class="chips"><button class="chip on" data-f="todos">Todos</button>${Object.entries(catName).map(([k, v]) => `<button class="chip" data-f="${k}">${v}</button>`).join('')}</div>
    <div class="cards" id="cards">${cards}</div>`, () => {
    panelBody.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => {
      panelBody.querySelectorAll('.chip').forEach(x => x.classList.remove('on')); c.classList.add('on'); sfx('blip');
      panelBody.querySelectorAll('.card').forEach(k => k.classList.toggle('hide', c.dataset.f !== 'todos' && !k.dataset.cat.split(' ').includes(c.dataset.f)));
    }));
    panelBody.querySelectorAll('.card').forEach(k => k.addEventListener('click', () => detalle(+k.dataset.i)));
  });
}
function detalle(i) {
  const p = proyectos[i]; sfx('open');
  showPanel(`<button class="back" id="back">← Volver a proyectos</button>
    <div class="detail"><div>${pixelArt(p.t, 24, 16)}</div><div>
      <p class="p-kicker">${p.cat.map(c => catName[c].toUpperCase()).join(' · ')}</p><h2 id="panelTitle">${p.t}</h2>
      <p>${p.d}</p><div class="tags">${p.tags.map(t => `<i>${t}</i>`).join('')}</div>
      ${p.link ? `<a class="btn big" href="${p.link}" target="_blank" rel="noopener">Ver código <small>en GitHub</small></a>` : `<p><strong>${p.nota}</strong></p>`}
    </div></div>`, () => $('#back').addEventListener('click', panelProyectos));
}
function panelApps() {
  showPanel(`<p class="p-kicker">TORRE ARCADE · NIVEL 03</p><h2 id="panelTitle">Aplicaciones</h2>
    <p class="lead">Inserta un cartucho y prueba mis aplicaciones publicadas. Son las páginas reales, funcionando aquí mismo.</p>
    <div class="arcade"><div class="carts">${aplicaciones.map((a, i) => `<button class="cart" data-i="${i}">${a.n}</button>`).join('')}</div>
    <div class="screen"><div class="screen-bar" id="appUrl"></div><div class="screen-frame" id="appFrameBox"></div>
    <div class="screen-info"><div><b id="appName"></b><p id="appDesc"></p></div><div class="row"><a class="btn" id="appOpen" target="_blank" rel="noopener">Abrir <small>pestaña nueva</small></a><a class="btn" id="appCode" target="_blank" rel="noopener">Código <small>GitHub</small></a></div></div></div></div>`, () => {
    const show = i => {
      const a = aplicaciones[i]; panelBody.querySelectorAll('.cart').forEach((c, k) => c.classList.toggle('on', k === i));
      $('#appUrl').textContent = a.url.replace('https://', ''); $('#appName').textContent = a.n; $('#appDesc').textContent = a.d; $('#appOpen').href = a.url; $('#appCode').href = a.code;
      const box = $('#appFrameBox');
      box.innerHTML = a.embed === false
        ? `<div class="screen-ph"><b>Esta app se juega en su propia ventana</b><p>Usa un menú con ventanas emergentes que no funciona dentro de otra página.</p><a class="btn big" href="${a.url}" target="_blank" rel="noopener">Jugar <small>en otra pestaña</small></a></div>`
        : `<iframe src="${a.url}" title="Aplicación ${a.n}" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms allow-popups"></iframe>`;
    };
    panelBody.querySelectorAll('.cart').forEach(c => c.addEventListener('click', () => { show(+c.dataset.i); sfx('blip'); }));
    show(0);
  });
}
let eqRAF = 0;
function panelMusica() {
  showPanel(`<p class="p-kicker">EL ESCENARIO</p><h2 id="panelTitle">Radio Allison</h2>
    <div class="radio"><div><p class="lead">La música es una de mis grandes pasiones y mi compañía para concentrarme e inspirarme cada día. Elige una pista y sigue explorando la arena con banda sonora.</p>
    <ol class="tracks">${pistas.map((p, i) => `<li><button data-i="${i}" class="${playing && i === track ? 'on' : ''}">${p.name}</button></li>`).join('')}</ol>
    <p style="font-size:13px;margin-top:10px">Pistas chiptune originales, generadas en el navegador.</p></div>
    <div><div class="eq" id="eq">${'<i></i>'.repeat(16)}</div><div class="row" style="margin-top:16px"><button class="btn big" id="playPause">${playing ? '❚❚ Pausar' : '▶ Reproducir'}</button></div></div></div>`, () => {
    panelBody.querySelectorAll('.tracks button').forEach(b => b.addEventListener('click', () => { track = +b.dataset.i; setMusic(true); $('#playPause').textContent = '❚❚ Pausar'; }));
    $('#playPause').addEventListener('click', () => { setMusic(!playing); $('#playPause').textContent = playing ? '❚❚ Pausar' : '▶ Reproducir'; });
    const bars = panelBody.querySelectorAll('#eq i'), data = new Uint8Array(32);
    cancelAnimationFrame(eqRAF);
    (function loop() { if (!panelOpen) return; if (analyser && playing) { analyser.getByteFrequencyData(data); bars.forEach((b, i) => b.style.height = Math.max(6, data[i + 1] / 255 * 70) + 'px'); } else bars.forEach(b => b.style.height = '6px'); eqRAF = requestAnimationFrame(loop); })();
  });
}
function panelCastillo() {
  showPanel(`<p class="p-kicker">EL CASTILLO · CONTACTO</p><h2 id="panelTitle">¿Formamos equipo?</h2>
    <p class="lead">Gracias por recorrer mi arena. Si quieres formar equipo para la siguiente misión, aquí me encuentras.</p>
    <div class="contact">
      <a class="btn big" href="${CV}" target="_blank" rel="noopener">Ver mi CV <small>PDF</small></a>
      <a class="btn" href="mailto:av503640@gmail.com">Correo <small>av503640@gmail.com</small></a>
      <a class="btn" href="https://www.linkedin.com/in/allisonrvargas" target="_blank" rel="noopener">LinkedIn <small>/in/allisonrvargas</small></a>
      <a class="btn" href="https://github.com/allisonrvargas" target="_blank" rel="noopener">GitHub <small>@allisonrvargas</small></a>
    </div>
    <p style="margin-top:22px">También puedes abrir el <strong>cofre</strong> que está junto al castillo.</p>`);
}
function panelCofre() {
  award('cofre', 50, 'Abriste mi CV');
  lidOpen = true;
  showPanel(`<p class="p-kicker">¡ABRISTE EL COFRE!</p><h2 id="panelTitle">Mi CV</h2>
    <p class="lead">Adentro estaba mi currículum, con mi formación, experiencia, proyectos y habilidades.</p>
    <div class="contact"><a class="btn big" href="${CV}" target="_blank" rel="noopener">Abrir CV <small>PDF</small></a><a class="btn" href="${CV}" download>Descargar <small>PDF</small></a></div>`);
}
let lidOpen = false;
function panelCueva() {
  award('caveChest', 80, 'Cofre secreto');
  caveLid.rotation.x = -1.1; caveLid.position.z = -0.25; caveLid.position.y = 0.85;
  showPanel(`<p class="p-kicker">¡ENCONTRASTE EL COFRE SECRETO!</p><h2 id="panelTitle">Mi rincón gamer</h2>
    <p class="lead">Esta arena nació de lo que más me gusta: los videojuegos y la música.</p>
    <ul class="cave-list">
      <li><b>Minecraft:</b> construir mundos bloque por bloque, como este portafolio y esta cueva.</li>
      <li><b>Clash Royale:</b> estrategia, torres y cartas. De ahí salieron el castillo, las princesas y las cartas de personajes.</li>
      <li><b>Música:</b> también es parte de mí; por eso hay un escenario en la arena.</li>
    </ul>
    <p>Gracias por explorar hasta aquí abajo. ¡Pocos llegan!</p>`);
}
