import { useState } from 'react';
import { Truck } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectClass?: string;
}

export function SafeImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  priority = false,
  aspectClass = '',
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#171920] via-[#0D0E12] to-black text-white/90 p-6 text-center ${aspectClass} ${className}`}
        role="img"
        aria-label={alt}
      >
        <Truck className="w-8 h-8 text-[#F59E0B] mb-2" aria-hidden="true" />
        <span className="text-xs font-medium tracking-wide text-white/80 max-w-[22ch]">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
