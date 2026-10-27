import React, { useState } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackUrls?: string[];
  itemTypeKeyword?: string;
  lockIndex?: number;
  fallbackTitle?: string;
  className?: string;
  aspectRatioClass?: string;
  priority?: boolean;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  fallbackUrls = [],
  itemTypeKeyword = 'furniture',
  lockIndex = 1,
  fallbackTitle,
  className = '',
  aspectRatioClass = 'aspect-[4/5]',
  priority = false,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  // Current attempt index: 0 = primary src, 1..n = fallbackUrls, n+1 = loremflickr, n+2 = branded gradient
  const [attemptIndex, setAttemptIndex] = useState(0);

  // Clean keyword for loremflickr
  const cleanKeyword = itemTypeKeyword
    ? itemTypeKeyword.replace(/[^a-zA-Z]/g, '').toLowerCase() || 'furniture'
    : 'furniture';

  const totalFallbacks = fallbackUrls.length;

  let currentSrc = src;
  if (attemptIndex > 0 && attemptIndex <= totalFallbacks) {
    currentSrc = fallbackUrls[attemptIndex - 1];
  } else if (attemptIndex === totalFallbacks + 1) {
    currentSrc = `https://loremflickr.com/1200/900/${cleanKeyword}?lock=${lockIndex}`;
  }

  const isFinalPlaceholder = attemptIndex > totalFallbacks + 1;

  const handleImageError = () => {
    // Advance to next fallback
    setAttemptIndex((prev) => prev + 1);
    setLoaded(false);
  };

  return (
    <div className={`relative overflow-hidden bg-[#141414] ${aspectRatioClass} ${className}`}>
      {/* Blurred shimmer skeleton while loading */}
      {!loaded && !isFinalPlaceholder && (
        <div className="absolute inset-0 bg-neutral-900 animate-shimmer z-0" />
      )}

      {!isFinalPlaceholder ? (
        <img
          key={currentSrc}
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={handleImageError}
          className={`w-full h-full object-cover object-center transition-all duration-700 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          {...props}
        />
      ) : (
        /* Branded gradient placeholder */
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
