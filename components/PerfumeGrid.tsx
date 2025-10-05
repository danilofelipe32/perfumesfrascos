import React from 'react';
import PerfumeCard from './PerfumeCard';
import type { Perfume } from '../types';

interface PerfumeGridProps {
  perfumes: Perfume[];
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumeGrid: React.FC<PerfumeGridProps> = ({ perfumes, onSelectPerfume }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
      {perfumes.map((perfume, index) => (
        <PerfumeCard 
          key={perfume.id} 
          perfume={perfume} 
          onSelect={() => onSelectPerfume(perfume)}
          index={index}
        />
      ))}
    </div>
  );
};

export default PerfumeGrid;