import {
  getItemIconUrl,
  getChampionIconUrl,
} from "../clients/obetenerUrlImagenes.clients.js";

export async function obetenerImagenesService(items: string, champion: string) {
  const championIconUrl = await getChampionIconUrl(champion);
  const itemsArray: number[] = items.split(",").map(Number);
  const itemsConUrls = await Promise.all(
    itemsArray.map(async (itemId) => await getItemIconUrl(itemId)),
  );
  return {
    championIconUrl,
    itemsConUrls,
  };
}
