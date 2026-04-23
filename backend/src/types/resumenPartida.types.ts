import { CampeonMasJugado, StatsQueues } from "./statsWinrate.types.js";

// types.ts (por ejemplo)
interface imagenesUrl {
  championIconUrl: string;
  itemsConUrls: string[]; // [item0Url..item6Url]
}
export interface ResumenPartida {
  matchId: string;
  queueId: number;
  durationSeconds: number;

  win: boolean;
  championName: string;
  role: string; // teamPosition

  kills: number;
  deaths: number;
  assists: number;

  items: number[]; // [item0..item6]

  summonerSpells: {
    spell1Id: number; // summoner1Id
    spell2Id: number; // summoner2Id
  };
}
export interface ResumenPartidaConImagenes extends ResumenPartida {
  championIconUrl: string;
  itemsConUrls: (string | null)[];
  summonerSpellsConUrls: (string | null)[];
}
export interface ResumenStats {
  statsQueues: StatsQueues;
  top10Campeones: CampeonMasJugado[];
}
export interface ResumenPartidaStatsYImagenes {
  respuesta: ResumenPartidaConImagenes[];
  stats: ResumenStats;
}
