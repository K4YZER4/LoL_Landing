import { RankedSummary } from '../league/league.types.js';
import { MatchViewModel } from '../matches/match.types.js';

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

export interface RoleStat {
  role: string;
  games: number;
  wins: number;
  winrate: number;
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
