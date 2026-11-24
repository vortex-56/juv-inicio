import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export function Footer() {
  const { cms } = useCms();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#5c0d12] text-red-100 border-t border-[#fab511]/25">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Summary */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center">
              <img
                src={cms.contact.logoUrl || 'https://transportejuvasa.com.pe/media-juvasa/img/logo01.webp'}
                alt={cms.contact.brandName}
                width={168}
                height={48}
                referrerPolicy="no-referrer"
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-red-100/85 leading-relaxed">
              {cms.contact.legalName} — RUC {cms.contact.ruc}. Soluciones de transporte privado, turístico y ejecutivo
              en Lima y todo el Perú con control GPS 24/7 y atención en 6 idiomas.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#fab511] font-semibold pt-1">
              <a
                href={cms.contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Facebook
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={cms.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={cms.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={cms.contact.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Navigation Mirror */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#fab511]">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[#fab511] transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="hover:text-[#fab511] transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/flota" className="hover:text-[#fab511] transition-colors">
                  Flota de Vehículos
                </Link>
              </li>
              <li>
                <Link to="/destinos" className="hover:text-[#fab511] transition-colors">
                  Destinos &amp; Rutas
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="hover:text-[#fab511] transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/nosotros#galeria" className="hover:text-[#fab511] transition-colors">
                  Galería de Experiencias
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-[#fab511] transition-colors">
                  Contacto y Mapa
                </Link>
              </li>
            </ul>
          </div>

          {/* Fleet Subpages */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#fab511]">Unidades Disponibles</h3>
            <ul className="space-y-2 text-sm">
              {cms.fleet.map((vehicle) => (
                <li key={vehicle.id}>
                  <Link to={`/flota/${vehicle.slug}`} className="hover:text-[#fab511] transition-colors">
                    {vehicle.name} ({vehicle.passengersMin}–{vehicle.passengersMax} pax)
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#fab511]">Central de Reservas</h3>
            <ul className="space-y-2.5 text-sm text-red-100/90">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#fab511] mt-0.5 shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${cms.contact.phoneDisplay.replace(/\s+/g, '')}`}
                  className="text-white font-bold hover:text-[#fab511] transition-colors"
                >
                  {cms.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#fab511] mt-0.5 shrink-0" aria-hidden="true" />
                <a href={`mailto:${cms.contact.email}`} className="hover:text-white transition-colors break-all">
                  {cms.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#fab511] mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  {cms.contact.address}, {cms.contact.city}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#fab511] mt-0.5 shrink-0" aria-hidden="true" />
                <span>{cms.contact.schedule}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & SEO Discovery Bar */}
        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-red-100/75">
          <p>
            © {currentYear} {cms.contact.legalName}. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-[#fab511]">
              Sitemap XML
            </a>
            <a href="/video-sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-[#fab511]">
              Video Sitemap
            </a>
            <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="hover:text-[#fab511]">
              LLMs.txt
            </a>
            <Link to="/cms" className="text-[#fab511] hover:text-white font-bold transition-colors">
              Gestión CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
