'use strict';
// Casita de la mascota: está en el pasto junto a la casa. Le pones nombre, la dejas jugando en su casita o la llevas contigo.
// De noche duerme dentro (Zzz) y cuando pasas cerca sale a saludarte.

const PET_HOUSE = { x: -5, z: 11.8 }; // en el pasto junto al camino de la casa
const PET_DOOR = [PET_HOUSE.x + 1.25, PET_HOUSE.z], PET_BOWL = [PET_HOUSE.x + 1.3, PET_HOUSE.z + 2.6];
const PET_YARD = { x1: PET_HOUSE.x + 0.55, x2: PET_HOUSE.x + 2.0, z1: PET_HOUSE.z + 0.9, z2: PET_HOUSE.z + 3.15 };
const PET_BOX = [PET_HOUSE.x - 0.8, PET_HOUSE.z - 0.75, PET_HOUSE.x + 0.8, PET_HOUSE.z + 0.75]; // nadie la atraviesa
let petName = (progress.petName || '').slice(0, 16);
let petHome = !!progress.petHome, petGreetT = 0, petTag = null, petWander = null, petNapT = 0;

// la casita cambia según la mascota: casa, comida y juguete especiales para cada una
const petHouse = new THREE.Group(); petHouse.position.set(PET_HOUSE.x, 0.5, PET_HOUSE.z); scene.add(petHouse);
const bowl = new THREE.Group(); bowl.position.set(PET_BOWL[0], 0.5, PET_BOWL[1]); scene.add(bowl);
const ball = new THREE.Group(); ball.position.set(PET_HOUSE.x + 1.0, 0.5, PET_HOUSE.z + 1.6); scene.add(ball);  // juguete
const petYardDeco = new THREE.Group(); scene.add(petYardDeco);
const PET_TEMAS = {
  ninguna:   { casa: 'Casita', comida: 'comida', juguete: 'pelota' },
  vaca:      { casa: 'Establo', comida: 'paja fresca', juguete: 'campana' },
  cerdo:     { casa: 'Chiquero', comida: 'maíz y manzanas', juguete: 'pelota de lodo' },
  chihuahua: { casa: 'Casita de perro', comida: 'croquetas', juguete: 'hueso' },
  gallina:   { casa: 'Gallinero', comida: 'semillas', juguete: 'lombriz de juguete' },
  conejo:    { casa: 'Conejera', comida: 'zanahorias', juguete: 'pelotita de paja' },
  pato:      { casa: 'Casita del estanque', comida: 'migas de pan', juguete: 'barquito' }
};
const petTema = () => PET_TEMAS[pet ? pet.id : 'ninguna'] || PET_TEMAS.ninguna;
function vaciar(g) { while (g.children.length) { const c = g.children.pop(); c.traverse(o => { if (o.geometry) o.geometry.dispose(); }); } }
// techo de dos aguas (cumbrera a lo largo de x, la puerta mira a +x)
function techo(g, c, y = 1.3, wall = null) {
  const l = part(1.75, 0.14, 0.95, c, 0, y, -0.33, g); l.rotation.x = -0.62;
  const r = part(1.75, 0.14, 0.95, c, 0, y, 0.33, g); r.rotation.x = 0.62;
  if (wall !== null) { part(1.5, 0.16, 0.95, wall, 0, y - 0.17, 0, g); part(1.5, 0.16, 0.5, wall, 0, y - 0.01, 0, g); } // frontones
}
function casaBase(g, wall, base, puerta, y0 = 0) {
  part(1.5, 1.05, 1.4, wall, 0, y0 + 0.52, 0, g); part(1.56, 0.12, 1.46, base, 0, y0 + 0.06, 0, g);
  part(0.08, 0.66, 0.66, puerta, 0.74, y0 + 0.37, 0, g);
}
function buildPetHome() {
  [petHouse, bowl, ball, petYardDeco].forEach(vaciar); ball.rotation.set(0, 0, 0);
  const id = pet ? pet.id : 'ninguna', H = petHouse, X = PET_HOUSE.x, Z = PET_HOUSE.z;
  if (id === 'vaca') { // establo rojo con cruces blancas y paja en el techo
    casaBase(H, 0xdc2626, 0x7f1d1d, 0x3b1010);
    part(0.06, 0.06, 0.8, 0xffffff, 0.77, 0.72, 0, H); part(0.06, 0.66, 0.06, 0xffffff, 0.77, 0.37, 0.36, H); part(0.06, 0.66, 0.06, 0xffffff, 0.77, 0.37, -0.36, H);
    const x1 = part(0.05, 0.9, 0.06, 0xffffff, 0.78, 0.37, 0, H); x1.rotation.x = 0.78; const x2 = part(0.05, 0.9, 0.06, 0xffffff, 0.78, 0.37, 0, H); x2.rotation.x = -0.78; // X de la puerta
    techo(H, 0x57534e, 1.3, 0xdc2626); part(0.3, 0.3, 0.3, 0xffffff, 0.76, 1.15, 0, H);                  // ventanita del pajar
    part(0.24, 0.2, 0.2, 0xfacc15, 0.79, 1.15, 0, H);
    part(0.7, 0.16, 0.42, 0x92400e, 0, 0.08, 0, bowl); part(0.6, 0.14, 0.32, 0xfacc15, 0, 0.2, 0, bowl);    // comedero con paja
    part(0.6, 0.03, 0.33, 0xca8a04, 0, 0.27, 0, bowl);
    part(0.22, 0.24, 0.22, 0xfbbf24, 0, 0.14, 0, ball); part(0.26, 0.04, 0.26, 0xb45309, 0, 0.27, 0, ball); part(0.06, 0.06, 0.06, 0x78350f, 0, 0.02, 0, ball); // campana
    part(0.6, 0.4, 0.4, 0xfacc15, 0, 0.2, 0, petYardDeco).position.set(X + 0.2, 0.7, Z + 3.0);            // paca de paja
  } else if (id === 'cerdo') { // chiquero de madera con charco de lodo
    casaBase(H, 0xf9a8d4, 0x92400e, 0x3b1d3a);
    [-0.5, -0.17, 0.17, 0.5].forEach(z => part(0.04, 1.0, 0.06, 0xb45309, 0.76, 0.52, z, H));           // tablas
    part(1.8, 0.12, 1.6, 0x92400e, 0, 1.12, 0, H); part(1.6, 0.1, 1.4, 0xb45309, 0, 1.22, 0, H);          // techo plano de tablas
    part(0.8, 0.16, 0.4, 0x78350f, 0, 0.08, 0, bowl);                                                       // batea
    [[-0.2, 0xfacc15], [0, 0xef4444], [0.2, 0xfacc15]].forEach(([x, c]) => part(0.16, 0.12, 0.16, c, x, 0.2, 0, bowl));
    part(0.24, 0.24, 0.24, 0x7c4a1e, 0, 0.12, 0, ball);                                                     // pelota de lodo
    const lodo = part(1.3, 0.03, 0.75, 0x6b4423, 0, 0, 0, petYardDeco); lodo.position.set(X + 1.35, 0.515, Z + 1.6); lodo.castShadow = false;
  } else if (id === 'chihuahua') { // casita de perro azul con hueso en la puerta y cojín
    casaBase(H, 0x93c5fd, 0x1d4ed8, 0x1e1b4b);
    part(0.06, 0.08, 0.78, 0xffffff, 0.76, 0.74, 0, H);
    techo(H, 0xef4444, 1.3, 0x93c5fd);
    part(0.04, 0.08, 0.36, 0xfffbeb, 0.79, 0.95, 0, H); [-0.2, 0.2].forEach(z => part(0.04, 0.14, 0.1, 0xfffbeb, 0.79, 0.95, z, H)); // hueso sobre la puerta
    part(0.5, 0.06, 0.6, 0xf472b6, 1.05, 0.03, 0, H);                                                      // cojín
    part(0.46, 0.14, 0.46, 0xec4899, 0, 0.07, 0, bowl); [[-0.08, -0.06], [0.07, 0.05], [0, -0.1], [-0.06, 0.09], [0.1, -0.05]].forEach(([x, z]) => part(0.08, 0.06, 0.08, 0x92400e, x, 0.16, z, bowl)); // croquetas
    part(0.32, 0.07, 0.07, 0xfffbeb, 0, 0.05, 0, ball); [-0.16, 0.16].forEach(x => part(0.08, 0.1, 0.14, 0xfffbeb, x, 0.05, 0, ball)); // hueso
  } else if (id === 'gallina') { // gallinero en patas con rampa y nido con huevos
    [[-0.6, -0.55], [0.6, -0.55], [-0.6, 0.55], [0.6, 0.55]].forEach(([x, z]) => part(0.12, 0.4, 0.12, 0x78350f, x, 0.2, z, H));
    part(1.5, 0.75, 1.4, 0xfef3c7, 0, 0.78, 0, H); part(1.56, 0.08, 1.46, 0xb45309, 0, 0.42, 0, H);
    part(0.08, 0.42, 0.4, 0x3b1d3a, 0.74, 0.7, 0, H);
    techo(H, 0xd97706, 1.38, 0xfef3c7);
    const rampa = part(0.75, 0.05, 0.36, 0xb45309, 1.05, 0.25, 0, H); rampa.rotation.z = -0.55;            // rampa
    part(0.5, 0.12, 0.5, 0xca8a04, 0, 0.06, 0, bowl); [[-0.08, 0], [0.09, 0.06], [0, -0.09]].forEach(([x, z]) => part(0.1, 0.13, 0.1, 0xfffbeb, x, 0.16, z, bowl)); // nido con huevitos
    for (let i = 0; i < 14; i++) { const sd = part(0.05, 0.02, 0.05, i % 2 ? 0xfacc15 : 0xd97706, 0, 0, 0, petYardDeco); sd.castShadow = false; sd.position.set(X + 0.7 + Math.random() * 1.2, 0.51, Z + 1.0 + Math.random() * 1.8); } // semillas
    [0, 1, 2, 3].forEach(i => part(0.08, 0.08, 0.08, i % 2 ? 0xf472b6 : 0xec4899, -0.12 + i * 0.08, 0.04, 0, ball)); // lombriz de juguete
  } else if (id === 'conejo') { // conejera de madera con malla, techo verde y tunelito
    casaBase(H, 0xfde68a, 0x92400e, 0x3b1d3a);
    for (let i = 0; i < 4; i++) part(0.03, 0.66, 0.03, 0xd4d4d8, 0.77, 0.37, -0.24 + i * 0.16, H);        // malla
    for (let j = 0; j < 3; j++) part(0.03, 0.03, 0.66, 0xd4d4d8, 0.77, 0.15 + j * 0.22, 0, H);
    techo(H, 0x16a34a, 1.3, 0xfde68a);
    part(0.5, 0.08, 0.5, 0xfbcfe8, 0, 0.04, 0, bowl);                                                       // platito con zanahorias
    [[-0.1, 0.3], [0.08, -0.4]].forEach(([z, r]) => { const c = new THREE.Group(); c.position.set(0, 0.13, z); c.rotation.y = r; bowl.add(c); part(0.32, 0.08, 0.08, 0xf97316, 0, 0, 0, c); part(0.08, 0.1, 0.14, 0x22c55e, -0.18, 0.02, 0, c); });
    part(0.2, 0.2, 0.2, 0xeab308, 0, 0.1, 0, ball);                                                         // pelotita de paja
    const tun = new THREE.Group(); tun.position.set(X + 1.5, 0.5, Z + 2.9); tun.rotation.y = 0.3; petYardDeco.add(tun); // túnel
    part(0.7, 0.08, 0.5, 0x22c55e, 0, 0.42, 0, tun); part(0.7, 0.42, 0.08, 0x22c55e, 0, 0.21, 0.25, tun); part(0.7, 0.42, 0.08, 0x22c55e, 0, 0.21, -0.25, tun);
  } else if (id === 'pato') { // casita blanca con techo azul y su estanque
    casaBase(H, 0xffffff, 0x38bdf8, 0x0c4a6e);
    part(0.04, 0.26, 0.26, 0xfacc15, 0.76, 0.85, 0.45, H);
    techo(H, 0x2563eb, 1.3, 0xffffff);
    const est = part(1.4, 0.03, 0.8, 0x38bdf8, 0, 0, 0, petYardDeco); est.position.set(X + 1.3, 0.515, Z + 1.55); est.castShadow = false;
    est.material.transparent = true; est.material.opacity = 0.85;
    const borde = part(1.55, 0.02, 0.95, 0xd6d3d1, 0, 0, 0, petYardDeco); borde.position.set(X + 1.3, 0.505, Z + 1.55); borde.castShadow = false;
    const hoja = part(0.26, 0.02, 0.26, 0x22c55e, 0, 0, 0, petYardDeco); hoja.position.set(X + 0.9, 0.535, Z + 1.4); hoja.castShadow = false;
    part(0.44, 0.1, 0.44, 0x0ea5e9, 0, 0.05, 0, bowl); [[-0.08, 0], [0.09, 0.07], [0.02, -0.1]].forEach(([x, z]) => part(0.1, 0.06, 0.1, 0xe7c38a, x, 0.12, z, bowl)); // migas de pan
    part(0.26, 0.08, 0.14, 0xef4444, 0, 0.04, 0, ball); part(0.02, 0.2, 0.02, 0x78350f, 0, 0.16, 0, ball); part(0.02, 0.12, 0.12, 0xffffff, 0, 0.2, 0.05, ball); // barquito
  } else { // sin mascota todavía: casita rosa
    casaBase(H, 0xf9a8d4, 0xdb2777, 0x3b1d3a);
    part(0.06, 0.08, 0.78, 0xffffff, 0.76, 0.74, 0, H); part(0.04, 0.24, 0.24, 0xfde68a, 0.76, 0.85, 0.48, H);
    techo(H, 0x7c3aed, 1.3, 0xf9a8d4);
    part(0.46, 0.14, 0.46, 0x38bdf8, 0, 0.07, 0, bowl); part(0.34, 0.05, 0.34, 0xa16207, 0, 0.15, 0, bowl);
    part(0.22, 0.22, 0.22, 0xfacc15, 0, 0.11, 0, ball);
  }
}
solid(...PET_BOX);
let houseSign = null;
function renderHouseSign() {
  if (houseSign) scene.remove(houseSign);
  buildPetHome();
  houseSign = label(pet ? `${petTema().casa} de ${petName || pet.n}` : 'Casita · ¿de quién será?', '#7c3aed');
  houseSign.scale.set(3.4, 0.85, 1); houseSign.position.set(PET_HOUSE.x, 2.55, PET_HOUSE.z); scene.add(houseSign);
}
function renderPetTag() {
  if (petTag) { scene.remove(petTag); petTag = null; }
  if (!pet || !petName) return;
  petTag = label(petName, '#db2777'); petTag.scale.set(2.2, 0.55, 1); scene.add(petTag);
}
const zzz = label('Zzz', '#7c3aed'); zzz.scale.set(1.2, 0.3, 1); zzz.visible = false; scene.add(zzz);

