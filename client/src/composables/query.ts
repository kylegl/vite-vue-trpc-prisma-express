import { useMutation as _useMutation, useQuery } from 'vue-query'

// query example
export function useUserQuery() {
  return useQuery(['users.test'])
}

// const { data, isLoading, isError, error } = useUserQuery()

// example mutation
export function useMutation(path) {
  return _useMutation(
    data => client.mutation(path, data),
    {
      onError: (error, variables, context) => {
      // An error happened!
        console.log(`rolling back optimistic update with id ${context.id}`)
      },
      onSuccess: (data, variables, context) => {
      // Boom baby!
        console.log('succeess', data)
      },
    },
  )
}

// const { mutate } = useMutation('users.register-user')
// mutate({name: 'test', email:'ex@mple.com'})
