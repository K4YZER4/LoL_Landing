export interface StatsQueues {
  partidasSoloq: number;
  victoriasSoloq: number;
  derrotasSoloq: number;
  winrateSoloq: number;
  partidasFlex: number;
  victoriasFlex: number;
  derrotasFlex: number;
  winrateFlex: number;
}

export interface CampeonMasJugado {
  championName: string;
  urlImagen: string;
  games: number;
  wins: number;
  winRate: number;
}
