export interface MultilingualVideo {
  code: 'es' | 'en' | 'pt' | 'zh' | 'fr' | 'de';
  label: string;
  shortLabel: string;
  nativeName: string;
  videoUrl: string;
  posterUrl: string;
  title: string;
  description: string;
  durationIso: string;
}

export interface HeroSlide {
  url: string;
  alt: string;
  label: string;
}

export interface FleetVehicle {
  id: string;
  slug: string;
  name: string;
  category: 'suv' | 'van' | 'minibus';
  categoryLabel: string;
  tagline: string;
  passengersMin: number;
  passengersMax: number;
  luggageCapacity: string;
  transmission: string;
  fuelType: string;
  yearRange: string;
  image: string;
  gallery: string[];
  description: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  features: string[];
  idealFor: string[];
  specs: { label: string; value: string }[];
  priceHint: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  highlights: string[];
  recommendedVehicles: string[];
  processSteps: { step: string; detail: string }[];
}

export interface DestinationItem {
  id: string;
  slug: string;
  name: string;
  region: string;
  duration: string;
  distanceFromLima: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  highlights: string[];
  recommendedVehicleSlug: string;
  itinerarySummary: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Turismo' | 'Corporativo' | 'Aeropuerto' | 'Flota';
  location: string;
  dateLabel: string;
  image: string;
  alt: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Reservas' | 'Seguridad' | 'Flota' | 'Pagos';
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  route: string;
  rating: number;
  comment: string;
  source: string;
  timeAgo?: string;
  initials?: string;
  avatarBg?: string;
}

export interface PartnerBrand {
  id: string;
  name: string;
  label: string;
  desc: string;
  logoUrl: string;
}

export interface SiteContact {
  brandName: string;
  legalName: string;
  logoUrl: string;
  ruc: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  address: string;
  district: string;
  city: string;
  schedule: string;
  lat: number;
  lng: number;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  tiktokUrl: string;
}

export interface CmsContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    carouselSlides: HeroSlide[];
    trustMetrics: { value: string; label: string; context: string }[];
  };
  videos: MultilingualVideo[];
  fleet: FleetVehicle[];
  services: ServiceItem[];
  destinations: DestinationItem[];
  gallery: GalleryItem[];
  faqs: FaqItem[];
  testimonials: TestimonialItem[];
  partnerBrands: PartnerBrand[];
  contact: SiteContact;
  seoGlobal: {
    siteName: string;
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string;
  };
}

export interface LeadSubmission {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  vehicleSlug: string;
  passengers: string;
  travelDate: string;
  originDestination: string;
  message: string;
  sourcePage: string;
}

