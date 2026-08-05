// Apertura del sobre: el clic/tecla sobre el botón es el único gesto de usuario disponible,
// así que arranca la música ahí mismo (dentro del handler, síncrono) y cuenta como el
// consentimiento de audio -- no hay banner de "activar música" en ningún otro lugar.
const gate = document.getElementById('sobre-apertura');
const boton = document.getElementById('sobre-boton');
const audio = document.getElementById('sobre-audio') as HTMLAudioElement | null;
const contenido = document.getElementById('invitacion-contenido');
const heroHeading = document.getElementById('hero-heading');

if (gate && boton) {
  const abrir = () => {
    if (gate.classList.contains('is-opening')) return; // evita doble activación

    try {
      sessionStorage.setItem('sobre-abierto', '1');
    } catch (e) {}

    if (audio) {
      audio.volume = 0.5;
      audio.play().catch(() => {
        // Reproducción rechazada por el navegador: la apertura continúa igual,
        // el audio nunca puede bloquear el acceso a la invitación.
      });
    }

    gate.classList.add('is-opening');
  };

  boton.addEventListener('click', abrir);

  gate.addEventListener('animationend', (event) => {
    if (event.target !== gate || event.animationName !== 'sobre-gate-fade') return;

    document.documentElement.classList.remove('gate-locked');
    if (contenido) contenido.inert = false;
    if (heroHeading) heroHeading.focus();
  });
}
