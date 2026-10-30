import { useState } from "react";
import type { MatchViewModel, ProfileResponse } from "../../types/profile";
import { formatLp, formatRank } from "../../utils/format";
import type { MatchStats } from "../../utils/matchStats";
import MatchHistoryCard from "../ui/MatchHistoryCard";
import SakuraPetalOverlay from "../layout/SakuraPetalOverlay";
import BackgroundVideo from "../ui/BackgroundVideo";

interface CurrentEloSectionProps {
  profile: ProfileResponse | null;
  isLoading: boolean;
  matches: MatchViewModel[];
  matchesLoading: boolean;
  matchesError: string | null;
  reloadMatches: () => void;
  matchStats: MatchStats;
}

const MATCHES_PER_PAGE = 5;

export default function CurrentEloSection({
  profile,
  isLoading,
  matches,
  matchesLoading,
  matchesError,
  reloadMatches,
  matchStats,
}: CurrentEloSectionProps) {
  const ranked = profile?.ranked;
  const [currentPage, setCurrentPage] = useState(1);
  const winrate = matchStats.efficiency;
  const totalPages = Math.max(1, Math.ceil(matches.length / MATCHES_PER_PAGE));
  const visibleMatches = matches.slice(
    (currentPage - 1) * MATCHES_PER_PAGE,
    currentPage * MATCHES_PER_PAGE,
  );

  return (
    <section className="currentEloSection sectionBlendTop">
      <BackgroundVideo
        className="sectionBackgroundVideo"
        src="/assets/current-elo-background.mp4"
      />
      <div className="sectionColorOverlay"></div>
      <SakuraPetalOverlay lightColor="#efd9f1" deepColor="#a99bd6" />
      <div className="sectionContainer">
        <div className="currentEloHeader">
          <div>
            <h2 className="sectionTitle">Current Elo</h2>
            <p className="sectionSubTitle"></p>
          </div>
        </div>

        <div className="currentEloCardsGrid">
          <button
            type="button"
            className="glassPanel currentEloCard currentEloCardSelectable"
          >
            <span className="currentEloCardLabel">Winrate</span>
            <div className="currentEloValueRow">
              <span className="currentEloValueNumber">{winrate ?? "—"}</span>
              <span className="currentEloValueUnit">%</span>
            </div>
            <div className="currentEloProgressTrack">
              <div
                className="currentEloProgressFill"
                style={{ width: `${winrate ?? 0}%` }}
              ></div>
            </div>
          </button>

          <button
            type="button"
            className="glassPanel currentEloCard currentEloCardSelectable currentEloCardPrimary"
          >
            <span className="currentEloCardLabel">SOLO DUO</span>
            <div className="currentEloRankWrap">
              <span className="currentEloRankTier">
                {ranked ? formatRank(ranked.soloDuo) : "—"}
              </span>
              <span className="currentEloRankPoints">
                {ranked ? formatLp(ranked.soloDuo) : "—"}
              </span>
            </div>
            <div className="currentEloCardIconWrap">
              <span className="material-symbols-outlined currentEloCardIconPrimary">
                flare
              </span>
            </div>
          </button>

          <button
            type="button"
            className="glassPanel currentEloCard currentEloCardSelectable"
          >
            <span className="currentEloCardLabel">FLEX</span>
            <div className="currentEloRankWrap">
              <span className="currentEloRankTier">
                {ranked ? formatRank(ranked.flex) : "—"}
              </span>
              <span className="currentEloRankPoints">
                {ranked ? formatLp(ranked.flex) : "—"}
              </span>
            </div>
            <div className="currentEloCardIconWrap">
              <span className="material-symbols-outlined currentEloCardIconMuted">
                all_inclusive
              </span>
            </div>
          </button>
        </div>

        <div>
          <div className="historyHeaderRow">
            <span className="historyHeaderLabel">History</span>
            <div className="historyHeaderLine"></div>
          </div>

          <div className="historyMatchesList">
          {visibleMatches.length > 0 ? (
            visibleMatches.map((match, index) => (
              <MatchHistoryCard
                key={match.matchId}
                match={match}
                index={index}
                isLast={index === visibleMatches.length - 1}
              />
            ))
          ) : matchesError ? (
            <div className="historyPaginationError">
              <p className="historyEmpty">Could not load match history.</p>
              <button type="button" onClick={reloadMatches}>
                Retry
              </button>
            </div>
          ) : (
            <p className="historyEmpty">
              {matchesLoading || isLoading
                ? "Loading recent matches..."
                : "No recent matches."}
            </p>
          )}
          </div>

          {matches.length > 0 && totalPages > 1 ? (
            <nav className="historyPagination" aria-label="Match history pages">
              <button
                type="button"
                className="historyPaginationArrow"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                ←
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    type="button"
                    className={
                      page === currentPage
                        ? "historyPaginationPage active"
                        : "historyPaginationPage"
                    }
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Page ${page}`}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                type="button"
                className="historyPaginationArrow"
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                →
              </button>
            </nav>
          ) : null}
        </div>
      </div>
    </section>
  );
}
