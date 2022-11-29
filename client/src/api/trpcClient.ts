import { createTRPCClient } from '@trpc/client'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import superjson from 'superjson'
import type { AppRouter } from '../../../server/src/routes/app.router'
import { createVueQueryHooks } from '~/composables'

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

export const trpc = createVueQueryHooks<AppRouter>()

const { data } = trpc.useQuery(['users.me'])
