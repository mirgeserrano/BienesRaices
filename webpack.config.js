import path from "path";

export default {
  mode: "development",
  entry: {
    mapa: "./src/js/mapa.js",
  },
  output: {
    //
    filename: "[name].js",
    //ubicacion
    path: path.resolve("public/js"),
  },
};
