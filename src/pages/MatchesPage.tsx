import { useState } from "react";
import MatchCard from "@/components/MatchCard";
import { matches } from "@/data/mockData";
import Icon from "@/components/ui/icon";

interface MatchesPageProps {
  onNavigate: (page: string, detail?: { type: string; id: number }) => void;
}

export default function MatchesPage({ onNavigate }: MatchesPageProps) {
  const [tab, setTab] = useState<"upcoming" | "finished">("upcoming");

  const filtered = matches.filter(m =>
    tab === "upcoming" ? m.status === "upcoming" || m.status === "live" : m.status === "finished"
  );

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-5 bg-[var(--stryx-cyan)] rounded-full" />
        <h1 className="section-title text-2xl">Матчи</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {([
          { key: "upcoming", label: "Предстоящие", icon: "Clock" },
          { key: "finished", label: "Завершённые", icon: "CheckCircle" },
        ] as const).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-sm font-rajdhani font-bold text-sm tracking-wider uppercase transition-all ${
              tab === t.key
                ? "bg-[var(--stryx-cyan)] text-black"
                : "glass-card text-white/50 hover:text-white"
            }`}
          >
            <Icon name={t.icon} size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card rounded-lg p-12 text-center">
          <Icon name="Calendar" size={40} className="text-white/20 mx-auto mb-3" />
          <p className="text-white/40 font-rajdhani">Матчи не найдены</p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {filtered.map(m => (
            <MatchCard
              key={m.id}
              match={m}
              onClick={() => onNavigate("match-detail", { type: "match", id: m.id })}
            />
          ))}
        </div>
      )}
    </div>
  );
}
