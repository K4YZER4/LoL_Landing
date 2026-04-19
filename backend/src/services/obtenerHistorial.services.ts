import { obtenerResumenUltimasPartidas } from "../clients/obtenerResumenUltimasPartidas.clients.js";
export async function obtenerHistorialService(puuid: string) {
  return await obtenerResumenUltimasPartidas(puuid);
}
