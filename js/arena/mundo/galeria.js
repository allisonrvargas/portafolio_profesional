'use strict';
// Galería del túnel: pinturas famosas (de dominio público) colgadas en las paredes del pasillo de mina.
// Para agregar una obra: pon la imagen en img/obras/ y suma un objeto a la lista.

const obras = [
  { img: 'noche-estrellada.jpg', t: 'La noche estrellada', a: 'Vincent van Gogh', y: 1889, w: 'oeste', z: 6.5,
    d: 'Van Gogh la pintó mientras vivía en un sanatorio en Saint-Rémy-de-Provence, Francia. El cielo en remolinos y las estrellas brillantes la hicieron una de las pinturas más famosas del mundo.' },
  { img: 'el-grito.jpg', t: 'El grito', a: 'Edvard Munch', y: 1893, w: 'este', z: 9.5,
    d: 'Obra clave del expresionismo. Munch quiso mostrar un sentimiento de angustia: por eso el cielo naranja y las líneas que parecen moverse alrededor de la figura.' },
  { img: 'nenufares.jpg', t: 'Nenúfares', a: 'Claude Monet', y: 1916, w: 'oeste', z: 12.5,
    d: 'Monet pintó muchas veces el estanque de su jardín en Giverny. Es impresionismo: pinceladas sueltas que capturan la luz y los reflejos del agua.' }
];

const galeria = [];
{
  const loader = new THREE.TextureLoader();
  obras.forEach((o, i) => {
    const g = new THREE.Group(); scene.add(g);
    const west = o.w === 'oeste';
    g.position.set(west ? -11.45 : -9.55, -3.95, o.z); g.rotation.y = west ? Math.PI / 2 : -Math.PI / 2;
    const tilt = new THREE.Group(); tilt.position.z = 0.42; tilt.rotation.x = -0.75; g.add(tilt); // inclinada para verla desde arriba
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const canvas = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat); canvas.position.z = 0.05; tilt.add(canvas);
    const frame = part(1, 1, 0.08, 0xc9a227, 0, 0, 0, tilt);                    // marco dorado
    const size = (w, h) => { const s = 1.45 / Math.max(w, h); canvas.scale.set(w * s, h * s, 1); frame.scale.set(w * s + 0.16, h * s + 0.16, 1); };
    size(4, 3);
    loader.load(`img/obras/${o.img}`, tex => { tex.colorSpace = THREE.SRGBColorSpace; mat.map = tex; mat.needsUpdate = true; size(tex.image.width, tex.image.height); });
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.08, 0.14), new THREE.MeshBasicMaterial({ color: 0xffe8a3 })); lamp.position.set(0, 0.95, 0.12); tilt.add(lamp);
    galeria.push({ o, i, x: west ? -10.9 : -10.1, z: o.z, tilt, canvas });
  });
}
function nearObra(p) {
  let best = null, bd = 1.9;
  galeria.forEach(gp => { const d = Math.hypot(p.x - gp.x, p.z - gp.z); if (d < bd) { bd = d; best = gp; } });
  return best;
}
// Modo mirar: la cámara se pone a la altura de los ojos del personaje, frente al cuadro
let viendo = null, verFov = 60;
const _c = new THREE.Vector3(), _n = new THREE.Vector3(), _q = new THREE.Quaternion();
function verObra(gp) {
  viendo = gp; target = null; waypoints = [];
  const o = gp.o; award(`obra:${gp.i}`, 20, 'Obra: ' + o.t);
  const card = $('#obraCard');
  card.querySelector('h3').textContent = o.t;
  card.querySelector('.obra-autor').textContent = `${o.a} · ${o.y}`;
  card.querySelector('.obra-texto').textContent = o.d;
  card.querySelector('.obra-num').textContent = `${gp.i + 1} / ${galeria.length}`;
  card.hidden = false; sfx('open');
}
function salirObra() { if (!viendo) return; viendo = null; $('#obraCard').hidden = true; sfx('blip'); }
function cambiarObra(paso) { if (!viendo) return; verObra(galeria[(viendo.i + paso + galeria.length) % galeria.length]); }
// la cámara mira el cuadro; las demás pinturas quedan inclinadas para verse desde arriba
function camaraObra(dt) {
  galeria.forEach(gp => {
    const on = gp === viendo;
    gp.tilt.rotation.x += ((on ? 0 : -0.75) - gp.tilt.rotation.x) * Math.min(1, dt * 6);
    gp.tilt.position.z += ((on ? 0.14 : 0.42) - gp.tilt.position.z) * Math.min(1, dt * 6);
  });
  camera.fov += ((viendo ? verFov : started && !selecting ? camFov() : 38) - camera.fov) * Math.min(1, dt * 5); camera.updateProjectionMatrix();
  if (!viendo) return false;
  viendo.canvas.getWorldPosition(_c); _n.set(0, 0, 1).applyQuaternion(viendo.canvas.getWorldQuaternion(_q));
  // distancia según el alto del cuadro, para que se vea completo arriba de la tarjeta (cámara derecha, como los ojos)
  const h = viendo.canvas.scale.y, d = 1.5;                                     // la cámara se queda dentro del pasillo
  verFov = Math.min(86, Math.max(52, 2 * Math.atan((h + 0.35) / (0.62 * 2 * d)) * 180 / Math.PI)); // cuadros altos: más ángulo
  const drop = 0.38 * d * Math.tan(verFov * Math.PI / 360);                       // el cuadro queda arriba de la tarjeta
  camPos.lerp(_c.clone().addScaledVector(_n, d).add(new THREE.Vector3(0, -drop, 0)), Math.min(1, dt * 4));
  camLook.lerp(_c.clone().add(new THREE.Vector3(0, -drop, 0)), Math.min(1, dt * 6));
  return true;
}
$('#obraPrev').addEventListener('click', () => cambiarObra(-1));
$('#obraNext').addEventListener('click', () => cambiarObra(1));
$('#obraExit').addEventListener('click', salirObra);
