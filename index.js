import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import usuarioRouter from "./router/usuarioRouter.js";
import propiedadesRouter from "./router/propiedadesRouter.js";
import db from "./config/db.js";

//creo la app
const app = express();

//habilitar lectura de datos
app.use(express.urlencoded({ extended: true }));

//Habilitar cookieParser
app.use(cookieParser());

//Habilitar CSRF
app.use(csrf({ cookie: true }));

//conexion a la base de datos
try {
  await db.authenticate();
  db.sync();
  console.log("conexion correcta base de datos");
} catch (error) {
  console.log(error);
}

//Habilitar Pug
app.set("view engine", "pug");
app.set("views", "./views");

//Capetas publica
app.use(express.static("public"));

//Routing
//use busca todas la que usa /
app.use("/auth", usuarioRouter);
app.use("/", propiedadesRouter);

// Definir el puerto
const port = process.env.PORT || 4000;
// escuchar peticiones
app.listen(port, () => {
  console.log(`el servidor esta corriendo en el puerto ${port}`);
});
