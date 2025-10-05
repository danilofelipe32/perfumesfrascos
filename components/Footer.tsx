import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-light mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500 border-t border-gray-200">
        <p>&copy; {new Date().getFullYear()} Portfólio de Arte em Perfumes. Todos os direitos reservados.</p>
        <p className="text-sm mt-2">
          <a 
            href="https://wa.me/5584999780963" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-brand-gold transition-colors duration-300"
          >
            Produzido por Danilo Arruda
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;