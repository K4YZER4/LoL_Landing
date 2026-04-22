import { obtenerPUUIDService } from "./obetenerPUUID.services.js";
import { obtenerHistorialService } from "./obtenerHistorial.services.js";
import { obetenerImagenesService } from "./obetenerUrlImagenes.services.js";
import {
  calcularStatsQueues,
  calcularTop10Campeones,
} from "./statsPerfil.helper.js";
import {
  ResumenPartida,
  ResumenPartidaConImagenes,
} from "../types/resumenPartida.types.js";
export async function todoDataPerfil(
  name: string,
  cantidadPartidas: number,
): Promise<ResumenPartidaConImagenes[]> {
  const puuid = await obtenerPUUIDService(name);
  const historialObtenido: ResumenPartida[] =
    await obtenerHistorialService(puuid);
  const statsQueues = calcularStatsQueues(historialObtenido);
  const top10Campeones = calcularTop10Campeones(historialObtenido);
  const respuesta: ResumenPartidaConImagenes[] = [];
  for (let i = 0; i < cantidadPartidas; i++) {
    const partida = historialObtenido[i];
    if (!partida) break;

    const { championName, items, summonerSpells } = partida;

    const {
      championIconUrl,
      itemsConUrls,
      summonerSpells: summonerSpellsConUrls,
    } = await obetenerImagenesService(
      items.join(","), // "3068,3111,3075,0,0,0,3364"
      championName,
      `${summonerSpells.spell1Id},${summonerSpells.spell2Id}`, // "4,7"
    );

    respuesta.push({
      ...partida,
      championIconUrl,
      itemsConUrls,
      summonerSpellsConUrls,
      statsQueues,
      top10Campeones,
    });
  }
  return respuesta;
}
