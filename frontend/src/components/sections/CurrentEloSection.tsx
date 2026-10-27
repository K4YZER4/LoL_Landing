import type { ProfileResponse } from "../../types/profile";
import { formatLp, formatRank } from "../../utils/format";
import MatchHistoryCard from "../ui/MatchHistoryCard";

interface CurrentEloSectionProps {
  profile: ProfileResponse;
}

export default function CurrentEloSection({
  profile,
}: CurrentEloSectionProps) {
  const { ranked, stats, matches } = profile;
  const efficiency = Math.min(100, Math.max(0, stats.efficiency));

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
            <span className="currentEloCardLabel">Efficiency</span>
            <div className="currentEloValueRow">
              <span className="currentEloValueNumber">{efficiency}</span>
              <span className="currentEloValueUnit">%</span>
            </div>
            <div className="currentEloProgressTrack">
              <div
                className="currentEloProgressFill"
                style={{ width: `${efficiency}%` }}
              ></div>
            </div>
          </div>

          <div className="glassPanel currentEloCard currentEloCardPrimary">
            <span className="currentEloCardLabel">SOLO DUO</span>
            <div className="currentEloRankWrap">
              <span className="currentEloRankTier">
                {formatRank(ranked.soloDuo)}
              </span>
              <span className="currentEloRankPoints">
                {formatLp(ranked.soloDuo)}
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
                {formatRank(ranked.flex)}
              </span>
              <span className="currentEloRankPoints">
                {formatLp(ranked.flex)}
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
            <p className="historyEmpty">No recent matches.</p>
          )}
        </div>
      </div>
    </section>
  );
}
