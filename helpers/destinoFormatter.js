export function formatDestino(destinos) {
  return destinos.map(destino => {
    // Si solo hay una imagen (imagen_final), no hay array de imagenes
    const imagenes = (typeof destino.imagenes === 'string' && destino.imagenes.trim().length > 0)
      ? destino.imagenes.split(',').map(img => img.trim())
      : destino.imagen_final ? [destino.imagen_final] : [];

    const imagen = imagenes.length > 0 ? imagenes[0] : 'default.jpg';

    return {
      ...destino,
      nombre: destino.nombre_destino || destino.nombre || 'Sin nombre',
      estado: destino.estado,
      slug: destino.slug,
      servicios: (typeof destino.servicios === 'string' && destino.servicios.trim().length > 0)
        ? destino.servicios.split(',').map(servicio => servicio.trim())
        : [],
      imagenes,
      imagen,
      imagen_final: imagen,
      precio_desde: destino.precio_desde ?? 0
    };
  });
}
