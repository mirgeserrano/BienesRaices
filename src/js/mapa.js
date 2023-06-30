(function () {
  //logincal OR
  const lat = document.querySelector("#lat").value || 10.6637876;
  const lng = document.querySelector("#logintud").value || -71.6238064;
  const mapa = L.map("mapa").setView([lat, lng], 16);
  let marker;

  //utilizar provider y geocoder para localizar la calle del mapa

  const geocodeService = L.esri.Geocoding.geocodeService();

  L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
  }).addTo(mapa);

  //El Pin
  marker = new L.marker([lat, lng], {
    draggable: true,
    autoPan: true,
  }).addTo(mapa);

  //Detecatar el movimiento del pin
  marker.on("moveend", function (coordenada) {
    marker = coordenada.target;
    const posicion = marker.getLatLng();
    // console.log(posicion);
    mapa.panTo(new L.LatLng(posicion.lat, posicion.lng));
    // obtener la informacion de las calles al soltar el pin

    geocodeService
      .reverse()
      .latlng(posicion, 13)
      //obtener la calle
      .run(function (error, resultado) {
        console.log(resultado);
        marker.bindPopup(resultado.address.LongLabel);
        //llenar los campos
        document.querySelector(".calle").textContent =
          resultado?.address?.Address ?? "";
        document.querySelector("#calle").value =
          resultado?.address?.Address ?? "";
        document.querySelector("#lat").value = resultado?.latlng?.lat ?? "";
        document.querySelector("#logintud").value =
          resultado?.latlng?.lng ?? "";
      });
  });
})();
