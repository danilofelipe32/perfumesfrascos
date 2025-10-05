import React from 'react';

interface ArtisticPlaceholderProps {
  seed: number;
}

// Simple pseudo-random number generator based on a seed for deterministic "randomness"
const mulberry32 = (a: number) => {
  return function() {
    a += 0x6D2B79F5;
    a = Math.imul(a ^ a >>> 15, a | 1);
    a ^= a + Math.imul(a ^ a >>> 7, a | 61);
    return ((a ^ a >>> 14) >>> 0) / 4294967296;
  }
}

const ArtisticPlaceholder: React.FC<ArtisticPlaceholderProps> = ({ seed }) => {
  const rand = mulberry32(seed);
  
  const numShapes = Math.floor(rand() * 4) + 3; // 3 to 6 shapes
  const shapes = Array.from({ length: numShapes }).map((_, i) => {
    const size = rand() * 60 + 20; // 20 to 80
    const x = rand() * 100;
    const y = rand() * 100;
    const opacity = rand() * 0.1 + 0.05; // 0.05 to 0.15
    const rotation = rand() * 360;
    const isCircle = rand() > 0.5;
    const color = rand() > 0.6 ? '#BFA181' : '#2E2E2E';

    if (isCircle) {
      return <circle key={i} cx={`${x}%`} cy={`${y}%`} r={`${size}%`} fill={color} opacity={opacity} transform={`rotate(${rotation} ${x} ${y})`} />;
    } else {
      return <rect key={i} x={`${x - size / 2}%`} y={`${y - size / 2}%`} width={`${size}%`} height={`${size}%`} fill={color} opacity={opacity} transform={`rotate(${rotation} ${x} ${y})`} />;
    }
  });

  return (
    <div className="absolute inset-0 w-full h-full bg-brand-light/50 overflow-hidden transition-opacity duration-500 ease-in-out">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id={`blur-${seed}`}>
                    <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
                </filter>
            </defs>
            <g filter={`url(#blur-${seed})`}>
              {shapes}
            </g>
        </svg>
    </div>
  );
};

export default ArtisticPlaceholder;