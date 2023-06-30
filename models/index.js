import Precio from "./Precio.js";
import Propiedad from "./Propiedad.js";
import Usuario from "./Usuario.js";
import Categoria from "./Categoria.js";

//Precio.hasOne(Propiedad);
Propiedad.belongsTo(Precio);
Propiedad.belongsTo(Categoria);
Propiedad.belongsTo(Usuario);

export { Precio, Propiedad, Usuario, Categoria };
