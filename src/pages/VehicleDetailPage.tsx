import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, ArrowLeft, ArrowRight, Users, Briefcase, ShieldCheck } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { SeoHead } from '../components/SeoHead';
import { SafeImage } from '../components/SafeImage';
import { QuoteSection } from '../components/QuoteSection';

export function VehicleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { cms } = useCms();

  const vehicle = cms.fleet.find((v) => v.slug === slug);
  const [activePhoto, setActivePhoto] = useState<string>(vehicle?.image || '');

  useEffect(() => {
    if (vehicle) {
      setActivePhoto(vehicle.image);
    }
  }, [vehicle]);

  if (!vehicle) {
    return (
      <div className="max-w-[900px] mx-auto px-4 py-20 text-center space-y-4">
        <SeoHead
          title="Vehículo no encontrado | Transporte JUVASA"
          description="Explora la flota disponible de Transporte JUVASA en Lima y Perú."
          noIndex
        />
        <h1 className="font-display text-3xl font-bold text-[#0D0E12]">Unidad no encontrada</h1>
        <p className="text-neutral-600">El vehículo solicitado no existe o fue actualizado en nuestro catálogo.</p>
        <Link
          to="/flota"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C8102E] text-white font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a toda la flota</span>
        </Link>
      </div>
    );
  }

  const photos = vehicle.gallery.length > 0 ? vehicle.gallery : [vehicle.image];
  const otherVehicles = cms.fleet.filter((v) => v.slug !== vehicle.slug).slice(0, 3);

  const productSchema = {
    '@type': 'Product',
    name: vehicle.name,
    category: vehicle.categoryLabel,
    description: vehicle.description,
    image: vehicle.image,
    brand: {
      '@type': 'Brand',
      name: 'Transporte JUVASA',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'PEN',
      url: typeof window !== 'undefined' ? window.location.href : '',
    },
  };

  return (
    <>
      <SeoHead
        title={vehicle.seoTitle}
        description={vehicle.seoDescription}
        keywords={vehicle.seoKeywords}
        image={vehicle.image}
        type="product"
        breadcrumbs={[
          { name: 'Inicio', path: '/' },
          { name: 'Flota', path: '/flota' },
          { name: vehicle.name, path: `/flota/${vehicle.slug}` },
        ]}
        structuredData={[productSchema]}
      />

      {/* Vehicle Hero Header */}
      <section className="bg-white border-b border-neutral-200 py-10 lg:py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <nav aria-label="Ruta de navegación" className="text-xs text-neutral-500 flex flex-wrap items-center gap-2 mb-6">
            <Link to="/" className="hover:text-[#0D0E12]">
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/flota" className="hover:text-[#0D0E12]">
              Flota
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#C8102E] font-semibold">{vehicle.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Gallery Showcase */}
            <div className="lg:col-span-7 space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100">
                <SafeImage
                  src={activePhoto || vehicle.image}
                  alt={vehicle.name}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>

              {photos.length > 1 && (
                <div className="flex flex-wrap gap-3">
                  {photos.map((photo, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActivePhoto(photo)}
                      className={`w-24 aspect-[4/3] rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                        activePhoto === photo ? 'border-[#C8102E]' : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <SafeImage src={photo} alt={`${vehicle.name} vista ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Key Specs & CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#C8102E] flex items-center gap-2">
                  <span>{vehicle.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular text-neutral-600">Modelos {vehicle.yearRange}</span>
                </p>
                <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0D0E12]">
                  {vehicle.name}
                </h1>
                <p className="text-base text-neutral-600 leading-relaxed">{vehicle.description}</p>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#F8F8F9] border border-neutral-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <Users className="w-3.5 h-3.5 text-[#C8102E]" aria-hidden="true" />
                    <span>Capacidad</span>
                  </div>
                  <div className="font-display font-bold text-lg text-[#0D0E12] font-mono-tabular">
                    {vehicle.passengersMin} – {vehicle.passengersMax} pax
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <Briefcase className="w-3.5 h-3.5 text-[#C8102E]" aria-hidden="true" />
                    <span>Equipaje</span>
                  </div>
                  <div className="font-display font-bold text-sm text-[#0D0E12]">{vehicle.luggageCapacity}</div>
                </div>
              </div>

              {/* Technical Specs Table */}
              <div className="border border-neutral-200 rounded-xl overflow-hidden">
                <div className="bg-neutral-50 px-4 py-2.5 border-b border-neutral-200 text-xs font-semibold text-[#0D0E12]">
                  Especificaciones Técnicas
                </div>
                <dl className="divide-y divide-neutral-200 text-sm">
                  {vehicle.specs.map((sp, i) => (
                    <div key={i} className="px-4 py-2.5 flex items-center justify-between gap-4">
                      <dt className="text-neutral-600">{sp.label}</dt>
                      <dd className="font-semibold text-[#0D0E12] font-mono-tabular text-right">{sp.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#cotizar"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#C8102E] text-white font-semibold text-sm hover:bg-[#9B0B23] transition-colors whitespace-nowrap"
                >
                  <span>Cotizar esta unidad</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <Link
                  to="/flota"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg border border-neutral-300 text-sm font-semibold text-[#0D0E12] hover:bg-neutral-50"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Ver flota</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment & Ideal Use Cases */}
      <section className="py-12 lg:py-16 bg-[#F8F8F9] border-b border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 space-y-4">
            <h2 className="font-display text-xl font-bold text-[#0D0E12]">Equipamiento y Seguridad a Bordo</h2>
            <ul className="space-y-3 text-sm text-neutral-700">
              {vehicle.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#C8102E] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 space-y-4">
            <h2 className="font-display text-xl font-bold text-[#0D0E12]">Recomendada para</h2>
            <ul className="space-y-3 text-sm text-neutral-700">
              {vehicle.idealFor.map((useCase, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#F59E0B] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-neutral-100 text-xs text-neutral-500">
              Referencia tarifaria: <strong className="text-[#0D0E12]">{vehicle.priceHint}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Related Vehicles */}
      <section className="py-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-[#0D0E12] mb-6">Otras unidades de nuestra flota</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherVehicles.map((v) => (
              <Link
                key={v.id}
                to={`/flota/${v.slug}`}
                className="group rounded-xl border border-neutral-200 overflow-hidden hover:border-[#C8102E] transition-colors"
              >
                <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
                  <SafeImage src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform" />
                </div>
                <div className="p-4">
                  <div className="text-xs text-[#C8102E] font-semibold">
                    {v.passengersMin}–{v.passengersMax} pasajeros
                  </div>
                  <div className="font-display font-bold text-lg text-[#0D0E12] mt-0.5">{v.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <QuoteSection
        defaultVehicle={vehicle.slug}
        sourcePage={`/flota/${vehicle.slug}`}
        heading={`Cotiza ahora la unidad ${vehicle.name}`}
      />
    </>
  );
}
