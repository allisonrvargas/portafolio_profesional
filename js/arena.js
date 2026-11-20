import * as THREE from 'three';

/* =========================================================
   LA ARENA DE ALLISON · portafolio 3D
   Mundo de bloques + arena de estrategia. Todo original.
   ========================================================= */

const $ = s => document.querySelector(s);
const GH = 'https://github.com/allisonrvargas/';
const CV = 'cv/CV_Allison_Rocio_Vargas_Mejia.pdf';

/* ---------------- DATOS ---------------- */
const proyectos = [
  { t: 'Kid-Fit', cat: ['movil'], d: 'App móvil que cuenta los ejercicios de niños con la cámara del teléfono y registra su hidratación, con 15 niveles. Trabajé como desarrolladora backend en un equipo por células: lógica de ángulos con MediaPipe Pose, validación de la caída del salto, pruebas de 10 a 30 FPS y estrategia offline-first con AsyncStorage y Firebase.', tags: ['React Native', 'TypeScript', 'MediaPipe', 'Firebase', 'Jest'], link: GH + 'Kid_Fit_allison-vargas' },
  { t: 'Gym Manager CLI', cat: ['backend', 'datos'], d: 'Aplicación de consola para un gimnasio: clientes, planes, contratos, seguimiento, nutrición y finanzas. Transacciones en MongoDB con rollback, consultas de agregación, SOLID y patrones Repository, Factory, Command y Observer. Fui Product Owner, Scrum Master y desarrolladora en 3 sprints.', tags: ['Node.js', 'MongoDB', 'Docker', 'Scrum'], link: GH + 'gym_manager' },
  { t: 'MarisolliFlix', cat: ['backend', 'frontend'], d: 'Plataforma para reseñar películas, series y animes con un ranking ponderado, likes y dislikes, panel de administración y API documentada en Swagger. Proyecto en equipo con Scrum.', tags: ['Express', 'MySQL', 'JWT', 'Swagger'], nota: 'Proyecto en equipo' },
  { t: 'Librarian', cat: ['backend', 'frontend'], d: 'Sistema de biblioteca con préstamos, ventas, clientes e inventario. Roles de administrador y usuario, tres límites de peticiones y 26 pruebas automatizadas.', tags: ['Express 5', 'Rate limit', 'Vite', 'node:test'], link: GH + 'review_express_backend' },
  { t: 'API de postulaciones', cat: ['backend', 'datos'], d: 'API REST que calcula el puntaje y la prioridad de cada candidato a una vacante. Reglas de negocio, filtros, control de estados y 123 pruebas.', tags: ['Express', 'MySQL', 'Jest', 'Docker'], link: GH + 'evaluacion-allison_rocio_vargas_mejia' },
  { t: 'Gremio de Cazadores', cat: ['backend'], d: 'API REST modular y segura con autenticación por JWT y Passport.js, organizada en una arquitectura limpia por capas.', tags: ['Node.js', 'Express', 'Passport', 'JWT'], link: GH + 'jwt_and_passport' },
  { t: 'Campus Parking', cat: ['frontend'], d: 'Aplicación de una sola página para administrar un estacionamiento: inicio de sesión, mapa de espacios, servicios de parqueo, reportes y almacenamiento local.', tags: ['HTML', 'CSS', 'JavaScript'], link: GH + 'Campus-Parking' },
  { t: 'CampusShop', cat: ['frontend'], d: 'Tienda en línea mobile-first con catálogo, carrito, checkout, perfil e historial, maquetada solo con HTML y CSS, sin JavaScript.', tags: ['HTML5', 'CSS3', 'Mobile-first'], link: GH + 'Campushop' },
  { t: 'Gaseosas del Valle', cat: ['datos'], d: 'Base de datos relacional en MySQL con triggers, funciones, procedimientos almacenados y vistas optimizadas.', tags: ['MySQL', 'Triggers', 'Procedimientos'], nota: 'Base de datos' },
  { t: 'TechZone', cat: ['datos'], d: 'Sistema de inventario y ventas en PostgreSQL: modelo entidad-relación, procedimientos que descuentan existencias y consultas de reportes.', tags: ['PostgreSQL', 'PL/pgSQL'], link: GH + 'gesti-n_de_Inventario_examen' },
  { t: 'Veterinaria SQL', cat: ['datos'], d: 'Base de datos de una veterinaria en PostgreSQL: CRUD, consultas, funciones de ventana, CTE, vistas y procedimientos almacenados.', tags: ['PostgreSQL', 'SQL'], link: GH + 'review_postgresql' },
  { t: 'Adapter y reportes', cat: ['backend', 'datos'], d: 'Patrón de diseño Adapter con cajas de cambios mecánica y automática, y reportes HTML de estudiantes, profesores y horarios generados desde MySQL.', tags: ['Node.js', 'mysql2', 'Patrones'], link: GH + 'review_node.js' },
  { t: 'TutorBot', cat: ['ia'], d: 'Automatización de flujos con n8n: un bot de Telegram que integra sus datos con Google Sheets.', tags: ['n8n', 'Telegram', 'Google Sheets'], nota: 'Automatización' },
  { t: 'Embeddings + Qdrant', cat: ['ia', 'datos'], d: 'App de consola que convierte un texto en un vector con Gemini y lo guarda en Qdrant junto con sus palabras clave.', tags: ['Node.js', 'Gemini', 'Qdrant'], nota: 'Inteligencia Artificial' },
  { t: 'Simulador de personalidades', cat: ['ia', 'frontend'], d: 'Chat que cambia la personalidad de un modelo de IA (Animador, Estricto o Mentor) con prompts basados en los rasgos del modelo Big Five.', tags: ['JavaScript', 'Prompts', 'API de IA'], nota: 'Inteligencia Artificial' }
];
const catName = { backend: 'Backend', frontend: 'Frontend', movil: 'Móvil', datos: 'Datos', ia: 'IA y automatización' };

const aplicaciones = [
  { n: 'CampusShop', url: 'https://allisonrvargas.github.io/Campushop/', code: GH + 'Campushop', d: 'Tienda en línea mobile-first hecha solo con HTML y CSS.' },
  { n: 'Campus Parking', url: 'https://allisonrvargas.github.io/Campus-Parking/', code: GH + 'Campus-Parking', d: 'Administración de un estacionamiento: espacios, servicios y reportes.' },
  { n: 'Gestión de Hotel', url: 'https://allisonrvargas.github.io/Taller-1-Allis-y-Sofi/', code: GH + 'Taller-1-Allis-y-Sofi', d: 'Taller en pareja: la lógica de un hotel con objetos, callbacks y setTimeout.', embed: false }
];

const habilidades = [
  { a: 'JS', n: 'JavaScript', c: '#ec4899', u: 'Campus Parking, el Simulador de personalidades y todos mis proyectos con Node.js.' },
  { a: 'TS', n: 'TypeScript', c: '#db2777', u: 'El motor de movimiento de Kid-Fit.' },
  { a: 'PY', n: 'Python', c: '#9333ea', u: 'Scripts y mis primeros ejercicios de programación.' },
  { a: '</>', n: 'HTML y CSS', c: '#f472b6', u: 'CampusShop, Campus Parking y este portafolio.' },
  { a: 'RN', n: 'React Native', c: '#c026d3', u: 'Kid-Fit, la app de ejercicio para niños.' },
  { a: 'NODE', n: 'Node.js', c: '#be185d', u: 'Gym Manager, la API de postulaciones, Librarian y Gremio de Cazadores.' },
  { a: 'EXP', n: 'Express', c: '#9d174d', u: 'MarisolliFlix, Librarian y mis APIs REST con JWT.' },
  { a: 'SQL', n: 'MySQL', c: '#e11d48', u: 'Gaseosas del Valle, MarisolliFlix y la API de postulaciones.' },
  { a: 'PG', n: 'PostgreSQL', c: '#7c3aed', u: 'TechZone y la veterinaria.' },
  { a: 'MDB', n: 'MongoDB', c: '#16a34a', u: 'Gym Manager, con transacciones y agregaciones.' },
  { a: 'QD', n: 'Qdrant', c: '#a21caf', u: 'Mi app de embeddings con Gemini.' },
  { a: 'DKR', n: 'Docker', c: '#0284c7', u: 'MySQL de la API de postulaciones y el replica set de Gym Manager.' },
  { a: 'GIT', n: 'Git y GitHub', c: '#ea580c', u: 'Ramas, pull requests y code reviews entre células en Kid-Fit.' },
  { a: 'n8n', n: 'n8n', c: '#d97706', u: 'TutorBot, con Telegram y Google Sheets.' },
  { a: 'IA', n: 'IA aplicada', c: '#c026d3', u: 'MediaPipe en Kid-Fit, embeddings con Gemini y prompts.' },
  { a: 'TEST', n: 'Jest y node:test', c: '#0d9488', u: '123 pruebas en la API de postulaciones y 26 en Librarian.' },
  { a: 'API', n: 'Swagger y Postman', c: '#0f766e', u: 'Documentar y probar las APIs de MarisolliFlix.' },
  { a: 'SCRUM', n: 'Scrum y ClickUp', c: '#f43f5e', u: 'Sprints de Kid-Fit, MarisolliFlix y Gym Manager.' }
];
const orePos = [[-5, 14], [5, 14], [0, 10], [-6, 4], [6, 3], [-12, 7], [12, 8], [-2, 5], [13, 2],
  [-6, -6], [6, -6], [-13, -9], [13, -9], [-4, -13], [4, -13], [7, 21], [-10, -20], [10, -20]];

const historia = [
  { f: '2020 – 2024 · Colegio Nuestra Señora de los Ángeles', t: 'Puse el primer bloque', d: 'Bachillerato en Ciencias y Letras con orientación en Computación.' },
  { f: 'En curso · Universidad', t: 'Armé la estrategia', d: 'Estudio Ingeniería en Ciencias y Sistemas.' },
  { f: '2026 · Campuslands GT', t: 'Aprendí a construir', d: 'Técnico en desarrollo de software: JavaScript, Node.js, Express, SQL y NoSQL, Docker, Scrum y Git.' },
  { f: 'Mayo 2026 · Kid-Fit', t: 'Construí en equipo', d: 'Desarrolladora backend en un equipo por células, con visión artificial.' },
  { f: '2026 · Instituto Guatemalteco Americano', t: 'Subí de nivel', d: 'Inglés nivel B1, con vocabulario técnico de TI.' },
  { f: 'Hoy', t: 'Sigo construyendo', d: 'APIs, interfaces web y apps móviles. Busco mi siguiente misión en equipo.', now: true }
];

/* ---------------- SONIDO (chiptune original) ---------------- */
let volume = (() => { try { const v = parseFloat(localStorage.getItem('arenaVol')); return isNaN(v) ? 0.6 : v; } catch (e) { return 0.6; } })();
let actx = null, master = null, analyser = null, soundOn = false, playing = false, track = 0, step = 0, nextTime = 0, timer = null, noiseBuf = null;
function audio() {
  if (!actx) {
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    actx = new AC(); master = actx.createGain(); master.gain.value = 0.22 * volume;
    analyser = actx.createAnalyser(); analyser.fftSize = 64; master.connect(analyser); analyser.connect(actx.destination);
  }
  if (actx.state === 'suspended') actx.resume();
  return actx;
}
const hz = n => 440 * Math.pow(2, (n - 69) / 12);
function tone(n, t, dur, type = 'square', vol = 0.5) {
  const o = actx.createOscillator(), g = actx.createGain(); o.type = type; o.frequency.value = hz(n);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.02);
}
function noise(t, v = 0.12) {
  if (!noiseBuf) { noiseBuf = actx.createBuffer(1, actx.sampleRate * 0.05, actx.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
  const s = actx.createBufferSource(), g = actx.createGain(); s.buffer = noiseBuf;
  g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.05); s.connect(g); g.connect(master); s.start(t);
}
// crujido de piedra: ruido filtrado (como golpear y romper un bloque)
function grit(t, dur, freq, vol, endFreq) {
  if (!noiseBuf) noise(t, 0);
  const len = Math.floor(actx.sampleRate * dur), buf = actx.createBuffer(1, len, actx.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (Math.random() < 0.35 ? 1 : 0.3);
  const src = actx.createBufferSource(), f = actx.createBiquadFilter(), g = actx.createGain();
  src.buffer = buf; f.type = 'bandpass'; f.Q.value = 1.4; f.frequency.setValueAtTime(freq, t); if (endFreq) f.frequency.exponentialRampToValueAtTime(endFreq, t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  src.connect(f); f.connect(g); g.connect(master); src.start(t);
}
function sfx(k) {
  if (!audio()) return; const t = actx.currentTime;
  if (k === 'blip') tone(84, t, 0.05, 'square', 0.2);
  if (k === 'hit') { noise(t, 0.35); tone(45, t, 0.08, 'square', 0.3); }
  if (k === 'dig') grit(t, 0.09, 600 + Math.random() * 500, 0.9);
  if (k === 'break') { grit(t, 0.28, 900, 1.2, 250); [0.05, 0.11, 0.17, 0.24].forEach((d, i) => grit(t + d, 0.06, 500 + i * 180, 0.6)); tone(40, t, 0.12, 'triangle', 0.5); }
  if (k === 'pop') { [76, 83, 88].forEach((n, i) => tone(n, t + i * 0.05, 0.1, 'square', 0.3)); }
  if (k === 'open') { tone(72, t, 0.07); tone(79, t + 0.07, 0.12); }
  if (k === 'jump') { tone(67, t, 0.06, 'square', 0.15); tone(74, t + 0.05, 0.08, 'square', 0.15); }
  if (k === 'land') noise(t, 0.12);
  if (k === 'spawn') { [52, 49, 46].forEach((n, i) => tone(n, t + i * 0.09, 0.14, 'sawtooth', 0.18)); }
  if (k === 'hurt') { tone(58, t, 0.12, 'sawtooth', 0.3); tone(52, t + 0.08, 0.14, 'sawtooth', 0.3); }
  if (k === 'fuse') { for (let i = 0; i < 6; i++) grit(t + i * 0.18, 0.12, 3000, 0.25); }
  if (k === 'boom') { grit(t, 0.7, 1200, 2.2, 80); tone(36, t, 0.5, 'triangle', 0.9); }
  if (k === 'win') { [60, 64, 67, 72, 76, 79, 84, 88].forEach((n, i) => tone(n, t + i * 0.08, 0.16, 'square', 0.3)); }
}
const pistas = [
  { name: 'Compilando sueños', bpm: 118, root: 60, chords: [[0, 4, 7], [7, 11, 14], [9, 12, 16], [5, 9, 12]], arp: [0, 1, 2, 1, 0, 2, 1, 2], mel: [12, null, 14, 16, null, 16, 14, 12, 11, null, 12, 14, null, 11, 9, null] },
  { name: 'Bucle de depuración', bpm: 96, root: 57, chords: [[0, 3, 7], [-4, 0, 3], [3, 7, 10], [-2, 2, 5]], arp: [0, 2, 1, 2, 0, 2, 1, 2], mel: [15, null, null, 14, 12, null, 10, null, 12, null, null, 10, 7, null, null, null] },
  { name: 'Deploy a medianoche', bpm: 140, root: 62, chords: [[0, 3, 7], [-4, 0, 3], [3, 7, 10], [-2, 2, 5]], arp: [0, 1, 2, 3, 2, 1, 0, 1], mel: [12, 10, 12, 15, null, 14, 12, null, 10, 12, null, 7, 10, null, 12, null] }
];
function schedule() {
  const p = pistas[track], s = 60 / p.bpm / 2;
  while (nextTime < actx.currentTime + 0.12) {
    const ch = p.chords[Math.floor(step / 8) % p.chords.length], st = step % 8, notes = [...ch, ch[0] + 12];
    tone(p.root + 12 + notes[p.arp[st] % notes.length], nextTime, s * 0.9, 'square', 0.2);
    if (st % 4 === 0) tone(p.root - 12 + ch[0], nextTime, s * 3.6, 'triangle', 0.6);
    const m = p.mel[step % 16]; if (m !== null && Math.floor(step / 16) % 2 === 1) tone(p.root + 12 + m, nextTime, s * 1.6, 'square', 0.17);
    if (st % 2 === 1) noise(nextTime);
    nextTime += s; step++;
  }
}
function setMusic(on) {
  soundOn = on;
  if (on && audio()) { playing = true; step = 0; nextTime = actx.currentTime + 0.05; clearInterval(timer); timer = setInterval(schedule, 25); }
  else { playing = false; clearInterval(timer); }
  const b = $('#soundBtn'); b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', on ? 'Pausar música' : 'Activar música');
  document.querySelectorAll('.tracks button').forEach((x, i) => x.classList.toggle('on', playing && i === track));
}

/* ---------------- UTILIDADES ---------------- */
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function hash(s) { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function pixelArt(name, w = 12, h = 8) {
  const r = rng(hash(name)); const pal = ['#ec4899', '#f472b6', '#f9a8d4', '#db2777', '#be185d', '#f9a8d4'];
  const base = Math.floor(r() * pal.length);
  let s = `<svg viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" aria-hidden="true"><rect width="${w}" height="${h}" fill="#fff0f7"/>`;
  for (let i = 0; i < 18; i++) s += `<rect x="${Math.floor(r() * w)}" y="${Math.floor(r() * h)}" width="1" height="1" fill="#fde2ef"/>`;
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w / 2; x++) if (r() < 0.55) { const c = pal[(base + Math.floor(r() * 3)) % pal.length]; s += `<rect x="${x}" y="${y}" width="1" height="1" fill="${c}"/><rect x="${w - 1 - x}" y="${y}" width="1" height="1" fill="${c}"/>`; }
  return s + '</svg>';
}
function toast(ic, small, title, text = '', color) {
  const t = document.createElement('div'); t.className = 'toast';
  t.innerHTML = `<div class="ti" style="${color ? '--c:' + color : ''}"></div><div><small></small><b></b>${text ? '<p></p>' : ''}</div>`;
  t.querySelector('.ti').textContent = ic; t.querySelector('small').textContent = small; t.querySelector('b').textContent = title;
  if (text) t.querySelector('p').textContent = text;
  $('#toasts').appendChild(t); setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 320); }, 3400);
}
function confetti() {
  for (let i = 0; i < 90; i++) {
    const c = document.createElement('i'); c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw'; c.style.top = '-12px';
    c.style.background = ['#ec4899', '#f472b6', '#fcd34d', '#5eead4', '#fbcfe8'][i % 5];
    c.style.animationDelay = Math.random() * 0.8 + 's'; document.body.appendChild(c); setTimeout(() => c.remove(), 3000);
  }
}

