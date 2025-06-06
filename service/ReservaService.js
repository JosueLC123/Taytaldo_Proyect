import { ReservaModel } from '../models/Reserva.js'

export class ReservaService {
  static async create ({ input }) {
    const reserva = await ReservaModel.create({ input })
    return { reserva }
  }
}

