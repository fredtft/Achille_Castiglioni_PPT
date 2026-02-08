
import { Slide, SlideType } from './types';

export const slide01: Slide = {
  id: '01',
  type: SlideType.TITLE,
  title: 'Achille Castiglioni',
  subtitle: 'Maestro del Design Italiano (1918-2002)',
  images: ['img/01_achille_castiglioni.jpg'],
  metadata: {
    university: 'Università RUFA Milano',
    course: 'Corso: Storia del Design',
    student: 'Studente: Miriam MONCADA'
  },
  notes: 'Benvenuti. Introduzione al corso di Storia del Design. Presentazione dedicata ad Achille Castiglioni, figura cardine del design del XX secolo, focalizzata sull\'ironia e la funzionalità.'
};
