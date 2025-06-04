export function formatDestino(destinos) {
  return destinos.map(destino => {
    const imagenes = (typeof destino.imagenes === 'string' && destino.imagenes.trim().length > 0)
      ? destino.imagenes.split(',').map(img => img.trim())
      : [];

    const imagen = imagenes.length > 0 ? imagenes[0] : destino.imagen ?? 'default.jpg';

    return {
      ...destino,
      nombre: destino.nombre_destino || destino.nombre || 'Sin nombre',// ✅ usa el campo real del resultado de MySQL
      estado: destino.estado, // ✅ AGREGA ESTO
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



    