/* ---------------- RENDER ---------------- */
const canvas = $('#world');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
} catch (e) { location.href = 'clasico.html'; throw e; }
let pixelRatio = Math.min(devicePixelRatio, 1.5); renderer.setPixelRatio(pixelRatio);
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
{ // cielo degradado
  const c = document.createElement('canvas'); c.width = 2; c.height = 256; const g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, '#ffc9e3'); gr.addColorStop(0.55, '#ffe4f1'); gr.addColorStop(1, '#fff6fa');
  g.fillStyle = gr; g.fillRect(0, 0, 2, 256); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; scene.background = t; window.__daySky = t;
}
scene.fog = new THREE.Fog(0xffe4f1, 60, 120);
const camera = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, 0.1, 300);
const hemi = new THREE.HemisphereLight(0xfff4fa, 0xd8a7c0, 1.05); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffffff, 1.7);
sun.position.set(20, 34, 14); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -34, right: 34, top: 34, bottom: -34, near: 1, far: 90 }); sun.shadow.bias = -0.0006;
scene.add(sun);

/* ---------------- TEXTURAS DE BLOQUES (pixel art 16x16) ---------------- */
function texture(fn, seed = 1) {
  const c = document.createElement('canvas'); c.width = c.height = 16; const g = c.getContext('2d'); const r = rng(seed);
  fn(g, r); const t = new THREE.CanvasTexture(c); t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; t.colorSpace = THREE.SRGBColorSpace; return t;
}
function speckle(g, r, cols) { for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) { g.fillStyle = cols[Math.floor(r() * cols.length)]; g.fillRect(x, y, 1, 1); } }
const T = {
  grassTop: texture((g, r) => speckle(g, r, ['#8fd17a', '#9ddc86', '#84c46f', '#a6e18e', '#8fd17a']), 2),
  grassSide: texture((g, r) => { speckle(g, r, ['#b07a55', '#a06c48', '#bb8661', '#9a6744']); for (let x = 0; x < 16; x++) { const h = 3 + Math.floor(r() * 3); for (let y = 0; y < h; y++) { g.fillStyle = ['#8fd17a', '#9ddc86', '#84c46f'][Math.floor(r() * 3)]; g.fillRect(x, y, 1, 1); } } }, 3),
  dirt: texture((g, r) => speckle(g, r, ['#b07a55', '#a06c48', '#bb8661', '#9a6744']), 4),
  sand: texture((g, r) => speckle(g, r, ['#f6e3c5', '#f1d9b4', '#f9ead2', '#ecd2aa']), 5),
  stone: texture((g, r) => speckle(g, r, ['#b8b2bd', '#aaa3b0', '#c4bfc8', '#9f98a6']), 6),
  cobble: texture((g, r) => { speckle(g, r, ['#c9c2cf', '#b9b1c0', '#d6d0db']); g.fillStyle = '#8f8797'; [[0, 5, 16, 1], [0, 11, 16, 1], [5, 0, 1, 5], [11, 6, 1, 5], [3, 12, 1, 4], [9, 12, 1, 4]].forEach(a => g.fillRect(...a)); }, 7),
  planks: texture((g, r) => { speckle(g, r, ['#f3c6b4', '#eebba8', '#f7d0c0']); g.fillStyle = '#d99a86'; [0, 4, 8, 12].forEach(y => g.fillRect(0, y + 3, 16, 1)); g.fillRect(6, 0, 1, 4); g.fillRect(12, 4, 1, 4); g.fillRect(3, 8, 1, 4); g.fillRect(10, 12, 1, 4); }, 8),
  log: texture((g, r) => { for (let x = 0; x < 16; x++) { g.fillStyle = x % 4 === 0 ? '#5e3b2c' : ['#7a4e3a', '#6e4433', '#835540'][Math.floor(r() * 3)]; g.fillRect(x, 0, 1, 16); } }, 9),
  logTop: texture((g) => { g.fillStyle = '#e8b48f'; g.fillRect(0, 0, 16, 16); g.strokeStyle = '#b97f5c'; [7, 5, 3].forEach(s => { g.strokeRect(8 - s + 0.5, 8 - s + 0.5, s * 2 - 1, s * 2 - 1); }); g.fillStyle = '#6e4433'; g.fillRect(0, 0, 16, 1); g.fillRect(0, 15, 16, 1); g.fillRect(0, 0, 1, 16); g.fillRect(15, 0, 1, 16); }, 10),
  leaves: texture((g, r) => { speckle(g, r, ['#f9a8d4', '#f472b6', '#fbcfe8', '#f9a8d4', '#ec4899', '#fde2ef']); }, 11),
  woolPink: texture((g, r) => speckle(g, r, ['#ec4899', '#f05aa6', '#e23d8e']), 12),
  woolRose: texture((g, r) => speckle(g, r, ['#f9a8d4', '#f7b6da', '#f39cca']), 13),
  woolWhite: texture((g, r) => speckle(g, r, ['#ffffff', '#f7f2f5', '#fdf8fb']), 14),
  woolLilac: texture((g, r) => speckle(g, r, ['#c4b5fd', '#cdbffe', '#b9a8fb']), 15),
  quartz: texture((g, r) => { speckle(g, r, ['#fff8fc', '#fbeef5', '#fff']); g.fillStyle = '#f3d3e3'; g.fillRect(0, 0, 16, 1); g.fillRect(0, 0, 1, 16); }, 16),
  gold: texture((g, r) => { speckle(g, r, ['#fcd34d', '#fbbf24', '#fde68a']); g.fillStyle = '#d97706'; g.fillRect(0, 15, 16, 1); g.fillRect(15, 0, 1, 16); }, 17),
  dark: texture((g, r) => speckle(g, r, ['#3b2440', '#43294a', '#33203a']), 18),
  glass: texture((g) => { g.fillStyle = 'rgba(220,240,255,.35)'; g.fillRect(0, 0, 16, 16); g.fillStyle = '#ffffff'; g.fillRect(0, 0, 16, 1); g.fillRect(0, 15, 16, 1); g.fillRect(0, 0, 1, 16); g.fillRect(15, 0, 1, 16); g.fillRect(3, 3, 2, 1); g.fillRect(3, 4, 1, 2); }, 19)
};
const M = {};
const lambert = (map, extra = {}) => new THREE.MeshLambertMaterial({ map, ...extra });
M.grass = [lambert(T.grassSide), lambert(T.grassSide), lambert(T.grassTop), lambert(T.dirt), lambert(T.grassSide), lambert(T.grassSide)];
M.log = [lambert(T.log), lambert(T.log), lambert(T.logTop), lambert(T.logTop), lambert(T.log), lambert(T.log)];
['dirt', 'sand', 'stone', 'cobble', 'planks', 'leaves', 'woolPink', 'woolRose', 'woolWhite', 'woolLilac', 'quartz', 'gold', 'dark'].forEach(k => M[k] = lambert(T[k]));
M.glass = lambert(T.glass, { transparent: true, opacity: 0.9 });
const unit = new THREE.BoxGeometry(1, 1, 1);

/* ---------------- MUNDO ---------------- */
const blocks = new Map(); // "x,y,z" -> tipo
const put = (x, y, z, t) => blocks.set(`${x},${y},${z}`, t);
const fill = (x1, y1, z1, x2, y2, z2, t) => { for (let x = x1; x <= x2; x++) for (let y = y1; y <= y2; y++) for (let z = z1; z <= z2; z++) put(x, y, z, t); };
const colliders = []; // AABB [x1,z1,x2,z2]
const solid = (x1, z1, x2, z2) => colliders.push([x1, z1, x2, z2]);

const X0 = -18, X1 = 17, Z0 = -28, Z1 = 25;
const bridges = [[-10, -8], [8, 10]];
const onBridge = x => bridges.some(([a, b]) => x >= a && x <= b);
const isRiver = z => z === -1 || z === 0;
const paths = [[-3, 16, 3, 20], [-12, 17, 12, 19], [-10, -10, -8, 19], [8, -10, 10, 19], [-10, -9, 10, -8], [-1, -16, 1, -8], [-3, -17, 6, -15]];
const isPath = (x, z) => paths.some(([a, b, c, d]) => x >= a && x <= c && z >= b && z <= d);
const terr = rng(42);
for (let x = X0; x <= X1; x++) for (let z = Z0; z <= Z1; z++) {
  const border = x <= -16 || x >= 16 || z >= 23 || z <= -26;
  put(x, -1, z, 'dirt');
  if (border) {
    const h = 1 + Math.floor(terr() * 2.2) + (Math.abs(x) >= 17 || z >= 24 || z <= -27 ? 1 : 0);
    for (let y = 0; y < h; y++) put(x, y, z, y === h - 1 ? 'grass' : 'dirt');
    continue;
  }
  if (isRiver(z) && !onBridge(x)) continue; // agua
  put(x, 0, z, isRiver(z) ? 'planks' : isPath(x, z) ? 'sand' : 'grass');
}
// barandas del puente
bridges.forEach(([a, b]) => { [-2, 1].forEach(z => { put(a - 1, 1, z, 'log'); put(b + 1, 1, z, 'log'); }); [-1, 0].forEach(z => { put(a - 1, 1, z, 'planks'); put(b + 1, 1, z, 'planks'); }); });

// Cerezos
const trees = [[-14, 4], [-5, 8], [5, 7], [14, 5], [-14, -5], [14, -4], [-14, 21], [14, 21], [-13, -21], [13, -21], [-13, -15], [13, -15]];
function tree(x, z, h = 4) {
  for (let y = 1; y <= h; y++) put(x, y, z, 'log');
  for (let y = h - 1; y <= h + 1; y++) for (let dx = -2; dx <= 2; dx++) for (let dz = -2; dz <= 2; dz++) {
    if (Math.abs(dx) === 2 && Math.abs(dz) === 2) continue; if (y === h + 1 && (Math.abs(dx) === 2 || Math.abs(dz) === 2)) continue;
    if (!(dx === 0 && dz === 0 && y <= h)) put(x + dx, y, z + dz, 'leaves');
  }
  put(x, h + 2, z, 'leaves');
  solid(x - 0.5, z - 0.5, x + 0.5, z + 0.5);
}
trees.forEach(([x, z], i) => tree(x, z, 4 + (i % 2)));

// Casa: Sobre mí
function house(cx, cz) {
  const x1 = cx - 3, x2 = cx + 3, z1 = cz - 3, z2 = cz + 3;
  fill(x1, 1, z1, x2, 4, z2, 'planks');
  fill(x1 + 1, 1, z1 + 1, x2 - 1, 4, z2 - 1, 'air');
  [[x1, z1], [x1, z2], [x2, z1], [x2, z2]].forEach(([x, z]) => fill(x, 1, z, x, 4, z, 'log'));
  put(cx, 1, z2, 'air'); put(cx, 2, z2, 'air'); // puerta
  [[cx - 2, z2], [cx + 2, z2], [x1, cz], [x2, cz]].forEach(([x, z]) => put(x, 3, z, 'glass'));
  for (let s = 0; s <= 3; s++) fill(x1 - 1 + s, 5 + s, z1 - 1 + s, x2 + 1 - s, 5 + s, z2 + 1 - s, s % 2 ? 'woolRose' : 'woolPink');
  fill(x1 + 1, 5, z1 + 1, x1 + 1, 9, z1 + 1, 'cobble');
  put(cx - 1, 1, z2 + 1, 'woolRose'); put(cx + 1, 1, z2 + 1, 'woolRose'); // macetas
  solid(x1 - 0.5, z1 - 0.5, x2 + 0.5, z2 + 0.5);
}
house(-11, 13);

// Escenario: música
function stage(cx, cz) {
  fill(cx - 3, 1, cz - 2, cx + 3, 1, cz + 2, 'planks');
  fill(cx - 3, 2, cz - 2, cx + 3, 2, cz - 2, 'woolPink');
  [[cx - 3, cz - 1], [cx + 3, cz - 1]].forEach(([x, z]) => { fill(x, 2, z, x, 4, z, 'dark'); put(x, 5, z, 'woolPink'); });
  fill(cx - 3, 6, cz - 2, cx + 3, 6, cz - 2, 'woolRose');
  put(cx, 2, cz, 'log'); // tocadiscos
  solid(cx - 3.5, cz - 2.5, cx + 3.5, cz + 2.5);
}
stage(11, 13);

// Torres
function tower(cx, cz, roof) {
  fill(cx - 2, 1, cz - 2, cx + 2, 7, cz + 2, 'cobble');
  fill(cx - 1, 1, cz - 1, cx + 1, 6, cz + 1, 'air');
  put(cx, 1, cz + 2, 'air'); put(cx, 2, cz + 2, 'air');
  for (let x = cx - 2; x <= cx + 2; x++) for (let z = cz - 2; z <= cz + 2; z++) if ((x === cx - 2 || x === cx + 2 || z === cz - 2 || z === cz + 2) && (x + z) % 2 === 0) put(x, 8, z, 'cobble');
  fill(cx - 1, 8, cz - 1, cx + 1, 8, cz + 1, roof); fill(cx - 1, 9, cz - 1, cx + 1, 9, cz + 1, roof); put(cx, 10, cz, roof); put(cx, 11, cz, roof);
  [4, 6].forEach(y => { put(cx, y, cz + 2, 'glass'); put(cx - 2, y, cz, 'glass'); put(cx + 2, y, cz, 'glass'); });
  solid(cx - 2.5, cz - 2.5, cx + 2.5, cz + 2.5);
}
tower(-9, -12, 'woolLilac');
tower(9, -12, 'woolPink');

