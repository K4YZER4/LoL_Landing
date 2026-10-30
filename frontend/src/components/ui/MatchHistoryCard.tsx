import type { ItemOrSpellUrl, MatchViewModel } from "../../types/profile";
import { formatDuration } from "../../utils/format";

interface MatchHistoryCardProps {
  match: MatchViewModel;
  index: number;
  isLast: boolean;
}

export default function MatchHistoryCard({
  match,
  index,
  isLast,
}: MatchHistoryCardProps) {
  const nonNullItems = match.itemUrls.filter(
    (itemUrl): itemUrl is string => itemUrl !== null,
  );
  const nullItems = Array.from(
    { length: match.itemUrls.length - nonNullItems.length },
    () => null,
  );
  const orderedItems = [...nonNullItems, ...nullItems] as ItemOrSpellUrl[];
  const buildSlots = [...match.spellUrls, ...orderedItems];

  const cardVariant = [
    isLast ? "" : "historyMatchCardWithMargin",
    match.win ? "historyMatchCardMain" : "historyMatchCardDim",
    index >= 2 ? "historyMatchCardBorder" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const avatarVariant = match.win
    ? "historyMatchAvatarMain"
    : "historyMatchAvatarSubtle";
  const resultVariant = match.win
    ? "historyMatchResultWin"
    : "historyMatchResultSubtle";
  const ratioVariant = match.win
    ? "historyMatchRatioMain"
    : "historyMatchRatioSubtle";

  return (
    <div className={`historyMatchCard historyMatchCardBase ${cardVariant}`}>
      <div className="historyMatchLeft">
        <div
          className={`historyMatchAvatar ${avatarVariant}`}
          title={match.championName}
        >
          {match.championIconUrl ? (
            <img
              src={match.championIconUrl}
              alt={match.championName}
            className="imageCover"
              loading="lazy"
              decoding="async"
            />
          ) : null}
        </div>
        <div>
          <span className={`historyMatchResult ${resultVariant}`}>
            {match.win ? "VICTORY" : "DEFEAT"}
          </span>
          <span className="historyMatchQueueText">
            {match.queueName} // {formatDuration(match.durationSeconds)}
          </span>
        </div>
      </div>
      <div className="historyMatchCenter">
        <div className="matchHistoryRatioText">
          <span className={`historyMatchRatio ${ratioVariant}`}>
            {match.kills} / {match.deaths} / {match.assists}
          </span>
          <span className="historyMatchRatioLabel">RATIO</span>
        </div>
        <div className="historyMatchItems">
          {buildSlots.map((slotUrl, slotIndex) => (
            <div
              key={slotIndex}
              className="historyMatchItem historyMatchItemSlot"
            >
              {slotUrl ? (
                <img
                  src={slotUrl}
                  alt="match-slot"
                  className="historyMatchItemImage"
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
