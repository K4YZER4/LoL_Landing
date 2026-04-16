import { Router } from "express";
import { obtenerNombreController } from "../controllers/obtenerNombre.controllers.js";
import { validarPPUID } from "../middlewares/validarObtenerNombre.middlewares.js";
const router = Router();
router.get("/nombre/:puuid", validarPPUID, obtenerNombreController);
export { router as obtenerNombreRouter };