// Castillo: contacto
function castle(cx, cz) {
  const x1 = cx - 6, x2 = cx + 6, z1 = cz - 4, z2 = cz + 3;
  fill(x1, 1, z1, x2, 5, z2, 'quartz'); fill(x1 + 1, 1, z1 + 1, x2 - 1, 5, z2 - 1, 'air');
  fill(x1 + 1, 1, z1 + 1, x2 - 1, 1, z2 - 1, 'woolRose');
  fill(cx - 1, 1, z2, cx + 1, 3, z2, 'air'); fill(cx - 2, 4, z2, cx + 2, 4, z2, 'gold');
  for (let x = x1; x <= x2; x++) if (x % 2 === 0) { put(x, 6, z1, 'quartz'); put(x, 6, z2, 'quartz'); }
  for (let z = z1; z <= z2; z++) if (z % 2 === 0) { put(x1, 6, z, 'quartz'); put(x2, 6, z, 'quartz'); }
  [[x1, z1], [x2, z1], [x1, z2], [x2, z2]].forEach(([x, z]) => {
    fill(x - 1, 1, z - 1, x + 1, 8, z + 1, 'cobble');
    fill(x - 1, 9, z - 1, x + 1, 9, z + 1, 'woolPink'); put(x, 10, z, 'woolPink'); put(x, 11, z, 'woolRose');
  });
  fill(cx - 2, 1, cz - 2, cx + 2, 9, cz, 'quartz'); fill(cx - 2, 10, cz - 2, cx + 2, 10, cz, 'gold');
  fill(cx - 1, 11, cz - 1, cx + 1, 11, cz - 1, 'woolPink'); put(cx, 12, cz - 1, 'woolPink');
  [[cx - 3, z2 + 1], [cx + 3, z2 + 1]].forEach(([x, z]) => { put(x, 1, z, 'gold'); });
  solid(x1 - 1.5, z1 - 1.5, x2 + 1.5, z2 + 1.5);
}
castle(0, -20);
// Escalera de la línea de tiempo: sube por dentro del castillo hasta la azotea
const stairSteps = [
  [3, 2, -19], [4, 2, -19], [3, 3, -20], [4, 3, -20], [3, 4, -21], [4, 4, -21], [3, 5, -22], [4, 5, -22],
  [3, 5, -23], [4, 5, -23], [2, 6, -23], [1, 7, -23], [0, 8, -23], [-1, 9, -23], [-2, 9, -23]
];
stairSteps.forEach(([x, y, z]) => { put(x, y, z, 'planks'); });
// los escalones que marcan un hito son de oro
[[4, 2, -19], [4, 4, -21], [4, 5, -23], [1, 7, -23], [-1, 9, -23]].forEach(([x, y, z]) => put(x, y, z, 'gold'));
put(-3, 9, -23, 'planks');
// Granja: corral con cerca de troncos y tablas, puerta al sur
const CORRAL = { x1: -4, x2: 4, z1: -7, z2: -3 };
for (let x = CORRAL.x1; x <= CORRAL.x2; x++) for (const z of [CORRAL.z1, CORRAL.z2]) if (!(z === CORRAL.z2 && x === 0)) put(x, 1, z, (x % 2 === 0) ? 'log' : 'planks');
for (let z = CORRAL.z1; z <= CORRAL.z2; z++) for (const x of [CORRAL.x1, CORRAL.x2]) put(x, 1, z, (z % 2 === 0) ? 'log' : 'planks');
for (let x = CORRAL.x1 + 1; x < CORRAL.x2; x++) for (let z = CORRAL.z1 + 1; z < CORRAL.z2; z++) put(x, 0, z, 'grass');
put(-3, 1, -6, 'woolRose'); put(3, 1, -6, 'woolRose'); // fardos de heno rosa
// barandas de vidrio para no caerse fuera del castillo al subir
const freeCell = (x, y, z) => { const t = blocks.get(`${x},${y},${z}`); return !t || t === 'air'; };
for (let z = -22; z <= -19; z++) for (let y = 2; y <= 10; y++) if (freeCell(5, y, z)) put(5, y, z, 'glass');
for (let x = -5; x <= 5; x++) for (let y = 6; y <= 12; y++) if (freeCell(x, y, -24)) put(x, y, -24, 'glass');
for (let y = 10; y <= 12; y++) for (let z = -23; z <= -19; z++) if (freeCell(-4, y, z)) put(-4, y, z, 'glass');

// Construir mallas instanciadas por tipo de bloque
const blockMeshes = [];
function buildBlocks() {
  const byType = {};
  const key = (x, y, z) => blocks.get(`${x},${y},${z}`);
  const opaque = t => t && t !== 'air' && t !== 'glass' && t !== 'leaves';
  for (const [k, t] of blocks) {
    if (t === 'air') continue;
    const [x, y, z] = k.split(',').map(Number);
    // ocultar bloques totalmente rodeados
    if (opaque(key(x + 1, y, z)) && opaque(key(x - 1, y, z)) && opaque(key(x, y + 1, z)) && opaque(key(x, y - 1, z)) && opaque(key(x, y, z + 1)) && opaque(key(x, y, z - 1))) continue;
    (byType[t] ||= []).push([x, y, z]);
  }
  const m4 = new THREE.Matrix4();
  for (const [t, list] of Object.entries(byType)) {
    const mesh = new THREE.InstancedMesh(unit, M[t], list.length);
    list.forEach(([x, y, z], i) => { m4.makeTranslation(x, y, z); mesh.setMatrixAt(i, m4); });
    mesh.castShadow = t !== 'glass'; mesh.receiveShadow = true;
    scene.add(mesh); blockMeshes.push(mesh);
  }
}
buildBlocks();

// Agua animada
const waterTex = texture((g, r) => speckle(g, r, ['#9fd8ff', '#b4e2ff', '#8ccdf8', '#c4eaff']), 21);
waterTex.wrapS = waterTex.wrapT = THREE.RepeatWrapping; waterTex.repeat.set(36, 2);
const water = new THREE.Mesh(new THREE.BoxGeometry(36, 0.7, 2), new THREE.MeshLambertMaterial({ map: waterTex, transparent: true, opacity: 0.88 }));
water.position.set(-0.5, -0.25, -0.5); water.receiveShadow = true; scene.add(water);

// Etiquetas flotantes
function label(text, color = '#db2777') {
  const c = document.createElement('canvas'); c.width = 512; c.height = 128; const g = c.getContext('2d');
  g.font = '64px "Bubblegum Sans", system-ui'; const w = Math.min(500, g.measureText(text).width + 70);
  const x = (512 - w) / 2;
  g.fillStyle = '#f5b8d3'; g.fillRect(x - 6, 14, w + 12, 100);
  g.fillStyle = '#ffffff'; g.fillRect(x, 20, w, 88);
  g.fillStyle = color; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, 256, 68);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false })); s.scale.set(4.8, 1.2, 1); s.renderOrder = 10; return s;
}

// Pantalla arcade animada sobre la torre de aplicaciones
const arcadeCanvas = document.createElement('canvas'); arcadeCanvas.width = arcadeCanvas.height = 32;
const arcadeTex = new THREE.CanvasTexture(arcadeCanvas); arcadeTex.magFilter = THREE.NearestFilter; arcadeTex.colorSpace = THREE.SRGBColorSpace;
const arcade = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.6), new THREE.MeshBasicMaterial({ map: arcadeTex }));
arcade.position.set(9, 5.6, -9.48); scene.add(arcade);
function drawArcade(t) {
  const g = arcadeCanvas.getContext('2d'); g.fillStyle = '#2b1235'; g.fillRect(0, 0, 32, 32);
  for (let i = 0; i < 6; i++) { const x = (i * 6 + Math.floor(t * 8)) % 32; g.fillStyle = ['#ec4899', '#f9a8d4', '#fcd34d', '#5eead4'][i % 4]; g.fillRect(x, 4 + (i % 3) * 3, 2, 2); }
  g.fillStyle = '#fff'; g.font = 'bold 9px monospace'; g.fillText('APPS', 5, 22);
  g.fillStyle = Math.floor(t * 2) % 2 ? '#fcd34d' : '#ec4899'; g.fillRect(4, 26, 24, 3);
  arcadeTex.needsUpdate = true;
}

// Banderas
const flags = [];
function flag(x, y, z, color) {
  const pole = new THREE.Mesh(new THREE.BoxGeometry(0.15, 3, 0.15), M.log[0]); pole.position.set(x, y + 1.5, z); pole.castShadow = true; scene.add(pole);
  const cloth = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.8, 0.08), new THREE.MeshLambertMaterial({ color })); cloth.geometry.translate(0.7, 0, 0);
  cloth.position.set(x + 0.08, y + 2.5, z); cloth.castShadow = true; scene.add(cloth); flags.push(cloth);
}
flag(0, 12.5, -21, '#ec4899'); flag(-9, 11.5, -12, '#c4b5fd'); flag(9, 11.5, -12, '#f472b6');

// Nubes de bloques
const clouds = new THREE.Group(); scene.add(clouds);
const cloudMat = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.92 });
for (let i = 0; i < 7; i++) {
  const c = new THREE.Group(); const r = rng(100 + i);
  for (let j = 0; j < 5; j++) { const b = new THREE.Mesh(unit, cloudMat); b.scale.set(2 + r() * 3, 1, 2 + r() * 2); b.position.set(r() * 5, r() * 0.6, r() * 3); c.add(b); }
  c.position.set(-40 + i * 13, 24 + r() * 4, -30 + r() * 50); clouds.add(c);
}

// Pétalos
const petalCount = 260, petalGeo = new THREE.BufferGeometry(), petalPos = new Float32Array(petalCount * 3);
for (let i = 0; i < petalCount; i++) { petalPos[i * 3] = Math.random() * 36 - 18; petalPos[i * 3 + 1] = Math.random() * 14; petalPos[i * 3 + 2] = Math.random() * 52 - 27; }
petalGeo.setAttribute('position', new THREE.BufferAttribute(petalPos, 3));
const petals = new THREE.Points(petalGeo, new THREE.PointsMaterial({ color: 0xf472b6, size: 0.18 }));
scene.add(petals);

// Notas musicales sobre el escenario
const notes = [];
for (let i = 0; i < 5; i++) {
  const s = label(['♪', '♫', '♪', '♬', '♫'][i], '#ec4899'); s.scale.set(1.6, 0.4, 1);
  s.material.opacity = 0; s.material.transparent = true; s.position.set(11, 3, 13); scene.add(s); notes.push({ s, t: i / 5 });
}

