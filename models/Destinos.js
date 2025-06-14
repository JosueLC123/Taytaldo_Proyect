
import mysql from 'mysql2/promise';
import { DATABASE_CONFIG } from '../config/db.js';

const connectionString = process.env.DATABASE_URL ?? DATABASE_CONFIG;
const connection = await mysql.createConnection(connectionString);

export class DestinosModel {
  static async getAll() {
    const [resultSets] = await connection.query(
      'CALL GetDestinoServiciosPrecio(?, ?);',
      [100, 0]
    );
    return resultSets[0];
  }

  static async getDestinosData({ input }) {
    const { limit, offset } = input;
    const [resultSets] = await connection.query(
      'CALL GetDestinoServiciosPrecio(?, ?);',
      [limit, offset]
    );
    return resultSets[0];
  }

  static async total() {
    const [total] = await connection.query(
      'SELECT COUNT(*) AS total FROM destino WHERE estado = "activo";'
    );
    return total[0].total;
  }

  static async getIdBySlug({ slug }) {
    const [id] = await connection.query(
      'SELECT id_destino FROM destino WHERE slug = ?;',
      [slug]
    );
    return id[0]?.id_destino;
  }

  static async getById(id) {
    const [resultSets] = await connection.query(
      'CALL GetItinerarioById(?);',
      [id]
    );
    return resultSets[0];
  }

  static async getFiltrados({ lugar, actividad, duracion, limit, offset }) {
    // Asegúrate de pasar null si algún filtro está vacío
    const lugarParam = lugar && lugar !== '' ? lugar : null;
    const actividadParam = actividad && actividad !== '' ? actividad : null;
    const duracionParam = duracion && duracion !== '' ? duracion : null;

    const [resultSets] = await connection.query(
      'CALL GetDestinoServiciosPrecioFiltrado(?, ?, ?, ?, ?);',
      [
        lugarParam,
        actividadParam,
        duracionParam,
        limit,
        offset
      ]
    );
    return resultSets[0];
  }

  static async getTotalFiltrados({ lugar, actividad, duracion }) {
    let query = 'SELECT COUNT(DISTINCT d.id_destino) AS total FROM destino d ';
    query += `
      LEFT JOIN destino_servicio ds ON ds.id_destino = d.id_destino
      LEFT JOIN destino_detalle dd ON dd.id_destino = d.id_destino
      WHERE d.estado = 'activo'
    `;
    const params = [];

    if (lugar && lugar !== '') {
      query += ' AND d.id_lugar = ?';
      params.push(lugar);
    }

    if (actividad && actividad !== '') {
      query += ' AND ds.id_servicio = ?';
      params.push(actividad);
    }

    if (duracion && duracion !== '') {
      query += ' AND dd.id_duracion = ?';
      params.push(duracion);
    }

    const [rows] = await connection.query(query, params);
    return rows[0].total;
  }
}
