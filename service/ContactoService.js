import { ContactoModel } from '../models/Contacto.js'

export class ContactoService {
  static async create ({ input }) {
    const contacto = await ContactoModel.create({ input })
    return { contacto }
  }
}
