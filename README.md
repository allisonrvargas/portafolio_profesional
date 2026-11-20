# La Arena de Allison · Portafolio 3D

Portafolio interactivo de **Allison Rocío Vargas Mejía**, técnico en desarrollo de software en formación en **Campuslands Guatemala** y estudiante de Ingeniería en Ciencias y Sistemas.

**Sitio en vivo:** https://allisonrvargas.github.io/portafolio_profesional/

---

## La idea

Mi portafolio es un mundo 3D de bloques inspirado en lo que más me gusta: los juegos de **construcción** y de **estrategia**. Es una arena con un río, dos puentes, torres y un castillo, rodeada de cerezos rosas. Caminas con mi personaje, entras a cada edificio para conocer una parte de mí y picas los bloques brillantes para descubrir mis habilidades.

## El mapa

| Lugar | Sección |
| --- | --- |
| La casa | Sobre mí: historia, línea de tiempo "Bloque a bloque" y lo que me gusta |
| Torre de proyectos | Mis 15 proyectos, con filtros por área y detalle de cada uno |
| Torre arcade | Aplicaciones: mis páginas publicadas, funcionando dentro del portafolio |
| Escenario | Radio Allison: música chiptune original |
| Castillo | Contacto: correo, LinkedIn, GitHub y CV |
| Cofre | Mi CV para abrir o descargar |
| Bloques brillantes | 18 habilidades para picar y llenar el inventario |

## Cómo se juega

- **W A S D** o las flechas para caminar, **Shift** para correr.
- **E** para entrar a un edificio o picar un bloque.
- También puedes **tocar el suelo** para caminar hasta ahí, o tocar un edificio o un bloque.
- El **mapa** de la esquina y el menú **Viajar a…** te llevan a cualquier lugar.
- Las **misiones** marcan lo que ya visitaste. Si picas las 18 habilidades, ganas la corona.
- **M** pone o pausa la música.

¿Prefieres leer? El **modo clásico** (`clasico.html`) tiene todo el contenido en una página normal.

## Tecnologías

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![Web Audio API](https://img.shields.io/badge/Web%20Audio%20API-EC4899?style=for-the-badge)

- **Three.js** para el mundo 3D: bloques con texturas pixel art generadas en código, sombras, agua animada, nubes y pétalos.
- **Web Audio API** para la música chiptune y los efectos de sonido.
- **Canvas** para el minimapa, las etiquetas y la pantalla de la torre arcade.
- Tipografías: Great Vibes, Bubblegum Sans y Manrope (Google Fonts).

## Estructura

```
portafolio_profesional/
├── index.html          # La Arena 3D
├── clasico.html        # Modo clásico
├── css/
│   ├── arena.css       # Estilos de la arena (HUD, paneles, menú)
│   └── styles.css      # Estilos del modo clásico
├── js/
│   ├── arena.js        # Mundo 3D, personaje, misiones, habilidades y secciones
│   └── main.js         # Modo clásico
├── img/
│   └── allison.jpg
├── cv/
│   └── CV_Allison_Rocio_Vargas_Mejia.pdf
└── README.md
```

## Cómo verlo en local

La arena usa módulos de JavaScript, así que necesita un servidor local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/allisonrvargas/portafolio_profesional.git
   ```
2. Ábrelo con la extensión **Live Server** de VS Code.

## Cómo editar el contenido

Los datos están al inicio de `js/arena.js`:

- `proyectos`: los proyectos de la torre.
- `aplicaciones`: las demos de la torre arcade.
- `habilidades`: los bloques para picar.
- `historia`: la línea de tiempo.
- `pistas`: las canciones de la radio.

## Contacto

- **Correo:** av503640@gmail.com
- **LinkedIn:** [linkedin.com/in/allisonrvargas](https://www.linkedin.com/in/allisonrvargas)
- **GitHub:** [@allisonrvargas](https://github.com/allisonrvargas)

---

© 2026 Allison Rocío Vargas Mejía
