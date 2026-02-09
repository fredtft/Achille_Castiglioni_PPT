import React from 'react';
import { Slide } from '../types';
import { SlideRenderer } from './SlideRenderer';

interface PrintContainerProps {
  slides: Slide[];
  isPreview?: boolean;
}

export const PrintContainer: React.FC<PrintContainerProps> = ({ slides, isPreview = false }) => {
  // Se è anteprima, vogliamo uno stile scrollabile e visibile
  // Se è per la stampa, viene gestito dai media query in index.css
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
          <SlideRenderer slide={slide} />
        </div>
      ))}
    </div>
  );
};