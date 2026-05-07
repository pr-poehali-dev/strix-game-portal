import { useState, useEffect, useCallback } from "react";
import { teams as initTeams, players as initPlayers, tournaments as initTournaments, news as initNews, matches as initMatches, STRYX_LOGO } from "@/data/mockData";
import Icon from "@/components/ui/icon";

interface AdminPanelProps {
  onClose: () => void;
}

const ADMIN_PASSWORD = "stryx2024";

type DataItem = { id: number; [key: string]: unknown };

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  const [teamsList, setTeamsList] = useState<DataItem[]>(initTeams as unknown as DataItem[]);
  const [playersList, setPlayersList] = useState<DataItem[]>(initPlayers as unknown as DataItem[]);
  const [matchesList, setMatchesList] = useState<DataItem[]>(initMatches as unknown as DataItem[]);
  const [tournamentsList, setTournamentsList] = useState<DataItem[]>(initTournaments as unknown as DataItem[]);
  const [newsList, setNewsList] = useState<DataItem[]>(initNews as unknown as DataItem[]);

  const [editingItem, setEditingItem] = useState<DataItem | null>(null);
  const [editSection, setEditSection] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      if (editingItem) { setEditingItem(null); return; }
      onClose();
    }
  }, [onClose, editingItem]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const getList = (section: string) => {
    if (section === "teams") return teamsList;
    if (section === "players") return playersList;
    if (section === "matches") return matchesList;
    if (section === "tournaments") return tournamentsList;
    if (section === "news") return newsList;
    return [];
  };

  const setList = (section: string, list: DataItem[]) => {
    if (section === "teams") setTeamsList(list);
    else if (section === "players") setPlayersList(list);
    else if (section === "matches") setMatchesList(list);
    else if (section === "tournaments") setTournamentsList(list);
    else if (section === "news") setNewsList(list);
  };

  const handleDelete = (section: string, id: number) => {
    const list = getList(section).filter(i => i.id !== id);
    setList(section, list);
  };

  const handleSave = (section: string, item: DataItem) => {
    const list = getList(section);
    const idx = list.findIndex(i => i.id === item.id);
    if (idx >= 0) {
      const newList = [...list];
      newList[idx] = item;
      setList(section, newList);
    } else {
      const newId = Math.max(0, ...list.map(i => i.id)) + 1;
      setList(section, [...list, { ...item, id: newId }]);
    }
    setEditingItem(null);
    setShowAddForm(false);
  };

  const tabs = [
    { key: "dashboard", label: "Дашборд", icon: "LayoutDashboard" },
    { key: "teams", label: "Команды", icon: "Shield" },
    { key: "players", label: "Игроки", icon: "Users" },
    { key: "matches", label: "Матчи", icon: "Swords" },
    { key: "tournaments", label: "Турниры", icon: "Trophy" },
    { key: "news", label: "Новости", icon: "Newspaper" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden animate-scale-in flex flex-col"
        style={{
          background: "rgba(8,12,18,0.88)",
          backdropFilter: "blur(40px) saturate(200%)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 0 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8"
          style={{ background: "rgba(0,212,245,0.04)" }}>
          <div className="flex items-center gap-3">
            <img src={STRYX_LOGO} alt="STRYX" className="h-7 w-auto object-contain" />
            <span className="font-rajdhani font-bold text-white text-lg tracking-wider uppercase">Admin Panel</span>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        {!authed ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-sm text-center">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: "rgba(0,212,245,0.1)", border: "1px solid rgba(0,212,245,0.25)" }}>
                <Icon name="Lock" size={28} className="text-[var(--stryx-cyan)]" />
              </div>
              <h2 className="font-rajdhani font-bold text-white text-xl mb-1">Вход в панель</h2>
              <p className="text-white/40 text-sm mb-6">Введите пароль администратора</p>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (password === ADMIN_PASSWORD ? (setAuthed(true), setError("")) : setError("Неверный пароль"))}
                placeholder="Пароль..." autoFocus
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-[var(--stryx-cyan)] transition-colors text-center mb-2" />
              {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
              <button onClick={() => password === ADMIN_PASSWORD ? (setAuthed(true), setError("")) : setError("Неверный пароль")}
                className="stryx-btn w-full py-3 rounded-sm text-sm font-rajdhani font-bold tracking-widest uppercase">
                Войти
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-44 border-r border-white/8 flex flex-col py-3 shrink-0"
              style={{ background: "rgba(0,0,0,0.2)" }}>
              {tabs.map(t => (
                <button key={t.key} onClick={() => { setActiveTab(t.key); setEditingItem(null); setShowAddForm(false); }}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-rajdhani font-bold tracking-wide uppercase transition-all ${
                    activeTab === t.key
                      ? "text-[var(--stryx-cyan)] bg-[var(--stryx-cyan-dim)] border-r-2 border-[var(--stryx-cyan)]"
                      : "text-white/40 hover:text-white"
                  }`}>
                  <Icon name={t.icon} size={14} fallback="Circle" />
                  {t.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {activeTab === "dashboard" && (
                <AdminDashboard
                  counts={{ teams: teamsList.length, players: playersList.length, matches: matchesList.length, tournaments: tournamentsList.length, news: newsList.length }}
                />
              )}
              {activeTab !== "dashboard" && (
                <AdminSection
                  title={tabs.find(t => t.key === activeTab)?.label ?? ""}
                  section={activeTab}
                  items={getList(activeTab)}
                  editingItem={editingItem}
                  showAddForm={showAddForm}
                  onEdit={(item) => { setEditingItem(item); setEditSection(activeTab); setShowAddForm(false); }}
                  onDelete={(id) => handleDelete(activeTab, id)}
                  onSave={(item) => handleSave(editSection || activeTab, item)}
                  onAdd={() => { setShowAddForm(true); setEditingItem({ id: 0 }); setEditSection(activeTab); }}
                  onCancel={() => { setEditingItem(null); setShowAddForm(false); }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminDashboard({ counts }: { counts: Record<string, number> }) {
  const stats = [
    { label: "Команд", val: counts.teams, icon: "Shield", color: "text-blue-400" },
    { label: "Игроков", val: counts.players, icon: "Users", color: "text-green-400" },
    { label: "Матчей", val: counts.matches, icon: "Swords", color: "text-yellow-400" },
    { label: "Турниров", val: counts.tournaments, icon: "Trophy", color: "text-[var(--stryx-cyan)]" },
    { label: "Новостей", val: counts.news, icon: "Newspaper", color: "text-purple-400" },
  ];

  return (
    <div>
      <h2 className="section-title text-sm mb-4 text-white/50">Обзор системы</h2>
      <div className="grid grid-cols-3 gap-3 mb-5">
        {stats.map(s => (
          <div key={s.label} className="glass-card rounded-lg p-4">
            <div className={`${s.color} mb-2`}>
              <Icon name={s.icon} size={18} fallback="Circle" />
            </div>
            <div className="font-rajdhani font-black text-3xl text-white">{s.val}</div>
            <div className="text-white/30 text-xs uppercase tracking-wider font-rajdhani">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="glass-card rounded-lg p-4">
        <h3 className="text-white/40 text-xs font-rajdhani uppercase tracking-widest mb-2">Инструкция</h3>
        <div className="space-y-1 text-white/30 text-xs font-mono">
          <div>• Выберите раздел в левом меню</div>
          <div>• Нажмите ✏️ для редактирования или 🗑️ для удаления</div>
          <div>• Нажмите «+ Добавить» для нового элемента</div>
          <div>• Для загрузки фото вставьте URL изображения</div>
          <div>• ESC — закрыть панель или форму</div>
        </div>
      </div>
    </div>
  );
}

function AdminSection({
  title, section, items, editingItem, showAddForm,
  onEdit, onDelete, onSave, onAdd, onCancel
}: {
  title: string; section: string; items: DataItem[];
  editingItem: DataItem | null; showAddForm: boolean;
  onEdit: (item: DataItem) => void;
  onDelete: (id: number) => void;
  onSave: (item: DataItem) => void;
  onAdd: () => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingItem) {
      const data: Record<string, string> = {};
      Object.entries(editingItem).forEach(([k, v]) => { data[k] = String(v ?? ""); });
      setFormData(data);
    }
  }, [editingItem]);

  const getItemDisplay = (item: DataItem) => {
    if (section === "teams") return { name: `${item.name}`, info: `Ранг #${item.rank} · ${item.country}` };
    if (section === "players") return { name: String(item.nickname ?? ""), info: `${item.teamName} · ${item.role}` };
    if (section === "matches") return { name: `${item.team1 ? (item.team1 as { name: string }).name : "?"} vs ${item.team2 ? (item.team2 as { name: string }).name : "?"}`, info: `${item.status} · ${item.date}` };
    if (section === "tournaments") return { name: String(item.name ?? ""), info: `${item.prizePool} · ${item.status}` };
    if (section === "news") return { name: String(item.title ?? ""), info: `${item.category} · ${item.date}` };
    return { name: String(item.id), info: "" };
  };

  const getFormFields = () => {
    if (section === "teams") return ["name", "tag", "country", "rank", "rating", "wins", "losses", "winRate", "prize", "description", "logo"];
    if (section === "players") return ["nickname", "realName", "age", "country", "role", "teamName", "rating", "kd", "adr", "kast", "headshots", "maps", "kills", "deaths", "assists", "prize", "photo"];
    if (section === "matches") return ["tournament", "format", "date", "time", "status", "betsUrl", "stream"];
    if (section === "tournaments") return ["name", "organizer", "status", "startDate", "endDate", "prizePool", "teams", "location", "format", "description", "image"];
    if (section === "news") return ["title", "excerpt", "content", "date", "category", "author", "image"];
    return [];
  };

  const isEditing = editingItem !== null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title text-base text-white/60">{title} ({items.length})</h2>
        {!isEditing && (
          <button onClick={onAdd} className="stryx-btn px-3 py-1.5 rounded-sm text-xs font-rajdhani font-bold tracking-widest uppercase flex items-center gap-1">
            <Icon name="Plus" size={13} /> Добавить
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="glass-card rounded-xl p-5">
          <h3 className="section-title text-sm mb-4 text-[var(--stryx-cyan)]">
            {showAddForm ? "Добавить" : "Редактировать"} — {title}
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {getFormFields().map(field => (
              <div key={field}>
                <label className="text-white/40 text-xs font-rajdhani uppercase tracking-wider mb-1 block">{field}</label>
                {field === "content" || field === "description" || field === "excerpt" ? (
                  <textarea
                    value={formData[field] ?? ""}
                    onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-[var(--stryx-cyan)] transition-colors resize-none"
                  />
                ) : (
                  <input
                    value={formData[field] ?? ""}
                    onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-[var(--stryx-cyan)] transition-colors"
                    placeholder={field === "logo" || field === "image" || field === "photo" ? "Вставьте URL изображения..." : ""}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => onSave(formData as unknown as DataItem)}
              className="stryx-btn px-4 py-2 rounded-sm text-xs font-rajdhani font-bold tracking-widest uppercase flex items-center gap-1">
              <Icon name="Check" size={13} /> Сохранить
            </button>
            <button onClick={onCancel}
              className="stryx-btn-outline px-4 py-2 rounded-sm text-xs flex items-center gap-1">
              <Icon name="X" size={13} /> Отмена
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-xl overflow-hidden">
          {items.length === 0 && (
            <div className="py-8 text-center text-white/30 font-rajdhani">Список пуст</div>
          )}
          {items.map((item, i) => {
            const { name, info } = getItemDisplay(item);
            return (
              <div key={item.id}
                className={`flex items-center justify-between px-4 py-3 ${i < items.length - 1 ? "border-b border-white/5" : ""} hover:bg-white/3 group`}>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-white/20 font-mono text-xs w-5 shrink-0">{item.id}</span>
                  <div className="min-w-0">
                    <div className="font-rajdhani font-bold text-white text-sm truncate">{name}</div>
                    <div className="text-white/30 text-xs truncate">{info}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <button onClick={() => onEdit(item)}
                    className="text-white/30 hover:text-[var(--stryx-cyan)] transition-colors p-1.5 rounded-sm hover:bg-[var(--stryx-cyan-dim)]">
                    <Icon name="Pencil" size={14} />
                  </button>
                  <button onClick={() => onDelete(item.id)}
                    className="text-white/30 hover:text-red-400 transition-colors p-1.5 rounded-sm hover:bg-red-400/10">
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
