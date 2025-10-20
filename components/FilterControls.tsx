import React, { useState } from 'react';

export const CATEGORIES = ['Todos', 'Favoritos', 'Floral', 'Amadeirado', 'Oriental', 'Fresco', 'Gourmand', 'Chipre', 'Couro', 'Aromático'];

interface FilterControlsProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ searchTerm, onSearchChange, selectedCategory, onCategoryChange }) => {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div className="mb-12">
      <div className="relative max-w-xl mx-auto">
        <button
          onClick={() => setShowCategories(!showCategories)}
          className={`absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 transition-colors duration-200 z-10 ${showCategories ? 'bg-brand-gold/20 text-brand-gold' : ''}`}
          aria-label="Mostrar ou ocultar filtros de categoria"
          aria-expanded={showCategories}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
        </button>

        <input
          type="text"
          placeholder="Buscar por nome, designer, notas..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-14 pr-12 py-3.5 rounded-full bg-white/80 border border-gray-200 focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold focus:outline-none transition-all duration-300 shadow-sm placeholder-gray-400 font-sans"
          aria-label="Buscar perfumes"
        />
        
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className={`transition-all duration-500 ease-in-out grid ${showCategories ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-4 max-w-xl mx-auto">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold/80
                    ${selectedCategory === category
                      ? 'bg-brand-dark text-white shadow-md'
                      : 'bg-white text-brand-dark hover:bg-gray-100 hover:shadow-sm border border-gray-200'
                    }`}
                  aria-pressed={selectedCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;