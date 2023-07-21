import { Propiedad, Precio, Categoria } from "../models/index.js";
const propiedades = async (req, res) => {
  try {
    const propiedadesEnviadas = await Propiedad.findAll({
      include: [
        { model: Precio, as: "precio" },
        { model: Categoria, as: "categoria" },
      ],
    });
    res.json(propiedadesEnviadas);
  } catch (error) {
    console.log(error);
  }
};

export { propiedades };
