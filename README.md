# Portafolio Profesional · Allison Vargas

Portafolio interactivo de **Allison Rocío Vargas Mejía**, técnico en desarrollo de software en formación en **Campuslands Guatemala** y estudiante de Ingeniería en Ciencias y Sistemas.

**Sitio en vivo:** https://allisonrvargas.github.io/portafolio_profesional/

---

## La idea

El portafolio es un videojuego. Quien lo visita pulsa START y recorre mi perfil nivel por nivel, como en los juegos de estrategia y construcción que me gustan, con música chiptune de fondo.

## Secciones

| Sección | Contenido |
| --- | --- |
| Inicio | Pantalla de START con un bloque 3D que se puede girar, con o sin música |
| 01 · Sobre mí | Tarjeta de jugadora, historia, estadísticas, inventario de habilidades, la línea de tiempo "Bloque a bloque" y lo que me gusta: videojuegos y música, con una radio integrada |
| 02 · Proyectos | 15 proyectos como bloques, con filtros por bioma y ventana de detalle |
| 03 · Aplicaciones | Demos en vivo de mis páginas publicadas, insertadas en la página: CampusShop, Campus Parking y Gestión de Hotel |
| Contacto | Correo, LinkedIn, GitHub y CV. También hay accesos en la tarjeta de jugadora y en el menú |

## Características

- HUD fijo con barra de XP según el avance del scroll y el nivel actual.
- Menú para saltar a cualquier nivel.
- Música chiptune original generada con la Web Audio API, con ecualizador animado.
- Efectos de sonido y notificaciones al llegar a cada nivel.
- Cielo pixelado animado con estrellas y bloques flotantes en canvas.
- Arte pixelado único para cada proyecto, generado a partir de su nombre.
- Código secreto escondido.
- Diseño responsivo y respeto por la opción de reducir el movimiento.
- Sin frameworks: HTML, CSS y JavaScript puro.

## Tecnologías

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Web Audio API](https://img.shields.io/badge/Web%20Audio%20API-EC4899?style=for-the-badge)
![Canvas](https://img.shields.io/badge/Canvas-EC4899?style=for-the-badge)

Tipografías: Great Vibes (nombre y títulos), Bubblegum Sans y Manrope (Google Fonts).

## Estructura

```
portafolio_profesional/
├── index.html          # Niveles y estructura de la página
├── css/
│   └── styles.css      # Estilo pixel art, HUD, bloques, demos y animaciones
├── js/
│   └── main.js         # Datos, música, HUD, proyectos, demos y cielo animado
├── img/
│   └── allison.jpg     # Fotografía de perfil
├── cv/
│   └── CV_Allison_Rocio_Vargas_Mejia.pdf
└── README.md
```

## Cómo verlo en local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/allisonrvargas/portafolio_profesional.git
   ```
2. Abre `index.html` en el navegador, o usa la extensión **Live Server** de VS Code.

## Cómo editar el contenido

Todo el contenido que cambia está al inicio de `js/main.js`:

- `proyectos`: los bloques del modo construcción.
- `aplicaciones`: las demos insertadas en la sección Aplicaciones.
- `pistas`: las canciones de la radio.

## Contacto

- **Correo:** av503640@gmail.com
- **LinkedIn:** [linkedin.com/in/allisonrvargas](https://www.linkedin.com/in/allisonrvargas)
- **GitHub:** [@allisonrvargas](https://github.com/allisonrvargas)

---

© 2026 Allison Rocío Vargas Mejía
