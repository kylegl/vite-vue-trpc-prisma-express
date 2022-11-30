import { userRouter } from "./routes/userRouter"
import {router } from "./trpc"

export const appRouter = router({
  user: userRouter,
})

export type AppRouter = typeof appRouter