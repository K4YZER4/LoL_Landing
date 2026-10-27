export interface MasteryEntryDto {
  championId: number;
  championLevel: number;
  championPoints: number;
  lastPlayTime: number;
}

export interface ChampionMasteryView {
  championId: number;
  championName: string;
  championLevel: number;
  championPoints: number;
  lastPlayTime: number;
  iconUrl: string;
}
