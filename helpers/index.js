const esVendedor = (usuarioId, PropiedadUsuarioId) => {
  return usuarioId === PropiedadUsuarioId;
};

const formatearFecha = (fecha) => {
  //conviert en string
  const newDate = new Date(fecha).toISOString().slice(0, 10);
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(newDate).toLocaleDateString("es-Es", opciones);
};

export { esVendedor, formatearFecha };
