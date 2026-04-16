import { Request, Response, NextFunction } from "express";

export async function validarObtenerPUUID(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { nombre } = req.params;
  if (!nombre) {
    return res.status(400).json({ error: "El nombre es requerido" });
  }
  next();
}
