import { DestinosModel } from '../models/Destinos.js'
import { DuracionModel } from '../models/Duracion.js'
import { LugaresModel } from '../models/Lugares.js'
import { ServicioModel } from '../models/Servicio.js'
import { testimonials } from '../const/const.js'
import { formatDestino } from '../helpers/destinoFormatter.js' // asegúrate de importar

export class InicioService {
  static async getInicioData () {
    const [destinosRaw, lugares, servicios, duracion] = await Promise.all([
      DestinosModel.getAll(), // obtiene todos los destinos activos y próximos
      LugaresModel.getAll(),
      ServicioModel.getAll(),
      DuracionModel.getAll()
    ]);

    const destinos = formatDestino(destinosRaw); // aplica el formateo

    // Divide destinos según estado
    const favoritos = destinos.filter(dest => dest.estado === 'activo');
    const proximamente = destinos.filter(dest => dest.estado === 'proximo');

    return { lugares, servicios, duracion, favoritos, proximamente, testimonials };
  }
}


/*export class InicioService {
  static async getInicioData () {
    const [destinosRaw, lugares, servicios, duracion] = await Promise.all([
      DestinosModel.getAll(),
      LugaresModel.getAll(),
      ServicioModel.getAll(),
      DuracionModel.getAll()
    ]);
    
    const destinos = formatDestino(destinosRaw); 

    return { lugares, servicios, duracion, destinos, testimonials };
  }
}*/

