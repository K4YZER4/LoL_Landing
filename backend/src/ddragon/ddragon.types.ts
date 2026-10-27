export interface DdragonChampion {
  id: string;
  key: string;
  name: string;
}

export interface DdragonSpell {
  id: string;
  key: string;
  name: string;
}

export interface DdragonChampionResponse {
  data: Record<string, DdragonChampion>;
}

export interface DdragonSpellResponse {
  data: Record<string, DdragonSpell>;
}
