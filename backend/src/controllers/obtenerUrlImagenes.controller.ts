import { Request, Response } from "express";
import { obetenerImagenesService } from "../services/obetenerUrlImagenes.services.js";
export async function obtenerUrlImagenesController(
  req: Request,
  res: Response,
) {
  const { championId, itemId } = req.params;
  try {
    const { championIconUrl, itemsConUrls } = await obetenerImagenesService(
      itemId as string,
      championId as string,
    );
    res.json({ championIconUrl, itemsConUrls });
  } catch (error) {
    console.error("Error al obtener las URLs de las imágenes:", error);
    res
      .status(500)
      .json({ error: "Error al obtener las URLs de las imágenes" });
  }
}
