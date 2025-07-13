<template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-xl font-bold mb-4">會員登入</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <input v-model="email" type="email" placeholder="Email" class="w-full border p-2" />
      <input v-model="password" type="password" placeholder="Password" class="w-full border p-2" />
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white">登入</button>
    </form>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')

const onSubmit = async () => {
  await $fetch('/api/login', { method: 'POST', body: { email: email.value, password: password.value } })
  await navigateTo('/dashboard')
}
</script>
