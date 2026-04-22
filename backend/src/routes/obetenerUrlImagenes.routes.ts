import { Router } from "express";
import { obtenerUrlImagenesController } from "../controllers/obtenerUrlImagenes.controller.js";
import { validarChmpionYItem } from "../middlewares/obtenerUrlImagenes.middlewares.js";
export const obtenerUrlImagenesRouter = Router();
obtenerUrlImagenesRouter.get(
  "/imagenes/:championId/:itemId/:spellsId",
  validarChmpionYItem,
  obtenerUrlImagenesController,
);
