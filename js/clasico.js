/* ============ DATOS ============ */
const GH = 'https://github.com/allisonrvargas/';

const proyectos = [
  { t: 'Kid-Fit', cat: ['movil'], d: 'App móvil que cuenta los ejercicios de niños con la cámara del teléfono y registra su hidratación, con 15 niveles. Trabajé en el motor de movimiento: lógica de ángulos con MediaPipe Pose, validación de la caída del salto y pruebas de 10 a 30 FPS.', tags: ['React Native', 'TypeScript', 'MediaPipe', 'Firebase'], link: GH + 'Kid_Fit_allison-vargas' },
  { t: 'Gym Manager CLI', cat: ['backend', 'datos'], d: 'Aplicación de consola para un gimnasio: clientes, planes, contratos, seguimiento, nutrición y finanzas. Transacciones en MongoDB con rollback, consultas de agregación, SOLID y patrones de diseño.', tags: ['Node.js', 'MongoDB', 'Docker', 'Scrum'], link: GH + 'gym_manager' },
  { t: 'MarisolliFlix', cat: ['backend', 'frontend'], d: 'Plataforma para reseñar películas, series y animes con un ranking ponderado, likes y dislikes, panel de administración y API documentada en Swagger.', tags: ['Express', 'MySQL', 'JWT', 'Swagger'], nota: 'Proyecto en equipo' },
  { t: 'Librarian', cat: ['backend', 'frontend'], d: 'Sistema de biblioteca con préstamos, ventas, clientes e inventario. Roles de administrador y usuario, tres límites de peticiones y 26 pruebas automatizadas.', tags: ['Express 5', 'Rate limit', 'Vite', 'node:test'], link: GH + 'review_express_backend' },
  { t: 'API de postulaciones', cat: ['backend', 'datos'], d: 'API REST que calcula el puntaje y la prioridad de cada candidato a una vacante. Reglas de negocio, filtros, control de estados y 123 pruebas.', tags: ['Express', 'MySQL', 'Jest', 'Docker'], link: GH + 'evaluacion-allison_rocio_vargas_mejia' },
  { t: 'Gremio de Cazadores', cat: ['backend'], d: 'API REST modular y segura con autenticación por JWT y Passport.js, organizada en una arquitectura limpia por capas.', tags: ['Node.js', 'Express', 'Passport', 'JWT'], link: GH + 'jwt_and_passport' },
  { t: 'Campus Parking', cat: ['frontend'], d: 'Aplicación de una sola página para administrar un estacionamiento: inicio de sesión, mapa de espacios, servicios de parqueo, reportes y almacenamiento local.', tags: ['HTML', 'CSS', 'JavaScript', 'localStorage'], link: GH + 'Campus-Parking' },
  { t: 'CampusShop', cat: ['frontend'], d: 'Tienda en línea mobile-first con catálogo, carrito, checkout, perfil e historial, maquetada solo con HTML y CSS, sin JavaScript.', tags: ['HTML5', 'CSS3', 'Mobile-first'], link: GH + 'Campushop' },
  { t: 'Gaseosas del Valle', cat: ['datos'], d: 'Diseño e implementación de una base de datos relacional en MySQL con triggers, funciones, procedimientos almacenados y vistas optimizadas.', tags: ['MySQL', 'Triggers', 'Procedimientos'], nota: 'Base de datos' },
  { t: 'TechZone', cat: ['datos'], d: 'Sistema de inventario y ventas en PostgreSQL: modelo entidad-relación, procedimientos que descuentan existencias y consultas de reportes.', tags: ['PostgreSQL', 'PL/pgSQL'], link: GH + 'gesti-n_de_Inventario_examen' },
  { t: 'Veterinaria SQL', cat: ['datos'], d: 'Base de datos de una veterinaria en PostgreSQL: CRUD, consultas, funciones de ventana, CTE, vistas y procedimientos almacenados.', tags: ['PostgreSQL', 'SQL'], link: GH + 'review_postgresql' },
  { t: 'Adapter y reportes', cat: ['backend', 'datos'], d: 'Patrón de diseño Adapter con cajas de cambios mecánica y automática, y reportes HTML de estudiantes, profesores y horarios generados desde MySQL.', tags: ['Node.js', 'mysql2', 'Patrones'], link: GH + 'review_node.js' },
  { t: 'TutorBot', cat: ['ia'], d: 'Automatización de flujos con n8n: un bot de Telegram que integra sus datos con Google Sheets.', tags: ['n8n', 'Telegram', 'Google Sheets'], nota: 'Automatización' },
  { t: 'Embeddings + Qdrant', cat: ['ia', 'datos'], d: 'App de consola que convierte un texto en un vector con Gemini y lo guarda en Qdrant junto con sus palabras clave.', tags: ['Node.js', 'Gemini', 'Qdrant'], nota: 'Inteligencia Artificial' },
  { t: 'Simulador de personalidades', cat: ['ia', 'frontend'], d: 'Chat que cambia la personalidad de un modelo de IA (Animador, Estricto o Mentor) con prompts basados en los rasgos del modelo Big Five.', tags: ['JavaScript', 'Prompts', 'API de IA'], nota: 'Inteligencia Artificial' }
];


