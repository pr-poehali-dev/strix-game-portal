import { useState, useEffect, useCallback } from "react";
import { teams, players, tournaments, news, matches, transfers } from "@/data/mockData";
import Icon from "@/components/ui/icon";

interface AdminPanelProps {
  onClose: () => void;
}

const ADMIN_PASSWORD = "stryx2024";

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("Неверный пароль");
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const tabs = [
    { key: "dashboard", label: "Дашборд", icon: "LayoutDashboard" },
    { key: "teams", label: "Команды", icon: "Shield" },
    { key: "players", label: "Игроки", icon: "Users" },
    { key: "matches", label: "Матчи", icon: "Swords" },
    { key: "tournaments", label: "Турниры", icon: "Trophy" },
    { key: "news", label: "Новости", icon: "Newspaper" },
    { key: "transfers", label: "Трансферы", icon: "ArrowLeftRight" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] glass rounded-2xl border border-white/12 overflow-hidden animate-scale-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={18} className="text-[var(--stryx-cyan)]" />
            <span className="font-rajdhani font-bold text-white text-lg tracking-wider uppercase">
              STRYX Admin Panel
            </span>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        {!authed ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-sm text-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--stryx-cyan-dim)] border border-[var(--stryx-cyan)]/30 flex items-center justify-center mx-auto mb-4">
                <Icon name="Lock" size={28} className="text-[var(--stryx-cyan)]" />
              </div>
              <h2 className="font-rajdhani font-bold text-white text-xl mb-1">Вход в панель</h2>
              <p className="text-white/40 text-sm mb-6">Введите пароль администратора</p>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                placeholder="Пароль..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-[var(--stryx-cyan)] transition-colors text-center mb-2"
                autoFocus
              />
              {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
              <button onClick={handleLogin} className="stryx-btn w-full py-3 rounded-sm text-sm font-rajdhani font-bold tracking-widest uppercase">
                Войти
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-48 border-r border-white/8 flex flex-col py-3 shrink-0">
              {tabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-rajdhani font-bold tracking-wide uppercase transition-all ${
                    activeTab === t.key
                      ? "text-[var(--stryx-cyan)] bg-[var(--stryx-cyan-dim)] border-r-2 border-[var(--stryx-cyan)]"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  <Icon name={t.icon} size={14} fallback="Circle" />
                  {t.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {activeTab === "dashboard" && <AdminDashboard />}
              {activeTab === "teams" && <AdminTable title="Команды" items={teams.map(t => ({ id: t.id, name: `${t.logo} ${t.name}`, info: `Ранг #${t.rank} · ${t.country}` }))} />}
              {activeTab === "players" && <AdminTable title="Игроки" items={players.map(p => ({ id: p.id, name: `${p.photo} ${p.nickname}`, info: `${p.teamName} · ${p.role}` }))} />}
              {activeTab === "matches" && <AdminTable title="Матчи" items={matches.map(m => ({ id: m.id, name: `${m.team1.name} vs ${m.team2.name}`, info: `${m.status} · ${m.date}` }))} />}
              {activeTab === "tournaments" && <AdminTable title="Турниры" items={tournaments.map(t => ({ id: t.id, name: `${t.logo} ${t.name}`, info: `${t.prizePool} · ${t.status}` }))} />}
              {activeTab === "news" && <AdminTable title="Новости" items={news.map(n => ({ id: n.id, name: n.title, info: `${n.category} · ${n.date}` }))} />}
              {activeTab === "transfers" && <AdminTable title="Трансферы" items={transfers.map(tr => ({ id: tr.id, name: tr.player.nickname, info: `${tr.fromTeam?.name ?? "FA"} → ${tr.toTeam.name}` }))} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminDashboard() {
  const stats = [
    { label: "Команд", val: teams.length, icon: "Shield", color: "text-blue-400" },
    { label: "Игроков", val: players.length, icon: "Users", color: "text-green-400" },
    { label: "Матчей", val: matches.length, icon: "Swords", color: "text-yellow-400" },
    { label: "Турниров", val: tournaments.length, icon: "Trophy", color: "text-[var(--stryx-cyan)]" },
    { label: "Новостей", val: news.length, icon: "Newspaper", color: "text-purple-400" },
    { label: "Трансферов", val: transfers.length, icon: "ArrowLeftRight", color: "text-orange-400" },
  ];

  return (
    <div>
      <h2 className="section-title text-base mb-4 text-white/60">Обзор</h2>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map(s => (
          <div key={s.label} className="glass-card rounded-lg p-4">
            <div className={`${s.color} mb-1`}>
              <Icon name={s.icon} size={20} fallback="Circle" />
            </div>
            <div className="font-rajdhani font-black text-3xl text-white">{s.val}</div>
            <div className="text-white/30 text-xs uppercase tracking-wider font-rajdhani">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="glass-card rounded-lg p-4">
        <h3 className="text-white/40 text-xs font-rajdhani uppercase tracking-widest mb-3">Быстрые действия</h3>
        <div className="flex flex-wrap gap-2">
          {["Добавить команду", "Добавить игрока", "Добавить матч", "Добавить новость"].map(action => (
            <button key={action} className="stryx-btn-outline px-3 py-1.5 rounded-sm text-xs font-rajdhani font-bold uppercase tracking-wider">
              + {action}
            </button>
          ))}
        </div>
        <p className="text-white/20 text-xs mt-3 font-mono">Полноценные формы добавления/редактирования будут подключены после настройки базы данных.</p>
      </div>
    </div>
  );
}

function AdminTable({ title, items }: { title: string; items: { id: number; name: string; info: string }[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title text-base text-white/60">{title}</h2>
        <button className="stryx-btn px-3 py-1.5 rounded-sm text-xs font-rajdhani font-bold tracking-widest uppercase">
          + Добавить
        </button>
      </div>
      <div className="glass-card rounded-lg overflow-hidden">
        {items.map((item, i) => (
          <div key={item.id} className={`flex items-center justify-between px-4 py-3 ${i < items.length - 1 ? "border-b border-white/5" : ""} hover:bg-white/3 group`}>
            <div className="flex items-center gap-3">
              <span className="text-white/20 font-mono text-xs w-6">{item.id}</span>
              <div>
                <div className="font-rajdhani font-bold text-white text-sm">{item.name}</div>
                <div className="text-white/30 text-xs">{item.info}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-white/40 hover:text-[var(--stryx-cyan)] transition-colors">
                <Icon name="Pencil" size={14} />
              </button>
              <button className="text-white/40 hover:text-red-400 transition-colors">
                <Icon name="Trash2" size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
