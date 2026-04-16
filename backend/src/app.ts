import dotenv from "dotenv";
import express, { Request, Response, Router } from "express";
import { obtenerPUUIDRouter } from "./routes/index.js";
import { obtenerNombreRouter } from "./routes/index.js";
dotenv.config();
const app = express();
app.use(obtenerNombreRouter);
app.use(obtenerPUUIDRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
