export function formatItinerario (results) {
  const data = {
    id_destino: results[0].id_destino,
    nombre: results[0].nombre,
    slug: results[0].slug,
    descripcion_larga: results[0].descripcion_larga,
    imagenes: results[0].imagenes.split(', ').map(item => item.trim()),
    precio_desde: results[0].precio_desde,
    precios: formatPrecios(results[0].precios),
    incluye: results[0].incluye.split(', ').map(item => item.trim()),
    no_incluye: results[0].no_incluye.split(', ').map(item => item.trim()),
    informacion_adicional: results[0].informacion_adicional.split(', ').map(item => item.trim()),
    plan: []
  }

  results.forEach(row => {
    const [numeroDia, lugar] = formatDia(row.dia)

    let diaItinerario = data.plan.find(it =>
      it.dia.some(d => d.numero === numeroDia)
    )

    if (!diaItinerario) {
      diaItinerario = {
        dia: [{ numero: numeroDia, lugar }],
        actividad: []
      }
      data.plan.push(diaItinerario)
    }

    diaItinerario.actividad.push({
      hora: row.hora,
      descripcion: row.actividad
    })
  })

  return data
}

function formatPrecios (preciosString) {
  return preciosString.split(', ').map(item => {
    const [tipoCliente, valor] = item.split(': ').map(part => part.trim())
    return {
      tipo: tipoCliente,
      valor: parseFloat(valor)
    }
  })
}

function formatDia (diaString) {
  const match = diaString.match(/Día (\d+):\s*(.+)/)
  if (match) {
    return [parseInt(match[1], 10), match[2]]
  }

  return [1, diaString]
}
