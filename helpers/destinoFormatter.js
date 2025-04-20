export function formatDestino(destinos) {
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
      imagen: imagenes[0] ?? null, // <--- agrega esto
      precio_desde: destino.precio_desde ?? 0
    };
  });

  return data;
}
