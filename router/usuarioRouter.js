import express from "express";
import {
  confirmar,
  formularioLogin,
  formularioOlvidePassword,
  formularioRes,
  resgistrar,
  resetPassword,
  comprobarToken,
  nuevoPassword,
  auntenticar,
} from "../controllers/usuarioController.js";
const router = express.Router();

router.get("/login", formularioLogin);
router.post("/login", auntenticar);

router.get("/registrar", formularioRes);
router.post("/registro", resgistrar);

router.get("/confirmar/:token", confirmar);

router.get("/olvide-password", formularioOlvidePassword);
router.post("/olvide-password", resetPassword);

//Almacena el nuevo possword
router.get("/olvide-password/:token", comprobarToken);
router.post("/olvide-password/:token", nuevoPassword);

export default router;
