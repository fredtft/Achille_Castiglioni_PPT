
import React from 'react';
import { Slide, SlideType } from '../types';

interface SlideRendererProps {
  slide: Slide;
  isPrint?: boolean;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide, isPrint = false }) => {
  
  const getSlug = (slide: Slide): string => {
    if (slide.id === '01') return 'achille';
    if (slide.id === '04') return 'ironia';
    if (slide.id === '05') return 'ready_made';
    
    const title = slide.title.split(':')[0].trim().toLowerCase();
    if (title.includes('mezzadro')) return 'mezzadro';
    if (title.includes('sella')) return 'sella';
    if (title.includes('san luca')) return 'san_luca';
    if (title.includes('toio')) return 'toio';
    if (title.includes('arco')) return 'arco';
    if (title.includes('rompitratta')) return 'rompitratta';
    if (title.includes('sleek')) return 'sleek';
    if (title.includes('allunaggio')) return 'allunaggio';
    if (title.includes('rr126')) return 'rr126';
    if (title.includes('splugen')) return 'splugen';
    
    return title.replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
  };

  const handleImageAction = (index: number) => {
    if (isPrint) return;
    const slug = getSlug(slide);
    const expectedFileName = `${slug}_${index.toString().padStart(2, '0')}`;
    
    navigator.clipboard.writeText(expectedFileName).then(() => {
      console.log(`Copied to clipboard: ${expectedFileName}`);
    });

    const searchQuery = `Achille Castiglioni ${slide.title.replace(':', '')} ${index > 0 ? 'particolare ' + index : ''}`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=isch`, '_blank');
  };

  const Placeholder = ({ index, className = "", fit = "cover", isDetail = false }: { index: number; className?: string; fit?: "cover" | "contain", isDetail?: boolean }) => {
    const slug = getSlug(slide);
    const expectedFileName = `${slug}_${index.toString().padStart(2, '0')}`;
    const src = `img/${expectedFileName}.jpg`;

    return (
      <div 
        onClick={() => handleImageAction(index)}
        className={`relative group ${isPrint ? '' : 'cursor-pointer'} overflow-hidden ${isDetail ? 'bg-black' : 'bg-zinc-900'} flex items-center justify-center border border-zinc-800/30 ${className}`}
      >
        <img 
          src={src} 
          alt={slide.title} 
          className={`w-full h-full ${fit === 'cover' ? 'object-cover' : 'object-contain'} transition-transform duration-700 ${!isPrint ? 'group-hover:scale-105' : ''}`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/1200x800/18181b/ff4d00?text=${expectedFileName}.jpg`;
          }}
        />
        {!isPrint && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
             <div className="bg-[#ff4d00] text-white text-[10px] font-black uppercase px-3 py-1 tracking-tighter rounded-sm shadow-xl">
               Copia & Cerca
             </div>
          </div>
        )}
      </div>
    );
  };

  const isCompactLayout = parseInt(slide.id) >= 4;
  const printClass = isPrint ? "print-mode" : "";

  switch (slide.type) {
    case SlideType.TITLE:
      return (
        <div className={`flex h-full items-center p-8 lg:px-20 lg:py-12 bg-black overflow-hidden ${printClass}`}>
          <div className={`grid grid-cols-1 md:grid-cols-2 ${isPrint ? 'gap-6' : 'gap-10 lg:gap-16'} items-center w-full max-w-7xl mx-auto h-full`}>
            <div className={`space-y-6 ${isPrint ? '' : 'lg:space-y-8 animate-slide-up'}`}>
              <div className="h-1.5 w-24 bg-[#ff4d00]"></div>
              <div className={`text-[#ff4d00] font-bold tracking-[0.3em] uppercase ${isPrint ? 'text-xs' : 'text-sm lg:text-lg'}`}>{slide.metadata?.university}</div>
              <h1 className={`font-black leading-[0.9] text-white tracking-tighter ${isPrint ? 'text-5xl' : 'text-5xl md:text-6xl lg:text-8xl'}`}>{slide.title}</h1>
              <p className={`text-zinc-400 font-serif italic leading-tight ${isPrint ? 'text-xl' : 'text-xl md:text-2xl lg:text-3xl'}`}>{slide.subtitle}</p>
              <div className={`border-l-2 border-zinc-800 pl-6 ${isPrint ? 'pt-4 space-y-1' : 'pt-8 lg:pt-12 space-y-2 lg:space-y-3 lg:pl-8'}`}>
                <div className={`text-zinc-500 uppercase tracking-widest font-bold ${isPrint ? 'text-[10px]' : 'text-xs lg:text-base'}`}>{slide.metadata?.course}</div>
                <div className={`text-zinc-400 ${isPrint ? 'text-sm' : 'text-sm lg:text-lg'}`}>{slide.metadata?.student}</div>
              </div>
            </div>
            <div className="flex justify-center md:justify-end h-full items-center overflow-hidden py-4 md:py-0">
              <Placeholder 
                index={0} 
                fit="contain" 
                className={`rounded-sm shadow-2xl h-full w-auto max-h-full ${isPrint ? 'max-h-[160mm] max-w-[120mm]' : ''}`} 
              />
            </div>
          </div>
        </div>
      );

    case SlideType.QUOTE:
      return (
        <div className={`flex flex-col h-full items-center justify-center text-center relative bg-zinc-950 ${isPrint ? 'p-20' : 'p-12 lg:p-40'} ${printClass}`}>
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#ff4d00]/5 font-serif select-none pointer-events-none ${isPrint ? 'text-[20rem]' : 'text-[25rem] md:text-[40rem]'}`}>“</div>
          <div className={`relative z-10 max-w-6xl ${isPrint ? 'space-y-12' : 'space-y-16 animate-slide-up'}`}>
            <blockquote className={`font-serif italic leading-snug text-zinc-100 ${isPrint ? 'text-3xl md:text-4xl' : 'text-2xl md:text-4xl lg:text-6xl'}`}>{slide.quote}</blockquote>
            <div className="flex items-center justify-center gap-6">
              <div className="w-16 h-[3px] bg-[#ff4d00]"></div>
              <div className={`font-black text-[#ff4d00] tracking-tight uppercase ${isPrint ? 'text-2xl' : 'text-xl md:text-2xl lg:text-3xl'}`}>{slide.author}</div>
            </div>
          </div>
        </div>
      );

    case SlideType.TIMELINE:
      return (
        <div className={`flex flex-col h-full bg-black overflow-hidden justify-start relative ${isPrint ? 'p-16 pt-12' : 'p-12 lg:p-24 pt-8 lg:pt-12'} ${printClass}`}>
           <div className={`${isPrint ? 'mb-8' : 'mb-8 lg:mb-12 animate-slide-up'}`}>
            <h2 className={`font-black text-white uppercase tracking-tighter leading-none ${isPrint ? 'text-4xl' : 'text-5xl md:text-7xl lg:text-8xl'}`}>{slide.title}</h2>
            <div className={`text-[#ff4d00] font-bold uppercase tracking-[0.5em] mt-2 ${isPrint ? 'text-sm' : 'text-lg'}`}>{slide.subtitle}</div>
          </div>
          
          <div className="relative w-full flex-1 flex items-center px-8 lg:px-20">
            {/* Timeline Horizontal Axis (Orange) */}
            <div className="absolute top-1/2 left-8 right-8 lg:left-20 lg:right-20 h-1 bg-[#ff4d00] -translate-y-1/2 shadow-[0_0_15px_rgba(255,77,0,0.3)]"></div>
            
            <div className="flex justify-between relative w-full items-center">
              {slide.list?.map((item, i) => {
                const [year, desc] = item.split(': ');
                const isEven = i % 2 === 0;
                return (
                  <div key={i} className={`flex flex-col items-center w-full relative group`}>
                    {/* Event Dot */}
                    <div className={`w-6 h-6 rounded-full bg-[#ff4d00] border-4 border-black z-10 shadow-[0_0_10px_rgba(255,77,0,0.5)] transition-transform group-hover:scale-125`}></div>
                    
                    {/* Vertical Connector */}
                    <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-zinc-800 group-hover:bg-[#ff4d00]/50 transition-colors ${isEven ? 'bottom-full mb-0 h-20' : 'top-full mt-0 h-20'}`}></div>
                    
                    {/* Content Box */}
                    <div className={`absolute left-1/2 -translate-x-1/2 w-48 text-center ${isEven ? 'bottom-[calc(100%+90px)]' : 'top-[calc(100%+90px)]'}`}>
                      <div className={`text-[#ff4d00] font-black ${isPrint ? 'text-2xl' : 'text-2xl lg:text-3xl'} mb-2 tracking-tighter`}>{year}</div>
                      <div className={`text-zinc-400 leading-tight font-medium px-2 ${isPrint ? 'text-xs' : 'text-[11px] lg:text-xs'}`}>{desc}</div>
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
        <div className={`flex h-full w-full bg-black overflow-hidden ${printClass}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full">
            <div className={`${(isCompactLayout || isPrint) ? 'p-12' : 'p-12 lg:p-24'} flex flex-col justify-center ${(isCompactLayout || isPrint) ? 'space-y-6' : 'space-y-10'} ${isImageLeft ? 'order-2 md:order-2' : 'order-2 md:order-1'}`}>
              <h2 className={`${(isCompactLayout || isPrint) ? 'text-4xl md:text-5xl' : 'text-5xl md:text-7xl'} font-black text-[#ff4d00] tracking-tighter leading-none`}>{slide.title}</h2>
              <div className={(isCompactLayout || isPrint) ? 'space-y-6' : 'space-y-8'}>
                <p className={`${(isCompactLayout || isPrint) ? 'text-xl lg:text-2xl' : 'text-2xl lg:text-3xl'} text-zinc-100 font-light leading-snug border-l-4 border-[#ff4d00] pl-6`}>{slide.content}</p>
                <div className={`grid grid-cols-1 ${(isCompactLayout || isPrint) ? 'gap-4 pt-6' : 'gap-8 pt-10'} border-t border-zinc-900`}>
                  {slide.list?.map((item, i) => {
                    const [label, val] = item.split(': ');
                    return (
                      <div key={i} className="group">
                        <div className={`text-[#ff4d00]/80 font-bold uppercase tracking-[0.2em] mb-1 ${isPrint ? 'text-xs' : 'text-[10px]'}`}>{label}</div>
                        <div className={`${(isCompactLayout || isPrint) ? 'text-lg' : 'text-zinc-400 text-xl'} font-light`}>{val}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={`h-full overflow-hidden ${isImageLeft ? 'order-1 md:order-1' : 'order-1 md:order-2'}`}>
              <Placeholder index={0} fit="cover" className="h-full border-none w-full" />
            </div>
          </div>
        </div>
      );

    case SlideType.FEATURE:
      return (
        <div className={`relative h-full w-full bg-black overflow-hidden flex flex-col lg:flex-row ${printClass}`}>
           <div className={`w-full ${isPrint ? 'lg:w-1/2' : 'lg:w-3/5'} h-[40vh] lg:h-full relative overflow-hidden`}>
             <Placeholder index={0} fit="cover" className="w-full h-full border-none" />
             {!isPrint && <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent hidden lg:block"></div>}
           </div>
           
           <div className={`w-full ${isPrint ? 'lg:w-1/2' : 'lg:w-2/5 lg:-ml-32'} p-8 lg:p-20 flex flex-col justify-center relative z-10`}>
              <div className={`bg-zinc-950/80 backdrop-blur-md border-l-8 border-[#ff4d00] shadow-2xl ${isPrint ? 'p-12' : 'p-10 lg:p-16'}`}>
                <h2 className={`font-black text-white uppercase tracking-tighter mb-8 leading-[0.85] ${isPrint ? 'text-4xl lg:text-5xl' : 'text-5xl lg:text-8xl'}`}>{slide.title}</h2>
                <p className={`text-zinc-300 font-light leading-relaxed mb-8 ${isPrint ? 'text-xl' : 'text-xl lg:text-2xl'}`}>{slide.content}</p>
                <div className="space-y-4">
                  {slide.list?.map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-2 h-2 rounded-full bg-[#ff4d00] mt-2 flex-shrink-0"></div>
                      <div className={`text-zinc-400 font-medium ${isPrint ? 'text-base' : 'text-base lg:text-lg'}`}>{item}</div>
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
        <div className={`flex flex-col h-full bg-zinc-950 overflow-hidden ${printClass}`}>
          <div className={`flex-1 overflow-hidden ${(isCompactLayout || isPrint) ? 'px-12 pt-12 pb-6' : 'p-12 lg:p-20'}`}>
             <div className={`flex items-center gap-10 ${(isCompactLayout || isPrint) ? 'mb-6' : 'mb-12'}`}>
               <h2 className={`${(isCompactLayout || isPrint) ? 'text-3xl md:text-4xl' : 'text-4xl md:text-6xl'} font-black text-white uppercase tracking-tight`}>{mainTitle}</h2>
               <div className="h-[2px] flex-1 bg-zinc-900"></div>
               <div className={`text-[#ff4d00] font-bold tracking-widest uppercase ${isPrint ? 'text-xs' : 'text-[10px]'}`}>
                 {detailType}
               </div>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-2 ${(isCompactLayout || isPrint) ? 'gap-4' : 'gap-8 lg:gap-10'}`}>
              {slide.list?.map((item, i) => {
                const [label, val] = item.split(': ');
                return (
                  <div key={i} className={`${(isCompactLayout || isPrint) ? 'p-6' : 'p-8'} bg-black/40 border border-zinc-900/50 shadow-sm`}>
                    <div className={`text-[#ff4d00] font-bold uppercase tracking-[0.2em] mb-2 flex items-center gap-3 ${isPrint ? 'text-[10px]' : 'text-[9px]'}`}>
                      <span className="w-1.5 h-1.5 bg-[#ff4d00] rounded-full"></span>
                      {label}
                    </div>
                    <div className={`text-zinc-300 ${(isCompactLayout || isPrint) ? 'text-sm lg:text-base' : 'text-xl'} font-light leading-relaxed`}>{val}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={`${isPrint ? 'h-[70mm]' : 'h-[40%]'} grid grid-cols-3 gap-0 bg-black border-t-2 border-[#ff4d00]/20`}>
            <Placeholder index={1} fit="contain" isDetail={true} className="bg-black border-r border-zinc-900/50" />
            <Placeholder index={2} fit="contain" isDetail={true} className="bg-black border-r border-zinc-900/50" />
            <Placeholder index={3} fit="contain" isDetail={true} className="bg-black" />
          </div>
        </div>
      );

    default:
      return <div className="p-20 text-red-500">Error rendering slide: Unknown Type</div>;
  }
};
