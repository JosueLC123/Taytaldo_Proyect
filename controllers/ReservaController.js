import { ReservaService } from '../service/ReservaService.js'
import { validarReserva } from '../schema/reserva.js'

export class ReservaController {
  static async create (req, res) {
    const { id } = req.params
    const { slug, precioTotal, adultos, infantes, mascotas, ...data } = req.body
    data.adultos = Number(adultos)
    data.infantes = Number(infantes)
    data.mascotas = Number(mascotas)
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
      precioTotal: parseFloat(precioTotal).toFixed(2)
    }

    try {
      await ReservaService.create({ input })
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
