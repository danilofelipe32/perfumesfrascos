
import React, { useState, useEffect, useRef } from 'react';
import PerfumeCard from './PerfumeCard';
import type { Perfume } from '../types';

interface PerfumeGridProps {
  perfumes: Perfume[];
  onSelectPerfume: (perfume: Perfume) => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onShare: (perfume: Perfume) => void;
  selectedCategory: string;
}

const PerfumeGrid: React.FC<PerfumeGridProps> = ({ perfumes, onSelectPerfume, favorites, onToggleFavorite, onShare, selectedCategory }) => {
  const [visiblePerfumes, setVisiblePerfumes] = useState<Perfume[]>(perfumes);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevCategoryRef = useRef(selectedCategory);

  useEffect(() => {
    // Se a categoria mudou, fazemos a transição suave
    if (selectedCategory !== prevCategoryRef.current) {
      setIsTransitioning(true);
      
      const timeoutId = setTimeout(() => {
        setVisiblePerfumes(perfumes);
        prevCategoryRef.current = selectedCategory;
        setIsTransitioning(false);
      }, 300); // 300ms deve coincidir com a duração da classe CSS duration-300

      return () => clearTimeout(timeoutId);
    } else {
      // Se for apenas uma busca ou atualização de favoritos na mesma categoria, atualiza imediatamente
      // para manter a responsividade da interface (ex: enquanto digita)
      setVisiblePerfumes(perfumes);
    }
  }, [perfumes, selectedCategory]);

  const renderContent = () => {
    if (visiblePerfumes.length === 0) {
      if (selectedCategory === 'Favoritos' && prevCategoryRef.current === 'Favoritos') {
        return (
          <div className="text-center py-16">
            <h3 className="text-xl font-serif text-brand-dark">Sua coleção de favoritos está vazia</h3>
            <p className="text-gray-500 mt-2">Clique no ícone de coração em um perfume para adicioná-lo aqui.</p>
          </div>
        );
      }
      return (
        <div className="text-center py-16">
          <h3 className="text-xl font-serif text-brand-dark">Nenhum perfume encontrado</h3>
          <p className="text-gray-500 mt-2">Tente ajustar sua busca ou filtros.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
        {visiblePerfumes.map((perfume, index) => (
          <PerfumeCard 
            // Usamos a categoria na key para forçar o remount e re-executar a animação de entrada dos cards (stagger)
            // quando a categoria muda, mesmo que o perfume já estivesse na tela (ex: estava em "Todos" e agora em "Floral")
            key={`${perfume.id}-${prevCategoryRef.current}`} 
            perfume={perfume} 
            onSelect={() => onSelectPerfume(perfume)}
            index={index}
            isFavorite={favorites.includes(perfume.id)}
            onToggleFavorite={onToggleFavorite}
            onShare={onShare}
          />
        ))}
      </div>
    );
  };

  return (
    <div 
      className={`transition-opacity duration-300 ease-in-out ${
        isTransitioning 
          ? 'opacity-0' 
          : 'opacity-100'
      }`}
    >
      {renderContent()}
    </div>
  );
};

export default PerfumeGrid;
