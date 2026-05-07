import { matches, teams, players } from "@/data/mockData";
import Icon from "@/components/ui/icon";

interface MatchDetailPageProps {
  matchId: number;
  onNavigate: (page: string, detail?: { type: string; id: number }) => void;
}

export default function MatchDetailPage({ matchId, onNavigate }: MatchDetailPageProps) {
  const match = matches.find(m => m.id === matchId);
  if (!match) return <div className="text-white/40 p-8">Матч не найден</div>;

  const isFinished = match.status === "finished";
  const team1Data = teams.find(t => t.id === match.team1.id);
  const team2Data = teams.find(t => t.id === match.team2.id);

  const recentMatches = matches.filter(m =>
    m.status === "finished" &&
    (m.team1.id === match.team1.id || m.team2.id === match.team1.id ||
     m.team1.id === match.team2.id || m.team2.id === match.team2.id) &&
    m.id !== match.id
  ).slice(0, 4);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Back */}
      <button
        onClick={() => onNavigate("matches")}
        className="flex items-center gap-2 text-white/40 hover:text-[var(--stryx-cyan)] transition-colors text-sm font-rajdhani"
      >
        <Icon name="ArrowLeft" size={16} />
        Назад к матчам
      </button>

      {/* Match header */}
      <div className="glass-card rounded-xl p-6">
        <div className="text-xs text-white/40 font-mono mb-1">{match.tournament} · {match.format}</div>
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-4 flex-1 cursor-pointer group"
            onClick={() => team1Data && onNavigate("team-detail", { type: "team", id: team1Data.id })}
          >
            <span className="text-5xl">{match.team1.logo}</span>
            <div>
              <div className="font-rajdhani font-black text-2xl text-white group-hover:text-[var(--stryx-cyan)] transition-colors">{match.team1.name}</div>
              <div className="text-white/40 text-sm">#{team1Data?.rank ?? "—"} в мире</div>
            </div>
          </div>

          <div className="text-center px-8">
            {isFinished ? (
              <div className="flex items-center gap-3">
                <span className={`font-rajdhani font-black text-5xl ${(match.score1 ?? 0) > (match.score2 ?? 0) ? "text-[var(--stryx-cyan)]" : "text-white/30"}`}>{match.score1}</span>
                <span className="text-white/20 text-2xl">:</span>
                <span className={`font-rajdhani font-black text-5xl ${(match.score2 ?? 0) > (match.score1 ?? 0) ? "text-[var(--stryx-cyan)]" : "text-white/30"}`}>{match.score2}</span>
              </div>
            ) : (
              <div>
                <div className="font-rajdhani font-bold text-white/30 text-xl tracking-widest">VS</div>
                <div className="text-[var(--stryx-cyan)] font-mono text-sm mt-1">{match.date} {match.time}</div>
              </div>
            )}
            <div className="mt-2">
              <span className={`text-xs font-rajdhani font-bold uppercase tracking-widest ${isFinished ? "text-white/30" : "text-[var(--stryx-cyan)]"}`}>
                {isFinished ? "Завершён" : "Предстоящий"}
              </span>
            </div>
          </div>

          <div
            className="flex items-center gap-4 flex-1 justify-end cursor-pointer group"
            onClick={() => team2Data && onNavigate("team-detail", { type: "team", id: team2Data.id })}
          >
            <div className="text-right">
              <div className="font-rajdhani font-black text-2xl text-white group-hover:text-[var(--stryx-cyan)] transition-colors">{match.team2.name}</div>
              <div className="text-white/40 text-sm">#{team2Data?.rank ?? "—"} в мире</div>
            </div>
            <span className="text-5xl">{match.team2.logo}</span>
          </div>
        </div>
      </div>

      {/* Map scores */}
      {isFinished && match.maps.length > 0 && (
        <div className="glass-card rounded-xl p-5">
          <h3 className="section-title text-sm mb-3 text-white/60">Счёт по картам</h3>
          <div className="space-y-2">
            {match.maps.map((m, i) => (
              <div key={i} className="flex items-center justify-between bg-white/3 rounded-lg px-4 py-2">
                <span className="text-[var(--stryx-cyan)] font-mono text-sm font-bold">{m.score1}</span>
                <span className="text-white/50 font-rajdhani text-sm">{m.name}</span>
                <span className="text-white/50 font-mono text-sm">{m.score2}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      {isFinished && match.stats && (
        <div className="glass-card rounded-xl p-5">
          <h3 className="section-title text-sm mb-4 text-white/60">Статистика команд</h3>
          <div className="grid grid-cols-1 gap-3">
            {(["kd", "adr", "kast", "rating", "hs"] as const).map(key => (
              <div key={key}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[var(--stryx-cyan)] font-mono font-bold text-sm">{match.stats!.team1[key]}</span>
                  <span className="text-white/30 text-xs font-rajdhani uppercase tracking-widest">{key.toUpperCase()}</span>
                  <span className="text-white/50 font-mono text-sm">{match.stats!.team2[key]}</span>
                </div>
                <div className="relative h-1 bg-white/8 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-[var(--stryx-cyan)] rounded-full"
                    style={{ width: "55%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bets button for upcoming */}
      {!isFinished && match.betsUrl && (
        <a
          href={match.betsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block glass-card rounded-xl p-4 text-center hover:border-[var(--stryx-cyan)] transition-all group"
        >
          <div className="flex items-center justify-center gap-2">
            <Icon name="TrendingUp" size={18} className="text-[var(--stryx-cyan)]" />
            <span className="font-rajdhani font-bold text-white group-hover:text-[var(--stryx-cyan)] tracking-widest uppercase">
              Сделать ставку — WhyNot Game
            </span>
          </div>
        </a>
      )}

      {/* Recent h2h matches */}
      {recentMatches.length > 0 && (
        <div>
          <h3 className="section-title text-sm mb-3 text-white/60">Недавние игры команд</h3>
          <div className="grid gap-2 md:grid-cols-2">
            {recentMatches.map(rm => (
              <div key={rm.id} className="glass-card rounded-lg px-4 py-3 flex items-center justify-between">
                <span className="font-rajdhani text-sm text-white/60">{rm.team1.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`font-mono font-bold text-sm ${(rm.score1 ?? 0) > (rm.score2 ?? 0) ? "text-[var(--stryx-cyan)]" : "text-white/30"}`}>{rm.score1}</span>
                  <span className="text-white/20">:</span>
                  <span className={`font-mono font-bold text-sm ${(rm.score2 ?? 0) > (rm.score1 ?? 0) ? "text-[var(--stryx-cyan)]" : "text-white/30"}`}>{rm.score2}</span>
                </div>
                <span className="font-rajdhani text-sm text-white/60">{rm.team2.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team rosters */}
      <div className="grid md:grid-cols-2 gap-4">
        {[{ team: team1Data, match_team: match.team1 }, { team: team2Data, match_team: match.team2 }].map(({ team, match_team }) => (
          team ? (
            <div key={team.id} className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{match_team.logo}</span>
                <span className="font-rajdhani font-bold text-white">{team.name}</span>
              </div>
              <div className="space-y-2">
                {team.players.slice(0, 5).map(pid => {
                  const p = players.find(pl => pl.id === pid);
                  return p ? (
                    <div
                      key={p.id}
                      className="flex items-center justify-between py-1 px-2 rounded hover:bg-white/5 cursor-pointer group"
                      onClick={() => onNavigate("player-detail", { type: "player", id: p.id })}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{p.photo}</span>
                        <div>
                          <div className="font-rajdhani font-bold text-white text-sm group-hover:text-[var(--stryx-cyan)] transition-colors">{p.nickname}</div>
                          <div className="text-white/30 text-xs">{p.role}</div>
                        </div>
                      </div>
                      <div className="text-[var(--stryx-cyan)] font-mono text-xs">{p.rating}</div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
}
