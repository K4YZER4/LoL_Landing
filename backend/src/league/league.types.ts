export interface LeagueEntryDto {
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}

export interface RankedQueue {
  tier: string;
  rank: string;
  lp: number;
  wins: number;
  losses: number;
  winrate: number;
}

export interface RankedSummary {
  soloDuo: RankedQueue | null;
  flex: RankedQueue | null;
}
