import { Request, Response, NextFunction } from "express";
export async function validarChmpionYItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { championId, itemId } = req.params;
  if (!championId || !itemId) {
    return res
      .status(400)
      .json({ error: "El championId y itemId son requeridos" });
  }
  next();
}
