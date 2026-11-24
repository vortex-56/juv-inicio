import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Users,
  Briefcase,
  ShieldCheck,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { SeoHead } from '../components/SeoHead';
import { SafeImage } from '../components/SafeImage';
import { QuoteSection } from '../components/QuoteSection';

const CATEGORIES = [
  { key: 'all', label: 'Toda la Flota' },
  { key: 'suv', label: 'Auto & Camioneta' },
  { key: 'van', label: 'Vanes (6–10 pax)' },
  { key: 'minibus', label: 'Sprinter (11–20 pax)' },
] as const;

export function FleetPage() {
  const { cms } = useCms();
  const [filter, setFilter] = useState<'all' | 'suv' | 'van' | 'minibus'>('all');
  const [mobileIndex, setMobileIndex] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const filtered =
    filter === 'all' ? cms.fleet : cms.fleet.filter((v) => v.category === filter);

  const safeIndex = Math.min(mobileIndex, Math.max(0, filtered.length - 1));

  const handleFilterChange = (catKey: 'all' | 'suv' | 'van' | 'minibus') => {
    setFilter(catKey);
    setMobileIndex(0);
  };

  const handlePrev = () => {
    setMobileIndex((prev) => (prev <= 0 ? filtered.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setMobileIndex((prev) => (prev >= filtered.length - 1 ? 0 : prev + 1));
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

  return (
    <>
      <SeoHead
        title="Flota de Vehículos: Camionetas, Vanes y Sprinter en Lima | Transporte JUVASA"
        description="Conoce la flota propia de Transporte JUVASA: autos y camionetas ejecutivas, vanes Hyundai y minibuses Mercedes-Benz Sprinter de hasta 20 pasajeros."
        keywords="flota transporte juvasa, alquiler van lima, mercedes sprinter 15 pasajeros, sprinter 20 pasajeros peru"
        breadcrumbs={[
          { name: 'Inicio', path: '/' },
          { name: 'Flota', path: '/flota' },
        ]}
      />

      <section className="bg-[#6c1323] text-white py-14 lg:py-18 border-b-4 border-[#fab511]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <nav aria-label="Ruta de navegación" className="text-xs text-red-100/80 flex items-center gap-2">
            <Link to="/" className="hover:text-[#fab511]">
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#fab511] font-semibold">Flota de Vehículos</span>
          </nav>
          <h1
            className="font-display text-3xl sm:text-5xl font-bold tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Flota moderna equipada con GPS 24/7 y permisos MTC
          </h1>
          <p className="text-red-100/90 text-base sm:text-lg max-w-2xl leading-relaxed">
            Desde traslados ejecutivos individuales hasta minibuses Mercedes-Benz Sprinter para 20 pasajeros.
            Selecciona una unidad para revisar su ficha técnica completa, capacidad de equipaje y tarifas.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* Interactive Category Filter */}
          <div
            className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F7F3F4] rounded-xl w-fit mb-10 border border-[#6c1323]/15"
            role="group"
            aria-label="Filtrar vehículos por categoría"
          >
            {CATEGORIES.map((cat) => {
              const active = filter === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => handleFilterChange(cat.key)}
                  aria-pressed={active}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#C8102E] text-white shadow-sm'
                      : 'text-neutral-700 hover:text-[#0D0E12] hover:bg-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Desktop Layout: 4 Horizontal Rows (Image Left, Full Info Right) */}
          <div className="hidden lg:flex lg:flex-col gap-8">
            {filtered.map((vehicle) => (
              <article
                key={vehicle.id}
                className="grid grid-cols-12 items-stretch rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:border-[#6c1323] shadow-xs transition-colors"
              >
                {/* Image strictly on the Left */}
                <Link
                  to={`/flota/${vehicle.slug}`}
                  className="col-span-5 w-full h-full min-h-[300px] min-w-0 overflow-hidden bg-neutral-100 block group"
                >
                  <SafeImage
                    src={vehicle.image}
                    alt={`${vehicle.name} — ${vehicle.categoryLabel}`}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </Link>

                {/* Full Info strictly on the Right */}
                <div className="col-span-7 min-w-0 p-8 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="text-xs text-neutral-500 flex items-center gap-2 font-medium">
                      <span className="text-[#C8102E] font-bold uppercase tracking-wide">
                        {vehicle.categoryLabel}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">{vehicle.yearRange}</span>
                    </div>

                    <h2 className="font-display text-2xl xl:text-3xl font-bold text-[#0D0E12]">
                      <Link to={`/flota/${vehicle.slug}`} className="hover:text-[#6c1323] transition-colors">
                        {vehicle.name}
                      </Link>
                    </h2>

                    <p className="text-sm text-neutral-600 leading-relaxed">{vehicle.description}</p>

                    <div className="pt-2 grid grid-cols-3 gap-4 text-xs text-neutral-700 border-t border-neutral-100">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#C8102E] shrink-0" aria-hidden="true" />
                        <span className="font-mono-tabular font-semibold">
                          {vehicle.passengersMin} a {vehicle.passengersMax} pasajeros
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-[#C8102E] shrink-0" aria-hidden="true" />
                        <span>{vehicle.luggageCapacity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#C8102E] shrink-0" aria-hidden="true" />
                        <span>{vehicle.priceHint}</span>
                      </div>
                    </div>

                    <ul className="grid grid-cols-2 gap-2 pt-2">
                      {vehicle.features.slice(0, 4).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                          <Check className="w-4 h-4 text-[#C8102E] mt-0.5 shrink-0" aria-hidden="true" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <Link
                      to={`/flota/${vehicle.slug}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#C8102E] text-white text-sm font-bold hover:bg-[#9B0B23] transition-colors whitespace-nowrap"
                    >
                      <span>Ver vehículo completo</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    <a
                      href="#cotizar"
                      className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-[#fab511] text-[#6c1323] text-sm font-extrabold hover:bg-[#e2a20b] transition-colors whitespace-nowrap"
                    >
                      Cotizar esta unidad
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Mobile Layout: Single-Image Carousel (Image Top, Info Below) */}
          <div className="block lg:hidden">
            <div className="relative">
              <div
                className="overflow-hidden"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${safeIndex * 100}%)` }}
                >
                  {filtered.map((vehicle) => (
                    <div key={vehicle.id} className="w-full shrink-0 px-0.5">
                      <article className="rounded-2xl border border-neutral-200 bg-white overflow-hidden flex flex-col justify-between">
                        <div>
                          <Link
                            to={`/flota/${vehicle.slug}`}
                            className="block aspect-[4/3] overflow-hidden bg-neutral-100"
                          >
                            <SafeImage
                              src={vehicle.image}
                              alt={`${vehicle.name} — ${vehicle.categoryLabel}`}
                              className="w-full h-full object-cover"
                            />
                          </Link>
                          <div className="p-6 space-y-3">
                            <div className="text-xs text-neutral-500 flex items-center gap-2 font-medium">
                              <span className="text-[#C8102E] font-semibold">{vehicle.categoryLabel}</span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono-tabular">{vehicle.yearRange}</span>
                            </div>
                            <h2 className="font-display text-2xl font-bold text-[#0D0E12]">
                              <Link to={`/flota/${vehicle.slug}`} className="hover:text-[#C8102E] transition-colors">
                                {vehicle.name}
                              </Link>
                            </h2>
                            <p className="text-sm text-neutral-600 leading-relaxed">{vehicle.tagline}</p>

                            <div className="pt-3 space-y-2 text-xs text-neutral-700 border-t border-neutral-100">
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-[#C8102E] shrink-0" aria-hidden="true" />
                                <span className="font-mono-tabular font-medium">
                                  Capacidad: {vehicle.passengersMin} a {vehicle.passengersMax} pasajeros
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-[#C8102E] shrink-0" aria-hidden="true" />
                                <span>{vehicle.luggageCapacity}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-[#C8102E] shrink-0" aria-hidden="true" />
                                <span>{vehicle.priceHint}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="px-6 pb-6 pt-2 flex items-center gap-3">
                          <Link
                            to={`/flota/${vehicle.slug}`}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#C8102E] text-white text-xs sm:text-sm font-bold hover:bg-[#9B0B23] transition-colors whitespace-nowrap"
                          >
                            <span>Ver vehículo completo</span>
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </Link>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>

              {filtered.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Vehículo anterior"
                    className="absolute left-2 top-36 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 text-[#0D0E12] shadow-lg border border-neutral-200 flex items-center justify-center hover:bg-[#6c1323] hover:text-white transition-colors z-10 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Siguiente vehículo"
                    className="absolute right-2 top-36 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 text-[#0D0E12] shadow-lg border border-neutral-200 flex items-center justify-center hover:bg-[#6c1323] hover:text-white transition-colors z-10 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>

                  <div className="flex justify-center items-center gap-2 mt-5">
                    {filtered.map((v, idx) => (
                      <button
                        key={`fleet-dot-${v.id}`}
                        type="button"
                        onClick={() => setMobileIndex(idx)}
                        aria-label={`Ver vehículo ${idx + 1}: ${v.name}`}
                        className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                          safeIndex === idx ? 'w-8 bg-[#6c1323]' : 'w-2.5 bg-neutral-300 hover:bg-neutral-400'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <QuoteSection sourcePage="/flota" />
    </>
  );
}
