import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Globe,
  Truck,
  Layers,
  Image as ImageIcon,
  MessageSquare,
  Settings,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { SeoHead } from '../components/SeoHead';
import type { CmsContent, FleetVehicle, GalleryItem, FaqItem } from '../data/cmsDefaults';

type TabKey = 'hero' | 'fleet' | 'services' | 'gallery' | 'contact' | 'leads';

const TABS: { key: TabKey; label: string; icon: typeof Globe }[] = [
  { key: 'hero', label: 'Portada & Videos', icon: Globe },
  { key: 'fleet', label: 'Flota', icon: Truck },
  { key: 'services', label: 'Servicios & Destinos', icon: Layers },
  { key: 'gallery', label: 'Galería & FAQs', icon: ImageIcon },
  { key: 'contact', label: 'Contacto & SEO', icon: Settings },
  { key: 'leads', label: 'Cotizaciones', icon: MessageSquare },
];

export function CmsPage() {
  const { cms, isSaving, leads, saveCms, resetCms, fetchLeads } = useCms();
  const [draft, setDraft] = useState<CmsContent>(cms);
  const [activeTab, setActiveTab] = useState<TabKey>('hero');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    setDraft(cms);
  }, [cms]);

  useEffect(() => {
    if (activeTab === 'leads') {
      fetchLeads();
    }
  }, [activeTab, fetchLeads]);

  const handleSave = async () => {
    setFeedback(null);
    const ok = await saveCms(draft);
    if (ok) {
      setFeedback({
        type: 'success',
        text: 'Cambios publicados correctamente. El sitio web y los sitemaps ya reflejan esta actualización.',
      });
    } else {
      setFeedback({ type: 'error', text: 'No se pudo guardar en el servidor. Intenta nuevamente.' });
    }
  };

  const handleReset = async () => {
    setFeedback(null);
    const ok = await resetCms();
    if (ok) {
      setFeedback({ type: 'success', text: 'Contenido restaurado a los valores iniciales de Transporte JUVASA.' });
    }
  };

  const addNewVehicle = () => {
    const id = `veh_${Date.now()}`;
    const newVeh: FleetVehicle = {
      id,
      slug: `nueva-unidad-${draft.fleet.length + 1}`,
      name: 'Nueva Unidad Ejecutiva',
      category: 'van',
      categoryLabel: 'Van / Minibús',
      tagline: 'Descripción breve de confort y capacidad.',
      passengersMin: 6,
      passengersMax: 12,
      luggageCapacity: '10 maletas grandes',
      transmission: 'Automática',
      fuelType: 'Diésel Euro V',
      yearRange: '2025',
      image: '/src/assets/images/fleet_van_staria_1795480223718.jpg',
      gallery: ['/src/assets/images/fleet_van_staria_1795480223718.jpg'],
      description: 'Unidad moderna equipada con aire acondicionado, GPS 24/7 y cinturones de seguridad.',
      seoTitle: 'Alquiler de Unidad con Conductor en Lima | Transporte JUVASA',
      seoDescription: 'Servicio de transporte privado en Lima y todo el Perú con conductor profesional y GPS 24/7.',
      seoKeywords: 'alquiler movilidad lima, transporte privado peru',
      features: ['Aire acondicionado bi-zona', 'Rastreo satelital GPS 24/7'],
      idealFor: ['Aeropuerto Jorge Chávez', 'Turismo y corporativo'],
      specs: [
        { label: 'Capacidad', value: '6 – 12 pasajeros' },
        { label: 'Monitoreo', value: 'GPS 24/7' },
      ],
      priceHint: 'Cotización por ruta',
    };
    setDraft((prev) => ({ ...prev, fleet: [...prev.fleet, newVeh] }));
  };

  const addGalleryPhoto = () => {
    const item: GalleryItem = {
      id: `gal_${Date.now()}`,
      title: 'Nuevo servicio realizado',
      category: 'Turismo',
      location: 'Lima, Perú',
      dateLabel: 'Operación 2026',
      image: '/src/assets/images/fleet_sprinter_minibus_1795480224514.jpg',
      alt: 'Unidad de Transporte JUVASA en ruta turística en Perú',
      description: 'Servicio privado completado con puntualidad y confort.',
    };
    setDraft((prev) => ({ ...prev, gallery: [item, ...prev.gallery] }));
  };

  const addFaq = () => {
    const faq: FaqItem = {
      id: `faq_${Date.now()}`,
      category: 'Reservas',
      question: 'Nueva pregunta frecuente',
      answer: 'Respuesta clara para clientes y buscadores.',
    };
    setDraft((prev) => ({ ...prev, faqs: [...prev.faqs, faq] }));
  };

  return (
    <>
      <SeoHead
        title="Gestión de Contenidos (CMS) | Transporte JUVASA"
        description="Panel administrativo intuitivo para gestionar portada, videos multilingües, flota, servicios, destinos, galería y SEO de Transporte JUVASA."
        noIndex
      />

      <div className="bg-[#F8F8F9] min-h-screen py-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-6">
          {/* Top Action Header */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#C8102E]">Sistema de Gestión de Contenidos (CMS)</p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0D0E12] mt-1">
                Administra tu web, flota, videos y SEO en vivo
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-300 text-xs sm:text-sm font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restaurar</span>
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C8102E] text-white text-xs sm:text-sm font-semibold hover:bg-[#9B0B23] disabled:opacity-60 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Guardando...' : 'Publicar Cambios'}</span>
              </button>
            </div>
          </div>

          {feedback && (
            <div
              role="status"
              className={`p-4 rounded-xl border flex items-center gap-3 text-sm ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-red-50 border-red-200 text-[#9B0B23]'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              <span>{feedback.text}</span>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl border border-neutral-200">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActiveTab(t.key)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    active ? 'bg-[#0D0E12] text-white' : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Hero & Multilingual Videos */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
                <h2 className="font-display text-xl font-bold text-[#0D0E12]">Textos Principales de Portada</h2>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Título Principal (H1)</label>
                  <input
                    type="text"
                    value={draft.hero.title}
                    onChange={(e) =>
                      setDraft((p) => ({ ...p, hero: { ...p.hero, title: e.target.value } }))
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Subtítulo descriptivo</label>
                  <textarea
                    rows={3}
                    value={draft.hero.subtitle}
                    onChange={(e) =>
                      setDraft((p) => ({ ...p, hero: { ...p.hero, subtitle: e.target.value } }))
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Botón Primario (CTA)</label>
                    <input
                      type="text"
                      value={draft.hero.primaryCtaLabel}
                      onChange={(e) =>
                        setDraft((p) => ({ ...p, hero: { ...p.hero, primaryCtaLabel: e.target.value } }))
                      }
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Botón Secundario</label>
                    <input
                      type="text"
                      value={draft.hero.secondaryCtaLabel}
                      onChange={(e) =>
                        setDraft((p) => ({ ...p, hero: { ...p.hero, secondaryCtaLabel: e.target.value } }))
                      }
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-5">
                <h2 className="font-display text-xl font-bold text-[#0D0E12]">
                  Videos Multilingües de Portada (Indexados en Video Sitemap)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {draft.videos.map((vid, idx) => (
                    <div key={vid.code} className="p-4 rounded-xl border border-neutral-200 bg-[#F8F8F9] space-y-3">
                      <div className="font-bold text-sm text-[#C8102E]">
                        {vid.nativeName} ({vid.shortLabel})
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1">URL del Video (.mp4)</label>
                        <input
                          type="url"
                          value={vid.videoUrl}
                          onChange={(e) => {
                            const updated = [...draft.videos];
                            updated[idx] = { ...vid, videoUrl: e.target.value };
                            setDraft((p) => ({ ...p, videos: updated }));
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1">Título SEO del Video</label>
                        <input
                          type="text"
                          value={vid.title}
                          onChange={(e) => {
                            const updated = [...draft.videos];
                            updated[idx] = { ...vid, title: e.target.value };
                            setDraft((p) => ({ ...p, videos: updated }));
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Fleet Management */}
          {activeTab === 'fleet' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-[#0D0E12]">
                  Unidades de Flota ({draft.fleet.length})
                </h2>
                <button
                  type="button"
                  onClick={addNewVehicle}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0D0E12] text-white text-xs font-semibold hover:bg-[#C8102E] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Vehículo</span>
                </button>
              </div>

              {draft.fleet.map((veh, idx) => (
                <div key={veh.id} className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-lg text-[#0D0E12]">{veh.name}</span>
                      <Link
                        to={`/flota/${veh.slug}`}
                        className="text-xs font-semibold text-[#C8102E] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Ver subpágina</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setDraft((p) => ({ ...p, fleet: p.fleet.filter((_, i) => i !== idx) }))
                      }
                      aria-label={`Eliminar ${veh.name}`}
                      className="p-2 text-neutral-500 hover:text-[#C8102E] cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Nombre</label>
                      <input
                        type="text"
                        value={veh.name}
                        onChange={(e) => {
                          const next = [...draft.fleet];
                          next[idx] = { ...veh, name: e.target.value };
                          setDraft((p) => ({ ...p, fleet: next }));
                        }}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Slug URL (/flota/...)</label>
                      <input
                        type="text"
                        value={veh.slug}
                        onChange={(e) => {
                          const next = [...draft.fleet];
                          next[idx] = { ...veh, slug: e.target.value };
                          setDraft((p) => ({ ...p, fleet: next }));
                        }}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 font-mono-tabular"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Capacidad Máxima (pax)</label>
                      <input
                        type="number"
                        value={veh.passengersMax}
                        onChange={(e) => {
                          const next = [...draft.fleet];
                          next[idx] = { ...veh, passengersMax: Number(e.target.value) || 1 };
                          setDraft((p) => ({ ...p, fleet: next }));
                        }}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Título SEO (Meta Title)</label>
                      <input
                        type="text"
                        value={veh.seoTitle}
                        onChange={(e) => {
                          const next = [...draft.fleet];
                          next[idx] = { ...veh, seoTitle: e.target.value };
                          setDraft((p) => ({ ...p, fleet: next }));
                        }}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Imagen principal (URL)</label>
                      <input
                        type="text"
                        value={veh.image}
                        onChange={(e) => {
                          const next = [...draft.fleet];
                          next[idx] = { ...veh, image: e.target.value };
                          setDraft((p) => ({ ...p, fleet: next }));
                        }}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Descripción completa</label>
                    <textarea
                      rows={2}
                      value={veh.description}
                      onChange={(e) => {
                        const next = [...draft.fleet];
                        next[idx] = { ...veh, description: e.target.value };
                        setDraft((p) => ({ ...p, fleet: next }));
                      }}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Services & Destinations */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
                <h2 className="font-display text-xl font-bold text-[#0D0E12]">Servicios ({draft.services.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {draft.services.map((srv, idx) => (
                    <div key={srv.id} className="p-4 rounded-xl border border-neutral-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#C8102E]">{srv.number}. Servicio</span>
                        <Link to={`/servicios/${srv.slug}`} className="text-xs text-neutral-600 hover:underline">
                          Abrir subpágina
                        </Link>
                      </div>
                      <input
                        type="text"
                        value={srv.title}
                        onChange={(e) => {
                          const next = [...draft.services];
                          next[idx] = { ...srv, title: e.target.value };
                          setDraft((p) => ({ ...p, services: next }));
                        }}
                        className="w-full px-3 py-2 text-sm font-semibold rounded-lg border border-neutral-300"
                      />
                      <textarea
                        rows={2}
                        value={srv.shortDesc}
                        onChange={(e) => {
                          const next = [...draft.services];
                          next[idx] = { ...srv, shortDesc: e.target.value };
                          setDraft((p) => ({ ...p, services: next }));
                        }}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
                <h2 className="font-display text-xl font-bold text-[#0D0E12]">
                  Destinos Orgánicos ({draft.destinations.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {draft.destinations.map((dest, idx) => (
                    <div key={dest.id} className="p-4 rounded-xl border border-neutral-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#C8102E]">{dest.region}</span>
                        <Link to={`/destinos/${dest.slug}`} className="text-xs text-neutral-600 hover:underline">
                          Abrir subpágina
                        </Link>
                      </div>
                      <input
                        type="text"
                        value={dest.name}
                        onChange={(e) => {
                          const next = [...draft.destinations];
                          next[idx] = { ...dest, name: e.target.value };
                          setDraft((p) => ({ ...p, destinations: next }));
                        }}
                        className="w-full px-3 py-2 text-sm font-semibold rounded-lg border border-neutral-300"
                      />
                      <textarea
                        rows={2}
                        value={dest.shortDesc}
                        onChange={(e) => {
                          const next = [...draft.destinations];
                          next[idx] = { ...dest, shortDesc: e.target.value };
                          setDraft((p) => ({ ...p, destinations: next }));
                        }}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Gallery & FAQs */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold text-[#0D0E12]">
                    Galería Fotográfica ({draft.gallery.length})
                  </h2>
                  <button
                    type="button"
                    onClick={addGalleryPhoto}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0D0E12] text-white text-xs font-semibold hover:bg-[#C8102E] cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar Foto</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {draft.gallery.map((item, idx) => (
                    <div key={item.id} className="p-4 rounded-xl border border-neutral-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#C8102E]">{item.category}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setDraft((p) => ({ ...p, gallery: p.gallery.filter((_, i) => i !== idx) }))
                          }
                          className="text-neutral-400 hover:text-[#C8102E] cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const next = [...draft.gallery];
                          next[idx] = { ...item, title: e.target.value };
                          setDraft((p) => ({ ...p, gallery: next }));
                        }}
                        className="w-full px-3 py-1.5 text-sm font-semibold rounded-lg border border-neutral-300"
                      />
                      <input
                        type="text"
                        value={item.image}
                        onChange={(e) => {
                          const next = [...draft.gallery];
                          next[idx] = { ...item, image: e.target.value };
                          setDraft((p) => ({ ...p, gallery: next }));
                        }}
                        placeholder="URL de la foto"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold text-[#0D0E12]">
                    Preguntas Frecuentes / Schema FAQPage ({draft.faqs.length})
                  </h2>
                  <button
                    type="button"
                    onClick={addFaq}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0D0E12] text-white text-xs font-semibold hover:bg-[#C8102E] cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar Pregunta</span>
                  </button>
                </div>

                {draft.faqs.map((faq, idx) => (
                  <div key={faq.id} className="p-4 rounded-xl border border-neutral-200 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => {
                          const next = [...draft.faqs];
                          next[idx] = { ...faq, question: e.target.value };
                          setDraft((p) => ({ ...p, faqs: next }));
                        }}
                        className="flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg border border-neutral-300"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setDraft((p) => ({ ...p, faqs: p.faqs.filter((_, i) => i !== idx) }))
                        }
                        className="text-neutral-400 hover:text-[#C8102E] cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => {
                        const next = [...draft.faqs];
                        next[idx] = { ...faq, answer: e.target.value };
                        setDraft((p) => ({ ...p, faqs: next }));
                      }}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Contact & Technical SEO Endpoints */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
                <h2 className="font-display text-xl font-bold text-[#0D0E12]">Datos de Contacto y Redes Sociales</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Teléfono visible</label>
                    <input
                      type="text"
                      value={draft.contact.phoneDisplay}
                      onChange={(e) =>
                        setDraft((p) => ({ ...p, contact: { ...p.contact, phoneDisplay: e.target.value } }))
                      }
                      className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">WhatsApp (solo dígitos, ej. 51981370909)</label>
                    <input
                      type="text"
                      value={draft.contact.whatsappNumber}
                      onChange={(e) =>
                        setDraft((p) => ({ ...p, contact: { ...p.contact, whatsappNumber: e.target.value } }))
                      }
                      className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Correo electrónico</label>
                    <input
                      type="email"
                      value={draft.contact.email}
                      onChange={(e) =>
                        setDraft((p) => ({ ...p, contact: { ...p.contact, email: e.target.value } }))
                      }
                      className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Dirección</label>
                    <input
                      type="text"
                      value={draft.contact.address}
                      onChange={(e) =>
                        setDraft((p) => ({ ...p, contact: { ...p.contact, address: e.target.value } }))
                      }
                      className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
                <h2 className="font-display text-xl font-bold text-[#0D0E12]">SEO Global &amp; Endpoints de Indexación / Agentes</h2>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Meta Title Global</label>
                  <input
                    type="text"
                    value={draft.seoGlobal.defaultTitle}
                    onChange={(e) =>
                      setDraft((p) => ({ ...p, seoGlobal: { ...p.seoGlobal, defaultTitle: e.target.value } }))
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Meta Description Global</label>
                  <textarea
                    rows={2}
                    value={draft.seoGlobal.defaultDescription}
                    onChange={(e) =>
                      setDraft((p) => ({ ...p, seoGlobal: { ...p.seoGlobal, defaultDescription: e.target.value } }))
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300"
                  />
                </div>

                <div className="pt-4 border-t border-neutral-200">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-3">
                    Endpoints Activos para Google y Navegación con Agentes (ARD 4/4)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {[
                      { label: 'Sitemap XML + Video', href: '/sitemap.xml' },
                      { label: 'Video Sitemap (6 idiomas)', href: '/video-sitemap.xml' },
                      { label: 'Robots.txt', href: '/robots.txt' },
                      { label: 'LLMs.txt (AI Search)', href: '/llms.txt' },
                      { label: 'AI Catalog (ARD JSON)', href: '/.well-known/ai-catalog.json' },
                      { label: 'ARD Manifest', href: '/.well-known/ard.json' },
                    ].map((ep) => (
                      <a
                        key={ep.href}
                        href={ep.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg border border-neutral-200 hover:border-[#C8102E] flex items-center justify-between font-medium text-[#0D0E12]"
                      >
                        <span>{ep.label}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#C8102E]" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: Leads Inbox */}
          {activeTab === 'leads' && (
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-[#0D0E12]">
                  Solicitudes de Cotización Recibidas ({leads.length})
                </h2>
                <button
                  type="button"
                  onClick={() => fetchLeads()}
                  className="text-xs font-semibold text-[#C8102E] hover:underline cursor-pointer"
                >
                  Actualizar lista
                </button>
              </div>

              {leads.length === 0 ? (
                <p className="text-sm text-neutral-500 py-8 text-center">
                  Aún no hay cotizaciones registradas en esta sesión. Prueba enviando el formulario de cualquiera de las
                  páginas.
                </p>
              ) : (
                <div className="divide-y divide-neutral-200">
                  {leads.map((lead) => (
                    <div key={lead.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500 font-mono-tabular">
                          {new Date(lead.createdAt).toLocaleString('es-PE')} · Origen: {lead.sourcePage}
                        </div>
                        <div className="font-bold text-[#0D0E12]">
                          {lead.name} — <span className="text-[#C8102E]">{lead.serviceType}</span>
                        </div>
                        <div className="text-xs text-neutral-600">
                          Tel: {lead.phone} {lead.email ? `· ${lead.email}` : ''}{' '}
                          {lead.passengers ? `· ${lead.passengers}` : ''}{' '}
                          {lead.originDestination ? `· Ruta: ${lead.originDestination}` : ''}
                        </div>
                        {lead.message && <p className="text-xs text-neutral-700 pt-1">{lead.message}</p>}
                      </div>

                      <a
                        href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0D0E12] text-white text-xs font-semibold hover:bg-[#C8102E] whitespace-nowrap shrink-0"
                      >
                        <span>Responder WhatsApp</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
