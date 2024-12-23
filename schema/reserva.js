import z from 'zod'

const reservaSchema = z.object({
  fechaReserva: z
    .string({
      required_error: 'Por favor, selecciona una fecha de reserva'
    })
    .refine(
      (fecha) => !isNaN(new Date(fecha).getTime()),
      { message: 'La fecha seleccionada no es válida' }
    ),
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
  adultos: z
    .number({
      required_error: 'Por favor, indica la cantidad de adultos'
    })
    .int('La cantidad de adultos debe ser un número entero')
    .nonnegative('La cantidad de adultos no puede ser negativa'),
  infantes: z
    .number({
      required_error: 'Por favor, indica la cantidad de niños'
    })
    .int('La cantidad de niños debe ser un número entero')
    .nonnegative('La cantidad de niños no puede ser negativa')
})

export function validarReserva (obj) {
  const result = reservaSchema.partial().safeParse(obj)

  if (!result.success) {
    const mensajes = result.error.errors.map((err) => err.message)
    return { success: false, mensajes }
  }

  return { success: true, data: result.data }
}
