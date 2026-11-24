import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useCms } from '../context/CmsContext';

const NAV_LINKS = [
  { to: '/servicios', label: 'Servicios' },
  { to: '/flota', label: 'Flota' },
  { to: '/destinos', label: 'Destinos' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

export function Header() {
  const { cms } = useCms();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleReserveClick = () => {
    setMobileOpen(false);
    const quoteEl = document.getElementById('cotizar');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#6c1323] border-b border-[#fab511]/25 shadow-md">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 md:h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Official JUVASA Logo */}
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          aria-label="Transporte JUVASA - Inicio"
          className="flex items-center shrink-0 select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fab511]"
          data-agent-entity="brand-home"
        >
          <img
            src={cms.contact.logoUrl || 'https://transportejuvasa.com.pe/media-juvasa/img/logo01.webp'}
            alt={cms.contact.brandName}
            width={168}
            height={48}
            referrerPolicy="no-referrer"
            className="h-10 sm:h-11 w-auto object-contain"
          />
        </Link>

        {/* Zone 2: 5 concise white navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-white/95" aria-label="Navegación principal">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `whitespace-nowrap shrink-0 py-1.5 transition-colors border-b-2 ${
                  isActive
                    ? 'text-[#fab511] border-[#fab511]'
                    : 'border-transparent hover:text-[#fab511]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Single Corporate Yellow Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleReserveClick}
            data-agent-action="scroll-to-quote"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs uppercase tracking-wider font-extrabold text-[#6c1323] bg-[#fab511] rounded-xl hover:bg-[#e2a20b] shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Reservar
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-white/20 text-white hover:bg-[#5c0d12] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#5c0d12] border-t border-[#fab511]/20 px-4 py-4 space-y-1">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:text-[#fab511] hover:bg-black/20"
          >
            Inicio
          </Link>
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm font-semibold ${
                  isActive ? 'bg-[#fab511]/15 text-[#fab511]' : 'text-white/90 hover:text-[#fab511] hover:bg-black/20'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-white/15">
            <button
              type="button"
              onClick={handleReserveClick}
              className="w-full py-3 px-4 rounded-xl bg-[#fab511] text-[#6c1323] text-xs uppercase tracking-wider font-extrabold hover:bg-[#e2a20b] transition-colors cursor-pointer"
            >
              Reservar Ahora
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
