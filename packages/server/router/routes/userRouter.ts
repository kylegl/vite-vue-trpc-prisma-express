import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

interface User { id: string; name: string; bio?: string}

export const userRouter = router({
  getUserById: publicProcedure
    .input(z.object({ text: z.string() }).optional())
    .query(({ input }) => {
      return { greeting: `hello ${input?.text ?? 'world'}` }
    }),
})
