import { fastifyTRPCPlugin} from '@trpc/server/adapters/fastify'
import fastify from 'fastify'
import {createContext} from './router/createContext'
import { appRouter } from './router/appRouter';

const server = fastify({
  maxParamLength: 5000,
})

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext },
});

(async () => {
  try {
    await server.listen({port: 3000})
  } catch(e) {
    server.log.error(e)
    process.exit(1)
  }
})