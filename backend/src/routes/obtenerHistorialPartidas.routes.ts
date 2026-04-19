import { obtenerHistorialController } from "../controllers/obtenerHistorialPartidas.controllers.js";
import { Router } from "express";
import { validarPPUID } from "../middlewares/validarObtenerNombre.middlewares.js";
const router = Router();
router.get("/historial/:puuid", validarPPUID, obtenerHistorialController);
export { router as obtenerHistorialRouter };
