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
router.get("/categoria", categoria);
//pagina 404
router.get("/404", noEncontrado);
//Buscador
router.get("/buscador", buscador);

export default router;