/* ---------------- PERSONAJES (cartas originales) ---------------- */
const player = new THREE.Group(); scene.add(player);
const mainRig = new THREE.Group(); player.add(mainRig);
let rig = mainRig;
let P = {}, head, crown, toolHolder;
function part(w, h, d, color, x, y, z, parent = rig) { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshLambertMaterial({ color })); m.position.set(x, y, z); m.castShadow = true; parent.add(m); return m; }
function limb(w, h, d, color, x, y, z) { const g = new THREE.Group(); g.position.set(x, y, z); rig.add(g); const m = part(w, h, d, color, 0, -h / 2, 0, g); return { g, m }; }
function baseBody(c) {
  P.legL = limb(0.26, 0.6, 0.28, c.legs, -0.15, 0.62, 0);
  P.legR = limb(0.26, 0.6, 0.28, c.legs, 0.15, 0.62, 0);
  P.body = part(0.6, 0.66, 0.34, c.body, 0, 0.95, 0);
  P.armL = limb(0.2, 0.62, 0.24, c.arms || c.body, -0.41, 1.26, 0);
  P.armR = limb(0.2, 0.62, 0.24, c.arms || c.body, 0.41, 1.26, 0);
  head = new THREE.Group(); head.position.set(0, 1.56, 0); rig.add(head);
  part(0.56, 0.56, 0.52, c.skin, 0, 0, 0, head);
  part(0.09, 0.09, 0.02, c.eyes || 0x2a1408, -0.12, 0.02, 0.265, head); part(0.09, 0.09, 0.02, c.eyes || 0x2a1408, 0.12, 0.02, 0.265, head);
  if (c.mouth !== false) part(0.12, 0.04, 0.02, 0xd9667f, 0, -0.14, 0.265, head);
}
const personajes = [
  { id: 'allison', n: 'Allison', rol: 'Constructora', rar: 'Legendaria', cost: 5, c1: '#ec4899', c2: '#fcd34d', d: 'Desarrolladora full stack. Construye mundos bloque a bloque con sus audífonos puestos.',
    build() {
      baseBody({ legs: 0x2b3a67, body: 0xec4899, skin: 0xb98263 });
      part(0.18, 0.5, 0.02, 0xffffff, 0, 1.0, 0.175);
      part(0.6, 0.18, 0.56, 0x161018, 0, 0.24, 0, head); part(0.6, 0.8, 0.14, 0x161018, 0, -0.12, -0.26, head);
      part(0.1, 0.62, 0.5, 0x161018, -0.29, -0.06, -0.02, head); part(0.1, 0.62, 0.5, 0x161018, 0.29, -0.06, -0.02, head);
      part(0.66, 0.08, 0.12, 0xf9a8d4, 0, 0.36, 0, head); part(0.1, 0.22, 0.22, 0xec4899, -0.34, 0.02, 0, head); part(0.1, 0.22, 0.22, 0xec4899, 0.34, 0.02, 0, head);
    } },
  { id: 'caballera', n: 'Caballera Rosa', rol: 'Defensora', rar: 'Épica', cost: 4, c1: '#a78bfa', c2: '#f472b6', d: 'Armadura brillante y capa rosa. Protege la torre de proyectos de cualquier bug.',
    build() {
      baseBody({ legs: 0x9ca3af, body: 0xd1d5db, arms: 0xc0c4cc, skin: 0xcfd3da, eyes: 0x1f2937, mouth: false });
      part(0.62, 0.1, 0.36, 0xf472b6, 0, 0.66, 0); part(0.55, 0.7, 0.06, 0xf472b6, 0, 0.98, -0.2);
      part(0.6, 0.1, 0.56, 0xb8bcc6, 0, 0.27, 0, head); part(0.6, 0.06, 0.04, 0x1f2937, 0, 0.03, 0.27, head);
      part(0.08, 0.3, 0.4, 0xec4899, 0, 0.45, -0.02, head); part(0.08, 0.2, 0.2, 0xf9a8d4, 0, 0.62, -0.12, head);
    } },
  { id: 'arquera', n: 'Arquera del Bosque', rol: 'Exploradora', rar: 'Especial', cost: 3, c1: '#14b8a6', c2: '#86efac', d: 'Ojo de águila: encuentra los bloques de habilidad escondidos entre los cerezos.',
    build() {
      baseBody({ legs: 0x5b4636, body: 0x2f855a, arms: 0x2f855a, skin: 0xe6b48f });
      part(0.64, 0.66, 0.6, 0x276749, 0, 0.08, -0.03, head); part(0.5, 0.36, 0.04, 0xe6b48f, 0, -0.03, 0.27, head);
      part(0.09, 0.09, 0.02, 0x3b2a1a, -0.12, 0.02, 0.29, head); part(0.09, 0.09, 0.02, 0x3b2a1a, 0.12, 0.02, 0.29, head);
      part(0.22, 0.6, 0.18, 0x7a4e3a, 0.16, 1.0, -0.26); part(0.04, 0.2, 0.04, 0xfcd34d, 0.12, 1.36, -0.26); part(0.04, 0.2, 0.04, 0xfcd34d, 0.2, 1.38, -0.26);
    } },
  { id: 'maga', n: 'Maga de Código', rol: 'Hechicera', rar: 'Épica', cost: 4, c1: '#8b5cf6', c2: '#c4b5fd', d: 'Convierte ideas en funciones con un toque de su varita. Sus hechizos compilan a la primera.',
    build() {
      baseBody({ legs: 0x5b21b6, body: 0x7c3aed, arms: 0x7c3aed, skin: 0xd39b78 });
      part(0.64, 0.34, 0.4, 0x7c3aed, 0, 0.5, 0); part(0.12, 0.12, 0.02, 0xfcd34d, 0.12, 1.1, 0.175);
      part(0.6, 0.6, 0.12, 0xf5f5f5, 0, -0.08, -0.25, head); part(0.6, 0.12, 0.56, 0xf5f5f5, 0, 0.24, 0, head);
      part(0.8, 0.08, 0.8, 0x5b21b6, 0, 0.32, 0, head); part(0.46, 0.3, 0.46, 0x6d28d9, 0, 0.5, 0, head); part(0.28, 0.26, 0.28, 0x7c3aed, 0.04, 0.76, -0.04, head); part(0.12, 0.12, 0.12, 0xfcd34d, 0.08, 0.92, -0.06, head);
    } },
  { id: 'robot', n: 'Byte', rol: 'Robot programador', rar: 'Común', cost: 2, c1: '#0ea5e9', c2: '#f9a8d4', d: 'Pequeño robot que nunca se cansa de correr pruebas. Su antena capta wifi y buenas ideas.',
    build() {
      baseBody({ legs: 0x64748b, body: 0x94a3b8, arms: 0x7c8ea3, skin: 0xb8c4d2, eyes: 0x22d3ee, mouth: false });
      part(0.42, 0.3, 0.02, 0x0f172a, 0, 0.02, 0.265, head); part(0.09, 0.09, 0.03, 0x22d3ee, -0.1, 0.05, 0.275, head); part(0.09, 0.09, 0.03, 0x22d3ee, 0.1, 0.05, 0.275, head); part(0.16, 0.03, 0.03, 0xf472b6, 0, -0.06, 0.275, head);
      part(0.04, 0.3, 0.04, 0x475569, 0, 0.42, 0, head); part(0.12, 0.12, 0.12, 0xf472b6, 0, 0.6, 0, head);
      part(0.3, 0.2, 0.04, 0x0f172a, 0, 1.02, 0.18); part(0.06, 0.06, 0.02, 0x22c55e, -0.07, 1.04, 0.205); part(0.06, 0.06, 0.02, 0xf472b6, 0.07, 1.04, 0.205);
    } },
  { id: 'martilla', n: 'Martilla de Cristal', rol: 'Guerrera', rar: 'Épica', cost: 5, c1: '#c084fc', c2: '#67e8f9', d: 'Rompe muros de bugs con su martillo de cristal. Lleva trenzas rosas y una armadura lila.',
    build() {
      baseBody({ legs: 0x6d28d9, body: 0xa78bfa, arms: 0xc4b5fd, skin: 0xe8b796 });
      part(0.64, 0.12, 0.38, 0xfcd34d, 0, 0.7, 0); part(0.66, 0.22, 0.38, 0x8b5cf6, 0, 1.18, 0);
      part(0.6, 0.2, 0.56, 0xf472b6, 0, 0.23, 0, head); part(0.12, 0.6, 0.12, 0xf472b6, -0.3, -0.25, -0.12, head); part(0.12, 0.6, 0.12, 0xf472b6, 0.3, -0.25, -0.12, head);
      part(0.14, 0.14, 0.14, 0xfcd34d, -0.3, -0.58, -0.12, head); part(0.14, 0.14, 0.14, 0xfcd34d, 0.3, -0.58, -0.12, head);
      part(0.08, 0.9, 0.08, 0x7a4e3a, -0.36, 1.05, -0.24); part(0.5, 0.32, 0.32, 0x67e8f9, -0.36, 1.55, -0.24); part(0.3, 0.2, 0.36, 0xa5f3fc, -0.36, 1.55, -0.24);
    } },
  { id: 'golem', n: 'Gólem de Musgo', rol: 'Tanque', rar: 'Épica', cost: 7, c1: '#65a30d', c2: '#a3e635', d: 'Lento pero imparable. Crece flores rosas en la espalda y carga con los proyectos más pesados.',
    build() {
      baseBody({ legs: 0x78716c, body: 0x8a8580, arms: 0x78716c, skin: 0x9ca3af, eyes: 0x84cc16, mouth: false });
      P.body.scale.set(1.35, 1.1, 1.3); P.armL.g.position.x = -0.55; P.armR.g.position.x = 0.55; P.armL.m.scale.set(1.6, 1.15, 1.4); P.armR.m.scale.set(1.6, 1.15, 1.4);
      part(0.62, 0.14, 0.58, 0x4d7c0f, 0, 0.28, 0, head); part(0.84, 0.16, 0.5, 0x4d7c0f, 0, 1.3, 0);
      part(0.12, 0.12, 0.12, 0xf472b6, -0.2, 1.42, -0.1); part(0.12, 0.12, 0.12, 0xf9a8d4, 0.16, 1.42, 0.08); part(0.12, 0.12, 0.12, 0xfcd34d, 0.05, 0.4, -0.1, head);
      part(0.3, 0.06, 0.02, 0x3f3f46, 0, -0.14, 0.265, head);
    } },
  { id: 'dj', n: 'Calaverita DJ', rol: 'Animadora', rar: 'Rara', cost: 3, c1: '#f43f5e', c2: '#fda4af', d: 'Pone el ritmo en el escenario. Cuando suena la música baila más que nadie.',
    build() {
      baseBody({ legs: 0x1f2937, body: 0x111827, arms: 0xf3f4f6, skin: 0xf9fafb, eyes: 0x111827, mouth: false });
      P.legL.m.scale.set(0.6, 1, 0.6); P.legR.m.scale.set(0.6, 1, 0.6); P.armL.m.scale.set(0.6, 1, 0.6); P.armR.m.scale.set(0.6, 1, 0.6);
      part(0.14, 0.14, 0.02, 0x111827, -0.12, 0.02, 0.266, head); part(0.14, 0.14, 0.02, 0x111827, 0.12, 0.02, 0.266, head);
      [-0.15, -0.05, 0.05, 0.15].forEach(x => part(0.06, 0.08, 0.02, 0x9ca3af, x, -0.17, 0.266, head));
      part(0.66, 0.08, 0.12, 0xf43f5e, 0, 0.32, 0, head); part(0.12, 0.26, 0.26, 0xfda4af, -0.34, 0.02, 0, head); part(0.12, 0.26, 0.26, 0xfda4af, 0.34, 0.02, 0, head);
      [0.85, 1.0, 1.15].forEach(y => part(0.5, 0.05, 0.02, 0xf9fafb, 0, y, 0.175));
    } },
  { id: 'minera', n: 'Minera Exploradora', rol: 'Recolectora', rar: 'Especial', cost: 3, c1: '#f59e0b', c2: '#fde68a', d: 'Experta en encontrar bloques brillantes. Su linterna ilumina hasta las cuevas más oscuras.',
    build() {
      baseBody({ legs: 0x92400e, body: 0x1d4ed8, arms: 0xc2410c, skin: 0xc68a6a });
      part(0.6, 0.66, 0.06, 0x2563eb, 0, 0.92, 0.18); part(0.08, 0.5, 0.02, 0xfcd34d, -0.2, 1.08, 0.215); part(0.08, 0.5, 0.02, 0xfcd34d, 0.2, 1.08, 0.215);
      part(0.64, 0.24, 0.6, 0xfbbf24, 0, 0.3, 0, head); part(0.7, 0.06, 0.66, 0xf59e0b, 0, 0.19, 0, head); part(0.16, 0.14, 0.06, 0xfef9c3, 0, 0.3, 0.31, head);
      part(0.6, 0.4, 0.12, 0x6b3f1d, 0, -0.08, -0.25, head);
    } },
  { id: 'alquimista', n: 'Alquimista Lila', rol: 'Sanadora', rar: 'Épica', cost: 4, c1: '#a855f7', c2: '#f0abfc', d: 'Mezcla pociones de café y buenas ideas. Arregla cualquier error con un frasquito.',
    build() {
      baseBody({ legs: 0x581c87, body: 0x7e22ce, arms: 0x9333ea, skin: 0xf0c8a8 });
      part(0.68, 0.66, 0.6, 0x6b21a8, 0, 0.06, -0.04, head); part(0.48, 0.34, 0.04, 0xf0c8a8, 0, -0.03, 0.27, head);
      part(0.09, 0.09, 0.02, 0x4c1d95, -0.12, 0.02, 0.295, head); part(0.09, 0.09, 0.02, 0x4c1d95, 0.12, 0.02, 0.295, head); part(0.2, 0.2, 0.2, 0x6b21a8, 0, 0.42, -0.2, head);
      part(0.66, 0.08, 0.38, 0xfcd34d, 0, 0.7, 0);
      [[-0.2, 0x22d3ee], [0, 0xf472b6], [0.2, 0x84cc16]].forEach(([x, c]) => { part(0.1, 0.14, 0.08, c, x, 0.62, 0.2); part(0.05, 0.05, 0.05, 0xf5f5f5, x, 0.72, 0.2); });
    } },
];
let charIndex = 0;
function buildCharacter(i) {
  charIndex = i; rig = mainRig;
  while (rig.children.length) rig.remove(rig.children[0]);
  P = {}; personajes[i].build();
  crown = new THREE.Group(); crown.position.set(0, personajes[i].id === 'maga' ? 1.02 : 0.44, 0); head.add(crown); crown.visible = minedCount === habilidades.length;
  part(0.46, 0.12, 0.42, 0xfcd34d, 0, 0, 0, crown); [[-0.17, 0.17], [0.17, 0.17], [-0.17, -0.15], [0.17, -0.15], [0, 0.17]].forEach(([x, z]) => part(0.1, 0.14, 0.1, 0xfbbf24, x, 0.12, z, crown));
  toolHolder = new THREE.Group(); toolHolder.position.set(0, -0.58, 0.06); P.armR.g.add(toolHolder); buildTool();
}
const finder = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(12, 10); g.lineTo(52, 10); g.lineTo(32, 46); g.closePath(); g.fill();
  g.fillStyle = '#ec4899'; g.beginPath(); g.moveTo(18, 14); g.lineTo(46, 14); g.lineTo(32, 38); g.closePath(); g.fill();
  const t = new THREE.CanvasTexture(c); const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false, transparent: true }));
  sp.scale.set(0.7, 0.7, 1); sp.renderOrder = 20; scene.add(sp); return sp;
})();
const pShadow = new THREE.Mesh(new THREE.CircleGeometry(0.42, 16), new THREE.MeshBasicMaterial({ color: 0x9d174d, transparent: true, opacity: 0.18 }));
pShadow.rotation.x = -Math.PI / 2; pShadow.position.y = 0.52; scene.add(pShadow);
player.position.set(0, 0.5, 18);
player.rotation.y = Math.PI;
let minedCount = 0;

/* ---------------- LUGARES ---------------- */
const lugares = [
  { id: 'casa', n: 'Sobre mí', l: 'La casa · Sobre mí', door: [-11, 17.6], at: [-11, 13, 10.5], c: '#ec4899', q: 'Conoce a la jugadora (la casa)', open: () => panelCasa() },
  { id: 'musica', n: 'Música', l: 'Escenario · Música', door: [11, 17.2], alt: [11, 14.4], at: [11, 13, 8.2], c: '#f472b6', q: 'Pon música en el escenario', open: () => panelMusica() },
  { id: 'proyectos', n: 'Proyectos', l: 'Torre de proyectos', door: [-9, -8.6], at: [-9, -12, 13.6], c: '#a78bfa', q: 'Explora la torre de proyectos', open: () => panelProyectos() },
  { id: 'apps', n: 'Aplicaciones', l: 'Torre arcade · Apps', door: [9, -8.6], at: [9, -12, 13.6], c: '#db2777', q: 'Juega en la torre arcade', open: () => panelApps() },
  { id: 'castillo', n: 'Contacto', l: 'Castillo · Sube las gradas', door: [0, -14.6], at: [0, -20, 15], c: '#d97706', q: 'Llega al castillo (contacto)', open: () => panelCastillo() },
  { id: 'granja', n: 'Granja', l: 'Granja · Corral', door: [0, -2.4], at: [0, -5, 3.4], c: '#16a34a', open: () => toast('➰', 'LA GRANJA', 'Junta a los animales', 'Busca los 6 animales por la arena, lázalos con E y tráelos al corral. Cada uno te muestra un proyecto.', '#16a34a') },
  { id: 'cofre', n: 'Mi CV', l: 'Cofre · Mi CV', door: [5.5, -13.9], at: [5.5, -15.5, 2.6], c: '#0d9488', open: () => panelCofre() }
];
const visited = new Set();
const hitMeshes = [];
const hitMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
lugares.forEach(L => {
  const s = label(L.l, L.c); s.position.set(L.at[0], L.at[2], L.at[1]); scene.add(s); L.sprite = s;
});
[['casa', -11, 13, 8, 9, 8], ['musica', 11, 13, 8, 6, 6], ['proyectos', -9, -12, 6, 12, 6], ['apps', 9, -12, 6, 12, 6], ['castillo', 0, -20, 15, 12, 10], ['cofre', 5.5, -15.5, 1.4, 1.4, 1.2]].forEach(([id, x, z, w, h, d]) => {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), hitMat); m.position.set(x, h / 2, z); m.userData = { kind: 'loc', id }; scene.add(m); hitMeshes.push(m);
});
// Cofre del CV
const chest = new THREE.Group(); chest.position.set(5.5, 0.5, -15.5); scene.add(chest);
part(1.1, 0.6, 0.8, 0x9a6744, 0, 0.3, 0, chest); const lid = part(1.14, 0.3, 0.84, 0xb07a55, 0, 0.72, 0, chest); part(0.2, 0.26, 0.06, 0xfcd34d, 0, 0.55, 0.42, chest);
solid(4.8, -16.1, 6.2, -14.9);

/* ---------------- BLOQUES DE HABILIDAD ---------------- */
const ores = [];
function oreTexture(color, seed) {
  return texture((g, r) => { speckle(g, r, ['#c4bfc8', '#b8b2bd', '#d0cbd4', '#aaa3b0']); g.fillStyle = color; for (let i = 0; i < 7; i++) { const x = 1 + Math.floor(r() * 12), y = 1 + Math.floor(r() * 12); g.fillRect(x, y, 3, 2); g.fillRect(x + 1, y + 2, 1, 1); } g.fillStyle = '#ffffff'; for (let i = 0; i < 5; i++) g.fillRect(Math.floor(r() * 16), Math.floor(r() * 16), 1, 1); }, seed);
}
const oreCells = new Set();
habilidades.forEach((h, i) => {
  const [x, z] = orePos[i];
  oreCells.add(`${x},1,${z}`);
  const m = new THREE.Mesh(unit, new THREE.MeshLambertMaterial({ map: oreTexture(h.c, 300 + i), emissive: new THREE.Color(h.c), emissiveIntensity: 0.18 }));
  m.position.set(x, 1, z); m.castShadow = true; m.userData = { kind: 'ore', i }; scene.add(m); hitMeshes.push(m);
  const tag = label(h.n, h.c); tag.scale.set(4, 1, 1); tag.position.set(x, 2.5, z); tag.visible = false; scene.add(tag);
  ores.push({ m, tag, i, x, z, mined: false });
});

/* ---------------- HERRAMIENTAS ---------------- */
const picos = [
  { n: 'Pico de madera', c: 0xb07a55, css: '#b07a55', t: 1.5, from: 0 },
  { n: 'Pico de piedra', c: 0x9a98a6, css: '#9a98a6', t: 1.1, from: 4 },
  { n: 'Pico de hierro', c: 0xeef0f4, css: '#cbd5e1', t: 0.8, from: 8 },
  { n: 'Pico de oro', c: 0xfcd34d, css: '#fbbf24', t: 0.55, from: 12 },
  { n: 'Pico de diamante', c: 0x5eead4, css: '#2dd4bf', t: 0.35, from: 16 }
];
const tier = () => { let k = 0; picos.forEach((x, i) => { if (minedCount >= x.from) k = i; }); return k; };
function buildTool() {
  if (!toolHolder) return;
  while (toolHolder.children.length) toolHolder.remove(toolHolder.children[0]);
  const pk = picos[tier()];
  part(0.07, 0.7, 0.07, 0x7a4e3a, 0, 0, 0.18, toolHolder).rotation.x = Math.PI / 2;
  const headT = new THREE.Group(); headT.position.set(0, 0, 0.52); toolHolder.add(headT);
  part(0.62, 0.1, 0.1, pk.c, 0, 0, 0, headT);
  part(0.1, 0.1, 0.1, pk.c, -0.3, -0.08, 0, headT); part(0.1, 0.1, 0.1, pk.c, 0.3, -0.08, 0, headT);
  updateToolHud();
}
function updateToolHud() {
  const pk = picos[tier()], el = $('#toolName'); if (!el) return;
  el.textContent = pk.n; $('#toolIcon').style.background = pk.css;
}

