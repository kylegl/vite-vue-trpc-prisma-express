import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { createContext } from './router/createContext'
import { appRouter } from './router/appRouter'

const server = Fastify({
  maxParamLength: 5000,
  logger: true,
})

server.register(cors, {
  origin: (origin, cb) => {
    const hostname = new URL(origin).hostname

    if (hostname === 'localhost') {
      cb(null, true)
      return
    }

    cb(new Error('Not Allowed'), false)
  },
})

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext },
})

const start = async () => {
  try {
    await server.listen({ port: 3000 })
    server.log.info(`🚀 Server is listening on ${server.server.address()}`)
  }
  catch (e) {
    server.log.error(e)
    process.exit(1)
  }
}

start()
