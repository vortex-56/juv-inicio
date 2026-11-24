import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { SeoHead } from '../components/SeoHead';
import { SafeImage } from '../components/SafeImage';
import { QuoteSection } from '../components/QuoteSection';

export function ServicesPage() {
  const { cms } = useCms();

  return (
    <>
      <SeoHead
        title="Servicios de Transporte Privado, Turístico y Corporativo | JUVASA"
        description="Traslados al Aeropuerto Jorge Chávez, transporte corporativo y de personal, turismo privado en Lima, Paracas e Ica, y logística para congresos y eventos."
        keywords="servicios transporte privado lima, traslado aeropuerto jorge chavez, transporte corporativo peru, turismo privado lima"
        breadcrumbs={[
          { name: 'Inicio', path: '/' },
          { name: 'Servicios', path: '/servicios' },
        ]}
      />

      <section className="bg-[#6c1323] text-white py-14 lg:py-18 border-b-4 border-[#fab511]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <nav aria-label="Ruta de navegación" className="text-xs text-red-100/80 flex items-center gap-2">
            <Link to="/" className="hover:text-[#fab511]">
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#fab511] font-semibold">Servicios</span>
          </nav>
          <h1
            className="font-display text-3xl sm:text-5xl font-bold tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Servicios especializados de movilidad terrestre en Perú
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Operamos soluciones a medida para pasajeros internacionales, agencias de viajes y departamentos
            corporativos con atención 24/7.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
          {cms.services.map((service, idx) => (
            <article
              key={service.id}
              className="grid grid-cols-1 lg:grid-cols-12 items-stretch rounded-2xl border border-neutral-200 overflow-hidden bg-white shadow-xs"
            >
              <div
                className={`lg:col-span-5 w-full aspect-[4/3] lg:aspect-auto lg:h-full min-h-[260px] min-w-0 overflow-hidden bg-neutral-100 ${
                  idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <SafeImage src={service.image} alt={service.title} className="w-full h-full object-cover" />
              </div>

              <div
                className={`lg:col-span-7 min-w-0 p-6 sm:p-8 lg:p-10 space-y-4 flex flex-col justify-center ${
                  idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="text-xs font-mono-tabular font-semibold text-[#C8102E]">
                  {service.number}. Servicio Certificado JUVASA
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D0E12]">{service.title}</h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">{service.fullDesc}</p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {service.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700">
                      <Check className="w-4 h-4 text-[#C8102E] mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <Link
                    to={`/servicios/${service.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C8102E] text-white text-sm font-semibold hover:bg-[#9B0B23] transition-colors"
                  >
                    <span>Ver detalle completo y proceso</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <QuoteSection sourcePage="/servicios" />
    </>
  );
}
