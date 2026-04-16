import { Request, Response } from "express";
import { obtenerPUUIDService } from "../services/obetenerPUUID.services.js";
export async function obtenerPUUIDController(req: Request, res: Response) {
  const { nombre } = req.params;
  try {
    const puuid = await obtenerPUUIDService(nombre as string);
    return res.json({ puuid });
  } catch (error) {
    console.error(`Error en el controlador de obtener PUUID: ${error}`);
    return res
      .status(500)
      .json({ error: `Error en el controlador de obtener PUUID: ${error}` });
  }
}
