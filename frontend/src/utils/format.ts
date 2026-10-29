import type { RankedQueue, RoleStat } from "../types/profile";

const ROLE_LABELS: Record<string, string> = {
  TOP: "TOP",
  JUNGLE: "JUNGLE",
  MIDDLE: "MID",
  BOTTOM: "ADC",
  UTILITY: "SUPPORT",
  UNKNOWN: "UNKNOWN",
};

const APEX_TIERS = new Set(["MASTER", "GRANDMASTER", "CHALLENGER"]);

export function formatRiotId(gameName: string, tagLine: string): string {
  return `${gameName}#${tagLine}`;
}

export function formatRank(queue: RankedQueue | null): string {
  if (!queue) {
    return "UNRANKED";
  }

  const tier = queue.tier.toUpperCase();
  const rank = queue.rank.toUpperCase();

  return APEX_TIERS.has(tier) ? tier : `${tier} ${rank}`;
}

export function formatLp(queue: RankedQueue | null): string {
  return queue ? `${queue.lp} LP` : "0 LP";
}

export function formatDuration(seconds: number): string {
  const totalSeconds = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function formatRole(role: string | null | undefined): string {
  if (!role) {
    return "NO DATA";
  }

  return ROLE_LABELS[role] ?? role;
}

export function formatRoleStat(roleStat: RoleStat | null): string {
  return roleStat
    ? `${formatRole(roleStat.role)} // ${roleStat.winrate}% WR`
    : "NO DATA";
}

export function formatPoints(points: number): string {
  return new Intl.NumberFormat("es-AR").format(points);
}
