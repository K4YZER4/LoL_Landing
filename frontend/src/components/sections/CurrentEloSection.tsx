import type { ProfileResponse } from "../../types/profile";
import { formatLp, formatRank } from "../../utils/format";
import MatchHistoryCard from "../ui/MatchHistoryCard";

interface CurrentEloSectionProps {
  profile: ProfileResponse | null;
  isLoading: boolean;
}

export default function CurrentEloSection({
  profile,
  isLoading,
}: CurrentEloSectionProps) {
  const ranked = profile?.ranked;
  const stats = profile?.stats;
  const matches = profile?.matches ?? [];
  const winrate = stats
    ? Math.min(100, Math.max(0, stats.efficiency))
    : null;

  return (
    <section className="currentEloSection sectionBlendTop">
      <video className="sectionBackgroundVideo" autoPlay muted loop>
        <source src="/assets/bakgrounFlores.mp4" type="video/mp4" />
      </video>
      <img
        className="sectionForegroundGif"
        src="/assets/pinkFlowers.gif"
        alt="Pink Flowers"
      />
      <div className="sectionColorOverlay"></div>
      <div className="sectionContainer">
        <div className="currentEloHeader">
          <div>
            <h2 className="sectionTitle">Current Elo</h2>
            <p className="sectionSubTitle"></p>
          </div>
        </div>

        <div className="currentEloCardsGrid">
          <div className="glassPanel currentEloCard">
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
          </div>

          <div className="glassPanel currentEloCard currentEloCardPrimary">
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
          </div>

          <div className="glassPanel currentEloCard">
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
          </div>
        </div>

        <div>
          <div className="historyHeaderRow">
            <span className="historyHeaderLabel">History</span>
            <div className="historyHeaderLine"></div>
          </div>

          {matches.length > 0 ? (
            matches.map((match, index) => (
              <MatchHistoryCard
                key={match.matchId}
                match={match}
                index={index}
                isLast={index === matches.length - 1}
              />
            ))
          ) : (
            <p className="historyEmpty">
              {isLoading ? "Loading recent matches..." : "No recent matches."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
