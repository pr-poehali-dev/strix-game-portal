import { useState } from "react";
import { teams, players, matches } from "@/data/mockData";
import Icon from "@/components/ui/icon";

interface TeamDetailPageProps {
  teamId: number;
  onNavigate: (page: string, detail?: { type: string; id: number }) => void;
}

const isUrl = (s: string) => typeof s === "string" && (s.startsWith("http") || s.startsWith("/"));

export default function TeamDetailPage({ teamId, onNavigate }: TeamDetailPageProps) {
  const [activeTab, setActiveTab] = useState("info");
  const team = teams.find(t => t.id === teamId);
  if (!team) return <div className="text-white/40 p-8">Команда не найдена</div>;

  const roster = players.filter(p => team.players.includes(p.id));
  const teamMatches = matches.filter(m => m.team1.id === teamId || m.team2.id === teamId);
  const tabs = ["Info", "Roster", "Matches"];

  return (
    <div className="animate-fade-in space-y-0">
      <button onClick={() => onNavigate("ranking")} className="flex items-center gap-2 text-white/40 hover:text-[var(--stryx-cyan)] transition-colors text-sm font-rajdhani mb-4">
        <Icon name="ArrowLeft" size={16} /> Назад к рейтингу
      </button>

      {/* HLTV-style team header */}
      <div className="rounded-xl overflow-hidden" style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.09)",
      }}>
        {/* Players photos strip */}
        <div className="flex" style={{ background: "rgba(0,0,0,0.3)", minHeight: 100 }}>
          {roster.map(p => (
            <button
              key={p.id}
              onClick={() => onNavigate("player-detail", { type: "player", id: p.id })}
              className="flex-1 relative group overflow-hidden"
            >
              <div className="h-24 flex items-center justify-center" style={{ background: "rgba(0,212,245,0.04)" }}>
                {isUrl(p.photo) ? (
                  <img src={p.photo} alt={p.nickname} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <span className="text-4xl">{p.photo}</span>
                )}
              </div>
              <div className="text-center py-1.5 border-t border-white/6" style={{ background: "rgba(0,0,0,0.4)" }}>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-xs">{p.country === "RU" ? "🇷🇺" : p.country === "UA" ? "🇺🇦" : "🌍"}</span>
                  <span className="font-rajdhani font-bold text-white text-xs group-hover:text-[var(--stryx-cyan)] transition-colors">{p.nickname}</span>
                </div>
              </div>
            </button>
          ))}
          {roster.length === 0 && (
            <div className="flex-1 flex items-center justify-center text-white/20 text-sm font-rajdhani py-8">
              Состав не добавлен
            </div>
          )}
        </div>

        {/* Team info row */}
        <div className="px-5 py-4 flex items-center gap-5 flex-wrap">
          <div className="w-14 h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
            {isUrl(String(team.logo)) ? (
              <img src={String(team.logo)} alt={team.name} className="w-12 h-12 object-contain" />
            ) : (
              <span className="text-3xl">{String(team.logo)}</span>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <div className="flex items-center gap-2">
                <span className="text-base">{team.country === "RU" ? "🇷🇺" : team.country === "UA" ? "🇺🇦" : team.country === "DK" ? "🇩🇰" : team.country === "US" ? "🇺🇸" : team.country === "DE" ? "🇩🇪" : "🌍"}</span>
                <span className="text-white/50 text-sm">{team.country === "RU" ? "Russia" : team.country === "UA" ? "Ukraine" : team.country}</span>
              </div>
              <h1 className="font-rajdhani font-black text-2xl text-white">{team.name}</h1>
              <div className="flex gap-2">
                {team.socials.telegram && (
                  <a href={team.socials.telegram} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-sm glass-card flex items-center justify-center hover:border-[var(--stryx-cyan)] transition-all">
                    <Icon name="Send" size={14} className="text-[var(--stryx-cyan)]" />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/30 text-xs font-mono">Ranking</span>
            <div className="flex items-center gap-1 bg-[var(--stryx-cyan-dim)] border border-[var(--stryx-cyan)]/30 rounded px-2 py-0.5">
              <Icon name="Hash" size={11} className="text-[var(--stryx-cyan)]" />
              <span className="font-rajdhani font-black text-[var(--stryx-cyan)]">{team.rank}</span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-white/6" style={{ background: "rgba(0,0,0,0.15)" }}>
          {[
            { label: "Weeks in top30", val: team.weeksTop30 },
            { label: "Average player age", val: team.avgAge.toFixed(1) },
            { label: "Coach", val: team.coach },
            { label: "Win Rate", val: `${team.winRate}%` },
          ].map((s, i) => (
            <div key={i} className={`px-4 py-3 ${i < 3 ? "border-r border-white/6" : ""}`}>
              <div className="text-white/40 text-xs mb-0.5">{s.label}</div>
              <div className="font-rajdhani font-bold text-white text-sm truncate">{s.val}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-t border-white/8" style={{ background: "rgba(0,0,0,0.2)" }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t.toLowerCase())}
              className={`px-5 py-3 text-sm font-rajdhani font-bold tracking-wider uppercase transition-all border-b-2 ${
                activeTab === t.toLowerCase()
                  ? "text-white border-[var(--stryx-cyan)]"
                  : "text-white/40 border-transparent hover:text-white/60"
              }`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "info" && (
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="glass-card rounded-xl p-5">
            <h2 className="section-title text-sm mb-3 text-white/60">Об организации</h2>
            <p className="text-white/50 text-sm leading-relaxed">{team.description}</p>
            <div className="mt-4 space-y-2">
              {[
                { label: "Рейтинг", val: team.rating.toFixed(2), accent: true },
                { label: "Победы", val: `${team.wins} (${team.winRate}%)` },
                { label: "Поражения", val: String(team.losses) },
                { label: "Призовые всего", val: team.prize },
              ].map(s => (
                <div key={s.label} className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40 text-sm">{s.label}</span>
                  <span className={`text-sm font-bold ${s.accent ? "text-[var(--stryx-cyan)] font-mono" : "text-white"}`}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ranking chart placeholder */}
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title text-sm text-white/60">World ranking development</h2>
              <div className="flex gap-2">
                <button className="text-xs px-2 py-1 rounded-sm bg-[var(--stryx-cyan)] text-black font-rajdhani font-bold">For core</button>
                <button className="text-xs px-2 py-1 rounded-sm text-white/40 font-rajdhani">For team</button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-white/40 text-xs mb-1">Current ranking</div>
                <div className="font-rajdhani font-black text-xl text-white">#{team.rank}</div>
              </div>
              <div>
                <div className="text-white/40 text-xs mb-1">Peak</div>
                <div className="font-rajdhani font-black text-xl text-[var(--stryx-cyan)]">#1</div>
              </div>
              <div>
                <div className="text-white/40 text-xs mb-1">Weeks in top30</div>
                <div className="font-rajdhani font-black text-xl text-white">{team.weeksTop30}w</div>
              </div>
            </div>
            {/* Simplified chart */}
            <div className="h-24 relative">
              <div className="absolute inset-0 flex items-end gap-1 px-2">
                {[8,6,4,3,2,1,2,3,2,1,1,2,3,1,2,3,4,5,6,4,3,2,team.rank].map((r, i) => (
                  <div key={i} className="flex-1 rounded-t-sm transition-all"
                    style={{
                      height: `${Math.max(4, (10 - r) * 9)}%`,
                      background: i === 22
                        ? "var(--stryx-cyan)"
                        : "rgba(0,212,245,0.25)",
                    }}
                  />
                ))}
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
            </div>
          </div>
        </div>
      )}

      {activeTab === "roster" && (
        <div className="glass-card rounded-xl overflow-hidden mt-4">
          <div className="grid grid-cols-12 gap-2 px-4 py-2.5 border-b border-white/6 text-xs font-rajdhani font-bold uppercase tracking-widest text-white/30">
            <div className="col-span-4">Игрок</div>
            <div className="col-span-2 text-center">Rating</div>
            <div className="col-span-1 text-center">K/D</div>
            <div className="col-span-2 text-center">ADR</div>
            <div className="col-span-1 text-center">KAST</div>
            <div className="col-span-2 text-center">HS%</div>
          </div>
          {roster.map(p => (
            <div key={p.id}
              className="grid grid-cols-12 gap-2 px-4 py-3 team-row cursor-pointer border-b border-white/4"
              onClick={() => onNavigate("player-detail", { type: "player", id: p.id })}>
              <div className="col-span-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/8 overflow-hidden flex items-center justify-center">
                  {isUrl(p.photo) ? <img src={p.photo} alt="" className="w-full h-full object-cover" /> : <span>{p.photo}</span>}
                </div>
                <div>
                  <div className="font-rajdhani font-bold text-white text-sm hover:text-[var(--stryx-cyan)] transition-colors">{p.nickname}</div>
                  <div className="text-white/30 text-xs">{p.role} · {p.country}</div>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <span className="text-[var(--stryx-cyan)] font-mono font-bold text-sm">{p.rating}</span>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <span className="text-white/60 font-mono text-sm">{p.kd}</span>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <span className="text-white/60 font-mono text-sm">{p.adr.toFixed(1)}</span>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <span className="text-white/60 font-mono text-sm">{p.kast.toFixed(1)}%</span>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <span className="text-white/60 font-mono text-sm">{p.headshots.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "matches" && (
        <div className="glass-card rounded-xl p-5 mt-4">
          <div className="space-y-2">
            {teamMatches.map(m => {
              const isTeam1 = m.team1.id === teamId;
              const won = m.status === "finished" && ((isTeam1 && (m.score1 ?? 0) > (m.score2 ?? 0)) || (!isTeam1 && (m.score2 ?? 0) > (m.score1 ?? 0)));
              const opponent = isTeam1 ? m.team2 : m.team1;
              return (
                <div key={m.id}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer"
                  onClick={() => onNavigate("match-detail", { type: "match", id: m.id })}>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-rajdhani font-bold uppercase px-2 py-0.5 rounded-sm ${
                      m.status !== "finished" ? "text-[var(--stryx-cyan)] bg-[var(--stryx-cyan-dim)]" :
                      won ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10"
                    }`}>
                      {m.status !== "finished" ? "→" : won ? "W" : "L"}
                    </span>
                    <span className="text-white/60 font-rajdhani text-sm">
                      vs {isUrl(String(opponent.logo)) ? <img src={String(opponent.logo)} alt="" className="inline w-4 h-4 object-contain mr-1" /> : <span className="mr-1">{opponent.logo}</span>}
                      {opponent.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/30 font-mono text-xs">{m.date}</span>
                    {m.status === "finished" && <span className="text-white/50 font-mono text-sm">{m.score1}:{m.score2}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
