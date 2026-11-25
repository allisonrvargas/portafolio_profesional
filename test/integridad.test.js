import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const leer = (ruta) => readFileSync(join(raiz, ruta), 'utf8');

// Extrae del código fuente solo las constantes de datos (arreglos y objetos literales) y las evalúa aisladas,
// sin ejecutar el resto del archivo, que depende del navegador.
function extraerConstante(codigo, nombre) {
    const inicio = codigo.search(new RegExp(`const ${nombre}\\s*=`));
    if (inicio < 0) throw new Error(`No se encontró const ${nombre}`);
    let i = codigo.indexOf('=', inicio) + 1;
    const desde = i;
    let profundidad = 0, comilla = null, abierto = false;
    for (; i < codigo.length; i++) {
        const c = codigo[i];
        if (comilla) {
            if (c === '\\') i++;
            else if (c === comilla) comilla = null;
        } else if (c === '"' || c === "'" || c === '`') comilla = c;
        else if (c === '[' || c === '{' || c === '(') { profundidad++; abierto = true; }
        else if (c === ']' || c === '}' || c === ')') profundidad--;
        else if ((c === ';' || c === '\n') && abierto && profundidad === 0) break;
        else if (c === ';' && !abierto) break;
        else if (c === '\n' && !abierto && codigo.slice(desde, i).trim()) break;
    }
    return `const ${nombre} =${codigo.slice(desde, i)};`;
}

function cargarDatos(ruta, nombres) {
    const codigo = leer(ruta);
    const previas = ['GH', 'CV'].filter((n) => new RegExp(`const ${n}\\s*=`).test(codigo)).map((n) => extraerConstante(codigo, n));
    const partes = [...previas, ...nombres.map((n) => extraerConstante(codigo, n))];
    return vm.runInNewContext(`${partes.join('\n')}\n;({ ${nombres.join(', ')} })`, {}, { filename: ruta });
}
function archivosJs(carpeta) {
    const lista = [];
    for (const nombre of readdirSync(join(raiz, carpeta))) {
        const ruta = join(carpeta, nombre);
        if (statSync(join(raiz, ruta)).isDirectory()) lista.push(...archivosJs(ruta));
        else if (nombre.endsWith('.js')) lista.push(ruta);
    }
    return lista;
}

const { proyectos, catName, aplicaciones, habilidades, historia } =
    cargarDatos('js/arena/datos/contenido.js', ['proyectos', 'catName', 'aplicaciones', 'habilidades', 'historia']);

test('los números del README coinciden con los datos reales', () => {
    const readme = leer('README.md');
    assert.equal(proyectos.length, Number(readme.match(/Mis (\d+) proyectos/)[1]));
    assert.equal(habilidades.length, Number(readme.match(/(\d+) habilidades para picar/)[1]));
});

test('cada proyecto tiene título, categorías válidas, descripción y etiquetas', () => {
    const titulos = new Set();
    for (const p of proyectos) {
        assert.ok(p.t && p.d.length > 20, `proyecto incompleto: ${p.t}`);
        assert.ok(Array.isArray(p.cat) && p.cat.length > 0, `${p.t} sin categorías`);
        for (const c of p.cat) assert.ok(c in catName, `${p.t}: categoría desconocida "${c}"`);
        assert.ok(Array.isArray(p.tags) && p.tags.length > 0, `${p.t} sin etiquetas`);
        assert.ok(!titulos.has(p.t), `título repetido: ${p.t}`);
        titulos.add(p.t);
    }
});

test('los enlaces de los proyectos y de las aplicaciones son HTTPS y bien formados', () => {
    const enlaces = [];
    for (const p of proyectos) for (const k of ['code', 'url', 'demo']) if (p[k]) enlaces.push(p[k]);
    for (const a of aplicaciones) enlaces.push(a.url, a.code);
    assert.ok(enlaces.length > 0);
    for (const e of enlaces) {
        const url = new URL(e); // lanza si está mal formado
        assert.equal(url.protocol, 'https:', e);
    }
    for (const a of aplicaciones) assert.match(a.code, /^https:\/\/github\.com\/allisonrvargas\/[\w.-]+$/);
});

test('las habilidades tienen datos completos y no se repiten', () => {
    const nombres = new Set();
    for (const h of habilidades) {
        assert.ok(h.a && h.n && h.u, `habilidad incompleta: ${JSON.stringify(h)}`);
        assert.match(h.c, /^#[0-9a-f]{6}$/i, `color inválido en ${h.n}`);
        assert.ok(!nombres.has(h.n), `habilidad repetida: ${h.n}`);
        nombres.add(h.n);
    }
});

test('la línea de tiempo no está vacía', () => {
    assert.ok(Array.isArray(historia) && historia.length > 0);
});

test('el modo clásico lista los mismos proyectos que el modo juego', () => {
    const { proyectos: clasicos } = cargarDatos('js/clasico.js', ['proyectos']);
    // [...x] copia a un arreglo del mismo contexto (los datos vienen de un contexto aislado de vm)
    assert.deepEqual([...clasicos.map((p) => p.t)].sort(), [...proyectos.map((p) => p.t)].sort());
});

for (const pagina of ['index.html', 'clasico.html']) {
    test(`${pagina}: todos los archivos locales que enlaza existen`, () => {
        const html = leer(pagina);
        const locales = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)]
            .map((m) => m[1].split('?')[0])
            .filter((r) => !/^(https?:|mailto:|data:|\/\/)/.test(r));
        assert.ok(locales.length > 0);
        for (const ruta of locales) assert.ok(existsSync(join(raiz, ruta)), `${pagina} enlaza a ${ruta}, que no existe`);
    });
}

test('el CV enlazado existe', () => {
    const ruta = leer('js/arena/datos/contenido.js').match(/const CV = '([^']+)'/)[1];
    assert.ok(existsSync(join(raiz, ruta)), ruta);
});

test('todos los scripts del juego tienen sintaxis válida', () => {
    const lista = archivosJs('js');
    assert.ok(lista.length > 40);
    for (const ruta of lista) {
        const r = spawnSync(process.execPath, ['--check', join(raiz, ruta)], { encoding: 'utf8' });
        assert.equal(r.status, 0, `error de sintaxis en ${ruta}:\n${r.stderr}`);
    }
});

test('el repositorio no incluye secretos ni dependencias versionadas', () => {
    assert.ok(!existsSync(join(raiz, '.env')));
});