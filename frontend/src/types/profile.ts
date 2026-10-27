export type ItemOrSpellUrl = string | null;

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

export interface RoleStat {
  role: string;
  games: number;
  wins: number;
  winrate: number;
}

export interface ProfileChampion {
  championId: number;
  championName: string;
  iconUrl: string;
  championLevel: number;
  championPoints: number;
  games: number;
  wins: number;
  winrate: number;
}

export interface MatchViewModel {
  matchId: string;
  queueId: number;
  queueName: string;
  playedAt: number;
  durationSeconds: number;
  win: boolean;
  championName: string;
  championIconUrl: string;
  role: string;
  kills: number;
  deaths: number;
  assists: number;
  itemUrls: ItemOrSpellUrl[];
  spellUrls: ItemOrSpellUrl[];
}

export interface ProfileResponse {
  perfil: {
    puuid: string;
    gameName: string;
    tagLine: string;
    level: number;
    profileIconUrl: string;
  };
  ranked: RankedSummary;
  stats: {
    efficiency: number;
    primaryRole: RoleStat | null;
    secondaryRole: RoleStat | null;
    topChampions: ProfileChampion[];
  };
  matches: MatchViewModel[];
}
