import mysql from 'mysql2/promise'
import { DATABASE_CONFIG } from '../config/db.js'

const connectionString = process.env.DATABASE_URL ?? DATABASE_CONFIG

const connection = await mysql.createConnection(connectionString)

export class ConsultaModel {
  static async create ({ input }) {
    const { id, nombreCompleto, dni, telefono, correo, mensaje } = input
    const [consulta] = await connection.query(
        `INSERT INTO consulta (id_destino, nombre_completo, dni, telefono, correo, mensaje)
        values (?,?,?,?,?,?);`,
        [id, nombreCompleto, dni, telefono, correo, mensaje]
    )

    return consulta[0]
  }
}
