import Icon from "@/components/ui/icon";
const isUrl = (s: string) => s.startsWith("http") || s.startsWith("/");
function TeamLogo({ logo, name }: { logo: string; name: string }) {
  return isUrl(logo) ? (
    <img src={logo} alt={name} className="w-10 h-10 object-contain" />
  ) : (
    <span className="text-3xl">{logo}</span>
  );
}

interface MapScore { name: string; score1: number; score2: number; }
interface MatchTeam { name: string; logo: string; country: string; }
interface MatchCardProps {
  match: {
    id: number; team1: MatchTeam; team2: MatchTeam;
    score1: number | null; score2: number | null; status: string;
    date: string; time: string; tournament: string; format: string;
    maps: MapScore[]; betsUrl: string | null; stream: string | null;
  };
  onClick: () => void;
  compact?: boolean;
}

export default function MatchCard({ match, onClick, compact }: MatchCardProps) {
  const isFinished = match.status === "finished";
  const isLive = match.status === "live";

  return (
    <div
      onClick={onClick}
      className={`glass-card rounded-lg p-4 cursor-pointer select-none ${isLive ? "match-card-live" : ""}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-white/40 font-mono">{match.tournament}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40 font-mono">{match.format}</span>
          {isLive && (
            <div className="flex items-center gap-1.5 bg-red-500/15 border border-red-500/30 px-2 py-0.5 rounded-full">
              <div className="live-dot" />
              <span className="text-red-400 text-xs font-rajdhani font-bold tracking-widest">LIVE</span>
            </div>
          )}
          {!isLive && !isFinished && (
            <span className="text-xs text-[var(--stryx-cyan)] font-mono">{match.date} {match.time}</span>
          )}
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between">
        {/* Team 1 */}
        <div className="flex items-center gap-2 flex-1">
          <TeamLogo logo={match.team1.logo} name={match.team1.name} />
          <div>
            <div className="font-rajdhani font-bold text-white text-base leading-none">{match.team1.name}</div>
            <div className="text-xs text-white/40">{match.team1.country}</div>
          </div>
        </div>

        {/* Score / VS */}
        <div className="text-center px-4">
          {isFinished ? (
            <div className="flex items-center gap-2">
              <span className={`font-rajdhani font-black text-2xl ${match.score1 > match.score2 ? "text-[var(--stryx-cyan)]" : "text-white/30"}`}>
                {match.score1}
              </span>
              <span className="text-white/20 font-bold">:</span>
              <span className={`font-rajdhani font-black text-2xl ${match.score2 > match.score1 ? "text-[var(--stryx-cyan)]" : "text-white/30"}`}>
                {match.score2}
              </span>
            </div>
          ) : (
            <span className="font-rajdhani font-bold text-white/30 text-lg tracking-widest">VS</span>
          )}
        </div>

        {/* Team 2 */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <div className="text-right">
            <div className="font-rajdhani font-bold text-white text-base leading-none">{match.team2.name}</div>
            <div className="text-xs text-white/40">{match.team2.country}</div>
          </div>
          <TeamLogo logo={match.team2.logo} name={match.team2.name} />
        </div>
      </div>

      {/* Map scores for finished */}
      {isFinished && match.maps.length > 0 && !compact && (
        <div className="mt-3 flex gap-2 flex-wrap">
          {match.maps.map((m: MapScore, i: number) => (
            <div key={i} className="bg-white/5 border border-white/8 rounded px-2 py-1 text-xs font-mono text-white/50">
              {m.name} <span className="text-white/70">{m.score1}:{m.score2}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-white/6 flex items-center justify-between">
        <span className={`text-xs font-rajdhani font-bold tracking-widest uppercase ${
          isFinished ? "text-white/30" : isLive ? "text-red-400" : "text-[var(--stryx-cyan)]"
        }`}>
          {isFinished ? "Завершён" : isLive ? "Идёт сейчас" : "Предстоящий"}
        </span>
        {!isFinished && (
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <Icon name="Tv" size={11} />
            <span>Трансляция</span>
          </div>
        )}
        <Icon name="ChevronRight" size={14} className="text-white/30" />
      </div>
    </div>
  );
}