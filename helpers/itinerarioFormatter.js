function safeSplit(value) {
  return typeof value === 'string' && value.length > 0
    ? value.split(',').map(item => item.trim())
    : []
}

function formatearPrecio(precio) {
  if (precio === null || precio === undefined) {
    return 'Consultar';
  }
  const formatter = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2
  });
  return formatter.format(precio);
}

function formatPrecios(preciosString) {
  if (typeof preciosString !== 'string' || preciosString.length === 0) {
    return [];
  }

  return preciosString.split(',').map(precio => {
    const [servicio, valor] = precio.split(':');
    return {
      servicio,
      valor: formatearPrecio(Number(valor)) // Aquí formateas el valor como "S/. 30.00"
    };
  });
}


/*function formatPrecios(preciosString) {
  if (typeof preciosString !== 'string' || preciosString.length === 0) {
    return []
  }

  return preciosString.split(',').map(item => {
    const [tipoCliente, valor] = item.split(':').map(part => part.trim())
    return {
      tipo: tipoCliente ?? 'General',
      valor: parseFloat(valor) || 0
    }
  })
}*/

function formatDia(diaString) {
  if (typeof diaString !== 'string' || diaString.trim() === '') {
    return [1, 'Lugar no definido']
  }

  const match = diaString.match(/Día (\d+):\s*(.+)/)
  if (match) {
    return [parseInt(match[1], 10), match[2]]
  }

  return [1, diaString]
}


export function formatItinerario(results) {
  if (!results || results.length === 0) {
    throw new Error("No se recibieron resultados para formatear el itinerario")
  }

  const data = {
    id_destino: results[0].id_destino,
    nombre: results[0].nombre,
    slug: results[0].slug,
    descripcion_larga: results[0].descripcion_larga,
    imagenes: safeSplit(results[0].imagenes),
    precio_desde: results[0].precio_desde,
    precios: formatPrecios(results[0].precios),
    incluye: safeSplit(results[0].incluye),
    no_incluye: safeSplit(results[0].no_incluye),
    informacion_adicional: safeSplit(results[0].informacion_adicional),
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
