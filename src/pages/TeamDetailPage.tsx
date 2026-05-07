import { teams, players, matches } from "@/data/mockData";
import Icon from "@/components/ui/icon";

interface TeamDetailPageProps {
  teamId: number;
  onNavigate: (page: string, detail?: { type: string; id: number }) => void;
}

export default function TeamDetailPage({ teamId, onNavigate }: TeamDetailPageProps) {
  const team = teams.find(t => t.id === teamId);
  if (!team) return <div className="text-white/40 p-8">Команда не найдена</div>;

  const roster = players.filter(p => team.players.includes(p.id));
  const teamMatches = matches.filter(m => m.team1.id === teamId || m.team2.id === teamId).slice(0, 6);

  return (
    <div className="animate-fade-in space-y-6">
      <button
        onClick={() => onNavigate("ranking")}
        className="flex items-center gap-2 text-white/40 hover:text-[var(--stryx-cyan)] transition-colors text-sm font-rajdhani"
      >
        <Icon name="ArrowLeft" size={16} />
        Назад к рейтингу
      </button>

      {/* Team Header */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-[var(--stryx-cyan)]/20 to-transparent border border-[var(--stryx-cyan)]/20 flex items-center justify-center">
            <span className="text-5xl">{team.logo}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-rajdhani font-black text-3xl text-white">{team.name}</h1>
              <span className="text-white/40 font-mono text-sm">[{team.tag}]</span>
              <span className="glass text-[var(--stryx-cyan)] font-rajdhani font-bold text-sm px-3 py-0.5 rounded-sm">
                #{team.rank}
              </span>
            </div>
            <div className="text-white/40 text-sm mb-3">{team.country} · {team.description}</div>
            <div className="flex gap-6">
              {[
                { label: "Рейтинг", val: team.rating.toFixed(2) },
                { label: "Победы", val: team.wins },
                { label: "Поражения", val: team.losses },
                { label: "Win%", val: `${team.winRate}%` },
                { label: "Призовые", val: team.prize },
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

      {/* Roster */}
      <div className="glass-card rounded-xl p-5">
        <h2 className="section-title text-sm mb-4 text-white/60">Состав команды</h2>
        <div className="space-y-2">
          {roster.map(p => (
            <div
              key={p.id}
              onClick={() => onNavigate("player-detail", { type: "player", id: p.id })}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center text-xl">
                  {p.photo}
                </div>
                <div>
                  <div className="font-rajdhani font-bold text-white group-hover:text-[var(--stryx-cyan)] transition-colors">
                    {p.nickname}
                  </div>
                  <div className="text-white/30 text-xs">{p.realName} · {p.country} · {p.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-right">
                <div>
                  <div className="text-[var(--stryx-cyan)] font-mono text-sm font-bold">{p.rating}</div>
                  <div className="text-white/30 text-xs">Rating</div>
                </div>
                <div>
                  <div className="text-white/60 font-mono text-sm">{p.kd}</div>
                  <div className="text-white/30 text-xs">K/D</div>
                </div>
                <div>
                  <div className="text-white/60 font-mono text-sm">{p.adr}</div>
                  <div className="text-white/30 text-xs">ADR</div>
                </div>
                <Icon name="ChevronRight" size={14} className="text-white/20 group-hover:text-[var(--stryx-cyan)] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent results */}
      <div className="glass-card rounded-xl p-5">
        <h2 className="section-title text-sm mb-4 text-white/60">Недавние матчи</h2>
        <div className="space-y-2">
          {teamMatches.map(m => {
            const isTeam1 = m.team1.id === teamId;
            const won = m.status === "finished" && ((isTeam1 && (m.score1 ?? 0) > (m.score2 ?? 0)) || (!isTeam1 && (m.score2 ?? 0) > (m.score1 ?? 0)));
            const opponent = isTeam1 ? m.team2 : m.team1;
            return (
              <div
                key={m.id}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer"
                onClick={() => onNavigate("match-detail", { type: "match", id: m.id })}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-rajdhani font-bold uppercase px-2 py-0.5 rounded-sm ${
                    m.status !== "finished" ? "text-[var(--stryx-cyan)] bg-[var(--stryx-cyan-dim)]" :
                    won ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10"
                  }`}>
                    {m.status !== "finished" ? "→" : won ? "W" : "L"}
                  </span>
                  <span className="text-white/60 font-rajdhani text-sm">vs {opponent.logo} {opponent.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/30 font-mono text-xs">{m.date}</span>
                  {m.status === "finished" && (
                    <span className="text-white/50 font-mono text-sm">{m.score1}:{m.score2}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
