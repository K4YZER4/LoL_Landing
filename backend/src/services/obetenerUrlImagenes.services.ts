import {
  getItemIconUrl,
  getChampionIconUrl,
  cargarSummonerSpells,
} from "../clients/obetenerUrlImagenes.clients.js";

export async function obetenerImagenesService(
  items: string,
  champion: string,
  spellsId: string,
) {
  const championIconUrl = await getChampionIconUrl(champion);
  const itemsArray: number[] = items.split(",").map(Number);
  const spellsArray: number[] = spellsId.split(",").map(Number);
  const itemsConUrls = await Promise.all(
    itemsArray.map(async (itemId) => await getItemIconUrl(itemId)),
  );
  const summonerSpells = await Promise.all(
    spellsArray.map(async (spellId) => await cargarSummonerSpells(spellId)),
  );

  return {
    championIconUrl,
    itemsConUrls,
    summonerSpells,
  };
}
