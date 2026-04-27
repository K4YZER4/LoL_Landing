import { obtenerPUUIDService } from "./obetenerPUUID.services.js";
import { obtenerHistorialService } from "./obtenerHistorial.services.js";
import { obetenerImagenesService } from "./obetenerUrlImagenes.services.js";
import { obtenerNombreService } from "./obtenerNombre.services.js";
import {
  calcularStatsQueues,
  calcularTop10Campeones,
} from "./statsPerfil.helper.js";
import {
  ResumenPartida,
  ResumenPartidaConImagenes,
  ResumenStats,
  ResumenPartidaStatsYImagenes,
} from "../types/resumenPartida.types.js";
export async function todoDataPerfil(
  name: string,
  cantidadPartidas: number,
): Promise<ResumenPartidaStatsYImagenes> {
  const puuid = await obtenerPUUIDService(name);
  const perfil = await obtenerNombreService(puuid);
  const historialObtenido: ResumenPartida[] =
    await obtenerHistorialService(puuid);
  const statsQueues = calcularStatsQueues(historialObtenido);
  const top10Campeones = await calcularTop10Campeones(historialObtenido);
  const stats: ResumenStats = {
    statsQueues,
    top10Campeones,
  };
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
    });
  }
  return { respuesta, stats, perfil };
}
