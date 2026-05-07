import { useState } from "react";
import { organizers, tournaments } from "@/data/mockData";
import Icon from "@/components/ui/icon";

interface OrganizersPageProps {
  onNavigate: (page: string, detail?: { type: string; id: number }) => void;
}

export default function OrganizersPage({ onNavigate }: OrganizersPageProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const organizer = selected ? organizers.find(o => o.id === selected) : null;

  if (organizer) {
    const pastT = tournaments.filter(t => organizer.past_tournaments.includes(t.id));
    const upcomingT = tournaments.filter(t => organizer.upcoming_tournaments.includes(t.id));
    return (
      <div className="animate-fade-in space-y-6">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-white/40 hover:text-[var(--stryx-cyan)] transition-colors text-sm font-rajdhani">
          <Icon name="ArrowLeft" size={16} /> Назад к организаторам
        </button>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-4xl">{organizer.logo}</span>
            </div>
            <div className="flex-1">
              <h1 className="font-rajdhani font-black text-3xl text-white mb-1">{organizer.name}</h1>
              <div className="text-white/40 text-sm mb-3">{organizer.description}</div>
              <div className="flex flex-wrap gap-6 mb-4">
                {[
                  { label: "Страна", val: organizer.country },
                  { label: "Основана", val: organizer.founded },
                  { label: "Турниров", val: organizer.tournaments_count },
                  { label: "Призовые", val: organizer.total_prize },
                  { label: "Рейтинг", val: `★ ${organizer.rating}` },
                ].map(s => (
                  <div key={s.label}>
                    <div className="font-mono font-bold text-[var(--stryx-cyan)] text-lg">{s.val}</div>
                    <div className="text-white/30 text-xs uppercase tracking-wider font-rajdhani">{s.label}</div>
                  </div>
                ))}
              </div>
              {/* Socials */}
              <div className="flex gap-2">
                {organizer.socials.twitter && (
                  <a href={organizer.socials.twitter} className="stryx-btn-outline px-3 py-1.5 rounded-sm text-xs flex items-center gap-1">
                    <Icon name="Twitter" size={12} /> Twitter
                  </a>
                )}
                {organizer.socials.vk && (
                  <a href={organizer.socials.vk} className="stryx-btn-outline px-3 py-1.5 rounded-sm text-xs flex items-center gap-1">
                    <Icon name="Globe" size={12} /> VK
                  </a>
                )}
                {organizer.socials.telegram && (
                  <a href={organizer.socials.telegram} className="stryx-btn-outline px-3 py-1.5 rounded-sm text-xs flex items-center gap-1">
                    <Icon name="Send" size={12} /> Telegram
                  </a>
                )}
                {organizer.socials.twitch && (
                  <a href={organizer.socials.twitch} className="stryx-btn-outline px-3 py-1.5 rounded-sm text-xs flex items-center gap-1">
                    <Icon name="Tv" size={12} /> Twitch
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tournaments rating */}
        <div className="glass-card rounded-xl p-5">
          <h2 className="section-title text-sm mb-2 text-white/60">Рейтинг турниров</h2>
          <div className="flex items-center gap-2 mb-4">
            {[1,2,3,4,5].map(star => (
              <div key={star} className={`text-xl ${star <= Math.floor(organizer.rating) ? "text-yellow-400" : "text-white/20"}`}>★</div>
            ))}
            <span className="text-white/60 font-mono text-sm ml-2">{organizer.rating} / 5.0</span>
          </div>
        </div>

        {/* Past tournaments */}
        {pastT.length > 0 && (
          <div className="glass-card rounded-xl p-5">
            <h2 className="section-title text-sm mb-4 text-white/60">Прошедшие турниры</h2>
            <div className="space-y-2">
              {pastT.map(t => (
                <div
                  key={t.id}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer"
                  onClick={() => onNavigate("tournaments")}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{t.logo}</span>
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

        {/* Upcoming tournaments */}
        {upcomingT.length > 0 && (
          <div className="glass-card rounded-xl p-5">
            <h2 className="section-title text-sm mb-4 text-white/60">Предстоящие турниры</h2>
            <div className="space-y-2">
              {upcomingT.map(t => (
                <div
                  key={t.id}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer"
                  onClick={() => onNavigate("tournaments")}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{t.logo}</span>
                    <div>
                      <div className="font-rajdhani font-bold text-white text-sm">{t.name}</div>
                      <div className="text-white/30 text-xs">{t.startDate} — {t.endDate}</div>
                    </div>
                  </div>
                  <span className="text-yellow-400 font-mono text-sm font-bold">Скоро</span>
                </div>
              ))}
            </div>
          </div>
        )}
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
          <div key={o.id} onClick={() => setSelected(o.id)} className="glass-card rounded-xl p-5 cursor-pointer group">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">{o.logo}</span>
              </div>
              <div>
                <div className="font-rajdhani font-bold text-white group-hover:text-[var(--stryx-cyan)] transition-colors">{o.name}</div>
                <div className="text-white/40 text-xs mt-0.5">{o.country} · с {o.founded}</div>
                <div className="flex items-center gap-1 mt-1">
                  {[1,2,3,4,5].map(s => (
                    <span key={s} className={`text-xs ${s <= Math.floor(o.rating) ? "text-yellow-400" : "text-white/20"}`}>★</span>
                  ))}
                  <span className="text-white/30 text-xs ml-1">{o.rating}</span>
                </div>
              </div>
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
        ))}
      </div>
    </div>
  );
}
