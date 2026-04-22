import { ResumenPartida } from "../types/index.js";
import { obtenerResumenPartida } from "./obtenerResumenPartida.clients.js";
export async function obtenerResumenUltimasPartidas(
  puuid: string,
  count = 40,
): Promise<ResumenPartida[]> {
  const idsUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}`;

  const idsResp = await fetch(idsUrl, {
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY as string,
    },
  });

  if (!idsResp.ok) {
    const text = await idsResp.text();
    throw new Error(
      `Error al obtener IDs de partidas: ${idsResp.status} ${text}`,
    );
  }

  const matchIds = (await idsResp.json()) as string[];

  const resultados: ResumenPartida[] = [];

  for (const id of matchIds) {
    const resumen = await obtenerResumenPartida(id, puuid);
    resultados.push(resumen);
  }

  return resultados;
}
