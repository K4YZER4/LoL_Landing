import type { MostPlayedChampion } from "../../utils/matchStats";

interface MostPlayedChampionSlotProps {
  champion: MostPlayedChampion;
}

export default function MostPlayedChampionSlot({
  champion,
}: MostPlayedChampionSlotProps) {
  return (
    <div className="arsenalPlayedChampion">
      <div className="arsenalPlayedChampionIcon" title={champion.championName}>
        {champion.iconUrl ? (
          <img
            src={champion.iconUrl}
            alt={champion.championName}
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>
      <span className="arsenalPlayedChampionName">
        {champion.championName}
      </span>
      <span className="arsenalPlayedChampionMeta">
        {champion.games} {champion.games === 1 ? "GAME" : "GAMES"} · {champion.winrate}% WR
      </span>
    </div>
  );
}
