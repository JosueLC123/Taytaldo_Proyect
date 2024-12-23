import { InicioService } from '../service/InicioService.js'

export class InicioController {
  static async inicioPage (req, res) {
    try {
      const data = await InicioService.getInicioData()

      return res.render('pages/inicio', data)
    } catch (error) {
      console.error(error)
      return res.status(500).send('Error interno del servidor')
    }
  }
}
