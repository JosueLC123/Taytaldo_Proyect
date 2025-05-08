import { DestinosService } from '../service/DestinosService.js'

export class DestinosController {
  static async getAll(req, res) {
    let { pagina } = req.query
    const expresion = /^[1-9][0-9]*$/  // Permite 1, 10, 100, etc.

    // Convertimos pagina a número y lo forzamos a ser mínimo 1
    const paginaNum = Math.max(1, parseInt(pagina, 10) || 1)

    if (!expresion.test(pagina)) {
      return res.redirect('/destinos?pagina=1')
    }

    try {
      const limit = 7
      const offset = (paginaNum - 1) * limit
      const data = await DestinosService.getAll({ input: { limit, offset } })
      
      console.log(data.destinos)

      return res.render('pages/destinos', {
        lugares: data.lugares,
        servicios: data.servicios,
        duracion: data.duracion,
        destinos: data.destinos,
        pagina: paginaNum,
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

  static async getBySlug(req, res) {
    const { slug } = req.params
    //console.log('ID del destino:', id);  // Verifica que el ID se esté pasando correctamente

    try {
      const id = await DestinosService.getIdBySlug({ slug })

      if (!id) {
        return res.status(404).send('Destino no encontrado')
      }

      const { itinerario } = await DestinosService.getById(id)

      return res.render('pages/itinerario', { itinerario })
    } catch (error) {
      console.error(error)
      return res.status(500).send('Error interno del servidor')
    }
    
  }
  
}
