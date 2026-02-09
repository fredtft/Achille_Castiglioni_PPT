import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Slide, SlideType } from './types';
import { initialSlides } from './slidesContent';
import { ProgressBar } from './components/ProgressBar';
import { SlideRenderer } from './components/SlideRenderer';
import { NotesModal } from './components/NotesModal';

const App: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const touchStartRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error full-screen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'f') toggleFullscreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartRef.current = null;
  };

  return (
    <div 
      className="relative h-[100dvh] w-screen bg-black overflow-hidden flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <ProgressBar current={currentIndex} total={slides.length} />

      <main className="flex-1 overflow-hidden relative">
        <SlideRenderer 
          slide={slides[currentIndex]} 
        />
      </main>

      {/* Navigation Controls Overlay */}
      <div className="absolute bottom-2 md:bottom-8 left-2 md:left-8 right-2 md:right-8 flex justify-between items-center pointer-events-none">
        <div className="flex gap-2 md:gap-4 pointer-events-auto">
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-100 hover:bg-[#ff4d00] hover:text-white hover:border-[#ff4d00] shadow-xl transition-all disabled:opacity-30`}
          >
            <i className="fas fa-arrow-left text-xs md:text-base"></i>
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentIndex === slides.length - 1}
            className={`w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-100 hover:bg-[#ff4d00] hover:text-white hover:border-[#ff4d00] shadow-xl transition-all disabled:opacity-30`}
          >
            <i className="fas fa-arrow-right text-xs md:text-base"></i>
          </button>
        </div>

        <div className="flex gap-1 md:gap-3 pointer-events-auto items-center">
          <button 
            onClick={() => setShowNotes(!showNotes)}
            className={`w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-white transition-all ${showNotes ? 'text-[#ff4d00] border-[#ff4d00]/50' : ''}`}
          >
            <i className="fas fa-sticky-note text-xs"></i>
          </button>

          <button 
            onClick={toggleFullscreen}
            className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-white transition-all hidden sm:flex"
          >
            <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'} text-xs`}></i>
          </button>
        </div>
      </div>

      <div className="absolute top-2 md:top-6 right-2 md:right-8 text-zinc-700 font-bold text-[8px] md:text-xs tracking-widest pointer-events-none">
        {currentIndex + 1} / {slides.length}
      </div>

      <NotesModal 
        isOpen={showNotes} 
        notes={slides[currentIndex].notes} 
        onClose={() => setShowNotes(false)} 
      />
    </div>
  );
};

export default App;