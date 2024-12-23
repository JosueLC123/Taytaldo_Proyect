import { DestinosService } from '../service/DestinosService.js'

export class DestinosController {
  static async getAll (req, res) {
    const { pagina } = req.query
    const expresion = /^[1-9]$/

    if (!expresion.test(pagina)) {
      return res.redirect('/destinos?pagina=1')
    }

    try {
      const limit = 7
      const offset = ((pagina * limit) - limit)
      const data = await DestinosService.getAll({ input: { limit, offset } })

      return res.render('pages/destinos', {
        lugares: data.lugares,
        servicios: data.servicios,
        duracion: data.duracion,
        destinos: data.destinos,
        pagina: Number(pagina),
        paginacion: Math.ceil(data.total / limit),
        total: data.total,
        limit,
        offset
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send('Error interno del servidor')
    }
  }

  static async getBySlug (req, res) {
    const { slug } = req.params
    try {
      const id = await DestinosService.getIdBySlug({ slug })
      const { itinerario } = await DestinosService.getById(id)

      return res.render('pages/itinerario', { itinerario })
    } catch (error) {
      console.error(error)
      return res.status(500).send('Error interno del servidor')
    }
  }
}
