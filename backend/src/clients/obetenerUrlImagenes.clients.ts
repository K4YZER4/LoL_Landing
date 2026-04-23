let DDRAGON_VERSION: string | null = null;

async function cargarVersionDDragon(): Promise<string> {
  if (DDRAGON_VERSION) return DDRAGON_VERSION;

  const res = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json",
  );
  if (!res.ok) {
    throw new Error(`No se pudieron obtener versiones DDragon: ${res.status}`);
  }

  const versions = (await res.json()) as string[];

  DDRAGON_VERSION = versions[0] || null; // la más reciente
  return DDRAGON_VERSION?.toString() || "";
}
async function getChampionIconUrl(championName: string): Promise<string> {
  const version = await cargarVersionDDragon();
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`;
}
async function getItemIconUrl(itemId: number): Promise<string | null> {
  if (itemId === 0) {
    return null; // sin item
  }
  const version = await cargarVersionDDragon();
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`;
}

interface SummonerSpellData {
  id: string; // "SummonerFlash"
  key: string; // "4"
  name: string;
}

let SUMMONER_SPELLS_BY_ID: Map<number, SummonerSpellData> | null = null;

// función interna para cargar el mapa solo una vez
async function cargarMapaSummonerSpells(): Promise<
  Map<number, SummonerSpellData>
> {
  if (SUMMONER_SPELLS_BY_ID) return SUMMONER_SPELLS_BY_ID;

  const version = await cargarVersionDDragon();
  const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`No se pudieron obtener summoner spells: ${res.status}`);
  }

  const data = (await res.json()) as {
    data: Record<string, SummonerSpellData>;
  };

  SUMMONER_SPELLS_BY_ID = new Map(
    Object.values(data.data).map((spell) => [Number(spell.key), spell]),
  );

  return SUMMONER_SPELLS_BY_ID;
}

// ESTA es la función que usarás: recibe spellId:number y retorna Promise<string | null>
async function cargarSummonerSpells(spellId: number): Promise<string | null> {
  const version = await cargarVersionDDragon();
  const spellsMap = await cargarMapaSummonerSpells();

  const spell = spellsMap.get(spellId);
  if (!spell) return null;

  const url = `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.id}.png`;
  return url;
}

export { getChampionIconUrl, getItemIconUrl, cargarSummonerSpells };