const aplicaciones = [
  { n: 'CampusShop', url: 'https://allisonrvargas.github.io/Campushop/', code: GH + 'Campushop', d: 'Tienda en línea mobile-first con catálogo, carrito, checkout, perfil e historial, maquetada solo con HTML y CSS.', tags: ['HTML5', 'CSS3', 'Mobile-first'] },
  { n: 'Campus Parking', url: 'https://allisonrvargas.github.io/Campus-Parking/', code: GH + 'Campus-Parking', d: 'Aplicación de una sola página para administrar un estacionamiento: inicio de sesión, mapa de espacios, servicios y reportes.', tags: ['HTML', 'CSS', 'JavaScript'] },
  { n: 'Gestión de Hotel', url: 'https://allisonrvargas.github.io/Taller-1-Allis-y-Sofi/', code: GH + 'Taller-1-Allis-y-Sofi', d: 'Taller en pareja: la lógica de un hotel con arreglos de objetos, funciones, callbacks y setTimeout para simular procesos reales. Funciona con un menú de ventanas emergentes, por eso se abre en su propia pestaña.', tags: ['JavaScript', 'Callbacks', 'Asincronía'], embed: false }
];


const inventario = [
  { a: 'JS', n: 'JavaScript', tipo: 'Lenguaje', c: '#ec4899', u: 'Campus Parking, el Simulador de personalidades, el taller del hotel y todos mis proyectos con Node.js.' },
  { a: 'TS', n: 'TypeScript', tipo: 'Lenguaje', c: '#db2777', u: 'El motor de movimiento de Kid-Fit.' },
  { a: 'PY', n: 'Python', tipo: 'Lenguaje', c: '#a21caf', u: 'Scripts y mis primeros ejercicios de programación.' },
  { a: '</>', n: 'HTML y CSS', tipo: 'Frontend', c: '#f472b6', u: 'CampusShop, Campus Parking y este portafolio.' },
  { a: 'RN', n: 'React Native', tipo: 'Móvil', c: '#c026d3', u: 'Kid-Fit, la app de ejercicio e hidratación para niños.' },
  { a: 'NODE', n: 'Node.js', tipo: 'Backend', c: '#be185d', u: 'Gym Manager, la API de postulaciones, Librarian y Gremio de Cazadores.' },
  { a: 'EXP', n: 'Express', tipo: 'Backend', c: '#9d174d', u: 'MarisolliFlix, Librarian y mis APIs REST con JWT y Passport.' },
  { a: 'SQL', n: 'MySQL', tipo: 'Base de datos', c: '#db2777', u: 'Gaseosas del Valle, MarisolliFlix y la API de postulaciones.' },
  { a: 'PG', n: 'PostgreSQL', tipo: 'Base de datos', c: '#be185d', u: 'TechZone y la base de datos de la veterinaria.' },
  { a: 'MDB', n: 'MongoDB', tipo: 'Base de datos', c: '#9d174d', u: 'Gym Manager, con transacciones reales y consultas de agregación.' },
  { a: 'QD', n: 'Qdrant', tipo: 'Base vectorial', c: '#a21caf', u: 'Mi app de embeddings con Gemini.' },
  { a: 'DKR', n: 'Docker', tipo: 'Herramienta', c: '#ec4899', u: 'El MySQL de la API de postulaciones y el replica set de Gym Manager.' },
  { a: 'GIT', n: 'Git y GitHub', tipo: 'Herramienta', c: '#db2777', u: 'Ramas por funcionalidad, pull requests y code reviews entre células en Kid-Fit.' },
  { a: 'n8n', n: 'n8n', tipo: 'Automatización', c: '#d97706', u: 'TutorBot, con Telegram y Google Sheets.' },
  { a: 'IA', n: 'IA aplicada', tipo: 'Inteligencia Artificial', c: '#c026d3', u: 'MediaPipe en Kid-Fit, embeddings con Gemini y prompts para simular personalidades.' },
  { a: 'TEST', n: 'Jest y node:test', tipo: 'Calidad', c: '#0d9488', u: '123 pruebas en la API de postulaciones y 26 en Librarian.' },
  { a: 'API', n: 'Swagger y Postman', tipo: 'Documentación', c: '#0d9488', u: 'Documentar y probar las APIs de MarisolliFlix y mis ejercicios de Express.' },
  { a: 'SCRUM', n: 'Scrum y ClickUp', tipo: 'Equipo', c: '#ec4899', u: 'Sprints de Kid-Fit y MarisolliFlix, y los 3 sprints de Gym Manager.' }
];

