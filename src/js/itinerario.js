import Swiper from 'swiper/bundle'
import toastr from './toastrConfig.js'

const swiper_itinerario = new Swiper('.itinerario_slider__container', {
  slidesPerView: 3,
  spaceBetween: 20,
  slidesPerGroup: 1,
  loop: true,
  centerSlide: 'true',
  grabCursor: 'true',
  fade: 'true',
  pagination: {
    el: '.swiper-pagination-itinerario',
    clickable: true,
    dynamicBullets: true
  },
  navigation: {
    nextEl: '.swiper-button-next-itinerario',
    prevEl: '.swiper-button-prev-itinerario'
  },
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    520: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1000: {
      slidesPerView: 3
    }
  }
})

class ReservaHandler {
  constructor () {
    this.totalPago = document.getElementById('total')
    this.hdTotalPago = document.getElementById('precio_total')
    this.init()
  }

  init () {
    this.setupBotonesCantidad()
    this.calcularTotal()
    this.formularioReserva()
    this.formularioConsulta()
    this.setupTabs()
  }

  obtenerPrecios () {
    const precios = {}
    document.querySelectorAll('.precio').forEach((elemento) => {
      const tipo = elemento.dataset.tipo.toLowerCase()
      const valor = parseFloat(elemento.dataset.valor)
      precios[tipo] = isNaN(valor) ? 0 : valor
      //precios[tipo] = valor
    })
    return precios
  }

  calcularTotal () {
    const precios = this.obtenerPrecios()
    const valorAdultos = document.getElementById('valor_adultos')
    const valorInfantes = document.getElementById('valor_infantes')
    const valorMascotas = document.getElementById('valor_mascotas')

    const valores = {
      adultos: valorAdultos ? parseInt(valorAdultos.value) || 0 : 0,
      infantes: valorInfantes ? parseInt(valorInfantes.value) || 0 : 0,
      mascotas: valorMascotas ? parseInt(valorMascotas.value) || 0 : 0
    }

    const total =
      (precios.todos || 0) * (valores.adultos + valores.infantes) +
      (precios.adulto || 0) * valores.adultos +
      (precios.niño || 0) * valores.infantes +
      (valorMascotas ? (precios.mascota || 0) * valores.mascotas : 0)

    this.totalPago.textContent = `S/. ${total.toFixed(2)}`
    this.hdTotalPago.value = total.toFixed(2)
  }

  manejarCantidad (input, operacion) {
    const currentValue = parseInt(input.value) || 0
    if (operacion === 'incrementar') {
      input.value = currentValue + 1
    } else if (operacion === 'disminuir' && currentValue > 0) {
      input.value = currentValue - 1
    }
    this.calcularTotal()
  }

  setupBotonesCantidad () {
    const botones = [
      { btnId: 'aumentar_adultos', inputId: 'valor_adultos', operacion: 'incrementar' },
      { btnId: 'disminuir_adultos', inputId: 'valor_adultos', operacion: 'disminuir' },
      { btnId: 'aumentar_infantes', inputId: 'valor_infantes', operacion: 'incrementar' },
      { btnId: 'disminuir_infantes', inputId: 'valor_infantes', operacion: 'disminuir' },
      { btnId: 'aumentar_mascotas', inputId: 'valor_mascotas', operacion: 'incrementar' },
      { btnId: 'disminuir_mascotas', inputId: 'valor_mascotas', operacion: 'disminuir' }
    ]

    botones.forEach(({ btnId, inputId, operacion }) => {
      const btn = document.getElementById(btnId)
      const input = document.getElementById(inputId)

      if (btn && input) {
        btn.addEventListener('click', (evt) => {
          evt.preventDefault()
          this.manejarCantidad(input, operacion)
        })
      }
    })
  }

  async enviarReserva (e) {
    e.preventDefault()
    console.log("Formulario de consulta enviado")
    const formData = new FormData(e.target)
    const id = formData.get('id')

    try {
      const res = await fetch(`/reserva/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      })

      const data = await res.json()

      if (res.ok) {
        toastr.success(data.mensaje)
        e.target.reset()
        this.calcularTotal()
      } else {
        const mensajes = Array.isArray(data.mensajes) ? data.mensajes : [data.mensajes]
        mensajes.forEach((msg) => toastr.error(msg))
      }
    } catch (error) {
      toastr.error('Error al enviar la reserva. Inténtalo de nuevo más tarde.')
    }
  }

  async enviarConsulta (e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const id = formData.get('id')

    try {
      const res = await fetch(`/consulta/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      })

      const data = await res.json()
      if (res.ok) {
        toastr.success(data.mensaje)
        e.target.reset()
      } else {
        const mensajes = Array.isArray(data.mensajes) ? data.mensajes : [data.mensajes]
        mensajes.forEach((msg) => toastr.error(msg))
      }
    } catch (error) {
      toastr.error('Error al enviar la consulta. Inténtalo de nuevo más tarde.')
    }
  }

  formularioReserva () {
    const frmReserva = document.querySelector('#frmReserva')
    frmReserva.addEventListener('submit', this.enviarReserva.bind(this))
  }

  formularioConsulta () {
    const frmConsulta = document.querySelector('#frmConsulta')
    frmConsulta.addEventListener('submit', this.enviarConsulta.bind(this))
  }

  setupTabs () {
    const tabs = document.querySelectorAll('.tabs_formulario .item')
    const formularios = document.querySelectorAll('.formulario_reserva, .formulario_consulta')

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('tab-activo'))
        formularios.forEach((form) => (form.style.display = 'none'))

        tab.classList.add('tab-activo')
        const formularioId = tab.getAttribute('data-id')
        document.querySelector(formularioId).style.display = 'block'
      })
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ReservaHandler()
})
