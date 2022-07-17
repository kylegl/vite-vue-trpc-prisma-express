export const appRouter = createRouter()
  .merge('users.', userRouter)  

// TODO add to template
export type AppRouter = typeof appRouter


