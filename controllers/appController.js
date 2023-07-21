import { Propiedad, Precio, Categoria } from "../models/index.js";

const inicio = async (req, res) => {
  const [categorias, precios] = await Promise.all([
    Categoria.findAll({ raw: true }),
    Precio.findAll({ raw: true }),
  ]);
  res.render("inicio", {
    pagina: "inicio",
    categorias,
    precios,
  });
};
const categoria = () => {};
const noEncontrado = () => {};
const buscador = () => {};
export { inicio, categoria, noEncontrado, buscador };
