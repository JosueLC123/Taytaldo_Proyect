import z from 'zod'

const consultaSchema = z.object({
  nombreCompleto: z
    .string({
      invalid_type_error: 'El campo de nombre solo debe tener letras',
      required_error: 'Por favor, ingresa tu nombre completo'
    })
    .trim()
    .min(1, 'El nombre completo no puede estar vacío'),
  dni: z
    .string({
      required_error: 'Por favor, ingresa tu DNI'
    })
    .length(8, 'El DNI debe tener exactamente 8 dígitos')
    .regex(/^\d+$/, 'El DNI solo puede contener números'),
  telefono: z
    .string({
      required_error: 'Por favor, ingresa tu número de teléfono'
    })
    .length(9, 'El teléfono debe tener exactamente 9 dígitos')
    .regex(/^\d+$/, 'El teléfono solo puede contener números'),
  correo: z
    .string({
      required_error: 'Por favor, ingresa tu correo electrónico'
    })
    .email('El correo electrónico no es válido'),
  mensaje: z
    .string({
      required_error: 'Por favor, ingresa un mensaje'
    })
    .trim()
    .min(1, 'El mensaje no puede estar vacío')
})

export function validarConsulta (obj) {
  const result = consultaSchema.partial().safeParse(obj)

  if (!result.success) {
    const mensajes = result.error.errors.map((err) => err.message)
    return { success: false, mensajes }
  }

  return { success: true, data: result.data }
}
