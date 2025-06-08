import { ReservaService } from '../service/ReservaService.js'
import { validarReserva } from '../schema/reserva.js'
import { enviarCorreo } from '../helpers/email.js'


export class ReservaController {
  static async create (req, res) {
    console.log('Body recibido:', req.body)

    const { id } = req.params
    const { slug, precioTotal, adultos, infantes, mascotas, fechaReserva, ...data } = req.body
    data.adultos = Number(adultos)
    data.infantes = Number(infantes)
    //data.mascotas = Number(mascotas)
    data.mascotas = mascotas ? Number(mascotas) : 0
    data.fechaReserva = fechaReserva || ''
    const result = validarReserva(data)

    if (result.success === false) {
      return res.status(400).json({
        success: false,
        mensajes: result.mensajes
      })
    }

    const input = {
      id: Number(id),
      ...result.data,
      precioTotal: parseFloat(precioTotal).toFixed(2),
      mascotas: data.mascotas,// Asegúrate de agregarlo aquí
      fecha: data.fechaReserva
    }

    try {
      await ReservaService.create({ input })
      // ✉️ Enviar correo
      const html = `
        <h2>Nueva reserva realizada</h2>
        <p><strong>Nombre:</strong> ${input.nombreCompleto}</p>
        <p><strong>DNI:</strong> ${input.dni}</p>
        <p><strong>Teléfono:</strong> ${input.telefono}</p>
        <p><strong>Correo:</strong> ${input.correo}</p>
        <p><strong>Adultos:</strong> ${input.adultos}</p>
        <p><strong>Infantes:</strong> ${input.infantes}</p>
        <p><strong>Mascotas:</strong> ${input.mascotas}</p>
        <p><strong>Precio total:</strong> S/. ${input.precioTotal}</p>
        <p><strong>Fecha:</strong> ${input.fecha}</p>
      `

      await enviarCorreo({
        to: 'darkraider705@gmail.com', // o input.correo si deseas enviárselo al cliente
        subject: 'Nueva reserva desde el sitio web',
        html
      })

      return res.status(201).json({
        success: true,
        mensaje: 'Reserva registrada con éxito'
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ success: false, message: 'Error interno del servidor' })
    }
  }
}
