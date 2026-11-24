import { useRef, useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';

export function BrandsMarqueeSection() {
  const { cms } = useCms();
  const brands = cms.partnerBrands || [];
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);

  const loopedBrands = [...brands, ...brands, ...brands];

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || brands.length === 0) return;

    let rafId: number;
    let lastTime = performance.now();
    const speed = 1.6;

    const tick = (now: number) => {
      const delta = (now - lastTime) / 16.66;
      lastTime = now;
      if (!isDragging && el) {
        el.scrollLeft += speed * (delta || 1);
        const halfWidth = el.scrollWidth / 2;
        if (halfWidth > 0) {
          if (el.scrollLeft >= halfWidth) {
            el.scrollLeft -= halfWidth;
          } else if (el.scrollLeft <= 0) {
            el.scrollLeft += halfWidth;
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isDragging, brands.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
    setIsDragging(true);
    dragStartX.current = e.pageX - el.offsetLeft;
    dragStartScrollLeft.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = scrollerRef.current;
    if (!el) return;
    e.preventDefault();
    const walk = (e.pageX - el.offsetLeft - dragStartX.current) * 1.5;
    el.scrollLeft = dragStartScrollLeft.current - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
    setIsDragging(true);
    dragStartX.current = e.touches[0].pageX - el.offsetLeft;
    dragStartScrollLeft.current = el.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const el = scrollerRef.current;
    if (!el) return;
    const walk = (e.touches[0].pageX - el.offsetLeft - dragStartX.current) * 1.5;
    el.scrollLeft = dragStartScrollLeft.current - walk;
  };

  const stopDrag = () => setIsDragging(false);

  if (brands.length === 0) return null;

  return (
    <section
      id="marcas"
      aria-labelledby="marcas-home-heading"
      className="py-16 lg:py-20 bg-[#F7F3F4] border-b border-[#6c1323]/15 overflow-hidden select-none"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header in matching corporate editorial style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-[#C8102E]">
              Empresas e Instituciones Aliadas
            </p>
            <h2
              id="marcas-home-heading"
              className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#0D0E12]"
              style={{ textWrap: 'balance' }}
            >
              Marcas que confían en Transporte JUVASA
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              Instituciones públicas, operadores logísticos y empresas líderes que respaldan nuestros traslados en Perú.
            </p>
          </div>
        </div>

        {/* Constant Moving Marquee Track */}
        <div className="relative group">
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-[#F7F3F4] via-[#F7F3F4]/80 to-transparent z-10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-[#F7F3F4] via-[#F7F3F4]/80 to-transparent z-10"
            aria-hidden="true"
          />

          <div
            ref={scrollerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={stopDrag}
            className={`flex items-center gap-4 sm:gap-6 overflow-x-hidden py-2 px-1 ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {loopedBrands.map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                className="shrink-0 w-44 sm:w-52 h-24 sm:h-28 bg-white border border-neutral-200 rounded-2xl p-4 sm:p-6 flex items-center justify-center shadow-xs hover:border-[#6c1323]/35 transition-all duration-300 pointer-events-none"
              >
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  width={140}
                  height={48}
                  loading="lazy"
                  draggable={false}
                  referrerPolicy="no-referrer"
                  className="max-h-12 sm:max-h-14 max-w-[85%] object-contain select-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
