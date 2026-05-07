import { useState } from "react";
import { organizers, tournaments } from "@/data/mockData";
import Icon from "@/components/ui/icon";

const isUrl = (s: string | null | undefined) =>
  typeof s === "string" && (s.startsWith("http") || s.startsWith("/"));

interface OrganizersPageProps {
  onNavigate: (page: string, detail?: { type: string; id: number }) => void;
}

export default function OrganizersPage({ onNavigate }: OrganizersPageProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const organizer = selectedId ? organizers.find(o => o.id === selectedId) : null;

  if (organizer) {
    const pastT = tournaments.filter(t => organizer.past_tournaments.includes(t.id));
    const upcomingT = tournaments.filter(t => organizer.upcoming_tournaments.includes(t.id));

    return (
      <div className="animate-fade-in space-y-5">
        <button onClick={() => setSelectedId(null)} className="flex items-center gap-2 text-white/40 hover:text-[var(--stryx-cyan)] transition-colors text-sm font-rajdhani">
          <Icon name="ArrowLeft" size={16} /> Назад к организаторам
        </button>

        <div className="rounded-xl overflow-hidden" style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.09)",
        }}>
          <div className="relative h-32 flex items-center justify-center overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(0,212,245,0.1), rgba(8,12,18,0.9))" }}>
            <div className="hero-grid absolute inset-0 opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,12,18,0.8)] to-transparent" />
            <div className="relative z-10">
              {isUrl(String(organizer.logo)) ? (
                <img src={String(organizer.logo)} alt="" className="w-16 h-16 object-contain drop-shadow-[0_0_12px_rgba(0,212,245,0.6)]" />
              ) : (
                <span className="text-5xl">{String(organizer.logo)}</span>
              )}
            </div>
          </div>

          <div className="px-6 py-5">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className="font-rajdhani font-black text-2xl text-white mb-1">{organizer.name}</h1>
                <p className="text-white/40 text-sm max-w-lg mb-4">{organizer.description}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {[
                    { label: "Страна", val: organizer.country },
                    { label: "Основана", val: String(organizer.founded) },
                    { label: "Турниров", val: String(organizer.tournaments_count) },
                    { label: "Всего призовых", val: organizer.total_prize },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="text-[var(--stryx-cyan)] font-mono font-bold">{s.val}</div>
                      <div className="text-white/30 text-xs uppercase tracking-wider font-rajdhani">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-center mb-3">
                  <div className="flex gap-1 justify-center">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} className={`text-xl ${s <= Math.floor(organizer.rating) ? "text-yellow-400" : "text-white/15"}`}>★</span>
                    ))}
                  </div>
                  <div className="text-white/40 text-xs font-mono">{organizer.rating} / 5.0</div>
                </div>
                <div className="flex gap-2 justify-center">
                  {organizer.socials.telegram && (
                    <a href={organizer.socials.telegram} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 rounded-sm glass-card flex items-center justify-center hover:border-[var(--stryx-cyan)] transition-all">
                      <Icon name="Send" size={16} className="text-[var(--stryx-cyan)]" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {pastT.length > 0 && (
            <div className="glass-card rounded-xl p-5">
              <h2 className="section-title text-sm mb-4 text-white/60">Прошедшие турниры</h2>
              <div className="space-y-2">
                {pastT.map(t => (
                  <div key={t.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer"
                    onClick={() => onNavigate("tournaments")}>
                    <div className="flex items-center gap-3">
                      {isUrl(String(t.logo)) ? <img src={String(t.logo)} alt="" className="w-6 h-6 object-contain" /> : <span className="text-xl">{String(t.logo)}</span>}
                      <div>
                        <div className="font-rajdhani font-bold text-white text-sm">{t.name}</div>
                        <div className="text-white/30 text-xs">{t.startDate} — {t.endDate}</div>
                      </div>
                    </div>
                    <span className="text-[var(--stryx-cyan)] font-mono text-sm">{t.prizePool}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {upcomingT.length > 0 && (
            <div className="glass-card rounded-xl p-5">
              <h2 className="section-title text-sm mb-4 text-white/60">Предстоящие турниры</h2>
              <div className="space-y-2">
                {upcomingT.map(t => (
                  <div key={t.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer"
                    onClick={() => onNavigate("tournaments")}>
                    <div className="flex items-center gap-3">
                      {isUrl(String(t.logo)) ? <img src={String(t.logo)} alt="" className="w-6 h-6 object-contain" /> : <span className="text-xl">{String(t.logo)}</span>}
                      <div>
                        <div className="font-rajdhani font-bold text-white text-sm">{t.name}</div>
                        <div className="text-white/30 text-xs">{t.startDate} — {t.endDate}</div>
                      </div>
                    </div>
                    <span className="text-yellow-400 font-rajdhani font-bold text-xs uppercase">Скоро</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-5 bg-[var(--stryx-cyan)] rounded-full" />
        <h1 className="section-title text-2xl">Организаторы</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {organizers.map(o => (
          <div key={o.id} onClick={() => setSelectedId(o.id)} className="glass-card rounded-xl overflow-hidden cursor-pointer group">
            <div className="h-20 flex items-center justify-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(0,212,245,0.06), rgba(8,12,18,0.9))" }}>
              <div className="hero-grid absolute inset-0 opacity-10" />
              {isUrl(String(o.logo)) ? (
                <img src={String(o.logo)} alt="" className="w-12 h-12 object-contain relative z-10 group-hover:drop-shadow-[0_0_12px_rgba(0,212,245,0.5)] transition-all" />
              ) : (
                <span className="text-4xl relative z-10">{String(o.logo)}</span>
              )}
            </div>
            <div className="p-4">
              <div className="font-rajdhani font-bold text-white group-hover:text-[var(--stryx-cyan)] transition-colors mb-1">{o.name}</div>
              <div className="text-white/40 text-xs mb-2">{o.country} · с {o.founded}</div>
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map(s => (
                  <span key={s} className={`text-sm ${s <= Math.floor(o.rating) ? "text-yellow-400" : "text-white/15"}`}>★</span>
                ))}
                <span className="text-white/30 text-xs ml-1 font-mono">{o.rating}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-t border-white/6 pt-3">
                <div>
                  <div className="text-[var(--stryx-cyan)] font-mono text-sm font-bold">{o.total_prize}</div>
                  <div className="text-white/30 text-xs">Всего призовых</div>
                </div>
                <div>
                  <div className="text-white/70 font-mono text-sm">{o.tournaments_count}</div>
                  <div className="text-white/30 text-xs">Турниров</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
