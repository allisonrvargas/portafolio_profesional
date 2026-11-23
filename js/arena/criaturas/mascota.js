'use strict';
// Casita de la mascota: está en el pasto junto a la casa. Le pones nombre, la dejas jugando en su casita o la llevas contigo.
// De noche duerme dentro (Zzz) y cuando pasas cerca sale a saludarte.

const PET_HOUSE = { x: -5, z: 11.8 }; // en el pasto junto al camino de la casa
const PET_DOOR = [PET_HOUSE.x + 1.25, PET_HOUSE.z], PET_BOWL = [PET_HOUSE.x + 1.3, PET_HOUSE.z + 2.6];
const PET_YARD = { x1: PET_HOUSE.x + 0.55, x2: PET_HOUSE.x + 2.0, z1: PET_HOUSE.z + 0.9, z2: PET_HOUSE.z + 3.15 };
const PET_BOX = [PET_HOUSE.x - 0.8, PET_HOUSE.z - 0.75, PET_HOUSE.x + 0.8, PET_HOUSE.z + 0.75]; // nadie la atraviesa
let petName = (progress.petName || '').slice(0, 16);
let petHome = !!progress.petHome, petGreetT = 0, petTag = null, petWander = null, petNapT = 0;

// la casita (diseño original: rosa con techo morado)
const petHouse = new THREE.Group(); petHouse.position.set(PET_HOUSE.x, 0.5, PET_HOUSE.z); scene.add(petHouse);
part(1.5, 1.05, 1.4, 0xf9a8d4, 0, 0.52, 0, petHouse);                       // paredes
part(1.56, 0.12, 1.46, 0xdb2777, 0, 0.06, 0, petHouse);                      // zócalo
const roofL = part(1.75, 0.14, 0.95, 0x7c3aed, 0, 1.3, -0.33, petHouse); roofL.rotation.x = 0.62;
const roofR = part(1.75, 0.14, 0.95, 0x7c3aed, 0, 1.3, 0.33, petHouse); roofR.rotation.x = -0.62;
part(0.08, 0.66, 0.66, 0x3b1d3a, 0.74, 0.37, 0, petHouse);                    // puerta (hacia el camino)
part(0.06, 0.08, 0.78, 0xffffff, 0.76, 0.74, 0, petHouse);                    // marco
part(0.04, 0.24, 0.24, 0xfde68a, 0.76, 0.85, 0.48, petHouse);                 // ventanita con luz
const bowl = new THREE.Group(); bowl.position.set(PET_BOWL[0], 0.5, PET_BOWL[1]); scene.add(bowl);
part(0.46, 0.14, 0.46, 0x38bdf8, 0, 0.07, 0, bowl); part(0.34, 0.05, 0.34, 0xa16207, 0, 0.15, 0, bowl); // plato con comida
const ball = part(0.22, 0.22, 0.22, 0xfacc15, PET_HOUSE.x + 1.0, 0.61, PET_HOUSE.z + 1.6, scene);       // pelotita para jugar
solid(...PET_BOX);
let houseSign = null;
function renderHouseSign() {
  if (houseSign) scene.remove(houseSign);
  houseSign = label(pet ? `Casita de ${petName || pet.n}` : 'Casita · ¿de quién será?', '#7c3aed');
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
  showPanel(`<p class="p-kicker">CASITA DE TU MASCOTA</p><h2 id="panelTitle">Casita de ${esc(nombre)}</h2>
    <p class="lead">${petHome ? `${esc(nombre)} está jugando en su casita.` : `${esc(nombre)} anda contigo por la arena.`}</p>
    <label class="pet-name">¿Cómo se llama?
      <span><input id="petNameIn" maxlength="16" autocomplete="off" value="${esc(petName)}" placeholder="${esc(pet.n)}"><button class="btn" id="petNameOk">Guardar nombre</button></span></label>
    <div class="row pet-actions">
      ${petHome ? `<button class="btn big" id="petGo">Que venga conmigo</button>` : `<button class="btn big" id="petStay">Dejar en su casita</button>`}
      <button class="btn" id="petClose">Cerrar</button></div>
    <p class="pet-tip">En su casita juega con la pelota, come de su plato y de noche se duerme. Cuando pases cerca saldrá a saludarte.</p>`, () => {
    const inp = $('#petNameIn');
    const save = () => { const v = inp.value.replace(/[<>]/g, '').trim().slice(0, 16); petName = v; progress.petName = v; saveProgress();
      renderHouseSign(); renderPetTag(); if (v) award('petName', 20, 'Nombre para tu mascota');
      sfx('pop'); toast('♥', 'NOMBRE GUARDADO', v ? `Ahora se llama ${v}` : 'Sin nombre', v ? 'El nombre aparece en su casita y sobre su cabeza.' : 'Puedes ponérselo cuando quieras.', '#db2777');
      $('#panelTitle').textContent = `Casita de ${v || pet.n}`; $('#panelBody .lead').textContent = `${v || pet.n} ${petHome ? 'está jugando en su casita.' : 'anda contigo por la arena.'}`; };
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
    pet.state = 'casa'; pet.swim = false; pet.g.position.set(6, 0.5, -4.4); pet.y = 0.5; petWander = null;
    dust(6, 0.8, -4.4, 10, 0xf9a8d4); sfx('pop');
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
  if (ball.userData.to) { const [bx, bz] = ball.userData.to; ball.position.x += (bx - ball.position.x) * Math.min(1, dt * 3); ball.position.z += (bz - ball.position.z) * Math.min(1, dt * 3); ball.rotation.x += dt * 8; if (Math.hypot(bx - ball.position.x, bz - ball.position.z) < 0.05) ball.userData.to = null; }
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
