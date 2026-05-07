import { useState } from "react";
import { transfers, transferMarket } from "@/data/mockData";
import Icon from "@/components/ui/icon";

interface TransfersPageProps {
  onNavigate: (page: string, detail?: { type: string; id: number }) => void;
}

export default function TransfersPage({ onNavigate }: TransfersPageProps) {
  const [tab, setTab] = useState<"history" | "market">("history");
  const [search, setSearch] = useState("");

  const filteredMarket = transferMarket.filter(p =>
    p.nickname.toLowerCase().includes(search.toLowerCase()) ||
    p.realName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-5 bg-[var(--stryx-cyan)] rounded-full" />
        <h1 className="section-title text-2xl">Трансферы</h1>
      </div>

      <div className="flex gap-2 mb-6">
        {([
          { key: "history", label: "История трансферов", icon: "ArrowLeftRight" },
          { key: "market", label: "Трансфер-маркет", icon: "ShoppingBag" },
        ] as const).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-sm font-rajdhani font-bold text-sm tracking-wider uppercase transition-all ${
              tab === t.key ? "bg-[var(--stryx-cyan)] text-black" : "glass-card text-white/50 hover:text-white"
            }`}
          >
            <Icon name={t.icon} size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "history" ? (
        <div className="space-y-3">
          {transfers.map(tr => (
            <div key={tr.id} className="glass-card rounded-xl p-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                {/* Player */}
                <div
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => onNavigate("player-detail", { type: "player", id: tr.player.id })}
                >
                  <div className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center text-xl">{tr.player.photo}</div>
                  <div>
                    <div className="font-rajdhani font-bold text-white group-hover:text-[var(--stryx-cyan)] transition-colors">{tr.player.nickname}</div>
                    <div className="text-white/30 text-xs">{tr.player.country} · Rating {tr.player.rating}</div>
                  </div>
                </div>

                {/* Transfer arrow */}
                <div className="flex items-center gap-3 flex-1 justify-center flex-wrap gap-y-1">
                  {tr.fromTeam ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg">{tr.fromTeam.logo}</span>
                      <span className="font-rajdhani text-white/60 text-sm">{tr.fromTeam.name}</span>
                    </div>
                  ) : (
                    <span className="text-white/30 text-sm font-rajdhani italic">Свободный агент</span>
                  )}
                  <Icon name="ArrowRight" size={16} className="text-[var(--stryx-cyan)]" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">{tr.toTeam.logo}</span>
                    <span className="font-rajdhani text-white font-bold text-sm">{tr.toTeam.name}</span>
                  </div>
                </div>

                {/* Meta */}
                <div className="text-right">
                  <div className={`font-mono font-bold text-sm ${tr.type === "free" ? "text-white/40" : "text-[var(--stryx-cyan)]"}`}>{tr.fee}</div>
                  <div className="text-white/30 text-xs font-mono">{tr.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {/* Search */}
          <div className="relative mb-5">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск игрока..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-white/30 text-sm font-exo outline-none focus:border-[var(--stryx-cyan)] transition-colors"
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMarket.map(p => (
              <div
                key={p.id}
                onClick={() => onNavigate("player-detail", { type: "player", id: p.id })}
                className="glass-card rounded-xl p-4 cursor-pointer group"
              >
                <div className="flex flex-col items-center text-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--stryx-cyan)]/20 to-transparent border border-[var(--stryx-cyan)]/20 flex items-center justify-center text-3xl mb-2">
                    {p.photo}
                  </div>
                  <div className="font-rajdhani font-bold text-white group-hover:text-[var(--stryx-cyan)] transition-colors">{p.nickname}</div>
                  <div className="text-white/30 text-xs">{p.realName} · {p.country}</div>
                  <div className="mt-1 text-xs bg-[var(--stryx-cyan-dim)] text-[var(--stryx-cyan)] px-2 py-0.5 rounded-sm font-rajdhani font-bold uppercase tracking-wider">
                    {p.role}
                  </div>
                </div>
                <div className="border-t border-white/6 pt-3 grid grid-cols-2 gap-2">
                  <div className="text-center">
                    <div className="text-[var(--stryx-cyan)] font-mono font-bold text-base">{p.rating}</div>
                    <div className="text-white/30 text-xs">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/70 font-mono text-base">{p.kd}</div>
                    <div className="text-white/30 text-xs">K/D</div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <div className="font-mono font-bold text-lg text-white">{p.value}</div>
                  <div className="text-white/30 text-xs font-rajdhani uppercase tracking-wider">Трансфер. стоимость</div>
                </div>
              </div>
            ))}

            {filteredMarket.length === 0 && (
              <div className="col-span-full glass-card rounded-xl p-12 text-center">
                <Icon name="Search" size={40} className="text-white/20 mx-auto mb-3" />
                <p className="text-white/40 font-rajdhani">Игроки не найдены</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
