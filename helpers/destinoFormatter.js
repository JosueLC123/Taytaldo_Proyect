export function formatDestino (destinos) {
  const data = destinos.map(destino => ({
    ...destino,
    servicios: destino.servicios.split(',').map(servicio => servicio.trim())
  }))

  return data
}
