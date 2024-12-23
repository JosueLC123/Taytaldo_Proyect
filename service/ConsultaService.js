import { ConsultaModel } from '../models/Consulta.js'

export class ConsultaService {
  static async create ({ input }) {
    const consulta = await ConsultaModel.create({ input })
    return { consulta }
  }
}
