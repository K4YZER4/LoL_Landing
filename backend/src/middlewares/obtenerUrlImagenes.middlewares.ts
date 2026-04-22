import { Request, Response, NextFunction } from "express";
export async function validarChmpionYItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { championId, itemId, spellsId } = req.params;
  if (!championId || !itemId || !spellsId) {
    return res
      .status(400)
      .json({ error: "El championId, itemId y spellsId son requeridos" });
  }
  next();
}
