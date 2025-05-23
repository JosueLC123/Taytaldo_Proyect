export function formatDestino(destinos) {
  return destinos.map(destino => {
    const imagenes = (typeof destino.imagenes === 'string' && destino.imagenes.trim().length > 0)
      ? destino.imagenes.split(',').map(img => img.trim())
      : [];

    const imagen = imagenes.length > 0 ? imagenes[0] : destino.imagen ?? 'default.jpg';

    return {
      ...destino,
      nombre: destino.nombre_destino,  // 👈 nombre listo para el .pug
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



/*export function formatDestino(destinos) {
  return destinos.map(destino => {
    // 👇 Usa el campo `imagenes` real
    const imagenes = (typeof destino.imagenes === 'string' && destino.imagenes.trim().length > 0)
      ? destino.imagenes.split(',').map(img => img.trim())
      : [];

    const imagen = imagenes.length > 0 ? imagenes[0] : 'default.jpg';

    return {
      ...destino,
      slug: destino.slug,
      servicios: (typeof destino.servicios === 'string' && destino.servicios.trim().length > 0)
        ? destino.servicios.split(',').map(servicio => servicio.trim())
        : [],
      imagenes,       // array completo
      imagen,         // primera imagen
      imagen_final: imagen,
      precio_desde: destino.precio_desde ?? 0
    };
  });
}*/


