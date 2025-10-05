import React from 'react';

interface ResponsiveImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string;
  alt: string;
}

const generateImgurSources = (url: string) => {
  if (!url.startsWith('https://i.imgur.com/')) {
    return { defaultSrc: url, srcSet: undefined };
  }

  const match = url.match(/^(https:\/\/i\.imgur\.com\/)([^.]+)(\..+)$/);
  if (!match) {
    return { defaultSrc: url, srcSet: undefined };
  }

  const [, base, id, ext] = match;
  
  const mediumUrl = `${base}${id}m${ext}`; // 320w
  const largeUrl = `${base}${id}l${ext}`;   // 640w
  const hugeUrl = `${base}${id}h${ext}`;    // 1024w

  // Inclui a URL original para tamanhos maiores. Assume que tem pelo menos 1024px de largura.
  const srcSet = `${mediumUrl} 320w, ${largeUrl} 640w, ${hugeUrl} 1024w, ${url} 1280w`;

  // Usa uma imagem de tamanho razoável como padrão para navegadores mais antigos.
  return { defaultSrc: largeUrl, srcSet };
};


const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ 
  src, 
  alt, 
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  ...props 
}) => {
  const { defaultSrc, srcSet } = generateImgurSources(src);

  return (
    <img
      src={defaultSrc}
      srcSet={srcSet}
      alt={alt}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      {...props}
    />
  );
};

export default ResponsiveImage;
