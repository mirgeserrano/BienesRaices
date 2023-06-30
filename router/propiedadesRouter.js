import express from "express";
import { body } from "express-validator";
import { admin, crear, guardar } from "../controllers/propiedadesController.js";
import { protegerRutas } from "../middleware/protegerRutas.js";

const router = express.Router();

router.get("/mis-propiedades", protegerRutas, admin);
router.get("/propiedades/crear", protegerRutas, crear);
router.post(
  "/propiedades/crear",
  protegerRutas,
  body("titulo")
    .notEmpty()
    .withMessage("Por favor anexar un Titulo al anuncio"),
  body("descripcion")
    .notEmpty()
    .withMessage("La descripcion no puede ir vacia")
    .isLength({ max: 250 })
    .withMessage("La descripcion es muy larga"),
  body("categoria")
    .isNumeric()
    .withMessage("Olvidaste seleccionar una categoria"),
  body("precio").isNumeric().withMessage("Olvidaste seleccionar un precio"),
  body("habitaciones")
    .isNumeric()
    .withMessage("Selecciona la cantidad de Habitaciones"),
  body("estacionamiento")
    .isNumeric()
    .withMessage("olvidaste seleccionar la cantidad de Estacionamiento"),
  body("wc").isNumeric().withMessage("olvidaste seleciona los baños"),
  body("lat").notEmpty().withMessage("Ubica la propiedad en el mapa"),

  guardar
);

export default router;
