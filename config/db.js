import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const portDB = process.env.DB_PORT
const hostDB = process.env.DB_HOST
const userDB = process.env.DB_USERNAME
const passwordDB = process.env.DB_PASSWORD
const nameDB = process.env.DB_NAME

export const DATABASE_CONFIG = {
  host: hostDB,
  user: userDB,
  port: portDB,
  password: passwordDB,
  database: nameDB
}
