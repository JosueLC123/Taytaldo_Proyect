import mysql from 'mysql2/promise'
import { DATABASE_CONFIG } from '../config/db.js'

const connectionString = process.env.DATABASE_URL ?? DATABASE_CONFIG

const connection = await mysql.createConnection(connectionString)

export class LugaresModel {
  static async getAll () {
    const [lugares] = await connection.query(
      'select * from lugar;'
    )
    return lugares
  }
}
