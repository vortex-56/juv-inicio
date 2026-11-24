import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Radio, Users, Wrench, ArrowRight, X, MapPin } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { SeoHead } from '../components/SeoHead';
import { SafeImage } from '../components/SafeImage';
import { QuoteSection } from '../components/QuoteSection';
import type { GalleryItem } from '../data/cmsDefaults';

const GALLERY_CATEGORIES = ['Todas', 'Turismo', 'Corporativo', 'Aeropuerto', 'Flota'] as const;

export function AboutPage() {
  const { cms } = useCms();
  const { hash } = useLocation();
  const [filter, setFilter] = useState<'Todas' | 'Turismo' | 'Corporativo' | 'Aeropuerto' | 'Flota'>('Todas');
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (hash === '#galeria') {
      const target = document.getElementById('galeria');
      if (target) {
        window.setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      }
    }
  }, [hash]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const galleryItems =
    filter === 'Todas'
      ? cms.gallery
      : cms.gallery.filter((g) => g.category === filter);

  return (
    <>
      <SeoHead
        title="Nosotros y Galería de Operaciones | Transporte Express Juvasa E.I.R.L."
        description="Conoce a Transporte JUVASA y explora nuestra galería real de traslados al Aeropuerto Jorge Chávez, turismo en Sprinter y movilidad corporativa con GPS 24/7."
        keywords="transporte express juvasa, empresa transporte turistico lima, galeria transporte juvasa, fotos flota sprinter lima, transporte formal mtc peru"
        breadcrumbs={[
          { name: 'Inicio', path: '/' },
          { name: 'Nosotros y Galería', path: '/nosotros' },
        ]}
      />

      <section className="bg-[#6c1323] text-white py-14 lg:py-18 border-b-4 border-[#fab511]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <nav aria-label="Ruta de navegación" className="text-xs text-red-100/80 flex items-center gap-2">
            <Link to="/" className="hover:text-[#fab511]">
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#fab511] font-semibold">Nosotros &amp; Galería</span>
          </nav>
          <h1
            className="font-display text-3xl sm:text-5xl font-bold tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Más de una década moviendo personas, turistas y empresas con seguridad
          </h1>
          <p className="text-red-100/90 text-base sm:text-lg max-w-2xl leading-relaxed">
            {cms.contact.legalName} (RUC {cms.contact.ruc}) opera desde Lima hacia todo el territorio nacional bajo
            estándares estrictos de puntualidad, mantenimiento preventivo y trato humano.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#C8102E]">Identidad Corporativa</p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#0D0E12]">
              Compromiso operativo las 24 horas del día
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Nacimos en Lima con el propósito de elevar el estándar del transporte terrestre privado en Perú.
              Combinamos flota propia moderna —desde camionetas ejecutivas y vanes hasta Mercedes-Benz Sprinter de 20
              pasajeros— con conductores profesionales evaluados periódicamente y tecnología de rastreo GPS continua.
            </p>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Hoy somos aliado estratégico de operadores de turismo receptivo, hoteles en Miraflores y San Isidro,
              corporaciones nacionales y viajeros internacionales que buscan llegar a tiempo y viajar tranquilos.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/flota"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C8102E] text-white text-sm font-semibold hover:bg-[#9B0B23] transition-colors"
              >
                <span>Ver flota disponible</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href="#galeria"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-300 text-sm font-semibold text-[#0D0E12] hover:bg-neutral-50"
              >
                <span>Explorar galería real</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100">
              <SafeImage
                src="https://transportejuvasa.com.pe/media-juvasa/img/x1-p2.webp"
                alt="Flota corporativa y turística de Transporte JUVASA en Lima"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-[#F7F3F4] border-b border-[#6c1323]/15">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D0E12] mb-8">
            Pilares de nuestro estándar de seguridad
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-2.5">
              <ShieldCheck className="w-6 h-6 text-[#C8102E]" aria-hidden="true" />
              <h3 className="font-display text-lg font-bold text-[#0D0E12]">Habilitación MTC</h3>
              <p className="text-sm text-neutral-600">
                Permisos vigentes de ámbito nacional, turístico y de personal con revisión técnica semestral.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-2.5">
              <Radio className="w-6 h-6 text-[#C8102E]" aria-hidden="true" />
              <h3 className="font-display text-lg font-bold text-[#0D0E12]">Central GPS 24/7</h3>
              <p className="text-sm text-neutral-600">
                Telemetría en vivo con geocercas, control de velocidad máximo y soporte inmediato ante contingencias.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-2.5">
              <Wrench className="w-6 h-6 text-[#C8102E]" aria-hidden="true" />
              <h3 className="font-display text-lg font-bold text-[#0D0E12]">Mantenimiento Preventivo</h3>
              <p className="text-sm text-neutral-600">
                Inspección mecánica y de sanitización antes de cada salida programada para cero imprevistos.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-2.5">
              <Users className="w-6 h-6 text-[#C8102E]" aria-hidden="true" />
              <h3 className="font-display text-lg font-bold text-[#0D0E12]">Conductores Certificados</h3>
              <p className="text-sm text-neutral-600">
                Licencia A-IIb / A-IIIc, récord limpio, capacitación en manejo defensivo y trato cordial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Elaborated Gallery Section integrated directly below About content */}
      <section id="galeria" aria-labelledby="galeria-nosotros-heading" className="py-16 lg:py-20 bg-white scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-wider text-[#C8102E]">
                Galería de Experiencias y Flota en Ruta
              </p>
              <h2
                id="galeria-nosotros-heading"
                className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#0D0E12]"
                style={{ textWrap: 'balance' }}
              >
                Experiencias pasadas y operación real en el Perú
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Registro visual de traslados ejecutivos, recepciones en el Aeropuerto Jorge Chávez, eventos
                corporativos y excursiones turísticas. Haz clic en cualquier fotografía para verla en detalle.
              </p>
            </div>

            <div
              className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F7F3F4] rounded-xl w-fit border border-[#6c1323]/15"
              role="group"
              aria-label="Filtrar galería"
            >
              {GALLERY_CATEGORIES.map((cat) => {
                const active = filter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilter(cat)}
                    aria-pressed={active}
                    className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#C8102E] text-white shadow-sm'
                        : 'text-neutral-700 hover:text-[#0D0E12] hover:bg-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item)}
                className="group text-left rounded-2xl border border-neutral-200 overflow-hidden bg-white hover:border-[#6c1323] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-neutral-100 shrink-0 w-full">
                  <SafeImage
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between w-full">
                  <div className="space-y-2">
                    <div className="text-xs text-neutral-500 flex items-center gap-2">
                      <span className="font-bold text-[#C8102E]">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.dateLabel}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#0D0E12] group-hover:text-[#6c1323] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-3 mt-2 border-t border-neutral-100 flex items-center gap-1.5 text-xs text-neutral-500">
                    <MapPin className="w-3.5 h-3.5 text-[#C8102E] shrink-0" aria-hidden="true" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Accessible Lightbox Modal */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#fab511]/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-black">
              <SafeImage src={selected.image} alt={selected.alt} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Cerrar vista ampliada"
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/75 text-white hover:bg-[#C8102E] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-2">
              <div className="text-xs font-bold text-[#C8102E]">
                {selected.category} · {selected.location}
              </div>
              <h3 className="font-display text-2xl font-bold text-[#0D0E12]">{selected.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{selected.description}</p>
            </div>
          </div>
        </div>
      )}

      <QuoteSection sourcePage="/nosotros" />
    </>
  );
}
