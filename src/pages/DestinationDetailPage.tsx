import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, MapPin, Clock } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { SeoHead } from '../components/SeoHead';
import { SafeImage } from '../components/SafeImage';
import { QuoteSection } from '../components/QuoteSection';

export function DestinationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { cms } = useCms();

  const destination = cms.destinations.find((d) => d.slug === slug);

  if (!destination) {
    return (
      <div className="max-w-[900px] mx-auto px-4 py-20 text-center space-y-4">
        <SeoHead title="Destino no encontrado | Transporte JUVASA" description="Rutas privadas en Perú." noIndex />
        <h1 className="font-display text-3xl font-bold text-[#0D0E12]">Destino no encontrado</h1>
        <Link
          to="/destinos"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C8102E] text-white font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a destinos</span>
        </Link>
      </div>
    );
  }

  const recommendedVehicle = cms.fleet.find((v) => v.slug === destination.recommendedVehicleSlug);

  const destinationSchema = {
    '@type': 'TouristDestination',
    name: destination.name,
    description: destination.fullDesc,
    image: destination.image,
    touristType: ['Private Travelers', 'Families', 'Corporate Groups'],
  };

  return (
    <>
      <SeoHead
        title={destination.seoTitle}
        description={destination.seoDescription}
        keywords={destination.seoKeywords}
        image={destination.image}
        breadcrumbs={[
          { name: 'Inicio', path: '/' },
          { name: 'Destinos', path: '/destinos' },
          { name: destination.name, path: `/destinos/${destination.slug}` },
        ]}
        structuredData={[destinationSchema]}
      />

      <section className="bg-white border-b border-neutral-200 py-10 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <nav aria-label="Ruta de navegación" className="text-xs text-neutral-500 flex flex-wrap items-center gap-2 mb-6">
            <Link to="/" className="hover:text-[#0D0E12]">
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/destinos" className="hover:text-[#0D0E12]">
              Destinos
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#C8102E] font-semibold">{destination.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="text-xs font-semibold text-[#C8102E] flex flex-wrap items-center gap-2">
                <span>{destination.region}</span>
                <span aria-hidden="true">·</span>
                <span className="text-neutral-600">{destination.duration}</span>
              </div>
              <h1
                className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#0D0E12]"
                style={{ textWrap: 'balance' }}
              >
                {destination.name}
              </h1>
              <p className="text-base text-neutral-600 leading-relaxed">{destination.fullDesc}</p>

              <div className="flex flex-wrap gap-6 text-xs text-neutral-700 pt-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C8102E]" aria-hidden="true" />
                  <span>{destination.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C8102E]" aria-hidden="true" />
                  <span>{destination.distanceFromLima}</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <a
                  href="#cotizar"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#C8102E] text-white font-semibold text-sm hover:bg-[#9B0B23] transition-colors"
                >
                  <span>Cotizar traslado a este destino</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <Link
                  to="/destinos"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-neutral-300 text-sm font-semibold text-[#0D0E12] hover:bg-neutral-50"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Ver otros destinos</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100">
                <SafeImage src={destination.image} alt={destination.name} priority className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-[#F8F8F9] border-b border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 space-y-4">
            <h2 className="font-display text-xl font-bold text-[#0D0E12]">Puntos destacados de la ruta</h2>
            <ul className="space-y-3 text-sm text-neutral-700">
              {destination.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#C8102E] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 space-y-4">
            <h2 className="font-display text-xl font-bold text-[#0D0E12]">Itinerario sugerido</h2>
            <ol className="space-y-3 text-sm text-neutral-700">
              {destination.itinerarySummary.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-mono-tabular font-bold text-[#C8102E] shrink-0">0{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {recommendedVehicle && (
        <section className="py-12 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold text-[#0D0E12] mb-6">Unidad sugerida para esta ruta</h2>
            <Link
              to={`/flota/${recommendedVehicle.slug}`}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 rounded-2xl border border-neutral-200 overflow-hidden hover:border-[#C8102E] transition-colors items-center"
            >
              <div className="md:col-span-4 aspect-[4/3] bg-neutral-100">
                <SafeImage src={recommendedVehicle.image} alt={recommendedVehicle.name} className="w-full h-full object-cover" />
              </div>
              <div className="md:col-span-8 p-6 space-y-2">
                <div className="text-xs font-semibold text-[#C8102E]">
                  {recommendedVehicle.categoryLabel} · {recommendedVehicle.passengersMin}–{recommendedVehicle.passengersMax} pasajeros
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0D0E12]">{recommendedVehicle.name}</h3>
                <p className="text-sm text-neutral-600">{recommendedVehicle.tagline}</p>
                <div className="pt-2 text-xs font-semibold text-[#C8102E] inline-flex items-center gap-1">
                  <span>Ver especificaciones completas</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <QuoteSection
        defaultService="Viajes Privados Interprovinciales"
        defaultVehicle={destination.recommendedVehicleSlug}
        sourcePage={`/destinos/${destination.slug}`}
        heading={`Cotiza tu viaje privado a ${destination.name}`}
      />
    </>
  );
}
