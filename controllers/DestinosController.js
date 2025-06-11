import { DestinosService } from '../service/DestinosService.js'

export class DestinosController {
  static async getAll(req, res) {
    let { pagina, lugar, actividad, duracion } = req.query;
    const expresion = /^[1-9][0-9]*$/;

    const paginaNum = Math.max(1, parseInt(pagina, 10) || 1);
    if (!expresion.test(pagina)) {
      return res.redirect('/destinos?pagina=1');
    }

    try {
      const limit = 7;
      const offset = (paginaNum - 1) * limit;

      let data;

      const hayFiltros = lugar || actividad || duracion;

      if (hayFiltros) {
        data = await DestinosService.getFiltrados({
          lugar,
          actividad,
          duracion
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
        filtroLugar: lugar,
        filtroActividad: actividad,
        filtroDuracion: duracion
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