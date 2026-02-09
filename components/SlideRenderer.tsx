import React from 'react';
import { Slide, SlideType } from '../types';

interface SlideRendererProps {
  slide: Slide;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  
  const handleImageAction = (index: number) => {
    // Gestione speciale per i titoli con virgolette o nomi file storici
    const titleBase = slide.id === '04' ? 'ironia' : slide.id === '05' ? 'ready_made' : slide.title.split(':')[0].trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    const expectedFileName = index === 0 ? `${slide.id}_${titleBase}` : `${slide.id}_${titleBase}_${index}`;
    
    navigator.clipboard.writeText(expectedFileName).then(() => {
      console.log(`Copied to clipboard: ${expectedFileName}`);
    });

    const searchQuery = `Achille Castiglioni ${slide.title.replace(':', '')} ${index > 0 ? 'particolare ' + index : ''}`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=isch`, '_blank');
  };

  const Placeholder = ({ index, className = "", fit = "cover" }: { index: number; className?: string; fit?: "cover" | "contain" }) => {
    // Mappatura manuale per garantire che le immagini rimangano corrette dopo lo swap
    let fileNamePart = slide.title.split(':')[0].trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    if (slide.id === '04') fileNamePart = 'ironia';
    if (slide.id === '05') fileNamePart = 'ready_made';
    
    const expectedFileName = index === 0 ? `${slide.id}_${fileNamePart}` : `${slide.id}_${fileNamePart}_${index}`;
    const src = `img/${expectedFileName}.jpg`;

    return (
      <div 
        onClick={() => handleImageAction(index)}
        className={`relative group cursor-pointer overflow-hidden bg-zinc-900 flex items-center justify-center border border-zinc-800 ${className}`}
      >
        <img 
          src={src} 
          alt={slide.title} 
          className={`w-full h-full ${fit === 'cover' ? 'object-cover' : 'object-contain p-4'} transition-transform duration-700 group-hover:scale-105`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/1200x800/18181b/ff4d00?text=${expectedFileName}.jpg`;
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
           <div className="bg-[#ff4d00] text-white text-[10px] font-black uppercase px-3 py-1 tracking-tighter rounded-sm shadow-xl">
             Copia & Cerca
           </div>
        </div>
      </div>
    );
  };

  const isCompact = parseInt(slide.id) >= 4;

  switch (slide.type) {
    case SlideType.TITLE:
      return (
        <div className="flex h-full items-center p-8 lg:p-24 bg-black overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
            <div className="space-y-8 animate-slide-up">
              <div className="h-1.5 w-24 bg-[#ff4d00]"></div>
              <div className="text-[#ff4d00] font-bold text-sm lg:text-xl tracking-[0.3em] uppercase">{slide.metadata?.university}</div>
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-black leading-none text-white tracking-tighter">{slide.title}</h1>
              <p className="text-xl md:text-2xl lg:text-4xl text-zinc-400 font-serif italic">{slide.subtitle}</p>
              <div className="pt-12 space-y-3 border-l-2 border-zinc-800 pl-8">
                <div className="text-zinc-500 text-sm lg:text-lg uppercase tracking-widest font-bold">{slide.metadata?.course}</div>
                <div className="text-zinc-400 text-sm lg:text-lg">{slide.metadata?.student}</div>
              </div>
            </div>
            <Placeholder index={0} fit="cover" className="aspect-[4/5] rounded-sm shadow-2xl" />
          </div>
        </div>
      );

    case SlideType.QUOTE:
      return (
        <div className="flex flex-col h-full items-center justify-center p-12 lg:p-40 text-center relative bg-zinc-950">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25rem] md:text-[40rem] text-[#ff4d00]/5 font-serif select-none pointer-events-none">“</div>
          <div className="relative z-10 max-w-6xl space-y-16 animate-slide-up">
            <blockquote className="text-2xl md:text-4xl lg:text-6xl font-serif italic leading-snug text-zinc-100">{slide.quote}</blockquote>
            <div className="flex items-center justify-center gap-6">
              <div className="w-16 h-[3px] bg-[#ff4d00]"></div>
              <div className="text-xl md:text-2xl lg:text-3xl font-black text-[#ff4d00] tracking-tight uppercase">{slide.author}</div>
            </div>
          </div>
        </div>
      );

    case SlideType.TIMELINE:
      return (
        <div className="flex flex-col h-full bg-black p-12 lg:p-24 overflow-hidden justify-start pt-20 lg:pt-32 relative">
           <div className="mb-12 lg:mb-20 animate-slide-up">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none">{slide.title}</h2>
            <div className="text-[#ff4d00] font-bold text-lg uppercase tracking-[0.5em] mt-2">{slide.subtitle}</div>
          </div>
          
          <div className="relative w-full py-20">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-zinc-900 -translate-y-1/2"></div>
            <div className="flex justify-between relative">
              {slide.list?.map((item, i) => {
                const [year, desc] = item.split(': ');
                const isEven = i % 2 === 0;
                return (
                  <div key={i} className={`flex flex-col items-center w-full relative group`}>
                    <div className="w-5 h-5 rounded-full bg-[#ff4d00] mb-0 border-4 border-black z-10 transition-transform group-hover:scale-150"></div>
                    <div className={`absolute left-1/2 -translate-x-1/2 w-px h-20 bg-zinc-900 ${isEven ? 'bottom-full mb-0' : 'top-full mt-0'}`}></div>
                    <div className={`absolute left-1/2 -translate-x-1/2 w-48 text-center ${isEven ? 'bottom-[calc(100%+80px)]' : 'top-[calc(100%+80px)]'}`}>
                      <div className="text-[#ff4d00] font-black text-2xl mb-1">{year}</div>
                      <div className="text-zinc-500 text-xs leading-relaxed font-medium px-2">{desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );

    case SlideType.CONTENT_SPLIT:
      const isImageLeft = slide.imagePosition === 'left';
      
      return (
        <div className="flex h-full w-full bg-black overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full">
            <div className={`${isCompact ? 'p-8 lg:p-14' : 'p-12 lg:p-24'} flex flex-col justify-center ${isCompact ? 'space-y-4' : 'space-y-10'} ${isImageLeft ? 'order-2 md:order-2' : 'order-2 md:order-1'}`}>
              <h2 className={`${isCompact ? 'text-4xl md:text-5xl' : 'text-5xl md:text-7xl'} font-black text-[#ff4d00] tracking-tighter leading-none`}>{slide.title}</h2>
              <div className={isCompact ? 'space-y-4' : 'space-y-8'}>
                <p className={`${isCompact ? 'text-lg lg:text-xl' : 'text-2xl lg:text-3xl'} text-zinc-100 font-light leading-snug border-l-4 border-[#ff4d00] pl-6`}>{slide.content}</p>
                <div className={`grid grid-cols-1 ${isCompact ? 'gap-3 pt-4' : 'gap-8 pt-10'} border-t border-zinc-900`}>
                  {slide.list?.map((item, i) => {
                    const [label, val] = item.split(': ');
                    return (
                      <div key={i} className="group">
                        <div className="text-[#ff4d00]/80 font-bold text-[10px] uppercase tracking-[0.3em] mb-1">{label}</div>
                        <div className={`${isCompact ? 'text-base lg:text-lg' : 'text-zinc-400 text-xl'} font-light`}>{val}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={`${isImageLeft ? 'order-1 md:order-1' : 'order-1 md:order-2'}`}>
              <Placeholder index={0} fit="cover" className="h-full border-none" />
            </div>
          </div>
        </div>
      );

    case SlideType.FEATURE:
      return (
        <div className="relative h-full w-full bg-black overflow-hidden flex flex-col lg:flex-row">
           <div className="w-full lg:w-3/5 h-[40vh] lg:h-full relative overflow-hidden">
             <Placeholder index={0} fit="cover" className="w-full h-full border-none" />
             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent hidden lg:block"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:hidden"></div>
           </div>
           
           <div className="w-full lg:w-2/5 p-8 lg:p-24 flex flex-col justify-center relative z-10 lg:-ml-32">
              <div className="bg-zinc-950/80 backdrop-blur-md p-10 lg:p-16 border-l-8 border-[#ff4d00] shadow-2xl">
                <h2 className="text-5xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.85]">{slide.title}</h2>
                <p className="text-xl lg:text-2xl text-zinc-300 font-light leading-relaxed mb-12">{slide.content}</p>
                <div className="space-y-6">
                  {slide.list?.map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-2 h-2 rounded-full bg-[#ff4d00] mt-2 flex-shrink-0"></div>
                      <div className="text-zinc-400 text-base lg:text-lg font-medium">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
           </div>
        </div>
      );

    case SlideType.DETAILS:
      const [mainTitle, detailType] = slide.title.includes(':') 
        ? slide.title.split(':').map(s => s.trim()) 
        : [slide.title, 'Dettagli'];

      return (
        <div className="flex flex-col h-full bg-zinc-950 overflow-hidden">
          <div className={`flex-1 ${isCompact ? 'p-8 lg:p-12' : 'p-12 lg:p-20'} overflow-y-auto`}>
             <div className={`flex items-center gap-10 ${isCompact ? 'mb-8' : 'mb-16'}`}>
               <h2 className={`${isCompact ? 'text-3xl md:text-5xl' : 'text-4xl md:text-6xl'} font-black text-white uppercase tracking-tight`}>{mainTitle}</h2>
               <div className="h-[2px] flex-1 bg-zinc-900"></div>
               <div className="text-[#ff4d00] font-bold tracking-widest uppercase text-[10px] md:text-xs">
                 {detailType}
               </div>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-2 ${isCompact ? 'gap-6' : 'gap-10'}`}>
              {slide.list?.map((item, i) => {
                const [label, val] = item.split(': ');
                return (
                  <div key={i} className={`${isCompact ? 'p-6' : 'p-8'} bg-black/40 border border-zinc-900 transition-all hover:bg-zinc-900/50 shadow-sm`}>
                    <div className={`text-[#ff4d00] font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] ${isCompact ? 'mb-2' : 'mb-4'} flex items-center gap-3`}>
                      <span className="w-2 h-2 bg-[#ff4d00] rounded-full"></span>
                      {label}
                    </div>
                    <div className={`text-zinc-300 ${isCompact ? 'text-lg' : 'text-xl'} font-light leading-relaxed`}>{val}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="h-1/3 grid grid-cols-3 gap-0 bg-black border-t-2 border-[#ff4d00]/20">
            <Placeholder index={0} fit="contain" className="bg-black border-r border-zinc-900" />
            <Placeholder index={1} fit="contain" className="bg-black border-r border-zinc-900" />
            <Placeholder index={2} fit="contain" className="bg-black" />
          </div>
        </div>
      );

    default:
      return <div className="p-20 text-red-500">Error rendering slide: Unknown Type</div>;
  }
};