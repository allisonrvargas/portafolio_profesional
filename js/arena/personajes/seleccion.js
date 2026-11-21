'use strict';
// Retratos y selección de carta al iniciar.

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
$('#goArena').addEventListener('click', () => { progress.char = charIndex; saveProgress(); $('#select').hidden = true; selecting = false; if (started && showcaseFrom) { player.position.set(showcaseFrom[0], showcaseFrom[1], showcaseFrom[2]); feet = showcaseFrom[1]; } showcaseFrom = null; if (!started) start(wantMusic); else toast('★', 'PERSONAJE', personajes[charIndex].n, '¡Listo para seguir explorando!', personajes[charIndex].c1); });
function start(music) {
  started = true; audio(); if (music && !playing) setMusic(true);
  $('#hud').hidden = false; drawMap(); sfx('win');
  if (restored) toast('↺', 'CONTINUASTE TU PARTIDA', '¡Bienvenida de vuelta!', `Llevas ${minedCount}/${habilidades.length} habilidades y ${penned}/${animals.length} animales.`);
  else toast('★', 'BIENVENIDA A LA ARENA', '¡Explora mi mundo!', 'Cada edificio es una sección. Habla con la guía junto a la entrada.');
  setTimeout(startTutorial, 1200); saveProgress();
}
$('#playMusic').addEventListener('click', () => openSelect(true));
$('#playQuiet').addEventListener('click', () => openSelect(false));
$('#changeChar').addEventListener('click', () => { closeMenu(); showcaseFrom = [player.position.x, feet, player.position.z]; player.position.set(0, 0.5, 18); feet = 0.5; vy = 0; selecting = true; $('#select').hidden = false; renderCards(); });
