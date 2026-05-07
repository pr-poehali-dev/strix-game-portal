import { useState } from "react";
import Icon from "@/components/ui/icon";

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
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/8">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[var(--stryx-cyan)] to-cyan-400 flex items-center justify-center text-black font-rajdhani font-black text-sm">
            SX
          </div>
          <span className="stryx-logo-text text-white text-lg tracking-[0.2em]">STRYX</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`nav-link px-3 py-1.5 rounded-sm ${activePage === item.id ? "active text-[var(--stryx-cyan)]" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onAdminOpen}
            className="hidden md:flex items-center gap-1.5 stryx-btn-outline px-3 py-1.5 rounded-sm text-xs"
          >
            <Icon name="Shield" size={13} />
            Админ
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
        <div className="lg:hidden glass border-t border-white/8 px-4 py-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
              className={`nav-link text-left px-3 py-2 rounded-sm ${activePage === item.id ? "active bg-[var(--stryx-cyan-dim)]" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
