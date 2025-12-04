import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  const [selectedColor, setSelectedColor] = useState('Todas');
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const savedFavorites = window.localStorage.getItem('favoritePerfumes');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      return [];
    }
  });
  const gridRef = useRef<HTMLDivElement>(null);

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
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    scrollToGrid();
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    scrollToGrid();
  };

  const scrollToGrid = () => {
    if (gridRef.current) {
      if (gridRef.current.getBoundingClientRect().top < 80) {
        gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
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

    // 1. Filtrar por Categoria
    if (selectedCategory === 'Favoritos') {
      basePerfumes = perfumes.filter(p => favorites.includes(p.id));
    } else if (selectedCategory !== 'Todos') {
      basePerfumes = perfumes.filter(p => p.categories && p.categories.includes(selectedCategory));
    }
    
    // 2. Filtrar por Cor (Otimizado por predominância do frasco)
    if (selectedColor !== 'Todas') {
      const colorTerm = selectedColor.toLowerCase();
      
      basePerfumes = basePerfumes.filter(p => {
        // Otimização: Focamos apenas no Nome e na História (que descreve o visual do frasco).
        // Ignoramos explicitamente as Notas Olfativas para evitar falsos positivos (ex: notas de rosa em frasco preto).
        const content = `${p.name} ${p.story}`.toLowerCase();
        
        // Mapeamento de termos visuais e temáticos associados à cor do frasco
        if (selectedColor === 'Dourado') return /dourado|ouro|gold|solar|amarelo|mel|âmbar|bronze|radiante|luxo|real/.test(content);
        if (selectedColor === 'Prateado') return /prateado|prata|silver|metálico|cromo|cinza|aço|espelho|alumínio|futuro|lunar/.test(content);
        if (selectedColor === 'Azul') return /azul|blue|safira|lazúli|turquesa|oceano|mar|céu|índigo|água|gelo|noite/.test(content);
        if (selectedColor === 'Vermelho') return /vermelho|red|rubi|carmesim|escarlate|sangue|cereja|fogo|paixão|ardente|granada/.test(content);
        if (selectedColor === 'Verde') return /verde|green|esmeralda|floresta|musgo|jade|oliva|menta|folha|natureza|botânico/.test(content);
        if (selectedColor === 'Preto') return /preto|negro|black|noir|dark|ônix|ébano|obsidiana|carvão|sombra|mistério|escuro/.test(content);
        if (selectedColor === 'Branco') return /branco|white|claro|neve|paz|mármore|pérola|marfim|cristal|puro|limpo|nuvem/.test(content);
        if (selectedColor === 'Roxo') return /roxo|violeta|ametista|púrpura|lilás|uva|ameixa|místico|magia/.test(content);
        if (selectedColor === 'Rosa') return /rosa|pink|rose|coral|fúcsia|magenta|blush|romance|suave|delicado|ternura/.test(content);
        
        return content.includes(colorTerm);
      });
    }

    // 3. Filtrar por Termo de Busca
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
  }, [searchTerm, selectedCategory, favorites, selectedColor]);


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
          onCategoryChange={handleCategoryChange}
          selectedColor={selectedColor}
          onColorChange={handleColorChange}
        />

        <div ref={gridRef} style={{ scrollMarginTop: '100px' }}>
          <PerfumeGrid 
            perfumes={filteredPerfumes} 
            onSelectPerfume={handleSelectPerfume}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onShare={handleSharePerfume}
            selectedCategory={selectedCategory} // Usado para forçar animação na troca
          />
        </div>
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