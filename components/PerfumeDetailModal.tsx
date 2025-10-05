
import React, { useEffect } from 'react';
import type { Perfume } from '../types';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import ResponsiveImage from './ResponsiveImage';

interface PerfumeDetailModalProps {
  perfume: Perfume | null;
  onClose: () => void;
}

const ScentNotes: React.FC<{ title: string; notes: string[] }> = ({ title, notes }) => (
  <div>
    <h4 className="text-sm font-semibold tracking-widest uppercase text-brand-gold">{title}</h4>
    <p className="text-gray-600 mt-1">{notes.join(', ')}</p>
  </div>
);

const PerfumeDetailModal: React.FC<PerfumeDetailModalProps> = ({ perfume, onClose }) => {
  useLockBodyScroll(!!perfume);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!perfume) return null;

  return (
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
        <div className="w-full h-1/3 sm:h-64 md:h-auto md:w-1/2 flex-shrink-0">
           <ResponsiveImage 
              src={perfume.imageUrl} 
              alt={`Frasco artístico de ${perfume.name}`} 
              className="w-full h-full object-cover"
              sizes="(min-width: 1024px) 512px, (min-width: 768px) 50vw, 100vw"
              fetchPriority="high"
           />
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col overflow-y-auto">
          <div className="flex-grow">
            <p className="font-sans text-sm text-gray-500">{perfume.designer} &middot; {perfume.year}</p>
            <h2 id="perfume-name" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-dark mt-2">{perfume.name}</h2>
            
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
  );
};

export default PerfumeDetailModal;
