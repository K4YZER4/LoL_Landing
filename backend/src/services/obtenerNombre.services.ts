import { obtenerNombre } from "../clients/obtenerNombre.clients.js";
export async function obtenerNombreService(puuid: string) {
  return await obtenerNombre(puuid);
}
