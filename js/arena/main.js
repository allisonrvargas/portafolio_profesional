// LA ARENA DE ALLISON · punto de entrada
// Carga Three.js y luego cada parte del juego en este orden.
// Los archivos comparten variables entre sí, por eso el orden importa:
// primero datos y motor, después el mundo, los personajes y al final el bucle y el arranque.
import * as THREE from 'three';
window.THREE = THREE;

const version = new URL(import.meta.url).searchParams.get('v') || '';
const archivos = [
  'datos/contenido.js',
  'motor/sonido.js',
  'motor/utilidades.js',
  'motor/render.js',
  'mundo/texturas.js',
  'mundo/terreno.js',
  'mundo/edificios.js',
  'mundo/cueva.js',
  'mundo/faroles.js',
  'mundo/bloques.js',
  'mundo/decoracion.js',
  'personajes/jugadora.js',
  'mundo/ambiente.js',
  'juego/lugares.js',
  'criaturas/cueva.js',
  'juego/habilidades.js',
  'juego/movimiento.js',
  'castillo/linea-tiempo.js',
  'castillo/camas.js',
  'castillo/guardianes.js',
  'escenario/dj.js',
  'motor/silueta.js',
  'mundo/cielo.js',
  'criaturas/monstruos.js',
  'criaturas/animales.js',
  'juego/interaccion.js',
  'interfaz/hud.js',
  'interfaz/minimapa.js',
  'interfaz/paneles.js',
  'juego/controles.js',
  'juego/bucle.js',
  'juego/progreso.js',
  'juego/vidas.js',
  'interfaz/final.js',
  'interfaz/tutorial.js',
  'juego/pisadas.js',
  'personajes/seleccion.js',
  'personajes/guia.js',
  'juego/arranque.js'
];

archivos.forEach(ruta => {
  const s = document.createElement('script');
  s.src = new URL(ruta, import.meta.url).href + (version ? '?v=' + version : '');
  s.async = false; // se ejecutan en el orden de la lista
  s.onerror = () => console.error('No se pudo cargar ' + ruta);
  document.body.appendChild(s);
});