const catName = { backend: 'Backend', frontend: 'Frontend', movil: 'Móvil', datos: 'Datos', ia: 'IA y automatización' };

/* ============ SONIDO ============ */
let ctx = null, master = null, analyser = null, soundOn = false;
function audio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0.14;
    analyser = ctx.createAnalyser(); analyser.fftSize = 64;
    master.connect(analyser); analyser.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}
const freq = n => 440 * Math.pow(2, (n - 69) / 12);
function tone(note, t, dur, type = 'square', vol = 0.5) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.value = freq(note);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.02);
}
function sfx(kind) {
  if (!soundOn || !audio()) return;
  const t = ctx.currentTime;
  if (kind === 'blip') tone(84, t, 0.06, 'square', 0.25);
  if (kind === 'open') { tone(76, t, 0.07); tone(83, t + 0.07, 0.1); }
  if (kind === 'unlock') { [72, 76, 79, 84].forEach((n, i) => tone(n, t + i * 0.08, 0.14, 'square', 0.35)); }
  if (kind === 'start') { [60, 64, 67, 72, 76, 79, 84].forEach((n, i) => tone(n, t + i * 0.06, 0.12, 'square', 0.3)); }
}

/* Pistas chiptune originales: progresión de acordes + arpegio + bajo */
const pistas = [
  { name: 'Compilando sueños', bpm: 118, root: 60, chords: [[0, 4, 7], [7, 11, 14], [9, 12, 16], [5, 9, 12]], arp: [0, 1, 2, 1, 0, 2, 1, 2], mel: [12, null, 14, 16, null, 16, 14, 12, 11, null, 12, 14, null, 11, 9, null] },
  { name: 'Bucle de depuración', bpm: 96, root: 57, chords: [[0, 3, 7], [-4, 0, 3], [3, 7, 10], [-2, 2, 5]], arp: [0, 2, 1, 2, 0, 2, 1, 2], mel: [15, null, null, 14, 12, null, 10, null, 12, null, null, 10, 7, null, null, null] },
  { name: 'Deploy a medianoche', bpm: 140, root: 62, chords: [[0, 3, 7], [-4, 0, 3], [3, 7, 10], [-2, 2, 5]], arp: [0, 1, 2, 3, 2, 1, 0, 1], mel: [12, 10, 12, 15, null, 14, 12, null, 10, 12, null, 7, 10, null, 12, null] }
];
let track = 0, playing = false, step = 0, nextTime = 0, timer = null;
function schedule() {
  const p = pistas[track], s = 60 / p.bpm / 2; // corcheas
  while (nextTime < ctx.currentTime + 0.12) {
    const bar = Math.floor(step / 8) % p.chords.length, ch = p.chords[bar], st = step % 8;
    const notes = [...ch, ch[0] + 12];
    tone(p.root + 12 + notes[p.arp[st] % notes.length], nextTime, s * 0.9, 'square', 0.22);
    if (st % 4 === 0) tone(p.root - 12 + ch[0], nextTime, s * 3.6, 'triangle', 0.6);
    const m = p.mel[step % 16];
    if (m !== null && Math.floor(step / 16) % 2 === 1) tone(p.root + 12 + m, nextTime, s * 1.6, 'square', 0.18);
    if (st % 2 === 1) noise(nextTime);
    nextTime += s; step++;
  }
}
let noiseBuf = null;
function noise(t) {
  if (!noiseBuf) { noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
  const src = ctx.createBufferSource(), g = ctx.createGain(); src.buffer = noiseBuf;
  g.gain.setValueAtTime(0.12, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
  src.connect(g); g.connect(master); src.start(t);
}
function play() {
  if (!audio()) return;
  playing = true; step = 0; nextTime = ctx.currentTime + 0.05;
  clearInterval(timer); timer = setInterval(schedule, 25);
  updatePlayer();
}
function stop() { playing = false; clearInterval(timer); updatePlayer(); }
function setSound(on) {
  soundOn = on;
  setTimeout(() => { if (typeof label === 'function') { label(); resetIdle(); } }, 0);
  const b = document.getElementById('soundBtn');
  b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', on ? 'Silenciar música' : 'Activar música');
  if (on) play(); else stop();
}

/* ============ UI ============ */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// Reproductor
const tl = $('#tracklist');
pistas.forEach((p, i) => {
  const li = document.createElement('li');
  li.innerHTML = `<button type="button"><span>${p.name}</span></button>`;
  li.firstChild.addEventListener('click', () => { track = i; soundOn = true; $('#soundBtn').setAttribute('aria-pressed', 'true'); play(); });
  tl.appendChild(li);
});
function updatePlayer() {
  $('#trackName').textContent = playing ? pistas[track].name : 'En pausa';
  $('#playBtn').textContent = playing ? '❚❚' : '▶';
  $('#playBtn').setAttribute('aria-label', playing ? 'Pausar' : 'Reproducir');
  tl.querySelectorAll('button').forEach((b, i) => b.classList.toggle('on', playing && i === track));
}
$('#playBtn').addEventListener('click', () => { if (playing) setSound(false); else setSound(true); });
$('#nextBtn').addEventListener('click', () => { track = (track + 1) % pistas.length; setSound(true); });
$('#prevBtn').addEventListener('click', () => { track = (track + pistas.length - 1) % pistas.length; setSound(true); });
$('#soundBtn').addEventListener('click', () => setSound(!soundOn));
updatePlayer();

// Ecualizador
const bars = $$('#eq i');
const fdata = new Uint8Array(32);
(function eqLoop() {
  if (analyser && playing) {
    analyser.getByteFrequencyData(fdata);
    bars.forEach((b, i) => { b.style.height = Math.max(6, fdata[i + 1] / 255 * 60) + 'px'; });
  } else bars.forEach(b => { b.style.height = '6px'; });
  requestAnimationFrame(eqLoop);
})();

// START
function start(withMusic) {
  if (withMusic) { setSound(true); } else { audio(); }
  sfx('start');
  showToast('▶', 'PARTIDA INICIADA', '¡Que empiece la aventura!');
  document.getElementById('sobre-mi').scrollIntoView({ behavior: 'smooth' });
}
$('#startMusic').addEventListener('click', () => start(true));
$('#startQuiet').addEventListener('click', () => start(false));
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && window.scrollY < window.innerHeight * 0.5 && document.activeElement === document.body) start(false);
});