function nearPetHouse(p) { return feet > -0.5 && feet < 1.5 && Math.hypot(p.x - PET_DOOR[0], p.z - PET_DOOR[1]) < 1.7; }
function openPetHouse() {
  if (!pet) {
    showPanel(`<p class="p-kicker">GRANJA</p><h2 id="panelTitle">Una casita vacía</h2>
      <p class="lead">Aquí vivirá tu mascota.</p><p>Lleva a los 6 animales al corral con el lazo y elige tu mascota: después podrás ponerle nombre y dejarla jugando aquí.</p>`);
    return;
  }
  const nombre = petName || pet.n;
  showPanel(`<p class="p-kicker">CASITA DE TU MASCOTA</p><h2 id="panelTitle">${petTema().casa} de ${esc(nombre)}</h2>
    <p class="lead">${petHome ? `${esc(nombre)} está jugando en su casita.` : `${esc(nombre)} anda contigo por la arena.`}</p>
    <label class="pet-name">¿Cómo se llama?
      <span><input id="petNameIn" maxlength="16" autocomplete="off" value="${esc(petName)}" placeholder="${esc(pet.n)}"><button class="btn" id="petNameOk">Guardar nombre</button></span></label>
    <div class="row pet-actions">
      ${petHome ? `<button class="btn big" id="petGo">Que venga conmigo</button>` : `<button class="btn big" id="petStay">Dejar en su casita</button>`}
      <button class="btn" id="petClose">Cerrar</button></div>
    <p class="pet-tip">En su ${petTema().casa.toLowerCase()} juega con su ${petTema().juguete}, come ${petTema().comida} y de noche se duerme. Cuando pases cerca saldrá a saludarte.</p>`, () => {
    const inp = $('#petNameIn');
    const save = () => { const v = inp.value.replace(/[<>]/g, '').trim().slice(0, 16); petName = v; progress.petName = v; saveProgress();
      renderHouseSign(); renderPetTag(); if (v) award('petName', 20, 'Nombre para tu mascota');
      sfx('pop'); toast('♥', 'NOMBRE GUARDADO', v ? `Ahora se llama ${v}` : 'Sin nombre', v ? 'El nombre aparece en su casita y sobre su cabeza.' : 'Puedes ponérselo cuando quieras.', '#db2777');
      $('#panelTitle').textContent = `${petTema().casa} de ${v || pet.n}`; $('#panelBody .lead').textContent = `${v || pet.n} ${petHome ? 'está jugando en su casita.' : 'anda contigo por la arena.'}`; };
    inp.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Enter') save(); });
    $('#petNameOk').addEventListener('click', save);
    $('#petGo')?.addEventListener('click', () => { setPetHome(false); closePanel(); });
    $('#petStay')?.addEventListener('click', () => { setPetHome(true); closePanel(); });
    $('#petClose').addEventListener('click', closePanel);
    setTimeout(() => inp.focus(), 50);
  });
}
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
function setPetHome(on) {
  if (!pet) return;
  petHome = on; progress.petHome = on; saveProgress();
  const nombre = petName || pet.n;
  if (on) {
    pet.state = 'casa'; pet.swim = false; pet.g.position.set(PET_HOUSE.x + 1.2, 0.5, PET_HOUSE.z + 2); pet.y = 0.5; petWander = null;
    dust(PET_HOUSE.x + 1.2, 0.8, PET_HOUSE.z + 2, 10, 0xf9a8d4); sfx('pop');
    toast('⌂', 'A SU CASITA', `${nombre} se queda jugando`, 'Vuelve a la casita y pulsa E cuando quieras que te acompañe.', '#7c3aed');
  } else {
    pet.state = 'mascota'; pet.g.position.set(PET_DOOR[0] + 0.4, 0.5, PET_DOOR[1] + 0.8); pet.y = 0.5;
    sfx('win'); toast('♥', '¡VAMOS!', `${nombre} viene contigo`, 'Te seguirá por toda la arena.', '#ec4899');
  }
}
// cuando la mascota está en su casita (state 'casa')
function updatePetHome(a, dt, t) {
  const p = player.position, sleepy = night && minedCount < 999; // de noche duerme
  let tx = null, tz = null, speed = 1.3;
  const dPl = Math.hypot(p.x - a.g.position.x, p.z - a.g.position.z);
  petGreetT = Math.max(0, petGreetT - dt);
  if (!sleepy && dPl < 4 && feet < 1.5 && feet > -0.5 && petGreetT === 0) { // sale a saludarte
    petGreetT = 45; a.happy = 1.4; sfx('pop');
    for (let i = 0; i < 5; i++) { const h = new THREE.Sprite(new THREE.SpriteMaterial({ map: heartTex, transparent: true, depthTest: false })); h.scale.set(0.5, 0.5, 1); h.position.set(a.g.position.x + (Math.random() - 0.5) * 0.6, a.y + 1, a.g.position.z + (Math.random() - 0.5) * 0.6); h.userData.v = 0.8 + Math.random() * 0.5; scene.add(h); axoHearts.push(h); }
    toast('♥', petName || pet.n, '¡Se alegra de verte!', 'Pulsa E en la casita si quieres que venga contigo.', '#ec4899');
  }
  if (sleepy) { tx = PET_DOOR[0] - 0.9; tz = PET_DOOR[1] + 0.05; speed = 1.6; }   // a dormir junto a la puerta
  else if (a.happy > 0) { a.happy -= dt; tx = Math.min(PET_YARD.x2, Math.max(PET_YARD.x1, p.x)); tz = Math.min(PET_YARD.z2, Math.max(PET_YARD.z1, p.z)); speed = 3; }
  else {
    if (!petWander || (petNapT -= dt) <= 0) {
      const r = Math.random();
      petWander = r < 0.3 ? [ball.position.x, ball.position.z, 'ball'] : r < 0.5 ? [PET_BOWL[0] + 0.45, PET_BOWL[1], 'bowl'] :
        [PET_YARD.x1 + Math.random() * (PET_YARD.x2 - PET_YARD.x1), PET_YARD.z1 + Math.random() * (PET_YARD.z2 - PET_YARD.z1), 'walk'];
      petNapT = 2.5 + Math.random() * 3;
    }
    tx = petWander[0]; tz = petWander[1];
  }
  let moving = false;
  const dx = tx - a.g.position.x, dz = tz - a.g.position.z, d = Math.hypot(dx, dz);
  if (d > 0.15) { const st = Math.min(d, speed * dt); a.g.position.x += dx / d * st; a.g.position.z += dz / d * st; moving = true;
    let df = Math.atan2(dx, dz) - a.g.rotation.y; df = Math.atan2(Math.sin(df), Math.cos(df)); a.g.rotation.y += df * Math.min(1, dt * 8); }
  else if (petWander && petWander[2] === 'ball' && !sleepy) { // empuja la pelota
    const bx = PET_YARD.x1 + 0.2 + Math.random() * (PET_YARD.x2 - PET_YARD.x1 - 0.4), bz = PET_YARD.z1 + 0.2 + Math.random() * (PET_YARD.z2 - PET_YARD.z1 - 0.4);
    ball.userData.to = [bx, bz]; petWander = null; a.jumpT = 0.35; sfx('blip');
  }
  if (ball.userData.to) { const [bx, bz] = ball.userData.to; ball.position.x += (bx - ball.position.x) * Math.min(1, dt * 3); ball.position.z += (bz - ball.position.z) * Math.min(1, dt * 3); ball.rotation.y += dt * 6; if (Math.hypot(bx - ball.position.x, bz - ball.position.z) < 0.05) ball.userData.to = null; }
  a.jumpT = Math.max(0, (a.jumpT || 0) - dt);
  const spin = a.happy > 0 ? Math.abs(Math.sin(t * 9)) * 0.35 : 0;
  a.y = 0.5; a.g.position.y = a.y + Math.sin((a.jumpT || 0) / 0.35 * Math.PI) * 0.45 + spin;
  const sw = moving ? Math.sin(a.t * 10) * 0.6 : 0; a.legs.forEach((l, k) => l.rotation.x = sw * (k % 2 ? 1 : -1) * (k > 1 ? -1 : 1));
  a.headG.rotation.x = sleepy && !moving ? 0.5 : petWander && petWander[2] === 'bowl' && !moving ? Math.max(0, Math.sin(a.t * 6)) * 0.6 : 0;
  zzz.visible = sleepy && !moving; if (zzz.visible) zzz.position.set(a.g.position.x, a.y + 1.4 + Math.sin(t * 2) * 0.1, a.g.position.z);
  if (a.rope.visible) a.rope.visible = false;
}
// cada cuadro: nombre sobre la mascota
function updateMascota(dt, t) {
  if (petTag && pet) { petTag.visible = !selecting; petTag.position.set(pet.g.position.x, pet.g.position.y + 1.55, pet.g.position.z); }
  if (pet && pet.state !== 'casa') zzz.visible = false;
}
// se llama al elegir mascota
function onNewPet() { petHome = false; progress.petHome = false; renderHouseSign(); renderPetTag();
  setTimeout(() => toast('⌂', 'CASITA LISTA', 'Tu mascota tiene casita', 'Está en el pasto junto a tu casa: pulsa E en la puerta para ponerle nombre.', '#7c3aed'), 2600); }
// al cargar la partida
renderHouseSign(); renderPetTag();