/* ---------------- MOVIMIENTO ---------------- */
const keys = {};
let target = null, waypoints = [], onArrive = null, stuckT = 0, lastDist = Infinity, mining = null;
let feet = 0.5, vy = 0, onGround = true, coyote = 0, jumpReq = 0, autoWalk = false;
const PR = 0.3, PH = 1.7, JUMP = 8.6, GRAV = 26;
const chestBox = [4.85, -16, 6.15, -15, 1.5];
function solidCell(i, j, k) { const t = blocks.get(`${i},${j},${k}`); return (t && t !== 'air') || oreCells.has(`${i},${j},${k}`); }
function hits(x, y, z) {
  if (x < -17.6 || x > 16.6 || z < -27.6 || z > 24.6) return true;
  if (z + PR > -1.5 && z - PR < 0.5 && !bridges.some(([a, b]) => x - PR > a - 0.5 && x + PR < b + 0.5)) return true;
  const i0 = Math.round(x - PR), i1 = Math.round(x + PR), k0 = Math.round(z - PR), k1 = Math.round(z + PR), j0 = Math.ceil(y - 0.5 + 0.001), j1 = Math.ceil(y + PH + 0.5 - 0.001) - 1;
  for (let i = i0; i <= i1; i++) for (let k = k0; k <= k1; k++) for (let j = j0; j <= j1; j++) if (solidCell(i, j, k)) return true;
  if (x + PR > chestBox[0] && x - PR < chestBox[2] && z + PR > chestBox[1] && z - PR < chestBox[3] && y < chestBox[4] - 0.01) return true;
  return false;
}
function groundBelow(x, z, from) {
  const i = Math.round(x), k = Math.round(z);
  for (let j = Math.round(from - 0.45); j >= -2; j--) if (solidCell(i, j, k)) return j + 0.5;
  return -1.5;
}
function blocked(x, z) { const g = groundBelow(x, z, 8); return hits(x, g, z); }
function planTo(tx, tz, cb) {
  const p = player.position; waypoints = [];
  const side = z => z > -0.5;
  if (side(p.z) !== side(tz)) {
    const bx = [-9, 9].sort((a, b) => (Math.abs(p.x - a) + Math.abs(tx - a)) - (Math.abs(p.x - b) + Math.abs(tx - b)))[0];
    const near = side(p.z) ? 2.2 : -3.2, far = side(p.z) ? -3.2 : 2.2;
    waypoints.push([bx, near], [bx, far]);
  }
  waypoints.push([tx, tz]); target = waypoints.shift(); onArrive = cb; stuckT = 0; lastDist = Infinity;
}
function travel(L) { closeMenu(); planTo(L.door[0], L.door[1], () => openPlace(L)); }

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
      h.done = true; tlShown++; h.sprite.material.opacity = 1; sfx(h.i === 5 ? 'win' : 'pop');
      const box = $('#tlHud'); box.hidden = false;
      const li = document.createElement('li'); if (h.now) li.className = 'now';
      li.innerHTML = '<small></small><b></b><p></p>'; li.querySelector('small').textContent = h.f; li.querySelector('b').textContent = h.t; li.querySelector('p').textContent = h.d;
      $('#tlList').appendChild(li); $('#tlCount').textContent = tlShown;
      if (h.i === 5) { confetti(); toast('♛', 'LLEGASTE A LA CIMA', 'Bloque a bloque', 'Recorriste toda mi historia. Hay una cama para descansar.', '#d97706'); }
    }
  }
}
$('#tlClose').addEventListener('click', () => $('#tlHud').hidden = true);

// Cama en la azotea: al acostarte vuelves al inicio
const bed = new THREE.Group(); bed.position.set(1, 10.5, -20); scene.add(bed);
part(2, 0.3, 1, 0x7a4e3a, 0, 0.15, 0, bed); part(1.96, 0.18, 0.96, 0xec4899, 0.18, 0.39, 0, bed); part(0.5, 0.2, 0.9, 0xffffff, -0.7, 0.4, 0, bed);
part(0.1, 0.7, 1, 0x7a4e3a, -1, 0.35, 0, bed); part(0.1, 0.45, 1, 0x7a4e3a, 1, 0.22, 0, bed);
put(0, 10, -20, 'gold'); put(1, 10, -20, 'gold'); put(2, 10, -20, 'gold');
const bedSign = label('Cama · Volver al inicio', '#9d174d'); bedSign.scale.set(4.4, 1.1, 1); bedSign.position.set(1, 12.6, -20); scene.add(bedSign);
let sleeping = false;
function sleep() {
  if (sleeping) return; sleeping = true; sfx('open');
  player.position.set(1.2, 10.5, -20); feet = 10.9; vy = 0; player.rotation.y = -Math.PI / 2;
  rig.rotation.z = Math.PI / 2; rig.position.y = 0.25;
  const f = $('#fade'); f.hidden = false; requestAnimationFrame(() => f.classList.add('on'));
  setTimeout(() => {
    rig.rotation.z = 0; rig.position.y = 0;
    player.position.set(0, 0.5, 18); feet = 0.5; vy = 0; player.rotation.y = Math.PI;
    camPos.set(0, 22, 31);
    f.classList.remove('on'); setTimeout(() => { f.hidden = true; sleeping = false; }, 900);
    toast('☀', 'AMANECIÓ', '¡Volviste al inicio!', 'Dormiste en el castillo y despertaste en la entrada de la arena.');
  }, 2200);
}


/* ---------------- MODO NOCHE Y MONSTRUOS ---------------- */
const nightSky = (() => {
  const c = document.createElement('canvas'); c.width = 2; c.height = 256; const g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, '#0f0a24'); gr.addColorStop(0.6, '#2a1747'); gr.addColorStop(1, '#4a2160');
  g.fillStyle = gr; g.fillRect(0, 0, 2, 256); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
const starGeo = new THREE.BufferGeometry(), starPos = new Float32Array(500 * 3);
for (let i = 0; i < 500; i++) { const a = Math.random() * Math.PI * 2, r = 70 + Math.random() * 30; starPos[i * 3] = Math.cos(a) * r; starPos[i * 3 + 1] = 25 + Math.random() * 45; starPos[i * 3 + 2] = Math.sin(a) * r; }
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xfdf2ff, size: 0.6, fog: false })); stars.visible = false; scene.add(stars);
const moon = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 32; const g = c.getContext('2d');
  g.fillStyle = '#fff7fb'; g.fillRect(4, 4, 24, 24); g.fillStyle = '#f3d6e6'; [[9, 9, 5, 4], [18, 16, 6, 5], [11, 20, 3, 3]].forEach(a => g.fillRect(...a));
  const t = new THREE.CanvasTexture(c); t.magFilter = THREE.NearestFilter; const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, fog: false })); sp.scale.set(9, 9, 1); sp.visible = false; scene.add(sp); return sp;
})();
const lantern = new THREE.PointLight(0xffc4e1, 0, 11, 1.4); scene.add(lantern);
let night = false, spawnT = 0;
const monsters = [];
function setNight(on) {
  night = on;
  scene.background = on ? nightSky : window.__daySky;
  scene.fog.color.set(on ? 0x2a1747 : 0xffe4f1); scene.fog.near = on ? 25 : 60; scene.fog.far = on ? 75 : 120;
  hemi.intensity = on ? 0.32 : 1.05; hemi.color.set(on ? 0x9aa4ff : 0xfff4fa); hemi.groundColor.set(on ? 0x3b2050 : 0xd8a7c0);
  sun.intensity = on ? 0.35 : 1.7; sun.color.set(on ? 0xb9c4ff : 0xffffff);
  lantern.intensity = on ? 9 : 0; stars.visible = moon.visible = on;
  ores.forEach(o => { if (!o.mined) o.m.material.emissiveIntensity = on ? 0.7 : 0.18; });
  const b = $('#nightBtn'); b.setAttribute('aria-pressed', on); b.textContent = on ? '☀' : '☾'; b.setAttribute('aria-label', on ? 'Cambiar a modo día' : 'Cambiar a modo noche');
  spawnT = 0;
  if (on) {
    if (minedCount < habilidades.length) toast('☾', 'CAYÓ LA NOCHE', '¡Cuidado con los monstruos!', 'Aparece uno cada 20 segundos y te persigue. Pica un bloque de habilidad para hacerlos desaparecer.', '#7c3aed');
    else toast('☾', 'NOCHE TRANQUILA', 'Ya no hay monstruos', 'Encontraste todas las habilidades: la arena es tuya.', '#7c3aed');
  } else { clearMonsters(false); toast('☀', 'AMANECIÓ', 'Modo día', 'Los monstruos se fueron.'); }
}

function monsterModel(kind) {
  const g = new THREE.Group(); const legs = [];
  if (kind === 'esqueleto') {
    const bone = 0xf1ece4, dark = 0x2b2033;
    [-0.13, 0.13].forEach(x => { const l = new THREE.Group(); l.position.set(x, 0.62, 0); g.add(l); part(0.12, 0.62, 0.12, bone, 0, -0.31, 0, l); legs.push(l); });
    part(0.5, 0.08, 0.2, bone, 0, 0.66, 0, g); part(0.08, 0.62, 0.08, bone, 0, 0.98, 0, g);
    [0.82, 0.96, 1.1].forEach(y => part(0.46, 0.06, 0.24, bone, 0, y, 0, g));
    [-0.3, 0.3].forEach(x => { const a = new THREE.Group(); a.position.set(x, 1.24, 0); a.rotation.x = -1.3; g.add(a); part(0.1, 0.62, 0.1, bone, 0, -0.31, 0, a); legs.push(a); });
    part(0.52, 0.5, 0.48, bone, 0, 1.54, 0, g);
    part(0.13, 0.13, 0.02, dark, -0.12, 1.57, 0.245, g); part(0.13, 0.13, 0.02, dark, 0.12, 1.57, 0.245, g);
    part(0.07, 0.07, 0.02, 0xec4899, -0.12, 1.57, 0.26, g); part(0.07, 0.07, 0.02, 0xec4899, 0.12, 1.57, 0.26, g);
    part(0.3, 0.05, 0.02, dark, 0, 1.38, 0.245, g);
    part(0.56, 0.12, 0.52, 0xbe185d, 0, 1.76, 0, g); // pañoleta
  } else if (kind === 'arana') {
    const body = 0x3b1f4f;
    part(0.9, 0.5, 1.0, body, 0, 0.55, -0.15, g); part(0.6, 0.45, 0.5, 0x4c2a63, 0, 0.55, 0.5, g);
    [[-0.15, 0.62, 0.76], [0.15, 0.62, 0.76], [-0.08, 0.5, 0.76], [0.08, 0.5, 0.76]].forEach(([x, y, z]) => part(0.1, 0.1, 0.02, 0xf472b6, x, y, z, g));
    part(0.6, 0.06, 0.6, 0xec4899, 0, 0.81, -0.2, g);
    for (let i = 0; i < 4; i++) for (const side of [-1, 1]) {
      const l = new THREE.Group(); l.position.set(side * 0.42, 0.6, 0.35 - i * 0.28); l.rotation.z = side * 0.7; g.add(l);
      part(0.9, 0.08, 0.08, 0x2b1638, side * 0.45, 0, 0, l); legs.push(l);
    }
  } else {
    // Petardín: bomba andante original con mecha encendida
    [-0.15, 0.15].forEach(x => { const l = new THREE.Group(); l.position.set(x, 0.32, 0); g.add(l); part(0.18, 0.32, 0.2, 0x1f1530, 0, -0.16, 0, l); legs.push(l); });
    part(0.8, 0.75, 0.8, 0x3a2a55, 0, 0.72, 0, g); part(0.84, 0.12, 0.84, 0xf472b6, 0, 0.62, 0, g); part(0.84, 0.12, 0.84, 0xf472b6, 0, 0.86, 0, g);
    part(0.16, 0.12, 0.02, 0xffffff, -0.17, 0.8, 0.41, g); part(0.16, 0.12, 0.02, 0xffffff, 0.17, 0.8, 0.41, g);
    part(0.08, 0.08, 0.02, 0x111111, -0.15, 0.78, 0.42, g); part(0.08, 0.08, 0.02, 0x111111, 0.15, 0.78, 0.42, g);
    part(0.3, 0.06, 0.02, 0x111111, 0, 0.6, 0.41, g);
    part(0.12, 0.3, 0.12, 0x7a4e3a, 0, 1.24, 0, g);
    const spark = part(0.16, 0.16, 0.16, 0xfcd34d, 0, 1.44, 0, g); spark.material.emissive = new THREE.Color(0xf59e0b); spark.material.emissiveIntensity = 1; g.userData.spark = spark;
  }
  g.traverse(o => { if (o.isMesh) o.castShadow = true; });
  return { g, legs };
}
const monsterInfo = {
  esqueleto: { n: 'Esqueleto', speed: 2.6 },
  arana: { n: 'Araña', speed: 3.4 },
  petardin: { n: 'Petardín', speed: 2.1 }
};
function spawnMonster() {
  if (monsters.length >= 6) return;
  const kinds = Object.keys(monsterInfo), kind = kinds[Math.floor(Math.random() * kinds.length)];
  const p = player.position; let pos = null;
  for (let tries = 0; tries < 40 && !pos; tries++) {
    const a = Math.random() * Math.PI * 2, r = 9 + Math.random() * 5, x = p.x + Math.cos(a) * r, z = p.z + Math.sin(a) * r;
    if (x < -15 || x > 15 || z < -25 || z > 22) continue;
    if (!blocked(x, z) && (z > -0.5) === (p.z > -0.5)) pos = [x, z];
  }
  if (!pos) return;
  const { g, legs } = monsterModel(kind); const y = groundBelow(pos[0], pos[1], 6);
  g.position.set(pos[0], y, pos[1]); g.scale.setScalar(0.01); scene.add(g);
  monsters.push({ kind, g, legs, y, t: Math.random() * 6, born: 0, cool: 0, fuse: 0 });
  poof(pos[0], y + 0.6, pos[1], 0x7c3aed); sfx('spawn');
  toast(kind === 'arana' ? '✶' : kind === 'petardin' ? '✸' : '☠', 'APARECIÓ UN MONSTRUO', monsterInfo[kind].n, 'Pica un bloque de habilidad para hacerlo desaparecer.', '#7c3aed');
}
function poof(x, y, z, color) {
  for (let i = 0; i < 16; i++) {
    const d = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.22), new THREE.MeshLambertMaterial({ color: i % 2 ? color : 0xe5e7eb }));
    d.position.set(x, y, z); d.userData.v = new THREE.Vector3((Math.random() - 0.5) * 6, 2 + Math.random() * 4, (Math.random() - 0.5) * 6); d.userData.life = 1; scene.add(d); debris.push(d);
  }
}
function killMonster(m, color = 0xf9a8d4) { scene.remove(m.g); poof(m.g.position.x, m.g.position.y + 0.6, m.g.position.z, color); }
function clearMonsters(announce) {
  if (!monsters.length) return;
  const n = monsters.length; monsters.forEach(m => killMonster(m)); monsters.length = 0;
  if (announce) { sfx('pop'); toast('✦', 'MONSTRUOS DERROTADOS', n === 1 ? '¡Desapareció el monstruo!' : `¡Desaparecieron ${n} monstruos!`, 'Romper un bloque de habilidad los espanta.', '#ec4899'); }
}
function hurt(m, power) {
  const p = player.position, dx = p.x - m.g.position.x, dz = p.z - m.g.position.z, d = Math.hypot(dx, dz) || 1;
  for (let i = 0; i < 10; i++) { const nx = p.x + dx / d * power * 0.12, nz = p.z + dz / d * power * 0.12; if (!hits(nx, feet, nz)) { p.x = nx; p.z = nz; } }
  vy = 5; onGround = false; target = null; waypoints = []; mining = null; crack.visible = false;
  const f = $('#hurt'); f.classList.remove('on'); void f.offsetWidth; f.classList.add('on'); sfx('hurt');
}
function updateMonsters(dt, t) {
  if (!started || selecting) return;
  const cleared = minedCount >= habilidades.length;
  if (cleared && monsters.length) clearMonsters(true);
  if (night && !cleared && !panelOpen) { spawnT += dt; if (spawnT >= 20) { spawnT = 0; spawnMonster(); } }
  const p = player.position;
  for (let i = monsters.length - 1; i >= 0; i--) {
    const m = monsters[i], info = monsterInfo[m.kind]; m.t += dt; m.born = Math.min(1, m.born + dt * 2.5); m.g.scale.setScalar(m.born); m.cool = Math.max(0, m.cool - dt);
    const dx = p.x - m.g.position.x, dz = p.z - m.g.position.z, d = Math.hypot(dx, dz);
    let moving = false;
    if (!panelOpen && d > 0.9 && m.fuse === 0) {
      const sp = info.speed * dt, nx = m.g.position.x + dx / d * sp, nz = m.g.position.z + dz / d * sp;
      const gy = groundBelow(nx, nz, m.y + 1.2);
      const ok = (x, z) => Math.abs(groundBelow(x, z, m.y + 1.2) - m.y) <= 1.01 && !(x < -15.4 || x > 15.4 || z < -25.4 || z > 22.4) && !(z > -1.8 && z < 0.8 && !bridges.some(([a, b]) => x > a - 0.4 && x < b + 0.4));
      if (ok(nx, nz)) { m.g.position.x = nx; m.g.position.z = nz; moving = true; }
      else if (ok(nx, m.g.position.z)) { m.g.position.x = nx; moving = true; }
      else if (ok(m.g.position.x, nz)) { m.g.position.z = nz; moving = true; }
      const gy2 = groundBelow(m.g.position.x, m.g.position.z, m.y + 1.2); m.y += (gy2 - m.y) * Math.min(1, dt * 10); m.g.position.y = m.y;
      m.g.rotation.y = Math.atan2(dx, dz);
    }
    const sw = moving ? Math.sin(m.t * (m.kind === 'arana' ? 16 : 10)) : 0;
    m.legs.forEach((l, k) => { if (m.kind === 'arana') l.rotation.x = sw * 0.4 * (k % 2 ? 1 : -1); else l.rotation.x = (m.kind === 'esqueleto' && k > 1) ? -1.3 + sw * 0.2 : sw * 0.7 * (k % 2 ? 1 : -1); });
    if (m.g.userData.spark) m.g.userData.spark.visible = Math.floor(t * 10) % 2 === 0 || m.fuse > 0;
    const close = d < 1.2 && Math.abs(feet - m.y) < 1.6;
    if (m.kind === 'petardin') {
      if (close && m.fuse === 0) { m.fuse = 0.01; sfx('fuse'); }
      if (m.fuse > 0) {
        m.fuse += dt; const k = 1 + Math.sin(m.fuse * 30) * 0.08 + m.fuse * 0.25; m.g.scale.setScalar(k);
        m.g.traverse(o => { if (o.isMesh && o !== m.g.userData.spark) o.material.emissive?.setHex(Math.floor(m.fuse * 8) % 2 ? 0x664455 : 0x000000); });
        if (m.fuse > 1.2) {
          sfx('boom'); poof(m.g.position.x, m.g.position.y + 0.6, m.g.position.z, 0xfcd34d); poof(m.g.position.x, m.g.position.y + 0.8, m.g.position.z, 0xec4899);
          if (Math.hypot(p.x - m.g.position.x, p.z - m.g.position.z) < 3) { hurt(m, 9); toast('✸', '¡BOOM!', 'Te alcanzó la explosión', 'El Petardín explotó cerca de ti.', '#f59e0b'); }
          scene.remove(m.g); monsters.splice(i, 1);
        }
      }
    } else if (close && m.cool === 0) {
      m.cool = 1.4; hurt(m, 5);
      toast(m.kind === 'arana' ? '✶' : '☠', '¡AUCH!', `Te atrapó ${m.kind === 'arana' ? 'la araña' : 'el esqueleto'}`, 'Corre con Shift o pica un bloque para salvarte.', '#e11d48');
    }
  }
  lantern.position.set(p.x, feet + 2.2, p.z);
  if (night) { moon.position.set(camLook.x - 30, 38, camLook.z - 55); stars.position.set(camLook.x, 0, camLook.z); }
}

