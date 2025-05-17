export function formatDestino(destinos) {
  const data = destinos.map(destino => {
    // Usa el campo `imagen` directamente
    const imagen = destino.imagen && destino.imagen.trim().length > 0
      ? destino.imagen.trim()
      : 'default.jpg';

    return {
      ...destino,
      servicios: (typeof destino.servicios === 'string' && destino.servicios.trim().length > 0)
        ? destino.servicios.split(',').map(servicio => servicio.trim())
        : [],
      imagenes: [imagen], // lo convertimos en array para compatibilidad
      imagen,
      imagen_final: imagen !== 'default.jpg' ? imagen : 'default.jpg',
      precio_desde: destino.precio_desde ?? 0
    };
  });

  return data;
}


/*export function formatDestino(destinos) {
  const data = destinos.map(destino => {
    const imagenes = typeof destino.imagenes === 'string' && destino.imagenes.length > 0
      ? destino.imagenes.split(',').map(imagen => imagen.trim())
      : [];

    return {
      ...destino,
      servicios: typeof destino.servicios === 'string' && destino.servicios.length > 0
        ? destino.servicios.split(',').map(servicio => servicio.trim())
        : [], 
      imagenes,
      imagen: imagenes[0] ??'default.jpg',// <--- agrega esto
      precio_desde: destino.precio_desde ?? 0
    };
  });

  return data;
}*/
