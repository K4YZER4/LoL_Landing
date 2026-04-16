import { Router } from "express";
import { obtenerPUUIDController } from "../controllers/validarObtenerPUUID.controllers.js";
import { validarObtenerPUUID } from "../middlewares/validarObetenerPUUID.middlewares.js";
const router = Router();
router.get("/puuid/:nombre", validarObtenerPUUID, obtenerPUUIDController);
export { router as obtenerPUUIDRouter };