export const DEFAULT_CMS_CONTENT: CmsContent = {
  hero: {
    eyebrow: 'Transporte Privado · Lima & Todo el Perú · Autorización MTC y GPS 24/7',
    title: 'Transporte privado, turístico y ejecutivo en Perú',
    subtitle:
      'Flota propia de autos, camionetas ejecutivas, vanes Hyundai y minibuses Mercedes-Benz Sprinter con conductores profesionales, monitoreo satelital continuo y atención multilingüe las 24 horas.',
    primaryCtaLabel: 'Ver video',
    secondaryCtaLabel: 'Reservar',
    carouselSlides: [
      {
        url: 'https://transportejuvasa.com.pe/media-juvasa/img/x1-p5.webp',
        alt: 'Transporte JUVASA - Traslados Aeropuerto Jorge Chávez 1',
        label: 'Aeropuerto 1',
      },
      {
        url: 'https://transportejuvasa.com.pe/media-juvasa/img/x1-p6.webp',
        alt: 'Transporte JUVASA - Traslados Aeropuerto Jorge Chávez 2',
        label: 'Aeropuerto 2',
      },
      {
        url: 'https://transportejuvasa.com.pe/media-juvasa/img/x1-p1.1.webp',
        alt: 'Transporte JUVASA - Flota moderna en Lima',
        label: 'Unidad 1',
      },
      {
        url: 'https://transportejuvasa.com.pe/media-juvasa/img/x1-p2.webp',
        alt: 'Transporte JUVASA - Sprinter turística',
        label: 'Unidad 2',
      },
      {
        url: 'https://transportejuvasa.com.pe/media-juvasa/img/x1-p3.webp',
        alt: 'Transporte JUVASA - Servicio ejecutivo en Perú',
        label: 'Unidad 3',
      },
      {
        url: 'https://transportejuvasa.com.pe/media-juvasa/img/x1-p4.webp',
        alt: 'Transporte JUVASA - Movilidad para grupos',
        label: 'Unidad 4',
      },
    ],
    trustMetrics: [
      { value: '+12 años', label: 'Trayectoria operativa', context: 'Lima y rutas nacionales' },
      { value: '100% GPS', label: 'Control satelital 24/7', context: 'Velocidad regulada MTC' },
      { value: '6 idiomas', label: 'Atención internacional', context: 'ES · EN · PT · ZH · FR · DE' },
      { value: '4.9 / 5.0', label: 'Satisfacción verificada', context: 'Turistas y empresas' },
    ],
  },
  videos: [
    {
      code: 'es',
      label: 'Español',
      shortLabel: 'ES',
      nativeName: 'Español (Perú)',
      videoUrl: 'https://transportejuvasa.com.pe/media-juvasa/vid/Nacional.mp4',
      posterUrl: 'https://transportejuvasa.com.pe/media-juvasa/img/00-portada.webp',
      title: 'Transporte JUVASA — Servicio Nacional y Turístico en Perú',
      description:
        'Conoce nuestra flota moderna de camionetas, vanes y Mercedes-Benz Sprinter para traslados en Lima, Aeropuerto Jorge Chávez y todo el Perú.',
      durationIso: 'PT1M15S',
    },
    {
      code: 'en',
      label: 'English',
      shortLabel: 'EN',
      nativeName: 'English (International)',
      videoUrl: 'https://transportejuvasa.com.pe/media-juvasa/vid/int2-ingles.mp4',
      posterUrl: 'https://transportejuvasa.com.pe/media-juvasa/img/00-portada.webp',
      title: 'Transporte JUVASA — Private Airport & Tourist Transport in Peru',
      description:
        'Private airport pickups at Lima Jorge Chávez (LIM), corporate shuttles, and custom Mercedes-Benz Sprinter tours across Peru.',
      durationIso: 'PT1M10S',
    },
    {
      code: 'pt',
      label: 'Português',
      shortLabel: 'PT',
      nativeName: 'Português (Brasil)',
      videoUrl: 'https://transportejuvasa.com.pe/media-juvasa/vid/int3-brasil.mp4',
      posterUrl: 'https://transportejuvasa.com.pe/media-juvasa/img/00-portada.webp',
      title: 'Transporte JUVASA — Traslados e Turismo Privado no Peru',
      description:
        'Serviço exclusivo de vans, Sprinter e ônibus para turistas brasileiros em Lima, Paracas, Huacachina e rotas corporativas.',
      durationIso: 'PT1M10S',
    },
    {
      code: 'zh',
      label: '中文',
      shortLabel: 'ZH',
      nativeName: '中文 (中国)',
      videoUrl: 'https://transportejuvasa.com.pe/media-juvasa/vid/int4-china.mp4',
      posterUrl: 'https://transportejuvasa.com.pe/media-juvasa/img/00-portada.webp',
      title: 'Transporte JUVASA — 秘鲁利马私人包车与商务接送服务',
      description:
        '利马豪尔赫·查韦斯国际机场专车接送、商务代表团包车及秘鲁全境私人定制旅游车队。',
      durationIso: 'PT1M10S',
    },
    {
      code: 'fr',
      label: 'Français',
      shortLabel: 'FR',
      nativeName: 'Français (France)',
      videoUrl: 'https://transportejuvasa.com.pe/media-juvasa/vid/int5-francia.mp4',
      posterUrl: 'https://transportejuvasa.com.pe/media-juvasa/img/00-portada.webp',
      title: 'Transporte JUVASA — Transport Privé et Touristique au Pérou',
      description:
        'Transferts privés depuis l’aéroport de Lima, véhicules Mercedes-Benz Sprinter et circuits sur mesure au Pérou.',
      durationIso: 'PT1M10S',
    },
    {
      code: 'de',
      label: 'Deutsch',
      shortLabel: 'DE',
      nativeName: 'Deutsch (Deutschland)',
      videoUrl: 'https://transportejuvasa.com.pe/media-juvasa/vid/int6-alemania.mp4',
      posterUrl: 'https://transportejuvasa.com.pe/media-juvasa/img/00-portada.webp',
      title: 'Transporte JUVASA — Privater Transfer & Mietwagen mit Fahrer in Peru',
      description:
        'Zuverlässige Flughafentransfers in Lima, Business-Shuttles und komfortable Mercedes-Benz Sprinter für Ihre Peru-Rundreise.',
      durationIso: 'PT1M10S',
    },
  ],
  fleet: [
    {
      id: 'veh-suv',
      slug: 'auto-camioneta-ejecutiva',
      name: 'Auto & Camioneta Ejecutiva',
      category: 'suv',
      categoryLabel: 'Camioneta / Auto Ejecutivo',
      tagline: 'Traslados VIP discretos, rápidos y climatizados para directivos y viajeros individuales.',
      passengersMin: 1,
      passengersMax: 6,
      luggageCapacity: '4 maletas grandes + 3 de mano',
      transmission: 'Automática secuencial',
      fuelType: 'Gasolina / Híbrido',
      yearRange: '2023 – 2025',
      image: 'https://transportejuvasa.com.pe/media-juvasa/img/x1-a1.webp',
      gallery: [
        'https://transportejuvasa.com.pe/media-juvasa/img/x1-a1.webp',
        'https://transportejuvasa.com.pe/wp-content/uploads/2023/08/2023-toyota-corolla-zr-hybrid-hatch-silver-1-1024x768.jpg',
        'https://transportejuvasa.com.pe/wp-content/uploads/2023/08/Taxiespecial_auto.jpg',
      ],
      description:
        'Nuestras unidades Auto y Camioneta Ejecutiva están pensadas para traslados de gerencia, recojo VIP en el Aeropuerto Internacional Jorge Chávez y recorridos privados en Lima Metropolitana (San Isidro, Miraflores, Barranco y Surco). Ofrecen cabina silenciosa, tapiz en cuero y conectividad bajo solicitud.',
      seoTitle: 'Alquiler de Auto y Camioneta Ejecutiva con Chofer en Lima | JUVASA',
      seoDescription:
        'Servicio de auto y camioneta ejecutiva con chofer en Lima. Ideal para ejecutivos, traslados al Aeropuerto Jorge Chávez y viajes privados de 1 a 6 pasajeros.',
      seoKeywords: 'auto ejecutivo lima, alquiler camioneta con chofer peru, traslado vip aeropuerto lima, taxi especial corporativo',
      features: [
        'Asientos anatómicos en cuero y climatización bi-zona',
        'Conductor uniformado con dominio de rutas ejecutivas',
        'Rastreo GPS satelital en tiempo real 24/7',
        'Puertos de carga USB-C y botella de agua de cortesía',
        'Seguro SOAT vigente y póliza de responsabilidad civil',
      ],
      idealFor: ['Directorio y gerencias', 'Aeropuerto Jorge Chávez VIP', 'Reuniones en San Isidro y Miraflores'],
      specs: [
        { label: 'Capacidad máxima', value: '1 – 6 pasajeros' },
        { label: 'Equipaje', value: 'Hasta 4 maletas de 23 kg' },
        { label: 'Aire acondicionado', value: 'Climatizador automático' },
        { label: 'Monitoreo', value: 'GPS 24/7 + Botón de pánico' },
        { label: 'Autorización', value: 'MTC / ATU Lima' },
      ],
      priceHint: 'Cotización por ruta, hora o servicio ejecutivo',
    },
    {
      id: 'veh-van',
      slug: 'van-ejecutiva-turistica',
      name: 'Van Ejecutiva & Turística',
      category: 'van',
      categoryLabel: 'Van (Hyundai Staria / H1)',
      tagline: 'Equilibrio perfecto entre agilidad urbana, confort familiar y amplio maletero.',
      passengersMin: 6,
      passengersMax: 10,
      luggageCapacity: '10 maletas grandes + equipaje de mano',
      transmission: 'Automática / Mecánica 6 vel.',
      fuelType: 'Diésel Euro V',
      yearRange: '2023 – 2025',
      image: 'https://transportejuvasa.com.pe/media-juvasa/img/x1-a2.webp',
      gallery: [
        'https://transportejuvasa.com.pe/media-juvasa/img/x1-a2.webp',
        'https://transportejuvasa.com.pe/wp-content/uploads/2023/08/Hyundai-Staria-2022-1600-01A.jpg',
        'https://transportejuvasa.com.pe/wp-content/uploads/2023/08/Aeropuerto_van-1.jpg',
      ],
      description:
        'La Van Ejecutiva (modelos Hyundai Staria, H1 y Mercedes Vito) es nuestra unidad más solicitada para familias, grupos privados de turismo y delegaciones corporativas medianas. Su altura permite ingresar a estacionamientos hoteleros en Miraflores mientras mantiene amplio espacio interior.',
      seoTitle: 'Alquiler de Van con Chofer en Lima y Perú (6 a 10 pax) | JUVASA',
      seoDescription:
        'Alquila una Van ejecutiva con conductor para 6 a 10 pasajeros en Lima, aeropuerto, Paracas e Ica. Amplia maletera, aire acondicionado y GPS 24/7.',
      seoKeywords: 'alquiler de van lima, van turistica con chofer peru, hyundai staria turismo lima, traslado grupo aeropuerto jorge chavez',
      features: [
        'Butacas reclinables independientes con cinturones de 3 puntos',
        'Doble aire acondicionado independiente para cabina posterior',
        'Amplia bodega trasera para maletas internacionales',
        'Lunas panorámicas con láminas de seguridad y filtro UV',
        'Sistema de audio y micrófono opcional para guía turístico',
      ],
      idealFor: ['Familias con equipaje completo', 'City Tours y Full Days a Paracas / Ica', 'Traslado de equipos corporativos'],
      specs: [
        { label: 'Capacidad máxima', value: '6 – 10 pasajeros' },
        { label: 'Equipaje', value: '10 maletas grandes' },
        { label: 'Climatización', value: 'Doble zona independiente' },
        { label: 'Seguridad', value: 'GPS 24/7 + Frenos ABS/EBD' },
        { label: 'Cobertura', value: 'Local e interprovincial' },
      ],
      priceHint: 'Cotización por ruta, hora o Full Day',
    },
    {
      id: 'veh-sprinter-corta',
      slug: 'minibus-sprinter-corta',
      name: 'Minibús Sprinter Corta',
      category: 'minibus',
      categoryLabel: 'Mercedes-Benz Sprinter 15 Pax',
      tagline: 'Techo alto para caminar de pie, suspensión turística y ergonomía superior en carretera.',
      passengersMin: 11,
      passengersMax: 15,
      luggageCapacity: '15 maletas grandes en bodega posterior',
      transmission: 'Mecánica 6 velocidades',
      fuelType: 'Diésel Turbo Intercooler',
      yearRange: '2022 – 2025',
      image: 'https://transportejuvasa.com.pe/media-juvasa/img/x1-a3.webp',
      gallery: [
        'https://transportejuvasa.com.pe/media-juvasa/img/x1-a3.webp',
        'https://transportejuvasa.com.pe/media-juvasa/img/x1-p2.webp',
        'https://transportejuvasa.com.pe/media-juvasa/img/x1-p1.1.webp',
      ],
      description:
        'La Mercedes-Benz Sprinter Corta ofrece capacidad de 11 a 15 pasajeros con techo elevado que facilita el desplazamiento cómodo dentro del salón. Es la favorita de agencias de viaje receptivo y empresas que realizan viajes a Paracas, Ica, Lunahuaná o traslados de delegaciones.',
      seoTitle: 'Alquiler de Sprinter Mercedes-Benz 15 Pasajeros en Perú | JUVASA',
      seoDescription:
        'Minibús Mercedes-Benz Sprinter para 11 a 15 pasajeros en Lima y rutas nacionales. Asientos reclinables, techo alto, aire acondicionado y GPS 24/7.',
      seoKeywords: 'alquiler sprinter lima, minibus 15 pasajeros peru, transporte turistico sprinter, mercedes benz sprinter lima',
      features: [
        'Techo alto de 1.94 m para tránsito interno sin agacharse',
        'Asientos turísticos reclinables con apoyabrazos',
        'Paqueteras aéreas interiores y bodega trasera independiente',
        'Pantalla multimedia, puertos USB por fila y micrófono para guía',
        'Suspensión reforzada para rutas de costa y sierra',
      ],
      idealFor: ['Agencias de turismo receptivo', 'Excursiones a Paracas, Ica y Nazca', 'Transporte ejecutivo de personal'],
      specs: [
        { label: 'Capacidad máxima', value: '11 – 15 pasajeros' },
        { label: 'Altura interior', value: '1.94 m (techo alto)' },
        { label: 'Equipaje', value: '15 maletas + mochilas' },
        { label: 'Control de velocidad', value: 'Monitoreo GPS 90 km/h' },
        { label: 'Permiso', value: 'MTC Turismo Nacional' },
      ],
      priceHint: 'Tarifas preferenciales para agencias y empresas',
    },
    {
      id: 'veh-sprinter-larga',
      slug: 'minibus-sprinter-larga',
      name: 'Minibús Sprinter Larga',
      category: 'minibus',
      categoryLabel: 'Mercedes-Benz Sprinter 20 Pax',
      tagline: 'Máxima capacidad en formato ágil para delegaciones internacionales y rutas largas.',
      passengersMin: 16,
      passengersMax: 20,
      luggageCapacity: '20 maletas grandes + equipaje de cabina',
      transmission: 'Mecánica 6 velocidades',
      fuelType: 'Diésel Euro V',
      yearRange: '2023 – 2025',
      image: 'https://transportejuvasa.com.pe/media-juvasa/img/x1-a4.webp',
      gallery: [
        'https://transportejuvasa.com.pe/media-juvasa/img/x1-a4.webp',
        'https://transportejuvasa.com.pe/media-juvasa/img/x1-p3.webp',
        'https://transportejuvasa.com.pe/media-juvasa/img/x1-p4.webp',
      ],
      description:
        'Diseñada para grupos de 16 a 20 pasajeros que exigen el estándar Mercedes-Benz en circuitos multi-día, congresos internacionales y transporte corporativo. Combina gran capacidad de bodega con acceso rápido a hoteles de Miraflores, Centro Histórico y terminales aéreas.',
      seoTitle: 'Minibús Sprinter Larga 20 Pasajeros con Conductor | JUVASA Perú',
      seoDescription:
        'Servicio de Sprinter Larga para 16 a 20 pasajeros en Lima y todo el Perú. Confort premium, amplia bodega, micrófono de guía y monitoreo satelital 24/7.',
      seoKeywords: 'sprinter 20 pasajeros lima, alquiler minibus turistico peru, transporte delegaciones lima, minibus eventos corporativos',
      features: [
        'Salón panorámico para 16 a 20 viajeros con amplio pasillo',
        'Aire acondicionado de techo de alta capacidad térmica',
        'Bodega ampliada y portaequipajes superior continuo',
        'Sistema de audio profesional y micrófono inalámbrico',
        'Mantenimiento preventivo certificado cada 5,000 km',
      ],
      idealFor: ['Delegaciones extranjeras y congresos', 'Circuitos turísticos de varios días', 'Equipos deportivos y productoras'],
      specs: [
        { label: 'Capacidad máxima', value: '16 – 20 pasajeros' },
        { label: 'Equipaje', value: 'Hasta 20 maletas grandes' },
        { label: 'Multimedia', value: 'TV + Audio + Micrófono' },
        { label: 'Seguridad', value: 'GPS 24/7 + Botiquín + Extintores' },
        { label: 'Disponibilidad', value: '24 horas / Todo el Perú' },
      ],
      priceHint: 'Cotización inmediata vía WhatsApp o formulario',
    },
  ],
  services: [
    {
      id: 'srv-aeropuerto',
      slug: 'traslados-aeropuerto-jorge-chavez',
      number: '01',
      title: 'Traslados del y al Aeropuerto',
      shortDesc:
        'Recojo puntual en el Aeropuerto Internacional Jorge Chávez con seguimiento de vuelo en tiempo real y espera con cartel personalizado.',
      fullDesc:
        'Coordinamos llegadas y salidas nacionales e internacionales en el Aeropuerto Internacional Jorge Chávez (LIM) las 24 horas. Monitoreamos el estado de tu vuelo para ajustar el horario de recojo sin recargos por demoras aéreas, recibiendo a tus pasajeros o ejecutivos con identificación personalizada rumbo a Miraflores, San Isidro, Barranco, Centro de Lima o cualquier destino del país.',
      image: 'https://transportejuvasa.com.pe/media-juvasa/img/x1-s2.webp',
      seoTitle: 'Traslado Privado Aeropuerto Jorge Chávez Lima 24/7 | JUVASA',
      seoDescription:
        'Traslados seguros y puntuales desde y hacia el Aeropuerto Jorge Chávez en Lima. Vans, autos ejecutivos y Sprinter con seguimiento de vuelo 24/7.',
      seoKeywords: 'traslado aeropuerto jorge chavez, transporte privado aeropuerto lima, recojo aeropuerto miraflores san isidro, shuttle aeropuerto lima',
      highlights: [
        'Monitoreo de vuelo en vivo ante adelantos o retrasos',
        'Recepción en zona de llegadas con cartel con nombre o logo corporativo',
        'Estacionamiento oficial y asistencia completa con equipaje',
        'Tarifa cerrada sin sorpresas ni cobros ocultos por tráfico',
      ],
      recommendedVehicles: ['auto-camioneta-ejecutiva', 'van-ejecutiva-turistica', 'minibus-sprinter-corta'],
      processSteps: [
        { step: '01. Envío de vuelo', detail: 'Indícanos tu número de vuelo, hora estimada y cantidad de maletas.' },
        { step: '02. Asignación', detail: 'Recibes los datos del conductor, placa y enlace de seguimiento.' },
        { step: '03. Recepción VIP', detail: 'Nuestro chofer te espera en puerta de llegadas con cartel visible.' },
      ],
    },
    {
      id: 'srv-corporativo',
      slug: 'transporte-corporativo-ejecutivo',
      number: '02',
      title: 'Transporte Corporativo y Ejecutivo',
      shortDesc:
        'Movilidad empresarial a medida para directorios, visitas de clientes extranjeros, roadshows y traslados diarios de personal.',
      fullDesc:
        'Brindamos soluciones de transporte corporativo con facturación electrónica, puntualidad auditada por GPS y conductores capacitados en protocolo ejecutivo. Atendemos desde traslados por horas para ejecutivos en San Isidro hasta rutas fijas de transporte de personal para plantas industriales, oficinas y congresos en Lima y provincias.',
      image: 'https://transportejuvasa.com.pe/media-juvasa/img/x1-s1.webp',
      seoTitle: 'Transporte Corporativo y Ejecutivo para Empresas en Lima | JUVASA',
      seoDescription:
        'Servicio de transporte corporativo, traslado ejecutivo y movilidad de personal para empresas en Lima. Flota moderna, facturación y GPS 24/7.',
      seoKeywords: 'transporte corporativo lima, traslado ejecutivo empresas peru, transporte de personal lima, movilidad empresarial juvasa',
      highlights: [
        'Facturación corporativa mensual o por servicio con crédito acordado',
        'Reportes de puntualidad, kilometraje y telemetría GPS',
        'Unidades discretas de alta gama para gerencias y visitas VIP',
        'Disponibilidad 24/7 con coordinador de cuenta dedicado',
      ],
      recommendedVehicles: ['auto-camioneta-ejecutiva', 'van-ejecutiva-turistica', 'minibus-sprinter-corta'],
      processSteps: [
        { step: '01. Diagnóstico', detail: 'Definimos horarios, sedes, turnos y capacidad requerida.' },
        { step: '02. Flota asignada', detail: 'Seleccionamos unidades homologadas con pólizas vigentes.' },
        { step: '03. Control diario', detail: 'Supervisión operativa en tiempo real desde nuestra central.' },
      ],
    },
    {
      id: 'srv-turistico',
      slug: 'transporte-turistico-privado',
      number: '03',
      title: 'Transporte Turístico Privado & City Tours',
      shortDesc:
        'Excursiones a medida en Lima, Full Days a Paracas, Huacachina, Nazca y circuitos culturales con total flexibilidad.',
      fullDesc:
        'Trabajamos directamente con viajeros internacionales, familias y agencias de viajes que buscan movilidad privada segura y sin prisas. Diseñamos la logística terrestre para Lima City Tours, tours gastronómicos, salidas de un día a Paracas y Huacachina, sobrevuelos en Nazca y escapadas a Lunahuaná o Antioquia.',
      image: 'https://transportejuvasa.com.pe/wp-content/uploads/2023/08/Citytours_auto.jpg',
      seoTitle: 'Transporte Turístico Privado en Lima, Paracas e Ica | JUVASA',
      seoDescription:
        'Alquiler de transporte turístico privado con conductor en Perú. City Tours en Lima, Full Days a Paracas, Huacachina y rutas nacionales con Sprinter y Vans.',
      seoKeywords: 'transporte turistico lima, city tour privado lima, transporte privado paracas huacachina, alquiler van turismo peru',
      highlights: [
        'Permiso nacional de transporte turístico emitido por el MTC',
        'Rutas flexibles con paradas fotográficas y gastronómicas',
        'Conductores conocedores de circuitos históricos y reservas naturales',
        'Atención previa en 6 idiomas para viajeros internacionales',
      ],
      recommendedVehicles: ['van-ejecutiva-turistica', 'minibus-sprinter-corta', 'minibus-sprinter-larga'],
      processSteps: [
        { step: '01. Ruta a medida', detail: 'Elige destino, puntos de parada y horario de partida.' },
        { step: '02. Unidad ideal', detail: 'Asignamos Camioneta, Van o Sprinter según tamaño del grupo.' },
        { step: '03. Viaje seguro', detail: 'Disfruta del recorrido con asistencia permanente 24/7.' },
      ],
    },
    {
      id: 'srv-personal',
      slug: 'transporte-de-personal-empresas',
      number: '04',
      title: 'Transporte de Personal',
      shortDesc:
        'Rutas optimizadas de recojo y retorno para colaboradores con cumplimiento estricto de horarios y seguridad vial.',
      fullDesc:
        'Diseñamos mallas de rutas urbanas e interurbanas para trasladar a tus equipos de trabajo desde sus puntos de encuentro o domicilios hasta centros operativos, oficinas o parques industriales. Reducimos ausentismo y aseguramos llegadas a tiempo en turnos diurnos, nocturnos o rotativos.',
      image: 'https://transportejuvasa.com.pe/wp-content/uploads/2023/08/Servicioempresa_auto.jpg',
      seoTitle: 'Servicio de Transporte de Personal para Empresas en Lima | JUVASA',
      seoDescription:
        'Transporte de personal seguro y puntual en Lima en vanes y minibuses Sprinter. Control GPS 24/7 y planes corporativos a medida.',
      seoKeywords: 'transporte de personal lima, movilidad trabajadores empresas peru, alquiler sprinter personal lima',
      highlights: [
        'Optimización de paraderos para reducir tiempos de viaje',
        'Control de asistencia y cumplimiento horario auditado',
        'Flota de respaldo inmediata ante cualquier eventualidad',
        'Capacitación continua de conductores en manejo defensivo',
      ],
      recommendedVehicles: ['van-ejecutiva-turistica', 'minibus-sprinter-corta', 'minibus-sprinter-larga'],
      processSteps: [
        { step: '01. Mapeo', detail: 'Analizamos direcciones y turnos del personal.' },
        { step: '02. Ruta piloto', detail: 'Validamos tiempos reales de recorrido.' },
        { step: '03. Operación continua', detail: 'Servicio diario monitoreado por central.' },
      ],
    },
    {
      id: 'srv-eventos',
      slug: 'eventos-corporativos-delegaciones',
      number: '05',
      title: 'Eventos, Congresos y Delegaciones',
      shortDesc:
        'Coordinación logística integral multi-vehículo para convenciones, cumbres internacionales, bodas y delegaciones.',
      fullDesc:
        'Cuando un evento exige mover múltiples invitados entre hoteles, aeropuertos y recintos feriales, desplegamos una flota sincronizada de Camionetas, Vans y Sprinters con supervisores en campo para garantizar flujos continuos sin esperas.',
      image: 'https://transportejuvasa.com.pe/media-juvasa/img/x1-s6.webp',
      seoTitle: 'Transporte para Eventos Corporativos y Delegaciones en Lima | JUVASA',
      seoDescription:
        'Logística de transporte para congresos, ferias, delegaciones internacionales y eventos sociales en Lima. Flota sincronizada y coordinadores en campo.',
      seoKeywords: 'transporte eventos corporativos lima, movilidad congresos peru, transporte delegaciones internacionales lima',
      highlights: [
        'Coordinador logístico en sitio para embarque ordenado',
        'Despacho simultáneo de múltiples vehículos',
        'Protocolo VIP para ponentes, embajadas y directivos',
        'Flexibilidad ante cambios de agenda en vivo',
      ],
      recommendedVehicles: ['minibus-sprinter-larga', 'minibus-sprinter-corta', 'auto-camioneta-ejecutiva'],
      processSteps: [
        { step: '01. Cronograma', detail: 'Integramos vuelos, hoteles y horarios del evento.' },
        { step: '02. Despliegue', detail: 'Ubicamos unidades y señalética en cada sede.' },
        { step: '03. Ejecución', detail: 'Traslados fluidos durante toda la jornada.' },
      ],
    },
    {
      id: 'srv-interprovincial',
      slug: 'viajes-privados-interprovinciales',
      number: '06',
      title: 'Viajes Privados Interprovinciales',
      shortDesc:
        'Movilidad puerta a puerta hacia el sur, centro y norte del Perú con unidades de largo alcance y doble tripulación.',
      fullDesc:
        'Evita los horarios rígidos de terminales terrestres. Viaja con tu familia, equipo de trabajo o grupo turístico directamente desde tu hotel o domicilio en Lima hacia Paracas, Ica, Nazca, Arequipa, Huancayo, Huaraz o Trujillo en unidades privadas revisadas técnicamente antes de cada salida.',
      image: 'https://transportejuvasa.com.pe/media-juvasa/img/x1-s5.webp',
      seoTitle: 'Viajes Privados Interprovinciales desde Lima a Todo el Perú | JUVASA',
      seoDescription:
        'Servicio de transporte privado interprovincial desde Lima hacia Paracas, Ica, Nazca, Huaraz y todo el Perú. Puerta a puerta en Camionetas, Vans y Sprinter.',
      seoKeywords: 'transporte privado interprovincial peru, viaje privado lima ica paracas, alquiler sprinter viaje familiar peru',
      highlights: [
        'Salida puerta a puerta en el horario que elijas',
        'Doble conductor para trayectos superiores a 5 horas',
        'Revisión técnica pre-viaje certificada en taller propio',
        'Asistencia en ruta y comunicación satelital constante',
      ],
      recommendedVehicles: ['van-ejecutiva-turistica', 'minibus-sprinter-corta', 'minibus-sprinter-larga'],
      processSteps: [
        { step: '01. Planificación', detail: 'Definimos origen, paradas intermedias y retorno.' },
        { step: '02. Checklist técnico', detail: 'Inspección completa de frenos, neumáticos y GPS.' },
        { step: '03. Ruta segura', detail: 'Viaje confortable con soporte operativo 24/7.' },
      ],
    },
  ],
  destinations: [
    {
      id: 'dest-lima',
      slug: 'lima-city-tour-y-aeropuerto',
      name: 'Lima Histórica, Moderna & Aeropuerto',
      region: 'Lima Metropolitana',
      duration: 'Medio día / Full Day / Traslados 24h',
      distanceFromLima: 'Centro, Miraflores, Barranco y Callao',
      shortDesc:
        'Recorridos privados por el Centro Histórico, Catacumbas, Larco, Malecón de Miraflores, Barranco y traslados directos desde el Aeropuerto.',
      fullDesc:
        'Descubre Lima con comodidad y sin complicaciones de tráfico. Conectamos el Aeropuerto Internacional Jorge Chávez con los principales distritos turísticos y financieros, y organizamos circuitos privados por la Plaza Mayor, Convento de San Francisco, Museo Larco, Circuito Mágico del Agua y rutas gastronómicas.',
      image: 'https://transportejuvasa.com.pe/wp-content/uploads/2023/08/Citytours_auto.jpg',
      seoTitle: 'Transporte Privado y City Tour en Lima Perú | Transporte JUVASA',
      seoDescription:
        'Movilidad privada para Lima City Tour, Miraflores, Barranco, Centro Histórico y Aeropuerto Jorge Chávez. Viaja seguro con Transporte JUVASA.',
      seoKeywords: 'transporte privado lima city tour, turismo en lima peru, traslado miraflores aeropuerto, tour lima con chofer',
      highlights: [
        'Centro Histórico de Lima y Catacumbas de San Francisco',
        'Malecón de Miraflores, Parque del Amor y Larcomar',
        'Barranco bohemio, Puente de los Suspiros y restaurantes top',
        'Circuito Mágico del Agua y Museo Larco',
      ],
      recommendedVehicleSlug: 'van-ejecutiva-turistica',
      itinerarySummary: [
        'Recojo en hotel en Miraflores, San Isidro o Aeropuerto.',
        'Recorrido guiado por Lima Colonial y Lima Moderna.',
        'Parada gastronómica coordinada según preferencia.',
        'Retorno seguro directo a la puerta de tu alojamiento.',
      ],
    },
    {
      id: 'dest-paracas-huacachina',
      slug: 'paracas-ica-y-huacachina',
      name: 'Paracas, Ica & Oasis de Huacachina',
      region: 'Región Ica — Costa Sur',
      duration: 'Full Day o 2 Días / 1 Noche',
      distanceFromLima: '260 km – 305 km (3.5 a 4.5 horas)',
      shortDesc:
        'La escapada más popular desde Lima: Islas Ballestas, Reserva Nacional de Paracas, viñedos artesanales en Ica y dunas de Huacachina.',
      fullDesc:
        'Viaja por la Panamericana Sur en una Van Ejecutiva o Mercedes-Benz Sprinter privada saliendo temprano desde tu hotel en Lima. Llegamos a tiempo para el embarque a las Islas Ballestas, continuamos hacia la Reserva Nacional de Paracas y culminamos en las dunas doradas del Oasis de Huacachina y bodegas vitivinícolas de Ica.',
      image: 'https://transportejuvasa.com.pe/wp-content/uploads/2023/08/FullDays_auto.jpg',
      seoTitle: 'Transporte Privado Lima a Paracas, Ica y Huacachina | JUVASA',
      seoDescription:
        'Viaja de Lima a Paracas, Islas Ballestas y Oasis de Huacachina en transporte privado. Vans y Sprinter con conductor desde tu hotel. Cotiza ahora.',
      seoKeywords: 'transporte privado lima paracas, tour huacachina desde lima, alquiler van lima ica, full day paracas huacachina transporte',
      highlights: [
        'Muelle El Chaco e Islas Ballestas en Paracas',
        'Reserva Nacional de Paracas y Playa Roja',
        'Cata de piscos y vinos en bodegas tradicionales de Ica',
        'Atardecer en Oasis de Huacachina (tubulares y sandboarding)',
      ],
      recommendedVehicleSlug: 'minibus-sprinter-corta',
      itinerarySummary: [
        '05:30 h — Recojo privado en tu hotel en Lima.',
        '09:15 h — Arribo a Paracas para tour marítimo y reserva.',
        '13:30 h — Almuerzo y cata en viñedo de Ica.',
        '16:00 h — Dunas de Huacachina y retorno confortable a Lima.',
      ],
    },
    {
      id: 'dest-nazca',
      slug: 'lineas-de-nazca-y-sur',
      name: 'Líneas de Nazca & Ruta del Sur',
      region: 'Nazca — Ica',
      duration: 'Full Day Extendido o 2 Días / 1 Noche',
      distanceFromLima: '445 km (6.5 horas)',
      shortDesc:
        'Traslado privado directo hacia el aeródromo María Reiche de Nazca y miradores panorámicos con paradas en Paracas y Huacachina.',
      fullDesc:
        'Evita buses públicos con escalas incómodas. Nuestro servicio privado hacia Nazca te lleva directamente al aeródromo para tu sobrevuelo a las Líneas de Nazca, incluyendo paradas estratégicas en los miradores metálicos, Acueductos de Cantalloc y el Oasis de Huacachina.',
      image: 'https://transportejuvasa.com.pe/media-juvasa/img/x1-s5.webp',
      seoTitle: 'Transporte Privado de Lima a Líneas de Nazca | JUVASA Perú',
      seoDescription:
        'Traslado privado desde Lima o Ica hacia las Líneas de Nazca. Unidades modernas con aire acondicionado, asientos reclinables y chofer profesional.',
      seoKeywords: 'transporte privado lima nazca, traslado aerodromo nazca, tour ica nazca privado, van a nazca desde lima',
      highlights: [
        'Traslado directo al Aeródromo María Reiche en Nazca',
        'Parada en Mirador de las Líneas de Nazca y Palpa',
        'Opción combinada con Paracas y Huacachina 2D/1N',
        'Doble conductor habilitado para máxima seguridad',
      ],
      recommendedVehicleSlug: 'van-ejecutiva-turistica',
      itinerarySummary: [
        'Salida coordinada desde Lima, Paracas o Ica.',
        'Llegada puntual al horario de check-in de sobrevuelo.',
        'Visita opcional a Acueductos de Cantalloc y Museo Antonini.',
        'Retorno directo a tu hotel en Ica o Lima.',
      ],
    },
    {
      id: 'dest-lunahuana',
      slug: 'lunahuana-y-antioquia',
      name: 'Lunahuaná, Cerro Azul & Valle de Cañete',
      region: 'Lima Provincias — Sur Chico',
      duration: 'Full Day (12 horas)',
      distanceFromLima: '185 km (2.5 a 3 horas)',
      shortDesc:
        'Aventura, canotaje, viñedos y gastronomía campestre en el valle soleado de Lunahuaná con parada en el muelle de Cerro Azul.',
      fullDesc:
        'Perfecto para paseos corporativos de integración, familias y grupos escolares. Salimos desde Lima rumbo al sur chico visitando el muelle de Cerro Azul, las ruinas de Incahuasi y el valle de Lunahuaná para disfrutar deportes de aventura y cocina tradicional.',
      image: 'https://transportejuvasa.com.pe/media-juvasa/img/x1-s3.webp',
      seoTitle: 'Transporte Privado Full Day a Lunahuaná desde Lima | JUVASA',
      seoDescription:
        'Alquila un auto ejecutivo, van o Sprinter privada para tu Full Day a Lunahuaná y Cerro Azul desde Lima. Ideal para grupos, empresas y familias.',
      seoKeywords: 'transporte privado lunahuana, full day lunahuana movilidad, alquiler van lunahuana lima, paseo empresarial lunahuana',
      highlights: [
        'Balneario y muelle histórico de Cerro Azul',
        'Complejo arqueológico de Incahuasi',
        'Zona de canotaje, canopy y cuatrimotos en Lunahuaná',
        'Bodegas vitivinícolas y apícolas del valle',
      ],
      recommendedVehicleSlug: 'minibus-sprinter-larga',
      itinerarySummary: [
        '06:30 h — Recojo en punto acordado en Lima.',
        '08:30 h — Visita breve al Muelle de Cerro Azul.',
        '10:00 h — Actividades de aventura y viñedos en Lunahuaná.',
        '17:00 h — Retorno tranquilo hacia Lima.',
      ],
    },
    {
      id: 'dest-cusco-conexion',
      slug: 'conexiones-cusco-y-circuitos-peru',
      name: 'Conexiones Nacionales & Logística Multi-Destino',
      region: 'Cobertura Nacional — Perú',
      duration: 'Circuitos de 3 a 10 días',
      distanceFromLima: 'Coordinación integral en Perú',
      shortDesc:
        'Logística terrestre coordinada para agencias y viajeros que combinan Lima, Ica, Nazca y conexiones aéreas hacia Cusco y Machu Picchu.',
      fullDesc:
        'Apoyamos a operadores turísticos y viajeros internacionales en el diseño completo de su logística terrestre en Perú: recepción en el Aeropuerto de Lima, circuito costa sur (Paracas – Huacachina – Nazca), retorno al aeropuerto para vuelos domésticos a Cusco, Arequipa o Iquitos y coordinación de grupos grandes.',
      image: 'https://transportejuvasa.com.pe/wp-content/uploads/2023/08/Eventoscorporativos_auto.jpg',
      seoTitle: 'Logística de Transporte Turístico en Perú: Lima, Ica y Conexiones | JUVASA',
      seoDescription:
        'Transporte turístico privado para paquetes Perú: Lima, Paracas, Huacachina, Nazca y conexiones al aeropuerto para Cusco y Machu Picchu.',
      seoKeywords: 'transporte turistico peru, paquetes lima ica cusco movilidad, operador transporte privado lima, transfer internacional lima',
      highlights: [
        'Sincronización exacta con vuelos domésticos hacia Cusco',
        'Soporte B2B para agencias nacionales e internacionales',
        'Tarifario confidencial por volumen y multi-día',
        'Asistencia 24/7 por WhatsApp en 6 idiomas',
      ],
      recommendedVehicleSlug: 'minibus-sprinter-larga',
      itinerarySummary: [
        'Día 1: Recepción VIP en Aeropuerto Jorge Chávez y traslado a hotel.',
        'Día 2–3: Ruta privada Paracas, Huacachina y Sobrevuelo Nazca.',
        'Día 4: Traslado puntual al aeropuerto para conexión a Cusco.',
        'Seguimiento permanente del itinerario hasta el vuelo de retorno.',
      ],
    },
    {
      id: 'dest-norte-chico',
      slug: 'norte-chico-chancay-y-caral',
      name: 'Norte Chico: Chancay, Huaral & Caral',
      region: 'Lima Norte — Barranca & Huaral',
      duration: 'Full Day (11 a 12 horas)',
      distanceFromLima: '80 km – 185 km (1.5 a 3 horas)',
      shortDesc:
        'Excursión privada hacia el Castillo de Chancay, gastronomía campestre de Huaral y la Ciudad Sagrada de Caral, la civilización más antigua de América.',
      fullDesc:
        'Viaja por la Panamericana Norte hacia el Castillo de Chancay frente al Pacífico, continúa por el valle de Huaral famoso por su gastronomía y visita la Ciudad Sagrada de Caral en Supe con unidades privadas equipadas para grupos familiares, escolares o corporativos.',
      image: 'https://transportejuvasa.com.pe/media-juvasa/img/x1-p5.webp',
      seoTitle: 'Transporte Privado a Chancay y Caral desde Lima | Transporte JUVASA',
      seoDescription:
        'Viaja en movilidad privada de Lima al Castillo de Chancay, Huaral y la Ciudad Sagrada de Caral. Camionetas, vans y Sprinter con chofer profesional.',
      seoKeywords: 'transporte privado caral desde lima, full day castillo chancay movilidad, tour privado huaral caral peru',
      highlights: [
        'Ciudad Sagrada de Caral (Patrimonio Mundial UNESCO)',
        'Castillo de Chancay y circuito marino frente al mar',
        'Ruta gastronómica en Huaral y haciendas del Norte Chico',
        'Salida puerta a puerta desde hoteles o domicilios en Lima',
      ],
      recommendedVehicleSlug: 'minibus-sprinter-corta',
      itinerarySummary: [
        '07:00 h — Recojo privado en tu punto de partida en Lima.',
        '09:30 h — Recorrido guiado en la Ciudad Sagrada de Caral.',
        '13:30 h — Almuerzo campestre en Huaral o vista al mar en Chancay.',
        '18:00 h — Retorno confortable y seguro a Lima.',
      ],
    },
  ],
  gallery: [
    {
      id: 'gal-1',
      title: 'Recepción VIP en Aeropuerto Jorge Chávez',
      category: 'Aeropuerto',
      location: 'Aeropuerto Internacional Jorge Chávez, Callao',
      dateLabel: 'Operación 2026',
      image: 'https://transportejuvasa.com.pe/wp-content/uploads/2023/08/Aeropuerto_van-1.jpg',
      alt: 'Van de Transporte JUVASA atendiendo traslados desde y hacia el Aeropuerto Jorge Chávez',
      description: 'Unidad ejecutiva lista en zona de llegadas internacionales para traslado privado hacia Miraflores.',
    },
    {
      id: 'gal-2',
      title: 'Flota Mercedes-Benz Sprinter en Ruta',
      category: 'Flota',
      location: 'Lima y Costa Sur, Perú',
      dateLabel: 'Turismo & Grupos',
      image: 'https://transportejuvasa.com.pe/media-juvasa/img/x1-p2.webp',
      alt: 'Minibús Mercedes-Benz Sprinter de Transporte JUVASA en operación',
      description: 'Minibús Mercedes-Benz Sprinter trasladando a una delegación internacional con máximo confort.',
    },
    {
      id: 'gal-3',
      title: 'Movilidad para Eventos Corporativos',
      category: 'Corporativo',
      location: 'San Isidro & Centros de Convenciones',
      dateLabel: 'Servicio Empresarial',
      image: 'https://transportejuvasa.com.pe/wp-content/uploads/2023/08/Eventoscorporativos_auto.jpg',
      alt: 'Servicio de transporte para eventos corporativos en Lima con Transporte JUVASA',
      description: 'Flota sincronizada para ejecutivos, ponentes internacionales y eventos empresariales.',
    },
    {
      id: 'gal-4',
      title: 'Full Days y Excursiones Turísticas',
      category: 'Turismo',
      location: 'Paracas, Huacachina y Lunahuaná',
      dateLabel: 'Excursión Privada',
      image: 'https://transportejuvasa.com.pe/wp-content/uploads/2023/08/FullDays_auto.jpg',
      alt: 'Transporte privado para Full Days turísticos desde Lima con JUVASA',
      description: 'Viaje privado interprovincial con paradas panorámicas y horario flexible.',
    },
    {
      id: 'gal-5',
      title: 'Traslados de Llegada Internacional',
      category: 'Aeropuerto',
      location: 'Terminal Aérea Lima',
      dateLabel: 'Atención 24/7',
      image: 'https://transportejuvasa.com.pe/media-juvasa/img/x1-p5.webp',
      alt: 'Recepción de pasajeros internacionales en el aeropuerto de Lima',
      description: 'Seguimiento de vuelo en tiempo real y coordinación multilingüe.',
    },
    {
      id: 'gal-6',
      title: 'City Tours Privados en Lima',
      category: 'Turismo',
      location: 'Centro Histórico, Miraflores y Barranco',
      dateLabel: 'City Tour Lima',
      image: 'https://transportejuvasa.com.pe/wp-content/uploads/2023/08/Citytours_auto.jpg',
      alt: 'City Tour privado en Lima con flota moderna de Transporte JUVASA',
      description: 'Recorrido cultural y gastronómico por los principales atractivos de la capital.',
    },
  ],
  faqs: [
    {
      id: 'faq-1',
      category: 'Reservas',
      question: '¿Con cuánta anticipación debo reservar mi traslado o alquiler de unidad?',
      answer:
        'Para traslados al Aeropuerto Jorge Chávez o viajes locales recomendamos reservar con al menos 12 a 24 horas de anticipación, aunque atendemos emergencias 24/7 vía WhatsApp. Para grupos en Van o Sprinter y rutas interprovinciales sugerimos confirmar con 3 a 7 días de antelación.',
    },
    {
      id: 'faq-2',
      category: 'Seguridad',
      question: '¿Qué pasa si mi vuelo hacia Lima se retrasa o llega antes?',
      answer:
        'Monitoreamos tu código de vuelo en tiempo real. Si tu vuelo sufre adelantos o demoras aéreas, ajustamos automáticamente la hora de recojo del conductor sin generar penalidades ni cargos sorpresa.',
    },
    {
      id: 'faq-3',
      category: 'Flota',
      question: '¿Las unidades cuentan con permisos formales del MTC, SOAT y GPS?',
      answer:
        'Sí. Todas nuestras unidades pertenecen a una empresa formalmente constituida en Perú, con autorizaciones vigentes del Ministerio de Transportes y Comunicaciones (MTC) para ámbito nacional y turístico, SOAT vigente, póliza de seguro contra todo riesgo y rastreo GPS satelital las 24 horas.',
    },
    {
      id: 'faq-4',
      category: 'Reservas',
      question: '¿Atienden a turistas internacionales o agencias en otros idiomas?',
      answer:
        'Sí. Nuestro equipo comercial y de reservas brinda atención inmediata en Español, Inglés, Portugués, Chino, Francés y Alemán, y puedes visualizar nuestros videos informativos en cada uno de estos idiomas directamente en la portada.',
    },
    {
      id: 'faq-5',
      category: 'Pagos',
      question: '¿Emiten factura electrónica para empresas y qué medios de pago aceptan?',
      answer:
        'Emitimos factura electrónica o boleta de venta según requerimiento. Aceptamos transferencias bancarias (BCP, BBVA, Interbank), Yape / Plin corporativo, tarjetas de crédito/débito y acuerdos de crédito para agencias y cuentas corporativas.',
    },
    {
      id: 'faq-6',
      category: 'Flota',
      question: '¿El precio de la cotización incluye conductor, combustible y peajes?',
      answer:
        'Todas nuestras cotizaciones son transparentes e incluyen unidad moderna, conductor profesional uniformado y combustible. Los peajes o estacionamientos en aeropuerto pueden incluirse como tarifa "Todo Incluido" según lo prefieras en tu cotización.',
    },
  ],
  testimonials: [
    {
      id: 'stephany-orozco',
      author: 'Stephany Orozco',
      role: '2 opiniones · Google Maps',
      company: 'Google Maps',
      route: 'Traslado Aeropuerto Jorge Chávez',
      rating: 5,
      timeAgo: 'Hace 3 meses',
      initials: 'SO',
      avatarBg: 'bg-purple-600',
      comment:
        'Excelente experiencia. Necesitaba un traslado temprano al aeropuerto y llegaron incluso unos minutos antes. El chofer fue muy amable y el viaje fue tranquilo.',
      source: 'Google Maps · 5.0 ★',
    },
    {
      id: 'alexander-chicoma',
      author: 'Alexander Chicoma',
      role: '1 opinión · Google Maps',
      company: 'Google Maps',
      route: 'Servicio privado programado en Lima',
      rating: 5,
      timeAgo: 'Hace 3 meses',
      initials: 'AC',
      avatarBg: 'bg-blue-600',
      comment:
        'Lo que más me gustó fue la puntualidad. A veces uno se preocupa por los tiempos, pero en este caso todo estuvo bien organizado. Recomendado.',
      source: 'Google Maps · 5.0 ★',
    },
    {
      id: 'valeria-peche',
      author: 'Valeria Peche',
      role: '2 opiniones · Google Maps',
      company: 'Google Maps',
      route: 'Recojo y traslado privado en Lima',
      rating: 5,
      timeAgo: 'Hace 3 meses',
      initials: 'VP',
      avatarBg: 'bg-teal-600',
      comment:
        'Muy buena comunicación desde el inicio. Me confirmaron la reserva y el conductor estuvo pendiente de mi ubicación para facilitar el recojo. Todo excelente',
      source: 'Google Maps · 5.0 ★',
    },
    {
      id: 'diego-gc',
      author: 'Diego Gc',
      role: '1 opinión · Google Maps',
      company: 'Google Maps',
      route: 'Transporte corporativo y turístico',
      rating: 5,
      timeAgo: 'Hace 4 meses',
      initials: 'DG',
      avatarBg: 'bg-amber-600',
      comment:
        'Excelente servicio de transporte. Muy amable, puntual y profesional en todo momento. Las unidades estaban limpias, cómodas y en muy buenas condiciones. El viaje fue seguro y agradable, superando mis expectativas. Sin duda, recomendaría Juvasa a cualquier persona que busque un servicio de calidad y confianza.',
      source: 'Google Maps · 5.0 ★',
    },
    {
      id: 'magda-cuica',
      author: 'Magda Cuica',
      role: '2 opiniones · Google Maps',
      company: 'Google Maps',
      route: 'Viaje privado con conductor',
      rating: 5,
      timeAgo: 'Hace 3 meses',
      initials: 'MC',
      avatarBg: 'bg-rose-600',
      comment:
        'Muy buen servicio. El conductor llegó puntual y durante todo el recorrido manejó con mucho cuidado. El vehículo estaba limpio y cómodo. Sin duda volvería a contratar esta empresa!',
      source: 'Google Maps · 5.0 ★',
    },
  ],
  partnerBrands: [
    {
      id: 'mtc',
      name: 'MTC',
      label: 'MTC',
      desc: 'Ministerio de Transportes y Comunicaciones',
      logoUrl: 'https://transportejuvasa.com.pe/media-juvasa/img/00-logo1.webp',
    },
    {
      id: 'dgac',
      name: 'DGAC',
      label: 'DGAC',
      desc: 'Dirección General de Aeronáutica Civil',
      logoUrl: 'https://transportejuvasa.com.pe/media-juvasa/img/00-logo2.webp',
    },
    {
      id: 'forbis',
      name: 'Forbis Logistics',
      label: 'FORBIS LOGISTICS',
      desc: 'Logística y carga internacional',
      logoUrl: 'https://transportejuvasa.com.pe/media-juvasa/img/00-logo3.webp',
    },
    {
      id: 'real-plaza',
      name: 'Real Plaza',
      label: 'REAL PLAZA',
      desc: 'Cadena de centros comerciales',
      logoUrl: 'https://transportejuvasa.com.pe/media-juvasa/img/00-logo4.webp',
    },
    {
      id: 'queirolo',
      name: 'Santiago Queirolo',
      label: 'SANTIAGO QUEIROLO',
      desc: 'Tradición vitivinícola',
      logoUrl: 'https://transportejuvasa.com.pe/media-juvasa/img/00-logo5.webp',
    },
    {
      id: 'tacama',
      name: 'Tacama',
      label: 'TACAMA',
      desc: 'Viñedo histórico del Perú',
      logoUrl: 'https://transportejuvasa.com.pe/media-juvasa/img/00-logo6.webp',
    },
    {
      id: 'vanderlande',
      name: 'Vanderlande',
      label: 'VANDERLANDE',
      desc: 'Sistemas logísticos y aeropuertos',
      logoUrl: 'https://transportejuvasa.com.pe/media-juvasa/img/00-logo7.webp',
    },
    {
      id: 'kimberly-clark',
      name: 'Kimberly-Clark',
      label: 'KIMBERLY-CLARK',
      desc: 'Multinacional de consumo',
      logoUrl: 'https://transportejuvasa.com.pe/media-juvasa/img/00-logo8.webp',
    },
    {
      id: 'fovipol',
      name: 'FOVIPOL',
      label: 'FOVIPOL',
      desc: 'Fondo de Vivienda Policial',
      logoUrl: 'https://transportejuvasa.com.pe/media-juvasa/img/00-logo9.webp',
    },
  ],
  contact: {
    brandName: 'Transporte JUVASA',
    legalName: 'Transporte Express Juvasa E.I.R.L.',
    logoUrl: 'https://transportejuvasa.com.pe/media-juvasa/img/logo01.webp',
    ruc: '20601984312',
    phoneDisplay: '+51 981 370 909',
    whatsappNumber: '51981370909',
    whatsappMessage: 'Hola, quisiera cotizar un servicio de transporte en Perú con Juvasa. ¿Podrían brindarme información, por favor?',
    email: 'reservas@transportejuvasa.com.pe',
    address: 'Calle Francisco Cornejo, Los Olivos',
    district: 'Los Olivos',
    city: 'Lima, Perú',
    schedule: 'Lunes a Domingo · Atención y Operaciones 24/7',
    lat: -11.9912,
    lng: -77.0715,
    facebookUrl: 'https://www.facebook.com/transportejuvasa',
    instagramUrl: 'https://www.instagram.com/transportejuvasa',
    linkedinUrl: 'https://www.linkedin.com/company/transporte-juvasa',
    tiktokUrl: 'https://www.tiktok.com/@transportejuvasa',
  },
  seoGlobal: {
    siteName: 'Transporte JUVASA',
    defaultTitle: 'Transporte JUVASA | Transporte Privado, Turístico y Ejecutivo en Perú',
    defaultDescription:
      'Transporte privado, turístico y corporativo en Lima y todo el Perú. Flota propia de camionetas, vanes y Mercedes-Benz Sprinter con GPS 24/7.',
    defaultKeywords:
      'transporte privado lima, alquiler de van con chofer peru, traslado aeropuerto jorge chavez, mercedes sprinter lima, transporte turistico peru, transporte de personal lima',
  },
};
