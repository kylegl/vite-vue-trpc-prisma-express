export const appRouter = createRouter()
  .merge('users.', userRouter)  

export type AppRouter = typeof appRouter


