import Precio from "../models/Precio.js";
import Categoria from "../models/Categoria.js";
import { validationResult } from "express-validator";

const admin = (req, res) => {
  res.render("propiedades/admin", {
    pagina: "Mis propiedades",
    barra: true,
  });
};

//Fromulario oara crear una nueva propiedad
const crear = async (req, res) => {
  //Consulta a la base da datos
  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll(),
  ]);
  res.render("propiedades/crear", {
    pagina: "Crear propiedades",
    barra: true,
    csrfToken: req.csrfToken(),
    categorias,
    precios,
  });
};

const guardar = async (req, res) => {
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    const [categorias, precios] = await Promise.all([
      Categoria.findAll(),
      Precio.findAll(),
    ]);
    res.render("propiedades/crear", {
      pagina: "Crear propiedades",
      barra: true,
      categorias,
      precios,
      errrores: resultado.array(),
    });
  }
};
export { admin, crear, guardar };
