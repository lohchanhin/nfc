<template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-xl font-bold mb-4">會員註冊</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label for="reg-email" class="block mb-1">Email</label>
        <input id="reg-email" v-model="email" type="email" required placeholder="Email" class="w-full border p-2" />
      </div>
      <div>
        <label for="reg-password" class="block mb-1">Password</label>
        <input id="reg-password" v-model="password" type="password" required placeholder="Password" class="w-full border p-2" />
      </div>
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white">註冊</button>
      <p v-if="errorMsg" class="text-red-700 bg-red-100 border border-red-500 rounded p-2">
        {{ errorMsg }}
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const errorMsg = ref('')

const onSubmit = async () => {
  errorMsg.value = ''
  try {
    await $fetch('/api/register', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    await navigateTo('/dashboard')
  } catch (err: any) {
    errorMsg.value = err?.data?.statusMessage || '註冊失敗，請稍後再試'
  }
}
</script>