// Menú de niveles
const menu = $('#levelMenu'), menuBtn = $('#menuBtn');
menuBtn.addEventListener('click', () => { const o = menu.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', o); sfx('blip'); });
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }));
document.addEventListener('click', e => { if (!menu.contains(e.target) && e.target !== menuBtn && !menuBtn.contains(e.target)) menu.classList.remove('open'); });

// Estadísticas
const counts = {};
proyectos.forEach(p => p.cat.forEach(c => counts[c] = (counts[c] || 0) + 1));
const maxC = Math.max(...Object.values(counts));
$('#stats').innerHTML = Object.keys(catName).map(k => {
  const n = counts[k] || 0, cells = 10, on = Math.round(n / maxC * cells);
  return `<div class="stat"><span>${catName[k]}</span><div class="bar">${Array.from({ length: cells }, (_, i) => `<i class="${i < on ? 'on' : ''}"></i>`).join('')}</div><b>${n}</b></div>`;
}).join('');

// Arte pixelado de cada bloque (generado a partir del nombre)
function hash(s) { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function pixelArt(name, w = 12, h = 8) {
  let x = hash(name);
  const rnd = () => (x = Math.imul(x ^ (x >>> 15), 2246822507) ^ Math.imul(x ^ (x >>> 13), 3266489909), (x >>> 0) / 4294967296);
  const pal = ['#ec4899', '#f472b6', '#f9a8d4', '#db2777', '#be185d', '#f9a8d4'];
  const base = Math.floor(rnd() * pal.length);
  let r = `<svg viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" aria-hidden="true"><rect width="${w}" height="${h}" fill="#fff0f7"/>`;
  for (let i = 0; i < 18; i++) r += `<rect x="${Math.floor(rnd() * w)}" y="${Math.floor(rnd() * h)}" width="1" height="1" fill="#fde2ef"/>`;
  const half = w / 2;
  for (let yy = 1; yy < h - 1; yy++) for (let xx = 1; xx < half; xx++) {
    if (rnd() < 0.55) {
      const c = pal[(base + Math.floor(rnd() * 3)) % pal.length];
      r += `<rect x="${xx}" y="${yy}" width="1" height="1" fill="${c}"/><rect x="${w - 1 - xx}" y="${yy}" width="1" height="1" fill="${c}"/>`;
    }
  }
  return r + '</svg>';
}

// Bloques de proyectos
const blocksEl = $('#blocks');
proyectos.forEach((p, i) => {
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'block reveal'; b.dataset.cat = p.cat.join(' ');
  b.innerHTML = `${pixelArt(p.t)}<div class="b-body"><b>${p.t}</b><span>${p.cat.map(c => catName[c].toUpperCase()).join(' · ')}</span></div>`;
  b.addEventListener('click', () => openModal(i));
  blocksEl.appendChild(b);
});
let usedFilter = false;
$$('.biomes .chip').forEach(ch => ch.addEventListener('click', () => {
  $$('.biomes .chip').forEach(c => c.classList.remove('on')); ch.classList.add('on'); sfx('blip');
  const f = ch.dataset.f;
  $$('.block').forEach(b => b.classList.toggle('hide', f !== 'todos' && !b.dataset.cat.split(' ').includes(f)));
  if (!usedFilter && f !== 'todos') { usedFilter = true; showToast('⛏', 'BIOMA DESCUBIERTO', catName[f]); }
}));

// Modal
const modal = $('#modal');
let lastFocus = null;
function openModal(i) {
  const p = proyectos[i]; lastFocus = document.activeElement;
  $('#mArt').innerHTML = pixelArt(p.t, 24, 8);
  $('#mCat').textContent = p.cat.map(c => catName[c].toUpperCase()).join(' · ');
  $('#mTitle').textContent = p.t;
  $('#mDesc').textContent = p.d;
  $('#mTags').innerHTML = '<span>BOTÍN</span>' + p.tags.map(t => `<i>${t}</i>`).join('');
  $('#mLink').innerHTML = p.link ? `<a class="pix-btn big" href="${p.link}" target="_blank" rel="noopener">VER CÓDIGO <small>en GitHub</small></a>` : `<span class="muted">${p.nota.toUpperCase()}</span>`;
  modal.hidden = false; sfx('open'); $('#mClose').focus();
}
function closeModal() { modal.hidden = true; if (lastFocus) lastFocus.focus(); }
$('#mClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });


// Aplicaciones (demos insertadas)
const carts = $('#cartridges'), frame = $('#appFrame');
let appLoaded = false, appIndex = 0;
function showApp(i, load) {
  appIndex = i; const a = aplicaciones[i];
  carts.querySelectorAll('button').forEach((b, k) => { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', k === i); });
  $('#appUrl').textContent = a.url.replace('https://', '');
  $('#appName').textContent = a.n; $('#appDesc').textContent = a.d;
  $('#appTags').innerHTML = '<span>HECHO CON</span>' + a.tags.map(t => `<i>${t}</i>`).join('');
  $('#appOpen').href = a.url; $('#appCode').href = a.code;
  const ph = $('#appPlaceholder');
  if (a.embed === false) {
    frame.removeAttribute('src'); frame.hidden = true; ph.hidden = false;
    $('#phOpen').href = a.url;
    return;
  }
  frame.hidden = false; ph.hidden = true;
  if (load || appLoaded) { frame.src = a.url; frame.title = 'Aplicación ' + a.n; appLoaded = true; }
}
aplicaciones.forEach((a, i) => {
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'cart'; b.setAttribute('role', 'tab');
  b.innerHTML = `${pixelArt(a.n, 8, 6)}<span>${a.n}</span>`;
  b.addEventListener('click', () => { showApp(i, true); sfx('open'); });
  carts.appendChild(b);
});
showApp(0, false);
new IntersectionObserver((es, ob) => es.forEach(e => { if (e.isIntersecting) { showApp(appIndex, true); ob.disconnect(); } }), { rootMargin: '300px' }).observe(frame);


// Inventario
const invGrid = $('#invGrid');
function showItem(i) {
  const it = inventario[i];
  invGrid.querySelectorAll('.slot').forEach((s, k) => s.classList.toggle('on', k === i));
  const ic = $('#invIcon'); ic.textContent = it.a; ic.style.setProperty('--c1', it.c);
  $('#invType').textContent = it.tipo; $('#invName').textContent = it.n; $('#invUse').textContent = 'Usada en: ' + it.u;
}
inventario.forEach((it, i) => {
  const s = document.createElement('button');
  s.type = 'button'; s.className = 'slot'; s.setAttribute('role', 'listitem');
  s.setAttribute('aria-label', it.n);
  const ico = document.createElement('span'); ico.className = 'ico' + (it.a.length > 3 ? ' long' : ''); ico.style.setProperty('--c1', it.c); ico.textContent = it.a;
  const lbl = document.createElement('span'); lbl.className = 'lbl'; lbl.textContent = it.n;
  s.append(ico, lbl);
  ['mouseenter', 'focus', 'click'].forEach(ev => s.addEventListener(ev, () => { showItem(i); if (ev === 'click') sfx('blip'); }));
  invGrid.appendChild(s);
});
showItem(0);

// Bloque de navegación: cada cara lleva a una parte del portafolio
const cube = $('#cube'), cubeWrap = $('#cubeWrap');
const caras = [
  { n: 'Sobre mí', go: () => $('#sobre-mi').scrollIntoView({ behavior: 'smooth' }) },
  { n: 'Proyectos', go: () => $('#proyectos').scrollIntoView({ behavior: 'smooth' }) },
  { n: 'Aplicaciones', go: () => $('#aplicaciones').scrollIntoView({ behavior: 'smooth' }) },
  { n: 'Contacto', go: () => $('#contacto').scrollIntoView({ behavior: 'smooth' }) },
  { n: 'Música', go: () => { setSound(!soundOn); showToast('♪', 'RADIO ALLISON', soundOn ? pistas[track].name : 'Música en pausa'); } },
  { n: 'Mi CV', go: () => window.open('cv/CV_Allison_Rocio_Vargas_Mejia.pdf', '_blank', 'noopener') }
];
// rotación (grados) que deja cada cara de frente
const poses = [[0, 0], [0, -90], [0, -180], [0, 90], [-90, 0], [90, 0]];
let rx = -12, ry = 18, face = 0, dragging = false, moved = 0, lx = 0, ly = 0, idle = null;
function render() { cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`; }
function currentFace() {
  if (rx <= -45) return 4;
  if (rx >= 45) return 5;
  const n = ((Math.round(-ry / 90) % 4) + 4) % 4;
  return n;
}
function label() { $('#cubeLabel').innerHTML = (face === 4 ? 'Toca el bloque para ' + (soundOn ? 'pausar' : 'poner') + ': ' : face === 5 ? 'Toca el bloque para abrir: ' : 'Toca el bloque para ir a: ') + '<b>' + caras[face].n + '</b>'; }
function snap(f) {
  face = f;
  const [px, py] = poses[f];
  // elegir el giro más corto en Y
  if (f < 4) { let target = py; while (target - ry > 180) target -= 360; while (ry - target > 180) target += 360; ry = target; } 
  rx = px === 0 ? -12 : px;
  if (f < 4) ry += 18 * 0; 
  render(); label();
}
function rotateBy(dir) { const base = face >= 4 ? 0 : face; snap((base + dir + 4) % 4); sfx('blip'); }
$('#cubePrev').addEventListener('click', () => { rotateBy(-1); resetIdle(); });
$('#cubeNext').addEventListener('click', () => { rotateBy(1); resetIdle(); });
cubeWrap.addEventListener('pointerdown', e => { dragging = true; moved = 0; lx = e.clientX; ly = e.clientY; cube.classList.add('dragging'); cubeWrap.setPointerCapture(e.pointerId); resetIdle(); });
cubeWrap.addEventListener('pointermove', e => {
  if (!dragging) return;
  const dx = e.clientX - lx, dy = e.clientY - ly; moved += Math.abs(dx) + Math.abs(dy);
  ry += dx * 0.7; rx = Math.max(-90, Math.min(90, rx - dy * 0.7)); lx = e.clientX; ly = e.clientY; render();
});
function endDrag() {
  if (!dragging) return; dragging = false; cube.classList.remove('dragging');
  if (moved < 6) { activate(); return; }
  snap(currentFace()); sfx('blip');
}
cubeWrap.addEventListener('pointerup', endDrag);
cubeWrap.addEventListener('pointercancel', endDrag);
cubeWrap.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); rotateBy(-1); }
  if (e.key === 'ArrowRight') { e.preventDefault(); rotateBy(1); }
  if (e.key === 'ArrowUp') { e.preventDefault(); snap(4); }
  if (e.key === 'ArrowDown') { e.preventDefault(); snap(5); }
});
function activate() { sfx('open'); caras[face].go(); label(); }
// gira sola a la siguiente cara mientras nadie la toca
function resetIdle() { clearInterval(idle); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) idle = setInterval(() => { if (!dragging && scrollY < innerHeight * 0.6) { const base = face >= 4 ? 0 : face; snap((base + 1) % 4); } }, playing ? 1600 : 3200); }
snap(0); resetIdle();

// Toasts
function showToast(ic, small, text) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<div class="ic">${ic}</div><div><small>${small}</small><b>${text}</b></div>`;
  $('#toasts').appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 320); }, 2600);
}

// HUD, XP y niveles
const hud = $('#hud'), xpFill = $('#xpFill');
const levels = [...$$('[data-level]')];
const seen = new Set();
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const pct = max > 0 ? Math.min(100, Math.round(scrollY / max * 100)) : 0;
  xpFill.style.width = pct + '%';
  $('#hudXp').textContent = 'XP ' + pct + '%';
  hud.classList.toggle('show', scrollY > innerHeight * 0.45);
  let current = levels[0];
  levels.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * 0.45) current = s; });
  $('#hudLevel').textContent = current.dataset.level;
  menu.querySelectorAll('a').forEach(a => a.classList.toggle('here', a.getAttribute('href') === '#' + current.id));
  if (current.id !== 'start' && !seen.has(current.id)) {
    seen.add(current.id);
    sfx('blip'); showToast('★', current.dataset.level === 'CONTACTO' ? 'ÚLTIMO NIVEL' : current.dataset.level + ' ALCANZADO', current.querySelector('h2').textContent);
  }
}
// Línea de tiempo: los bloques se apilan al bajar
const tlEl = document.getElementById('timeline'), tlFill = document.getElementById('tlFill');
function onTimeline() {
  if (!tlEl) return;
  const r = tlEl.getBoundingClientRect();
  const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
  tlFill.style.height = (p * 100) + '%';
}
addEventListener('scroll', onTimeline, { passive: true });
onTimeline();
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Aparición y disparadores
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in'); io.unobserve(e.target);
}), { threshold: 0.12 });
$$('.reveal, .pixel-box').forEach(el => { el.classList.add('reveal'); io.observe(el); });