/* ---------------- GRANJA Y ANIMALES ---------------- */
const animalesDef = [
  { id: 'vaca', n: 'Vaca Fresita', p: 0, frase: 'La vaca te trae mi proyecto más completo de consola:' },
  { id: 'cerdo', n: 'Cerdito Bit', p: 2, frase: 'El cerdito te trae el proyecto que hicimos en equipo:' },
  { id: 'oveja', n: 'Oveja Nube', p: 1, frase: 'La oveja te trae el proyecto del que más aprendí trabajando en células:' },
  { id: 'gallina', n: 'Gallina Pixel', p: 7, frase: 'La gallina te trae mi tienda hecha solo con HTML y CSS:' },
  { id: 'conejo', n: 'Conejo Byte', p: 4, frase: 'El conejo te trae la API con más pruebas que he escrito:' },
  { id: 'pato', n: 'Pato Query', p: 3, frase: 'El pato te trae mi sistema de biblioteca:' }
];
// el orden de "p" apunta a la lista de proyectos: 0 Kid-Fit, 1 Gym Manager, 2 MarisolliFlix, 3 Librarian, 4 Postulaciones, 7 CampusShop
animalesDef[0].p = 1; animalesDef[2].p = 0;
const spawnAnimal = [[-4, 3], [3, 4], [-3, 8], [11, -6], [-12, -12], [12, 18]];
function animalModel(id) {
  const g = new THREE.Group(); const legs = []; let headG = new THREE.Group(); g.add(headG);
  const leg = (x, z, h, c, w = 0.16) => { const l = new THREE.Group(); l.position.set(x, h, z); g.add(l); part(w, h, w, c, 0, -h / 2, 0, l); legs.push(l); };
  if (id === 'vaca' || id === 'cerdo' || id === 'oveja') {
    const C = { vaca: [0xfafafa, 0xf9a8d4, 0x3f3f46], cerdo: [0xf9a8d4, 0xec4899, 0xf472b6], oveja: [0xfbe4f0, 0xfbcfe8, 0x52525b] }[id];
    leg(-0.22, 0.3, 0.42, C[2]); leg(0.22, 0.3, 0.42, C[2]); leg(-0.22, -0.3, 0.42, C[2]); leg(0.22, -0.3, 0.42, C[2]);
    if (id === 'oveja') { legs.forEach(l => l.children[0].material.color.set(0xd4d4d8)); part(0.72, 0.58, 1.0, C[0], 0, 0.72, 0); }
    else part(0.64, 0.5, 0.96, C[0], 0, 0.68, 0);
    if (id === 'vaca') { part(0.66, 0.2, 0.3, C[1], 0.02, 0.8, 0.12); part(0.3, 0.24, 0.24, C[1], -0.18, 0.62, -0.26); part(0.2, 0.12, 0.2, C[1], 0, 0.42, 0.25); }
    headG.position.set(0, 0.86, 0.52);
    part(0.46, 0.42, 0.38, id === 'oveja' ? 0x71717a : C[0], 0, 0, 0.12, headG);
    part(0.3, 0.18, 0.08, C[1], 0, -0.08, 0.33, headG);
    part(0.06, 0.06, 0.02, 0x111111, -0.14, 0.08, 0.32, headG); part(0.06, 0.06, 0.02, 0x111111, 0.14, 0.08, 0.32, headG);
    if (id === 'vaca') { part(0.08, 0.12, 0.08, 0xfde68a, -0.2, 0.26, 0.05, headG); part(0.08, 0.12, 0.08, 0xfde68a, 0.2, 0.26, 0.05, headG); }
    if (id === 'cerdo') { part(0.12, 0.1, 0.06, C[0], -0.17, 0.24, 0.04, headG); part(0.12, 0.1, 0.06, C[0], 0.17, 0.24, 0.04, headG); part(0.08, 0.08, 0.08, C[1], 0, 0.62, -0.52); }
    if (id === 'oveja') part(0.5, 0.18, 0.34, C[0], 0, 0.22, 0.08, headG);
  } else if (id === 'gallina' || id === 'pato') {
    const body = id === 'gallina' ? 0xfafafa : 0xfde047;
    leg(-0.1, 0, 0.26, 0xf59e0b, 0.07); leg(0.1, 0, 0.26, 0xf59e0b, 0.07);
    part(0.42, 0.36, 0.5, body, 0, 0.44, -0.02); part(0.06, 0.24, 0.3, id === 'gallina' ? 0xf5f5f5 : 0xfacc15, -0.24, 0.46, -0.02); part(0.06, 0.24, 0.3, id === 'gallina' ? 0xf5f5f5 : 0xfacc15, 0.24, 0.46, -0.02);
    headG.position.set(0, 0.74, 0.2);
    part(0.28, 0.34, 0.24, body, 0, 0, 0, headG);
    part(0.14, 0.08, id === 'pato' ? 0.18 : 0.1, 0xf97316, 0, -0.02, 0.17, headG);
    part(0.05, 0.05, 0.02, 0x111111, -0.1, 0.08, 0.125, headG); part(0.05, 0.05, 0.02, 0x111111, 0.1, 0.08, 0.125, headG);
    if (id === 'gallina') { part(0.06, 0.12, 0.16, 0xe11d48, 0, 0.22, 0, headG); part(0.08, 0.1, 0.04, 0xe11d48, 0, -0.14, 0.13, headG); }
    else part(0.16, 0.06, 0.2, 0xec4899, 0, 0.2, 0, headG); // moñito
  } else { // conejo
    leg(-0.14, 0.14, 0.2, 0xf5e6d3, 0.12); leg(0.14, 0.14, 0.2, 0xf5e6d3, 0.12); leg(-0.16, -0.18, 0.2, 0xf5e6d3, 0.16); leg(0.16, -0.18, 0.2, 0xf5e6d3, 0.16);
    part(0.42, 0.36, 0.56, 0xf5e6d3, 0, 0.38, -0.04); part(0.16, 0.16, 0.12, 0xffffff, 0, 0.42, -0.36);
    headG.position.set(0, 0.6, 0.28);
    part(0.32, 0.3, 0.3, 0xf5e6d3, 0, 0, 0.04, headG);
    part(0.08, 0.36, 0.06, 0xf5e6d3, -0.08, 0.32, 0, headG); part(0.08, 0.36, 0.06, 0xf5e6d3, 0.08, 0.32, 0, headG);
    part(0.04, 0.26, 0.02, 0xf9a8d4, -0.08, 0.32, 0.035, headG); part(0.04, 0.26, 0.02, 0xf9a8d4, 0.08, 0.32, 0.035, headG);
    part(0.05, 0.05, 0.02, 0x111111, -0.09, 0.04, 0.2, headG); part(0.05, 0.05, 0.02, 0x111111, 0.09, 0.04, 0.2, headG); part(0.06, 0.04, 0.02, 0xec4899, 0, -0.04, 0.2, headG);
  }
  return { g, legs, headG };
}
const animals = animalesDef.map((d, i) => {
  const { g, legs, headG } = animalModel(d.id); const [x, z] = spawnAnimal[i];
  g.position.set(x, groundBelow(x, z, 4), z); g.rotation.y = Math.random() * 6.28; scene.add(g);
  const rope = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), new THREE.LineBasicMaterial({ color: 0x9a6744 }));
  rope.visible = false; rope.frustumCulled = false; scene.add(rope);
  return { ...d, i, g, legs, headG, rope, state: 'libre', goal: null, wait: Math.random() * 3, t: Math.random() * 9, y: g.position.y };
});
let penned = 0, pet = null;
const inCorral = (x, z, m = 0) => x > CORRAL.x1 + 0.5 + m && x < CORRAL.x2 - 0.5 - m && z > CORRAL.z1 + 0.5 + m && z < CORRAL.z2 - 0.5 - m;
function animalOk(x, z, from) {
  if (x < -15 || x > 15 || z < -25 || z > 22) return false;
  if (z > -1.9 && z < 0.9 && !bridges.some(([a, b]) => x > a - 0.4 && x < b + 0.4)) return false;
  return Math.abs(groundBelow(x, z, from + 1.2) - from) <= 0.6;
}
function lasso(a) {
  if (a.state === 'corral' && penned === animals.length) { choosePet(a); return; }
  if (a.state !== 'libre') return;
  a.state = 'lazo'; a.rope.visible = true; sfx('open');
  toast('➰', '¡LO LAZASTE!', a.n, 'Te seguirá a donde vayas. Llévalo al corral de la granja.', '#9a6744');
}
const farmQueue = [];
function penAnimal(a) {
  a.state = 'corral'; a.rope.visible = false; penned++; sfx('pop'); renderQuests();
  afterPen();
  if (panelOpen) { farmQueue.push([a, penned]); return; }
  showFarmCard(a, penned);
}
function showFarmCard(a, count) {
  const pr = proyectos[a.p];
  showPanel(`<p class="p-kicker">GRANJA · ${count}/${animals.length} EN EL CORRAL</p><h2 id="panelTitle">${a.n}</h2>
    <div class="detail"><div>${pixelArt(pr.t, 24, 16)}</div><div>
    <p class="lead">${a.frase}</p><h3>${pr.t}</h3><p>${pr.d}</p>
    <div class="tags">${pr.tags.map(t => `<i>${t}</i>`).join('')}</div>
    <div class="row">${pr.link ? `<a class="btn big" href="${pr.link}" target="_blank" rel="noopener">Ver código <small>en GitHub</small></a>` : ''}<button class="btn" id="farmOk">Seguir jugando</button></div>
    </div></div>`, () => $('#farmOk').addEventListener('click', closePanel));
}
function afterPen() {
  if (penned === animals.length) setTimeout(() => { sfx('win'); confetti(); toast('★', 'GRANJA COMPLETA', '¡Juntaste a todos!', 'Ganaste una mascota: entra al corral y pulsa E junto al animal que quieras.', '#16a34a'); }, 600);
}
function choosePet(a) {
  if (pet) { pet.state = 'corral'; const [x, z] = [(Math.random() * 6 - 3), -5]; pet.g.position.set(x, pet.y, z); }
  pet = a; a.state = 'mascota'; sfx('win');
  toast('♥', 'NUEVA MASCOTA', a.n, 'Ahora te acompaña por toda la arena.', '#ec4899');
}
function updateAnimals(dt, t) {
  const p = player.position; const leashed = animals.filter(a => a.state === 'lazo');
  animals.forEach(a => {
    a.t += dt; let moving = false; let tx = null, tz = null, speed = 1.2;
    if (a.state === 'lazo' || a.state === 'mascota') {
      const idx = leashed.indexOf(a), lead = a.state === 'mascota' ? null : idx > 0 ? leashed[idx - 1].g.position : null;
      const fx = lead ? lead.x : p.x, fz = lead ? lead.z : p.z, d = Math.hypot(fx - a.g.position.x, fz - a.g.position.z);
      if (d > (a.state === 'mascota' ? 1.4 : 1.6)) { tx = fx; tz = fz; speed = Math.min(9, d * 2.4); }
      if (d > 8) { a.g.position.set(fx - 1, groundBelow(fx - 1, fz, feet + 1), fz); a.y = a.g.position.y; }
      if (a.state === 'lazo' && inCorral(a.g.position.x, a.g.position.z, 0.2)) { penAnimal(a); return; }
    } else {
      a.wait -= dt;
      if (a.wait <= 0 && !a.goal) {
        for (let k = 0; k < 8 && !a.goal; k++) {
          const nx = a.g.position.x + (Math.random() - 0.5) * 6, nz = a.g.position.z + (Math.random() - 0.5) * 6;
          if (a.state === 'corral' ? inCorral(nx, nz, 0.3) : (animalOk(nx, nz, a.y) && !inCorral(nx, nz, -0.6))) a.goal = [nx, nz];
        }
        a.wait = 2 + Math.random() * 4;
      }
      if (a.goal) { tx = a.goal[0]; tz = a.goal[1]; speed = 1.1; if (Math.hypot(tx - a.g.position.x, tz - a.g.position.z) < 0.2) { a.goal = null; tx = null; } }
    }
    if (tx !== null) {
      const dx = tx - a.g.position.x, dz = tz - a.g.position.z, d = Math.hypot(dx, dz) || 1, st = Math.min(d, speed * dt);
      const nx = a.g.position.x + dx / d * st, nz = a.g.position.z + dz / d * st;
      const free = a.state === 'libre' ? (x, z) => animalOk(x, z, a.y) && !inCorral(x, z, -0.6) : a.state === 'corral' ? (x, z) => inCorral(x, z, 0.1) : (x, z) => animalOk(x, z, a.y) || a.state !== 'libre';
      if (free(nx, nz)) { a.g.position.x = nx; a.g.position.z = nz; moving = true; } else a.goal = null;
      const want = Math.atan2(dx, dz); let df = want - a.g.rotation.y; df = Math.atan2(Math.sin(df), Math.cos(df)); a.g.rotation.y += df * Math.min(1, dt * 8);
    }
    const gy = groundBelow(a.g.position.x, a.g.position.z, a.y + 1.2); a.y += (gy - a.y) * Math.min(1, dt * 12);
    const hop = a.id === 'conejo' && moving ? Math.abs(Math.sin(a.t * 9)) * 0.25 : 0;
    a.g.position.y = a.y + hop;
    const sw = moving ? Math.sin(a.t * 10) * 0.6 : 0; a.legs.forEach((l, k) => l.rotation.x = sw * (k % 2 ? 1 : -1) * (k > 1 ? -1 : 1));
    a.headG.rotation.x = !moving && a.state !== 'lazo' ? Math.max(0, Math.sin(a.t * 0.8)) * 0.5 : 0; // come pasto
    if (a.rope.visible) {
      const pos = a.rope.geometry.attributes.position; const leadP = leashed.indexOf(a) > 0 ? leashed[leashed.indexOf(a) - 1].g.position : null;
      if (leadP) pos.setXYZ(0, leadP.x, leadP.y + 0.6, leadP.z); else pos.setXYZ(0, p.x + Math.cos(player.rotation.y) * 0.4, feet + 1.0, p.z - Math.sin(player.rotation.y) * 0.4);
      pos.setXYZ(1, a.g.position.x, a.g.position.y + 0.8, a.g.position.z); pos.needsUpdate = true;
    }
  });
}

