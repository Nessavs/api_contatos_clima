import Hapi from '@hapi/hapi'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import contactRoutes from './routes/contactRoutes.js'

dotenv.config()

export const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  })

  try {
    const mongoUri = process.env.NODE_ENV === 'test' 
      ? 'mongodb://localhost:27017/contatos_db_test' 
      : process.env.MONGODB_URI

    await mongoose.connect(mongoUri)
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error)
    process.exit(1)
  }

  server.route(contactRoutes)

  return server
}

const start = async () => {
  if (process.env.NODE_ENV !== 'test') {
    const server = await init()
    await server.start()
    console.log('Servidor a rodar em:', server.info.uri)
  }
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

start()