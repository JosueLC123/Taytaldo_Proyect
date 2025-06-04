import { DestinosModel } from '../models/Destinos.js'
import { DuracionModel } from '../models/Duracion.js'
import { LugaresModel } from '../models/Lugares.js'
import { ServicioModel } from '../models/Servicio.js'
import { testimonials } from '../const/const.js'
import { formatDestino } from '../helpers/destinoFormatter.js' // asegúrate de importar

export class InicioService {
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
}

/*import { DestinosModel } from '../models/Destinos.js'
import { DuracionModel } from '../models/Duracion.js'
import { LugaresModel } from '../models/Lugares.js'
import { ServicioModel } from '../models/Servicio.js'
import { testimonials } from '../const/const.js'
import { formatDestino } from '../helpers/destinoFormatter.js'

export class InicioService {
  static async getInicioData () {
    const [destinosRaw, lugares, servicios, duracion, proximosRaw] = await Promise.all([
      DestinosModel.getAll(),
      LugaresModel.getAll(),
      ServicioModel.getAll(),
      DuracionModel.getAll(),
      DestinosModel.getProximos()
    ])

    const destinos = formatDestino(destinosRaw)
    const proximos = formatDestino(proximosRaw)

    return { lugares, servicios, duracion, destinos, proximos, testimonials }
  }
}*/
