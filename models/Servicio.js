import mysql from 'mysql2/promise'
import { DATABASE_CONFIG } from '../config/db.js'

const connectionString = process.env.DATABASE_URL ?? DATABASE_CONFIG

const connection = await mysql.createConnection(connectionString)

export class ServicioModel {
  static async getAll () {
    const [servicios] = await connection.query(
      'select id_servicio AS id, descripcion FROM servicio;'
    )
    return servicios
  }
}
