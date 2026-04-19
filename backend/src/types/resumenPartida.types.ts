// types.ts (por ejemplo)
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
}
