'use strict';
// Three.js: lienzo, escena, cámara y luces.

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
const skyCanvas = document.createElement('canvas'); skyCanvas.width = 2; skyCanvas.height = 256;
const skyTex = new THREE.CanvasTexture(skyCanvas); skyTex.colorSpace = THREE.SRGBColorSpace;
const camera = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, 0.1, 300);
const hemi = new THREE.HemisphereLight(0xfff4fa, 0xd8a7c0, 1.05); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffffff, 1.7);
sun.position.set(20, 34, 14); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -34, right: 34, top: 34, bottom: -34, near: 1, far: 90 }); sun.shadow.bias = -0.0006;
scene.add(sun);
