(function () {
  const lat = 10.6637876;
  const lng = -71.6238064;
  const mapa = L.map("mapa-inicio").setView([lat, lng], 16);

  let markers = new L.FeatureGroup().addTo(mapa);
  L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
  }).addTo(mapa);

  const obtenerPropiedades = async () => {
    try {
      const url = "/api/propiedades";
      const respuesta = await fetch(url);
      const propiedades = await respuesta.json();
      console.log(propiedades);
      mostrarPropiedades(propiedades);
    } catch (error) {
      console.log(error);
    }
  };

  const mostrarPropiedades = (propiedades) => {
    try {
      propiedades.forEach((propiedad) => {
        const marker = new L.marker([propiedad?.lng, propiedad?.logintud], {
          autoPan: true,
        }).addTo(mapa)
          .bindPopup(`<p class='text-indigo-800 font-bold'>${propiedad.categoria.nombre}</p>
          <h1 class='text-xl font-extrabold  capitalize my-2'>${propiedad?.titulo}</h1>
          <img src="/uploads/${propiedad?.imagen}" alt="Imagen de la propiedad ${propiedad.titulo}">
          <p class="text-gray-600 font-bold">${propiedad.precio.nombre}</p>
          <a href="" class="">Ver Propiedad</a>
`);
        markers.addLayer(marker);
      });
    } catch (error) {
      console.log(error);
    }
  };
  obtenerPropiedades();
})();
