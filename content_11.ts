
import { Slide, SlideType } from './types';

export const slide11: Slide = {
  id: '11',
  type: SlideType.DETAILS,
  title: 'SAN LUCA: Struttura',
  images: [
    'img/11_san_luca.jpg',
    'img/11_san_luca_1.jpg',
    'img/11_san_luca_2.jpg'
  ],
  list: [
    'Scomposizione: Sedile, schienale e poggiatesta sono elementi separati, montati su una struttura rigida.',
    'Ergonomia: La forma è dettata esclusivamente dai punti di appoggio necessari al corpo a riposo.',
    'Rivestimento: Spesso in pelle, evidenzia le cuciture che seguono la tensione dei volumi.'
  ],
  notes: 'Dettaglio tecnico: la scomposizione permetteva di industrializzare meglio la produzione rispetto alle poltrone monoblocco artigianali.'
};
