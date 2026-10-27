import type { MatchViewModel, RoleStat } from "../types/profile";

export interface MatchStats {
  efficiency: number | null;
  primaryRole: RoleStat | null;
  secondaryRole: RoleStat | null;
}

export function getMatchStats(matches: MatchViewModel[]): MatchStats {
  if (matches.length === 0) {
    return { efficiency: null, primaryRole: null, secondaryRole: null };
  }

  const roles = new Map<string, { games: number; wins: number }>();
  const totalWins = matches.filter((match) => match.win).length;

  for (const match of matches) {
    const role = match.role || "UNKNOWN";
    const current = roles.get(role) ?? { games: 0, wins: 0 };
    current.games += 1;
    if (match.win) current.wins += 1;
    roles.set(role, current);
  }

  const roleStats = [...roles.entries()]
    .sort(([, first], [, second]) => second.games - first.games)
    .map(([role, stats]): RoleStat => ({
      role,
      games: stats.games,
      wins: stats.wins,
      winrate: Math.round((stats.wins / stats.games) * 100),
    }));

  return {
    efficiency: Math.round((totalWins / matches.length) * 100),
    primaryRole: roleStats[0] ?? null,
    secondaryRole: roleStats[1] ?? null,
  };
}
