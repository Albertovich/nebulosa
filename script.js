// ==========================
// 🧠 VARIABLES EN ESPAÑOL
// ==========================
const botonModo = document.getElementById('botonModo');
const entradaColor = document.getElementById('entradaColor');
const fraseDinamica = document.getElementById('fraseDinamica');
const colorDelDia = document.getElementById('colorDelDia');
const contadorVisitasCaja = document.getElementById('contadorVisitas');
const formulario = document.getElementById('formularioContacto');
const estadoFormulario = document.getElementById('estadoFormulario');

const CLAVE_TEMA = 'preferencia-tema';
const CLAVE_COLOR = 'preferencia-color';
const CLAVE_VISITAS = 'contador-visitas';

const frases = [
  "Interfaces con alma y detalle.",
  "Animaciones que explican cambios.",
  "Accesibilidad sin perder estilo.",
  "Colores que cuentan historias."
];

// ==========================
// 🎛️ INICIALIZACIÓN
// ==========================
const temaGuardado = localStorage.getItem(CLAVE_TEMA);
const colorGuardado = localStorage.getItem(CLAVE_COLOR);

if (temaGuardado === 'claro') {
  document.body.classList.add('tema-claro');
}
if (colorGuardado) {
  document.documentElement.style.setProperty('--color-primario', colorGuardado);
  entradaColor.value = colorGuardado;
  colorDelDia.textContent = colorGuardado;
} else {
  colorDelDia.textContent = entradaColor.value;
}

const visitasActuales = parseInt(localStorage.getItem(CLAVE_VISITAS) || '0', 10) + 1;
localStorage.setItem(CLAVE_VISITAS, String(visitasActuales));
contadorVisitasCaja.textContent = String(visitasActuales);

// ==========================
// 🌙 MODO CLARO/OSCURO
// ==========================
botonModo.addEventListener('click', () => {
  document.body.classList.toggle('tema-claro');
  const esClaro = document.body.classList.contains('tema-claro');
  localStorage.setItem(CLAVE_TEMA, esClaro ? 'claro' : 'oscuro');
  botonModo.setAttribute('aria-pressed', esClaro ? 'true' : 'false');
});

// ==========================
// 🎨 CAMBIO DE COLOR DEL TEMA
// ==========================
entradaColor.addEventListener('input', (evento) => {
  const colorElegido = evento.target.value;
  document.documentElement.style.setProperty('--color-primario', colorElegido);
  localStorage.setItem(CLAVE_COLOR, colorElegido);
  colorDelDia.textContent = colorElegido;
});

// ==========================
// ✍️ EFECTO MÁQUINA DE ESCRIBIR
// ==========================
let indiceFrase = 0;
let indiceLetra = 0;
let borrando = false;

function escribirFrases() {
  const fraseActual = frases[indiceFrase];
  if (!borrando) {
    fraseDinamica.textContent = fraseActual.slice(0, indiceLetra + 1);
    indiceLetra++;
    if (indiceLetra === fraseActual.length) {
      borrando = true;
      setTimeout(escribirFrases, 1200);
      return;
    }
  } else {
    fraseDinamica.textContent = fraseActual.slice(0, indiceLetra - 1);
    indiceLetra--;
    if (indiceLetra === 0) {
      borrando = false;
      indiceFrase = (indiceFrase + 1) % frases.length;
    }
  }
  const velocidad = borrando ? 35 : 55;
  setTimeout(escribirFrases, velocidad);
}
escribirFrases();

// ==========================
// 👀 REVELADO AL HACER SCROLL
// ==========================
const elementosRevelables = document.querySelectorAll('.revelable');
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visible');
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.12 });
elementosRevelables.forEach((el) => observador.observe(el));

// ==========================
// ✅ VALIDACIÓN BÁSICA DEL FORMULARIO
// ==========================
formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = formulario.nombre.value.trim();
  const correo = formulario.correo.value.trim();
  const mensaje = formulario.mensaje.value.trim();

  if (!nombre || !correo || !mensaje) {
    estadoFormulario.textContent = 'Por favor, completa todos los campos.';
    estadoFormulario.style.color = 'tomato';
    return;
  }
  const esCorreoValido = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(correo);
  if (!esCorreoValido) {
    estadoFormulario.textContent = 'El correo no parece válido.';
    estadoFormulario.style.color = 'tomato';
    return;
  }

  estadoFormulario.textContent = '¡Gracias! He recibido tu mensaje (demo).';
  estadoFormulario.style.color = 'limegreen';
  formulario.reset();
});
