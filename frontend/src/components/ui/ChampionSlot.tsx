import type { ProfileChampion } from "../../types/profile";
import { formatPoints } from "../../utils/format";

interface ChampionSlotProps {
  champion: ProfileChampion;
}

export default function ChampionSlot({ champion }: ChampionSlotProps) {
  return (
    <div className="championSlot">
      <div
        className="championSlotIcon"
        title={champion.championName}
      >
        {champion.iconUrl ? (
          <img
            src={champion.iconUrl}
            alt={champion.championName}
            className="imageCover"
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </div>
      <span className="championSlotName">
        {champion.championName}
      </span>
      <span className="championSlotMeta">
        M{champion.championLevel} · {formatPoints(champion.championPoints)} pts
      </span>
    </div>
  );
}
