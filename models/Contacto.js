import mysql from 'mysql2/promise'
import { DATABASE_CONFIG } from '../config/db.js'

const connectionString = process.env.DATABASE_URL ?? DATABASE_CONFIG

const connection = await mysql.createConnection(connectionString)

export class ContactoModel {
  static async create ({ input }) {
    const { nombreCompleto, dni, correo, telefono, mensaje } = input
    const [contacto] = await connection.query(
        `INSERT INTO contacto (nombre_completo, dni, correo, telefono, mensaje)
        values (?,?,?,?,?);`,
        [nombreCompleto, dni, correo, telefono, mensaje]
    )

    return contacto[0]
  }
}
