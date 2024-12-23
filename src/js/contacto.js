import toastr from './toastrConfig.js'

class ContactoHandler {
  constructor () {
    this.init()
  }

  init () {
    this.formularioContacto()
  }

  async enviarContacto (e) {
    e.preventDefault()
    const formData = new FormData(e.target)

    try {
      const res = await fetch('/contacto', {
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
      toastr.error('Error al enviar el mensaje. Inténtalo de nuevo más tarde.')
    }
  }

  formularioContacto () {
    const frmContacto = document.querySelector('#frmContacto')
    frmContacto.addEventListener('submit', this.enviarContacto.bind(this))
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ContactoHandler()
})
