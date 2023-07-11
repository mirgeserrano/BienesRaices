import jwt from "jsonwebtoken";
import { Usuario } from "../models/index.js";

const protegerRutas = async (req, res, next) => {
  //verificar si hay un token
  const { _token } = req.cookies;

  if (!_token) {
    return res.redirect("/auth/login");
  }

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
    } else {
      return res.redirect("/auth/login");
    }
    return next();
  } catch (error) {
    //limpiamos el token y redireccionamos hacia el login
    return res.clearCookie("_token").redirect("/auth/login");
  }
};

export { protegerRutas };
