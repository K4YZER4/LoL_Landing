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
async function getItemIconUrl(itemId: number): Promise<string> {
  const version = await cargarVersionDDragon();
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`;
}

export { getChampionIconUrl, getItemIconUrl };
