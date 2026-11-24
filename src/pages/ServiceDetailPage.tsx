import { useParams, Link } from 'react-router-dom';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { SeoHead } from '../components/SeoHead';
import { SafeImage } from '../components/SafeImage';
import { QuoteSection } from '../components/QuoteSection';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { cms } = useCms();

  const service = cms.services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="max-w-[900px] mx-auto px-4 py-20 text-center space-y-4">
        <SeoHead
          title="Servicio no encontrado | Transporte JUVASA"
          description="Explora nuestros servicios de transporte privado en Perú."
          noIndex
        />
        <h1 className="font-display text-3xl font-bold text-[#0D0E12]">Servicio no encontrado</h1>
        <Link
          to="/servicios"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C8102E] text-white font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ver todos los servicios</span>
        </Link>
      </div>
    );
  }

  const recommendedVehicles = cms.fleet.filter((v) =>
    service.recommendedVehicles.includes(v.slug)
  );

  const serviceSchema = {
    '@type': 'Service',
    name: service.title,
    description: service.fullDesc,
    provider: {
      '@type': 'LocalBusiness',
      name: cms.contact.brandName,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Peru',
    },
  };

  return (
    <>
      <SeoHead
        title={service.seoTitle}
        description={service.seoDescription}
        keywords={service.seoKeywords}
        image={service.image}
        breadcrumbs={[
          { name: 'Inicio', path: '/' },
          { name: 'Servicios', path: '/servicios' },
          { name: service.title, path: `/servicios/${service.slug}` },
        ]}
        structuredData={[serviceSchema]}
      />

      <section className="bg-white border-b border-neutral-200 py-10 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <nav aria-label="Ruta de navegación" className="text-xs text-neutral-500 flex flex-wrap items-center gap-2 mb-6">
            <Link to="/" className="hover:text-[#0D0E12]">
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/servicios" className="hover:text-[#0D0E12]">
              Servicios
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#C8102E] font-semibold">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="text-xs font-mono-tabular font-semibold text-[#C8102E]">
                {service.number}. Solución Transporte JUVASA
              </div>
              <h1
                className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#0D0E12]"
                style={{ textWrap: 'balance' }}
              >
                {service.title}
              </h1>
              <p className="text-base text-neutral-600 leading-relaxed">{service.fullDesc}</p>

              <ul className="space-y-2.5 pt-2">
                {service.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-800">
                    <Check className="w-4 h-4 text-[#C8102E] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 flex flex-wrap gap-3">
                <a
                  href="#cotizar"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#C8102E] text-white font-semibold text-sm hover:bg-[#9B0B23] transition-colors"
                >
                  <span>Cotizar este servicio</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <Link
                  to="/servicios"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-neutral-300 text-sm font-semibold text-[#0D0E12] hover:bg-neutral-50"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Otros servicios</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100">
                <SafeImage src={service.image} alt={service.title} priority className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-14 bg-[#F8F8F9] border-b border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-[#0D0E12] mb-8">¿Cómo coordinamos tu servicio?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.processSteps.map((st, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-2">
                <div className="text-xs font-mono-tabular font-bold text-[#C8102E]">{st.step}</div>
                <p className="text-sm text-neutral-700 leading-relaxed">{st.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Fleet */}
      {recommendedVehicles.length > 0 && (
        <section className="py-14 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold text-[#0D0E12] mb-6">
              Unidades recomendadas para {service.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedVehicles.map((v) => (
                <Link
                  key={v.id}
                  to={`/flota/${v.slug}`}
                  className="group rounded-2xl border border-neutral-200 overflow-hidden hover:border-[#C8102E] transition-colors"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
                    <SafeImage src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform" />
                  </div>
                  <div className="p-5 space-y-1">
                    <div className="text-xs font-semibold text-[#C8102E]">
                      {v.passengersMin}–{v.passengersMax} pasajeros
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#0D0E12]">{v.name}</h3>
                    <p className="text-xs text-neutral-600">{v.luggageCapacity}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <QuoteSection
        defaultService={service.title}
        sourcePage={`/servicios/${service.slug}`}
        heading={`Solicita presupuesto para ${service.title}`}
      />
    </>
  );
}
