import MatchCard from "@/components/MatchCard";
import { matches, tournaments, teams, news, STRYX_LOGO } from "@/data/mockData";

interface HomePageProps {
  onNavigate: (page: string, detail?: { type: string; id: number }) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const upcomingMatches = matches.filter(m => m.status === "upcoming").slice(0, 3);
  const activeTournaments = tournaments.filter(t => t.status === "active").slice(0, 3);
  const top3Teams = teams.slice(0, 3);
  const latestNews = news.slice(0, 3);

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Hero */}
      <section className="relative min-h-[480px] flex items-center overflow-hidden rounded-2xl hero-grid">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-[#080c12]/90 to-transparent" />
        <div className="absolute top-8 right-8 w-64 h-64 rounded-full bg-[var(--stryx-cyan)] opacity-5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-48 bg-[var(--stryx-cyan)] opacity-3 blur-3xl" />
        <div className="relative z-10 px-10 py-16 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-[var(--stryx-cyan)] rounded-full" />
            <span className="text-[var(--stryx-cyan)] font-rajdhani font-bold text-xs tracking-[0.25em] uppercase">Официальный портал</span>
          </div>
          <h1 className="font-rajdhani font-black text-6xl md:text-7xl text-white leading-none tracking-tight mb-2">
            STRYX
          </h1>
          <p className="text-white/50 text-lg font-exo mb-8 max-w-lg">
            Профессиональная киберспортивная организация. CS2. Турниры. Статистика.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate("matches")}
              className="stryx-btn px-6 py-2.5 rounded-sm text-sm font-rajdhani font-bold tracking-widest uppercase"
            >
              Все матчи
            </button>
            <button
              onClick={() => onNavigate("tournaments")}
              className="stryx-btn-outline px-6 py-2.5 rounded-sm text-sm"
            >
              Турниры
            </button>
          </div>

          {/* Quick stats */}
          <div className="mt-10 flex gap-8">
            {[
              { label: "Игроков", val: "5" },
              { label: "Команд", val: "3" },
              { label: "Турниров", val: "8" },
              { label: "Выигрышей", val: "$125K" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-rajdhani font-black text-2xl text-[var(--stryx-cyan)]">{s.val}</div>
                <div className="text-white/40 text-xs tracking-wider uppercase font-rajdhani">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative logo */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="relative">
            <div className="w-52 h-52 rounded-2xl bg-gradient-to-br from-[var(--stryx-cyan)]/10 to-transparent backdrop-blur-sm border border-[var(--stryx-cyan)]/15 flex items-center justify-center">
              <img src={STRYX_LOGO} alt="STRYX" className="w-44 h-44 object-contain drop-shadow-[0_0_32px_rgba(0,212,245,0.5)]" />
            </div>
            <div className="absolute -inset-4 rounded-3xl border border-[var(--stryx-cyan)]/10" />
          </div>
        </div>
      </section>

      {/* Upcoming Matches */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 bg-[var(--stryx-cyan)] rounded-full" />
            <h2 className="section-title text-xl">Предстоящие матчи</h2>
          </div>
          <button
            onClick={() => onNavigate("matches")}
            className="stryx-btn-outline px-4 py-1.5 rounded-sm text-xs"
          >
            Все матчи →
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {upcomingMatches.map(m => (
            <MatchCard
              key={m.id}
              match={m}
              onClick={() => onNavigate("match-detail", { type: "match", id: m.id })}
            />
          ))}
        </div>
      </section>

      {/* Active Tournaments */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 bg-[var(--stryx-cyan)] rounded-full" />
            <h2 className="section-title text-xl">Активные турниры</h2>
          </div>
          <button
            onClick={() => onNavigate("tournaments")}
            className="stryx-btn-outline px-4 py-1.5 rounded-sm text-xs"
          >
            Все турниры →
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {activeTournaments.map(t => (
            <div
              key={t.id}
              onClick={() => onNavigate("tournament-detail", { type: "tournament", id: t.id })}
              className="glass-card rounded-lg p-4 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{t.logo}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-rajdhani font-bold text-white truncate">{t.name}</div>
                  <div className="text-xs text-white/40 mt-0.5">{t.organizer}</div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[var(--stryx-cyan)] font-mono text-sm font-bold">{t.prizePool}</span>
                    <span className="text-white/30 text-xs">{t.teams} команд</span>
                    <span className={`text-xs font-rajdhani font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${
                      t.status === "active" ? "text-green-400 bg-green-400/10" : "text-yellow-400 bg-yellow-400/10"
                    }`}>{t.status === "active" ? "Активен" : "Скоро"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top 3 Teams */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 bg-[var(--stryx-cyan)] rounded-full" />
          <h2 className="section-title text-xl">Топ-3 команды</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {top3Teams.map((team, i) => (
            <div
              key={team.id}
              onClick={() => onNavigate("team-detail", { type: "team", id: team.id })}
              className="glass-card rounded-lg p-5 cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute top-3 right-4 font-rajdhani font-black text-6xl text-white/4 group-hover:text-white/6 transition-colors">
                #{i + 1}
              </div>
              <span className="text-3xl">{team.logo}</span>
              <div className="mt-2">
                <div className="font-rajdhani font-bold text-white text-lg">{team.name}</div>
                <div className="text-xs text-white/40">{team.country}</div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { label: "Рейтинг", val: team.rating.toFixed(2) },
                  { label: "Win%", val: `${team.winRate}%` },
                  { label: "Призовые", val: team.prize },
                ].map(s => (
                  <div key={s.label}>
                    <div className="text-[var(--stryx-cyan)] font-mono text-sm font-bold">{s.val}</div>
                    <div className="text-white/30 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* News */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 bg-[var(--stryx-cyan)] rounded-full" />
            <h2 className="section-title text-xl">Последние новости</h2>
          </div>
          <button
            onClick={() => onNavigate("news")}
            className="stryx-btn-outline px-4 py-1.5 rounded-sm text-xs"
          >
            Все новости →
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {latestNews.map(n => (
            <div key={n.id} className="glass-card rounded-lg p-4 cursor-pointer" onClick={() => onNavigate("news")}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-[var(--stryx-cyan-dim)] text-[var(--stryx-cyan)] px-2 py-0.5 rounded-sm font-rajdhani font-bold uppercase tracking-wider">
                  {n.category}
                </span>
                <span className="text-white/30 text-xs font-mono">{n.date}</span>
              </div>
              <h3 className="font-rajdhani font-bold text-white text-sm leading-snug mb-1">{n.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{n.excerpt}</p>
              <div className="mt-3 text-white/20 text-xs font-mono">{n.views.toLocaleString()} просмотров</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}