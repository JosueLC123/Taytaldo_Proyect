import express, { json } from 'express'
import { appRouter } from './routes/appRoutes.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(json())
app.disable('x-powered-by')
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Habilitar pug
app.set('view engine', 'pug')
app.set('views', './views')

// Carpeta Publica
app.use(express.static('public'))
//app.use('/uploads', express.static('uploads'))


app.use('/', appRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`La aplicacion es corriendo en http://localhost:${PORT}`)

})


