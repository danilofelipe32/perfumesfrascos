import React, { useState } from 'react';

export const CATEGORIES = ['Todos', 'Favoritos', 'Floral', 'Amadeirado', 'Oriental', 'Fresco', 'Gourmand', 'Chipre', 'Couro', 'Aromático'];
export const COLORS = ['Todas', 'Dourado', 'Prateado', 'Azul', 'Vermelho', 'Verde', 'Preto', 'Branco', 'Roxo', 'Rosa'];

interface FilterControlsProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange,
  selectedColor,
  onColorChange
}) => {
  const [activeTab, setActiveTab] = useState<'none' | 'categories' | 'colors'>('none');

  const toggleTab = (tab: 'categories' | 'colors') => {
    setActiveTab(activeTab === tab ? 'none' : tab);
  };

  return (
    <div className="mb-12">
      <div className="relative max-w-xl mx-auto flex flex-col gap-4">
        
        {/* Barra de Busca com Botões de Toggle */}
        <div className="relative flex items-center gap-2">
           {/* Botão Categorias */}
          <button
            onClick={() => toggleTab('categories')}
            className={`h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-full transition-colors duration-200 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 ${activeTab === 'categories' ? 'bg-brand-gold text-white border-brand-gold' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
            aria-label="Filtrar por Categoria"
            title="Categorias"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
          </button>

          {/* Botão Cores */}
          <button
            onClick={() => toggleTab('colors')}
            className={`h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-full transition-colors duration-200 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 ${activeTab === 'colors' ? 'bg-brand-gold text-white border-brand-gold' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
            aria-label="Filtrar por Cor"
            title="Cores"
          >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a16.001 16.001 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
            </svg>
          </button>

          {/* Input de Busca */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar por nome, designer, notas..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-5 pr-12 py-3.5 rounded-full bg-white/80 border border-gray-200 focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold focus:outline-none transition-all duration-300 shadow-sm placeholder-gray-400 font-sans h-12"
              aria-label="Buscar perfumes"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Painéis Expansíveis */}
        
        {/* Painel de Categorias */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeTab === 'categories' ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white/50 rounded-xl p-4 border border-gray-100">
             <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 text-center">Categorias</span>
             <div className="flex flex-wrap items-center justify-center gap-2">
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

        {/* Painel de Cores */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeTab === 'colors' ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white/50 rounded-xl p-4 border border-gray-100">
             <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 text-center">Filtrar por Cor</span>
             <div className="flex flex-wrap items-center justify-center gap-2">
                {COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => onColorChange(color)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold/80 flex items-center gap-2
                      ${selectedColor === color
                        ? 'bg-brand-dark text-white shadow-md'
                        : 'bg-white text-brand-dark hover:bg-gray-100 hover:shadow-sm border border-gray-200'
                      }`}
                    aria-pressed={selectedColor === color}
                  >
                    {/* Indicador de cor (bolinha) */}
                    {color !== 'Todas' && (
                        <span 
                          className="w-3 h-3 rounded-full border border-black/10 shadow-sm inline-block"
                          style={{
                              backgroundColor: 
                                color === 'Dourado' ? '#D4AF37' :
                                color === 'Prateado' ? '#C0C0C0' :
                                color === 'Azul' ? '#3B82F6' :
                                color === 'Vermelho' ? '#EF4444' :
                                color === 'Verde' ? '#10B981' :
                                color === 'Preto' ? '#1F2937' :
                                color === 'Branco' ? '#FFFFFF' :
                                color === 'Roxo' ? '#8B5CF6' :
                                color === 'Rosa' ? '#EC4899' : 'transparent'
                          }}
                        />
                    )}
                    {color}
                  </button>
                ))}
              </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FilterControls;