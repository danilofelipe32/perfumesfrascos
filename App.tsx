import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PerfumeGrid from './components/PerfumeGrid';
import PerfumeDetailModal from './components/PerfumeDetailModal';
import FilterControls from './components/FilterControls';
import { perfumes } from './data/perfumes';
import type { Perfume } from './types';
import ShareModal from './components/ShareModal';

const App: React.FC = () => {
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [perfumeToShare, setPerfumeToShare] = useState<Perfume | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const savedFavorites = window.localStorage.getItem('favoritePerfumes');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('favoritePerfumes', JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage", error);
    }
  }, [favorites]);
  
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#perfume=')) {
        const perfumeId = parseInt(hash.substring(9), 10);
        if (!isNaN(perfumeId)) {
          const perfumeToOpen = perfumes.find(p => p.id === perfumeId);
          if (perfumeToOpen) {
            setTimeout(() => {
                setSelectedPerfume(perfumeToOpen);
            }, 100);
          }
        }
      }
    };

    handleHashChange(); // Check hash on initial load
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleToggleFavorite = (perfumeId: number) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(perfumeId)) {
        return prevFavorites.filter(id => id !== perfumeId);
      } else {
        return [...prevFavorites, perfumeId];
      }
    });
  };

  const handleSelectPerfume = (perfume: Perfume) => {
    setSelectedPerfume(perfume);
  };
  
  const handleSharePerfume = (perfume: Perfume) => {
    setPerfumeToShare(perfume);
  };

  const handleCloseModal = () => {
    setSelectedPerfume(null);
    if (window.location.hash) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };
  
  const handleCloseShareModal = () => {
    setPerfumeToShare(null);
  };

  const filteredPerfumes = useMemo(() => {
    let basePerfumes = perfumes;

    if (selectedCategory === 'Favoritos') {
      basePerfumes = perfumes.filter(p => favorites.includes(p.id));
    } else if (selectedCategory !== 'Todos') {
      basePerfumes = perfumes.filter(p => p.categories && p.categories.includes(selectedCategory));
    }
    
    return basePerfumes.filter(perfume => {
      const term = searchTerm.toLowerCase();
      if (!term) return true;

      return (
        perfume.name.toLowerCase().includes(term) ||
        perfume.designer.toLowerCase().includes(term) ||
        perfume.notes.top.some(note => note.toLowerCase().includes(term)) ||
        perfume.notes.heart.some(note => note.toLowerCase().includes(term)) ||
        perfume.notes.base.some(note => note.toLowerCase().includes(term))
      );
    });
  }, [searchTerm, selectedCategory, favorites]);


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

        <PerfumeGrid 
          perfumes={filteredPerfumes} 
          onSelectPerfume={handleSelectPerfume}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onShare={handleSharePerfume}
          selectedCategory={selectedCategory}
        />
      </main>
      <Footer />
      <PerfumeDetailModal 
        perfume={selectedPerfume} 
        onClose={handleCloseModal} 
        onShare={handleSharePerfume} 
      />
      <ShareModal 
        perfume={perfumeToShare} 
        onClose={handleCloseShareModal} 
      />
    </div>
  );
};

export default App;
