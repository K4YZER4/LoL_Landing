import type { ProfileChampion } from "../../types/profile";
import { formatPoints } from "../../utils/format";

interface ChampionSlotProps {
  champion: ProfileChampion;
}

export default function ChampionSlot({ champion }: ChampionSlotProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-16 h-16 rounded-full overflow-hidden border border-white/40 bg-white/10 mb-3"
        title={champion.championName}
      >
        {champion.iconUrl ? (
          <img
            src={champion.iconUrl}
            alt={champion.championName}
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>
      <span className="font-label text-[9px] text-on-background/60 uppercase text-center">
        {champion.championName}
      </span>
      <span className="font-label text-[8px] text-on-background/40 uppercase text-center mt-1">
        M{champion.championLevel} · {formatPoints(champion.championPoints)} pts
      </span>
    </div>
  );
}
