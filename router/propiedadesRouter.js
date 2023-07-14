import express from "express";
import { body } from "express-validator";
import {
  admin,
  crear,
  guardar,
  agregarImagen,
  almacenarImagen,
  editar,
  guardarCambios,
  eliminar,
  mostrarPropiedad,
} from "../controllers/propiedadesController.js";
import { protegerRutas } from "../middleware/protegerRutas.js";
import upload from "../middleware/subirImagen.js";

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
router.get("/propiedades/agregar-imagen/:id", protegerRutas, agregarImagen);

router.post(
  "/propiedades/agregar-imagen/:id",
  protegerRutas,
  upload.single("imagen"),
  almacenarImagen
);
router.get("/propiedades/editar/:id", protegerRutas, editar);

router.post(
  "/propiedades/editar/:id",
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
  guardarCambios
);

router.post("/propiedades/eliminar/:id", protegerRutas, eliminar);

//rutas publicas
router.get("/propiedad/:id", mostrarPropiedad);

export default router;
