import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ExternalLink, MessageCircle } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { SeoHead } from '../components/SeoHead';
import { QuoteSection } from '../components/QuoteSection';

export function ContactPage() {
  const { cms } = useCms();

  const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${cms.contact.lng - 0.015}%2C${
    cms.contact.lat - 0.012
  }%2C${cms.contact.lng + 0.015}%2C${cms.contact.lat + 0.012}&layer=mapnik&marker=${cms.contact.lat}%2C${
    cms.contact.lng
  }`;

  const googleMapsDirections = `https://www.google.com/maps/search/?api=1&query=${cms.contact.lat},${cms.contact.lng}`;

  return (
    <>
      <SeoHead
        title="Contacto, Mapa y Reservas 24/7 | Transporte JUVASA Lima"
        description="Contacta a Transporte JUVASA en Los Olivos, Lima. Central telefónica y WhatsApp +51 981 370 909, correo reservas@transportejuvasa.com.pe, mapa y redes sociales."
        keywords="contacto transporte juvasa, telefono juvasa whatsapp, direccion transporte juvasa los olivos lima, cotizar transporte lima"
        breadcrumbs={[
          { name: 'Inicio', path: '/' },
          { name: 'Contacto', path: '/contacto' },
        ]}
      />

      <section className="bg-[#6c1323] text-white py-14 lg:py-18 border-b-4 border-[#fab511]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <nav aria-label="Ruta de navegación" className="text-xs text-red-100/80 flex items-center gap-2">
            <Link to="/" className="hover:text-[#fab511]">
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#fab511] font-semibold">Contacto y Ubicación</span>
          </nav>
          <h1
            className="font-display text-3xl sm:text-5xl font-bold tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Central de atención y reservas 24 horas en Lima
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Comunícate de inmediato por teléfono, WhatsApp o correo corporativo. También puedes ubicarnos en nuestra
            sede administrativa en Los Olivos, Lima.
          </p>
        </div>
      </section>

      {/* Contact Channels + Map */}
      <section className="py-14 lg:py-18 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Direct Channels & Social */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl border border-neutral-200 bg-[#F8F8F9] space-y-5">
              <h2 className="font-display text-xl font-bold text-[#0D0E12]">Canales Directos</h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#C8102E] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-xs text-neutral-500">Teléfono / Central 24/7</div>
                    <a
                      href={`tel:${cms.contact.phoneDisplay.replace(/\s+/g, '')}`}
                      className="font-bold text-base text-[#0D0E12] hover:text-[#C8102E]"
                    >
                      {cms.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-[#C8102E] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-xs text-neutral-500">WhatsApp Reservas Internacionales</div>
                    <a
                      href={`https://wa.me/${cms.contact.whatsappNumber}?text=${encodeURIComponent(cms.contact.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#C8102E] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Enviar mensaje inmediato</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#C8102E] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-xs text-neutral-500">Correo Corporativo</div>
                    <a href={`mailto:${cms.contact.email}`} className="font-semibold text-[#0D0E12] hover:text-[#C8102E] break-all">
                      {cms.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C8102E] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-xs text-neutral-500">Oficina Operativa</div>
                    <div className="font-medium text-[#0D0E12]">
                      {cms.contact.address}, {cms.contact.city}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#C8102E] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-xs text-neutral-500">Horario de Atención</div>
                    <div className="font-medium text-[#0D0E12]">{cms.contact.schedule}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="p-6 rounded-2xl border border-neutral-200 bg-white space-y-4">
              <h2 className="font-display text-lg font-bold text-[#0D0E12]">Redes Sociales Oficiales</h2>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <a
                  href={cms.contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-lg border border-neutral-200 hover:border-[#C8102E] font-semibold text-[#0D0E12] flex items-center justify-between"
                >
                  <span>Facebook</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
                </a>
                <a
                  href={cms.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-lg border border-neutral-200 hover:border-[#C8102E] font-semibold text-[#0D0E12] flex items-center justify-between"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
                </a>
                <a
                  href={cms.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-lg border border-neutral-200 hover:border-[#C8102E] font-semibold text-[#0D0E12] flex items-center justify-between"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
                </a>
                <a
                  href={cms.contact.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-lg border border-neutral-200 hover:border-[#C8102E] font-semibold text-[#0D0E12] flex items-center justify-between"
                >
                  <span>TikTok</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Interactive Map */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-neutral-200 overflow-hidden bg-neutral-100">
            <div className="flex-1 min-h-[380px] relative">
              <iframe
                title={`Mapa de ubicación de ${cms.contact.brandName} en ${cms.contact.district}, Lima`}
                src={mapEmbedUrl}
                className="w-full h-full min-h-[380px] border-0"
                loading="lazy"
              />
            </div>
            <div className="bg-white p-4 sm:p-5 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs sm:text-sm text-neutral-700">
                <strong className="text-[#0D0E12]">{cms.contact.legalName}</strong> · {cms.contact.address},{' '}
                {cms.contact.city}
              </div>
              <a
                href={googleMapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0D0E12] text-white text-xs font-semibold hover:bg-[#C8102E] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Abrir en Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <QuoteSection
        sourcePage="/contacto"
        heading="Envíanos los detalles de tu viaje o contrato corporativo"
      />
    </>
  );
}
