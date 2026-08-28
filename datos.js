/* Todo el contenido editable vive acá.
   La idea es que el dueño del local pueda cambiar precios y platos sin tocar
   una sola línea de HTML ni de lógica. */

const MENU = {
  cafe: {
    titulo: "Café",
    nota: "Todo nuestro espresso sale de grano tostado esta semana.",
    items: [
      ["Espresso",            "Corto, doble o ristretto.",                              2400],
      ["Cortado",             "Espresso con un toque de leche texturizada.",            2700],
      ["Flat white",          "Doble espresso, leche sedosa, sin espuma.",              3600, "el más pedido"],
      ["Cappuccino",          "Con cacao amargo por encima si querés.",                 3600],
      ["Latte",               "En taza grande. Se puede pedir con avena o almendras.",  3800],
      ["V60 de filtrado",     "Método por goteo. Elegís el origen de la carta.",        4200, "de la casa"],
      ["Prensa francesa",     "Para dos personas. Cuerpo redondo, muy aromático.",      5400],
      ["Cold brew",           "Doce horas de infusión en frío. Servido con hielo.",     4000],
      ["Espresso tónica",     "Espresso, tónica artesanal y cáscara de naranja.",       4600],
    ],
  },
  desayunos: {
    titulo: "Desayunos",
    nota: "Se sirven hasta las 12:30. Todos vienen con café o infusión.",
    items: [
      ["Medialunas de manteca", "Tres unidades, hechas acá cada mañana.",                4200],
      ["Tostado de campo",      "Pan de masa madre, jamón natural y queso de máquina.",  6800],
      ["Palta y huevo",         "Masa madre, palta, huevo poché y semillas tostadas.",   8900, "vegetariano"],
      ["Yogur y granola",       "Yogur natural, granola de la casa y fruta de estación.",6200, "vegetariano"],
      ["Porridge de avena",     "Con manzana asada, canela y almendras.",                5900, "vegano"],
      ["Huevos revueltos",      "Cremosos, con ciboulette y tostadas de masa madre.",    7600],
    ],
  },
  cocina: {
    titulo: "Cocina",
    nota: "De 12 a 16. La carta cambia según lo que traiga la verdulería.",
    items: [
      ["Sándwich de bondiola",  "Braseada ocho horas, coleslaw y pan de papa.",         11800, "el más pedido"],
      ["Focaccia de estación",  "Vegetales asados, ricota y albahaca.",                  9800, "vegetariano"],
      ["Ensalada de lentejas",  "Lentejas, calabaza asada, rúcula y vinagreta de mostaza.",9200, "vegano"],
      ["Tarta del día",         "Preguntá cuál es. Viene con ensalada verde.",            8600],
      ["Milanesa de berenjena", "Al horno, con puré de garbanzos y limón.",             10400, "vegetariano"],
      ["Sopa del día",          "Servida con pan de masa madre tostado.",                 6400],
    ],
  },
  pasteleria: {
    titulo: "Pastelería",
    nota: "Todo se hace en el local. Cuando se termina, se terminó.",
    items: [
      ["Cheesecake vasco",      "Quemado por fuera, cremoso por dentro.",                 6200, "el más pedido"],
      ["Alfajor de maicena",    "Con dulce de leche repostero y coco.",                   3200],
      ["Roll de canela",        "Glaseado de queso crema. Sale caliente a las 10.",       5400],
      ["Budín de limón",        "Con semillas de amapola y glasé ácido.",                 4400],
      ["Brownie sin harina",    "Chocolate 70%, nuez pecán.",                             5200, "sin TACC"],
      ["Cookie de chocolate",   "Grande, con sal marina arriba.",                         3600],
    ],
  },
  otras: {
    titulo: "Otras bebidas",
    nota: "",
    items: [
      ["Matcha latte",          "Grado ceremonial, batido a mano.",                       5200],
      ["Chocolate caliente",    "Con chocolate 60% derretido, no cacao en polvo.",        4800],
      ["Té en hebras",          "Cinco variedades. Preguntá por las del día.",            3400],
      ["Limonada de jengibre",  "Con menta fresca y un toque de miel.",                   4200],
      ["Kombucha de la casa",   "Fermentada acá. Rotamos el sabor cada mes.",             4600],
      ["Jugo exprimido",        "Naranja o pomelo, según el día.",                        3800],
    ],
  },
};

const ORIGENES = [
  { finca: "La Esperanza",  pais: "Colombia",  region: "Huila",
    notas: ["Panela", "Ciruela", "Cacao"],       proceso: "Lavado",   altura: "1.750 m" },
  { finca: "Kirinyaga",     pais: "Kenia",     region: "Kirinyaga",
    notas: ["Grosella", "Tomate", "Cítrico"],    proceso: "Lavado",   altura: "1.900 m" },
  { finca: "Yirgacheffe",   pais: "Etiopía",   region: "Gedeo",
    notas: ["Jazmín", "Durazno", "Té negro"],    proceso: "Natural",  altura: "2.100 m" },
  { finca: "Santa Rosa",    pais: "Brasil",    region: "Cerrado",
    notas: ["Maní", "Chocolate", "Caramelo"],    proceso: "Honey",    altura: "1.200 m" },
  { finca: "El Mirador",    pais: "Perú",      region: "Cajamarca",
    notas: ["Manzana verde", "Miel", "Almendra"],proceso: "Lavado",   altura: "1.850 m" },
  { finca: "Las Nubes",     pais: "Guatemala", region: "Huehuetenango",
    notas: ["Naranja", "Miel de caña", "Nuez"],  proceso: "Lavado",   altura: "1.950 m" },
  { finca: "Finca Bruma",   pais: "Argentina", region: "Tueste propio",
    notas: ["Mezcla de casa", "Estable", "Dulce"], proceso: "Blend",  altura: "—" },
];

const GALERIA = [
  ["salon", "Salón principal con mesas de madera"],
  ["latte-art", "Taza de café con arte en la leche"],
  ["mesa-servida", "Mesa servida con café y medialunas"],
  ["barra-espresso", "Barra con la máquina de espresso"],
  ["interior-luz", "Interior del café con luz natural"],
  ["granos", "Granos de café recién tostados"],
  ["taza-blanca", "Café servido en taza blanca"],
  ["pasteleria", "Pastelería de la casa en exhibición"],
];

const HORARIOS = [
  ["Lunes",     "08:00", "20:00"],
  ["Martes",    "08:00", "20:00"],
  ["Miércoles", "08:00", "20:00"],
  ["Jueves",    "08:00", "20:00"],
  ["Viernes",   "08:00", "22:00"],
  ["Sábado",    "09:00", "22:00"],
  ["Domingo",   "09:00", "18:00"],
];
