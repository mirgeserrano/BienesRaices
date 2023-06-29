import DataTypes from "sequelize";
import db from "../config/db.js";

const Categoria = db.define("categorias", {
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});

//Metodo que verifica un passaword

export default Categoria;
