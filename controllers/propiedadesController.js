//import { unLink } from "node:fs/promises ";
import { validationResult } from "express-validator";
import { Categoria, Precio, Propiedad } from "../models/index.js";

const admin = async (req, res) => {
  const { id } = req.usuario;
  // aplicando where a Sequelize para buscar el id del usuario
  const propiedades = await Propiedad.findAll({
    where: {
      usuarioId: id,
    },
    // asi se incluye las uniones de tablas en zequeale
    include: [
      {
        model: Categoria,
        as: "categoria",
        //  required: true,
      },
      {
        model: Precio,
        as: "precio",
      },
    ],
  });

  res.render("propiedades/admin", {
    pagina: "Mis propiedades",
    propiedades,
    csrfToken: req.csrfToken(),
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
    //insertando la propiedad a la base de datos
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

    const { id } = propiedadGuardar;

    res.redirect(`/propiedades/agregar-imagen/${id}`);
  } catch (error) {
    console.log(error);
  }
};
const almacenarImagen = async (req, res, next) => {
  const { id } = req.params;

  // Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);
  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  // Validar que la propiedad no este publicada
  if (propiedad.publicado) {
    return res.redirect("/mis-propiedades");
  }

  // Validar que la propiedad pertenece a quien visita esta página
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect("/mis-propiedades");
  }

  try {
    // console.log(req.file)

    // Almacenar la imagen y publicar propiedad
    propiedad.imagen = req.file.filename;
    propiedad.publicado = 1;

    await propiedad.save();

    next();
  } catch (error) {
    console.log(error);
  }
};
const agregarImagen = async (req, res) => {
  const { id } = req.params;

  // Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);
  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  // Validar que la propiedad no este publicada
  if (propiedad.publicado) {
    return res.redirect("/mis-propiedades");
  }

  // Validar que la propiedad pertenece a quien visita esta página
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect("/mis-propiedades");
  }

  res.render("propiedades/agregar-imagen", {
    pagina: `Agregar Imagen: ${propiedad.titulo}`,
    csrfToken: req.csrfToken(),
    propiedad,
  });
};

const editar = async (req, res) => {
  const { id } = req.params;
  // Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);
  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  // Validar que la propiedad pertenece a quien visita esta página
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect("/mis-propiedades");
  }

  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll(),
  ]);
  res.render("propiedades/editar", {
    pagina: "Editar propiedades",
    csrfToken: req.csrfToken(),
    categorias,
    precios,
    // Editar, pasamos el objeto lleno para leer las propiedades
    datos: propiedad,
  });
};

const guardarCambios = async (req, res) => {
  //verificar la validacion del formulario
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    const [categorias, precios] = await Promise.all([
      Categoria.findAll(),
      Precio.findAll(),
    ]);

    return res.render("propiedades/editar", {
      pagina: "Editar propiedades",
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      errores: resultado.array(),
      //este el ultimo req
      datos: req.body,
    });
  }

  const { id } = req.params;
  // Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);
  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  // Validar que la propiedad pertenece a quien visita esta página
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect("/mis-propiedades");
  }
  //Reescribir el obeto y guardar
  try {
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
    propiedad.set({
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
    });
    await propiedad.save();
    res.redirect("/mis-propiedades");
  } catch (error) {
    console.log(error);
  }
};

const eliminar = async (req, res) => {
  const { id } = req.params;
  // Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);
  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  // Validar que la propiedad pertenece a quien visita esta página
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect("/mis-propiedades");
  }
  //Eliminar la imagen
  //await unLink(`public/uploads/${propiedad.imagen}`);
  //eliminar la propiedad
  await propiedad.destroy();
  res.redirect("/mis-propiedades");
};

export {
  admin,
  crear,
  guardar,
  agregarImagen,
  almacenarImagen,
  editar,
  guardarCambios,
  eliminar,
};