function nearest() {
  const p = player.position; let best = null, bd = 1e9;
  for (const L of lugares) for (const pt of [L.door, L.alt].filter(Boolean)) { const d = Math.hypot(p.x - pt[0], p.z - pt[1]); if (d < 2.4 && d < bd) { bd = d; best = { kind: 'loc', L }; } }
  for (const o of ores) { if (o.mined) continue; const d = Math.hypot(p.x - o.x, p.z - o.z); if (d < 1.9 && d < bd) { bd = d; best = { kind: 'ore', o }; } }
  for (const a of animals) { if (a.state === 'lazo' || a.state === 'mascota' || (a.state === 'corral' && penned < animals.length)) continue; const d = Math.hypot(p.x - a.g.position.x, p.z - a.g.position.z); if (d < 1.9 && d < bd) { bd = d; best = { kind: 'animal', a }; } }
  if (feet > 10 && Math.hypot(p.x - 1, p.z - 20 * -1) < 2.2) best = { kind: 'bed' };
  if (feet > 1.2 && best?.kind === 'loc' && best.L.id === 'castillo') best = null;
  return best;
}
function interact() {
  if (!near || panelOpen) return;
  if (near.kind === 'animal') lasso(near.a); else if (near.kind === 'bed') sleep(); else if (near.kind === 'loc') openPlace(near.L); else mine(near.o);
}
function openPlace(L) {
  sfx('open'); L.open();
  if (L.q && !visited.has(L.id)) { visited.add(L.id); renderQuests(); }
}
function mine(o) {
  if (mining || o.mined) return;
  const p = player.position; player.rotation.y = Math.atan2(o.x - p.x, o.z - p.z);
  mining = { o, t: 0, hits: 0 };
}

const crackTex = [1, 2, 3, 4, 5, 6].map(stage => texture((g, r) => {
  g.clearRect(0, 0, 16, 16); g.fillStyle = 'rgba(30,20,30,.85)';
  let x = 8, y = 8; for (let i = 0; i < stage * 7; i++) { g.fillRect(x, y, 1, 1); x = Math.max(0, Math.min(15, x + Math.floor(r() * 3) - 1)); y = Math.max(0, Math.min(15, y + Math.floor(r() * 3) - 1)); if (i % 9 === 8) { x = 8; y = 8; } }
}, 900));
const crack = new THREE.Mesh(new THREE.BoxGeometry(1.03, 1.03, 1.03), new THREE.MeshBasicMaterial({ map: crackTex[0], transparent: true, depthWrite: false }));
crack.visible = false; scene.add(crack);
const debris = [];
function breakOre(o) {
  o.mined = true; scene.remove(o.m); scene.remove(o.tag);
  oreCells.delete(`${o.x},1,${o.z}`);
  hitMeshes.splice(hitMeshes.indexOf(o.m), 1);
  const h = habilidades[o.i];
  for (let i = 0; i < 14; i++) {
    const d = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), new THREE.MeshLambertMaterial({ color: i % 2 ? h.c : '#c4bfc8' }));
    d.position.set(o.x, 1, o.z); d.userData.v = new THREE.Vector3((Math.random() - 0.5) * 5, 3 + Math.random() * 3, (Math.random() - 0.5) * 5); d.userData.life = 1; scene.add(d); debris.push(d);
  }
  const before = tier(); minedCount++; sfx('break'); setTimeout(() => sfx('pop'), 180);
  if (tier() > before) { buildTool(); setTimeout(() => { sfx('win'); toast('⛏', '¡NUEVA HERRAMIENTA!', picos[tier()].n, 'Ahora picas más rápido.', picos[tier()].css); }, 900); }
  const slot = document.querySelectorAll('.slot')[o.i]; slot.classList.add('got'); slot.textContent = h.a.length > 4 ? h.a.slice(0, 4) : h.a; slot.setAttribute('aria-label', h.n + ', conseguida');
  $('#invCount').textContent = minedCount;
  toast(h.a.length > 3 ? h.a.slice(0, 3) : h.a, `HABILIDAD ${minedCount}/${habilidades.length}`, h.n, 'Usada en: ' + h.u, h.c);
  renderQuests();
  clearMonsters(true);
  if (minedCount === habilidades.length) setTimeout(() => { if (crown) crown.visible = true; sfx('win'); confetti(); toast('♛', 'LOGRO DESBLOQUEADO', 'Maestra constructora', 'Encontraste todas mis habilidades. ¡Ganaste la corona!', '#d97706'); }, 700);
}

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
$('#nightBtn').addEventListener('click', () => setNight(!night));
$('#promptBtn').addEventListener('click', interact);
$('#jumpBtn').addEventListener('pointerdown', e => { e.preventDefault(); jumpReq = 0.18; });

// Minimapa
const mm = $('#minimap'), mg = mm.getContext('2d');
const toMap = (x, z) => [(x + 16.5) / 33 * mm.width, (z + 26.5) / 50 * mm.height];
function drawMap() {
  mg.fillStyle = '#bfe8a8'; mg.fillRect(0, 0, mm.width, mm.height);
  mg.fillStyle = '#f6e3c5'; paths.forEach(([a, b, c, d]) => { const [x1, y1] = toMap(a - 0.5, b - 0.5), [x2, y2] = toMap(c + 0.5, d + 0.5); mg.fillRect(x1, y1, x2 - x1, y2 - y1); });
  mg.fillStyle = '#9fd8ff'; { const [x1, y1] = toMap(-16.5, -1.5), [x2, y2] = toMap(16.5, 0.5); mg.fillRect(x1, y1, x2 - x1, y2 - y1); }
  mg.fillStyle = '#f3c6b4'; bridges.forEach(([a, b]) => { const [x1, y1] = toMap(a - 0.5, -1.5), [x2, y2] = toMap(b + 0.5, 0.5); mg.fillRect(x1, y1, x2 - x1, y2 - y1); });
  mg.fillStyle = '#f9a8d4'; trees.forEach(([x, z]) => { const [a, b] = toMap(x, z); mg.fillRect(a - 3, b - 3, 6, 6); });
  lugares.forEach(L => { const [a, b] = toMap(L.at[0], L.at[1]); mg.fillStyle = L.c; const s = L.id === 'cofre' ? 6 : L.id === 'castillo' ? 16 : 11; mg.fillRect(a - s / 2, b - s / 2, s, s); });
  { const [x1, y1] = toMap(CORRAL.x1 - 0.5, CORRAL.z1 - 0.5), [x2, y2] = toMap(CORRAL.x2 + 0.5, CORRAL.z2 + 0.5); mg.strokeStyle = '#9a6744'; mg.lineWidth = 2; mg.strokeRect(x1, y1, x2 - x1, y2 - y1); }
  animals.forEach(a => { const [x, y] = toMap(a.g.position.x, a.g.position.z); mg.fillStyle = '#fef3c7'; mg.fillRect(x - 2.5, y - 2.5, 5, 5); mg.fillStyle = '#9a6744'; mg.fillRect(x - 1, y - 1, 2, 2); });
  ores.forEach(o => { if (o.mined) return; const [a, b] = toMap(o.x, o.z); mg.fillStyle = '#fff'; mg.fillRect(a - 2.5, b - 2.5, 5, 5); mg.fillStyle = habilidades[o.i].c; mg.fillRect(a - 1.5, b - 1.5, 3, 3); });
  const [px, py] = toMap(player.position.x, player.position.z); const ang = player.rotation.y;
  mg.save(); mg.translate(px, py); mg.rotate(-ang); mg.fillStyle = '#4a1238'; mg.beginPath(); mg.moveTo(0, 6); mg.lineTo(-4.5, -4); mg.lineTo(4.5, -4); mg.fill(); mg.restore();
  mg.strokeStyle = '#ec4899'; mg.lineWidth = 2; mg.strokeRect(1, 1, mm.width - 2, mm.height - 2);
}
mm.addEventListener('click', e => {
  const r = mm.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width * 33 - 16.5, z = (e.clientY - r.top) / r.height * 50 - 26.5;
  const L = lugares.map(L => [L, Math.hypot(L.at[0] - x, L.at[1] - z)]).sort((a, b) => a[1] - b[1])[0];
  if (L[1] < 4) travel(L[0]); else if (!blocked(x, z)) planTo(x, z, null);
});

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
  lidOpen = true;
  showPanel(`<p class="p-kicker">¡ABRISTE EL COFRE!</p><h2 id="panelTitle">Mi CV</h2>
    <p class="lead">Adentro estaba mi currículum, con mi formación, experiencia, proyectos y habilidades.</p>
    <div class="contact"><a class="btn big" href="${CV}" target="_blank" rel="noopener">Abrir CV <small>PDF</small></a><a class="btn" href="${CV}" download>Descargar <small>PDF</small></a></div>`);
}
let lidOpen = false;

/* ---------------- ENTRADA ---------------- */
let started = false;
addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  if (k === 'escape') { if (panelOpen) closePanel(); else closeMenu(); return; }
  if (!started || panelOpen || selecting) return;
  keys[k] = true;
  if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) e.preventDefault();
  if ((k === 'e' || k === 'enter') && !e.repeat) interact();
  if (k === ' ') {
    e.preventDefault();
    const a = document.activeElement; if (a && a !== document.body && (a.tagName === 'BUTTON' || a.tagName === 'INPUT' || a.tagName === 'A')) a.blur();
    if (!e.repeat) jumpReq = 0.18;
  }
  if (k === 'm' && !e.repeat) setMusic(!soundOn);
  if ((k === '+' || k === '=') && !e.repeat) setVolume(volume + 0.1);
  if (k === '-' && !e.repeat) setVolume(volume - 0.1);
  if (k === 'n' && !e.repeat) setNight(!night);
});
addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; if (e.key === ' ' && started && !panelOpen) e.preventDefault(); });
addEventListener('blur', () => Object.keys(keys).forEach(k => keys[k] = false));

const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.5);
let down = null, camYaw = 0, camPitch = 1, lastDrag = null, dragged = false, zoom = innerWidth < 700 ? 1.4 : 1; const pointers = new Map(); let pinch = 0;
canvas.addEventListener('pointerdown', e => { dragged = false; canvas.setPointerCapture?.(e.pointerId); pointers.set(e.pointerId, [e.clientX, e.clientY]); down = [e.clientX, e.clientY]; });
canvas.addEventListener('pointermove', e => {
  if (!pointers.has(e.pointerId)) return; pointers.set(e.pointerId, [e.clientX, e.clientY]);
  if (pointers.size === 2) { const [a, b] = [...pointers.values()]; const d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (pinch) zoom = Math.min(1.7, Math.max(0.55, zoom * pinch / d)); pinch = d; down = null; return; }
  // arrastrar para girar la cámara alrededor del personaje
  if (down && started && !panelOpen && !selecting) {
    if (!dragged && Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 8) { dragged = true; lastDrag = [e.clientX, e.clientY]; canvas.style.cursor = 'grabbing'; }
    if (dragged) {
      camYaw -= (e.clientX - lastDrag[0]) * 0.008;
      camPitch = Math.min(1.5, Math.max(0.35, camPitch + (e.clientY - lastDrag[1]) * 0.004));
      lastDrag = [e.clientX, e.clientY];
    }
  }
});
canvas.addEventListener('pointerup', e => { canvas.style.cursor = '';
  if (dragged) { dragged = false; down = null; pointers.delete(e.pointerId); return; }
  pointers.delete(e.pointerId); if (pointers.size < 2) pinch = 0;
  if (!down || !started || panelOpen) return;
  if (Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 8) return;
  ndc.set(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); ray.setFromCamera(ndc, camera);
  const hit = ray.intersectObjects(hitMeshes, false)[0];
  if (hit) {
    const u = hit.object.userData;
    if (u.kind === 'ore') { const o = ores[u.i]; const p = player.position; const dx = p.x - o.x, dz = p.z - o.z, d = Math.hypot(dx, dz) || 1; planTo(o.x + dx / d * 1.25, o.z + dz / d * 1.25, () => mine(o)); }
    else { const L = lugares.find(l => l.id === u.id); planTo(L.door[0], L.door[1], () => openPlace(L)); }
    sfx('blip'); return;
  }
  const bh = ray.intersectObjects(blockMeshes, false).find(h => h.face && h.face.normal.y > 0.5);
  const pt = bh ? bh.point : new THREE.Vector3(); if (bh || ray.ray.intersectPlane(groundPlane, pt)) { if (!blocked(pt.x, pt.z)) { planTo(pt.x, pt.z, null); marker.position.set(pt.x, pt.y + 0.03, pt.z); marker.visible = true; } }
});
canvas.addEventListener('wheel', e => { e.preventDefault(); zoom = Math.min(1.7, Math.max(0.55, zoom * (e.deltaY > 0 ? 1.08 : 0.92))); }, { passive: false });
const marker = new THREE.Mesh(new THREE.RingGeometry(0.25, 0.4, 4), new THREE.MeshBasicMaterial({ color: 0xec4899 })); marker.rotation.x = -Math.PI / 2; marker.visible = false; scene.add(marker);

addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });

