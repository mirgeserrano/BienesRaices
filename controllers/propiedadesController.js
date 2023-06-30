import { validationResult } from "express-validator";
import { Categoria, Precio, Propiedad } from "../models/index.js";

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
    //objeto vacio
    datos: {},
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
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      errores: resultado.array(),
      datos: req.body,
    });
  }

  const {
    titulo,
    descripcion,
    habitaciones,
    estacionamiento,
    wc,
    calle,
    lat: lng,
    logintud,
    precio: precioId,
    categoria: categoriaId,
  } = req.body;
  const { id: usuarioId } = req.usuario;

  try {
    const propiedadGuardar = await Propiedad.create({
      titulo,
      descripcion,
      habitaciones,
      estacionamiento,
      wc,
      calle,
      lng,
      logintud,
      precioId,
      categoriaId,
      usuarioId,
      imagen: "",
    });
    //console.log(propiedadGuardar);
    const { id } = propiedadGuardar;
    res.redirect(`/propiedades/agregar-imagen/${id}`);
  } catch (error) {
    console.log(error);
  }
};
export { admin, crear, guardar };
