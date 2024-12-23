import { ContactoService } from '../service/ContactoService.js'
import { validarContacto } from '../schema/contacto.js'

export class ContactoController {
  static async show (req, res) {
    return res.render('pages/contacto')
  }

  static async create (req, res) {
    const result = validarContacto(req.body)

    if (result.success === false) {
      return res.status(400).json({
        success: false,
        mensajes: result.mensajes
      })
    }

    try {
      await ContactoService.create({ input: result.data })
      return res.status(201).json({
        success: true,
        mensaje: 'Mensaje registrado con éxito'
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ success: false, message: 'Error interno del servidor' })
    }
  }
}
