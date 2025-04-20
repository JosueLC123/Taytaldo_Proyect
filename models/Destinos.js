import mysql from 'mysql2/promise'
import { DATABASE_CONFIG } from '../config/db.js'

const connectionString = process.env.DATABASE_URL ?? DATABASE_CONFIG

const connection = await mysql.createConnection(connectionString)

export class DestinosModel {
  static async getAll () {
    const [destinos] = await connection.query(
      'select * from vw_destino_imagen;'
    )
    return destinos
  }

  static async getDestinosData ({ input }) {
    const { limit, offset } = input
    const [destinos] = await connection.query(
      'CALL GetDestinoServiciosPrecio(?,?);', [limit, offset]
    )
    return destinos
  }

  static async total () {
    const [total] = await connection.query(
      'select count(*) as total from destino where estado = "activo";'
    )
    return total[0].total
  }

  static async getIdBySlug ({ slug }) {
    const [id] = await connection.query(
      'select id_destino from destino where slug = ?;', [slug]
    )
    return id[0]?.id_destino
  }
  static async getById(id) {
    const [resultSets] = await connection.query('CALL GetItinerarioById(?);', [id])
    return resultSets[0] // ← Esto es el arreglo de objetos del itinerario
  }
  

  /*static async getById (id) {
    const [itinerario] = await connection.query(
      'CALL GetItinerarioById(?);', [id]
    )
    return itinerario[0]
  }*/
}
