import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client'
import superjson from 'superjson'
import type { AppRouter } from './../../../server/router/appRouter'

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
  transformer: superjson,
})
