<script setup lang="ts">
import { client } from '~/api/client';

defineOptions({
  name: 'IndexPage',
})
const user = useUserStore()
const name = $ref(user.savedName)

const test = $ref()

async function getUser() {
  return await client.hello.query()
}

const router = useRouter()
const go = () => {
  if (name)
    router.push(`/hi/${encodeURIComponent(name)}`)
}

const { t } = useI18n()
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-campsite inline-block />
    </div>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        Vitesse
      </a>
    </p>
    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>

    <div py-4 />
    {{test}}
    <TheInput
      v-model="name"
      placeholder="What's your name?"
      autocomplete="false"
      @keydown.enter="go"
    />
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button
        btn m-3 text-sm
        :disabled="!name"
        @click="getUser"
      >
        {{ t('button.go') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
