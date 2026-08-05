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
  bride: ['Juan Márquez', 'María Pérez de Márquez'] as string[],
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
  note: 'Se sugiere evitar el color blanco, reservado para la novia.',
  suggestedColors: [
    { name: 'Marfil', hex: '#FAF7F2' },
    { name: 'Bruma', hex: '#E8EAEC' },
    { name: 'Cielo', hex: '#DCE3EF' },
    { name: 'Perivinca', hex: '#B7C2DA' },
    { name: 'Azul empolvado', hex: '#7C8CAF' },
  ],
};

export const adultsOnlyNote =
  'Con todo el cariño, hemos reservado esta celebración para nuestros invitados adultos. Agradecemos de corazón su comprensión.';

export type ProgramItem = {
  time: string;
  title: string;
  description?: string;
};

export const program: ProgramItem[] = [
  { time: '5:00 PM', title: 'Ceremonia', description: 'PENDIENTE: lugar de la ceremonia' },
  { time: '6:00 PM', title: 'Cóctel de bienvenida' },
  { time: '7:00 PM', title: 'Recepción y cena' },
  { time: '8:30 PM', title: 'Primer baile' },
  { time: '9:00 PM', title: 'Fiesta' },
];

export const rsvp = {
  deadlineDisplay: '08 de Noviembre de 2026', // ej. "15 de octubre de 2026"
  whatsappPhone: '584245937048', // formato internacional sin signos, ej. "584121234567"
  message:
    'Hola! Confirmo mi asistencia a la boda de Ricardo y Genesis. Somos [nombre / número de personas]: ',
};
