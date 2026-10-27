export interface RiotParticipantDto {
  puuid: string;
  championName: string;
  teamPosition: string;
  individualPosition: string;
  kills: number;
  deaths: number;
  assists: number;
  win: boolean;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  summoner1Id: number;
  summoner2Id: number;
}

export interface RiotMatchDto {
  metadata: {
    matchId: string;
    participants: string[];
  };
  info: {
    queueId: number;
    gameDuration: number;
    gameStartTimestamp: number;
    participants: RiotParticipantDto[];
  };
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
  itemUrls: (string | null)[];
  spellUrls: (string | null)[];
}
