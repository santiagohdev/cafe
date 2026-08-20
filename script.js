/* ============================================================
   Bruma — comportamiento
   Todo el contenido sale de datos.js. Acá solo hay lógica.
   ============================================================ */

// Se marca antes que nada: habilita el ocultamiento del reveal en CSS.
document.documentElement.classList.add("js");

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const precio = n => "$ " + n.toLocaleString("es-AR");

/* ---------- NAV ---------- */
const nav = $("#nav"), burger = $("#burger"), links = $("#links");

const alScrollear = () => nav.classList.toggle("solido", scrollY > 40);
addEventListener("scroll", alScrollear, { passive: true });
alScrollear();

burger.addEventListener("click", () => {
  const abierto = links.classList.toggle("abierto");
  burger.setAttribute("aria-expanded", String(abierto));
  document.body.style.overflow = abierto ? "hidden" : "";
});

// Tocar un link cierra el menú móvil: si no, tapa la sección a la que saltás.
links.addEventListener("click", e => {
  if (e.target.tagName !== "A") return;
  links.classList.remove("abierto");
  burger.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
});

/* ---------- MENÚ ---------- */
// Estas dos se pintan distinto: una es "lo más pedido", la otra es info dietaria.
const ES_DIETA = /vegano|vegetariano|sin TACC/i;

function pintarMenu(clave) {
  const cat = MENU[clave];
  const platos = cat.items.map(([nom, desc, val, etq]) => `
    <div class="plato">
      <span class="plato__nom">${nom}${etq
        ? `<span class="etiqueta${ES_DIETA.test(etq) ? " etiqueta--dieta" : ""}">${etq}</span>`
        : ""}</span>
      <span class="plato__precio">${precio(val)}</span>
      <p class="plato__desc">${desc}</p>
    </div>`).join("");

  $("#menu-contenido").innerHTML =
    (cat.nota ? `<p class="menu__nota-cat">${cat.nota}</p>` : "") +
    `<div class="menu__grid">${platos}</div>`;
}

$$(".tabs button").forEach(b => b.addEventListener("click", () => {
  $$(".tabs button").forEach(o => o.setAttribute("aria-selected", "false"));
  b.setAttribute("aria-selected", "true");
  pintarMenu(b.dataset.tab);
}));
pintarMenu("cafe");

/* ---------- ORÍGENES ---------- */
$("#origenes").innerHTML = ORIGENES.map(o => `
  <article class="origen">
    <div class="origen__pais">${o.pais}</div>
    <h3>${o.finca}</h3>
    <p class="origen__region">${o.region}</p>
    <div class="origen__notas">${o.notas.map(n => `<span>${n}</span>`).join("")}</div>
    <div class="origen__pie"><span>${o.proceso}</span><span>${o.altura}</span></div>
  </article>`).join("");

/* ---------- GALERÍA + LIGHTBOX ---------- */
const url = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

$("#galeria").innerHTML = GALERIA.map(([id, alt], i) => `
  <button data-i="${i}" aria-label="Ampliar: ${alt}">
    <img src="${url(id, 700)}" alt="${alt}" loading="lazy">
  </button>`).join("");

const lb = $("#lightbox"), lbImg = $("#lb-img"), lbCont = $("#lb-contador");
let actual = 0;

function abrirLB(i) {
  actual = (i + GALERIA.length) % GALERIA.length;
  const [id, alt] = GALERIA[actual];
  lbImg.src = url(id, 1600);
  lbImg.alt = alt;
  lbCont.textContent = `${actual + 1} / ${GALERIA.length}`;
  lb.hidden = false;
  document.body.style.overflow = "hidden";
}
function cerrarLB() {
  lb.hidden = true;
  document.body.style.overflow = "";
}

$("#galeria").addEventListener("click", e => {
  const b = e.target.closest("button[data-i]");
  if (b) abrirLB(+b.dataset.i);
});
$("#lb-cerrar").addEventListener("click", cerrarLB);
$("#lb-prev").addEventListener("click", () => abrirLB(actual - 1));
$("#lb-next").addEventListener("click", () => abrirLB(actual + 1));
lb.addEventListener("click", e => { if (e.target === lb) cerrarLB(); });

addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape")     cerrarLB();
  if (e.key === "ArrowLeft")  abrirLB(actual - 1);
  if (e.key === "ArrowRight") abrirLB(actual + 1);
});

/* ---------- HORARIOS ---------- */
// getDay() devuelve 0=domingo. La tabla arranca en lunes, así que se corrige.
const hoyIdx = (new Date().getDay() + 6) % 7;

