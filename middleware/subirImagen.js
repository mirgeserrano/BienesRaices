import multer from "multer";
import path from "path";
import { generarId } from "../helpers/tokens.js";
//path permite leer las capetas que tiene el proyecto

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //direccion de donde se guarda la imagen
    cb(null, "./public/uploads");
  },

  filename: function (req, file, cb) {
    //nombre del archivo que se va a generar
    cb(null, generarId() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export default upload;
