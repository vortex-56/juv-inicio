import { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  X,
  Globe,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import type { MultilingualVideo } from '../data/cmsDefaults';
import { FlagIcon } from './FlagIcon';

export function MultilingualVideoHero() {
  const { cms } = useCms();
  const [selectedLang, setSelectedLang] = useState<MultilingualVideo['code']>('es');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [hasUnmutedOnce, setHasUnmutedOnce] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  const slides =
    cms.hero.carouselSlides && cms.hero.carouselSlides.length > 0 ? cms.hero.carouselSlides : [];
  const activeVideo = cms.videos.find((v) => v.code === selectedLang) || cms.videos[0];

  // Auto-rotate background image carousel ONLY when video is paused/stopped
  useEffect(() => {
    if (slides.length <= 1 || isPlaying) return;
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [slides.length, isPlaying]);

  // Lock page scroll and hide Header + WhatsApp widget while video is maximized
  useEffect(() => {
    if (isExpanded) {
      document.body.classList.add('video-expanded-open');
    } else {
      document.body.classList.remove('video-expanded-open');
    }
    return () => {
      document.body.classList.remove('video-expanded-open');
    };
  }, [isExpanded]);

  // Pause video automatically when scrolling below the hero section (unless maximized)
  useEffect(() => {
    const target = heroSectionRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !isExpanded && videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [isExpanded]);

  // Keyboard support when square video is maximized (Escape closes, Space toggles Play/Pause)
  useEffect(() => {
    if (!isExpanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExpanded(false);
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isExpanded, isPlaying]);

  // Changing language stops/resets playback so red button icon reverts cleanly to Play triangle
  useEffect(() => {
    setVideoError(false);
    setIsPlaying(false);
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.load();
  }, [activeVideo?.videoUrl]);

  const handleSelectLanguage = (code: MultilingualVideo['code']) => {
    if (code === selectedLang) {
      // Even if same button pressed, ensure paused state resets if intended, or just keep clean
      const el = videoRef.current;
      if (el && !el.paused) {
        el.pause();
        setIsPlaying(false);
      }
      return;
    }
    const el = videoRef.current;
    if (el) {
      el.pause();
    }
    setIsPlaying(false);
    setSelectedLang(code);
  };

  const playVideoWithAudioFallback = () => {
    const el = videoRef.current;
    if (!el) return;
    if (!hasUnmutedOnce) {
      el.muted = false;
      setIsMuted(false);
      setHasUnmutedOnce(true);
    } else {
      el.muted = isMuted;
    }
    el.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        el.muted = true;
        setIsMuted(true);
        el.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      });
  };

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (!el.paused) {
      el.pause();
      setIsPlaying(false);
    } else {
      playVideoWithAudioFallback();
    }
  };

  // Red pulsing button toggles Pause/Play directly and scrolls smoothly to video on small screens when starting
  const handleHeroRedButton = () => {
    const el = videoRef.current;
    if (el && !el.paused) {
      el.pause();
      setIsPlaying(false);
      return;
    }
    playVideoWithAudioFallback();
    if (window.innerWidth < 1024 && videoContainerRef.current) {
      videoContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
    setHasUnmutedOnce(true);
  };

  const handleToggleExpand = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsExpanded((prev) => {
      const next = !prev;
      if (next && videoRef.current && videoRef.current.paused) {
        playVideoWithAudioFallback();
      }
      return next;
    });
  };

  const scrollToReserve = () => {
    const el = document.getElementById('cotizar');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      ref={heroSectionRef}
      className={`relative bg-black text-white border-b-4 border-[#fab511] ${
        isExpanded ? 'z-[100] overflow-visible' : 'overflow-hidden'
      }`}
    >
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {slides.map((slide, idx) => (
          <div
            key={slide.url}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === slideIndex ? 'opacity-100 z-[1]' : 'opacity-0 pointer-events-none z-0'
            }`}
          >
            <img
              src={slide.url}
              alt={slide.alt}
              referrerPolicy="no-referrer"
              loading={idx === 0 ? 'eager' : 'lazy'}
              fetchPriority={idx === 0 ? 'high' : 'auto'}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
        {/* Pure Black Gradient Scrim for WCAG AA Contrast */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/90 via-black/75 to-black/55" />
      </div>

      {/* Main Content */}
      <div
        className={`relative max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 pb-10 lg:pt-14 lg:pb-14 ${
          isExpanded ? 'z-[100]' : 'z-10'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Title, Subtitle, Play/Pause Red Button & Yellow "Reservar" */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs sm:text-sm font-semibold text-white/90 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[#fab511] font-bold">Transporte JUVASA</span>
              <span aria-hidden="true">·</span>
              <span>Lima &amp; Todo el Perú</span>
              <span aria-hidden="true">·</span>
              <span>Autorización MTC y GPS 24/7</span>
            </p>

            <h1
              className="font-display font-extrabold tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
              style={{
                fontSize: 'clamp(2.25rem, 4.2vw, 3.6rem)',
                textWrap: 'balance',
              }}
            >
              {cms.hero.title.includes('en Perú') ? (
                <>
                  {cms.hero.title.replace('en Perú', '')}
                  <span className="text-[#fab511]">en Perú</span>
                </>
              ) : (
                cms.hero.title
              )}
            </h1>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-[58ch] drop-shadow-sm">
              {cms.hero.subtitle}
            </p>

            {/* Primary Red Pulsing "Ver video" (Play/Pause Toggle) + Yellow "Reservar" */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="button"
                onClick={handleHeroRedButton}
                data-agent-action="play-hero-video"
                aria-label={isPlaying ? 'Detener video de portada' : 'Reproducir video de portada'}
                aria-pressed={isPlaying}
                className="pulse-red-shadow inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#C8102E] hover:bg-[#a60c25] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0 border border-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fab511]"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-white text-white" aria-hidden="true" />
                ) : (
                  <Play className="w-4 h-4 fill-white text-white" aria-hidden="true" />
                )}
                <span>Ver video</span>
              </button>

              <button
                type="button"
                onClick={scrollToReserve}
                data-agent-action="primary-reserve"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#fab511] hover:bg-[#e2a20b] text-[#6c1323] font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Reservar</span>
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* External Language Selector with Country Flags */}
            <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/85">
                <Globe className="w-4 h-4 text-[#fab511] shrink-0" aria-hidden="true" />
                <span>Video disponible en 6 idiomas:</span>
              </div>
              <div
                className="flex flex-wrap items-center gap-1.5 bg-black/60 backdrop-blur-sm p-1.5 rounded-xl border border-white/15"
                role="group"
                aria-label="Seleccionar idioma del video"
              >
                {cms.videos.map((vid) => {
                  const active = vid.code === activeVideo?.code;
                  return (
                    <button
                      key={vid.code}
                      type="button"
                      onClick={() => handleSelectLanguage(vid.code)}
                      title={vid.nativeName}
                      aria-label={`Seleccionar video en ${vid.label}`}
                      aria-pressed={active}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#fab511] text-[#6c1323] shadow-sm'
                          : 'text-white/90 hover:text-white hover:bg-white/15'
                      }`}
                    >
                      <FlagIcon code={vid.code} className="w-5 h-3.5" />
                      <span>{vid.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Background Carousel Slide Controls */}
            {slides.length > 1 && (
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                  aria-label="Imagen anterior de portada"
                  className="w-8 h-8 rounded-full bg-black/50 hover:bg-[#6c1323] border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5">
                  {slides.map((s, idx) => (
                    <button
                      key={s.url}
                      type="button"
                      onClick={() => setSlideIndex(idx)}
                      aria-label={`Ver fondo ${idx + 1}: ${s.label}`}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === slideIndex ? 'w-6 bg-[#fab511]' : 'w-2 bg-white/35 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setSlideIndex((prev) => (prev + 1) % slides.length)}
                  aria-label="Siguiente imagen de portada"
                  className="w-8 h-8 rounded-full bg-black/50 hover:bg-[#6c1323] border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Square Multilingual Video Frame (Inline OR Maximized 1:1 Lightbox) */}
          <div className="lg:col-span-5" ref={videoContainerRef} id="ver-video">
            {/* Layout placeholder while maximized so grid doesn't collapse */}
            {isExpanded && <div className="aspect-square w-full rounded-2xl bg-black/50 border-2 border-[#fab511]/40" />}

            <div
              onClick={isExpanded ? () => setIsExpanded(false) : undefined}
              className={
                isExpanded
                  ? 'fixed inset-0 z-[9999] bg-black flex items-center justify-center p-0 select-none overflow-hidden'
                  : 'relative rounded-2xl overflow-hidden bg-black shadow-2xl border-2 transition-colors ' +
                    (isPlaying ? 'border-[#fab511]' : 'border-white/25')
              }
            >
              <div
                onClick={(e) => {
                  if (isExpanded) e.stopPropagation();
                }}
                className={
                  isExpanded
                    ? 'relative w-[min(100vw,100dvh)] h-[min(100vw,100dvh)] aspect-square overflow-hidden bg-black'
                    : 'aspect-square w-full relative bg-black'
                }
              >
                {!videoError && activeVideo ? (
                  <video
                    ref={videoRef}
                    key={activeVideo.videoUrl}
                    src={activeVideo.videoUrl}
                    poster={activeVideo.posterUrl}
                    muted={isMuted}
                    loop
                    playsInline
                    preload="metadata"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onError={() => setVideoError(true)}
                    aria-label={activeVideo.title}
                    className="w-full h-full object-contain bg-black"
                  />
                ) : (
                  <img
                    src={
                      activeVideo?.posterUrl ||
                      'https://transportejuvasa.com.pe/media-juvasa/img/00-portada.webp'
                    }
                    alt={activeVideo?.title || 'Transporte JUVASA Flota'}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain bg-black"
                  />
                )}

                {/* Pure Black Contrast Scrims */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/45 to-transparent"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/75 to-transparent"
                  aria-hidden="true"
                />

                {/* Center Play Overlay when stopped */}
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label="Reproducir video oficial de Transporte JUVASA"
                    className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/15 transition-colors cursor-pointer group z-[5]"
                  >
                    <span className="w-16 h-16 rounded-full bg-[#C8102E] group-hover:bg-[#fab511] text-white group-hover:text-[#6c1323] flex items-center justify-center shadow-2xl border-2 border-white/40 transition-all group-hover:scale-110">
                      <Play className="w-7 h-7 fill-current ml-0.5" aria-hidden="true" />
                    </span>
                  </button>
                )}

                {/* Top Overlay: Language Indicator + Compact Language Switcher + Close when Expanded */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                  <span className="text-xs font-bold text-white bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded-md border border-[#fab511]/40">
                    {activeVideo?.nativeName}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm p-1 rounded-md border border-white/15">
                      {cms.videos.map((vid) => {
                        const active = vid.code === activeVideo?.code;
                        return (
                          <button
                            key={vid.code}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectLanguage(vid.code);
                            }}
                            title={vid.nativeName}
                            aria-label={`Seleccionar video en ${vid.label}`}
                            className={`px-2 py-0.5 text-[11px] font-bold rounded transition-colors cursor-pointer ${
                              active
                                ? 'bg-[#fab511] text-[#6c1323]'
                                : 'text-white/85 hover:text-white hover:bg-white/15'
                            }`}
                          >
                            {vid.shortLabel}
                          </button>
                        );
                      })}
                    </div>

                    {isExpanded && (
                      <button
                        type="button"
                        onClick={handleToggleExpand}
                        aria-label="Cerrar vista ampliada"
                        className="w-8 h-8 rounded-md bg-[#C8102E] hover:bg-[#9B0B23] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/25"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Bottom Overlay: Video Caption & Playback Controls */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3 z-10">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#fab511] truncate">
                      {activeVideo?.label} · Video Oficial JUVASA
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-white line-clamp-2 leading-snug mt-0.5">
                      {activeVideo?.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
                      className="w-10 h-10 rounded-lg bg-[#C8102E]/95 hover:bg-[#9B0B23] text-white backdrop-blur-sm flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Activar audio' : 'Silenciar audio'}
                      className="w-10 h-10 rounded-lg bg-black/70 hover:bg-[#6c1323] text-white backdrop-blur-sm flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={handleToggleExpand}
                      aria-label={
                        isExpanded
                          ? 'Reducir video cuadrado'
                          : 'Maximizar video cuadrado a altura máxima'
                      }
                      className="w-10 h-10 rounded-lg bg-black/70 hover:bg-[#6c1323] text-white backdrop-blur-sm flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                    >
                      {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Wine-Red 4-Column KPI Strip directly below Hero Split */}
      <div className="relative z-10 bg-[#6c1323] border-t border-[#fab511]/30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-7 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {cms.hero.trustMetrics.map((metric, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#fab511] font-mono-tabular">
                {metric.value}
              </div>
              <div className="text-sm font-bold text-white">{metric.label}</div>
              <div className="text-xs text-red-100/80">{metric.context}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