// Cielo pixelado: estrellas y bloques flotantes
const cv = $('#sky'), g = cv.getContext('2d');
let W, H, stars = [], cubes = [];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
function resize() {
  W = cv.width = innerWidth; H = cv.height = innerHeight;
  stars = Array.from({ length: Math.round(W * H / 9000) }, () => ({ x: Math.random() * W, y: Math.random() * H, s: Math.random() < 0.15 ? 4 : 2, p: Math.random() * 6 }));
  cubes = Array.from({ length: 14 }, () => ({ x: Math.random() * W, y: Math.random() * H, s: [8, 12, 16][Math.floor(Math.random() * 3)], v: 0.15 + Math.random() * 0.35, c: ['#ec4899', '#f472b6', '#f9a8d4', '#be185d'][Math.floor(Math.random() * 4)], d: Math.random() * 0.6 + 0.2 }));
}
function draw(t) {
  g.clearRect(0, 0, W, H);
  const off = scrollY;
  stars.forEach(s => {
    const a = 0.35 + 0.65 * Math.abs(Math.sin(t / 900 + s.p));
    g.fillStyle = `rgba(236,72,153,${a * 0.55})`;
    const y = ((s.y - off * 0.08) % H + H) % H;
    g.fillRect(Math.round(s.x), Math.round(y), s.s, s.s);
  });
  cubes.forEach(c => {
    if (!reduce) c.y -= c.v;
    if (c.y < -20) { c.y = H + 20; c.x = Math.random() * W; }
    const y = ((c.y - off * c.d * 0.25) % (H + 40) + H + 40) % (H + 40) - 20;
    g.globalAlpha = 0.28; g.fillStyle = c.c;
    g.fillRect(Math.round(c.x), Math.round(y), c.s, c.s);
    g.globalAlpha = 0.5; g.fillStyle = '#fff';
    g.fillRect(Math.round(c.x), Math.round(y), c.s / 4, c.s / 4);
    g.globalAlpha = 1;
  });
  if (!reduce) requestAnimationFrame(draw);
}
addEventListener('resize', () => { resize(); if (reduce) draw(0); });
resize(); requestAnimationFrame(draw);

// Código secreto: ↑ ↑ ↓ ↓ ← → ← → B A
const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let pos = 0;
document.addEventListener('keydown', e => {
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  pos = k === code[pos] ? pos + 1 : (k === code[0] ? 1 : 0);
  if (pos === code.length) {
    pos = 0; sfx('unlock'); showToast('♥', 'CÓDIGO SECRETO', '¡Vida extra para ti!');
    for (let i = 0; i < 80; i++) {
      const c = document.createElement('i'); c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw'; c.style.top = '-12px';
      c.style.background = ['#ec4899', '#f472b6', '#fcd34d', '#5eead4', '#fbcfe8'][i % 5];
      c.style.animationDelay = Math.random() * 0.8 + 's';
      document.body.appendChild(c); setTimeout(() => c.remove(), 2800);
    }
  }
});
