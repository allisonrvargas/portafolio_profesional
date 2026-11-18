const proyectos = [
  {t:'Kid-Fit',cat:['movil'],d:'App móvil que cuenta ejercicios con la cámara del teléfono y registra la hidratación de niños de 5 a 13 años. Aporté al motor de movimiento: validación de la caída del salto y pruebas a distintos FPS.',tags:['React Native','TypeScript','MediaPipe','Jest'],link:'https://github.com/allisonrvargas/Kid_Fit_allison-vargas',c:['#7c3aed','#c4b5fd'],ic:'move'},
  {t:'Gym Manager CLI',cat:['backend','datos'],d:'Aplicación de consola para un gimnasio: clientes, planes, contratos, seguimiento, nutrición y finanzas. Transacciones en MongoDB con rollback, SOLID y patrones de diseño.',tags:['Node.js','MongoDB','Docker','Scrum'],link:'https://github.com/allisonrvargas/gym_manager',c:['#a855f7','#f0abfc'],ic:'term'},
  {t:'MarisolliFlix',cat:['backend','frontend'],d:'Plataforma para reseñar películas, series y animes, con un ranking ponderado, likes y dislikes, panel de administración y API documentada.',tags:['Express','MySQL','JWT','Swagger'],nota:'Proyecto en equipo',c:['#6d28d9','#a78bfa'],ic:'star'},
  {t:'Librarian',cat:['backend','frontend'],d:'Sistema de biblioteca con préstamos, ventas, clientes e inventario. Roles de administrador y usuario, tres límites de peticiones y 26 pruebas.',tags:['Express 5','express-rate-limit','Vite','node:test'],link:'https://github.com/allisonrvargas/review_express_backend',c:['#c084fc','#fbcfe8'],ic:'book'},
  {t:'API de postulaciones',cat:['backend','datos'],d:'API REST que calcula el puntaje y la prioridad de cada candidato a una vacante. Reglas de negocio, filtros, control de estados y 123 pruebas.',tags:['Express','MySQL','Jest','Docker'],link:'https://github.com/allisonrvargas/evaluacion-allison_rocio_vargas_mejia',c:['#8b5cf6','#ddd6fe'],ic:'list'},
  {t:'Gremio de Cazadores',cat:['backend'],d:'API REST modular y segura con autenticación por JWT y Passport.js, organizada en una arquitectura limpia por capas.',tags:['Node.js','Express','Passport','JWT'],link:'https://github.com/allisonrvargas/jwt_and_passport',c:['#9333ea','#e9d5ff'],ic:'lock'},
  {t:'Campus Parking',cat:['frontend'],d:'Aplicación de una sola página para administrar un estacionamiento: inicio de sesión, mapa de espacios, servicios de parqueo y reportes.',tags:['HTML','CSS','JavaScript'],link:'https://github.com/allisonrvargas/Campus-Parking',c:['#7c3aed','#c4b5fd'],ic:'car'},
  {t:'CampusShop',cat:['frontend'],d:'Tienda en línea mobile-first con catálogo, carrito, checkout, perfil e historial, maquetada solo con HTML y CSS, sin JavaScript.',tags:['HTML5','CSS3','Mobile-first'],link:'https://github.com/allisonrvargas/Campushop',c:['#a855f7','#f0abfc'],ic:'cart'},
  {t:'TechZone',cat:['datos'],d:'Sistema de inventario y ventas en PostgreSQL: modelo entidad-relación, procedimientos que descuentan existencias y consultas de reportes.',tags:['PostgreSQL','PL/pgSQL'],link:'https://github.com/allisonrvargas/gesti-n_de_Inventario_examen',c:['#6d28d9','#a78bfa'],ic:'box'},
  {t:'Veterinaria en PostgreSQL',cat:['datos'],d:'Base de datos de una veterinaria: CRUD, consultas, funciones de ventana, CTE, vistas y procedimientos almacenados.',tags:['PostgreSQL','SQL'],link:'https://github.com/allisonrvargas/review_postgresql',c:['#c084fc','#fbcfe8'],ic:'db'},
  {t:'Adapter y reportes HTML',cat:['backend','datos'],d:'Patrón de diseño Adapter con cajas de cambios mecánica y automática, y reportes HTML de estudiantes, profesores y horarios generados desde MySQL.',tags:['Node.js','mysql2','Patrones'],link:'https://github.com/allisonrvargas/review_node.js',c:['#8b5cf6','#ddd6fe'],ic:'code'},
  {t:'Embeddings con Gemini y Qdrant',cat:['ia','datos'],d:'App de consola que convierte un texto en un vector con Gemini y lo guarda en Qdrant junto con sus palabras clave.',tags:['Node.js','Gemini','Qdrant'],nota:'Inteligencia Artificial',c:['#9333ea','#e9d5ff'],ic:'vec'},
  {t:'Simulador de personalidades',cat:['ia','frontend'],d:'Chat que cambia la personalidad de un modelo de IA (Animador, Estricto o Mentor) con prompts basados en los rasgos del modelo Big Five.',tags:['JavaScript','Prompts','API de IA'],nota:'Inteligencia Artificial',c:['#7c3aed','#c4b5fd'],ic:'chat'}
];
const icons={
 lock:'<rect x="-22" y="-6" width="44" height="34" rx="5"/><path d="M-12-6v-10a12 12 0 0 1 24 0v10"/><circle cx="0" cy="11" r="4"/>',
 car:'<path d="M-32 10v-10l8-16h48l8 16v10z"/><circle cx="-18" cy="14" r="6"/><circle cx="18" cy="14" r="6"/><path d="M-22-4h44"/>',
 cart:'<path d="M-34-24h10l8 34h34l8-24h-46"/><circle cx="-12" cy="20" r="4"/><circle cx="16" cy="20" r="4"/>',
 box:'<path d="M0-28l28 14v28L0 28-28 14v-28z"/><path d="M-28-14L0 0l28-14M0 0v28"/>',
 move:'<circle cx="0" cy="-30" r="9"/><path d="M0-20v26M0 6l-14 22M0 6l14 22M-20-8h40"/>',
 grid:'<rect x="-30" y="-24" width="26" height="20" rx="3"/><rect x="4" y="-24" width="26" height="20" rx="3"/><rect x="-30" y="4" width="60" height="20" rx="3"/>',
 star:'<path d="M0-28l8 17 18 2-13 12 4 18-17-9-17 9 4-18-13-12 18-2z"/>',
 book:'<path d="M-28-22h22a6 6 0 0 1 6 6v38a5 5 0 0 0-5-5h-23zM28-22H6a6 6 0 0 0-6 6v38a5 5 0 0 1 5-5h23z"/>',
 term:'<rect x="-32" y="-24" width="64" height="48" rx="5"/><path d="M-20-8l10 8-10 8M0 10h16"/>',
 list:'<path d="M-14-18h40M-14 0h40M-14 18h40"/><circle cx="-26" cy="-18" r="3"/><circle cx="-26" cy="0" r="3"/><circle cx="-26" cy="18" r="3"/>',
 vec:'<circle cx="-20" cy="14" r="4"/><circle cx="18" cy="-16" r="4"/><circle cx="20" cy="18" r="4"/><circle cx="-14" cy="-20" r="4"/><path d="M-20 14L18-16M-14-20L20 18"/>',
 chat:'<path d="M-30-20h44v28h-26l-12 10v-10h-6z"/><path d="M20-8h12v24h-4v8l-10-8h-14"/>',
 db:'<ellipse cx="0" cy="-20" rx="26" ry="9"/><path d="M-26-20v40c0 5 12 9 26 9s26-4 26-9v-40M-26 0c0 5 12 9 26 9s26-4 26-9"/>',
 code:'<path d="M-12-18l-18 18 18 18M12-18l18 18-18 18M6-26l-12 52"/>'
};
const catName={backend:'Backend',frontend:'Frontend',movil:'Móvil',datos:'Datos',ia:'IA'};
const grid=document.getElementById('grid');
proyectos.forEach((p,i)=>{
  const el=document.createElement('article');
  el.className='proj';el.dataset.cat=p.cat.join(' ');
  el.innerHTML=`<div class="cover"><svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="g${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.c[0]}"/><stop offset="1" stop-color="${p.c[1]}"/></linearGradient></defs>
    <rect width="400" height="150" fill="url(#g${i})"/>
    <g fill="none" stroke="rgba(255,255,255,.18)" stroke-width="1">${Array.from({length:9},(_,k)=>`<path d="M${k*50} 0v150"/>`).join('')}${Array.from({length:4},(_,k)=>`<path d="M0 ${k*50}h400"/>`).join('')}</g>
    <g transform="translate(320 70) scale(1.4)" fill="none" stroke="rgba(255,255,255,.92)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${icons[p.ic]}</g>
  </svg><span class="badge">${p.cat.map(c=>catName[c]).join(' · ')}</span></div>
  <div class="proj-body"><h3>${p.t}</h3><p>${p.d}</p>
  <div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
  <div class="foot">${p.link?`<a href="${p.link}">Ver código ↗</a>`:`<span>${p.nota}</span>`}<span>${String(i+1).padStart(2,'0')}</span></div></div>`;
  grid.appendChild(el);
});
document.querySelectorAll('.chip').forEach(ch=>ch.addEventListener('click',()=>{
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('on'));ch.classList.add('on');
  const f=ch.dataset.f;
  document.querySelectorAll('.proj').forEach(p=>p.classList.toggle('hide',f!=='todos'&&!p.dataset.cat.split(' ').includes(f)));
}));
// tema
const root=document.documentElement;
try{const s=localStorage.getItem('tema');if(s)root.dataset.theme=s;else if(matchMedia('(prefers-color-scheme: dark)').matches)root.dataset.theme='dark';}catch(e){}
document.getElementById('theme').addEventListener('click',()=>{
  root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
  try{localStorage.setItem('tema',root.dataset.theme)}catch(e){}
});
// menú móvil
const links=document.getElementById('links');
document.getElementById('menu').addEventListener('click',()=>links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
// aparición al hacer scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
