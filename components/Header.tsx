import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="z-40 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video 
          className="w-full h-full object-fill outline-none" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="https://i.imgur.com/kwHFIkU.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-center h-[56.25vw] md:h-[624px]">
          <span className="text-3xl md:text-7xl leading-tight font-serif font-bold text-white tracking-wider drop-shadow-md text-center select-none">
            Arte Engarrafada
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;