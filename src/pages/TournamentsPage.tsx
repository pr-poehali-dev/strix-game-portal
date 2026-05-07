import { useState } from "react";
import { tournaments, teams } from "@/data/mockData";
import Icon from "@/components/ui/icon";

interface TournamentsPageProps {
  onNavigate: (page: string, detail?: { type: string; id: number }) => void;
}

export default function TournamentsPage({ onNavigate }: TournamentsPageProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const tournament = selected ? tournaments.find(t => t.id === selected) : null;

  if (tournament) {
    const participants = teams.filter(t => tournament.participants.includes(t.id));
    return (
      <div className="animate-fade-in space-y-6">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-white/40 hover:text-[var(--stryx-cyan)] transition-colors text-sm font-rajdhani">
          <Icon name="ArrowLeft" size={16} /> Назад к турнирам
        </button>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-4xl">{tournament.logo}</span>
            </div>
            <div className="flex-1">
              <h1 className="font-rajdhani font-black text-3xl text-white mb-1">{tournament.name}</h1>
              <div className="text-white/40 text-sm mb-3">{tournament.description}</div>
              <div className="flex flex-wrap gap-6">
                {[
                  { label: "Призовой фонд", val: tournament.prizePool, accent: true },
                  { label: "Команд", val: tournament.teams },
                  { label: "Локация", val: tournament.location },
                  { label: "Даты", val: `${tournament.startDate} — ${tournament.endDate}` },
                  { label: "Формат", val: tournament.format },
                ].map(s => (
                  <div key={s.label}>
                    <div className={`font-mono font-bold text-lg ${s.accent ? "text-[var(--stryx-cyan)]" : "text-white"}`}>{s.val}</div>
                    <div className="text-white/30 text-xs uppercase tracking-wider font-rajdhani">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Prize distribution */}
        <div className="glass-card rounded-xl p-5">
          <h2 className="section-title text-sm mb-4 text-white/60">Распределение призовых</h2>
          <div className="space-y-2">
            {tournament.prize_distribution.map((pd, i) => (
              <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/3">
                <span className="font-rajdhani text-white/70">{pd.place}</span>
                <span className="font-mono font-bold text-[var(--stryx-cyan)]">{pd.prize}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Participants */}
        <div className="glass-card rounded-xl p-5">
          <h2 className="section-title text-sm mb-4 text-white/60">Участники</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {participants.map(t => (
              <div
                key={t.id}
                className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer group"
                onClick={() => onNavigate("team-detail", { type: "team", id: t.id })}
              >
                <span className="text-2xl">{t.logo}</span>
                <div>
                  <div className="font-rajdhani font-bold text-white text-sm group-hover:text-[var(--stryx-cyan)] transition-colors">{t.name}</div>
                  <div className="text-white/30 text-xs">#{t.rank}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-5 bg-[var(--stryx-cyan)] rounded-full" />
        <h1 className="section-title text-2xl">Турниры</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tournaments.map(t => (
          <div key={t.id} onClick={() => setSelected(t.id)} className="glass-card rounded-xl p-5 cursor-pointer group">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">{t.logo}</span>
              </div>
              <div>
                <div className="font-rajdhani font-bold text-white group-hover:text-[var(--stryx-cyan)] transition-colors">{t.name}</div>
                <div className="text-white/40 text-xs mt-0.5">{t.organizer}</div>
                <span className={`inline-block mt-1.5 text-xs font-rajdhani font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                  t.status === "active" ? "text-green-400 bg-green-400/10" : "text-yellow-400 bg-yellow-400/10"
                }`}>
                  {t.status === "active" ? "Активен" : "Скоро"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-white/6 pt-3">
              <div>
                <div className="text-[var(--stryx-cyan)] font-mono text-sm font-bold">{t.prizePool}</div>
                <div className="text-white/30 text-xs">Призовые</div>
              </div>
              <div>
                <div className="text-white/70 font-mono text-sm">{t.teams}</div>
                <div className="text-white/30 text-xs">Команд</div>
              </div>
              <div>
                <div className="text-white/70 text-sm font-rajdhani truncate">{t.location}</div>
                <div className="text-white/30 text-xs">Место</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
