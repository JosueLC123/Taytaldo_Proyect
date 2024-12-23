/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
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
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./src/js/destinos.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
const destinos = [
  { id: 1, nombre: 'Real Felipe', precio: 189.00, descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac leo iaculis ante mattis pulvinar vitae eu mi. Fusce nisl quam, convallis dictum rutrum nec, blandit vitae orci.', imagen: '/img/inicio/realfelipe.webp', servicios: ['Full Day', 'Tour Privado', 'Tour Nocturno'], ubicacion: 'Lima' },
  { id: 2, nombre: 'Machu Picchu', precio: 350.00, descripcion: 'Lorem ipsum dolor sit amet.', imagen: '/img/inicio/realfelipe.webp', servicios: ['Full Day'], ubicacion: 'Cusco' },
  { id: 3, nombre: 'Nazca', precio: 220.00, descripcion: 'Lorem ipsum dolor sit amet.', imagen: '/img/inicio/realfelipe.webp', servicios: ['Tour Privado'], ubicacion: 'Ica' },
  { id: 4, nombre: 'Colca', precio: 400.00, descripcion: 'Lorem ipsum dolor sit amet.', imagen: '/img/inicio/realfelipe.webp', servicios: ['Tour Privado', 'Tour Nocturno'], ubicacion: 'Arequipa' },
  { id: 5, nombre: 'Líneas de Nazca', precio: 250.00, descripcion: 'Lorem ipsum dolor sit amet.', imagen: '/img/inicio/realfelipe.webp', servicios: ['Full Day'], ubicacion: 'Ica' },
  { id: 6, nombre: 'Valle Sagrado', precio: 300.00, descripcion: 'Lorem ipsum dolor sit amet.', imagen: '/img/inicio/realfelipe.webp', servicios: ['Tour Nocturno'], ubicacion: 'Cusco' },
  { id: 7, nombre: 'Lago Titicaca', precio: 180.00, descripcion: 'Lorem ipsum dolor sit amet.', imagen: '/img/inicio/realfelipe.webp', servicios: ['2 Dias / 1 Noche'], ubicacion: 'Puno' },
  { id: 8, nombre: 'Caral', precio: 200.00, descripcion: 'Lorem ipsum dolor sit amet.', imagen: '/img/inicio/realfelipe.webp', servicios: ['3 Dias / 2 Noches'], ubicacion: 'Lima' },
  { id: 9, nombre: 'Chan Chan', precio: 290.00, descripcion: 'Lorem ipsum dolor sit amet.', imagen: '/img/inicio/realfelipe.webp', servicios: ['Full Day', 'Pet Friendly'], ubicacion: 'Trujillo' },
  { id: 10, nombre: 'Huacachina', precio: 230.00, descripcion: 'Lorem ipsum dolor sit amet.', imagen: '/img/inicio/realfelipe.webp', servicios: ['Full Day', 'Tour Privado'], ubicacion: 'Ica' },
  { id: 11, nombre: 'Lomas de Lúcumo', precio: 150.00, descripcion: 'Lorem ipsum dolor sit amet.', imagen: '/img/inicio/realfelipe.webp', servicios: ['Full Day', 'Tour Privado', 'Pet Friendly'], ubicacion: 'Lima' },
  { id: 12, nombre: 'Paracas', precio: 320.00, descripcion: 'Lorem ipsum dolor sit amet.', imagen: '/img/inicio/realfelipe.webp', servicios: ['Full Day', 'Pet Friendly'], ubicacion: 'Ica' },
  { id: 13, nombre: 'Huaraz', precio: 210.00, descripcion: 'Lorem ipsum dolor sit amet.', imagen: '/img/inicio/realfelipe.webp', servicios: ['Full Day'], ubicacion: 'Ancash' }
]

const destinosPorPagina = 7
let paginaActual = 1
const totalDestinos = destinos.length

document.addEventListener('DOMContentLoaded', function () {
  mostrarDestinos()
  actualizarCantidadDestinos()
  actualizarBotonesPaginacion()

  document.querySelector('.pagination-prev').addEventListener('click', paginaAnterior)
  document.querySelector('.pagination-next').addEventListener('click', paginaSiguiente)
})

function mostrarDestinos () {
  const contenedorDestinos = document.querySelector('.destinos_cards')
  contenedorDestinos.innerHTML = ''

  const inicio = (paginaActual - 1) * destinosPorPagina
  const fin = Math.min(paginaActual * destinosPorPagina, totalDestinos)

  const destinosPagina = destinos.slice(inicio, fin)

  destinosPagina.forEach(destino => {
    const serviciosHTML = destino.servicios.map(servicio => `
        <p class="label_info card_item__info_heading"><i class="icon-clock"></i>${servicio}</p>
      `).join('')

    const destinoHTML = `
            <article class="destinos_card__item">
                <div class="destinos_card__image">
                    <p class="destinos_card__image__ubicacion">${destino.ubicacion}</p>
                    <img src="${destino.imagen}" alt="${destino.nombre}">
                </div>
                <div class="card_item__info">
                    <div class="card_item__info__servicio">
                        ${serviciosHTML}
                    </div>
                    <h3>${destino.nombre}</h3>
                    <p class="card_item__info_text">${destino.descripcion}</p>
                </div>
                <div class="card_item_precio">
                    <h3>S/. ${destino.precio.toFixed(2)}</h3>
                    <a class="btn_primary btn_item__precio" href="/itinerario">Detalles</a>
                </div>
            </article>
        `
    contenedorDestinos.innerHTML += destinoHTML
  })
}

function itinerario (idDestino) {
  window.location.href = 'itinerario.html' // `itinerario.html?id=${idDestino}`
}

function actualizarCantidadDestinos () {
  const inicio = (paginaActual - 1) * destinosPorPagina + 1
  const fin = Math.min(paginaActual * destinosPorPagina, totalDestinos)
  const cantidadTexto = `${inicio} - ${fin} destinos encontrados`
  document.querySelector('.destinos_heading__text').textContent = cantidadTexto
}

function paginaAnterior () {
  const btnPrev = document.querySelector('.pagination-prev')

  if (btnPrev.classList.contains('is-disabled')) return

  if (paginaActual > 1) {
    paginaActual--
    mostrarDestinos()
    actualizarCantidadDestinos()
    actualizarBotonesPaginacion()
  }
}

function paginaSiguiente () {
  const btnNext = document.querySelector('.pagination-next')

  if (btnNext.classList.contains('is-disabled')) return

  if (paginaActual * destinosPorPagina < totalDestinos) {
    paginaActual++
    mostrarDestinos()
    actualizarCantidadDestinos()
    actualizarBotonesPaginacion()
  }
}

function actualizarBotonesPaginacion () {
  const btnPrev = document.querySelector('.pagination-prev')
  const btnNext = document.querySelector('.pagination-next')

  if (paginaActual === 1) {
    btnPrev.classList.add('is-disabled')
    btnPrev.classList.remove('is-enable')
  } else {
    btnPrev.classList.remove('is-disabled')
    btnPrev.classList.add('is-enable')
  }

  if (paginaActual * destinosPorPagina >= totalDestinos) {
    btnNext.classList.add('is-disabled')
    btnNext.classList.remove('is-enable')
  } else {
    btnNext.classList.remove('is-disabled')
    btnNext.classList.add('is-enable')
  }
}

/******/ })()
;
//# sourceMappingURL=destinos.js.map