import { matches, teams, players, STRYX_LOGO } from "@/data/mockData";
import Icon from "@/components/ui/icon";

const isUrl = (s: string | null | undefined) =>
  typeof s === "string" && (s.startsWith("http") || s.startsWith("/"));

interface MatchDetailPageProps {
  matchId: number;
  onNavigate: (page: string, detail?: { type: string; id: number }) => void;
}

export default function MatchDetailPage({ matchId, onNavigate }: MatchDetailPageProps) {
  const match = matches.find(m => m.id === matchId);
  if (!match) return <div className="text-white/40 p-8">Матч не найден</div>;

  const isFinished = match.status === "finished";
  const isUpcoming = match.status === "upcoming";
  const team1Data = teams.find(t => t.id === match.team1.id);
  const team2Data = teams.find(t => t.id === match.team2.id);

  const recentH2H = matches.filter(m =>
    m.status === "finished" &&
    ((m.team1.id === match.team1.id && m.team2.id === match.team2.id) ||
     (m.team1.id === match.team2.id && m.team2.id === match.team1.id)) &&
    m.id !== match.id
  );

  const recentTeam1 = matches.filter(m =>
    m.status === "finished" &&
    (m.team1.id === match.team1.id || m.team2.id === match.team1.id) &&
    m.id !== match.id
  ).slice(0, 4);

  const recentTeam2 = matches.filter(m =>
    m.status === "finished" &&
    (m.team1.id === match.team2.id || m.team2.id === match.team2.id) &&
    m.id !== match.id
  ).slice(0, 4);

  const team1Players = players.filter(p => team1Data && team1Data.players.includes(p.id));
  const team2Players = players.filter(p => team2Data && team2Data.players.includes(p.id));

  return (
    <div className="animate-fade-in space-y-5">
      <button onClick={() => onNavigate("matches")} className="flex items-center gap-2 text-white/40 hover:text-[var(--stryx-cyan)] transition-colors text-sm font-rajdhani">
        <Icon name="ArrowLeft" size={16} /> Назад к матчам
      </button>

      {/* Match header */}
      <div className="rounded-xl overflow-hidden" style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.09)",
      }}>
        <div className="px-6 py-2 border-b border-white/6 flex items-center justify-between">
          <span className="text-xs text-white/40 font-mono">{match.tournament} · {match.format}</span>
          <span className={`text-xs font-rajdhani font-bold uppercase tracking-widest ${isFinished ? "text-white/30" : "text-[var(--stryx-cyan)]"}`}>
            {isFinished ? "Завершён" : match.date + " " + match.time}
          </span>
        </div>

        <div className="flex items-center justify-between px-6 py-6">
          {/* Team 1 */}
          <div className="flex items-center gap-4 flex-1 cursor-pointer group" onClick={() => team1Data && onNavigate("team-detail", { type: "team", id: team1Data.id })}>
            <div className="w-20 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
              {isUrl(match.team1.logo) ? (
                <img src={match.team1.logo} alt="" className="w-16 h-16 object-contain" />
              ) : (
                <span className="text-5xl">{match.team1.logo}</span>
              )}
            </div>
            <div>
              <div className="font-rajdhani font-black text-2xl text-white group-hover:text-[var(--stryx-cyan)] transition-colors">{match.team1.name}</div>
              <div className="text-white/40 text-sm">#{team1Data?.rank ?? "—"} в мире</div>
              {isUpcoming && match.odds && (
                <div className="mt-1 inline-flex items-center gap-1.5 bg-[var(--stryx-cyan-dim)] border border-[var(--stryx-cyan)]/30 rounded px-2 py-0.5">
                  <Icon name="TrendingUp" size={11} className="text-[var(--stryx-cyan)]" />
                  <span className="font-mono font-bold text-[var(--stryx-cyan)] text-sm">{match.odds.team1}</span>
                  <span className="text-white/30 text-xs">коэфф.</span>
                </div>
              )}
            </div>
          </div>

          {/* Score */}
          <div className="text-center px-8">
            {isFinished ? (
              <div className="flex items-center gap-3">
                <span className={`font-rajdhani font-black text-5xl ${(match.score1 ?? 0) > (match.score2 ?? 0) ? "text-[var(--stryx-cyan)]" : "text-white/30"}`}>{match.score1}</span>
                <span className="text-white/20 text-2xl">:</span>
                <span className={`font-rajdhani font-black text-5xl ${(match.score2 ?? 0) > (match.score1 ?? 0) ? "text-[var(--stryx-cyan)]" : "text-white/30"}`}>{match.score2}</span>
              </div>
            ) : (
              <div>
                <div className="font-rajdhani font-bold text-white/30 text-2xl tracking-widest">VS</div>
                <div className="text-[var(--stryx-cyan)] font-mono text-sm mt-1">{match.date}</div>
                <div className="text-white/40 font-mono text-xs">{match.time}</div>
              </div>
            )}
          </div>

          {/* Team 2 */}
          <div className="flex items-center gap-4 flex-1 justify-end cursor-pointer group" onClick={() => team2Data && onNavigate("team-detail", { type: "team", id: team2Data.id })}>
            <div className="text-right">
              <div className="font-rajdhani font-black text-2xl text-white group-hover:text-[var(--stryx-cyan)] transition-colors">{match.team2.name}</div>
              <div className="text-white/40 text-sm">#{team2Data?.rank ?? "—"} в мире</div>
              {isUpcoming && match.odds && (
                <div className="mt-1 inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded px-2 py-0.5 float-right">
                  <span className="text-white/40 text-xs">коэфф.</span>
                  <span className="font-mono font-bold text-white/70 text-sm">{match.odds.team2}</span>
                  <Icon name="TrendingDown" size={11} className="text-white/40" />
                </div>
              )}
            </div>
            <div className="w-20 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
              {isUrl(match.team2.logo) ? (
                <img src={match.team2.logo} alt="" className="w-16 h-16 object-contain" />
              ) : (
                <span className="text-5xl">{match.team2.logo}</span>
              )}
            </div>
          </div>
        </div>

        {/* Bet + stream buttons for upcoming */}
        {isUpcoming && (
          <div className="px-6 py-3 border-t border-white/6 flex flex-wrap gap-3" style={{ background: "rgba(0,0,0,0.2)" }}>
            {match.betsUrl && (
              <a href={match.betsUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 stryx-btn px-5 py-2 rounded-sm text-sm font-rajdhani font-bold uppercase tracking-wider">
                <Icon name="TrendingUp" size={15} />
                Сделать ставку
              </a>
            )}
            {match.stream && (
              <a href={match.stream} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 stryx-btn-outline px-5 py-2 rounded-sm text-sm">
                <Icon name="Tv" size={14} />
                Смотреть трансляцию
              </a>
            )}
          </div>
        )}
      </div>

      {/* Map scores for finished */}
      {isFinished && match.maps.length > 0 && (
        <div className="glass-card rounded-xl p-5">
          <h3 className="section-title text-sm mb-3 text-white/60">Счёт по картам</h3>
          <div className="space-y-2">
            {match.maps.map((m, i) => {
              const t1win = m.score1 > m.score2;
              return (
                <div key={i} className="flex items-center justify-between rounded-lg px-4 py-3" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="flex items-center gap-3 flex-1">
                    <span className={`font-mono font-black text-xl ${t1win ? "text-[var(--stryx-cyan)]" : "text-white/30"}`}>{m.score1}</span>
                    <div className="flex-1 text-center font-rajdhani font-bold text-white/60">{m.name}</div>
                    <span className={`font-mono font-black text-xl ${!t1win ? "text-[var(--stryx-cyan)]" : "text-white/30"}`}>{m.score2}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Player stats for finished */}
      {isFinished && match.playerStats && match.playerStats.length > 0 && (
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/6">
            <h3 className="section-title text-sm text-white/60">Статистика игроков</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.3)" }}>
                  {["Игрок", "K", "D", "A", "K/D", "ADR", "HS%", "Rating"].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-xs font-rajdhani font-bold uppercase tracking-widest text-white/30">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {match.playerStats.map((ps, i) => {
                  const p = players.find(pl => pl.id === ps.playerId);
                  return (
                    <tr key={i} className="border-t border-white/5 hover:bg-white/3 cursor-pointer transition-all"
                      onClick={() => p && onNavigate("player-detail", { type: "player", id: p.id })}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-white/8 overflow-hidden flex items-center justify-center">
                            {p && isUrl(p.photo) ? <img src={p.photo} alt="" className="w-full h-full object-cover" /> : <span className="text-xs">{p?.photo ?? "?"}</span>}
                          </div>
                          <span className="font-rajdhani font-bold text-white hover:text-[var(--stryx-cyan)] transition-colors">{ps.nickname}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-green-400 font-mono font-bold">{ps.kills}</td>
                      <td className="px-4 py-3 text-red-400/70 font-mono">{ps.deaths}</td>
                      <td className="px-4 py-3 text-white/50 font-mono">{ps.assists}</td>
                      <td className="px-4 py-3 text-white/70 font-mono">{ps.kd.toFixed(2)}</td>
                      <td className="px-4 py-3 text-white/70 font-mono">{ps.adr.toFixed(1)}</td>
                      <td className="px-4 py-3 text-white/70 font-mono">{ps.hs}%</td>
                      <td className="px-4 py-3">
                        <span className={`font-mono font-bold ${ps.rating >= 1.2 ? "text-[var(--stryx-cyan)]" : ps.rating >= 1.0 ? "text-white/80" : "text-white/40"}`}>
                          {ps.rating.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Team stats comparison for finished */}
      {isFinished && match.stats && (
        <div className="glass-card rounded-xl p-5">
          <h3 className="section-title text-sm mb-4 text-white/60">Сравнение команд</h3>
          <div className="space-y-3">
            {(["kd", "adr", "kast", "rating", "hs"] as const).map(key => {
              const v1 = parseFloat(match.stats!.team1[key]);
              const v2 = parseFloat(match.stats!.team2[key]);
              const total = v1 + v2 || 1;
              const pct1 = Math.round((v1 / total) * 100);
              return (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono font-bold text-[var(--stryx-cyan)] text-sm">{match.stats!.team1[key]}</span>
                    <span className="text-white/30 text-xs font-rajdhani uppercase tracking-widest">{key.toUpperCase()}</span>
                    <span className="font-mono text-white/50 text-sm">{match.stats!.team2[key]}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden flex" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div className="h-full" style={{ width: `${pct1}%`, background: "var(--stryx-cyan)" }} />
                    <div className="h-full flex-1" style={{ background: "rgba(255,255,255,0.15)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* H2H */}
      {recentH2H.length > 0 && (
        <div className="glass-card rounded-xl p-5">
          <h3 className="section-title text-sm mb-3 text-white/60">История встреч</h3>
          <div className="space-y-2">
            {recentH2H.map(rm => (
              <div key={rm.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer"
                onClick={() => onNavigate("match-detail", { type: "match", id: rm.id })}>
                <div className="flex items-center gap-3">
                  <span className="font-rajdhani text-sm text-white/60">{rm.team1.name}</span>
                  <div className="flex items-center gap-1">
                    <span className={`font-mono font-bold text-sm ${(rm.score1 ?? 0) > (rm.score2 ?? 0) ? "text-[var(--stryx-cyan)]" : "text-white/30"}`}>{rm.score1}</span>
                    <span className="text-white/20">:</span>
                    <span className={`font-mono font-bold text-sm ${(rm.score2 ?? 0) > (rm.score1 ?? 0) ? "text-[var(--stryx-cyan)]" : "text-white/30"}`}>{rm.score2}</span>
                  </div>
                  <span className="font-rajdhani text-sm text-white/60">{rm.team2.name}</span>
                </div>
                <span className="text-white/30 text-xs font-mono">{rm.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent form */}
      {isUpcoming && (
        <div className="grid md:grid-cols-2 gap-4">
          {[{ label: match.team1.name, logo: match.team1.logo, recent: recentTeam1 },
            { label: match.team2.name, logo: match.team2.logo, recent: recentTeam2 }].map(({ label, logo, recent }) => (
            <div key={label} className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                {isUrl(logo) ? <img src={logo} alt="" className="w-6 h-6 object-contain" /> : <span className="text-lg">{logo}</span>}
                <span className="font-rajdhani font-bold text-white text-sm">{label} — форма</span>
              </div>
              <div className="space-y-1.5">
                {recent.length === 0 ? (
                  <div className="text-white/30 text-xs font-mono">Нет данных</div>
                ) : recent.map(rm => {
                  const isT1 = rm.team1.id === match.team1.id || rm.team1.id === match.team2.id;
                  const won = (isT1 && (rm.score1 ?? 0) > (rm.score2 ?? 0)) || (!isT1 && (rm.score2 ?? 0) > (rm.score1 ?? 0));
                  const opp = isT1 ? rm.team2 : rm.team1;
                  return (
                    <div key={rm.id} className="flex items-center justify-between py-1">
                      <span className={`text-xs font-rajdhani font-bold px-1.5 py-0.5 rounded-sm ${won ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10"}`}>
                        {won ? "W" : "L"}
                      </span>
                      <span className="text-white/50 text-xs font-rajdhani">vs {opp.name}</span>
                      <span className="font-mono text-white/40 text-xs">{rm.score1}:{rm.score2}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Team rosters */}
      <div className="grid md:grid-cols-2 gap-4">
        {[{ team: team1Data, match_team: match.team1, roster: team1Players },
          { team: team2Data, match_team: match.team2, roster: team2Players }].map(({ team, match_team, roster }) => (
          team ? (
            <div key={team.id} className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                {isUrl(match_team.logo) ? (
                  <img src={match_team.logo} alt="" className="w-6 h-6 object-contain" />
                ) : <span className="text-xl">{match_team.logo}</span>}
                <span className="font-rajdhani font-bold text-white">{match_team.name}</span>
              </div>
              <div className="space-y-1.5">
                {roster.map(p => (
                  <div key={p.id} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-white/5 cursor-pointer group"
                    onClick={() => onNavigate("player-detail", { type: "player", id: p.id })}>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/8 overflow-hidden flex items-center justify-center">
                        {isUrl(p.photo) ? <img src={p.photo} alt="" className="w-full h-full object-cover" /> : <span className="text-xs">{p.photo}</span>}
                      </div>
                      <div>
                        <div className="font-rajdhani font-bold text-white text-sm group-hover:text-[var(--stryx-cyan)] transition-colors">{p.nickname}</div>
                        <div className="text-white/30 text-xs">{p.role}</div>
                      </div>
                    </div>
                    <span className="text-[var(--stryx-cyan)] font-mono text-xs">{p.rating}</span>
                  </div>
                ))}
                {roster.length === 0 && <div className="text-white/20 text-xs font-mono py-2">Состав неизвестен</div>}
              </div>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
}
