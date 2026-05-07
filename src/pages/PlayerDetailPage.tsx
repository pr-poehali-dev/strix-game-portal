import { players, matches } from "@/data/mockData";
import Icon from "@/components/ui/icon";

interface PlayerDetailPageProps {
  playerId: number;
  onNavigate: (page: string, detail?: { type: string; id: number }) => void;
}

export default function PlayerDetailPage({ playerId, onNavigate }: PlayerDetailPageProps) {
  const player = players.find(p => p.id === playerId);
  if (!player) return <div className="text-white/40 p-8">Игрок не найден</div>;

  const recentMatches = matches.filter(m =>
    m.status === "finished" &&
    (m.team1.id === player.teamId || m.team2.id === player.teamId)
  ).slice(0, 5);

  const statBars = [
    { label: "Rating 2.0", val: player.rating, max: 2.0, format: player.rating.toFixed(2) },
    { label: "K/D Ratio", val: player.kd, max: 2.0, format: player.kd.toFixed(2) },
    { label: "ADR", val: player.adr, max: 120, format: player.adr.toFixed(1) },
    { label: "KAST%", val: player.kast, max: 100, format: `${player.kast.toFixed(1)}%` },
    { label: "HS%", val: player.headshots, max: 100, format: `${player.headshots.toFixed(1)}%` },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <button
        onClick={() => onNavigate("ranking")}
        className="flex items-center gap-2 text-white/40 hover:text-[var(--stryx-cyan)] transition-colors text-sm font-rajdhani"
      >
        <Icon name="ArrowLeft" size={16} />
        Назад
      </button>

      {/* Player Header */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-[var(--stryx-cyan)]/20 to-transparent border border-[var(--stryx-cyan)]/20 flex items-center justify-center">
            <span className="text-5xl">{player.photo}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-rajdhani font-black text-3xl text-white">{player.nickname}</h1>
              <span className="glass text-[var(--stryx-cyan)] font-rajdhani font-bold text-xs px-2 py-0.5 rounded-sm uppercase tracking-wider">
                {player.role}
              </span>
            </div>
            <div className="text-white/40 text-sm mb-1">{player.realName}</div>
            <div
              className="flex items-center gap-2 text-white/40 text-sm mb-4 cursor-pointer hover:text-[var(--stryx-cyan)] transition-colors w-fit"
              onClick={() => onNavigate("team-detail", { type: "team", id: player.teamId })}
            >
              <span className="text-base">🔱</span>
              <span>{player.teamName}</span>
              <span>·</span>
              <span>{player.country}</span>
              <span>·</span>
              <span>Возраст: {player.age}</span>
            </div>
            <div className="flex gap-6">
              {[
                { label: "Матчей", val: player.maps },
                { label: "Убийств", val: player.kills.toLocaleString() },
                { label: "Смертей", val: player.deaths.toLocaleString() },
                { label: "Призовые", val: player.prize },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-mono font-bold text-[var(--stryx-cyan)] text-lg">{s.val}</div>
                  <div className="text-white/30 text-xs uppercase tracking-wider font-rajdhani">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="glass-card rounded-xl p-5">
        <h2 className="section-title text-sm mb-5 text-white/60">Статистика</h2>
        <div className="space-y-4">
          {statBars.map(s => (
            <div key={s.label}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-white/50 text-sm font-rajdhani uppercase tracking-wider">{s.label}</span>
                <span className="text-[var(--stryx-cyan)] font-mono font-bold">{s.format}</span>
              </div>
              <div className="stat-bar">
                <div className="stat-bar-fill" style={{ width: `${Math.min((s.val / s.max) * 100, 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extra stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Impact", val: player.stats.impact.toFixed(2) },
          { label: "KPR", val: player.stats.kpr.toFixed(2) },
          { label: "DPR", val: player.stats.dpr.toFixed(2) },
          { label: "Assists", val: player.assists },
        ].map(s => (
          <div key={s.label} className="glass-card rounded-lg p-4 text-center">
            <div className="font-mono font-bold text-[var(--stryx-cyan)] text-xl">{s.val}</div>
            <div className="text-white/30 text-xs uppercase tracking-wider font-rajdhani mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent matches */}
      <div className="glass-card rounded-xl p-5">
        <h2 className="section-title text-sm mb-4 text-white/60">Последние матчи команды</h2>
        <div className="space-y-2">
          {recentMatches.map(m => (
            <div
              key={m.id}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer"
              onClick={() => onNavigate("match-detail", { type: "match", id: m.id })}
            >
              <div className="flex items-center gap-3">
                <span className="text-white/50 font-rajdhani text-sm">{m.team1.logo} {m.team1.name}</span>
                <span className="font-mono text-white/40 text-sm">{m.score1}:{m.score2}</span>
                <span className="text-white/50 font-rajdhani text-sm">{m.team2.logo} {m.team2.name}</span>
              </div>
              <span className="text-white/30 font-mono text-xs">{m.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
