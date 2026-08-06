// Personalización opcional por invitado vía ?invitado=Nombre&pases=N (formato documentado
// junto a rsvp.message en src/data/wedding.ts). Ambos parámetros deben ser válidos a la vez
// para activarse; si falta alguno o `pases` no es un entero entre 1 y 20, no se toca nada:
// el HTML estático y los href genéricos ya renderizados en build quedan como están.
const params = new URLSearchParams(window.location.search);
const invitadoRaw = params.get('invitado')?.trim();
const pases = Number.parseInt(params.get('pases') ?? '', 10);

const isValid = !!invitadoRaw && Number.isInteger(pases) && pases >= 1 && pases <= 20;

if (isValid) {
  const pasesBlock = document.getElementById('sobre-pases');
  const pasesNumero = document.getElementById('sobre-pases-numero');

  if (pasesBlock && pasesNumero) {
    pasesNumero.textContent = String(pases);
    pasesBlock.hidden = false;
  }

  const personas = pases === 1 ? 'persona' : 'personas';
  const mensaje = `Hola! Somos de ${invitadoRaw}. Confirmamos nuestra asistencia a la boda de Ricardo y Genesis por ${pases} ${personas}.`;
  const textoCodificado = encodeURIComponent(mensaje);

  for (const id of ['rsvp-groom', 'rsvp-bride']) {
    const link = document.getElementById(id) as HTMLAnchorElement | null;
    const href = link?.getAttribute('href');
    if (!href || !href.startsWith('https://wa.me/')) continue; // contacto PENDIENTE: no hay enlace que reescribir

    const base = href.split('?')[0];
    link!.setAttribute('href', `${base}?text=${textoCodificado}`);
  }
}
