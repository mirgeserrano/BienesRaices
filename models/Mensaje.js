import DataTypes from "sequelize";
import db from "../config/db.js";

const Mensaje = db.define("mensajes", {
  nombre: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
});

//Metodo que verifica un passaword

export default Mensaje;
