import { publicProcedure, router } from "../trpc";
import {z} from 'zod'

interface User { id: string; name: string; bio?: string}

export const userRouter = router({
  getUserById: publicProcedure
    .input(z.object({ text: z.string()}).optional())
  .query(({input}) => ({greeting: `hello ${input?.text ?? 'world'}`}))
})