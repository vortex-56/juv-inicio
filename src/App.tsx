import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CmsProvider } from './context/CmsContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomePage } from './pages/HomePage';
import { FleetPage } from './pages/FleetPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CmsPage } from './pages/CmsPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);
  return null;
}

function AgenticBridge() {
  useEffect(() => {
    const nav = navigator as Navigator & {
      modelContext?: {
        registerTool?: (tool: {
          name: string;
          description: string;
          inputSchema: Record<string, unknown>;
          execute: (args: Record<string, unknown>) => Promise<unknown>;
        }) => void;
      };
    };
    if (!nav.modelContext?.registerTool) return;
    try {
      nav.modelContext.registerTool({
        name: 'get_juvasa_catalog',
        description: 'Obtener el catálogo completo de flota, servicios, destinos y contacto de Transporte JUVASA.',
        inputSchema: { type: 'object', properties: {} },
        execute: async () => {
          const res = await fetch('/api/cms');
          return res.ok ? await res.json() : {};
        },
      });
      nav.modelContext.registerTool({
        name: 'submit_juvasa_quote',
        description: 'Enviar una solicitud de cotización de transporte privado en Perú a Transporte JUVASA.',
        inputSchema: {
          type: 'object',
          required: ['name', 'phone'],
          properties: {
            name: { type: 'string' },
            phone: { type: 'string' },
            email: { type: 'string' },
            serviceType: { type: 'string' },
            passengers: { type: 'string' },
            originDestination: { type: 'string' },
          },
        },
        execute: async (args) => {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...args, sourcePage: window.location.pathname }),
          });
          return await res.json();
        },
      });
    } catch {
      // ignore if browser blocks registration
    }
  }, []);
  return null;
}

export default function App() {
  return (
    <CmsProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <AgenticBridge />
        <div className="min-h-screen flex flex-col bg-white text-[#0D0E12]">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#C8102E] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
          >
            Saltar al contenido principal
          </a>

          <Header />

          <main id="main-content" className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/flota" element={<FleetPage />} />
              <Route path="/flota/:slug" element={<VehicleDetailPage />} />
              <Route path="/servicios" element={<ServicesPage />} />
              <Route path="/servicios/:slug" element={<ServiceDetailPage />} />
              <Route path="/destinos" element={<DestinationsPage />} />
              <Route path="/destinos/:slug" element={<DestinationDetailPage />} />
              <Route path="/galeria" element={<Navigate to="/nosotros#galeria" replace />} />
              <Route path="/nosotros" element={<AboutPage />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="/cms" element={<CmsPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          <Footer />
          <FloatingWhatsApp />
        </div>
      </BrowserRouter>
    </CmsProvider>
  );
}
