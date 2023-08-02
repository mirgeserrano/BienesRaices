(function () {
  try {
    const cambiarEstadoBotton = document.querySelector(".cambiar-estado");
    //console.log(cambiarEstadoBotton);
    cambiarEstadoBotton.map(function (botton) {
      botton.addEventListener("click", cambiarEstadoPropiedad);
    });

    // cambiarEstadoBotton.forEach((botton) => {

    //   botton.addEventListener("click", cambiarEstadoPropiedad);
    // });

    const cambiarEstadoPropiedad = (e) => {
      const { propiedadId: id } = e.target.dataset;
      console.log(id);
    };
  } catch (error) {
    console.log(error);
  }
})();
