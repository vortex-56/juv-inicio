import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { SeoHead } from '../components/SeoHead';
import { SafeImage } from '../components/SafeImage';
import { QuoteSection } from '../components/QuoteSection';

export function DestinationsPage() {
  const { cms } = useCms();

  return (
    <>
      <SeoHead
        title="Destinos y Rutas Turísticas Privadas en Perú | Transporte JUVASA"
        description="Rutas privadas desde Lima hacia Paracas, Islas Ballestas, Huacachina, Líneas de Nazca, Lunahuaná y conexiones con Cusco. Movilidad segura con chofer."
        keywords="destinos turisticos peru, transporte privado paracas huacachina, tour privado nazca desde lima, city tour lima movilidad"
        breadcrumbs={[
          { name: 'Inicio', path: '/' },
          { name: 'Destinos', path: '/destinos' },
        ]}
      />

      <section className="bg-[#6c1323] text-white py-14 lg:py-18 border-b-4 border-[#fab511]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <nav aria-label="Ruta de navegación" className="text-xs text-red-100/80 flex items-center gap-2">
            <Link to="/" className="hover:text-[#fab511]">
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#fab511] font-semibold">Destinos &amp; Rutas</span>
          </nav>
          <h1
            className="font-display text-3xl sm:text-5xl font-bold tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Destinos y circuitos turísticos privados desde Lima
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Viaja a tu ritmo sin horarios rígidos. Coordinamos salidas puerta a puerta desde hoteles en Lima o el
            Aeropuerto Jorge Chávez hacia los principales atractivos del Perú.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {cms.destinations.map((dest) => (
            <article
              key={dest.id}
              className="rounded-2xl border border-neutral-200 bg-white overflow-hidden flex flex-col justify-between hover:border-[#C8102E] transition-colors"
            >
              <div>
                <Link to={`/destinos/${dest.slug}`} className="block aspect-[4/3] overflow-hidden bg-neutral-100">
                  <SafeImage
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
                  />
                </Link>
                <div className="p-6 space-y-3">
                  <div className="text-xs font-semibold text-[#C8102E]">{dest.region}</div>
                  <h2 className="font-display text-xl font-bold text-[#0D0E12]">
                    <Link to={`/destinos/${dest.slug}`} className="hover:text-[#C8102E] transition-colors">
                      {dest.name}
                    </Link>
                  </h2>
                  <p className="text-sm text-neutral-600 leading-relaxed">{dest.shortDesc}</p>
                  <div className="pt-2 space-y-1.5 text-xs text-neutral-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#C8102E] shrink-0" aria-hidden="true" />
                      <span>{dest.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#C8102E] shrink-0" aria-hidden="true" />
                      <span>{dest.distanceFromLima}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <Link
                  to={`/destinos/${dest.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#0D0E12] text-white text-xs sm:text-sm font-semibold hover:bg-[#C8102E] transition-colors"
                >
                  <span>Explorar ruta e itinerario</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <QuoteSection defaultService="Transporte Turístico Privado & City Tours" sourcePage="/destinos" />
    </>
  );
}
