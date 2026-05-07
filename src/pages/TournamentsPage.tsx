import { useState } from "react";
import { tournaments, teams, matches } from "@/data/mockData";
import Icon from "@/components/ui/icon";

interface TournamentsPageProps {
  onNavigate: (page: string, detail?: { type: string; id: number }) => void;
}

const isUrl = (s: string | null | undefined) =>
  typeof s === "string" && (s.startsWith("http") || s.startsWith("/"));

export default function TournamentsPage({ onNavigate }: TournamentsPageProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("info");
  const tournament = selectedId ? tournaments.find(t => t.id === selectedId) : null;

  if (tournament) {
    const participants = teams.filter(t => tournament.participants.includes(t.id));
    const tournamentMatches = matches.filter(m => m.tournamentId === tournament.id);
    const tabs = ["Info", "Bracket", "Matches", "Gallery"];

    return (
      <div className="animate-fade-in space-y-5">
        <button onClick={() => { setSelectedId(null); setActiveTab("info"); }}
          className="flex items-center gap-2 text-white/40 hover:text-[var(--stryx-cyan)] transition-colors text-sm font-rajdhani">
          <Icon name="ArrowLeft" size={16} /> Назад к турнирам
        </button>

        {/* Tournament header */}
        <div className="rounded-xl overflow-hidden" style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.09)",
        }}>
          {/* Banner image */}
          <div className="relative h-40 overflow-hidden flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(0,212,245,0.08) 0%, rgba(8,12,18,0.9) 100%)" }}>
            {tournament.image ? (
              <img src={tournament.image} alt={tournament.name} className="w-full h-full object-cover opacity-60" />
            ) : (
              <div className="absolute inset-0 hero-grid opacity-30" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,12,18,0.9)] to-transparent" />
            <div className="relative z-10 text-center">
              {isUrl(String(tournament.logo)) ? (
                <img src={String(tournament.logo)} alt="" className="w-16 h-16 object-contain mx-auto mb-2 drop-shadow-[0_0_12px_rgba(0,212,245,0.5)]" />
              ) : (
                <div className="text-5xl mb-2">{String(tournament.logo)}</div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="px-6 py-4">
            <h1 className="font-rajdhani font-black text-2xl text-white mb-1">{tournament.name}</h1>
            <div className="text-white/40 text-sm mb-3">{tournament.description}</div>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {[
                { label: "Призовой фонд", val: tournament.prizePool, accent: true },
                { label: "Команд", val: String(tournament.teams) },
                { label: "Локация", val: tournament.location },
                { label: "Даты", val: `${tournament.startDate} — ${tournament.endDate}` },
                { label: "Формат", val: tournament.format },
                { label: "Организатор", val: tournament.organizer },
              ].map(s => (
                <div key={s.label}>
                  <div className={`font-mono font-bold text-base ${s.accent ? "text-[var(--stryx-cyan)]" : "text-white"}`}>{s.val}</div>
                  <div className="text-white/30 text-xs uppercase tracking-wider font-rajdhani">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-t border-white/8" style={{ background: "rgba(0,0,0,0.2)" }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t.toLowerCase())}
                className={`px-5 py-3 text-sm font-rajdhani font-bold tracking-wider uppercase transition-all border-b-2 ${
                  activeTab === t.toLowerCase() ? "text-white border-[var(--stryx-cyan)]" : "text-white/40 border-transparent hover:text-white/60"
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        {activeTab === "info" && (
          <div className="grid md:grid-cols-2 gap-4">
            {/* Participants */}
            <div className="glass-card rounded-xl p-5">
              <h2 className="section-title text-sm mb-4 text-white/60">Участники ({participants.length})</h2>
              <div className="space-y-2">
                {participants.map((t, i) => (
                  <div key={t.id}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer group"
                    onClick={() => onNavigate("team-detail", { type: "team", id: t.id })}>
                    <span className="text-white/30 font-mono text-xs w-4">{i + 1}</span>
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden">
                      {isUrl(String(t.logo)) ? <img src={String(t.logo)} alt="" className="w-6 h-6 object-contain" /> : <span className="text-lg">{String(t.logo)}</span>}
                    </div>
                    <span className="font-rajdhani font-bold text-white group-hover:text-[var(--stryx-cyan)] transition-colors text-sm">{t.name}</span>
                    <span className="text-white/30 text-xs ml-auto">#{t.rank}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prize distribution */}
            <div className="glass-card rounded-xl p-5">
              <h2 className="section-title text-sm mb-4 text-white/60">Распределение призовых</h2>
              <div className="space-y-2">
                {tournament.prize_distribution.map((pd, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg"
                    style={{ background: i === 0 ? "rgba(0,212,245,0.06)" : "rgba(255,255,255,0.03)" }}>
                    <div className="flex items-center gap-2">
                      {i < 3 && <span className="text-base">{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</span>}
                      <span className="font-rajdhani text-white/70 text-sm">{pd.place}</span>
                    </div>
                    <span className={`font-mono font-bold ${i === 0 ? "text-[var(--stryx-cyan)]" : "text-white/60"}`}>{pd.prize}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "bracket" && (
          <div className="glass-card rounded-xl p-5">
            <h2 className="section-title text-sm mb-5 text-white/60">Турнирная сетка</h2>
            {tournament.bracket.length === 0 ? (
              <div className="text-center py-8 text-white/30">
                <Icon name="Network" size={32} className="mx-auto mb-3 opacity-30" />
                <p className="font-rajdhani">Сетка будет добавлена администратором</p>
              </div>
            ) : (
              <div className="flex gap-6 overflow-x-auto pb-2">
                {tournament.bracket.map((round, ri) => (
                  <div key={ri} className="shrink-0 w-64">
                    <div className="text-xs font-rajdhani font-bold text-white/40 uppercase tracking-widest mb-3">{round.round}</div>
                    <div className="space-y-3">
                      {round.matches.map((bm, mi) => (
                        <div key={mi} className="rounded-lg overflow-hidden border border-white/10">
                          {[{ name: bm.team1, score: bm.score1, won: bm.done && bm.score1 !== null && bm.score2 !== null && bm.score1 > bm.score2 },
                            { name: bm.team2, score: bm.score2, won: bm.done && bm.score1 !== null && bm.score2 !== null && bm.score2 > bm.score1 }].map((side, si) => (
                            <div key={si}
                              className={`flex items-center justify-between px-3 py-2 ${si === 0 ? "border-b border-white/8" : ""}`}
                              style={{ background: side.won ? "rgba(0,212,245,0.08)" : "rgba(255,255,255,0.03)" }}>
                              <span className={`font-rajdhani font-bold text-sm ${side.won ? "text-[var(--stryx-cyan)]" : "text-white/60"}`}>{side.name}</span>
                              {bm.done && <span className={`font-mono font-bold text-sm ${side.won ? "text-[var(--stryx-cyan)]" : "text-white/30"}`}>{side.score}</span>}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "matches" && (
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/6">
              <h2 className="section-title text-sm text-white/60">Все матчи турнира</h2>
            </div>
            {tournamentMatches.length === 0 ? (
              <div className="px-5 py-8 text-center text-white/30 font-rajdhani">Матчи не найдены</div>
            ) : tournamentMatches.map(m => (
              <div key={m.id}
                className="flex items-center justify-between px-5 py-3 border-b border-white/5 hover:bg-white/3 cursor-pointer"
                onClick={() => onNavigate("match-detail", { type: "match", id: m.id })}>
                <div className="flex items-center gap-3">
                  {isUrl(m.team1.logo) ? <img src={m.team1.logo} alt="" className="w-5 h-5 object-contain" /> : <span>{m.team1.logo}</span>}
                  <span className="font-rajdhani text-white/70 text-sm">{m.team1.name}</span>
                  {m.status === "finished" ? (
                    <span className="font-mono text-white/50 text-sm">{m.score1} : {m.score2}</span>
                  ) : <span className="text-white/30 text-sm font-mono">vs</span>}
                  <span className="font-rajdhani text-white/70 text-sm">{m.team2.name}</span>
                  {isUrl(m.team2.logo) ? <img src={m.team2.logo} alt="" className="w-5 h-5 object-contain" /> : <span>{m.team2.logo}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/30 text-xs font-mono">{m.date}</span>
                  <span className="text-white/20 text-xs">{m.format}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="glass-card rounded-xl p-6 text-center">
            <Icon name="Image" size={40} className="text-white/20 mx-auto mb-3" />
            <p className="text-white/40 font-rajdhani">Фотографии турнира будут добавлены через админ-панель</p>
          </div>
        )}
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
          <div key={t.id} onClick={() => { setSelectedId(t.id); setActiveTab("info"); }}
            className="glass-card rounded-xl overflow-hidden cursor-pointer group">
            <div className="h-24 flex items-center justify-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(0,212,245,0.07), rgba(8,12,18,0.8))" }}>
              <div className="hero-grid absolute inset-0 opacity-20" />
              {isUrl(String(t.logo)) ? (
                <img src={String(t.logo)} alt="" className="w-14 h-14 object-contain relative z-10 drop-shadow-[0_0_12px_rgba(0,212,245,0.4)] group-hover:drop-shadow-[0_0_20px_rgba(0,212,245,0.7)] transition-all" />
              ) : (
                <span className="text-4xl relative z-10">{String(t.logo)}</span>
              )}
            </div>
            <div className="p-4">
              <div className="font-rajdhani font-bold text-white group-hover:text-[var(--stryx-cyan)] transition-colors mb-1">{t.name}</div>
              <div className="text-white/40 text-xs mb-3">{t.organizer}</div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--stryx-cyan)] font-mono font-bold">{t.prizePool}</span>
                <span className={`text-xs font-rajdhani font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                  t.status === "active" ? "text-green-400 bg-green-400/10" : "text-yellow-400 bg-yellow-400/10"
                }`}>{t.status === "active" ? "Активен" : "Скоро"}</span>
              </div>
              <div className="flex items-center gap-3 mt-2 text-white/30 text-xs">
                <span>{t.teams} команд</span>
                <span>·</span>
                <span>{t.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
