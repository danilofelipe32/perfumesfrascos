import React, { useState, useEffect, useRef } from 'react';
import type { Perfume } from '../types';
import ArtisticPlaceholder from './ArtisticPlaceholder';

interface PerfumeCardProps {
  perfume: Perfume;
  onSelect: () => void;
  index: number;
}

const PerfumeCard: React.FC<PerfumeCardProps> = ({ perfume, onSelect, index }) => {
  const [translateY, setTranslateY] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const PARALLAX_INTENSITY = 0.08;

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (containerRef.current) {
        const { top } = containerRef.current.getBoundingClientRect();
        const offset = (window.innerHeight / 2 - top) * PARALLAX_INTENSITY;
        setTranslateY(offset);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial call to set position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div 
        className="group cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1.5 animate-fade-in-up"
        style={{ animationDelay: `${index * 75}ms` }}
        onClick={onSelect}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect()}
        aria-label={`Ver detalhes de ${perfume.name}`}
      >
        <div 
          ref={containerRef}
          className="relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 group-hover:shadow-soft-glow-lg h-72 sm:h-80"
        >
          <div className={`transition-opacity duration-700 ease-in ${isImageLoaded ? 'opacity-0' : 'opacity-100'}`}>
            <ArtisticPlaceholder seed={perfume.id} />
          </div>
          <div
            style={{
              transform: `translateY(${translateY}px)`,
              willChange: 'transform',
              height: '120%', 
              width: '100%',
              position: 'absolute', // Positioned over the placeholder
              top: '-10%',
              left: 0,
            }}
          >
            <img 
              src={perfume.imageUrl} 
              alt={`Garrafa de ${perfume.name}`}
              className={`w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsImageLoaded(true)}
              loading="lazy"
            />
          </div>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg font-serif font-bold text-brand-dark transition-colors duration-300 group-hover:text-brand-gold">{perfume.name}</h3>
          <p className="text-sm text-gray-500">{perfume.designer}</p>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          opacity: 0; /* Start hidden */
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default PerfumeCard;