$("#horarios").innerHTML = HORARIOS.map(([dia, abre, cierra], i) => `
  <div class="horario${i === hoyIdx ? " hoy" : ""}">
    <span class="horario__dia">${dia}${i === hoyIdx ? " · hoy" : ""}</span>
    <span class="horario__hs">${abre} – ${cierra}</span>
  </div>`).join("");

// El cartel del hero muestra el horario de hoy de verdad, no uno fijo.
const [, abreHoy, cierraHoy] = HORARIOS[hoyIdx];
const ahora = new Date();
const min = ahora.getHours() * 60 + ahora.getMinutes();
const aMin = h => +h.slice(0, 2) * 60 + +h.slice(3);
const abierto = min >= aMin(abreHoy) && min < aMin(cierraHoy);
const cartel = $(".hero__abajo .mono");
if (cartel) {
  cartel.textContent = abierto
    ? `Abierto ahora · cierra ${cierraHoy}`
    : `Cerrado ahora · abre ${abreHoy}`;
}

/* ---------- HORARIOS DEL FORMULARIO ---------- */
const selHora = $("#r-hora");
for (let h = 9; h <= 21; h++) {
  for (const m of ["00", "30"]) {
    const o = document.createElement("option");
    o.textContent = `${String(h).padStart(2, "0")}:${m}`;
    selHora.appendChild(o);
  }
}
selHora.value = "13:00";

// No dejamos elegir una fecha pasada: es el error más común del formulario.
const fecha = $("#r-fecha");
const hoyISO = new Date().toISOString().slice(0, 10);
fecha.min = hoyISO;
fecha.value = hoyISO;

/* ---------- VALIDACIÓN ---------- */
const form = $("#form-reserva");

function marcar(campo, mensaje) {
  const cont = campo.closest(".campo");
  const err = $(`.error[data-para="${campo.id}"]`);
  cont.classList.toggle("mal", Boolean(mensaje));
  if (err) err.textContent = mensaje || "";
  return !mensaje;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = $("#r-nombre"), tel = $("#r-tel"), f = $("#r-fecha");

  const okNombre = marcar(nombre, nombre.value.trim().length < 3
    ? "Poné tu nombre completo" : "");
  // Argentina: entre 8 y 13 dígitos cubre fijo con y sin característica.
  const digitos = tel.value.replace(/\D/g, "");
  const okTel = marcar(tel, digitos.length < 8 || digitos.length > 13
    ? "Revisá el teléfono" : "");
  const okFecha = marcar(f, !f.value || f.value < hoyISO
    ? "Elegí una fecha de hoy en adelante" : "");

  if (!(okNombre && okTel && okFecha)) {
    $(".campo.mal input, .campo.mal select")?.focus();
    return;
  }

  // Demo: no hay backend. En producción esto va a un endpoint o a un servicio de mail.
  form.querySelector(".btn").textContent = "Enviando...";
  setTimeout(() => {
    $("#form-ok").hidden = false;
    form.querySelector(".btn").textContent = "Pedir la reserva";
    form.reset();
    fecha.value = hoyISO;
    selHora.value = "13:00";
  }, 700);
});

// Al corregir un campo marcado, el error desaparece solo.
$$("#form-reserva input, #form-reserva select").forEach(c =>
  c.addEventListener("input", () => marcar(c, "")));

/* ---------- REVEAL AL SCROLLEAR ----------
   Dos mecanismos a propósito. El IntersectionObserver es el eficiente, pero no
   dispara siempre (scroll programático, restauración de posición, saltos por
   ancla). El chequeo en scroll es la red: cuesta casi nada y garantiza que
   ningún bloque quede invisible. Entre los dos, el contenido siempre aparece. */

function revisarReveals() {
  const pendientes = $$(".reveal:not(.visible)");
  if (!pendientes.length) return false;
  pendientes.forEach(el => {
    // Alcanza con que haya cruzado el borde inferior. NO se pide que siga en
    // pantalla: si el scroll es rapido (o salta por un ancla) el bloque pasa de
    // largo y quedaria oculto para siempre.
    if (el.getBoundingClientRect().top < innerHeight - 40) el.classList.add("visible");
  });
  return true;
}

const obs = new IntersectionObserver(entradas => {
  entradas.forEach(en => {
    if (en.isIntersecting) en.target.classList.add("visible");
  });
}, { threshold: 0, rootMargin: "0px 0px -40px" });

$$(".reveal").forEach(el => obs.observe(el));

let pedido = false;
addEventListener("scroll", () => {
  if (pedido) return;
  pedido = true;
  requestAnimationFrame(() => { pedido = false; revisarReveals(); });
}, { passive: true });

addEventListener("resize", revisarReveals, { passive: true });
revisarReveals();                       // lo que ya esta en pantalla al cargar
addEventListener("load", revisarReveals);
