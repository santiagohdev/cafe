# Bruma — Café de especialidad

Bruma no existe: es una cafetería inventada que usé como pretexto para
construir un sitio institucional completo desde cero, sin frameworks ni
plantillas. No hubo cliente ni encargo — el objetivo era ejercitar un
proyecto entero de punta a punta.

Estático, sin dependencias ni build.

**Demo:** https://cafe-theta-one.vercel.app

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

![La portada, con el estado de apertura calculado contra la hora real del visitante.](docs/cover.jpg)

<sub>La portada, con el estado de apertura calculado contra la hora real del visitante.</sub>


## Qué incluye

- Hero con estado de apertura calculado contra la hora real del visitante
- Menú de 5 categorías y 33 platos, con etiquetas de dieta
- 7 orígenes de café con notas de cata, proceso y altura
- Galería con lightbox navegable por teclado
- Horarios que resaltan el día actual
- Mapa embebido (OpenStreetMap, sin API key ni tarjeta)
- Formulario de reserva con validación propia
- Responsive, accesible y con soporte de `prefers-reduced-motion`

## Editar el contenido

Todo el contenido está en `datos.js`: precios, platos, orígenes y horarios.
No hace falta tocar HTML ni JavaScript para actualizar la carta.

## Correr en local

```bash
python3 -m http.server 8899
```

## Estructura

```
index.html    marcado
style.css     sistema de diseño y layout
datos.js      contenido editable
script.js     comportamiento
```

Pesa 64 KB en total. No usa frameworks.

---

Diseño y desarrollo: [Santiago Hermosilla](https://santiagohermosilla.com)
