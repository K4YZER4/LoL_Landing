export default function MatchHistoryCard({ match }) {
  return (
    <div className={`historyMatchCard historyMatchCardBase ${match.cardVariant}`}>
      <div className="historyMatchLeft">
        <div className={`historyMatchAvatar ${match.avatarVariant}`}>
          <img
            src="/assets/personaje.jpeg"
            alt="Player"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div>
          <span className={`historyMatchResult ${match.resultVariant}`}>{match.result}</span>
          <span className="historyMatchQueueText">
            {match.queue}
          </span>
        </div>
      </div>
      <div className="historyMatchCenter">
        <div className="text-center">
          <span className={`historyMatchRatio ${match.ratioVariant}`}>{match.ratio}</span>
          <span className="historyMatchRatioLabel">
            RATIO
          </span>
        </div>
        <div className="historyMatchItems">
          <div className={`historyMatchItem ${match.itemVariant}`}></div>
          <div className={`historyMatchItem ${match.itemVariant}`}></div>
          <div className={`historyMatchItem ${match.itemVariant}`}></div>
          <div className={`historyMatchItem ${match.itemVariant}`}></div>
        </div>
      </div>
      <div className="historyMatchRight">
        <span className={`historyMatchLp ${match.lpVariant}`}>{match.lp}</span>
        <span className={`historyMatchTag ${match.tagVariant}`}>{match.tag}</span>
      </div>
    </div>
  );
}