/* ---------------- BUCLE ---------------- */
const clock = new THREE.Clock();
const camPos = new THREE.Vector3(0, 30, 50), camLook = new THREE.Vector3(0, 0, 0);
let walkT = 0, mapT = 0, wasOnStage = false, airT = 0;
function update(dt, t) {
  // movimiento
  let mx = 0, mz = 0;
  if (selecting) { target = null; waypoints = []; onArrive = null; mining = null; Object.keys(keys).forEach(k => keys[k] = false); }
  if (started && !panelOpen && !selecting) {
    if (keys.w || keys.arrowup) mz -= 1; if (keys.s || keys.arrowdown) mz += 1;
    if (keys.a || keys.arrowleft) mx -= 1; if (keys.d || keys.arrowright) mx += 1;
  }
  const p = player.position; let moving = false;
  const speed = keys.shift ? 8.5 : 5;
  if (mx || mz) { target = null; waypoints = []; onArrive = null; marker.visible = false; const l = Math.hypot(mx, mz); mx /= l; mz /= l;
    const c = Math.cos(camYaw), sN = Math.sin(camYaw); const wx = mx * c + mz * sN, wz = -mx * sN + mz * c; mx = wx; mz = wz; }
  // Q y R giran la cámara; C la centra
  if (started && !panelOpen && !selecting) { if (keys.q) camYaw += dt * 2; if (keys.r) camYaw -= dt * 2; if (keys.c) { camYaw = 0; camPitch = 1; } }
  else if (target && !mining) {
    const dx = target[0] - p.x, dz = target[1] - p.z, d = Math.hypot(dx, dz);
    if (d < 0.2) { if (waypoints.length) { target = waypoints.shift(); } else { target = null; marker.visible = false; const cb = onArrive; onArrive = null; if (cb) cb(); } }
    else {
      mx = dx / d; mz = dz / d;
      if (d < lastDist - 0.01) { lastDist = d; stuckT = 0; } else if ((stuckT += dt) > 0.7) { target = null; waypoints = []; onArrive = null; marker.visible = false; }
    }
  }
  autoWalk = !!target && !(keys.w || keys.a || keys.s || keys.d || keys.arrowup || keys.arrowdown || keys.arrowleft || keys.arrowright);
  if (mx || mz) {
    let hitWall = false;
    const nx = p.x + mx * speed * dt, nz = p.z + mz * speed * dt;
    if (!hits(nx, feet, p.z)) p.x = nx; else hitWall = true;
    if (!hits(p.x, feet, nz)) p.z = nz; else hitWall = true;
    // al caminar solo hacia un destino, salta escalones de un bloque
    if (hitWall && autoWalk && onGround && !hits(p.x + mx * 0.45, feet + 1.05, p.z + mz * 0.45)) { vy = JUMP; onGround = false; }
    const want = Math.atan2(mx, mz); let diff = want - player.rotation.y; diff = Math.atan2(Math.sin(diff), Math.cos(diff)); player.rotation.y += diff * Math.min(1, dt * 14);
    moving = true;
  }
  // salto y gravedad
  coyote = onGround ? 0.12 : Math.max(0, coyote - dt);
  if (jumpReq > 0) {
    if (coyote > 0 && !panelOpen && vy <= 0.5) { vy = JUMP; onGround = false; coyote = 0; jumpReq = 0; sfx('jump'); }
    else jumpReq = Math.max(0, jumpReq - dt);
  }
  vy -= GRAV * dt;
  let ny = feet + vy * dt;
  if (vy <= 0) {
    if (hits(p.x, ny, p.z)) { ny = Math.floor(ny - 0.5) + 1.5; if (!onGround && vy < -6) sfx('land'); vy = 0; onGround = true; }
    else onGround = false;
  } else if (hits(p.x, ny, p.z)) { vy = 0; ny = feet; }
  feet = ny;
  if (feet < -8) { p.set(0, 0.5, 18); feet = 0.5; vy = 0; toast('↺', 'DE VUELTA', 'Regresaste al inicio'); }
  const onStage = p.x > 7.5 && p.x < 14.5 && p.z > 10.5 && p.z < 15.5 && feet > 1.4;
  if (onStage && !wasOnStage) toast('♪', '¡SUBISTE AL ESCENARIO!', playing ? 'A bailar' : 'Pon música para bailar', playing ? '' : 'Pulsa E junto al tocadiscos o M para la música.', '#ec4899');
  wasOnStage = onStage;
  walkT += dt * (moving ? (keys.shift ? 15 : 11) : 0);
  const sw = moving ? Math.sin(walkT) * 0.7 : 0;
  P.legL.g.rotation.x = sw; P.legR.g.rotation.x = -sw;
  if (!mining) { P.armL.g.rotation.x = -sw; P.armR.g.rotation.x = sw; }
  const dancing = playing && !moving && onGround && wasOnStage;
  player.position.y = feet + (!onGround ? 0 : moving ? Math.abs(Math.sin(walkT)) * 0.06 : dancing ? Math.abs(Math.sin(t * 7)) * 0.12 : Math.sin(t * 2) * 0.015);
  if (dancing && !mining) { P.armL.g.rotation.x = -2.6 + Math.sin(t * 7) * 0.5; P.armR.g.rotation.x = -2.6 - Math.sin(t * 7) * 0.5; }
  airT = onGround ? 0 : airT + dt;
  if (airT > 0.12) { P.legL.g.rotation.x = -0.5; P.legR.g.rotation.x = 0.4; P.armL.g.rotation.x = -2.4; P.armR.g.rotation.x = -2.4; }
  const gY = groundBelow(p.x, p.z, feet + 0.1);
  pShadow.position.set(p.x, gY + 0.02, p.z); pShadow.scale.setScalar(Math.max(0.4, 1 - (feet - gY) * 0.25));
  head.rotation.z = playing && !moving ? Math.sin(t * 6) * (dancing ? 0.15 : 0.06) : 0;

  // picar
  if (mining) {
    mining.t += dt; const dur = picos[tier()].t, prog = Math.min(1, mining.t / dur);
    P.armR.g.rotation.x = -2.2 + Math.abs(Math.sin(mining.t * 13)) * 1.6;
    const o = mining.o; o.m.position.x = o.x + (Math.random() - 0.5) * 0.04;
    crack.visible = true; crack.position.copy(o.m.position); crack.rotation.copy(o.m.rotation); crack.material.map = crackTex[Math.min(5, Math.floor(prog * 6))];
    if (Math.floor(mining.t * 4.2) > mining.hits) { mining.hits++; sfx('dig'); }
    if (prog >= 1) { crack.visible = false; breakOre(o); mining = null; P.armR.g.rotation.x = 0; }
  }
  debris.forEach((d, i) => { d.userData.v.y -= 14 * dt; d.position.addScaledVector(d.userData.v, dt); if (d.position.y < 0.6) { d.position.y = 0.6; d.userData.v.multiplyScalar(0.5); } d.userData.life -= dt * 1.2; d.scale.setScalar(Math.max(0.01, d.userData.life)); if (d.userData.life <= 0) { scene.remove(d); debris.splice(i, 1); } });

  if (started && !selecting) checkHitos();
  updateMonsters(dt, t);
  updateAnimals(dt, t);
  finder.visible = started && !selecting; finder.position.set(p.x, player.position.y + 2.7 + Math.sin(t * 4) * 0.12, p.z);
  // bloques de habilidad
  ores.forEach(o => { if (o.mined || mining?.o === o) return; o.m.position.y = 1 + Math.sin(t * 2 + o.i) * 0.08; o.m.rotation.y = Math.sin(t * 0.8 + o.i) * 0.25; o.m.material.emissiveIntensity = 0.18 + Math.max(0, Math.sin(t * 3 + o.i)) * 0.3; });

  // interacción cercana
  if (started && !panelOpen) {
    near = mining ? null : nearest();
    ores.forEach(o => { if (!o.mined) o.tag.visible = near?.o === o; });
    const pr = $('#prompt');
    if (near) { pr.hidden = false; $('#promptText').textContent = near.kind === 'animal' ? (near.a.state === 'corral' ? 'Elegir de mascota: ' : 'Lazar: ') + near.a.n : near.kind === 'bed' ? 'Acostarse y volver al inicio' : near.kind === 'loc' ? (near.L.id === 'cofre' ? 'Abrir el cofre' : 'Entrar: ' + near.L.n) : 'Picar bloque: ' + habilidades[near.o.i].n; }
    else pr.hidden = true;
  }

  // ambiente
  waterTex.offset.x = t * 0.05; waterTex.offset.y = Math.sin(t) * 0.02;
  flags.forEach((f, i) => f.rotation.y = Math.sin(t * 3 + i) * 0.25);
  clouds.children.forEach((c, i) => { c.position.x += dt * (0.4 + i * 0.05); if (c.position.x > 40) c.position.x = -45; });
  const pp = petalGeo.attributes.position.array;
  for (let i = 0; i < petalCount; i++) { pp[i * 3 + 1] -= dt * (0.6 + (i % 5) * 0.12); pp[i * 3] += Math.sin(t + i) * dt * 0.4; if (pp[i * 3 + 1] < 0.5) pp[i * 3 + 1] = 12 + Math.random() * 3; }
  petalGeo.attributes.position.needsUpdate = true;
  lugares.forEach((L, i) => { L.sprite.position.y = L.at[2] + Math.sin(t * 1.5 + i) * 0.15; L.sprite.visible = !selecting && !(L.id === 'castillo' && feet > 1.2); });
  bedSign.visible = feet > 8 && !selecting; hitos.forEach(h => h.sprite.visible = !selecting && (h.done || feet > 1.2));
  lid.rotation.x += ((lidOpen ? -1.1 : 0) - lid.rotation.x) * Math.min(1, dt * 6); lid.position.z = lidOpen ? -0.2 : 0; lid.position.y = lidOpen ? 0.95 : 0.72;
  notes.forEach(n => { n.t += dt * 0.35; if (n.t > 1) n.t -= 1; n.s.position.set(11 + Math.sin(n.t * 9 + n.s.id) * 1.2, 3 + n.t * 4, 13); n.s.material.opacity = playing ? Math.sin(n.t * Math.PI) : 0; });
  drawArcade(t);

  // cámara
  if (started && !selecting) {
    const off = new THREE.Vector3(Math.sin(camYaw) * 12.5 * (1.15 - camPitch * 0.15), 21 * camPitch, Math.cos(camYaw) * 12.5 * (1.15 - camPitch * 0.15)).multiplyScalar(zoom);
    camPos.lerp(new THREE.Vector3(p.x, p.y, p.z).add(off), Math.min(1, dt * 4));
    camLook.lerp(new THREE.Vector3(p.x - Math.sin(camYaw) * 2.5 * camPitch, 1, p.z - Math.cos(camYaw) * 2.5 * camPitch), Math.min(1, dt * 5));
  } else if (selecting) {
    const sx = innerWidth > 700 ? -1.5 : 0, sy = innerWidth > 700 ? 0.9 : -0.4; camPos.lerp(new THREE.Vector3(p.x + sx, p.y + 2.2, p.z + 8.5), Math.min(1, dt * 5)); camLook.lerp(new THREE.Vector3(p.x + sx, p.y + sy, p.z), Math.min(1, dt * 5));
  } else {
    const a = t * 0.12; camPos.set(Math.sin(a) * 44, 30, Math.cos(a) * 44); camLook.set(0, 0, -2);
  }
  if (selecting) {
    player.rotation.y += dt * 0.6;
    P.legL.g.rotation.x = P.legR.g.rotation.x = 0; P.armL.g.rotation.x = 0; P.armL.g.rotation.z = 0;
    P.armR.g.rotation.x = -0.4 + Math.sin(t * 2) * 0.15; P.armR.g.rotation.z = 0;
    head.rotation.z = 0; head.rotation.y = Math.sin(t * 0.9) * 0.15;
    player.position.y = feet + Math.sin(t * 2) * 0.02;
    if (hop > 0) { hop = Math.max(0, hop - dt * 2.2); const k = Math.sin((1 - hop) * Math.PI); player.position.y = feet + k * 0.5; P.armL.g.rotation.x = P.armR.g.rotation.x = -2.6 * k; }
  } else if (head) head.rotation.y = 0;
  camera.position.copy(camPos); camera.lookAt(camLook);
  sun.position.set(camLook.x + 20, 34, camLook.z + 14); sun.target.position.set(camLook.x, 0, camLook.z); sun.target.updateMatrixWorld();

  if ((mapT += dt) > 0.1 && started) { mapT = 0; drawMap(); }
}
let perfStart = 0, perfN = 0, perfLevel = 0;
function adaptQuality() {
  const now = performance.now(); if (!perfStart) perfStart = now; perfN++;
  if (now - perfStart < 2500) return;
  const fps = perfN / ((now - perfStart) / 1000); perfStart = now; perfN = 0;
  if (fps < 38 && perfLevel < 3) {
    perfLevel++;
    if (perfLevel === 1) { pixelRatio = Math.max(0.85, pixelRatio - 0.4); renderer.setPixelRatio(pixelRatio); }
    if (perfLevel === 2) { petals.visible = false; clouds.visible = false; }
    if (perfLevel === 3) { sun.castShadow = false; pixelRatio = Math.max(0.75, pixelRatio - 0.15); renderer.setPixelRatio(pixelRatio); }
  }
}
function loop() {
  const dt = Math.min(0.05, clock.getDelta()), t = clock.elapsedTime;
  update(dt, t); renderer.render(scene, camera); if (started) adaptQuality(); requestAnimationFrame(loop);
}

/* ---------------- INICIO ---------------- */

// Retratos de cada carta: se renderiza cada personaje en 3D y se guarda como imagen
const portraits = [];
function makePortraits() {
  const W = 160, H = 200;
  let r2; try { r2 = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true }); } catch (e) { return; }
  r2.setSize(W, H); r2.setPixelRatio(1); r2.outputColorSpace = THREE.SRGBColorSpace;
  const sc = new THREE.Scene(); sc.add(new THREE.HemisphereLight(0xffffff, 0xd8a7c0, 1.5)); const dl = new THREE.DirectionalLight(0xffffff, 1.4); dl.position.set(2, 3, 4); sc.add(dl);
  const cam = new THREE.PerspectiveCamera(30, W / H, 0.1, 50); cam.position.set(1.4, 1.7, 4.2); cam.lookAt(0, 1.05, 0);
  personajes.forEach((c, i) => {
    const g = new THREE.Group(); g.rotation.y = -0.35; sc.add(g); rig = g; P = {}; c.build();
    if (P.armR) P.armR.g.rotation.x = -0.5; if (P.armL) P.armL.g.rotation.x = 0.3;
    r2.render(sc, cam); portraits[i] = r2.domElement.toDataURL('image/png'); sc.remove(g);
  });
  r2.dispose(); r2.forceContextLoss?.(); rig = mainRig;
}
let selecting = false, wantMusic = false, hop = 0, showcaseFrom = null;
function renderCards() {
  const box = $('#cards'); box.innerHTML = '';
  personajes.forEach((c, i) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'pcard' + (i === charIndex ? ' on' : '');
    b.style.setProperty('--c1', c.c1); b.style.setProperty('--c2', c.c2);
    b.innerHTML = `<span class="cost">${c.cost}</span><span class="rar"></span><span class="art">${portraits[i] ? `<img src="${portraits[i]}" alt="">` : c.n.split(' ').map(w => w[0]).join('').slice(0, 2)}</span><b></b><small></small>`;
    b.querySelector('.rar').textContent = c.rar; b.querySelector('b').textContent = c.n; b.querySelector('small').textContent = c.rol;
    b.setAttribute('aria-pressed', i === charIndex);
    b.addEventListener('click', () => { buildCharacter(i); renderCards(); sfx('open'); hop = 1; });
    box.appendChild(b);
  });
  const c = personajes[charIndex]; $('#charName').textContent = c.n; $('#charDesc').textContent = c.d;
}
function openSelect(music) {
  wantMusic = music; audio(); if (music && !playing) setMusic(true);
  $('#intro').classList.add('out'); setTimeout(() => $('#intro').hidden = true, 600);
  if (!portraits.length) { makePortraits(); buildCharacter(charIndex); }
  showcaseFrom = [player.position.x, feet, player.position.z]; player.position.set(0, 0.5, 18); feet = 0.5; vy = 0;
  selecting = true; $('#select').hidden = false; renderCards(); sfx('open');
}
$('#goArena').addEventListener('click', () => { $('#select').hidden = true; selecting = false; if (started && showcaseFrom) { player.position.set(showcaseFrom[0], showcaseFrom[1], showcaseFrom[2]); feet = showcaseFrom[1]; } showcaseFrom = null; if (!started) start(wantMusic); else toast('★', 'PERSONAJE', personajes[charIndex].n, '¡Listo para seguir explorando!', personajes[charIndex].c1); });
function start(music) {
  started = true; audio(); if (music && !playing) setMusic(true);
  $('#hud').hidden = false; drawMap(); sfx('win');
  toast('★', 'BIENVENIDA A LA ARENA', '¡Explora mi mundo!', 'Cada edificio es una sección. Camina hasta la puerta y pulsa E, o tócalo.');
  setTimeout(() => toast('⛏', 'CONSEJO', 'Bloques brillantes', `Son mis ${habilidades.length} habilidades. Acércate y pícalas para llenar tu inventario.`), 4200);
}
$('#playMusic').addEventListener('click', () => openSelect(true));
$('#playQuiet').addEventListener('click', () => openSelect(false));
$('#changeChar').addEventListener('click', () => { closeMenu(); showcaseFrom = [player.position.x, feet, player.position.z]; player.position.set(0, 0.5, 18); feet = 0.5; vy = 0; selecting = true; $('#select').hidden = false; renderCards(); });
buildCharacter(0);

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
window.arena = { animals, lasso, setNight, spawnMonster, monsters, hits: (x, y, z) => hits(x, y, z), cell: (i, j, k) => blocks.get(`${i},${j},${k}`), sleep, tl: () => tlShown, buildCharacter, setMined: n => { minedCount = n; buildTool(); }, player, lugares, ores, openPlace, travel, mine, state: () => ({ feet, onGround, vy }), setFeet: v => { feet = v; } };
