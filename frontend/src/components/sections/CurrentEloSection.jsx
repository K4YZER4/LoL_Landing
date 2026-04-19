import MatchHistoryCard from "../ui/MatchHistoryCard";
import historyMatches from "../data/historyMatches";

export default function CurrentEloSection() {
  return (
    <section className="currentEloSection">
      <video className="sectionBackgroundVideo" autoPlay muted loop>
        <source src="/assets/bakgrounFlores.mp4" type="video/mp4" />
      </video>
      <img className="sectionForegroundGif" src="/assets/pinkFlowers.gif" alt="Pink Flowers" />
      <div className="sectionColorOverlay"></div>
      <div className="sectionContainer">
        <div className="currentEloHeader">
          <div>
            <h2 className="sectionTitle">
              Current Elo
            </h2>
            <p className="sectionSubTitle"></p>
          </div>
        </div>

        <div className="currentEloCardsGrid">
          <div className="glassPanel currentEloCard">
            <span className="currentEloCardLabel">
              Efficiency
            </span>
            <div className="currentEloValueRow">
              <span className="currentEloValueNumber">64</span>
              <span className="currentEloValueUnit">%</span>
            </div>
            <div className="currentEloProgressTrack">
              <div className="currentEloProgressFill"></div>
            </div>
          </div>

          <div className="glassPanel currentEloCard currentEloCardPrimary">
            <span className="currentEloCardLabel">
              SOLO DUO
            </span>
            <div className="currentEloRankWrap">
              <span className="currentEloRankTier">
                DIAMANTE 1
              </span>
              <span className="currentEloRankPoints">
                90 LP
              </span>
            </div>
            <div className="currentEloCardIconWrap">
              <span className="material-symbols-outlined currentEloCardIconPrimary">flare</span>
            </div>
          </div>

          <div className="glassPanel currentEloCard">
            <span className="currentEloCardLabel">
              FLEX
            </span>
            <div className="currentEloRankWrap">
              <span className="currentEloRankTier">
                MASTER
              </span>
              <span className="currentEloRankPoints">
                150 LP
              </span>
            </div>
            <div className="currentEloCardIconWrap">
              <span className="material-symbols-outlined currentEloCardIconMuted">all_inclusive</span>
            </div>
          </div>
        </div>

        <div>
          <div className="historyHeaderRow">
            <span className="historyHeaderLabel">History</span>
            <div className="historyHeaderLine"></div>
          </div>

          {historyMatches.map((match) => (
            <MatchHistoryCard key={`${match.queue}-${match.ratio}`} match={match} />
          ))}
        </div>
      </div>
    </section>
  );
}
