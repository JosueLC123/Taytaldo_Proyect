import { Router } from 'express'
import { InicioController } from '../controllers/InicioController.js'
import { NosotrosController } from '../controllers/NosotrosController.js'
import { DestinosController } from '../controllers/DestinosController.js'
import { ContactoController } from '../controllers/ContactoController.js'
import { ReservaController } from '../controllers/ReservaController.js'
import { ConsultaController } from '../controllers/ConsultaController.js'

export const appRouter = Router()

// INICIO
appRouter.get('/', InicioController.inicioPage)

// NOSOTROS
appRouter.get('/nosotros', NosotrosController.show)

// DESTINOS
appRouter.get('/destinos', DestinosController.getAll)
appRouter.get('/destinos/:slug', DestinosController.getBySlug)

// RESERVA
appRouter.post('/reserva/:id', ReservaController.create)

// CONSULTA
appRouter.post('/consulta/:id', ConsultaController.create)

// CONTACTO
appRouter.get('/contacto', ContactoController.show)
appRouter.post('/contacto', ContactoController.create)
