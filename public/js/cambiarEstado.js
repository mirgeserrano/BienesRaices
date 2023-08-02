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

/***/ "./src/js/cambiarEstado.js":
/*!*********************************!*\
  !*** ./src/js/cambiarEstado.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function () {\r\n  try {\r\n    const cambiarEstadoBotton = document.querySelector(\".cambiar-estado\");\r\n    //console.log(cambiarEstadoBotton);\r\n    cambiarEstadoBotton.map(function (botton) {\r\n      botton.addEventListener(\"click\", cambiarEstadoPropiedad);\r\n    });\r\n\r\n    // cambiarEstadoBotton.forEach((botton) => {\r\n\r\n    //   botton.addEventListener(\"click\", cambiarEstadoPropiedad);\r\n    // });\r\n\r\n    const cambiarEstadoPropiedad = (e) => {\r\n      const { propiedadId: id } = e.target.dataset;\r\n      console.log(id);\r\n    };\r\n  } catch (error) {\r\n    console.log(error);\r\n  }\r\n})();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvY2FtYmlhckVzdGFkby5qcyIsIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmllbmVzcmFpY2VzLy4vc3JjL2pzL2NhbWJpYXJFc3RhZG8uanM/YzJhNSJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBjYW1iaWFyRXN0YWRvQm90dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW1iaWFyLWVzdGFkb1wiKTtcclxuICAgIC8vY29uc29sZS5sb2coY2FtYmlhckVzdGFkb0JvdHRvbik7XHJcbiAgICBjYW1iaWFyRXN0YWRvQm90dG9uLm1hcChmdW5jdGlvbiAoYm90dG9uKSB7XHJcbiAgICAgIGJvdHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2FtYmlhckVzdGFkb1Byb3BpZWRhZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBjYW1iaWFyRXN0YWRvQm90dG9uLmZvckVhY2goKGJvdHRvbikgPT4ge1xyXG5cclxuICAgIC8vICAgYm90dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjYW1iaWFyRXN0YWRvUHJvcGllZGFkKTtcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIGNvbnN0IGNhbWJpYXJFc3RhZG9Qcm9waWVkYWQgPSAoZSkgPT4ge1xyXG4gICAgICBjb25zdCB7IHByb3BpZWRhZElkOiBpZCB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgY29uc29sZS5sb2coaWQpO1xyXG4gICAgfTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gIH1cclxufSkoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/cambiarEstado.js\n");

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
/******/ 	__webpack_modules__["./src/js/cambiarEstado.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;