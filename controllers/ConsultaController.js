import { ConsultaService } from '../service/ConsultaService.js'
import { validarConsulta } from '../schema/consulta.js'
import { enviarCorreo } from '../helpers/email.js'

export class ConsultaController {
  static async create (req, res) {
    console.log(req.body)
    const { id } = req.params
    const result = validarConsulta(req.body)

    if (result.success === false) {
      return res.status(400).json({
        success: false,
        mensajes: result.mensajes
      })
    }

    const input = {
      id: Number(id),
      ...result.data
    }

    try {
      await ConsultaService.create({ input })
      // ✅ Enviar email
      const html = `
        <h2>Consulta de ${input.nombreCompleto}</h2>
        <p><strong>DNI:</strong> ${input.dni}</p>
        <p><strong>Teléfono:</strong> ${input.telefono}</p>
        <p><strong>Correo:</strong> ${input.correo}</p>
        <p><strong>Mensaje:</strong> ${input.mensaje}</p>
      `
      await enviarCorreo({
        to: 'darkraider705@gmail.com', // o puedes usar input.correo para responderle al usuario
        subject: 'Nueva consulta desde el sitio web',
        html
      })
      return res.status(201).json({
        success: true,
        mensaje: 'Consulta registrada con éxito'
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ success: false, message: 'Error interno del servidor' })
    }
  }
}
