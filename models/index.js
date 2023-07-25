import Precio from "./Precio.js";
import Propiedad from "./Propiedad.js";
import Usuario from "./Usuario.js";
import Categoria from "./Categoria.js";
import Mensaje from "./Mensaje.js";

//Precio.hasOne(Propiedad);
Propiedad.belongsTo(Precio);
Propiedad.belongsTo(Categoria);
Propiedad.belongsTo(Usuario);

Mensaje.belongsTo(Propiedad, { foreignKey: "propiedadId" });
Mensaje.belongsTo(Usuario, { foreignKey: "usuarioId" });

export { Precio, Propiedad, Usuario, Categoria, Mensaje };
