import { DestinosService } from '../service/DestinosService.js';

export class DestinosController {
  static async getAll(req, res) {
    let { pagina, lugar, actividad, duracion } = req.query;

    const paginaNum = pagina ? parseInt(pagina, 10) : 1;
    if (pagina && isNaN(paginaNum)) return res.redirect('/destinos?pagina=1');

    /*let { pagina, lugar, actividad, duracion } = req.query;
    const expresion = /^[1-9][0-9]*$/;

    const paginaNum = Math.max(1, parseInt(pagina, 10) || 1);
    if (!expresion.test(pagina)) {
      return res.redirect('/destinos?pagina=1');
    }*/

    // 🔧 Normaliza y convierte filtros
    const idLugar = lugar && lugar !== '' ? parseInt(lugar) : null;
    const idActividad = actividad && actividad !== '' ? parseInt(actividad) : null;
    const idDuracion = duracion && duracion !== '' ? parseInt(duracion) : null;

    const hayFiltros = idLugar || idActividad || idDuracion;

    try {
      const limit = 7;
      const offset = (paginaNum - 1) * limit;

      let data;

      if (hayFiltros) {
        data = await DestinosService.getFiltrados({
          lugar: idLugar,
          actividad: idActividad,
          duracion: idDuracion,
          limit,
          offset
        });
      } else {
        data = await DestinosService.getAll({ input: { limit, offset } });
      }

      return res.render('pages/destinos', {
        lugares: data.lugares || await DestinosService.getLugares(),
        servicios: data.servicios || await DestinosService.getServicios(),
        duracion: data.duracion || await DestinosService.getDuraciones(),
        destinos: data.destinos || data,
        pagina: paginaNum,
        paginacion: hayFiltros ? 1 : Math.ceil(data.total / limit),
        total: hayFiltros ? data.length : data.total,
        limit,
        offset,
        filtroLugar: lugar || '',
        filtroActividad: actividad || '',
        filtroDuracion: duracion || ''
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error interno del servidor');
    }
  }

  static async getBySlug(req, res) {
    const { slug } = req.params;

    try {
      const id = await DestinosService.getIdBySlug({ slug });

      if (!id) {
        return res.status(404).send('Destino no encontrado');
      }

      const { itinerario } = await DestinosService.getById(id);

      return res.render('pages/itinerario', { itinerario });
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error interno del servidor');
    }
  }
}
