import { useState } from "react";
import { players, matches, STRYX_LOGO } from "@/data/mockData";
import Icon from "@/components/ui/icon";

interface PlayerDetailPageProps {
  playerId: number;
  onNavigate: (page: string, detail?: { type: string; id: number }) => void;
}

const statLabels: Record<string, string> = {
  firepower: "Firepower",
  entrying: "Entrying",
  trading: "Trading",
  opening: "Opening",
  clutching: "Clutching",
  sniping: "Sniping",
  utility: "Utility",
};

export default function PlayerDetailPage({ playerId, onNavigate }: PlayerDetailPageProps) {
  const [activeTab, setActiveTab] = useState("info");
  const player = players.find(p => p.id === playerId);
  if (!player) return <div className="text-white/40 p-8">Игрок не найден</div>;

  const recentMatches = matches.filter(m =>
    (m.team1.id === player.teamId || m.team2.id === player.teamId)
  ).slice(0, 6);

  const isLogoUrl = (s: string) => s.startsWith("http") || s.startsWith("/");
  const tabs = ["Info", "Matches", "Achievements"];

  return (
    <div className="animate-fade-in space-y-0">
      <button
        onClick={() => onNavigate("ranking")}
        className="flex items-center gap-2 text-white/40 hover:text-[var(--stryx-cyan)] transition-colors text-sm font-rajdhani mb-4"
      >
        <Icon name="ArrowLeft" size={16} />
        Назад
      </button>

      {/* HLTV-style Header */}
      <div className="rounded-xl overflow-hidden" style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.09)",
      }}>
        {/* Top band */}
        <div className="relative flex items-stretch min-h-[140px]">
          {/* Player photo area */}
          <div className="w-36 shrink-0 relative overflow-hidden" style={{ background: "rgba(0,212,245,0.06)" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(8,12,18,0.6)]" />
            {isLogoUrl(player.photo) ? (
              <img src={player.photo} alt={player.nickname} className="w-full h-full object-cover opacity-80" />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-6xl">{player.photo}</div>
            )}
            <div className="absolute top-2 left-2 text-xs font-rajdhani font-bold text-white/40 uppercase tracking-wider">Игрок</div>
          </div>

          {/* Info */}
          <div className="flex-1 px-6 py-5 flex flex-col justify-center">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="font-rajdhani font-black text-3xl text-white mb-0.5">{player.nickname}</h1>
                <div className="flex items-center gap-2 text-white/50 text-sm mb-3">
                  <span className="text-base">{player.country === "RU" ? "🇷🇺" : player.country === "UA" ? "🇺🇦" : player.country === "BY" ? "🇧🇾" : "🌍"}</span>
                  <span>{player.realName}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-white/40">Возраст</span>
                    <span className="text-white font-bold">{player.age} лет</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/40">Текущая команда</span>
                    <button
                      className="flex items-center gap-1.5 text-white hover:text-[var(--stryx-cyan)] transition-colors font-bold"
                      onClick={() => onNavigate("team-detail", { type: "team", id: player.teamId })}
                    >
                      {isLogoUrl(String(player.teamLogo)) ? (
                        <img src={String(player.teamLogo)} alt="" className="w-4 h-4 object-contain" />
                      ) : (
                        <span className="text-base">{String(player.teamLogo)}</span>
                      )}
                      {player.teamName}
                    </button>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/40">Призовые</span>
                    <span className="text-white font-bold">{player.prize}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/40">Роль</span>
                    <span className="text-[var(--stryx-cyan)] font-bold font-rajdhani uppercase text-xs tracking-wider">{player.role}</span>
                  </div>
                </div>
              </div>
              {/* Social icons */}
              <div className="flex gap-2 items-start">
                {player.socials.twitter && (
                  <a href={player.socials.twitter} className="w-8 h-8 rounded-sm glass-card flex items-center justify-center hover:border-[var(--stryx-cyan)] transition-all">
                    <Icon name="Twitter" size={14} className="text-white/60" />
                  </a>
                )}
                {player.socials.telegram && (
                  <a href={player.socials.telegram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-sm glass-card flex items-center justify-center hover:border-[var(--stryx-cyan)] transition-all">
                    <Icon name="Send" size={14} className="text-[var(--stryx-cyan)]" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements row */}
        {player.achievements.length > 0 && (
          <div className="px-6 py-2 border-t border-white/6 flex items-center gap-3 flex-wrap" style={{ background: "rgba(255,255,255,0.02)" }}>
            {player.achievements.map((a, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-[var(--stryx-cyan-dim)] border border-[var(--stryx-cyan)]/20 rounded px-2.5 py-1">
                <Icon name="Trophy" size={12} className="text-yellow-400" />
                <span className="text-xs font-rajdhani font-bold text-white/80">{a}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-t border-white/8" style={{ background: "rgba(0,0,0,0.2)" }}>
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t.toLowerCase())}
              className={`px-5 py-3 text-sm font-rajdhani font-bold tracking-wider uppercase transition-all border-b-2 ${
                activeTab === t.toLowerCase()
                  ? "text-white border-[var(--stryx-cyan)]"
                  : "text-white/40 border-transparent hover:text-white/60"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "info" && (
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {/* Stats bars */}
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-rajdhani font-bold text-white/80 text-sm uppercase tracking-widest">{player.nickname} statistics</h2>
              <span className="text-white/30 text-xs font-mono">({player.maps} карт)</span>
            </div>

            <div className="mb-4 flex items-center gap-3">
              <span className="text-white/50 text-sm">Rating 3.0</span>
              <Icon name="BarChart2" size={14} className="text-[var(--stryx-cyan)]" />
              <span className="font-mono font-bold text-white">{player.stats.rating2.toFixed(2)}</span>
            </div>

            <div className="space-y-3">
              {Object.entries(statLabels).map(([key, label]) => {
                const val = player.stats[key as keyof typeof player.stats] as number;
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/50 text-sm">{label}</span>
                      <span className="text-white/50 text-xs font-mono">{val}/100</span>
                    </div>
                    <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${val}%`,
                          background: val > 70
                            ? "linear-gradient(90deg, var(--stryx-cyan), rgba(0,212,245,0.6))"
                            : val > 40
                            ? "linear-gradient(90deg, rgba(255,200,0,0.8), rgba(255,200,0,0.4))"
                            : "linear-gradient(90deg, rgba(255,80,80,0.7), rgba(255,80,80,0.3))",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="mt-4 w-full py-2 rounded-sm text-sm font-rajdhani font-bold uppercase tracking-widest text-center"
              style={{ background: "rgba(0,212,245,0.15)", color: "var(--stryx-cyan)", border: "1px solid rgba(0,212,245,0.25)" }}
            >
              Полная статистика {player.nickname}
            </button>
          </div>

          {/* Recent matches */}
          <div className="glass-card rounded-xl p-5">
            <h2 className="font-rajdhani font-bold text-white/80 text-sm uppercase tracking-widest mb-4">Upcoming & recent matches</h2>
            <div className="space-y-1">
              {recentMatches.map(m => {
                const isTeam1 = m.team1.id === player.teamId;
                const opponent = isTeam1 ? m.team2 : m.team1;
                const myScore = isTeam1 ? m.score1 : m.score2;
                const oppScore = isTeam1 ? m.score2 : m.score1;
                const isFinished = m.status === "finished";
                const won = isFinished && myScore !== null && oppScore !== null && myScore > oppScore;

                return (
                  <div
                    key={m.id}
                    className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-white/5 cursor-pointer group border-l-2 transition-all"
                    style={{ borderLeftColor: isFinished ? (won ? "#22c55e" : "#ef4444") : "rgba(0,212,245,0.4)" }}
                    onClick={() => onNavigate("match-detail", { type: "match", id: m.id })}
                  >
                    <div>
                      <div className="text-white/80 text-sm font-rajdhani">
                        vs {typeof opponent.logo === "string" && (opponent.logo.startsWith("http") || opponent.logo.startsWith("/")) ? (
                          <img src={opponent.logo} alt="" className="inline w-4 h-4 object-contain mr-1" />
                        ) : (
                          <span className="mr-1">{opponent.logo}</span>
                        )}
                        {opponent.name}
                      </div>
                      <div className="text-white/30 text-xs font-mono">{m.tournament}</div>
                    </div>
                    <div className="text-right">
                      {isFinished ? (
                        <span className={`font-mono font-bold text-sm ${won ? "text-green-400" : "text-red-400"}`}>
                          {myScore} : {oppScore}
                        </span>
                      ) : (
                        <span className="text-[var(--stryx-cyan)] text-xs font-mono">{m.date}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === "matches" && (
        <div className="glass-card rounded-xl p-5 mt-4">
          <h2 className="section-title text-sm mb-4 text-white/60">Все матчи команды</h2>
          <div className="space-y-2">
            {recentMatches.map(m => (
              <div key={m.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer"
                onClick={() => onNavigate("match-detail", { type: "match", id: m.id })}>
                <div className="flex items-center gap-3">
                  <span className="text-white/50 font-rajdhani text-sm">{m.team1.name}</span>
                  {m.status === "finished" && <span className="font-mono text-white/60 text-sm">{m.score1}:{m.score2}</span>}
                  <span className="text-white/50 font-rajdhani text-sm">{m.team2.name}</span>
                </div>
                <span className="text-white/30 font-mono text-xs">{m.date} · {m.tournament}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "achievements" && (
        <div className="glass-card rounded-xl p-5 mt-4">
          <h2 className="section-title text-sm mb-4 text-white/60">Достижения</h2>
          {player.achievements.length > 0 ? (
            <div className="space-y-2">
              {player.achievements.map((a, i) => (
                <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-white/3">
                  <Icon name="Trophy" size={16} className="text-yellow-400" />
                  <span className="font-rajdhani font-bold text-white">{a}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/30 font-rajdhani">Достижений пока нет</p>
          )}
        </div>
      )}
    </div>
  );
}
