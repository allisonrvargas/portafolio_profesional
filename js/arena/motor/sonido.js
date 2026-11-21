'use strict';
// Música chiptune y efectos de sonido (Web Audio).

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
  if (k === 'splash') { // chapuzón: golpe de agua, salpicadura y burbujitas
    grit(t, 0.08, 700, 0.9, 300);                     // golpe al caer
    grit(t + 0.02, 0.45, 2600, 0.55, 900);             // salpicadura que se apaga
    grit(t + 0.05, 0.3, 5200, 0.25, 2000);             // gotitas finas
    [0, 1, 2, 3, 4].forEach(i => { const b = t + 0.18 + i * 0.07 + Math.random() * 0.03, o = actx.createOscillator(), g = actx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(380 + Math.random() * 300, b); o.frequency.exponentialRampToValueAtTime(900 + Math.random() * 500, b + 0.06);
      g.gain.setValueAtTime(0.18, b); g.gain.exponentialRampToValueAtTime(0.001, b + 0.07); o.connect(g); g.connect(master); o.start(b); o.stop(b + 0.09); });
  }
  if (k === 'splashOut') { grit(t, 0.2, 1800, 0.3, 700); grit(t + 0.05, 0.15, 4200, 0.12, 2500); }
  if (k === 'arrow') { grit(t, 0.12, 2400, 0.35); tone(81, t, 0.05, 'triangle', 0.15); }
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
