import React, { useState, useEffect, useCallback } from 'react';
import type { Perfume } from '../types';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';

interface ShareModalProps {
  perfume: Perfume | null;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ perfume, onClose }) => {
  useLockBodyScroll(!!perfume);
  const [isCopied, setIsCopied] = useState(false);

  const shareUrl = perfume ? `${window.location.origin}${window.location.pathname}#perfume=${perfume.id}` : '';

  const handleCopy = useCallback(() => {
    if (!navigator.clipboard) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setIsCopied(true);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }
      document.body.removeChild(textArea);
      return;
    }
    navigator.clipboard.writeText(shareUrl).then(() => {
      setIsCopied(true);
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }, [shareUrl]);
  
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!perfume) return null;

  const text = `Confira esta obra de arte: ${perfume.name} por ${perfume.designer}!`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-title"
    >
      <div 
        className="relative bg-brand-light rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-transform duration-300 animate-slide-up p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="share-title" className="text-xl sm:text-2xl font-serif font-bold text-brand-dark text-center">Compartilhar Obra</h2>
        <p className="text-center text-gray-600 mt-2">"{perfume.name}"</p>

        <div className="mt-6">
          <label htmlFor="share-link" className="text-sm font-medium text-gray-700">Link direto:</label>
          <div className="flex items-center gap-2 mt-1">
            <input 
              id="share-link"
              type="text" 
              readOnly 
              value={shareUrl}
              className="w-full px-3 py-2 rounded-md bg-white border border-gray-300 text-sm text-gray-600 focus:outline-none" 
            />
            <button
              onClick={handleCopy}
              className={`flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold/80 ${
                isCopied 
                ? 'bg-green-600 text-white' 
                : 'bg-brand-dark text-white hover:bg-brand-dark/90'
              }`}
              style={{ minWidth: '80px' }}
            >
              {isCopied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-center gap-4">
          <a href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no Twitter" className="h-12 w-12 grid place-items-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
            <svg className="h-6 w-6 text-gray-700" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
          </a>
           <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no Facebook" className="h-12 w-12 grid place-items-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
            <svg className="h-6 w-6 text-gray-700" viewBox="0 0 24 24" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z"></path></svg>
          </a>
        </div>

        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 z-10 h-9 w-9 grid place-items-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-brand-dark transition-colors"
          aria-label="Fechar modal de compartilhamento"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(5vh) scale(0.98); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      `}</style>
    </div>
  );
};

export default ShareModal;
