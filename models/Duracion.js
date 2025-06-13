import mysql from 'mysql2/promise'
import { DATABASE_CONFIG } from '../config/db.js'

const connectionString = process.env.DATABASE_URL ?? DATABASE_CONFIG

const connection = await mysql.createConnection(connectionString)

export class DuracionModel {
  static async getAll () {
    const [duracion] = await connection.query(
      'select id_duracion AS id, descripcion FROM duracion;'
    )
    return duracion
  }
}
