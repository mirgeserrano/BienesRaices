import { Dropzone } from "dropzone";

const token = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content");

Dropzone.options.imagen = {
  dictDefaultMessage: "Sube tus imagenes aquí",
  acceptedFiles: ".png,.jpg,jpeg",
  maxFilesize: 5,
  maxFiles: 1,
  parallelUploads: 1,
  autoProcessQueue: true,
  addRemoveLinks: true,
  dictRemoveFile: "Borrar Archivo",
  dictMaxFilesExceeded: "El limite es 1 archivo",
  dictFileTooBig: "El limite pesar menos de 5 MB",
  //validar el token
  headers: {
    "CSRF-Token": token,
  },
  //nombre para conectar con el servidor
  paramName: "imagen",
  ini: function () {
    const dropzone = this;
    const btnpublicar = document.querySelector("#publicar");

    btnpublicar.addEventListener("click", function () {
      dropzone.processQueue();
    });

    dropzone.on("queuecomplete", function () {
      if (dropzone.getActiveFiles().length == 0) {
        window.location.href("/mis-propiedades");
      }
    });
  },
};
