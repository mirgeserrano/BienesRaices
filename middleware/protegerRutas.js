import jwt from "jsonwebtoken";
import { Usuario } from "../models/index.js";

const protegerRutas = async (req, res, next) => {
  const { _token } = req.cookies;

  if (!_token) {
    return res.redirect("/auth/login");
  }

  try {
    //verificar token y limpiar
    const decoded = jwt.verify(_token, process.env.SECRET_JWT_SEED);
    //veficar el usuario
    const usuario = await Usuario.scope("eliminarPassword").findByPk(
      decoded.id
    );
    //Almanar el usuario al Req
    if (usuario) {
      req.usuario = usuario;
    } else {
      return res.redirect("/auth/login");
    }
    return next();
  } catch (error) {
    return res.clearCookie("_token").redirect("/auth/login");
  }
};

export { protegerRutas };
