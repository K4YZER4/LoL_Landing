import { ResumenPartida } from "../types/index.js";

// puuid = tu PUUID
export async function obtenerResumenPartida(
  matchId: string,
  puuid: string,
): Promise<ResumenPartida> {
  const url = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`;

  const resp = await fetch(url, {
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY as string,
    },
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(
      `Error al obtener partida ${matchId}: ${resp.status} ${text}`,
    );
  }

  const data = (await resp.json()) as any;

  const info = data.info;
  const metadata = data.metadata;

  // índice de tu jugador dentro de participants
  const index = metadata.participants.indexOf(puuid);
  if (index === -1) {
    throw new Error(
      "Tu puuid no se encontró en los participantes de la partida",
    );
  }

  const p = info.participants[index];

  const items: number[] = [
    p.item0,
    p.item1,
    p.item2,
    p.item3,
    p.item4,
    p.item5,
    p.item6,
  ];

  const resumen: ResumenPartida = {
    matchId: metadata.matchId,
    queueId: info.queueId,
    durationSeconds: info.gameDuration,

    win: p.win,
    championName: p.championName,
    role: p.teamPosition, // TOP/JUNGLE/MIDDLE/BOTTOM/UTILITY

    kills: p.kills,
    deaths: p.deaths,
    assists: p.assists,

    items,
    summonerSpells: {
      spell1Id: p.summoner1Id,
      spell2Id: p.summoner2Id,
    },
  };

  return resumen;
}
