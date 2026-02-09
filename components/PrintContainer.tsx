import React from 'react';
import { Slide } from '../types';
import { SlideRenderer } from './SlideRenderer';

interface PrintContainerProps {
  slides: Slide[];
}

export const PrintContainer: React.FC<PrintContainerProps> = ({ slides }) => {
  return (
    <div className="print-container">
      {slides.map((slide) => (
        <div key={slide.id} className="print-slide-wrapper">
          <SlideRenderer slide={slide} />
        </div>
      ))}
    </div>
  );
};