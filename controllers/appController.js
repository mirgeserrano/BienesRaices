import { Propiedad, Precio, Categoria } from "../models/index.js";

const inicio = async (req, res) => {
  try {
    //consulta a la base de datos
    const [categorias, precios, casas, departamentos] = await Promise.all([
      Categoria.findAll({ raw: true }),
      Precio.findAll({ raw: true }),

      // consulta para traer solo las casas
      Propiedad.findAll({
        limit: 3,
        where: {
          categoriaId: 1,
        },
        include: [
          {
            model: Precio,
            as: "precio",
          },
        ],
        order: [["createdAt", "DESC"]],
      }),
      // consultas para traer solo los despartamentos
      Propiedad.findAll({
        limit: 3,
        where: {
          categoriaId: 2,
        },
        include: [
          {
            model: Precio,
            as: "precio",
          },
        ],
        order: [["createdAt", "DESC"]],
      }),
    ]);

    res.render("inicio", {
      pagina: "inicio",
      categorias,
      precios,
      casas,
      departamentos,
    });
  } catch (error) {
    console.log(error);
  }
};
const categoria = async (req, res) => {
  const { id } = req.params;

  //Comprobar que la categoria exista
  const categoria = await Categoria.findByPk(id);
  if (!categoria) {
    return res.redirect("/404");
  }
  //obtener laas propieddades de la categoria
  const propiedades = await Propiedad.findAll({
    where: {
      categoriaId: id,
    },
    include: [{ model: Precio, as: "precio" }],
  });
  res.render("categoria", {
    pagina: ` ${categoria.nombre}s en Ventas`,
    propiedades,
  });
};
const noEncontrado = (req, res) => {
  res.render("404", {
    pagina: "No Encontrado",
  });
};
const buscador = () => {};
export { inicio, categoria, noEncontrado, buscador };
