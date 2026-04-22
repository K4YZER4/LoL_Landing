import { Router } from "express";
const routerTodoPerfil = Router();
import { obtenerTodoPerfilController } from "../controllers/obtenerTodoPerfil.controller.js";
routerTodoPerfil.get(
  "/perfil/:name/:cantidadPartidas",
  obtenerTodoPerfilController,
);
export { routerTodoPerfil };
