import type { VueQueryPluginOptions } from 'vue-query'
import { VueQueryPlugin } from 'vue-query'

const defaultQueryFn = async ({ queryKey }) => {
  const [path, input] = queryKey
  const res = await client.query(path, input)

  return res
}

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: { queryFn: defaultQueryFn },
    },
  },

}

export { VueQueryPlugin, vueQueryPluginOptions }

