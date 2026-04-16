import { obtenerPUUID } from "../clients/index.js";
export async function obtenerPUUIDService(nombre: string): Promise<string> {
  return await obtenerPUUID(nombre);
}
