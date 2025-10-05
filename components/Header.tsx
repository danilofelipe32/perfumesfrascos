
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-light/80 backdrop-blur-sm sticky top-0 z-40 border-b border-brand-gold/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
          <span className="text-2xl font-serif font-bold text-brand-dark tracking-wider">
            Arte Engarrafada
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;