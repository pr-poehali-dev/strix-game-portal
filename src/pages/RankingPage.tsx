import { useState } from "react";
import { teams, players } from "@/data/mockData";
import Icon from "@/components/ui/icon";

interface RankingPageProps {
  onNavigate: (page: string, detail?: { type: string; id: number }) => void;
}

export default function RankingPage({ onNavigate }: RankingPageProps) {
  const [tab, setTab] = useState<"teams" | "players">("teams");
  const [expandedTeam, setExpandedTeam] = useState<number | null>(null);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-5 bg-[var(--stryx-cyan)] rounded-full" />
        <h1 className="section-title text-2xl">Рейтинг</h1>
      </div>

      <div className="flex gap-2 mb-6">
        {([
          { key: "teams", label: "Команды" },
          { key: "players", label: "Игроки" },
        ] as const).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-sm font-rajdhani font-bold text-sm tracking-wider uppercase transition-all ${
              tab === t.key ? "bg-[var(--stryx-cyan)] text-black" : "glass-card text-white/50 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "teams" ? (
        <div className="glass-card rounded-xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 px-4 py-2.5 border-b border-white/6 text-xs font-rajdhani font-bold uppercase tracking-widest text-white/30">
            <div className="col-span-1">#</div>
            <div className="col-span-4">Команда</div>
            <div className="col-span-1 text-center">Рейтинг</div>
            <div className="col-span-1 text-center">W</div>
            <div className="col-span-1 text-center">L</div>
            <div className="col-span-1 text-center">Win%</div>
            <div className="col-span-3 text-right">Призовые</div>
          </div>
          {teams.map((team, i) => (
            <div key={team.id}>
              <div
                className={`grid grid-cols-12 gap-2 px-4 py-3 team-row cursor-pointer border-b border-white/4 transition-all ${expandedTeam === team.id ? "bg-[var(--stryx-cyan-dim)]" : ""}`}
                onClick={() => setExpandedTeam(expandedTeam === team.id ? null : team.id)}
              >
                <div className="col-span-1 flex items-center">
                  <span className={`rank-badge text-base font-black ${i === 0 ? "text-yellow-400" : i === 1 ? "text-gray-300" : i === 2 ? "text-amber-600" : "text-white/30"}`}>
                    #{team.rank}
                  </span>
                </div>
                <div className="col-span-4 flex items-center gap-2">
                  <span className="text-xl">{team.logo}</span>
                  <div>
                    <div className="font-rajdhani font-bold text-white text-sm">{team.name}</div>
                    <div className="text-white/30 text-xs">{team.tag} · {team.country}</div>
                  </div>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <span className="text-[var(--stryx-cyan)] font-mono text-sm font-bold">{team.rating}</span>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <span className="text-green-400 font-mono text-sm">{team.wins}</span>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <span className="text-red-400/70 font-mono text-sm">{team.losses}</span>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <span className="text-white/60 font-mono text-sm">{team.winRate}%</span>
                </div>
                <div className="col-span-3 flex items-center justify-end gap-2">
                  <span className="text-white/50 font-mono text-sm">{team.prize}</span>
                  <Icon name={expandedTeam === team.id ? "ChevronUp" : "ChevronDown"} size={14} className="text-white/30" />
                </div>
              </div>

              {/* Expanded roster */}
              {expandedTeam === team.id && (
                <div className="bg-white/3 border-b border-white/6 px-4 py-3 animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/40 font-rajdhani uppercase tracking-wider">Состав</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); onNavigate("team-detail", { type: "team", id: team.id }); }}
                      className="text-xs text-[var(--stryx-cyan)] font-rajdhani hover:underline"
                    >
                      Профиль команды →
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {players.filter(p => team.players.includes(p.id)).map(p => (
                      <div
                        key={p.id}
                        className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-[var(--stryx-cyan-dim)] group"
                        onClick={(e) => { e.stopPropagation(); onNavigate("player-detail", { type: "player", id: p.id }); }}
                      >
                        <span className="text-base">{p.photo}</span>
                        <div>
                          <div className="font-rajdhani font-bold text-sm text-white group-hover:text-[var(--stryx-cyan)] transition-colors">{p.nickname}</div>
                          <div className="text-white/30 text-xs">{p.role}</div>
                        </div>
                        <span className="text-[var(--stryx-cyan)] font-mono text-xs ml-2">{p.rating}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 gap-2 px-4 py-2.5 border-b border-white/6 text-xs font-rajdhani font-bold uppercase tracking-widest text-white/30">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Игрок</div>
            <div className="col-span-2">Команда</div>
            <div className="col-span-1 text-center">Rating</div>
            <div className="col-span-1 text-center">K/D</div>
            <div className="col-span-1 text-center">ADR</div>
            <div className="col-span-1 text-center">KAST</div>
            <div className="col-span-2 text-center">HS%</div>
          </div>
          {players.sort((a, b) => b.rating - a.rating).map((player, i) => (
            <div
              key={player.id}
              className="grid grid-cols-12 gap-2 px-4 py-3 team-row cursor-pointer border-b border-white/4"
              onClick={() => onNavigate("player-detail", { type: "player", id: player.id })}
            >
              <div className="col-span-1 flex items-center">
                <span className={`rank-badge text-sm font-black ${i === 0 ? "text-yellow-400" : i === 1 ? "text-gray-300" : i === 2 ? "text-amber-600" : "text-white/30"}`}>
                  {i + 1}
                </span>
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-base">{player.photo}</div>
                <div>
                  <div className="font-rajdhani font-bold text-white text-sm hover:text-[var(--stryx-cyan)] transition-colors">{player.nickname}</div>
                  <div className="text-white/30 text-xs">{player.country} · {player.role}</div>
                </div>
              </div>
              <div className="col-span-2 flex items-center">
                <span className="text-white/50 font-rajdhani text-sm">{player.teamName}</span>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <span className="text-[var(--stryx-cyan)] font-mono font-bold text-sm">{player.rating}</span>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <span className="text-white/60 font-mono text-sm">{player.kd}</span>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <span className="text-white/60 font-mono text-sm">{player.adr.toFixed(1)}</span>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <span className="text-white/60 font-mono text-sm">{player.kast.toFixed(1)}%</span>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <span className="text-white/60 font-mono text-sm">{player.headshots.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
