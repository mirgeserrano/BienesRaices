(function () {
  const lat = 10.6637876;
  const lng = -71.6238064;
  const mapa = L.map("mapa-inicio").setView([lat, lng], 16);

  let markers = new L.FeatureGroup().addTo(mapa);
  let propiedades = [];
  //filtros
  const filtros = {
    categoria: "",
    precio: "",
  };

  const categoriaSelect = document.querySelector("#categorias");
  const precioSelect = document.querySelector("#precios");

  L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
  }).addTo(mapa);

  //filtros de categoria y precio
  categoriaSelect.addEventListener("change", (e) => {
    filtros.categoria = +e.target.value;
    filtrarPropiedades();
  });

  precioSelect.addEventListener("change", (e) => {
    filtros.precio = +e.target.value;
    filtrarPropiedades();
  });

  const obtenerPropiedades = async () => {
    try {
      const url = "/api/propiedades";
      const respuesta = await fetch(url);
      propiedades = await respuesta.json();
      //console.log(propiedades);
      mostrarPropiedades(propiedades);
    } catch (error) {
      console.log(error);
    }
  };

  const mostrarPropiedades = (propiedades) => {
    //limpiar los markers precios
    markers.clearLayers();
    try {
      propiedades.forEach((propiedad) => {
        const marker = new L.marker([propiedad?.lng, propiedad?.logintud], {
          autoPan: true,
        }).addTo(mapa)
          .bindPopup(`<p class='text-indigo-800 font-bold'>${propiedad.categoria.nombre}</p>
          <h1 class='text-xl font-extrabold  capitalize my-2'>${propiedad?.titulo}</h1>
          <img src="/uploads/${propiedad?.imagen}" alt="Imagen de la propiedad ${propiedad.titulo}">
          <p class="text-gray-600 font-bold">${propiedad.precio.nombre}</p>
          <a href=/propiedad/${propiedad.id} class="rounded py-2 px-10 bg-indigo-500 hover:bg-indigo-600 text-sm font-bold text-center text-white  my-5  inline-block  w-full md:w-auto">Ver Propiedad</a>
`);
        markers.addLayer(marker);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const filtrarPropiedades = () => {
    const resultado = propiedades
      .filter(filtrarCategoria)
      .filter(filtrarPrecio);
    mostrarPropiedades(resultado);
  };

  const filtrarCategoria = (propiedad) => {
    return filtros.categoria
      ? propiedad.categoriaId === filtros.categoria
      : propiedad;
  };

  const filtrarPrecio = (propiedad) => {
    return filtros.precio ? propiedad.precioId === filtros.precio : propiedad;
  };
  obtenerPropiedades();
})();
