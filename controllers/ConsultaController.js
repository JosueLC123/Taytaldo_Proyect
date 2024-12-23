import { ConsultaService } from '../service/ConsultaService.js'
import { validarConsulta } from '../schema/consulta.js'

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
