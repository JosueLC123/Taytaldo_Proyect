/*import { DestinosModel } from '../models/Destinos.js'
import { LugaresModel } from '../models/Lugares.js'
import { ServicioModel } from '../models/Servicio.js'
import { DuracionModel } from '../models/Duracion.js'
import { formatItinerario } from '../helpers/itinerarioFormatter.js'
import { formatDestino } from '../helpers/destinoFormatter.js'

export class DestinosService {
  static async getAll ({ input }) {
    const [destinos, total, lugares, servicios, duracion] = await Promise.all([
      DestinosModel.getDestinosData({ input }),
      DestinosModel.total(),
      LugaresModel.getAll(),
      ServicioModel.getAll(),
      DuracionModel.getAll()
    ])
    console.log('DESTINO EJEMPLO:', destinos[0])
    console.log(destinos.map(d => ({ nombre: d.nombre, slug: d.slug })));


    //const datosTransformados = formatDestino(destinos[0])
    const datosTransformados = formatDestino(destinos) // <-- Aquí corregido

    return { destinos: datosTransformados, total, lugares, servicios, duracion }
  }

  static async getIdBySlug ({ slug }) {
    const id = await DestinosModel.getIdBySlug({ slug })
    return id
  }

  static async getById (id) {
    const itinerario = await DestinosModel.getById(id)
    if (!itinerario || itinerario.length === 0) {
      throw new Error(`No se encontró ningún itinerario para el destino con ID: ${id}`)
    }
    const datosTransformados = formatItinerario(itinerario)
    return { itinerario: datosTransformados }
  }
  static async getFiltrados({ lugar, actividad, duracion, limit, offset }) {
    const [destinos, total, lugares, servicios, duracionData] = await Promise.all([
      DestinosModel.getFiltrados({ lugar, actividad, duracion, limit, offset }),
      DestinosModel.getTotalFiltrados({ lugar, actividad, duracion }),
      LugaresModel.getAll(),
      ServicioModel.getAll(),
      DuracionModel.getAll()
    ]);

    const datosTransformados = formatDestino(destinos);

    return {
      destinos: datosTransformados,
      total,
      lugares,
      servicios,
      duracion: duracionData
    };
  }

}*/

import { DestinosModel } from '../models/Destinos.js';
import { LugaresModel } from '../models/Lugares.js';
import { ServicioModel } from '../models/Servicio.js';
import { DuracionModel } from '../models/Duracion.js';
import { formatItinerario } from '../helpers/itinerarioFormatter.js';
import { formatDestino } from '../helpers/destinoFormatter.js';

export class DestinosService {
  static async getAll({ input }) {
    const [destinos, total, lugares, servicios, duracion] = await Promise.all([
      DestinosModel.getDestinosData({ input }),
      DestinosModel.total(),
      LugaresModel.getAll(),
      ServicioModel.getAll(),
      DuracionModel.getAll()
    ]);

    const datosTransformados = formatDestino(destinos);
    return { destinos: datosTransformados, total, lugares, servicios, duracion };
  }

  static async getIdBySlug({ slug }) {
    const id = await DestinosModel.getIdBySlug({ slug });
    return id;
  }

  static async getById(id) {
    const itinerario = await DestinosModel.getById(id);
    if (!itinerario || itinerario.length === 0) {
      throw new Error(`No se encontró ningún itinerario para el destino con ID: ${id}`);
    }
    const datosTransformados = formatItinerario(itinerario);
    return { itinerario: datosTransformados };
  }

  static async getFiltrados({ lugar, actividad, duracion, limit, offset }) {
    // Filtra solo los valores que son válidos (no null ni undefined)
    const filtros = {};
    if (lugar) filtros.lugar = lugar;
    if (actividad) filtros.actividad = actividad;
    if (duracion) filtros.duracion = duracion;

    const [destinos, total, lugares, servicios, duracionData] = await Promise.all([
      DestinosModel.getFiltrados({ ...filtros, limit, offset }),
      DestinosModel.getTotalFiltrados(filtros),
      LugaresModel.getAll(),
      ServicioModel.getAll(),
      DuracionModel.getAll()
    ]);

    const datosTransformados = formatDestino(destinos);
    return {
      destinos: datosTransformados,
      total,
      lugares,
      servicios,
      duracion: duracionData
    };
  }
}

