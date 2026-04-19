import dotenv from "dotenv";
import express, { Request, Response, Router } from "express";
import {
  obtenerPUUIDRouter,
  obtenerHistorialRouter,
  obtenerNombreRouter,
} from "./routes/index.js";
dotenv.config();
const app = express();
app.use(obtenerNombreRouter);
app.use(obtenerPUUIDRouter);
app.use(obtenerHistorialRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
