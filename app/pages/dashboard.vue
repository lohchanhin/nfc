<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">會員儀表板</h1>
    <div v-if="pending">載入中...</div>
    <div v-else>
      <p>訂閱狀態：{{ status || '無' }}</p>
      <button v-if="status && status !== 'canceled'" @click="cancel" class="mt-4 px-4 py-2 bg-red-500 text-white">取消訂閱</button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { data, pending, refresh } = await useFetch('/api/subscription')
const status = computed(() => data.value?.status)

const cancel = async () => {
  await $fetch('/api/subscription/cancel', { method: 'POST' })
  await refresh()
}
</script>
