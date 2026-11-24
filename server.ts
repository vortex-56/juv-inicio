import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { DEFAULT_CMS_CONTENT, type CmsContent, type LeadSubmission } from './src/data/cmsDefaults.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, 'data');
const CMS_FILE = path.join(DATA_DIR, 'cms-data.json');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

function ensureDataFiles(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(CMS_FILE)) {
    fs.writeFileSync(CMS_FILE, JSON.stringify(DEFAULT_CMS_CONTENT, null, 2), 'utf-8');
  }
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

function readCms(): CmsContent {
  ensureDataFiles();
  try {
    const raw = fs.readFileSync(CMS_FILE, 'utf-8');
    return JSON.parse(raw) as CmsContent;
  } catch {
    return DEFAULT_CMS_CONTENT;
  }
}

function writeCms(content: CmsContent): void {
  ensureDataFiles();
  fs.writeFileSync(CMS_FILE, JSON.stringify(content, null, 2), 'utf-8');
}

function readLeads(): LeadSubmission[] {
  ensureDataFiles();
  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(raw) as LeadSubmission[];
  } catch {
    return [];
  }
}

function writeLeads(leads: LeadSubmission[]): void {
  ensureDataFiles();
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

function resolveBaseUrl(req: express.Request): string {
  const envUrl = process.env.APP_URL;
  if (envUrl && envUrl.startsWith('http')) {
    return envUrl.replace(/\/+$/, '');
  }
  const proto = (req.headers['x-forwarded-proto'] as string) || req.protocol || 'https';
  const host = req.headers['x-forwarded-host'] || req.get('host') || 'localhost:3000';
  return `${proto}://${host}`.replace(/\/+$/, '');
}

function xmlEscape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function startServer() {
  ensureDataFiles();
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '5mb' }));

  // CMS REST API
  app.get('/api/cms', (_req, res) => {
    res.json(readCms());
  });

  app.put('/api/cms', (req, res) => {
    const body = req.body as Partial<CmsContent>;
    if (!body || !body.hero || !Array.isArray(body.fleet) || !Array.isArray(body.services)) {
      res.status(400).json({ error: 'Estructura de contenido CMS inválida.' });
      return;
    }
    const merged: CmsContent = {
      ...DEFAULT_CMS_CONTENT,
      ...body,
    };
    writeCms(merged);
    res.json({ ok: true, data: merged });
  });

  app.post('/api/cms/reset', (_req, res) => {
    writeCms(DEFAULT_CMS_CONTENT);
    res.json({ ok: true, data: DEFAULT_CMS_CONTENT });
  });

  // Lead capture API
  app.get('/api/leads', (_req, res) => {
    res.json(readLeads());
  });

  app.post('/api/contact', (req, res) => {
    const {
      name,
      email,
      phone,
      serviceType,
      vehicleSlug,
      passengers,
      travelDate,
      originDestination,
      message,
      sourcePage,
    } = req.body || {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      res.status(400).json({ error: 'Por favor ingresa tu nombre completo.' });
      return;
    }
    if (!phone || typeof phone !== 'string' || phone.trim().length < 6) {
      res.status(400).json({ error: 'Por favor ingresa un número de teléfono o WhatsApp válido.' });
      return;
    }
    if (email && typeof email === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      res.status(400).json({ error: 'El correo electrónico ingresado no tiene un formato válido.' });
      return;
    }

    const newLead: LeadSubmission = {
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
      name: String(name).trim().slice(0, 120),
      email: email ? String(email).trim().slice(0, 140) : '',
      phone: String(phone).trim().slice(0, 40),
      serviceType: serviceType ? String(serviceType).trim().slice(0, 120) : 'Cotización General',
      vehicleSlug: vehicleSlug ? String(vehicleSlug).trim().slice(0, 80) : '',
      passengers: passengers ? String(passengers).trim().slice(0, 30) : '',
      travelDate: travelDate ? String(travelDate).trim().slice(0, 40) : '',
      originDestination: originDestination ? String(originDestination).trim().slice(0, 200) : '',
      message: message ? String(message).trim().slice(0, 1500) : '',
      sourcePage: sourcePage ? String(sourcePage).trim().slice(0, 120) : '/',
    };

    const existing = readLeads();
    existing.unshift(newLead);
    writeLeads(existing.slice(0, 500));

    res.status(201).json({ ok: true, lead: newLead });
  });

  // Technical SEO: robots.txt
  app.get('/robots.txt', (req, res) => {
    const base = resolveBaseUrl(req);
    const robots = [
      'User-agent: *',
      'Allow: /',
      'Disallow: /cms',
      '',
      'User-agent: Googlebot',
      'Allow: /',
      '',
      'User-agent: OAI-SearchBot',
      'Allow: /',
      '',
      'User-agent: PerplexityBot',
      'Allow: /',
      '',
      'User-agent: ClaudeBot',
      'Allow: /',
      '',
      `Sitemap: ${base}/sitemap.xml`,
      `Sitemap: ${base}/video-sitemap.xml`,
    ].join('\n');
    res.type('text/plain').send(robots);
  });

  // Technical SEO: Dynamic XML Sitemap with Video Extensions + hreflang
  app.get('/sitemap.xml', (req, res) => {
    const base = resolveBaseUrl(req);
    const cms = readCms();
    const today = new Date().toISOString().split('T')[0];

    const staticUrls = [
      { loc: `${base}/`, priority: '1.0', changefreq: 'daily', includeVideos: true },
      { loc: `${base}/flota`, priority: '0.9', changefreq: 'weekly', includeVideos: false },
      { loc: `${base}/servicios`, priority: '0.9', changefreq: 'weekly', includeVideos: false },
      { loc: `${base}/destinos`, priority: '0.9', changefreq: 'weekly', includeVideos: false },
      { loc: `${base}/nosotros`, priority: '0.85', changefreq: 'weekly', includeVideos: false },
      { loc: `${base}/contacto`, priority: '0.85', changefreq: 'monthly', includeVideos: false },
    ];

    const fleetUrls = cms.fleet.map((v) => ({
      loc: `${base}/flota/${v.slug}`,
      priority: '0.85',
      changefreq: 'weekly',
      includeVideos: false,
    }));

    const serviceUrls = cms.services.map((s) => ({
      loc: `${base}/servicios/${s.slug}`,
      priority: '0.85',
      changefreq: 'weekly',
      includeVideos: false,
    }));

    const destinationUrls = cms.destinations.map((d) => ({
      loc: `${base}/destinos/${d.slug}`,
      priority: '0.85',
      changefreq: 'weekly',
      includeVideos: false,
    }));

    const allUrls = [...staticUrls, ...fleetUrls, ...serviceUrls, ...destinationUrls];

    const videoEntries = cms.videos
      .map(
        (vid) => `    <video:video>
      <video:thumbnail_loc>${xmlEscape(vid.posterUrl.startsWith('http') ? vid.posterUrl : `${base}${vid.posterUrl}`)}</video:thumbnail_loc>
      <video:title>${xmlEscape(vid.title)}</video:title>
      <video:description>${xmlEscape(vid.description)}</video:description>
      <video:content_loc>${xmlEscape(vid.videoUrl)}</video:content_loc>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>`
      )
      .join('\n');

    const urlNodes = allUrls
      .map(
        (u) => `  <url>
    <loc>${xmlEscape(u.loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    <xhtml:link rel="alternate" hreflang="es-PE" href="${xmlEscape(u.loc)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${xmlEscape(u.loc)}?lang=en" />
    <xhtml:link rel="alternate" hreflang="pt" href="${xmlEscape(u.loc)}?lang=pt" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(u.loc)}" />
${u.includeVideos ? `${videoEntries}\n` : ''}  </url>`
      )
      .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urlNodes}
</urlset>`;

    res.type('application/xml').send(xml);
  });

  // Dedicated Google Video Sitemap
  app.get('/video-sitemap.xml', (req, res) => {
    const base = resolveBaseUrl(req);
    const cms = readCms();
    const videoNodes = cms.videos
      .map(
        (vid) => `    <video:video>
      <video:thumbnail_loc>${xmlEscape(vid.posterUrl.startsWith('http') ? vid.posterUrl : `${base}${vid.posterUrl}`)}</video:thumbnail_loc>
      <video:title>${xmlEscape(vid.title)}</video:title>
      <video:description>${xmlEscape(vid.description)}</video:description>
      <video:content_loc>${xmlEscape(vid.videoUrl)}</video:content_loc>
      <video:publication_date>2026-11-23T00:00:00-05:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
    </video:video>`
      )
      .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${xmlEscape(base)}/</loc>
${videoNodes}
  </url>
</urlset>`;

    res.type('application/xml').send(xml);
  });

  // Agentic Browsing & LLM Discovery: llms.txt
  app.get('/llms.txt', (req, res) => {
    const base = resolveBaseUrl(req);
    const cms = readCms();
    const lines = [
      `# ${cms.contact.brandName} (${cms.contact.legalName})`,
      '',
      `> ${cms.seoGlobal.defaultDescription}`,
      '',
      '## Key Information',
      `- Website: ${base}`,
      `- Phone / WhatsApp 24/7: ${cms.contact.phoneDisplay} (https://wa.me/${cms.contact.whatsappNumber})`,
      `- Email: ${cms.contact.email}`,
      `- Headquarters: ${cms.contact.address}, ${cms.contact.city}`,
      `- Languages Supported: Español, English, Português, 中文, Français, Deutsch`,
      '',
      '## Fleet Catalog',
      ...cms.fleet.map(
        (v) => `- [${v.name}](${base}/flota/${v.slug}): ${v.passengersMin}-${v.passengersMax} passengers · ${v.luggageCapacity}. ${v.tagline}`
      ),
      '',
      '## Core Services',
      ...cms.services.map((s) => `- [${s.title}](${base}/servicios/${s.slug}): ${s.shortDesc}`),
      '',
      '## Destinations',
      ...cms.destinations.map((d) => `- [${d.name}](${base}/destinos/${d.slug}): ${d.shortDesc}`),
      '',
      '## Agent Actions & Endpoints',
      `- Quote API: POST ${base}/api/contact`,
      `- Catalog JSON: ${base}/.well-known/ai-catalog.json`,
      `- XML Sitemap: ${base}/sitemap.xml`,
      `- Video Sitemap: ${base}/video-sitemap.xml`,
    ].join('\n');

    res.type('text/plain; charset=utf-8').send(lines);
  });

  // Agentic Resource Discovery (ARD) JSON Catalogs
  const buildArdPayload = (req: express.Request) => {
    const base = resolveBaseUrl(req);
    const cms = readCms();
    return {
      $schema: 'https://raw.githubusercontent.com/ards-project/ard-spec/main/spec/schemas/ai-catalog.schema.json',
      specVersion: '1.0',
      host: {
        displayName: cms.contact.brandName,
        identifier: `did:web:${req.get('host') || 'transportejuvasa.com.pe'}`,
        documentationUrl: `${base}/llms.txt`,
        logoUrl: `${base}/src/assets/images/fleet_van_staria_1795480223718.jpg`,
      },
      entries: [
        {
          identifier: 'urn:air:transportejuvasa.com.pe:services:quote',
          displayName: 'Transporte JUVASA Online Quote',
          type: 'text/html',
          url: `${base}/contacto`,
          description: 'Online private transport quotation and reservation form for airport transfers, corporate mobility, and Peru tours.',
          tags: ['transport', 'tourism', 'airport', 'lima', 'peru', 'vans', 'sprinter'],
          capabilities: ['TransportQuotation', 'AirportTransferBooking', 'FleetInquiry'],
          representativeQueries: [
            'book private airport transfer jorge chavez lima peru',
            'hire passenger van or mercedes sprinter with driver in peru',
            'corporate executive mobility services in lima',
            'private tourist transportation from lima to paracas and huacachina',
          ],
          version: '1.0.0',
          updatedAt: new Date().toISOString(),
        },
        {
          identifier: 'urn:air:transportejuvasa.com.pe:fleet:catalog',
          displayName: 'Transporte JUVASA Fleet Directory',
          type: 'text/html',
          url: `${base}/flota`,
          description: 'Complete technical specifications for Executive Cars/SUVs, Hyundai Vans, and Mercedes-Benz Sprinters (11-20 pax).',
          tags: ['fleet', 'van', 'sprinter', 'suv'],
          capabilities: ['FleetDiscovery', 'VehicleSpecifications'],
          representativeQueries: [
            'mercedes sprinter 15 passengers rental lima peru',
            'mercedes sprinter 20 seats charter lima',
          ],
          version: '1.0.0',
          updatedAt: new Date().toISOString(),
        },
        {
          identifier: 'urn:air:transportejuvasa.com.pe:whatsapp:booking',
          displayName: 'Transporte JUVASA WhatsApp 24/7 Booking',
          type: 'text/html',
          url: `https://wa.me/${cms.contact.whatsappNumber}`,
          description: 'Direct 24/7 WhatsApp booking and multi-language customer support.',
          tags: ['whatsapp', 'booking', '24-7', 'multilingual'],
          capabilities: ['InstantSupport', 'WhatsAppBooking'],
          representativeQueries: [
            'contact transporte juvasa whatsapp customer service',
            'book van with driver in lima peru',
          ],
          version: '1.0.0',
          updatedAt: new Date().toISOString(),
        },
      ],
    };
  };

  app.get('/.well-known/ai-catalog.json', (req, res) => {
    res.json(buildArdPayload(req));
  });

  app.get('/.well-known/ard.json', (req, res) => {
    res.json(buildArdPayload(req));
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Transporte JUVASA server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
