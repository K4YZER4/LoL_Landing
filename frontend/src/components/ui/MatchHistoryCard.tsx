import type { MatchHistoryViewModel } from "../../types/match";

interface MatchHistoryCardProps {
  match: MatchHistoryViewModel;
}

export default function MatchHistoryCard({ match }: MatchHistoryCardProps) {
  const nonNullItems = match.itemUrls.filter((itemUrl) => itemUrl !== null);
  const nullItems = Array.from({ length: match.itemUrls.length - nonNullItems.length }, () => null);
  const orderedItems = [...nonNullItems, ...nullItems] as MatchHistoryViewModel["itemUrls"];
  const buildSlots = [...match.spellUrls, ...orderedItems];

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
          {buildSlots.map((slotUrl, index) => (
            <div key={index} className="historyMatchItem historyMatchItemSlot">
              {slotUrl ? (
                <img
                  src={slotUrl}
                  alt="match-slot"
                  className="historyMatchItemImage"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
