import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Quote, Star } from 'lucide-react';
import { useCms } from '../context/CmsContext';

const GOOGLE_MAPS_REVIEWS_URL =
  'https://www.google.com/maps/place/Transporte+Juvasa/@-12.026445,-77.3174408,10z/data=!3m1!4b1!4m6!3m5!1s0x610005759ea32923:0x5668248138d7cc55!8m2!3d-12.0266383!4d-76.9877792!16s%2Fg%2F11l5y65sr8';

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0] || ''}${parts[1][0] || ''}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function ReviewsCarouselSection() {
  const { cms } = useCms();
  const reviews = cms.testimonials || [];
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isDragging, setIsDragging] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);

  useEffect(() => {
    const updateCount = () => {
      setVisibleCount(window.innerWidth >= 1024 ? 3 : 1);
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  const maxIndex = Math.max(0, reviews.length - visibleCount);

  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handlePrev = () => {
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

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

  const onMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    setIsDragging(true);
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || mouseStartX.current === null) return;
    const diff = mouseStartX.current - e.clientX;
    if (diff > 45) handleNext();
    else if (diff < -45) handlePrev();
    setIsDragging(false);
    mouseStartX.current = null;
  };

  if (reviews.length === 0) return null;

  return (
    <section
      id="comentarios"
      aria-labelledby="comentarios-home-heading"
      className="py-16 lg:py-20 bg-white border-b border-neutral-200 select-none scroll-mt-20"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header in matching corporate editorial style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-[#C8102E]">
              Experiencias de Nuestros Clientes
            </p>
            <h2
              id="comentarios-home-heading"
              className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#0D0E12]"
              style={{ textWrap: 'balance' }}
            >
              Opiniones verificadas en Google Maps
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              Comentarios reales de viajeros, familias y empresas que confían sus traslados a Transporte JUVASA.
            </p>
          </div>

          <a
            href={GOOGLE_MAPS_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F7F3F4] border border-[#6c1323]/20 text-xs sm:text-sm font-bold text-[#0D0E12] hover:border-[#6c1323] hover:text-[#6c1323] transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.41 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.59 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>5.0 en Google Maps · Ver perfil oficial</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C8102E]" aria-hidden="true" />
          </a>
        </div>

        {/* Carousel Track */}
        <div className="relative px-2 sm:px-4">
          <div
            className="overflow-hidden py-2 cursor-grab active:cursor-grabbing"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={() => {
              if (isDragging) setIsDragging(false);
            }}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * (100 / visibleCount)}%)` }}
            >
              {reviews.map((review) => {
                const initials = review.initials || getInitials(review.author);
                const avatarBg = review.avatarBg || 'bg-[#6c1323]';
                const starsCount = Math.max(1, Math.min(5, review.rating || 5));

                return (
                  <div
                    key={review.id}
                    className="shrink-0 px-2 sm:px-2.5 flex"
                    style={{ width: `${100 / visibleCount}%` }}
                  >
                    <article className="p-5 sm:p-6 bg-[#F7F3F4]/70 border border-neutral-200 rounded-2xl shadow-xs hover:shadow-md hover:border-[#6c1323]/30 transition-all duration-300 text-left flex flex-col justify-between h-full space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-11 h-11 rounded-full ${avatarBg} text-white font-display font-black text-sm flex items-center justify-center shrink-0 shadow-xs relative`}
                            >
                              {initials}
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-xs border border-neutral-200">
                                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" aria-hidden="true">
                                  <path
                                    fill="#4285F4"
                                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                                  />
                                  <path
                                    fill="#34A853"
                                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.41 7.34 24 12 24z"
                                  />
                                  <path
                                    fill="#FBBC05"
                                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                                  />
                                  <path
                                    fill="#EA4335"
                                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.59 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-sm font-bold font-display text-[#0D0E12] leading-tight">
                                {review.author}
                              </h3>
                              <p className="text-[11px] text-neutral-500 mt-0.5">
                                {review.role}
                                {review.timeAgo ? (
                                  <>
                                    {' '}
                                    · <span className="text-neutral-400">{review.timeAgo}</span>
                                  </>
                                ) : null}
                              </p>
                            </div>
                          </div>

                          <Quote className="w-5 h-5 text-[#6c1323]/25 shrink-0" aria-hidden="true" />
                        </div>

                        <div
                          className="flex items-center gap-1 text-[#fab511] pt-0.5"
                          aria-label={`Calificación ${starsCount}.0 de 5 estrellas`}
                        >
                          {Array.from({ length: starsCount }).map((_, starIdx) => (
                            <Star
                              key={starIdx}
                              className="w-4 h-4 fill-[#fab511] text-[#fab511] shrink-0"
                              aria-hidden="true"
                            />
                          ))}
                          <span className="text-xs font-bold text-neutral-700 ml-1.5 font-mono-tabular">
                            5.0
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                          "{review.comment}"
                        </p>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Left / Right Circular Carousel Buttons */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Comentario anterior"
            className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-[#0D0E12] shadow-xl border border-neutral-200 flex items-center justify-center hover:bg-[#6c1323] hover:text-white transition-all z-20 cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Siguiente comentario"
            className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-[#0D0E12] shadow-xl border border-neutral-200 flex items-center justify-center hover:bg-[#6c1323] hover:text-white transition-all z-20 cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-1.5 mt-5">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
              <button
                key={`review-dot-${dotIdx}`}
                type="button"
                onClick={() => setIndex(dotIdx)}
                aria-label={`Ver página de comentarios ${dotIdx + 1}`}
                className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  index === dotIdx ? 'w-7 bg-[#6c1323]' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
