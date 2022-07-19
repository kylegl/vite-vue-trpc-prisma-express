<script setup lang="ts">
import { useMutation, useQuery } from '../composables/createVueQueryHooks'
const name = $ref('')

const testInput = { email: 'ex@ample.com', name: 'user' }
const { mutate } = useMutation('users.register-user')
const res = client.query('users.verify-otp', { hash })
const go = () => {
  mutate(testInput)
}
const hash = 'kdfjifjlili'
const { data, isLoading, isError, error } = useQuery(['users.verify-otp', { hash }])
</script>

<template>
  <div>
    <div i-carbon-campsite text-4xl inline-block />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Vitesse Lite
      </a>
    </p>
    <p>
      <em text-sm op75>Opinionated Vite Starter Template</em>
    </p>

    <div py-4 />

    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >

    <div>
      <button
        class="m-3 text-sm btn"
        @click="go"
      >
        Go
      </button>
    </div>
  </div>
</template>
