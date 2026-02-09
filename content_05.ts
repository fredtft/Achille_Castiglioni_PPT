
import { Slide, SlideType } from './types';

export const slide05: Slide = {
  id: '05',
  type: SlideType.CONTENT_SPLIT,
  imagePosition: 'left',
  title: 'Il "Ready Made"',
  content: 'Castiglioni non inventava forme da zero, spesso "trovava" oggetti esistenti e li rifunzionalizzava. Il design come atto di osservazione del quotidiano.',
  images: ['img/ready_made_00.jpg'],
  list: [
    'De-contestualizzazione: Spostare un oggetto dal suo ambito d\'origine.',
    'Minimo sforzo: Utilizzare componenti già ottimizzati dall\'industria.',
    'Sincerità: Mostrare chiaramente come l\'oggetto è costruito.'
  ],
  notes: 'Spiegare il parallelo con Marcel Duchamp. Castiglioni raccoglieva oggetti anonimi per capirne l\'intelligenza intriseca e riutilizzarla nei suoi progetti.'
};
