/**
 * Fuente única de verdad para todo el contenido de la invitación.
 * Los campos marcados "PENDIENTE" deben reemplazarse cuando se tenga el dato final;
 * ningún componente de sección debe editarse para ello.
 */

export const couple = {
  groom: 'Ricardo Márquez',
  bride: 'Genesis Caldera',
  groomFirstName: 'Ricardo',
  brideFirstName: 'Genesis',
  hashtag: '#RicardoYGenesis2026',
};

/** Opcional: dejar los arreglos vacíos si no se desea mostrar a los padres en la invitación. */
export const parents = {
  groom: ['Jose marquez', 'Maria zambrano'] as string[], // ej. ['Juan Márquez', 'María Pérez de Márquez']
  bride: ['Marcos Sergio Caldera Delgado', 'Amadora del Carmen Carballo Frías'] as string[],
};

/** Sección "Gratitud", entre el Hero y la Invitación formal. `highlight` se destaca tipográficamente. */
export const gratitudNote = {
  body: 'Dios en su infinita bondad, nos concedió la maravillosa dicha de encontrarnos, de descubrir en el otro un amor verdadero y eterno.\nHoy con el corazón lleno de gratitud, celebramos el inicio de nuestro',
  highlight: 'PARA SIEMPRE',
};

/** Sección "Honor de invitar", después de los padres. `title` se jerarquiza como remate del bloque. */
export const honorNote = {
  intro:
    'Tenemos el gran honor de invitarte a acompañarnos a uno de los días más especiales de nuestras vidas.',
  title: 'La Celebración de Nuestro matrimonio.',
  closing:
    'Un encuentro de amor, fe, alegría y honra al Señor, que permanecerá por Siempre en nuestro Corazón.',
};

/**
 * Offset explícito -05:00 (EST), no el texto "EST": el 28 de noviembre de 2026
 * cae después del fin del horario de verano en EE. UU., por lo que EST = UTC-5
 * todo el año en esa fecha. Instante UTC real: 2026-11-28T22:00:00Z.
 * Todo lo derivado de la fecha (countdown, .ics, Google Calendar) debe leer esta constante.
 */
export const weddingDateISO = '2026-11-28T17:00:00-05:00';

/** Duración estimada del evento, usada para el DTEND del .ics y el enlace de Google Calendar. */
export const eventDurationHours = 6;

export const weddingDateDisplay = {
  weekday: 'Sábado',
  day: '28',
  month: 'Noviembre',
  year: '2026',
  time: '5:00 PM',
  timezone: 'EST',
};

export const venue = {
  name: 'Grato jardín',
  addressLine: 'Av. San Silvestre',
  city: 'Barinas',
  mapsUrl: 'https://maps.app.goo.gl/ZHxaoDKPV9Jt923s6?g_st=ic',
};

export const dressCode = {
  label: 'Formal / Elegante',
  note: 'Nos reservamos los colores',
  reservedColors: ['Blanco', 'Gris', 'Celeste'],
};

export type RsvpContact = {
  id: 'groom' | 'bride'; // ancla estable para src/scripts/guest-params.ts, no derivar de `role`
  name: string;
  role: string;
  phone: string; // formato internacional sin signos, ej. "584121234567", o "PENDIENTE"
};

/**
 * Personalización por invitado (opcional, vía parámetros de URL, ver src/scripts/guest-params.ts):
 *   https://sitio.com/?invitado=Familia+Perez&pases=2
 * Con ambos parámetros válidos (`pases` entero entre 1 y 20), el sobre muestra "Hemos
 * reservado N lugares en su honor" y el botón de WhatsApp arma el mensaje con esos datos.
 * Sin ellos, o si alguno es inválido, todo usa el mensaje genérico de abajo -- ningún
 * enlace sin personalizar se rompe por esto. Los enlaces se arman a mano por cada familia.
 */
export const rsvp = {
  deadlineDisplay: '08 de Noviembre de 2026', // ej. "15 de octubre de 2026"
  message:
    'Hola! Confirmo mi asistencia a la boda de Ricardo y Genesis. Somos [nombre / número de personas]: ',
  contacts: [
    { id: 'groom', name: couple.groomFirstName, role: 'Novio', phone: '584245937048' },
    { id: 'bride', name: couple.brideFirstName, role: 'Novia', phone: '584245178795' },
  ] as RsvpContact[],
};

/** Sección "Cierre", antes del footer. `verse` y `verseReference` van en <blockquote>/<cite>. */
export const cierreNote = {
  body: 'Con todo Nuestro Amor y gratitud.\n\nTe esperamos para Celebrar este Sueño hecho realidad.',
  verse: 'Todo lo hizo Hermoso en su tiempo',
  verseReference: 'Eclesiastés 3:11',
};
