export const appRouter = createRouter()
  .query('hello', {
    resolve: () => {
      return 'world'
    },
  })

// TODO add to template
export type AppRouter = typeof appRouter