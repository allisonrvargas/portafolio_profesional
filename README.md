# Portafolio Profesional · Allison Vargas

Portafolio personal de **Allison Rocío Vargas Mejía**, técnico en desarrollo de software en formación en **Campuslands Guatemala**.

**Sitio en vivo:** https://allisonrvargas.github.io/portafolio_profesional/

---

## Secciones

| Sección | Contenido |
| --- | --- |
| **Inicio** | Presentación, fotografía, tecnologías principales y accesos rápidos |
| **Sobre mí** | Quién soy, formación, enfoque, trabajo en equipo e idiomas |
| **Experiencia** | Kid-Fit, MarisolliFlix y Gym Manager CLI, mostrados como un historial de commits |
| **Proyectos** | 13 proyectos con filtros por área: Backend, Frontend, Móvil, Bases de datos e IA |
| **Habilidades** | Backend, frontend y móvil, datos e IA, y herramientas |
| **Cómo trabajo** | Mi proceso: entender, diseñar, construir y probar, y entregar |
| **Contacto** | Correo, LinkedIn, GitHub y CV en PDF |

## Características

- Diseño responsivo para computadora, tablet y celular.
- Modo claro y oscuro, que se recuerda entre visitas.
- Filtros de proyectos por categoría.
- Animaciones suaves al hacer scroll, desactivadas si el sistema pide reducir el movimiento.
- Menú adaptable para celular.
- Sin frameworks: HTML, CSS y JavaScript puro.

## Tecnologías

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-8B5CF6?style=for-the-badge&logo=github&logoColor=white)

Tipografías: Instrument Serif, Manrope y JetBrains Mono (Google Fonts).

## Estructura

```
portafolio_profesional/
├── index.html          # Estructura de la página
├── css/
│   └── styles.css      # Colores, tipografía, diseño y modo oscuro
├── js/
│   └── main.js         # Proyectos, filtros, tema, menú y animaciones
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

## Cómo agregar un proyecto

Los proyectos están en el arreglo `proyectos` de `js/main.js`. Para agregar uno, copia un objeto y cambia sus datos:

```js
{
  t: 'Nombre del proyecto',
  cat: ['backend'],            // backend, frontend, movil, datos o ia
  d: 'Descripción corta.',
  tags: ['Node.js', 'MySQL'],
  link: 'https://github.com/allisonrvargas/repositorio',
  c: ['#7c3aed', '#c4b5fd'],   // colores del degradado de la portada
  ic: 'code'                   // ícono de la portada
}
```

## Contacto

- **Correo:** av503640@gmail.com
- **LinkedIn:** [linkedin.com/in/allisonrvargas](https://www.linkedin.com/in/allisonrvargas)
- **GitHub:** [@allisonrvargas](https://github.com/allisonrvargas)

---

© 2026 Allison Rocío Vargas Mejía
