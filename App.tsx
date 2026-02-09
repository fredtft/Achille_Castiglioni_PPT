import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Slide, SlideType } from './types';
import { initialSlides } from './slidesContent';
import { ProgressBar } from './components/ProgressBar';
import { SlideRenderer } from './components/SlideRenderer';
import { NotesModal } from './components/NotesModal';
import { PrintContainer } from './components/PrintContainer';

const App: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  
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

  const openPrintPreview = () => {
    setIsPrintModalOpen(true);
  };

  const closePrintPreview = () => {
    setIsPrintModalOpen(false);
  };

  const triggerActualPrint = () => {
    window.print();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPrintModalOpen && e.key === 'Escape') {
        closePrintPreview();
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'f') toggleFullscreen();
      if (e.key === 'p' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        openPrintPreview();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isPrintModalOpen]);

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

      {/* Hidden container strictly for actual print engine */}
      <PrintContainer slides={slides} />

      {/* Navigation Controls Overlay */}
      <div className="absolute bottom-2 md:bottom-8 left-2 md:left-8 right-2 md:right-8 flex justify-between items-center pointer-events-none">
        <div className="flex gap-2 md:gap-4 pointer-events-auto">
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-100 hover:bg-[#ff4d00] hover:text-white hover:border-[#ff4d00] shadow-xl transition-all disabled:opacity-30`}
            title="Precedente"
          >
            <i className="fas fa-arrow-left text-xs md:text-base"></i>
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentIndex === slides.length - 1}
            className={`w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-100 hover:bg-[#ff4d00] hover:text-white hover:border-[#ff4d00] shadow-xl transition-all disabled:opacity-30`}
            title="Successiva"
          >
            <i className="fas fa-arrow-right text-xs md:text-base"></i>
          </button>
        </div>

        <div className="flex gap-1 md:gap-3 pointer-events-auto items-center">
          <button 
            onClick={openPrintPreview}
            className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-[#ff4d00] transition-all"
            title="Stampa l'intera presentazione PDF"
          >
            <i className="fas fa-file-pdf text-xs md:text-sm"></i>
          </button>

          <button 
            onClick={() => setShowNotes(!showNotes)}
            className={`w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-white transition-all ${showNotes ? 'text-[#ff4d00] border-[#ff4d00]/50' : ''}`}
            title="Note relatore"
          >
            <i className="fas fa-sticky-note text-xs"></i>
          </button>

          <button 
            onClick={toggleFullscreen}
            className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-white transition-all hidden sm:flex"
            title="Schermo intero"
          >
            <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'} text-xs`}></i>
          </button>
        </div>
      </div>

      <div className="absolute top-2 md:top-6 right-2 md:right-8 text-zinc-700 font-bold text-[8px] md:text-xs tracking-widest pointer-events-none">
        {currentIndex + 1} / {slides.length}
      </div>

      {/* PRINT PREVIEW POPUP */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-zinc-950 no-print overflow-hidden animate-slide-up">
          <header className="p-4 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-4">
              <h2 className="text-white font-black uppercase tracking-tighter text-xl">Anteprima di Stampa</h2>
              <span className="px-3 py-1 bg-zinc-800 rounded text-zinc-400 text-xs font-bold uppercase">{slides.length} Slide</span>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={closePrintPreview}
                className="px-6 py-2 bg-zinc-800 text-white font-bold rounded hover:bg-zinc-700 transition-colors uppercase text-sm"
              >
                Chiudi
              </button>
              <button 
                onClick={triggerActualPrint}
                className="px-6 py-2 bg-[#ff4d00] text-white font-black rounded hover:bg-[#e64500] transition-colors shadow-lg uppercase text-sm flex items-center gap-2"
              >
                <i className="fas fa-print"></i> Conferma e Salva PDF
              </button>
            </div>
          </header>
          
          <div className="flex-1 overflow-y-auto bg-black flex flex-col items-center">
            <div className="max-w-5xl w-full">
              <PrintContainer slides={slides} isPreview={true} />
            </div>
          </div>

          <footer className="p-4 bg-zinc-900 border-t border-zinc-800 text-center text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
            Assicurati di selezionare "Salva come PDF" e orientamento "Orizzontale" (Landscape) nelle impostazioni di stampa.
          </footer>
        </div>
      )}

      <NotesModal 
        isOpen={showNotes} 
        notes={slides[currentIndex].notes} 
        onClose={() => setShowNotes(false)} 
      />
    </div>
  );
};

export default App;