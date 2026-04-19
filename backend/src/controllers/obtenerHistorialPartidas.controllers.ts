import { obtenerHistorialService } from "../services/obtenerHistorial.services.js";
import { Request, Response } from "express";
export async function obtenerHistorialController(req: Request, res: Response) {
  try {
    const { puuid } = req.params;
    const historial = await obtenerHistorialService(puuid as string);
    return res.json({ historial });
  } catch (error) {
    return res.status(500).json({
      error: `Error en el controlador de obtener historial : ${error}`,
    });
  }
}
