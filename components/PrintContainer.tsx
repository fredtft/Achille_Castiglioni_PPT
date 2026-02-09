import React from 'react';
import { Slide } from '../types';
import { SlideRenderer } from './SlideRenderer';

interface PrintContainerProps {
  slides: Slide[];
  isPreview?: boolean;
}

export const PrintContainer: React.FC<PrintContainerProps> = ({ slides, isPreview = false }) => {
  // isPreview: layout per l'utente nel popup
  // !isPreview: layout invisibile catturato dal browser per il PDF
  return (
    <div className={isPreview ? "flex flex-col gap-8 p-8" : "print-container"}>
      {slides.map((slide) => (
        <div 
          key={slide.id} 
          className={isPreview 
            ? "w-full aspect-video bg-black border border-zinc-800 shadow-2xl overflow-hidden rounded-lg scale-90" 
            : "print-slide-wrapper"
          }
        >
          {/* isPrint={true} attiva il layout compatto definito in SlideRenderer */}
          <SlideRenderer slide={slide} isPrint={true} />
        </div>
      ))}
    </div>
  );
};