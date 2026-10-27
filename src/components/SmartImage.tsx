import React, { useState } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackTitle?: string;
  className?: string;
  aspectRatioClass?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  fallbackTitle,
  className = '',
  aspectRatioClass = 'aspect-[4/3]',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#1A1A1A] ${aspectRatioClass} ${className}`}>
      {/* Blurred shimmer skeleton while loading */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-neutral-900 animate-shimmer" />
      )}

      {/* Main Image */}
      {!error ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          {...props}
        />
      ) : (
        /* Zero-broken-image fallback container: elegant brand gradient with typography */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1A1A1A] via-[#2A1E14] to-[#0D0D0D] border border-[#FF7A00]/30 text-white">
          <div className="w-12 h-12 rounded-full bg-[#FF7A00]/10 flex items-center justify-center mb-3 border border-[#FF7A00]/40">
            <span className="font-serif italic text-xl text-[#FF7A00]">TFG</span>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#FFD3A1] mb-1 font-medium">The Furniture Guy</span>
          <p className="text-sm font-serif italic text-white/90 line-clamp-2 max-w-[200px]">
            {fallbackTitle || alt || "Bespoke Collection"}
          </p>
        </div>
      )}
    </div>
  );
};
