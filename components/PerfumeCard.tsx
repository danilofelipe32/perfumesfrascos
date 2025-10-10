import React, { useState, useEffect, useRef } from 'react';
import type { Perfume } from '../types';
import ArtisticPlaceholder from './ArtisticPlaceholder';
import ResponsiveImage from './ResponsiveImage';

interface PerfumeCardProps {
  perfume: Perfume;
  onSelect: () => void;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onShare: (perfume: Perfume) => void;
}

const PerfumeCard: React.FC<PerfumeCardProps> = ({ perfume, onSelect, index, isFavorite, onToggleFavorite, onShare }) => {
  const [translateY, setTranslateY] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  
  const PARALLAX_INTENSITY = 0.08;

  const tag = perfume.categories && perfume.categories.length > 0
    ? `${perfume.categories[0].charAt(0).toUpperCase()}${String(perfume.id).padStart(2, '0')}`
    : `P${String(perfume.id).padStart(2, '0')}`;

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
  
  useEffect(() => {
    // Skip animation on initial component mount for already favorited items
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    setIsAnimating(true);
    const animationTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 300); // Duration must match the animation

    return () => clearTimeout(animationTimeout);
  }, [isFavorite]);


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
           <div className="absolute top-2 left-2 z-10 bg-brand-dark/70 text-white text-xs font-bold font-sans px-2 py-1 rounded-full backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0">
            {tag}
          </div>
          <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare(perfume);
              }}
              className="h-9 w-9 grid place-items-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/40 hover:scale-110 active:scale-100"
              aria-label={`Compartilhar ${perfume.name}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.001l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.367a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(perfume.id);
              }}
              className="h-9 w-9 grid place-items-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/40 hover:scale-110 active:scale-100"
              aria-label={isFavorite ? `Remover ${perfume.name} dos favoritos` : `Adicionar ${perfume.name} aos favoritos`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-all ${isFavorite ? 'text-red-500 fill-current' : 'text-white'} ${isAnimating ? 'animate-heart-pop' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
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
            <ResponsiveImage 
              src={perfume.imageUrl} 
              alt={`Garrafa de ${perfume.name}`}
              className={`w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsImageLoaded(true)}
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
        @keyframes heart-pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
        .animate-heart-pop {
          animation: heart-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>
    </>
  );
};

export default PerfumeCard;