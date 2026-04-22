import dotenv from "dotenv";
import express, { Request, Response, Router } from "express";
import {
  obtenerPUUIDRouter,
  obtenerHistorialRouter,
  obtenerNombreRouter,
  obtenerUrlImagenesRouter,
  routerTodoPerfil,
} from "./routes/index.js";
dotenv.config();
const app = express();
app.use(obtenerUrlImagenesRouter);
app.use(obtenerNombreRouter);
app.use(obtenerPUUIDRouter);
app.use(obtenerHistorialRouter);
app.use(routerTodoPerfil);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
