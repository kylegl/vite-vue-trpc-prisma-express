import { createTRPCClient } from '@trpc/client'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import superjson from 'superjson'
import type { AppRouter } from '../../../server/src/routes/app.router'

const url = 'http://localhost:3000/trpc'

export const client = createTRPCClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      maxBatchSize: 10,
      url,
    }),
  ],
  transformer: superjson,
})

