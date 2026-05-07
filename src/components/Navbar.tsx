import { useState } from "react";
import Icon from "@/components/ui/icon";
import { STRYX_LOGO } from "@/data/mockData";

const navItems = [
  { id: "home", label: "Главная" },
  { id: "matches", label: "Матчи" },
  { id: "tournaments", label: "Турниры" },
  { id: "transfers", label: "Трансферы" },
  { id: "ranking", label: "Рейтинг" },
  { id: "organizers", label: "Организаторы" },
  { id: "news", label: "Новости" },
  { id: "contacts", label: "Контакты" },
];

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onAdminOpen: () => void;
}

export default function Navbar({ activePage, onNavigate, onAdminOpen }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{
      background: "rgba(8, 12, 18, 0.55)",
      backdropFilter: "blur(32px) saturate(200%) brightness(1.1)",
      WebkitBackdropFilter: "blur(32px) saturate(200%) brightness(1.1)",
      borderBottom: "1px solid rgba(255,255,255,0.10)",
      boxShadow: "0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
    }}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2.5 group">
          <img
            src={STRYX_LOGO}
            alt="STRYX"
            className="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(0,212,245,0.5)] transition-all group-hover:drop-shadow-[0_0_14px_rgba(0,212,245,0.8)]"
          />
          <span className="stryx-logo-text text-white text-lg tracking-[0.25em] group-hover:text-[var(--stryx-cyan)] transition-colors">
            STRYX
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`nav-link px-3 py-1.5 rounded-sm transition-all ${
                activePage === item.id
                  ? "active text-[var(--stryx-cyan)] bg-[var(--stryx-cyan-dim)]"
                  : "hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://t.me/STRYXCS2"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 stryx-btn-outline px-3 py-1.5 rounded-sm text-xs"
          >
            <Icon name="Send" size={12} />
            Telegram
          </a>
          <button
            onClick={onAdminOpen}
            className="hidden md:flex items-center gap-1.5 text-white/20 hover:text-white/50 transition-colors px-2 py-1.5 rounded-sm text-xs font-rajdhani"
            title="Ctrl+Shift+A"
          >
            <Icon name="Settings" size={14} />
          </button>
          <button
            className="lg:hidden text-white/60 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden px-4 py-3 flex flex-col gap-1"
          style={{
            background: "rgba(8,12,18,0.92)",
            backdropFilter: "blur(24px)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
              className={`nav-link text-left px-3 py-2.5 rounded-sm ${activePage === item.id ? "active bg-[var(--stryx-cyan-dim)] text-[var(--stryx-cyan)]" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
