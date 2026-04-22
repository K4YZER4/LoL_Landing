import { Request, Response } from "express";
import { todoDataPerfil } from "../services/todaData.services.js";
export async function obtenerTodoPerfilController(req: Request, res: Response) {
  const { name, cantidadPartidas } = req.params;
  try {
    const cantidad = Number(cantidadPartidas);
    const perfilCompleto = await todoDataPerfil(name as string, cantidad);

    res.json({
      perfilCompleto,
    });
  } catch (error) {
    console.error("Error al obtener el perfil completo:", error);
    res.status(500).json({
      error: `Error en el controlador de obtener perfil completo : ${error}`,
    });
  }
}
