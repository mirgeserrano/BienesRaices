import express from "express";
import {
  inicio,
  categoria,
  noEncontrado,
  buscador,
} from "../controllers/appController.js";

const router = express.Router();
//Pagina de inicio
router.get("/", inicio);
//categorias
router.get("/categoria/:id", categoria);
//pagina 404
router.get("/404", noEncontrado);
//Buscador
router.post("/buscador", buscador);

export default router;
