import jwt from "jsonwebtoken";
import { Usuario } from "../models/index.js";

const identificarUsuario = async (req, res, next) => {
  //identificar si hay un token
  const { _token } = req.cookies;
  if (!_token) {
    req.usuario = null;
    return next();
  }
  //comprobar el token
  try {
    //comprobar si el token es valido y limpiar
    const decoded = jwt.verify(_token, process.env.SECRET_JWT_SEED);
    //veficar el usuario
    //scope eliminarPassword esta conectado con usuario para eliminar la informacion que no es importante
    const usuario = await Usuario.scope("eliminarPassword").findByPk(
      decoded.id
    );
    //Almanar o agregar el usuario al Req
    if (usuario) {
      req.usuario = usuario;
    }
    return next();
  } catch (error) {
    console.log(error);
    return res.clearCookie("_token").redirect("/auth/login");
  }
};

export { identificarUsuario };
