import { userRouter } from './routes/userRouter'
import { publicProcedure, router } from './trpc'

export const appRouter = router({
  hello: publicProcedure.query(() => ({ greeting: 'hello world' })),
  user: userRouter,
})

export type AppRouter = typeof appRouter
