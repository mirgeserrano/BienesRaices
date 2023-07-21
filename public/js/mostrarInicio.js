/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mostrarInicio.js":
/*!*********************************!*\
  !*** ./src/js/mostrarInicio.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function () {\r\n  const lat = 10.6637876;\r\n  const lng = -71.6238064;\r\n  const mapa = L.map(\"mapa-inicio\").setView([lat, lng], 16);\r\n\r\n  let markers = new L.FeatureGroup().addTo(mapa);\r\n  L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {\r\n    attribution: `&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors`,\r\n  }).addTo(mapa);\r\n\r\n  const obtenerPropiedades = async () => {\r\n    try {\r\n      const url = \"/api/propiedades\";\r\n      const respuesta = await fetch(url);\r\n      const propiedades = await respuesta.json();\r\n      console.log(propiedades);\r\n      mostrarPropiedades(propiedades);\r\n    } catch (error) {\r\n      console.log(error);\r\n    }\r\n  };\r\n\r\n  const mostrarPropiedades = (propiedades) => {\r\n    try {\r\n      propiedades.forEach((propiedad) => {\r\n        const marker = new L.marker([propiedad?.lng, propiedad?.logintud], {\r\n          autoPan: true,\r\n        }).addTo(mapa)\r\n          .bindPopup(`<p class='text-indigo-800 font-bold'>${propiedad.categoria.nombre}</p>\r\n          <h1 class='text-xl font-extrabold  capitalize my-2'>${propiedad?.titulo}</h1>\r\n          <img src=\"/uploads/${propiedad?.imagen}\" alt=\"Imagen de la propiedad ${propiedad.titulo}\">\r\n          <p class=\"text-gray-600 font-bold\">${propiedad.precio.nombre}</p>\r\n          <a href=\"\" class=\"\">Ver Propiedad</a>\r\n`);\r\n        markers.addLayer(marker);\r\n      });\r\n    } catch (error) {\r\n      console.log(error);\r\n    }\r\n  };\r\n  obtenerPropiedades();\r\n})();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvbW9zdHJhckluaWNpby5qcyIsIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmllbmVzcmFpY2VzLy4vc3JjL2pzL21vc3RyYXJJbmljaW8uanM/MjE4YyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xyXG4gIGNvbnN0IGxhdCA9IDEwLjY2Mzc4NzY7XHJcbiAgY29uc3QgbG5nID0gLTcxLjYyMzgwNjQ7XHJcbiAgY29uc3QgbWFwYSA9IEwubWFwKFwibWFwYS1pbmljaW9cIikuc2V0VmlldyhbbGF0LCBsbmddLCAxNik7XHJcblxyXG4gIGxldCBtYXJrZXJzID0gbmV3IEwuRmVhdHVyZUdyb3VwKCkuYWRkVG8obWFwYSk7XHJcbiAgTC50aWxlTGF5ZXIoYGh0dHBzOi8ve3N9LnRpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nYCwge1xyXG4gICAgYXR0cmlidXRpb246IGAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9yc2AsXHJcbiAgfSkuYWRkVG8obWFwYSk7XHJcblxyXG4gIGNvbnN0IG9idGVuZXJQcm9waWVkYWRlcyA9IGFzeW5jICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHVybCA9IFwiL2FwaS9wcm9waWVkYWRlc1wiO1xyXG4gICAgICBjb25zdCByZXNwdWVzdGEgPSBhd2FpdCBmZXRjaCh1cmwpO1xyXG4gICAgICBjb25zdCBwcm9waWVkYWRlcyA9IGF3YWl0IHJlc3B1ZXN0YS5qc29uKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHByb3BpZWRhZGVzKTtcclxuICAgICAgbW9zdHJhclByb3BpZWRhZGVzKHByb3BpZWRhZGVzKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBtb3N0cmFyUHJvcGllZGFkZXMgPSAocHJvcGllZGFkZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHByb3BpZWRhZGVzLmZvckVhY2goKHByb3BpZWRhZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1hcmtlciA9IG5ldyBMLm1hcmtlcihbcHJvcGllZGFkPy5sbmcsIHByb3BpZWRhZD8ubG9naW50dWRdLCB7XHJcbiAgICAgICAgICBhdXRvUGFuOiB0cnVlLFxyXG4gICAgICAgIH0pLmFkZFRvKG1hcGEpXHJcbiAgICAgICAgICAuYmluZFBvcHVwKGA8cCBjbGFzcz0ndGV4dC1pbmRpZ28tODAwIGZvbnQtYm9sZCc+JHtwcm9waWVkYWQuY2F0ZWdvcmlhLm5vbWJyZX08L3A+XHJcbiAgICAgICAgICA8aDEgY2xhc3M9J3RleHQteGwgZm9udC1leHRyYWJvbGQgIGNhcGl0YWxpemUgbXktMic+JHtwcm9waWVkYWQ/LnRpdHVsb308L2gxPlxyXG4gICAgICAgICAgPGltZyBzcmM9XCIvdXBsb2Fkcy8ke3Byb3BpZWRhZD8uaW1hZ2VufVwiIGFsdD1cIkltYWdlbiBkZSBsYSBwcm9waWVkYWQgJHtwcm9waWVkYWQudGl0dWxvfVwiPlxyXG4gICAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LWdyYXktNjAwIGZvbnQtYm9sZFwiPiR7cHJvcGllZGFkLnByZWNpby5ub21icmV9PC9wPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwiXCI+VmVyIFByb3BpZWRhZDwvYT5cclxuYCk7XHJcbiAgICAgICAgbWFya2Vycy5hZGRMYXllcihtYXJrZXIpO1xyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH1cclxuICB9O1xyXG4gIG9idGVuZXJQcm9waWVkYWRlcygpO1xyXG59KSgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/mostrarInicio.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mostrarInicio.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;