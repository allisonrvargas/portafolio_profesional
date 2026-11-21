'use strict';
// Textos y datos del portafolio: proyectos, aplicaciones, habilidades e historia.

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
