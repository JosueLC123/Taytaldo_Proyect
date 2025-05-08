import { DestinosModel } from '../models/Destinos.js'
import { LugaresModel } from '../models/Lugares.js'
import { ServicioModel } from '../models/Servicio.js'
import { DuracionModel } from '../models/Duracion.js'
import { formatItinerario } from '../helpers/itinerarioFormatter.js'
import { formatDestino } from '../helpers/destinoFormatter.js'

export class DestinosService {
  static async getAll ({ input }) {
    const [destinos, total, lugares, servicios, duracion] = await Promise.all([
      DestinosModel.getDestinosData({ input }),
      DestinosModel.total(),
      LugaresModel.getAll(),
      ServicioModel.getAll(),
      DuracionModel.getAll()
    ])
    //const datosTransformados = formatDestino(destinos[0])
    const datosTransformados = formatDestino(destinos) // <-- Aquí corregido

    return { destinos: datosTransformados, total, lugares, servicios, duracion }
  }

  static async getIdBySlug ({ slug }) {
    const id = await DestinosModel.getIdBySlug({ slug })
    return id
  }

  static async getById (id) {
    const itinerario = await DestinosModel.getById(id)
    if (!itinerario || itinerario.length === 0) {
      throw new Error(`No se encontró ningún itinerario para el destino con ID: ${id}`)
    }
    const datosTransformados = formatItinerario(itinerario)
    return { itinerario: datosTransformados }
  }
}
