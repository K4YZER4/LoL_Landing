import { obtenerPUUIDService } from "./obetenerPUUID.services.js";
import { obtenerHistorialService } from "./obtenerHistorial.services.js";
import { obetenerImagenesService } from "./obetenerUrlImagenes.services.js";
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
  let cantidadPartidasJugadas = 0;
  let victoriasSoloq = 0;
  let derrotasSoloq = 0;
  let victoriasFlex = 0;
  let derrotasFlex = 0;
  let winrateSoloq = 0;
  let winrateFlex = 0;
  for (const partida of historialObtenido) {
    cantidadPartidasJugadas++;
    switch (partida.queueId) {
      case 420: // Solo/Duo
        if (partida.win) {
          victoriasSoloq++;
        } else {
          derrotasSoloq++;
        }
        break;
      case 440: // Flex
        if (partida.win) {
          victoriasFlex++;
        } else {
          derrotasFlex++;
        }
        break;
    }
  }
  winrateSoloq =
    victoriasSoloq > 0
      ? Math.round((victoriasSoloq / (victoriasSoloq + derrotasSoloq)) * 100)
      : 0;
  winrateFlex =
    victoriasFlex > 0
      ? Math.round((victoriasFlex / (victoriasFlex + derrotasFlex)) * 100)
      : 0;
  console.log(winrateFlex, winrateSoloq);
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
  return respuesta;
}
