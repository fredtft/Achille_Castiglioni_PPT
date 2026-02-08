
import { Slide, SlideType } from './types';

export const slide04: Slide = {
  id: '04',
  type: SlideType.CONTENT_SPLIT,
  title: 'Il "Ready Made"',
  content: 'Castiglioni non inventava forme da zero, spesso "trovava" oggetti esistenti e li rifunzionalizzava. Il design come atto di osservazione del quotidiano.',
  images: ['img/04_ready_made.jpg'],
  imagePosition: 'right',
  list: [
    'De-contestualizzazione: Spostare un oggetto dal suo ambito d\'origine.',
    'Minimo sforzo: Utilizzare componenti già ottimizzati dall\'industria.',
    'Sincerità: Mostrare chiaramente come l\'oggetto è costruito.'
  ],
  notes: 'Spiegare il parallelo con Marcel Duchamp. Castiglioni raccoglieva oggetti anonimi per capirne l\'intelligenza intrinseca e riutilizzarla nei suoi progetti.'
};
