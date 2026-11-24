import React, { useState, useEffect } from 'react';
import { CheckCircle2, Send, AlertCircle } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface QuoteSectionProps {
  defaultService?: string;
  defaultVehicle?: string;
  sourcePage: string;
  heading?: string;
  subheading?: string;
}

export function QuoteSection({
  defaultService = 'Traslados del y al Aeropuerto',
  defaultVehicle = '',
  sourcePage,
  heading = 'Reserva o solicita tu cotización en menos de 15 minutos',
  subheading = 'Indícanos tu ruta, fecha y cantidad de pasajeros. Te respondemos por WhatsApp o correo con tarifa cerrada y unidad asignada.',
}: QuoteSectionProps) {
  const { cms, submitLead } = useCms();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState(defaultService);
  const [vehicleSlug, setVehicleSlug] = useState(defaultVehicle);
  const [passengers, setPassengers] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [originDestination, setOriginDestination] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (defaultService) setServiceType(defaultService);
    if (defaultVehicle) setVehicleSlug(defaultVehicle);
  }, [defaultService, defaultVehicle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const res = await submitLead({
      name,
      phone,
      email,
      serviceType,
      vehicleSlug,
      passengers,
      travelDate,
      originDestination,
      message,
      sourcePage,
    });

    if (!res.ok) {
      setStatus('error');
      setErrorMsg(res.error || 'Verifica los datos ingresados.');
      return;
    }

    setStatus('success');
  };

  return (
    <section
      id="cotizar"
      aria-labelledby="cotizar-heading"
      className="bg-[#6c1323] text-white border-t-4 border-[#fab511] py-14 lg:py-20"
      data-agent-entity="quote-form"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Context & Trust Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs font-bold uppercase tracking-wider text-[#fab511]">
              Atención Comercial 24/7 · Respuesta Inmediata
            </p>
            <h2
              id="cotizar-heading"
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              {heading}
            </h2>
            <p className="text-sm sm:text-base text-red-100/90 leading-relaxed">{subheading}</p>

            <div className="space-y-4 pt-3 border-t border-white/15 text-sm text-red-100/90">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#fab511] mt-2 shrink-0" aria-hidden="true" />
                <p>
                  <strong className="text-white">Tarifa transparente:</strong> Sin cobros ocultos por tráfico o
                  demoras de vuelo en el Aeropuerto Jorge Chávez.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#fab511] mt-2 shrink-0" aria-hidden="true" />
                <p>
                  <strong className="text-white">Facturación y seguridad:</strong> Unidades homologadas por el MTC,
                  SOAT vigente y rastreo GPS 24/7.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#fab511] mt-2 shrink-0" aria-hidden="true" />
                <p>
                  <strong className="text-white">Central directa:</strong>{' '}
                  <a
                    href={`tel:${cms.contact.phoneDisplay.replace(/\s+/g, '')}`}
                    className="font-bold text-[#fab511] hover:underline"
                  >
                    {cms.contact.phoneDisplay}
                  </a>{' '}
                  · {cms.contact.email}
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Container */}
          <div className="lg:col-span-7 bg-white text-[#0D0E12] rounded-2xl border-2 border-[#fab511]/40 p-6 sm:p-8 shadow-2xl">
            {status === 'success' ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#0D0E12]">
                  Solicitud registrada correctamente
                </h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto">
                  Nuestro equipo comercial ya recibió tu requerimiento y se pondrá en contacto contigo en menos de 15
                  minutos con tu tarifa cerrada.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setName('');
                      setPhone('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#6c1323] text-white text-sm font-semibold hover:bg-[#C8102E] transition-colors cursor-pointer"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {status === 'error' && (
                  <div
                    role="alert"
                    className="flex items-center gap-2.5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-[#9B0B23]"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="quote-name" className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Nombre completo / Empresa *
                    </label>
                    <input
                      id="quote-name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. María Fernanda Quispe"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-[#0D0E12] focus:outline-none focus:border-[#6c1323]"
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-phone" className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      id="quote-phone"
                      name="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej. +51 981 370 909"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-[#0D0E12] focus:outline-none focus:border-[#6c1323]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="quote-email" className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Correo electrónico
                    </label>
                    <input
                      id="quote-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@empresa.com"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-[#0D0E12] focus:outline-none focus:border-[#6c1323]"
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-service" className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Tipo de servicio
                    </label>
                    <select
                      id="quote-service"
                      name="serviceType"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-[#0D0E12] focus:outline-none focus:border-[#6c1323]"
                    >
                      {cms.services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Cotización General">Otro servicio a medida</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="quote-vehicle" className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Unidad preferida
                    </label>
                    <select
                      id="quote-vehicle"
                      name="vehicleSlug"
                      value={vehicleSlug}
                      onChange={(e) => setVehicleSlug(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-[#0D0E12] focus:outline-none focus:border-[#6c1323]"
                    >
                      <option value="">Por definir / Asesoría</option>
                      {cms.fleet.map((v) => (
                        <option key={v.id} value={v.slug}>
                          {v.name} ({v.passengersMin}-{v.passengersMax} pax)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="quote-passengers" className="block text-xs font-bold text-neutral-700 mb-1.5">
                      N.º de pasajeros
                    </label>
                    <input
                      id="quote-passengers"
                      name="passengers"
                      type="text"
                      value={passengers}
                      onChange={(e) => setPassengers(e.target.value)}
                      placeholder="Ej. 12 personas"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-[#0D0E12] focus:outline-none focus:border-[#6c1323]"
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-date" className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Fecha estimada
                    </label>
                    <input
                      id="quote-date"
                      name="travelDate"
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-[#0D0E12] focus:outline-none focus:border-[#6c1323]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="quote-route" className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Origen y destino (o n.º de vuelo)
                  </label>
                  <input
                    id="quote-route"
                    name="originDestination"
                    type="text"
                    value={originDestination}
                    onChange={(e) => setOriginDestination(e.target.value)}
                    placeholder="Ej. Aeropuerto Jorge Chávez → Hotel Miraflores / Full Day Paracas"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-[#0D0E12] focus:outline-none focus:border-[#6c1323]"
                  />
                </div>

                <div>
                  <label htmlFor="quote-message" className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Detalles adicionales (maletas, horarios, idioma)
                  </label>
                  <textarea
                    id="quote-message"
                    name="message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Cuéntanos detalles de tu itinerario o requerimientos corporativos..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-[#0D0E12] focus:outline-none focus:border-[#6c1323]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    data-agent-action="submit-quote"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#C8102E] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#9B0B23] disabled:opacity-60 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{status === 'submitting' ? 'Enviando...' : 'Solicitar Reserva'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
