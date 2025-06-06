import mysql from 'mysql2/promise'
import { DATABASE_CONFIG } from '../config/db.js'

const connectionString = process.env.DATABASE_URL ?? DATABASE_CONFIG

const connection = await mysql.createConnection(connectionString)


export class ReservaModel {
  static async create ({ input }) {
    const { id, fechaReserva, nombreCompleto, correo, dni, telefono, adultos, infantes, precioTotal } = input

    const [reserva] = await connection.query(
      `INSERT INTO reserva (id_destino, nombre_completo, correo, telefono, dni, infantes, adultos, precio_total, fecha_reserva)
      values (?,?,?,?,?,?,?,?,?);`,
      [id, nombreCompleto, correo, telefono, dni, infantes, adultos, precioTotal, fechaReserva]
    )

    return reserva[0]
  }
}
