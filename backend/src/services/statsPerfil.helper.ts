import { ResumenPartida } from "../types/resumenPartida.types.js";
import { StatsQueues, CampeonMasJugado } from "../types/statsWinrate.types.js";
export function calcularStatsQueues(partidas: ResumenPartida[]): StatsQueues {
  let partidasSoloq = 0;
  let partidasFlex = 0;
  let victoriasSoloq = 0;
  let victoriasFlex = 0;

  for (const partida of partidas) {
    switch (partida.queueId) {
      case 420: // Solo/Duo
        partidasSoloq++;
        if (partida.win) victoriasSoloq++;
        break;
      case 440: // Flex
        partidasFlex++;
        if (partida.win) victoriasFlex++;
        break;
    }
  }

  const derrotasSoloq = partidasSoloq - victoriasSoloq;
  const derrotasFlex = partidasFlex - victoriasFlex;

  const winrateSoloq =
    partidasSoloq > 0 ? Math.round((victoriasSoloq / partidasSoloq) * 100) : 0;

  const winrateFlex =
    partidasFlex > 0 ? Math.round((victoriasFlex / partidasFlex) * 100) : 0;

  return {
    partidasSoloq,
    victoriasSoloq,
    derrotasSoloq,
    winrateSoloq,
    partidasFlex,
    victoriasFlex,
    derrotasFlex,
    winrateFlex,
  };
}

export function calcularTop10Campeones(
  partidas: ResumenPartida[],
): CampeonMasJugado[] {
  const conteo: Record<string, { games: number; wins: number }> = {};

  for (const p of partidas) {
    const champ = p.championName;

    if (!conteo[champ]) {
      conteo[champ] = { games: 0, wins: 0 };
    }

    conteo[champ].games++;
    if (p.win) conteo[champ].wins++;
  }

  return Object.entries(conteo)
    .map(([championName, { games, wins }]) => ({
      championName,
      games,
      wins,
      winRate: (wins / games) * 100,
    }))
    .sort((a, b) => b.games - a.games)
    .slice(0, 10);
}
