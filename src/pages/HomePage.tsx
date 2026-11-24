import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ShieldCheck, Clock, MapPin, Award } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { SeoHead } from '../components/SeoHead';
import { MultilingualVideoHero } from '../components/MultilingualVideoHero';
import { SafeImage } from '../components/SafeImage';
import { OperationsPreviewCarousel } from '../components/OperationsPreviewCarousel';
import { ReviewsCarouselSection } from '../components/ReviewsCarouselSection';
import { BrandsMarqueeSection } from '../components/BrandsMarqueeSection';
import { QuoteSection } from '../components/QuoteSection';

export function HomePage() {
  const { cms } = useCms();
  const [openFaqId, setOpenFaqId] = useState<string>('');

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://transportejuvasa.com.pe';

  const videoSchemas = cms.videos.map((v) => ({
    '@type': 'VideoObject',
    name: v.title,
    description: v.description,
    thumbnailUrl: v.posterUrl.startsWith('http') ? v.posterUrl : `${origin}${v.posterUrl}`,
    uploadDate: '2026-11-23T00:00:00-05:00',
    duration: v.durationIso,
    contentUrl: v.videoUrl,
    inLanguage: v.code,
  }));

  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: cms.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <SeoHead
        title={cms.seoGlobal.defaultTitle}
        description={cms.seoGlobal.defaultDescription}
        keywords={cms.seoGlobal.defaultKeywords}
        breadcrumbs={[{ name: 'Inicio', path: '/' }]}
        structuredData={[...videoSchemas, faqSchema]}
      />

      {/* 1. Hero Split with Background Carousel + Square Multilingual Video */}
      <MultilingualVideoHero />

      {/* 2. Servicios Especializados (Warm Neutral Band with Bold Red Accents) */}
      <section className="py-16 lg:py-20 bg-[#F7F3F4] border-b border-[#6c1323]/15" aria-labelledby="servicios-home-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-wider text-[#C8102E]">
                Soluciones Integrales de Movilidad
              </p>
              <h2
                id="servicios-home-heading"
                className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#0D0E12]"
                style={{ textWrap: 'balance' }}
              >
                Servicios diseñados para viajeros, agencias y empresas
              </h2>
            </div>
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#6c1323] text-white text-xs sm:text-sm font-bold hover:bg-[#C8102E] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Ver todos los servicios</span>
              <ArrowRight className="w-4 h-4 text-[#fab511]" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cms.services.map((service) => (
              <Link
                key={service.id}
                to={`/servicios/${service.slug}`}
                className="group h-full rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:border-[#6c1323] shadow-sm transition-all flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#19080B] shrink-0">
                  <SafeImage
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="text-xs font-mono-tabular font-bold text-[#C8102E]">
                      {service.number}. Servicio Especializado
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#0D0E12] group-hover:text-[#6c1323] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">{service.shortDesc}</p>
                  </div>
                  <div className="pt-5 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#6c1323]">
                    <span>Explorar detalles del servicio</span>
                    <ArrowRight className="w-4 h-4 text-[#C8102E] group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Flota de Vehículos (Rich Corporate Wine-Red Section) */}
      <section className="py-16 lg:py-20 bg-[#6c1323] text-white border-b-4 border-[#fab511]" aria-labelledby="flota-home-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-wider text-[#fab511]">
                Flota Propia y Homologada
              </p>
              <h2
                id="flota-home-heading"
                className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white"
                style={{ textWrap: 'balance' }}
              >
                Unidades modernas para cada tamaño de grupo
              </h2>
            </div>
            <Link
              to="/flota"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#fab511] text-[#6c1323] text-xs sm:text-sm font-extrabold hover:bg-[#e2a20b] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Comparar toda la flota</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cms.fleet.map((vehicle) => (
              <Link
                key={vehicle.id}
                to={`/flota/${vehicle.slug}`}
                className="group bg-[#530c19] rounded-2xl border border-[#fab511]/25 overflow-hidden hover:border-[#fab511] transition-colors flex flex-col shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#19080B]">
                  <SafeImage
                    src={vehicle.image}
                    alt={`${vehicle.name} — ${vehicle.categoryLabel}`}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs text-red-100/80 flex items-center gap-2 font-medium">
                      <span className="text-[#fab511] font-bold">{vehicle.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">
                        {vehicle.passengersMin}–{vehicle.passengersMax} pasajeros
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-[#fab511] transition-colors">
                      {vehicle.name}
                    </h3>
                    <p className="text-sm text-red-100/85 leading-relaxed">{vehicle.tagline}</p>
                  </div>

                  <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs">
                    <span className="text-red-100/75 truncate max-w-[65%]">{vehicle.luggageCapacity}</span>
                    <span className="font-bold text-[#fab511] inline-flex items-center gap-1 shrink-0">
                      <span>Ver ficha</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Destinos & Rutas Populares (Obsidian Black + Gold) */}
      <section className="py-16 lg:py-20 bg-[#0D0E12] text-white" aria-labelledby="destinos-home-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-wider text-[#fab511]">
                Cobertura Lima e Interprovincial
              </p>
              <h2
                id="destinos-home-heading"
                className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white"
                style={{ textWrap: 'balance' }}
              >
                Rutas turísticas y conexiones más solicitadas en Perú
              </h2>
            </div>
            <Link
              to="/destinos"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#fab511] hover:text-white whitespace-nowrap shrink-0 transition-colors"
            >
              <span>Ver guía de destinos</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cms.destinations.map((dest) => (
              <Link
                key={dest.id}
                to={`/destinos/${dest.slug}`}
                className="group h-full rounded-2xl border border-neutral-800 bg-[#171920] overflow-hidden hover:border-[#fab511] transition-colors flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden shrink-0">
                  <SafeImage
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs text-neutral-400 flex flex-wrap items-center gap-2">
                      <span className="text-[#fab511] font-bold">{dest.region}</span>
                      <span aria-hidden="true">·</span>
                      <span>{dest.duration}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-[#fab511] transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed line-clamp-3">{dest.shortDesc}</p>
                  </div>
                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs font-semibold text-neutral-300">
                    <span>{dest.distanceFromLima}</span>
                    <span className="text-[#fab511] inline-flex items-center gap-1 font-bold">
                      <span>Ver itinerario</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Por qué elegir Transporte JUVASA */}
      <section className="py-16 lg:py-20 bg-white border-b border-neutral-200" aria-labelledby="por-que-elegirnos">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#C8102E]">
                Estándar Operativo Certificado
              </p>
              <h2
                id="por-que-elegirnos"
                className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#0D0E12]"
                style={{ textWrap: 'balance' }}
              >
                ¿Por qué agencias y empresas confían en Transporte JUVASA?
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Cada traslado está respaldado por protocolos estrictos de mantenimiento preventivo, habilitación formal
                del MTC y soporte operativo continuo desde nuestra central en Lima.
              </p>
              <Link
                to="/nosotros"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#6c1323] text-white text-sm font-bold hover:bg-[#C8102E] transition-colors mt-2"
              >
                <span>Conocer nuestra historia</span>
                <ArrowRight className="w-4 h-4 text-[#fab511]" aria-hidden="true" />
              </Link>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-[#6c1323]/15 bg-[#F7F3F4] space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#6c1323] text-[#fab511] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#0D0E12]">Permisos MTC y Pólizas Vigentes</h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Unidades formalmente habilitadas para transporte turístico y de personal a nivel nacional, con SOAT y
                  seguro de responsabilidad civil.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-[#6c1323]/15 bg-[#F7F3F4] space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#6c1323] text-[#fab511] flex items-center justify-center">
                  <Clock className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#0D0E12]">Puntualidad &amp; Vuelos en Vivo</h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Monitoreamos aterrizajes en el Aeropuerto Jorge Chávez y arribamos 15 minutos antes de cada cita
                  programada.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-[#6c1323]/15 bg-[#F7F3F4] space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#6c1323] text-[#fab511] flex items-center justify-center">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#0D0E12]">Rastreo Satelital GPS 24/7</h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Control continuo de velocidad, ubicación y alertas en carretera para garantizar tranquilidad a familias y
                  clientes corporativos.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-[#6c1323]/15 bg-[#F7F3F4] space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#6c1323] text-[#fab511] flex items-center justify-center">
                  <Award className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#0D0E12]">Atención en 6 Idiomas</h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Soporte comercial internacional en Español, Inglés, Portugués, Chino, Francés y Alemán para viajeros y
                  operadores receptivos.
                </p>
              </div>
            </div>
          </div>

          {/* Simple Operations Carousel inviting visitors to the elaborated Gallery inside /nosotros */}
          <OperationsPreviewCarousel />
        </div>
      </section>

      {/* 6. Pasarela Constante de Marcas Aliadas (/nacional/ parity) */}
      <BrandsMarqueeSection />

      {/* 7. Carrusel de Comentarios Verificados Google Maps (/nacional/ parity) */}
      <ReviewsCarouselSection />

      {/* 8. Preguntas Frecuentes (FAQPage Schema Rich Snippets) */}
      <section className="py-16 lg:py-20 bg-[#F7F3F4]" aria-labelledby="faq-home-heading">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-10">
            <p className="text-xs font-bold uppercase tracking-wider text-[#C8102E]">Información Transparente</p>
            <h2
              id="faq-home-heading"
              className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#0D0E12]"
            >
              Preguntas frecuentes sobre reservas y flota
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-[#6c1323]/15 divide-y divide-neutral-200 px-6">
            {cms.faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left py-1 cursor-pointer group"
                  >
                    <span className="font-display text-base sm:text-lg font-bold text-[#0D0E12] group-hover:text-[#6c1323] transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#6c1323] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#C8102E]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2.5 text-sm sm:text-base text-neutral-600 leading-relaxed pr-8">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Pre-Footer Quote Form */}
      <QuoteSection sourcePage="/" />
    </>
  );
}
