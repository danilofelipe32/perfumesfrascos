import React from 'react';

export const CATEGORIES = ['Todos', 'Floral', 'Amadeirado', 'Oriental', 'Fresco', 'Gourmand', 'Chipre', 'Couro', 'Aromático'];

interface FilterControlsProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ searchTerm, onSearchChange, selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-12">
      <div className="relative mb-8 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Buscar por nome, designer, notas..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-5 py-3.5 rounded-full bg-white/80 border border-gray-200 focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold focus:outline-none transition-all duration-300 shadow-sm placeholder-gray-400 font-sans"
          aria-label="Buscar perfumes"
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
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
  );
};

export default FilterControls;
