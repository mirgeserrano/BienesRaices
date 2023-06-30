import { exit } from "node:process";
import db from "../config/db.js";
import catagerias from "./categorias.js";
import precios from "./precios.js";
import usuarios from "./usuarios.js";
import { Precio, Categoria, Usuario } from "../models/index.js";

const importData = async () => {
  try {
    // autenticar
    await db.authenticate();
    //generar las columnas
    await db.sync();
    //insertar datos
    await Promise.all([
      Categoria.bulkCreate(catagerias),
      Precio.bulkCreate(precios),
      Usuario.bulkCreate(usuarios),
    ]);

    console.log("datos importados");
    exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await db.sync({ force: true });
    console.log("Delete Data");
    exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  importData();
}
//"db:import": "node./seed/seeder.js -i"

if (process.argv[2] === "-e") {
  deleteData();
}

//notas
//*exit() o exit(0) significa que ejecuto todo bien
//*exit(1) significa que codifico pero tiene un error
