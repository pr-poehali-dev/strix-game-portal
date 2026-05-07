import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import AdminPanel from "@/components/AdminPanel";
import HomePage from "@/pages/HomePage";
import MatchesPage from "@/pages/MatchesPage";
import MatchDetailPage from "@/pages/MatchDetailPage";
import TeamDetailPage from "@/pages/TeamDetailPage";
import PlayerDetailPage from "@/pages/PlayerDetailPage";
import TournamentsPage from "@/pages/TournamentsPage";
import TransfersPage from "@/pages/TransfersPage";
import RankingPage from "@/pages/RankingPage";
import OrganizersPage from "@/pages/OrganizersPage";
import NewsPage from "@/pages/NewsPage";
import ContactsPage from "@/pages/ContactsPage";

type Detail = { type: string; id: number } | undefined;
type Page = string;

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [detail, setDetail] = useState<Detail>(undefined);
  const [adminOpen, setAdminOpen] = useState(false);

  const navigate = useCallback((newPage: Page, newDetail?: Detail) => {
    setPage(newPage);
    setDetail(newDetail);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        setAdminOpen(prev => !prev);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const activeNavPage = ["home","matches","tournaments","transfers","ranking","organizers","news","contacts"].includes(page)
    ? page
    : ["match-detail"].includes(page) ? "matches"
    : ["team-detail","player-detail"].includes(page) ? "ranking"
    : ["tournament-detail"].includes(page) ? "tournaments"
    : page;

  return (
    <div className="min-h-screen">
      <Navbar
        activePage={activeNavPage}
        onNavigate={navigate}
        onAdminOpen={() => setAdminOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 pt-20 pb-16">
        {page === "home" && <HomePage onNavigate={navigate} />}
        {page === "matches" && <MatchesPage onNavigate={navigate} />}
        {page === "match-detail" && detail && <MatchDetailPage matchId={detail.id} onNavigate={navigate} />}
        {page === "team-detail" && detail && <TeamDetailPage teamId={detail.id} onNavigate={navigate} />}
        {page === "player-detail" && detail && <PlayerDetailPage playerId={detail.id} onNavigate={navigate} />}
        {page === "tournaments" && <TournamentsPage onNavigate={navigate} />}
        {page === "tournament-detail" && <TournamentsPage onNavigate={navigate} />}
        {page === "transfers" && <TransfersPage onNavigate={navigate} />}
        {page === "ranking" && <RankingPage onNavigate={navigate} />}
        {page === "organizers" && <OrganizersPage onNavigate={navigate} />}
        {page === "news" && <NewsPage />}
        {page === "contacts" && <ContactsPage />}
      </main>

      <footer className="mt-16 py-8" style={{
        background: "rgba(8,12,18,0.7)",
        backdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/projects/b0c9566a-b610-4e86-a7b1-caf22fe79bbd/bucket/90b57667-8e59-43f3-b007-fcf59527ace9.PNG"
              alt="STRYX" className="h-7 w-auto object-contain opacity-70" />
            <span className="stryx-logo-text text-white/40 text-sm">STRYX</span>
          </div>
          <div className="text-white/20 text-xs font-mono text-center">
            © 2026 STRYX Organization · Все права защищены
          </div>
          <a
            href="https://t.me/STRYXCS2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/40 hover:text-[var(--stryx-cyan)] transition-colors text-sm font-rajdhani"
          >
            <span>📩</span>
            <span>@STRYXCS2</span>
          </a>
        </div>
      </footer>

      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
    </div>
  );
}