import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PerfumeGrid from './components/PerfumeGrid';
import PerfumeDetailModal from './components/PerfumeDetailModal';
import FilterControls from './components/FilterControls';
import { perfumes } from './data/perfumes';
import type { Perfume } from './types';

const App: React.FC = () => {
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const handleSelectPerfume = (perfume: Perfume) => {
    setSelectedPerfume(perfume);
  };

  const handleCloseModal = () => {
    setSelectedPerfume(null);
  };

  const filteredPerfumes = useMemo(() => {
    return perfumes.filter(perfume => {
      const categoryMatch = selectedCategory === 'Todos' || (perfume.categories && perfume.categories.includes(selectedCategory));

      const term = searchTerm.toLowerCase();
      const searchMatch = !term || (
        perfume.name.toLowerCase().includes(term) ||
        perfume.designer.toLowerCase().includes(term) ||
        perfume.notes.top.some(note => note.toLowerCase().includes(term)) ||
        perfume.notes.heart.some(note => note.toLowerCase().includes(term)) ||
        perfume.notes.base.some(note => note.toLowerCase().includes(term))
      );

      return categoryMatch && searchMatch;
    });
  }, [searchTerm, selectedCategory]);


  return (
    <div className="flex flex-col min-h-screen bg-brand-light text-brand-dark">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-dark tracking-tight">A Arte no Frasco</h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Descubra uma coleção curada de frascos de perfume onde o design transcende a função, tornando-se uma pura expressão de arte.</p>
        </div>
        
        <FilterControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <PerfumeGrid perfumes={filteredPerfumes} onSelectPerfume={handleSelectPerfume} />
      </main>
      <Footer />
      <PerfumeDetailModal perfume={selectedPerfume} onClose={handleCloseModal} />
    </div>
  );
};

export default App;
