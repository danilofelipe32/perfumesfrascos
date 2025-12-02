
import React, { useEffect, useState } from 'react';
import type { Perfume } from '../types';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import ResponsiveImage from './ResponsiveImage';

interface PerfumeDetailModalProps {
  perfume: Perfume | null;
  onClose: () => void;
  onShare: (perfume: Perfume) => void;
}

const ScentNotes: React.FC<{ title: string; notes: string[] }> = ({ title, notes }) => (
  <div>
    <h4 className="text-sm font-semibold tracking-widest uppercase text-brand-gold">{title}</h4>
    <p className="text-gray-600 mt-1">{notes.join(', ')}</p>
  </div>
);

const PerfumeDetailModal: React.FC<PerfumeDetailModalProps> = ({ perfume, onClose, onShare }) => {
  useLockBodyScroll(!!perfume);
  const [isFullImage, setIsFullImage] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isFullImage) {
          setIsFullImage(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose, isFullImage]);

  if (!perfume) return null;

  return (
    <>
      {/* Lightbox para imagem em tela cheia */}
      {isFullImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in"
          onClick={(e) => {
             e.stopPropagation();
             setIsFullImage(false);
          }}
          role="dialog"
          aria-label="Imagem em tela cheia"
        >
           <button 
              className="absolute top-4 right-4 z-[70] h-12 w-12 grid place-items-center rounded-full bg-black/50 text-white/80 hover:bg-black/80 hover:text-white transition-all"
              onClick={() => setIsFullImage(false)}
              aria-label="Fechar imagem"
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>
           <div 
             className="relative w-full h-full flex items-center justify-center pointer-events-none"
           >
             <div className="pointer-events-auto max-h-full max-w-full">
               <ResponsiveImage 
                  src={perfume.imageUrl}
                  alt={perfume.name}
                  className="max-h-[90vh] max-w-full object-contain shadow-2xl rounded-sm"
                  sizes="100vw"
               />
             </div>
           </div>
        </div>
      )}

      {/* Modal Principal */}
      <div 
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center sm:p-4 transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="perfume-name"
      >
        <div 
          className="relative bg-brand-light sm:rounded-xl shadow-2xl w-full max-w-4xl h-full sm:h-auto sm:max-h-[90vh] flex flex-col md:flex-row overflow-hidden transform transition-transform duration-300 animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className="w-full h-1/3 sm:h-64 md:h-auto md:w-1/2 flex-shrink-0 cursor-zoom-in group relative overflow-hidden"
            onClick={() => setIsFullImage(true)}
            role="button"
            aria-label="Expandir imagem"
          >
             {/* Dica visual de zoom ao passar o mouse */}
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
             </div>
             <ResponsiveImage 
                src={perfume.imageUrl} 
                alt={`Frasco artístico de ${perfume.name}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 512px, (min-width: 768px) 50vw, 100vw"
                fetchPriority="high"
             />
          </div>

          <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col overflow-y-auto bg-brand-light">
            <div className="flex-grow">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-sans text-sm text-gray-500">{perfume.designer} &middot; {perfume.year}</p>
                  <h2 id="perfume-name" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-dark mt-2">{perfume.name}</h2>
                </div>
                <button
                  onClick={() => onShare(perfume)}
                  className="flex-shrink-0 mt-3 h-10 w-10 grid place-items-center rounded-full text-gray-500 hover:bg-gray-200 hover:text-brand-dark transition-colors"
                  aria-label={`Compartilhar ${perfume.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.001l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.367a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684zm0 9.367a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </div>
              
              <p className="mt-6 font-sans text-base text-gray-700 leading-relaxed">{perfume.story}</p>

              <div className="mt-8 space-y-6 border-t border-gray-200 pt-6">
                <ScentNotes title="Notas de Topo" notes={perfume.notes.top} />
                <ScentNotes title="Notas de Coração" notes={perfume.notes.heart} />
                <ScentNotes title="Notas de Fundo" notes={perfume.notes.base} />
              </div>
            </div>
          </div>
            
          <button 
            onClick={onClose} 
            className="absolute top-3 right-3 z-10 h-10 w-10 grid place-items-center rounded-full bg-black/10 sm:bg-transparent text-gray-600 sm:text-gray-400 hover:text-brand-dark transition-colors"
            aria-label="Fechar detalhes"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slide-up {
            from { transform: translateY(5vh) scale(0.98); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
          }
          .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
          .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        `}</style>
      </div>
    </>
  );
};

export default PerfumeDetailModal;
