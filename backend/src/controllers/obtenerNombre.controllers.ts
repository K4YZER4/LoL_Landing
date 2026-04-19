import { Request, Response } from "express";
import { obtenerNombreService } from "../services/obtenerNombre.services.js";
export async function obtenerNombreController(req: Request, res: Response) {
  try {
    const { puuid } = req.params;
    const nombre = await obtenerNombreService(puuid as string);
    return res.json({ nombre });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error en el controlador de obtener nombre : ${error}` });
  }
}
