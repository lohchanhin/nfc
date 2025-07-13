<template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-xl font-bold mb-4">會員登入</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        autocomplete="email"
        class="w-full border border-gray-300 rounded px-4 py-2"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        autocomplete="current-password"
        class="w-full border border-gray-300 rounded px-4 py-2"
      />
      <p v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</p>
      <button
        type="submit"
        class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        登入
      </button>

      <button
        type="button"
        class="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        @click="oidcLogin"
      >
        第三方登入
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">

const email = ref<string>('')
const password = ref<string>('')
const errorMsg = ref<string>('')

const { login: oidcLogin, handleCallback } = useAuth()

onMounted(() => {
  handleCallback()
})


const onSubmit = async () => {
  errorMsg.value = ''
  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    await navigateTo('/dashboard')
  } catch (err: any) {
    errorMsg.value = err?.data?.statusMessage || '登入失敗'

  }
}
</script>
