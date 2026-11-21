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
    galeria.push({ o, i, x: west ? -10.9 : -10.1, z: o.z });
  });
}
function nearObra(p) {
  let best = null, bd = 1.9;
  galeria.forEach(gp => { const d = Math.hypot(p.x - gp.x, p.z - gp.z); if (d < bd) { bd = d; best = gp; } });
  return best;
}
function verObra(gp) {
  const o = gp.o; award(`obra:${gp.i}`, 20, 'Obra: ' + o.t);
  showPanel(`<p class="p-kicker">GALERÍA DEL TÚNEL</p><h2 id="panelTitle">${o.t}</h2>
    <figure class="obra"><img src="img/obras/${o.img}" alt="${o.t}, de ${o.a}"><figcaption>${o.a} · ${o.y}</figcaption></figure>
    <p>${o.d}</p><p class="obra-nota">Obra de dominio público.</p>`);
}
