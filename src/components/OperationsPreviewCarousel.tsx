import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { SafeImage } from './SafeImage';

export function OperationsPreviewCarousel() {
  const { cms } = useCms();
  const items = cms.gallery || [];
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth >= 1024) setVisibleCount(3);
      else if (window.innerWidth >= 640) setVisibleCount(2);
      else setVisibleCount(1);
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCount);

  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handlePrev = () => setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  const handleNext = () => setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) handleNext();
    else if (diff < -40) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (items.length === 0) return null;

  return (
    <div className="pt-12 mt-12 border-t border-neutral-200 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <p className="text-xs font-bold uppercase tracking-wider text-[#C8102E]">
            Operaciones Reales en Ruta
          </p>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0D0E12]">
            Descubre nuestra flota y experiencias en acción
          </h3>
        </div>

        <Link
          to="/nosotros#galeria"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#6c1323] text-white text-xs sm:text-sm font-bold hover:bg-[#C8102E] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
        >
          <Images className="w-4 h-4 text-[#fab511]" aria-hidden="true" />
          <span>Ver galería completa en Nosotros</span>
          <ArrowRight className="w-4 h-4 text-[#fab511]" aria-hidden="true" />
        </Link>
      </div>

      <div className="relative px-1 sm:px-2">
        <div
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * (100 / visibleCount)}%)` }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="shrink-0 px-2"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <Link
                  to="/nosotros#galeria"
                  className="group block relative rounded-2xl overflow-hidden border border-neutral-200 bg-black aspect-[4/3] hover:border-[#6c1323] transition-colors"
                >
                  <SafeImage
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[11px] font-bold text-[#fab511]">
                      {item.category}
                    </span>
                    <p className="text-sm font-bold text-white leading-snug mt-0.5 line-clamp-1">
                      {item.title}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handlePrev}
          aria-label="Foto anterior"
          className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-[#0D0E12] shadow-lg border border-neutral-200 flex items-center justify-center hover:bg-[#6c1323] hover:text-white transition-all z-10 cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Siguiente foto"
          className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-[#0D0E12] shadow-lg border border-neutral-200 flex items-center justify-center hover:bg-[#6c1323] hover:text-white transition-all z-10 cursor-pointer active:scale-95"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      {maxIndex > 0 && (
        <div className="flex justify-center items-center gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
            <button
              key={`ops-dot-${dotIdx}`}
              type="button"
              onClick={() => setIndex(dotIdx)}
              aria-label={`Ir a grupo de fotos ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === dotIdx ? 'w-7 bg-[#6c1323]' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
