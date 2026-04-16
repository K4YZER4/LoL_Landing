import { Request, Response, NextFunction } from "express";
export async function validarPPUID(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { puuid } = req.params;
  if (!puuid) {
    return res.status(400).json({ error: "El PUUID es requerido" });
  }
  next();
}
